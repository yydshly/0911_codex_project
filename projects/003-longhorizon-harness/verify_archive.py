"""Check archive content parity, local references, anchors and generated media."""
from pathlib import Path
from html.parser import HTMLParser
import hashlib
import json
import re
import xml.etree.ElementTree as ET
import argparse
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

def verify(base_url=None):
    md=(ROOT/'research.md').read_bytes();page=(OUT/'index.html').read_text(encoding='utf-8')
    assert md==(OUT/'research.md').read_bytes(),'Markdown download is stale'
    sha=hashlib.sha256(md).hexdigest();assert sha in page,'HTML is stale'
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
    result={'status':'passed','date':'2026-09-10','chapters':p.h2,'source_sha256':sha,'local_references_checked':checked,'document_web_parity':True,'svg_valid':True,'png_dimensions':[1600,1340],'http_checks':http_checks,'browser_automation_tested':False,'upstream_agent_run_tested':False,'online_deployed':False}
    (ROOT/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(result,ensure_ascii=False))
if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--base-url',help='Optional local HTTP preview URL to verify against exact files')
    verify(parser.parse_args().base_url)
