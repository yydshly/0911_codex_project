"""Build the reading archive and original diagram from project-owned sources."""
from pathlib import Path
import hashlib
import html
import re
import shutil
import os
import markdown
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'web' / 'dist'
OUT.mkdir(parents=True, exist_ok=True)
(OUT / 'assets').mkdir(exist_ok=True)

def make_guide():
    width, height = 1600, 1340
    colors = {'ink':'#152d34','muted':'#52676e','paper':'#f5f3ec','panel':'#fffef9','line':'#cbd7cf','green':'#146555','blue':'#295d94','orange':'#a44f26'}
    img = Image.new('RGB', (width,height), colors['paper'])
    draw = ImageDraw.Draw(img)
    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">', '<title id="title">LongHorizon-Harness 整体指导图</title>', '<desc id="desc">人给出目标、边界和标准；管理者动态派单，执行者使用现有 Agent 操作，审计者独立验收；账本支持下一轮。结果可为完成、请示、阻塞、停止或达到限制。</desc>', f'<rect width="1600" height="1340" fill="{colors["paper"]}"/>']
    candidates = [os.environ.get('LH_GUIDE_FONT',''), 'C:/Windows/Fonts/msyh.ttc', '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc']
    font_path = next((p for p in candidates if p and Path(p).exists()), None)
    if not font_path:
        raise RuntimeError('Set LH_GUIDE_FONT to a Chinese font file.')
    def rect(x,y,w,h,fill='panel',stroke='line',radius=8):
        f=colors.get(fill,fill); s=colors.get(stroke,stroke)
        draw.rounded_rectangle((x,y,x+w,y+h),radius,fill=f,outline=s,width=2)
        svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{f}" stroke="{s}" stroke-width="2"/>')
    def text(x,y,value,size=24,color='ink',bold=False):
        c=colors.get(color,color); font=ImageFont.truetype(font_path,size,index=0)
        if x+draw.textlength(value,font=font)>width-25:
            raise ValueError('Diagram text extends beyond canvas: '+value)
        draw.text((x,y),value,font=font,fill=c,anchor='lt',stroke_width=0)
        svg.append(f'<text x="{x}" y="{y+size}" fill="{c}" font-family="Microsoft YaHei,Noto Sans CJK SC,sans-serif" font-size="{size}" font-weight="{700 if bold else 400}">{html.escape(value)}</text>')
    def lines(x,y,values,size=23,color='muted',gap=36):
        for i,v in enumerate(values):text(x,y+i*gap,v,size,color)
    def arrow(points,color='green'):
        c=colors[color];draw.line(points,fill=c,width=4,joint='curve')
        ex,ey=points[-1];px,py=points[-2]
        if ex>px: tri=[(ex,ey),(ex-13,ey-8),(ex-13,ey+8)]
        elif ex<px:tri=[(ex,ey),(ex+13,ey-8),(ex+13,ey+8)]
        elif ey>py:tri=[(ex,ey),(ex-8,ey-13),(ex+8,ey-13)]
        else:tri=[(ex,ey),(ex-8,ey+13),(ex+8,ey+13)]
        draw.polygon(tri,fill=c)
        svg.append('<polyline points="'+' '.join(f'{x},{y}' for x,y in points)+f'" fill="none" stroke="{c}" stroke-width="4"/>')
        svg.append('<polygon points="'+' '.join(f'{x},{y}' for x,y in tri)+f'" fill="{c}"/>')
    text(70,35,'研究指导图  /  003',20,'green',True)
    text(70,78,'LongHorizon-Harness',51,'ink',True)
    text(70,145,'动态拆解复杂目标，指导现有 Agent 分轮执行，以独立验收推动计划持续修正。',26)
    rect(70,207,1460,80,fill='#e7efe8',stroke='green')
    text(95,229,'人的起点：明确目标 + 输入资料 + 权限边界 + 验收标准',27,'green',True)
    text(70,310,'固定循环 · 动态任务',21,'muted')
    cards=[(70,'M  管理者','Manager','green',['维护原始要求与任务契约','读取审计证据，判断依赖','选下一步、标准和边界']), (585,'E  执行者','Executor','blue',['每轮使用新的上下文','调用 Codex 等现有 Agent','通过工具完成本轮任务']), (1100,'A  审计者','Auditor','orange',['独立检查真实产物与状态','对照原始要求查漏补缺','报告完成项、缺失项和证据'])]
    for x,title,sub,c,body in cards:
        rect(x,353,430,205,stroke=c)
        text(x+24,374,title,31,c,True);text(x+24,418,sub,18,c)
        lines(x+24,452,body,23,gap=31)
    arrow([(500,444),(585,444)]);text(515,407,'派单',19,'green')
    arrow([(1015,444),(1100,444)],'blue');text(1027,407,'产物',19,'blue')
    rect(70,653,1460,108,fill='#e7efe8',stroke='green')
    text(95,675,'跨轮进度账本',27,'green',True)
    text(370,674,'已验证事实与证据  /  未完成要求  /  阻塞原因  /  不可信产物',25)
    text(370,714,'Manager 维护，程序保存；审计报告提供可信依据。支持中断后的任务续接。',21,'muted')
    arrow([(1315,558),(1315,653)],'orange');text(1335,592,'记录结果',21,'orange')
    arrow([(245,653),(245,558)]);text(265,592,'更新计划，继续下一轮',22,'green')
    text(70,803,'自动推进的边界',25,'ink',True)
    rect(70,851,460,156);rect(560,851,465,156);rect(1055,851,475,156)
    text(92,871,'什么时候结束？',26,'green',True)
    lines(92,916,['完成 / 请示用户 / 阻塞或错误','主动停止 / 超时或轮数耗尽'],23,gap=36)
    text(582,871,'程序管流程，模型作判断',25,'blue',True)
    lines(582,916,['程序：调用、记录、状态检查','模型：拆解、操作选择、验收'],23,gap=36)
    text(1077,871,'无需持续盯守 ≠ 保证成功',25,'orange',True)
    lines(1077,916,['关键决定仍可能需要人介入','记录恢复 ≠ 全环境回滚'],23,gap=36)
    text(70,1047,'放到已有产品中理解：能力有重叠，重点各不相同',25,'ink',True)
    products=[(70,'Codex','直接执行任务','工具、代码与检查'),(445,'OpenClaw','随时可联系的助理','多渠道、会话与自动化'),(820,'Hermes','积累可复用经验','记忆、技能与任务执行'),(1195,'MetaGPT','组织可定制团队','角色、消息与协作流程')]
    for x,n,a,b in products:
        rect(x,1097,335,130)
        text(x+20,1114,n,28,'green',True);text(x+20,1157,a,22);text(x+20,1191,b,19,'muted')
    text(70,1256,'LongHorizon 本身也是多 Agent：它把长任务的分工、验收与可信进度管理组合成固定制度。',23,'ink')
    text(70,1300,'v0.1.7 · a1dd930 · 2026-09-10  |  原创概念图，非上游截图；源码研究，尚未复现上游任务。',18,'muted')
    svg.append('</svg>')
    assets=ROOT/'assets';assets.mkdir(exist_ok=True)
    (assets/'guide.svg').write_text('\n'.join(svg),encoding='utf-8',newline='\n')
    img.save(assets/'guide.png',optimize=True)
    for name in ('guide.svg','guide.png'):shutil.copy2(assets/name,OUT/'assets'/name)

def build_html():
    source=(ROOT/'research.md').read_text(encoding='utf-8')
    digest=hashlib.sha256(source.encode()).hexdigest()
    md=markdown.Markdown(extensions=['tables','fenced_code','toc'],extension_configs={'toc':{'toc_depth':'2-2'}})
    body=md.convert(source)
    body=re.sub(r'^<h1.*?</h1>\s*','',body,count=1,flags=re.S)
    body=re.sub(r'\[S(\d+)\]',r'<a href="#source-\1" aria-label="来源 S\1">[S\1]</a>',body)
    body=re.sub(r'<td>S(\d+)</td>',r'<td id="source-\1">S\1</td>',body)
    body=body.replace('<table>','<div class="table-scroll"><table>').replace('</table>','</table></div>')
    nav=''.join(f'<a href="#{html.escape(t["id"])}">{html.escape(t["name"])}</a>' for t in md.toc_tokens)
    summary='将复杂目标动态拆解为可执行、可验证的子任务，指导现有 Agent 分轮推进，以独立验收、可信进度和失败反馈持续修正计划。'
    page=f'''<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>LongHorizon-Harness｜完整研究存档</title><meta name="description" content="{summary}"><meta name="research-source-sha256" content="{digest}"><link rel="stylesheet" href="style.css"></head>
<body><header class="masthead"><span>GITHUB 项目研究集 / 003</span><span>研究存档 · 2026.09.10</span></header><div class="layout"><aside class="sidebar"><strong>LONGHORIZON / 阅读导航</strong><nav><a href="#guide">整体指导图</a>{nav}</nav><p class="note">v0.1.7 · a1dd930<br>文档 + 核心源码研究<br>上游任务运行尚未复现<br>本页为静态存档，无模型调用</p></aside><main><span class="eyebrow">LONG-HORIZON TASK CONTROL</span><h1>复杂目标，分轮执行。<br>每一步，都有验收依据。</h1><p class="lead">{summary}</p><div class="meta"><span class="badge">动态规划</span><span class="badge">执行与审查分离</span><span class="badge">跨轮进度</span><span class="badge">人工边界</span><span class="badge">产品对比</span></div><div class="callout">可以无需人持续盯守地推进目标；能否完成、结果是否正确，仍取决于模型、工具、环境和验收质量。</div><div class="actions"><a href="research.md" download>下载完整文档</a><a href="assets/guide.png" download>下载指导图 PNG</a><a href="assets/guide.svg" download>下载可编辑 SVG</a><a href="https://github.com/AMAP-ML/LongHorizon-Harness">上游仓库 ↗</a></div><figure class="figure" id="guide"><a href="assets/guide.png"><img src="assets/guide.png" width="1600" height="1340" alt="目标输入、管理执行审计循环、可信进度账本、人工和程序边界，以及 Codex、OpenClaw、Hermes、MetaGPT 定位对比"></a><figcaption class="caption">整体指导图 · 点击可查看原图。原创解释图，不是上游界面截图或真实运行轨迹。</figcaption></figure><article class="report">{body}</article><footer class="footer">正文与 Markdown 来自同一维护源。完整包含 13 个主题章节与 12 条来源。可离线阅读，浏览器打印可保存 PDF。<br>本存档通过 GitHub Pages 发布，亦可离线阅读。<a href="https://yydshly.github.io/0911_codex_project/003-longhorizon-harness/">正式在线入口</a>；本页不执行任何真实 Agent 任务。</footer></main></div></body></html>'''
    (OUT/'index.html').write_text(page,encoding='utf-8',newline='\n')
    shutil.copy2(ROOT/'research.md',OUT/'research.md')
    print(f'Archive built: {len(md.toc_tokens)} chapters; source SHA256 {digest}')

if __name__=='__main__':
    make_guide()
    build_html()
