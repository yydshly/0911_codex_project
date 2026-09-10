"""Render the canonical Chinese document into the static research handbook."""
from pathlib import Path
import hashlib
import html
import json
import re
import shutil
import markdown

APP = Path(__file__).resolve().parent
PROJECT = APP.parent
DIST = APP / 'dist'
DIST.mkdir(exist_ok=True)
source = (PROJECT / 'notes.md').read_text(encoding='utf-8')
body = markdown.markdown(source, extensions=['tables', 'fenced_code', 'attr_list', 'toc'])
body = re.sub(r'^<h1[^>]*>.*?</h1>\s*', '', body, count=1)
chapters = re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', body)
body = re.sub(r'<table>(.*?)</table>', r'<div class="table-scroll" tabindex="0" role="region" aria-label="对比表，可横向滚动"><table>\1</table></div>', body, flags=re.S)
parts = re.split(r'(?=<h2\s)', body)
intro = parts.pop(0)
sections = '\n'.join('<section class="chapter">' + part + '</section>' for part in parts)
toc = '\n'.join(f'<a href="#{html.escape(key)}">{label}</a>' for key, label in chapters)
template = (APP / 'template.html').read_text(encoding='utf-8')
page = template.replace('<!--TOC-->', toc).replace('<!--INTRO-->', intro).replace('<!--CONTENT-->', sections)
(DIST / 'index.html').write_text(page, encoding='utf-8', newline='\n')
for name in ['styles.css', 'app.js']:
    shutil.copyfile(APP / name, DIST / name)
(DIST / 'assets').mkdir(exist_ok=True)
shutil.copyfile(PROJECT / 'assets' / 'architecture.svg', DIST / 'assets' / 'architecture.svg')
(DIST / 'downloads').mkdir(exist_ok=True)
shutil.copyfile(PROJECT / 'notes.md', DIST / 'downloads' / 'upscayl-research.md')
manifest = {
    'researchIndex': '013', 'directory': '013-upscayl', 'checkedAt': '2026-09-11',
    'upstreamCommit': 'a00d55fee90e0f9435d5eaa86e76700df8199af8',
    'backendCommit': '0beb39028a0ddd83250e845b4c3333c0675e3b97',
    'sourceSha256': hashlib.sha256((PROJECT / 'notes.md').read_bytes()).hexdigest(),
    'chapters': [key for key, _ in chapters],
    'sources': dict(re.findall(r'^\[(s\d+)\]: (https://\S+)$', source, re.M)),
    'scope': '文档与源码研究；未执行上游推理、竞品基准或浏览器视觉测试'
}
(DIST / 'research-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Built {len(chapters)} chapters, {len(manifest["sources"])} sources: {DIST}')
