"""Check archive content parity, local references, anchors and generated media."""
from pathlib import Path
from html.parser import HTMLParser
import hashlib
import json
import re
import xml.etree.ElementTree as ET
import argparse
import subprocess
from datetime import datetime, timezone
from urllib.request import urlopen
from urllib.parse import unquote,urlsplit
from PIL import Image

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'web'/'dist'
class Page(HTMLParser):
    def __init__(self):super().__init__();self.ids=[];self.refs=[];self.h2=0;self.remote_scripts=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='h2':self.h2+=1
        for key in ('src','href'):
            if key in a:self.refs.append(a[key])
        if tag=='script' and 'src' in a:self.remote_scripts.append(a['src'])

def verify(base_url=None,online_url=None,online_commit=None):
    md=(ROOT/'research.md').read_bytes();page=(OUT/'index.html').read_text(encoding='utf-8')
    assert md==(OUT/'research.md').read_bytes(),'Markdown download is stale'
    sha=hashlib.sha256(md).hexdigest();assert sha in page,'HTML is stale'
    manifest_path=ROOT.parent.parent/'docs'/'web-demos.json'
    if manifest_path.exists():
        entries=json.loads(manifest_path.read_text(encoding='utf-8'))['projects']
        entry=next(x for x in entries if x['slug']==ROOT.name)
        index=entry['researchIndex']
        assert f'# {index} · LongHorizon-Harness' in (ROOT/'README.md').read_text(encoding='utf-8'),'README index differs from manifest'
        assert f'GITHUB 项目研究集 / {index}</span>' in page,'web index differs from manifest'
        assert f'研究指导图  /  {index}</text>' in (ROOT/'assets'/'guide.svg').read_text(encoding='utf-8'),'guide index differs from manifest'
    p=Page();p.feed(page)
    assert p.h2==13,(p.h2,'chapter count')
    assert len(p.ids)==len(set(p.ids)),'duplicate ids'
    assert not p.remote_scripts,'archive must not depend on scripts'
    checked=0
    for ref in p.refs:
        parsed=urlsplit(ref)
        if parsed.scheme or parsed.netloc:continue
        if parsed.path:
            target=(OUT/unquote(parsed.path)).resolve()
            assert target.is_relative_to(OUT.resolve()) and target.is_file(),ref
        elif parsed.fragment:
            assert unquote(parsed.fragment) in p.ids,ref
        checked+=1
    for path in (ROOT/'README.md',ROOT/'notes.md',ROOT/'assets'/'README.md'):
        content=path.read_text(encoding='utf-8')
        assert not re.search(r'\{\{[^}]+\}\}',content),path
        for ref in re.findall(r'\]\(([^)]+)\)',content):
            if urlsplit(ref).scheme:continue
            local=unquote(ref.split('#')[0])
            target=(path.parent/local).resolve()
            assert not local or target.exists() or target==ROOT/'verification.json',(path,ref)
    ET.parse(ROOT/'assets'/'guide.svg')
    with Image.open(ROOT/'assets'/'guide.png') as im:assert im.size==(1600,1340)
    for name in ('guide.svg','guide.png'):
        assert (ROOT/'assets'/name).read_bytes()==(OUT/'assets'/name).read_bytes()
    http_checks=[]
    if base_url:
        for route in ('index.html','style.css','research.md','assets/guide.png','assets/guide.svg'):
            with urlopen(base_url.rstrip('/')+'/'+route,timeout=10) as response:
                assert response.status==200,route
                content=response.read()
                assert content==(OUT/route).read_bytes(),('served content differs',route)
                http_checks.append({'path':route,'status':200,'bytes':len(content)})
    previous_path=ROOT/'verification.json'
    previous=json.loads(previous_path.read_text(encoding='utf-8')) if previous_path.exists() else {}
    deployment=previous.get('last_verified_deployment')
    if online_url:
        parsed=urlsplit(online_url)
        assert parsed.scheme=='https' and parsed.hostname not in ('localhost','127.0.0.1','::1'),'online URL must use public HTTPS'
        assert online_commit and re.fullmatch(r'[0-9a-f]{40}',online_commit),'provide the full published commit'
        repo_root=Path(subprocess.check_output(['git','rev-parse','--show-toplevel'],cwd=ROOT,text=True).strip())
        prefix=OUT.relative_to(repo_root).as_posix()
        online_checks=[]
        for route in ('index.html','style.css','research.md','assets/guide.png','assets/guide.svg'):
            expected=subprocess.check_output(['git','show',f'{online_commit}:{prefix}/{route}'],cwd=repo_root)
            with urlopen(online_url.rstrip('/')+'/'+route,timeout=30) as response:
                assert response.status==200,route
                content=response.read()
                assert content==expected,('online differs from published commit',route)
                online_checks.append({'path':route,'status':200,'bytes':len(content),'sha256':hashlib.sha256(content).hexdigest()})
        deployment={'url':online_url.rstrip('/')+'/','commit':online_commit,'verified_at_utc':datetime.now(timezone.utc).isoformat(),'checks':online_checks}
    current_matches_online=(all(hashlib.sha256((OUT/x['path']).read_bytes()).hexdigest()==x['sha256'] for x in deployment['checks']) if deployment else None)
    result={'status':'passed','date':datetime.now(timezone.utc).date().isoformat(),'chapters':p.h2,'source_sha256':sha,'local_references_checked':checked,'document_web_parity':True,'svg_valid':True,'png_dimensions':[1600,1340],'http_checks':http_checks,'browser_automation_tested':False,'upstream_agent_run_tested':False,'online_deployed':True if deployment else None,'online_checked_this_run':bool(online_url),'last_verified_deployment':deployment,'current_local_assets_match_verified_deployment':current_matches_online}
    (ROOT/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(result,ensure_ascii=False))
if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--base-url',help='Optional local HTTP preview URL to verify against exact files')
    parser.add_argument('--online-url',help='Published HTTPS URL; verifies remote bytes against --online-commit')
    parser.add_argument('--online-commit',help='Full Git commit actually published at --online-url')
    args=parser.parse_args()
    if args.online_commit and not args.online_url:parser.error('--online-commit requires --online-url')
    verify(args.base_url,args.online_url,args.online_commit)
