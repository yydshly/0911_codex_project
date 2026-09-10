"""Render the original capability diagram; optional dependency: Pillow."""
from pathlib import Path
from html import escape
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
W, H = 1560, 1130
canvas = Image.new('RGB', (W, H), '#F4F6F3')
draw = ImageDraw.Draw(canvas)
font_file = Path(os.environ.get('WINDIR', 'C:/Windows')) / 'Fonts/msyh.ttc'
if not font_file.exists():
    raise SystemExit('需要 Microsoft YaHei 字体；也可直接使用已提供的 SVG。')
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc">',
       '<title id="title">Drama Skills 原库能力总览</title>',
       '<desc id="desc">故事开发、视觉资产、分镜关键帧、视频提示词、确认后媒体生产与剪辑；审查按需进行。原创示意图，非真实运行成果。</desc>']

def rect(x, y, w, h, fill, radius=0, stroke=None):
    draw.rounded_rectangle((x, y, x+w, y+h), radius, fill, outline=stroke, width=1)
    svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}"'+(f' stroke="{stroke}"' if stroke else '')+'/>')

def text(x, y, value, size=23, fill='#203A38'):
    font = ImageFont.truetype(str(font_file), size)
    draw.text((x, y), value, font=font, fill=fill, anchor='lt')
    svg.append(f'<text x="{x}" y="{y}" dominant-baseline="text-before-edge" font-family="Microsoft YaHei, Noto Sans CJK SC, sans-serif" font-size="{size}" fill="{fill}">{escape(value)}</text>')

def line(x1,y1,x2,y2,fill='#799B93',width=3):
    draw.line((x1,y1,x2,y2), fill, width)
    svg.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{fill}" stroke-width="{width}"/>')

rect(0,0,W,H,'#F4F6F3')
rect(0,0,W,223,'#183A36')
text(54,32,'DRAMA SKILLS   /   原库能力总览',22,'#BDE1CF')
text(54,79,'从故事想法，到可交接的制作材料与成片',44,'#FFFFFF')
text(54,153,'专业方法指导 Agent · 文件保存创作决定 · 程序检查引用与执行',25,'#DBEAE3')
text(54,249,'可从小说、点子、剧本、分镜或已有素材进入；下图是一种常见组合。',23)

cards = [
    ('01','故事与剧本','原著分析 / 故事开发 / 分集写作',
     ['识别冲突、人物与剧情功能','建立分集目标、动作和对白'],
     '产出：原著分析、分集地图、剧本'),
    ('02','视觉资产','人物 / 造型 / 地点 / 道具',
     ['确定固定身份与本集状态','写清参考图需要呈现的内容'],
     '产出：视觉设定、图片提示词'),
    ('03','分镜与关键帧','镜头职责 / 空间关系 / 动作边界',
     ['每镜写清起点、动作和终点','冻结关键帧只表现起始画面'],
     '产出：分镜、关键帧提示词'),
    ('04','视频与声音提示词','表演 / 运镜 / 声音 / 参考绑定',
     ['把分镜翻译成生成要求','按目标模型组织参考与时长'],
     '产出：视频提示词、音乐规格'),
    ('05','确认后生产','预览任务 → 明确确认 → 执行',
     ['通过适配器调用外部服务','保存实际素材与运行记录'],
     '产出：图片、视频、配音或音乐'),
    ('06','剪辑成片','素材取舍 / 入出点 / 字幕 / 声音',
     ['依据已有素材安排镜序','拼接、处理字幕并统一响度'],
     '产出：剪辑单、实际成片'),
]
for i,(num,title,sub,body,out) in enumerate(cards):
    x = 54+(i%3)*488
    y = 303+(i//3)*280
    accent = '#9B5C24' if i>=4 else '#246755'
    rect(x,y,464,251,'#FFFFFF',12,'#D7E0D9')
    rect(x,y,464,6,accent,3)
    text(x+23,y+22,num,20,accent)
    text(x+67,y+18,title,29)
    text(x+23,y+65,sub,19,'#62736C')
    for j,row in enumerate(body): text(x+23,y+111+j*35,row,22)
    line(x+23,y+193,x+441,y+193,'#E2E8E3',1)
    text(x+23,y+211,out,20,accent)

rect(54,865,1440,91,'#E6EADF',12)
text(78,883,'按需审查',25,'#455A35')
text(239,884,'查来源与遗漏、连续性和制作质量；输出有证据的修订要求。',23)
text(239,920,'总入口另提供：项目初始化、阶段路由、视觉方向探索、本地创作台与导出。',20,'#53664E')
text(54,985,'使用条件',22,'#915722')
text(185,985,'文字创作依赖 Agent 与模型；媒体生产需可用服务；剪辑需真实素材与 FFmpeg。',22)
text(54,1032,'提示词就绪 ≠ 已有媒体     ·     文档检查通过 ≠ 画面质量达标',22,'#53675E')
text(54,1081,'原创能力示意图，非上游界面或实跑成果  |  研究提交 dc9b0fa  |  2026-09-10',18,'#6B7D73')
svg.append('</svg>')
(ROOT/'capabilities.svg').write_text('\n'.join(svg)+'\n',encoding='utf-8')
canvas.save(ROOT/'capabilities.png',optimize=True)
print('能力图已生成：capabilities.svg / capabilities.png')
