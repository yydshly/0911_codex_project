"""Generate full native Graphify outputs from every Python file in FastAPI's core package."""
from pathlib import Path
from collections import Counter
import argparse
import base64
import hashlib
import html
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
import zipfile
import markdown
from graphify.extract import extract
from graphify.build import build
from graphify.cluster import cluster, score_all, label_communities_by_hub
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.export import to_json, to_svg, to_graphml, to_cypher, to_obsidian, to_canvas
from graphify.exporters.html import to_html
from graphify.tree_html import write_tree_html
from graphify.callflow_html import write_callflow_html
from graphify.wiki import to_wiki
from graphify.report import generate

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'app/dist'
OUT = DIST / 'native/fastapi'
GRAPHIFY_SHA = '3f82bf7f837a07fb0f7668fbdbd5662801906942'
FASTAPI_SHA = '50113da16fec53b66b80d75e80a89296de4fa5a5'


def write_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


def download(url, path):
    if not path.exists():
        with urllib.request.urlopen(url, timeout=90) as response:
            path.write_bytes(response.read())
    return hashlib.sha256(path.read_bytes()).hexdigest()


def document_page(title, body):
    return '<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+html.escape(title)+'</title><style>body{max-width:1080px;margin:35px auto;padding:0 25px;font:15px/1.85 system-ui;color:#dce4ef;background:#111520}a{color:#9fc7ff}h1,h2,h3{color:white}table{border-collapse:collapse;display:block;overflow:auto}td,th{padding:9px;border:1px solid #394252}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#1d2331;padding:18px}code{font-family:Consolas,monospace}</style><body>'+body+'</body></html>'


def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--source', required=True); args=parser.parse_args()
    repo=Path(args.source).resolve(); source=repo/'fastapi'
    commit=subprocess.check_output(['git','-C',str(repo),'rev-parse','HEAD'],text=True).strip()
    assert commit==FASTAPI_SHA, 'FastAPI source revision does not match the recorded input'
    OUT.mkdir(parents=True,exist_ok=True)
    for name in ['LICENSE','LICENSE-MIT','NOTICE']:
        shutil.copyfile(ROOT/'upstream-licenses'/name,OUT/('Graphify-'+name))
    vendor=DIST/'native/vendor';vendor.mkdir(exist_ok=True)
    assets=[
        ('vis-network.min.js','https://unpkg.com/vis-network@9.1.6/standalone/umd/vis-network.min.js'),
        ('vis-LICENSE-MIT','https://unpkg.com/vis-network@9.1.6/LICENSE-MIT'),
        ('vis-LICENSE-APACHE','https://unpkg.com/vis-network@9.1.6/LICENSE-APACHE-2.0'),
        ('d3.min.js','https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js'),
        ('d3-LICENSE','https://cdn.jsdelivr.net/npm/d3@7.9.0/LICENSE'),
        ('mermaid.min.js','https://cdn.jsdelivr.net/npm/mermaid@11.12.0/dist/mermaid.min.js'),
        ('mermaid-LICENSE','https://cdn.jsdelivr.net/npm/mermaid@11.12.0/LICENSE'),
    ]
    vendor_manifest=[]
    for filename,url in assets:
        vendor_manifest.append({'file':filename,'url':url,'sha256':download(url,vendor/filename)})
    assert base64.b64encode(hashlib.sha384((vendor/'vis-network.min.js').read_bytes()).digest()).decode()=='Ux6phic9PEHJ38YtrijhkzyJ8yQlH8i/+buBR8s3mAZOJrP1gwyvAcIYl3GWtpX1'
    write_json(vendor/'manifest.json',vendor_manifest)
    paths=sorted(source.rglob('*.py'))
    print(f'Extracting all {len(paths)} FastAPI package Python files',flush=True)
    with tempfile.TemporaryDirectory(prefix='graphify-native-') as cache:
        raw=extract(paths,root=source,cache_root=Path(cache),parallel=False)
    assert not raw.get('failed_sources'), raw.get('failed_sources')
    graph=build([raw],directed=True,root=source)
    communities=cluster(graph); labels=label_communities_by_hub(graph,communities); cohesion=score_all(graph,communities)
    hubs=god_nodes(graph,top_n=20); surprises=surprising_connections(graph,communities,top_n=20)
    questions=suggest_questions(graph,communities,labels)
    to_json(graph,communities,str(OUT/'graph.json'),force=True,built_at_commit=commit,community_labels=labels)
    write_json(OUT/'community_labels.json',labels)
    assert to_html(graph,communities,str(OUT/'graph.html'),community_labels=labels,node_limit=graph.number_of_nodes()+1)
    # Preserve the exact upstream-generated page; serving copy changes CDN URLs only.
    shutil.copyfile(OUT/'graph.html',OUT/'graph.upstream.html')
    text=(OUT/'graph.html').read_text(encoding='utf-8').replace('https://unpkg.com/vis-network@9.1.6/standalone/umd/vis-network.min.js','../vendor/vis-network.min.js')
    (OUT/'graph.html').write_text(text,encoding='utf-8')
    write_tree_html(OUT/'graph.json',OUT/'tree.html',max_children=graph.number_of_nodes()+1,project_label='FastAPI')
    text=(OUT/'tree.html').read_text(encoding='utf-8').replace('https://d3js.org/d3.v7.min.js','../vendor/d3.min.js')
    (OUT/'tree.html').write_text(text,encoding='utf-8')
    report=generate(graph,communities,cohesion,labels,hubs,surprises,{'total_files':len(paths),'total_words':sum(len(p.read_text(encoding='utf-8').split()) for p in paths)}, {'input':0,'output':0},'fastapi',suggested_questions=questions,min_community_size=1,built_at_commit=commit)
    (OUT/'GRAPH_REPORT.md').write_text(report,encoding='utf-8')
    (OUT/'report.html').write_text(document_page('Graphify 原生分析报告', '<p>Graphify 原生 Markdown 报告的 HTML 排版；正文未改写。<a href="GRAPH_REPORT.md">下载原文</a></p>'+markdown.markdown(report,extensions=['tables','fenced_code'])),encoding='utf-8')
    print(f'Native graph: {graph.number_of_nodes()} nodes / {graph.number_of_edges()} edges / {len(communities)} communities',flush=True)
    write_callflow_html(graph=OUT/'graph.json',report=OUT/'GRAPH_REPORT.md',labels=OUT/'community_labels.json',output=OUT/'callflow.html',lang='zh',max_sections=len(communities)+1,max_diagram_nodes=graph.number_of_nodes(),max_diagram_edges=graph.number_of_edges())
    text=(OUT/'callflow.html').read_text(encoding='utf-8').replace('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js','../vendor/mermaid.min.js')
    (OUT/'callflow.html').write_text(text,encoding='utf-8')
    print('Exporting SVG, GraphML, Cypher, Obsidian, Canvas and Wiki',flush=True)
    to_svg(graph,communities,str(OUT/'graph.svg'),community_labels=labels)
    to_graphml(graph,communities,str(OUT/'graph.graphml'))
    to_cypher(graph,str(OUT/'cypher.txt'))
    to_obsidian(graph,communities,str(OUT/'obsidian'),community_labels=labels,cohesion=cohesion)
    to_canvas(graph,communities,str(OUT/'graph.canvas'),community_labels=labels)
    to_wiki(graph,communities,OUT/'wiki',community_labels=labels,cohesion=cohesion,god_nodes_data=hubs)
    for md in (OUT/'wiki').glob('*.md'):
        rendered=markdown.markdown(md.read_text(encoding='utf-8'),extensions=['tables','fenced_code'])
        rendered=re.sub(r'href="([^"#:]+)\.md(#[^"]*)?"',lambda m:'href="'+m[1]+'.html'+(m[2] or '')+'"' if (md.parent/(m[1]+'.md')).exists() else m[0],rendered)
        md.with_suffix('.html').write_text(document_page(md.stem,rendered),encoding='utf-8')
    with zipfile.ZipFile(OUT/'obsidian.zip','w',zipfile.ZIP_DEFLATED) as archive:
        for file in (OUT/'obsidian').rglob('*'):
            if file.is_file():archive.write(file,file.relative_to(OUT/'obsidian'))
        archive.write(OUT/'graph.canvas','graph.canvas')
    shutil.copyfile(repo/'LICENSE',OUT/'LICENSE-FastAPI')
    source_manifest=[{'file':p.relative_to(source).as_posix(),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'lines':len(p.read_text(encoding='utf-8').splitlines())} for p in paths]
    write_json(OUT/'sources.json',source_manifest)
    with zipfile.ZipFile(OUT/'source.zip','w',zipfile.ZIP_DEFLATED) as archive:
        for file in paths:archive.write(file,'fastapi/'+file.relative_to(source).as_posix())
        archive.write(repo/'LICENSE','LICENSE')
    evidence=[]
    with tempfile.TemporaryDirectory(prefix='graphify-query-') as tmp:
        for command,arguments in [('explain',['APIRouter']),('query',['APIRouter routing dependencies']),('path',['FastAPI','APIRouter']),('affected',['APIRouter'])]:
            extra=['--budget','100000'] if command=='query' else []
            result=subprocess.run([sys.executable,'-m','graphify',command,*arguments,*extra,'--graph',str(OUT/'graph.json')],cwd=tmp,capture_output=True,text=True,encoding='utf-8',env={**os.environ,'PYTHONIOENCODING':'utf-8','GRAPHIFY_OUT':tmp},timeout=90)
            clean=lambda text:text.replace(str(OUT),'native/fastapi').replace(OUT.as_posix(),'native/fastapi')
            evidence.append({'command':command,'arguments':arguments,'options':extra,'exitCode':result.returncode,'output':clean(result.stdout),'stderr':clean(result.stderr)})
    write_json(OUT/'queries.json',evidence)
    metadata={'name':'FastAPI','repository':'https://github.com/fastapi/fastapi','commit':commit,'graphifyCommit':GRAPHIFY_SHA,'graphifyVersion':'0.9.57','scope':'fastapi/ 核心包内全部 Python 文件；不含 tests、docs_src 与外部依赖实现','files':len(paths),'nodes':graph.number_of_nodes(),'edges':graph.number_of_edges(),'communities':len(communities),'confidence':dict(Counter(d.get('confidence') for _,_,d in graph.edges(data=True))),'relations':dict(Counter(d.get('relation') for _,_,d in graph.edges(data=True))),'cluster':'Louvain','inputTokens':0,'outputTokens':0,'failedSources':raw.get('failed_sources',[]),'graphAggregated':False,'graphNodeLimit':graph.number_of_nodes()+1,'treeMaxChildren':graph.number_of_nodes()+1,'callflowMaxSections':len(communities)+1,'callflowMaxDiagramNodes':graph.number_of_nodes(),'callflowMaxDiagramEdges':graph.number_of_edges(),'hubs':hubs,'surprises':surprises,'questions':questions,'queries':evidence}
    write_json(OUT/'receipt.json',metadata)
    (DIST/'native-data.js').write_text('window.NATIVE_DATA = '+json.dumps(metadata,ensure_ascii=False)+';\n',encoding='utf-8')
    print(json.dumps({k:metadata[k] for k in ['files','nodes','edges','communities','confidence']},ensure_ascii=False),flush=True)


if __name__=='__main__':main()
