"""Build a static reading page from the project documentation; no agent runtime."""
from pathlib import Path
import re
import shutil
import markdown

APP=Path(__file__).resolve().parent
PROJECT=APP.parent
ROOT=PROJECT.parent.parent
DIST=APP/'dist'
DIST.mkdir(exist_ok=True)
REPO='https://github.com/yydshly/0911_codex_project/blob/main/'

def document(name):
    raw=(PROJECT/name).read_text(encoding='utf-8-sig')
    if name=='README.md':
        raw=raw.split('## 能力概览',1)[1].split('## 网页构建与验证',1)[0]
        raw='## 能力概览'+raw
    def rewrite(match):
        label,url=match.groups()
        if re.match(r'https?://|#',url):return match.group(0)
        path,sep,anchor=url.partition('#')
        absolute=(PROJECT/path).resolve()
        if path.startswith('assets/') and absolute.suffix in ['.png','.svg']:
            target=path
        else:
            target=REPO+absolute.relative_to(ROOT).as_posix()
        return f'[{label}]({target}{sep}{anchor})'
    raw=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',rewrite,raw)
    html=markdown.markdown(raw,extensions=['tables','fenced_code','toc'])
    return re.sub(r'<table>(.*?)</table>',r'<div class="table-wrap"><table>\1</table></div>',html,flags=re.S)

template=(APP/'template.html').read_text(encoding='utf-8')
html=template.replace('{{CONTENT}}',document('README.md')).replace('{{NOTES}}',document('notes.md'))
(DIST/'index.html').write_text(html,encoding='utf-8')
for name in ['style.css','app.js']:
    shutil.copyfile(APP/name,DIST/name)
(DIST/'assets').mkdir(exist_ok=True)
for name in ['overview.svg','overview.png']:
    shutil.copyfile(PROJECT/'assets'/name,DIST/'assets'/name)
print('Munder Difflin static research page built')
