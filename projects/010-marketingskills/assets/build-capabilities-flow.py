"""One-page Chinese capability and applied-output diagram. PNG + editable SVG."""
from pathlib import Path
from html import escape
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
W, H = 2200, 2990
BG, INK, MUTED = '#f5f7fb', '#142d47', '#485e75'
BLUE, TEAL, LINE = '#175ab7', '#117264', '#d1dcea'
im = Image.new('RGB', (W, H), BG)
d = ImageDraw.Draw(im)
regular = 'C:/Windows/Fonts/msyh.ttc'
bold = 'C:/Windows/Fonts/msyhbd.ttc'
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">',
       '<title>Marketing Skills：核心能力、相关技能与输入到最终产物</title>',
       '<desc>上层展示库的八类能力；中层解释宿主执行机制；五步真实应用依次产出产品背景、交付方案、文案、验证计划与推进规则；底层区分本地已交付和待验证效果。</desc>',
       f'<rect width="{W}" height="{H}" fill="{BG}"/>']

def font(size, weight=False):
    return ImageFont.truetype(bold if weight else regular, size)

def text(x, y, value, size=30, color=INK, weight=False):
    f = font(size, weight)
    assert x + d.textlength(value, font=f) < W - 35, value
    d.text((x, y), value, font=f, fill=color, anchor='lt')
    svg.append(f'<text x="{x}" y="{y}" dominant-baseline="text-before-edge" font-family="Microsoft YaHei,Noto Sans CJK SC,sans-serif" font-size="{size}" font-weight="{700 if weight else 400}" fill="{color}">{escape(value)}</text>')

def wrap(x, y, value, width, size=30, color=INK, weight=False, leading=1.45, max_lines=None):
    lines, current = [], ''
    for c in value:
        if c == '\n':
            lines.append(current); current = ''; continue
        if d.textlength(current+c, font=font(size, weight)) > width:
            lines.append(current); current = c
        else:
            current += c
    if current: lines.append(current)
    if max_lines: assert len(lines) <= max_lines, (value, lines)
    for i, line in enumerate(lines): text(x, y+i*size*leading, line, size, color, weight)
    return y+len(lines)*size*leading

def box(x, y, w, h, fill='white', stroke=LINE, radius=14):
    d.rounded_rectangle((x, y, x+w, y+h), radius=radius, fill=fill, outline=stroke, width=2)
    svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}" stroke-width="2"/>')

def arrow(x1, y1, x2, y2, color=BLUE):
    d.line((x1,y1,x2,y2), fill=color, width=4)
    if y1==y2: points=[(x2,y2),(x2-13,y2-8),(x2-13,y2+8)]
    elif y2>y1: points=[(x2,y2),(x2-8,y2-13),(x2+8,y2-13)]
    else: points=[(x2,y2),(x2-8,y2+13),(x2+8,y2+13)]
    d.polygon(points,fill=color)
    svg.append(f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{color}" stroke-width="4"/>')
    svg.append('<polygon points="'+' '.join(f'{x},{y}' for x,y in points)+f'" fill="{color}"/>')

def heading(y, number, title, subtitle=None):
    text(80,y,number,34,BLUE,True); text(152,y,title,38,INK,True)
    if subtitle: text(152,y+57,subtitle,27,MUTED)

text(80,55,'Marketing Skills',68,INK,True)
text(80,146,'从营销方法，到可检查的实际产物',42,BLUE,True)
text(1580,73,'能力 × 技能 × 交付链路',30,MUTED)
text(1580,126,'固定研究版本 5b2c000',27,MUTED)

box(80,224,2040,184,'#142d47','#142d47')
text(112,252,'核心能力',29,'#a8cfff',True)
text(112,302,'把产品定位、内容、获客、转化与实验方法，封装成 Agent 可复用的技能。',39,'white',True)
text(112,362,'50 个技能  ·  共享产品背景  ·  按需参考资料  ·  64 个工具脚本 / 95 份接入指南',29,'#c8dbef')

heading(455,'01','全库可以帮你做什么','八类为本地能力归纳；下列列出代表技能，非全部 50 个名称。')
groups = [
 ('定位与决策','确定受众、价值与策略','product-marketing / offers'),
 ('内容与创作','组织内容、撰写与编辑','content-strategy / copywriting'),
 ('搜索与发现','诊断搜索、提升可发现性','seo-audit / ai-seo'),
 ('页面与转化','优化页面、注册与激活','cro / signup / onboarding'),
 ('传播与推广','规划发布、广告与社交','launch / ads / social'),
 ('销售与客户关系','准备销售材料与客户沟通','sales-enablement / emails'),
 ('留存与增长','识别流失、设计重复行动','churn-prevention / marketing-loops'),
 ('衡量与实验','记录事件、归因与验证','analytics / attribution / ab-testing')
]
for i,(title,ability,skills) in enumerate(groups):
    x=80+(i%4)*516; y=566+(i//4)*179
    box(x,y,492,158)
    text(x+22,y+20,title,33,INK,True)
    text(x+22,y+69,ability,28,MUTED)
    text(x+22,y+117,skills,21,BLUE)

box(80,939,2040,106,'#e9f0fb','#c9d8eb')
text(109,960,'执行原理',29,BLUE,True)
text(295,960,'任务触发 → 宿主读取 SKILL.md → 复用产品背景 / references → 调用可用工具 → 核验产物',29,INK)
text(295,1004,'技能提供方法；宿主 Agent 负责判断与执行。账户、工具和自动调度需要另外配置。',26,MUTED)

heading(1092,'02','你的完整场景：将研究仓库变成一个产品入口','目标：基于已有中文研究、独立演示和真实证据，形成产品定位与验证路径。')
box(80,1202,2040,120,'white')
text(108,1223,'初始输入',30,BLUE,True)
text(319,1223,'已有资产：研究说明 + 演示 + Graphify / FastAPI 既有运行记录',31,INK,True)
text(319,1272,'需求：做可复用产品并验证价值；外部受众、每周投入、付费意愿仍待确认。',28,MUTED)

text(160,1365,'每一步读取什么',29,MUTED,True)
text(670,1365,'相关 skill · 核心处理能力',29,MUTED,True)
text(1250,1365,'每一步实际生成什么',29,MUTED,True)
rows = [
 ('产品与项目事实\n目标、约束、已有证据','product-marketing','按 12 类信息整理背景；\n区分事实、判断和假设。','产品背景 0.1：受众、痛点、差异与目标','产物：.agents/product-marketing.md'),
 ('上一步产品背景\n已有可交付材料','offers','明确结果与交付边界；\n检查价值、保障和定价前提。','交付方案：陌生代码库上手实践包','范围、材料、验收要求；价格待验证'),
 ('产品背景 + 交付方案\n事实证据 + 页面目标','copywriting','围绕一个主要行动写文案；\n给出标题、CTA 和备选。','入口文案：“生成我的上手任务单”','标题、副标题、证据、FAQ、备选文案'),
 ('页面行动 + 交付标准\n要作出的产品决策','analytics','从决策反推事件与口径；\n区分下载、尝试和实际完成。','验证计划：事件、验收与四周路线','有证据的任务完成才用于判断价值'),
 ('验证计划 + 人工核验反馈\n历史处理状态','marketing-loops','定义触发、动作与停止条件；\n用状态记录避免重复行动。','推进规则：下一步建议 + 状态 / 日志','本地手动执行器；空反馈不产客户结论')
]
for i,(inputs,skill,ability,output,detail) in enumerate(rows):
    y=1420+i*175
    box(80,y,2040,153,'white')
    box(101,y+20,44,44,BLUE,BLUE,10)
    text(113,y+27,str(i+1),27,'white',True)
    wrap(168,y+34,inputs,415,29,INK,max_lines=2)
    arrow(598,y+74,640,y+74)
    text(670,y+23,skill,35,BLUE,True)
    wrap(670,y+76,ability,516,28,MUTED,max_lines=2)
    arrow(1193,y+74,1230,y+74)
    text(1250,y+30,output,31,INK,True)
    text(1250,y+92,detail,27,MUTED)
    if i<4: arrow(122,y+153,122,y+174)

text(168,2321,'步骤 1 的共享背景供后续技能复用；真实反馈到来后，再修订定位与交付。',29,TEAL,True)
heading(2400,'03','最终生成效果：一个可操作、可继续验证的产品雏形')
box(80,2474,2040,161,'#e7f3ef','#bcd9d0')
text(109,2497,'定位草案 · 开源落地实验室',34,TEAL,True)
text(109,2550,'面向正在做 AI 应用的中文开发者，把具体工程问题转为有来源、有运行证据、可验收的实践包。',33,INK)
text(109,2598,'首个任务：接手陌生代码库  ·  复用 Graphify 既有案例  ·  先自用，再验证外部需求',27,MUTED)

finals=[('已生成 · 文档','产品背景、交付方案、文案、\n验证计划、推进规则'),('已实现 · 本地入口','3 条任务路线 → Markdown 任务单\n实际尝试 → 反馈 JSON → 手动复盘'),('已核验 / 待验证','已做：源码走查与程序检查\n待做：客户需求、复用价值、付费意愿')]
for i,(title,body) in enumerate(finals):
    x=80+i*686
    box(x,2660,668,153)
    text(x+24,2682,title,31,TEAL if i<2 else BLUE,True)
    wrap(x+24,2731,body,620,29,INK,max_lines=2)

text(80,2866,'说明：五份文档由当前 Agent 读取原始技能后产出；网页交互与手动循环为本地新增，不实时调用模型。',27,MUTED)
text(80,2912,'原库 coreyhaines31/marketingskills · MIT · 固定提交 5b2c000 · 本地原创说明图 / 非截图 · 2026-09-11',25,MUTED)
svg.append('</svg>')
(HERE/'capabilities-flow.svg').write_text('\n'.join(svg),encoding='utf-8')
im.save(HERE/'capabilities-flow.png',optimize=True)
print(f'Generated {W} x {H}: capabilities-flow.png + capabilities-flow.svg')
