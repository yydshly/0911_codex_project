"""Exercise the real MCP protocol and CLI incremental update in an isolated copy."""
import asyncio
from pathlib import Path
import json
import os
import shutil
import subprocess
import sys
import tempfile
import html
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from generate_native import document_page

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'app/dist/native/fastapi'


async def check_mcp():
    with tempfile.TemporaryDirectory(prefix='graphify-mcp-') as tmp:
        params=StdioServerParameters(command=sys.executable,args=['-m','graphify.serve','--graph',str(OUT/'graph.json')],cwd=tmp,env={**os.environ,'PYTHONIOENCODING':'utf-8','GRAPHIFY_OUT':tmp})
        async with stdio_client(params) as (read,write):
            async with ClientSession(read,write) as session:
                initialized=await session.initialize()
                listing=await session.list_tools()
                stats=await session.call_tool('graph_stats',{})
                query=await session.call_tool('query_graph',{'question':'APIRouter routing','depth':1,'token_budget':100000})
                s=stats.model_dump(mode='json',by_alias=True);q=query.model_dump(mode='json',by_alias=True)
                q=json.loads(json.dumps(q).replace(OUT.as_posix(),'native/fastapi'))
                init=initialized.model_dump(mode='json',by_alias=True)
                assert not s.get('isError',s.get('is_error')) and not q.get('isError',q.get('is_error'))
                return {'status':'passed','server':init.get('serverInfo',init.get('server_info')),'protocol':init.get('protocolVersion',init.get('protocol_version')),'tools':[t.name for t in listing.tools],'graph_stats':s,'query_graph':q}


def check_incremental():
    with tempfile.TemporaryDirectory(prefix='graphify-update-') as tmp:
        folder=Path(tmp);source=folder/'input';shutil.copytree(ROOT/'sample',source)
        output=folder/'graphify-out'
        env={k:v for k,v in os.environ.items() if not any(token in k.upper() for token in ('API_KEY','GRAPHIFY_BACKEND','OPENAI_BASE','ANTHROPIC_BASE','OLLAMA_'))}
        env.update(PYTHONIOENCODING='utf-8',GRAPHIFY_OUT=str(output),GRAPHIFY_NO_TIPS='1')
        logs=[]
        def run(arguments):
            result=subprocess.run([sys.executable,'-m','graphify',*arguments],cwd=folder,env=env,capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=120)
            logs.append({'arguments':[arg.replace(tmp,'<temporary>') for arg in arguments],'exitCode':result.returncode,'stdout':result.stdout.replace(tmp,'<temporary>'),'stderr':result.stderr.replace(tmp,'<temporary>')})
            assert result.returncode==0,logs[-1]
        run(['extract',str(source),'--code-only','--no-cluster'])
        before=json.loads((output/'graph.json').read_text(encoding='utf-8'))
        file=source/'orders.py'
        text=file.read_text(encoding='utf-8').replace('return save_order(user, total)','return audit_order(save_order(user, total))')
        file.write_text(text+'\n\ndef audit_order(order):\n    return order\n',encoding='utf-8')
        run(['update',str(source),'--no-cluster'])
        after=json.loads((output/'graph.json').read_text(encoding='utf-8'))
        a={n['id']:n for n in before['nodes']};b={n['id']:n for n in after['nodes']}
        added=[b[n] for n in b.keys()-a.keys()]
        assert any('audit_order' in n.get('label','') for n in added),'New function must enter graph'
        assert set(a)<=set(b),'Existing source nodes must survive incremental update'
        edges=after.get('links',after.get('edges',[]))
        assert any('audit_order' in e.get('target','') and e.get('relation')=='calls' for e in edges),'New call edge must enter graph'
        for name,data in [('update-before.json',before),('update-after.json',after)]:
            (OUT/name).write_text(json.dumps(data,ensure_ascii=False,indent=2).replace(tmp,'<temporary>'),encoding='utf-8')
        return {'status':'passed','input':'Isolated copy of five-file teaching sample','modified':'orders.py','unchangedFiles':4,'beforeNodes':len(a),'afterNodes':len(b),'addedNodes':[n['label'] for n in added],'removedNodes':list(a.keys()-b.keys()),'newCallEdgeVerified':True,'logs':logs}


async def main():
    results={}
    for name,call in [('mcp',check_mcp),('incremental',check_incremental)]:
        try:
            results[name]=await asyncio.wait_for(call(),timeout=90) if name=='mcp' else call()
        except Exception as error:
            results[name]={'status':'failed','error':str(error)}
        print(name+': '+results[name]['status'],flush=True)
    (OUT/'integration.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
    body='<h1>Graphify 实际接入与更新记录</h1><p>MCP 使用标准客户端连接真实上游 stdio 服务。增量更新在隔离教学代码副本中执行，不修改真实项目。</p>'
    for name,data in results.items():body+='<h2>'+name+' · '+data['status']+'</h2><pre>'+html.escape(json.dumps(data,ensure_ascii=False,indent=2))+'</pre>'
    body+='<p><a href="update-before.json">更新前完整图</a> · <a href="update-after.json">更新后完整图</a> · <a href="integration.json">机器记录</a></p>'
    (OUT/'integration.html').write_text(document_page('真实 MCP 与增量验证',body),encoding='utf-8')
    assert all(v['status']=='passed' for v in results.values()), results


if __name__=='__main__':asyncio.run(main())
