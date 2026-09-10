"""从固定上游快照生成可核对的技能目录。仅读取与复制资料，不执行上游技能。"""
from pathlib import Path
import re,json,hashlib,shutil,sys
base=Path(__file__).resolve().parents[1]
upstream=Path(sys.argv[1])
sha='71f6048e8ada25180e61438abc1d98cb151fe9a7'
notes=json.loads((base/'scripts/catalog-notes.json').read_text(encoding='utf-8'))
by_id={r[0]:r for r in notes}
paths=[upstream/'SKILL.md.tmpl']
paths += [(d/'SKILL.md.tmpl' if (d/'SKILL.md.tmpl').exists() else d/'SKILL.md') for d in sorted(upstream.iterdir()) if d.is_dir() and ((d/'SKILL.md.tmpl').exists() or (d/'SKILL.md').exists())]
paths += [upstream/'contrib/add-host/SKILL.md.tmpl',upstream/'browser-skills/hackernews-frontpage/SKILL.md']
out=base/'dist'; sources=out/'sources'; sources.mkdir(parents=True,exist_ok=True)
shutil.copy2(upstream/'LICENSE',sources/'LICENSE.txt')
shutil.copy2(upstream/'LICENSE',base.parent/'UPSTREAM-LICENSE.txt')
skills=[]; used=set(); hashes={}
def headings(text):
    result=[]; fenced=False
    for line in text.splitlines():
        if line.startswith('```'): fenced=not fenced;continue
        if not fenced and re.match(r'^#{1,4} ',line):result.append(re.sub(r'^#+ ','',line))
    return result
for p in paths:
    text=p.read_text(encoding='utf-8');rel=p.relative_to(upstream).as_posix()
    sid='gstack' if p.parent==upstream else ('add-host' if 'contrib/' in rel else p.parent.name)
    assert sid in by_id, sid
    r=by_id[sid];used.add(sid)
    fields=['id','group','title','goal','input','method','model','tools','check','output','boundary']
    item=dict(zip(fields,r));item['steps']=item['method'].split('；')
    item['sourcePath']=rel;item['source']='https://github.com/garrytan/gstack/blob/'+sha+'/'+rel
    item['localSource']='sources/'+sid+'.txt';item['sections']=headings(text)
    item['sourceHash']=hashlib.sha256(p.read_bytes()).hexdigest();hashes[rel]=item['sourceHash']
    (sources/(sid+'.txt')).write_bytes(p.read_bytes())
    item['relatedSources']=[]
    section_dir=p.parent/'sections'
    if section_dir.is_dir():
        for s in sorted(section_dir.glob('*.md.tmpl')):
            sr=s.relative_to(upstream).as_posix();local=sid+'--'+s.name+'.txt'
            (sources/local).write_bytes(s.read_bytes())
            item['relatedSources'].append({'label':s.name,'url':'https://github.com/garrytan/gstack/blob/'+sha+'/'+sr,'local':'sources/'+local})
            hashes[sr]=hashlib.sha256(s.read_bytes()).hexdigest()
    item['execution']='method' if sid in ['office-hours','plan-ceo-review','plan-eng-review','plan-design-review','review','qa','document-release'] else ('partial' if sid=='ship' else 'not-run')
    skills.append(item)
assert used==set(by_id),set(by_id)-used
data={'upstream':'https://github.com/garrytan/gstack','commit':sha,'version':'1.84.1','date':'2026-09-10','count':len(skills),'scope':'54 个一级目录技能 + 1 个总路由 + 1 个贡献者技能 + 1 个浏览器脚本示例；不重复计入平台生成副本、OpenClaw 方法适配副本和测试夹具。','skills':skills}
(out/'catalog.js').write_text('window.GSTACK_CATALOG = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
(out/'evidence/source-manifest.json').write_text(json.dumps({'commit':sha,'count':len(skills),'files':hashes},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
lines=['# gstack · 完整技能原理目录','',data['scope'],'','固定提交：`'+sha+'`。本文件由固定源码索引与逐项中文解读生成；执行状态见网页场景记录。','']
for s in skills:
    lines += ['## /'+s['id']+' · '+s['title'],'',s['goal'],'']
    for key,label in [('input','输入'),('method','执行方法'),('model','模型判断'),('tools','工具动作'),('check','完成检查'),('output','产物'),('boundary','边界')]:lines += ['- **'+label+'**：'+s[key]]
    lines += ['','[固定版本源码]('+s['source']+')','']
(base.parent/'skills.md').write_text('\n'.join(lines),encoding='utf-8')
print(json.dumps({'skills':len(skills),'sourceFiles':len(hashes),'output':str(out)},ensure_ascii=False))
