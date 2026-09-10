"""Generate a static reading site from project-owned Markdown sources."""
from pathlib import Path
import hashlib
import html
import json
import re
import shutil
from urllib.parse import urlsplit
import markdown
from markdown.extensions.toc import slugify_unicode

APP = Path(__file__).resolve().parent
PROJECT = APP.parent
OUT = APP / 'dist'
REPO = PROJECT.parents[1]
BASE = 'https://github.com/yydshly/0911_codex_project/blob/main/'
DOCS = ['README', 'understanding', 'capabilities', 'architecture', 'comparison', 'notes']
OUT.mkdir(exist_ok=True)
(OUT / 'assets').mkdir(exist_ok=True)
(OUT / 'downloads').mkdir(exist_ok=True)

def convert(text):
    return markdown.markdown(text, extensions=['tables', 'fenced_code', 'toc'], extension_configs={'toc': {'slugify': slugify_unicode}}, output_format='html5')

def rewrite_links(content, source):
    def replace(m):
        attr, target = m.groups()
        if urlsplit(target).scheme or target.startswith('#'):
            return m.group(0)
        dest, sep, anchor = target.partition('#')
        path = (source.parent / dest).resolve()
        if path.parent == PROJECT and path.stem in DOCS and path.suffix == '.md':
            url = path.stem.lower() + '.html' + (sep+anchor if sep else '')
        elif path.parent == PROJECT / 'assets' and path.suffix != '.md':
            url = 'assets/' + path.name
        elif path == OUT / 'index.html':
            url = 'index.html'
        else:
            url = BASE + path.relative_to(REPO).as_posix() + (sep+anchor if sep else '')
        return f'{attr}="{html.escape(url, quote=True)}"'
    return re.sub(r'(href|src)="([^"]+)"', replace, content)

def nav():
    return '<a class="brand" href="index.html">FreeLLMAPI <span>研究 005</span></a><nav aria-label="主导航"><a href="index.html#flow">核心交互</a><a href="index.html#compare">产品对比</a><a href="index.html#library">完整研究</a></nav>'

hashes = {}
for name in DOCS:
    source = PROJECT / (name + '.md')
    raw = source.read_text(encoding='utf-8-sig')
    hashes[name+'.md'] = hashlib.sha256(raw.encode('utf-8')).hexdigest()
    body = rewrite_links(convert(raw), source)
    title = re.search(r'^# (.+)', raw)[1]
    (OUT/(name.lower()+'.html')).write_text(f'''<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(title)} · FreeLLMAPI 研究</title><meta name="description" content="FreeLLMAPI 的中文能力、架构与模型网关产品研究。"><link rel="stylesheet" href="style.css"></head>
<body><a class="skip" href="#content">跳到正文</a><header class="top">{nav()}</header><main id="content" class="reader"><a class="back" href="index.html">← 返回理解展示</a>{body}<p class="download"><a href="downloads/{name}.md" download>下载本篇 Markdown</a></p></main><footer>文档与源码研究 · 真实模型调用待验证 · 对比日期 2026-09-10</footer></body></html>''', encoding='utf-8', newline='\n')
    (OUT/'downloads'/source.name).write_text(raw, encoding='utf-8', newline='\n')

comparison = (PROJECT/'comparison.md').read_text(encoding='utf-8')
table = comparison.split('## 产品总览\n',1)[1].split('\n## ',1)[0]
template = (APP/'index.template.html').read_text(encoding='utf-8')
overview = template.replace('{{NAV}}',nav()).replace('{{COMPARISON}}', '<div class="table-scroll" tabindex="0" role="region" aria-label="七个模型网关产品对照表">'+convert(table)+'</div>')
assert '{{' not in overview
(OUT/'index.html').write_text(overview, encoding='utf-8', newline='\n')
for name in ['architecture.png','architecture.svg','architecture.mmd','guide.png','guide.svg','guide.mmd']:
    shutil.copyfile(PROJECT/'assets'/name, OUT/'assets'/name)
(OUT/'source-manifest.json').write_text(json.dumps({'researchCommit':'83562ad360a65d80b6319297fee4cd47dc5a2ff3','comparisonDate':'2026-09-10','hashEncoding':'UTF-8 without BOM, LF newlines','documents':hashes},ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
print('Built overview and',len(DOCS),'reading pages from Markdown.')
