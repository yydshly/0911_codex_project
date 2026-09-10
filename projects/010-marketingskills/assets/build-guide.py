"""Regenerate the original functional diagram; requires Pillow for PNG output."""
from pathlib import Path
from html import escape
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
W, H = 1600, 900
im = Image.new('RGB', (W, H), '#ffffff')
draw = ImageDraw.Draw(im)
font_path = Path('C:/Windows/Fonts/msyh.ttc')
if not font_path.exists():
    raise SystemExit('PNG regeneration needs a Chinese font; set font_path for this environment.')
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><title>Marketing Skills：能力与执行原理</title><rect width="1600" height="900" fill="white"/>']

def text(x, y, content, size=25, color='#122434'):
    font = ImageFont.truetype(str(font_path), size)
    draw.text((x, y), content, font=font, fill=color)
    svg.append(f'<text x="{x}" y="{y+size}" fill="{color}" font-size="{size}" font-family="Microsoft YaHei, Noto Sans CJK SC, sans-serif">{escape(content)}</text>')

def rect(x, y, w, h, fill, stroke='#c8d5e5'):
    draw.rounded_rectangle((x,y,x+w,y+h),radius=8,fill=fill,outline=stroke,width=2)
    svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{fill}" stroke="{stroke}" stroke-width="2"/>')

def arrow(points, color='#496a93'):
    draw.line(points, fill=color, width=3)
    points_text = ' '.join(f'{x},{y}' for x,y in points)
    svg.append(f'<polyline points="{points_text}" fill="none" stroke="{color}" stroke-width="3"/>')
    x,y=points[-1]; px,py=points[-2]
    if x>px: tri=[(x,y),(x-12,y-7),(x-12,y+7)]
    elif x<px: tri=[(x,y),(x+12,y-7),(x+12,y+7)]
    elif y>py: tri=[(x,y),(x-7,y-12),(x+7,y-12)]
    else: tri=[(x,y),(x-7,y+12),(x+7,y+12)]
    draw.polygon(tri,fill=color)
    coords=' '.join(f'{a},{b}' for a,b in tri)
    svg.append(f'<polygon points="{coords}" fill="{color}"/>')

text(65,40,'Marketing Skills / 让专业方法进入执行流程',38)
text(65,105,'结构化技能 + 共享产品背景 + 可用工具；由宿主 Agent 理解、执行与核验。',24,'#506174')
rect(540,180,470,140,'#edf3fc')
text(566,197,'共享背景 · 产品与用户',27,'#1254bf')
text(566,245,'.agents/product-marketing.md',22)
text(566,281,'定位 / 受众 / 品牌用语 / 事实证据',21,'#506174')
rect(60,390,300,180,'#112b48','#112b48')
text(85,416,'01 用户任务',27,'#ffffff')
text(85,469,'目标、资料与约束',24,'#ffffff')
text(85,516,'例如：改善研究入口',21,'#c4d7ed')
rect(540,380,470,205,'#1254bf','#1254bf')
text(566,405,'02 宿主 Agent + 技能',28,'#ffffff')
text(566,460,'匹配 description → 读取 SKILL.md',22,'#ffffff')
text(566,502,'遵循分析步骤，形成可检查的产物',22,'#ffffff')
text(566,544,'需要细节时读取 references/',21,'#dbe9ff')
rect(1190,390,350,180,'#112b48','#112b48')
text(1215,416,'03 可用工具',27,'#ffffff')
text(1215,469,'文件 / 页面 / API / MCP',23,'#ffffff')
text(1215,516,'实际能力取决于环境与权限',21,'#c4d7ed')
rect(540,660,470,135,'#edf3fc')
text(566,679,'04 结果核验与反馈',27,'#1254bf')
text(566,731,'检查真实产物、数据与任务目标',23)
text(566,765,'证据不足 → 保留假设，继续验证',21,'#506174')
arrow([(360,480),(540,480)])
arrow([(775,320),(775,380)])
arrow([(1010,480),(1190,480)])
arrow([(1365,570),(1365,725),(1010,725)])
arrow([(640,660),(640,585)])
text(1060,672,'工具返回结果',20,'#506174')
text(658,611,'反馈修正',20,'#506174')
text(65,832,'原创机制示意图 · 非界面截图 / 非真实运行轨迹 · 固定研究提交 5b2c000',22,'#506174')
svg.append('</svg>')
(HERE/'guide.svg').write_text('\n'.join(svg),encoding='utf-8')
(HERE.parent/'app/dist/guide.svg').write_text('\n'.join(svg),encoding='utf-8')
im.save(HERE/'guide.png')
print('Generated guide.svg, guide.png and website diagram.')
