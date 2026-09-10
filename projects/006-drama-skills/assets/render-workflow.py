"""Render the source-based workflow as an editable SVG and a PNG; requires Pillow."""
from pathlib import Path
from html import escape
import math
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
W, H = 2400, 2440
BG, INK, MUTED = '#F5F7FA', '#172C40', '#607387'
BLUE, TEAL, ORANGE = '#376BDD', '#197B70', '#B66A29'
fontdir = Path(os.environ.get('WINDIR', 'C:/Windows')) / 'Fonts'
regular, bold = fontdir/'msyh.ttc', fontdir/'msyhbd.ttc'
if not regular.exists():
    raise SystemExit('需要 Microsoft YaHei 字体；已有 SVG 和 PNG 可直接使用。')
im = Image.new('RGB', (W, H), BG)
d = ImageDraw.Draw(im)
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc">',
       '<title id="title">Drama Skills 多入口、技能、产物与最终交付流程</title>',
       '<desc id="desc">小说进入原著分析；点子、梗概和多集整稿进入开发；已有单集剧本可直接拆资产。视觉事实分流到图片提示词及分镜，分镜进入视频提示词。文本可独立交付；生产经外部服务得到素材，再剪辑成片。总入口提供项目管理，任意阶段可按需审查。</desc>']
checks = []

def rect(x,y,w,h,fill,r=18,stroke=None):
    d.rounded_rectangle((x,y,x+w,y+h), r, fill=fill, outline=stroke, width=2)
    svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"'+(f' stroke="{stroke}" stroke-width="2"' if stroke else '')+'/>')

def text(x,y,s,size=26,fill=INK,heavy=False,maxw=None):
    f=ImageFont.truetype(str(bold if heavy and bold.exists() else regular),size)
    width=d.textlength(s,font=f)
    if maxw is not None:
        checks.append((s,width,maxw))
        assert width <= maxw, (s,width,maxw)
    d.text((x,y),s,font=f,fill=fill,anchor='lt')
    svg.append(f'<text x="{x}" y="{y}" dominant-baseline="text-before-edge" font-family="Microsoft YaHei, Noto Sans CJK SC, sans-serif" font-size="{size}" font-weight="{700 if heavy else 400}" fill="{fill}">{escape(s)}</text>')

def path(points,color=BLUE,width=4,dash=False,arrow=True):
    for a,b in zip(points,points[1:]):
        if dash:
            dist=math.dist(a,b)
            for pos in range(0,int(dist),17):
                end=min(pos+9,dist)
                d.line((a[0]+(b[0]-a[0])*pos/dist,a[1]+(b[1]-a[1])*pos/dist,
                        a[0]+(b[0]-a[0])*end/dist,a[1]+(b[1]-a[1])*end/dist),fill=color,width=width)
        else:
            d.line((a,b),fill=color,width=width)
    svg.append('<polyline points="'+' '.join(f'{x},{y}' for x,y in points)+f'" fill="none" stroke="{color}" stroke-width="{width}" stroke-linejoin="round"'+(' stroke-dasharray="9 8"' if dash else '')+'/>')
    if arrow:
        a,b=points[-2],points[-1]
        t=math.atan2(b[1]-a[1],b[0]-a[0])
        tri=[b,(b[0]-16*math.cos(t)+7*math.sin(t),b[1]-16*math.sin(t)-7*math.cos(t)),
             (b[0]-16*math.cos(t)-7*math.sin(t),b[1]-16*math.sin(t)+7*math.cos(t))]
        d.polygon(tri,fill=color)
        svg.append('<polygon points="'+' '.join(f'{x:.1f},{y:.1f}' for x,y in tri)+f'" fill="{color}"/>')

def entry(y,title,lines):
    rect(50,y,430,140,'#EAF0FD',stroke='#D3DFF5')
    text(74,y+18,title,29,BLUE,True,382)
    for i,line in enumerate(lines): text(74,y+63+i*32,line,23,MUTED,maxw=382)

def node(x,y,w,h,title,skill,outputs,accent=TEAL):
    rect(x,y,w,h,'#FFFFFF',stroke='#D5DFE8')
    rect(x,y,7,h,accent,3)
    text(x+25,y+17,title,31,INK,True,w-50)
    text(x+25,y+61,skill,23,accent,maxw=w-50)
    for i,line in enumerate(outputs):text(x+25,y+103+i*32,line,24,MUTED,maxw=w-50)

def delivery(y,h,title,lines,accent=TEAL):
    rect(1780,y,570,h,'#EAF5F1' if accent==TEAL else '#FCF0E3',stroke='#C9DFD7' if accent==TEAL else '#ECD3B4')
    text(1810,y+24,title,31,accent,True,510)
    for i,line in enumerate(lines):text(1810,y+78+i*39,line,25,INK,maxw=510)

rect(0,0,W,155,'#142C43',0)
text(50,28,'DRAMA SKILLS  /  能力全流程',22,'#A7C6EE')
text(50,69,'从你已有的材料进入，到你需要的交付结果',47,'#FFFFFF',True)
text(1850,38,'1 个总入口 + 10 个专业技能',24,'#D9E8FA')
text(1850,82,'方法与工具驱动 Agent 创作',24,'#D9E8FA')

rect(50,180,2300,92,'#E5EBF3',16)
text(77,199,'项目支持 · short-drama',28,INK,True)
text(640,200,'初始化 / 阶段路由 / 视觉方向探索 / 本地创作台 / 导出交付包',28)
text(640,238,'可按需使用总入口；专业技能可独立使用。已有材料从对应阶段继续，缺项再补。',23,MUTED)

text(50,292,'入口：你手里已经有什么',28,BLUE,True)
text(600,292,'技能处理 → 本阶段产物',28,TEAL,True)
text(1780,292,'可交付结果：按目标选择终点',28,TEAL,True)

# Source / development: optional stages, represented with dotted joins.
entry(350,'小说 / 长篇原著',['先判断改编价值','按章节定位人物、冲突与剧情'])
node(600,350,1000,140,'原著分析','short-drama-novel-analyze',['产出：改编快评、章节索引、剧情功能与分集候选'])
path([(480,420),(600,420)])
path([(1100,490),(1100,550)],TEAL,dash=True)
text(1120,507,'需要开发时继续',20,MUTED)

entry(550,'点子 / 梗概 / 多集整稿',['开发故事；多集整稿可切片续做','已有单集剧本不必补完整开发'])
node(600,550,1000,140,'故事开发','short-drama-develop',['产出：创作简报、故事引擎、分集地图；可选导演阐述'])
path([(480,620),(600,620)])
path([(1100,690),(1100,750)],TEAL)
delivery(350,340,'A · 分析与策划资料',[
    '小说改编价值与章节依据',
    '人物冲突、故事方向、分集规划',
    '可独立交付，用来决定是否开拍',
    '需要继续创作时，再进入写作',
    '不要求必须生成图片或视频'])
path([(1600,420),(1780,420)],TEAL)
path([(1600,620),(1780,620)],TEAL)

entry(750,'已有单集剧本',['要改稿 → 写作','剧本已定 → 直接提取视觉资产'])
node(600,750,1000,140,'分集写作','short-drama-write',['产出：剧本.md（可表演的动作、对白与声音）'])
path([(480,820),(600,820)],BLUE,dash=True)
path([(480,858),(535,858),(535,935),(620,935),(620,950)],BLUE)
path([(1100,890),(1100,950)],TEAL)

entry(950,'已有视觉设定 / 参考素材',['可继承身份、造型、场景与道具','按需补设定，或直接写图片提示词'])
node(600,950,1000,140,'视觉资产与连续性','short-drama-assets',['产出：视觉设定.md（人物 / 场景 / 道具 / 状态）'])
path([(480,1020),(600,1020)],BLUE)
path([(480,1060),(535,1060),(535,1250),(600,1250)],BLUE,dash=True)

# Two creator-owned branches: reference prompts and storyboard-owned start frames.
path([(1100,1090),(1100,1130),(830,1130),(830,1170)],TEAL)
path([(1100,1130),(1375,1130),(1375,1170)],TEAL)
node(600,1170,460,175,'参考图提示词','short-drama-image-prompts',['产出：图片提示词.md','风格帧 / 人物场景道具参考板'])
node(1150,1170,450,175,'分镜与冻结关键帧','short-drama-storyboard',['产出：分镜.md','含镜头、时长、起始画面提示词'])
path([(1375,1345),(1375,1410)],TEAL)
text(1394,1365,'将镜头翻译为运动要求',20,MUTED)

entry(1410,'已有分镜 / 关键帧',['直接写运动、表演与声音要求','明确参考图用途；缺项列出'])
node(1150,1410,450,195,'视频与声音提示词','short-drama-video-prompts',['产出：视频提示词.md','动作 / 运镜 / 声音 / 参考要求','可含跨镜音乐规格'])
path([(480,1480),(1150,1480)],BLUE)
text(620,1435,'分镜已定，可从这里接入',22,BLUE)

delivery(750,855,'B · 创作交付包（五份文档）',[
    '① 剧本.md',
    '② 视觉设定.md',
    '③ 图片提示词.md',
    '④ 分镜.md + 冻结关键帧提示词',
    '⑤ 视频提示词.md',
    '',
    '可以交给团队或自选生成工具',
    '无需在本库内完成媒体生产',
    '',
    '参考图 / 起始帧：先形成提示词',
    '经生成工具执行，才得到图片',
    '',
    '文字创作：Agent 按技能完成',
    '引用与结构：由程序机械检查',
    '内容与画面质量：需要实际审查',
    '',
    '各阶段可单独使用、单独交付'])
for yy in (820,1020,1257,1508):path([(1600,yy),(1780,yy)],TEAL)

# Production is an optional next boundary, not a prerequisite for text delivery.
rect(50,1630,2300,440,'#FFF8F0',18)
text(65,1641,'继续制作时，才进入媒体生产与后期',22,ORANGE)
path([(830,1345),(830,1390),(1100,1390),(1100,1675)],ORANGE,dash=True)
text(850,1540,'图片任务',22,ORANGE)
path([(1375,1605),(1375,1675)],ORANGE,dash=True)
entry(1690,'已有图片 / 视频 / 声音提示词',['提示词与必要参考明确后投产','外部工具生成的素材也可带入'])
node(600,1675,1000,175,'媒体生产 · 预览任务 → 明确确认 → 执行','short-drama-produce',[
    '产出：图片、视频、配音、音乐及运行记录（按任务选择）',
    '需要实际生成服务；参考图与起始帧生成后，再回填分镜和引用'],ORANGE)
path([(480,1760),(600,1760)],ORANGE)
delivery(1675,175,'C · 可用媒体素材',[
    '图片 / 镜头视频 / 配音 / 音乐',
    '保存真实文件与运行记录'],ORANGE)
path([(1600,1760),(1780,1760)],ORANGE)
path([(1100,1850),(1100,1895)],ORANGE)

entry(1900,'已有图片 / 视频 / 音频素材',['可直接整理、剪辑已有素材','无需重走小说分析或生图流程'])
node(600,1895,1000,160,'剪辑与声音整理','short-drama-edit',[
    '产出：剪辑单.md + 成片（镜序 / 入出点 / 字幕 / 响度）',
    '需要真实可用素材及 FFmpeg / FFprobe'],ORANGE)
path([(480,1970),(600,1970)],ORANGE)
delivery(1895,160,'D · 成片与交付文件',[
    '剪辑单 + 渲染成片',
    '可由总入口导出带清单的交付包'],ORANGE)
path([(1600,1970),(1780,1970)],ORANGE)

rect(50,2110,2300,145,'#F0EAF8',18,stroke='#D7C9E9')
text(78,2132,'任意阶段已有内容',30,'#704A94',True)
text(78,2180,'原著分析 / 文档 / 已有媒体',24,MUTED)
path([(490,2180),(600,2180)],'#8A6CAC')
text(625,2132,'按需审查 · short-drama-review',30,'#704A94',True)
text(625,2180,'查依据、内容、连续性与媒体质量；定位问题并交回对应技能修订',26,INK)
path([(1545,2180),(1780,2180)],'#8A6CAC')
text(1805,2132,'审查报告 / 修订要求',30,'#704A94',True)
text(1805,2180,'可独立使用，不必等到成片',25,INK)

path([(65,2292),(125,2292)],BLUE)
text(140,2277,'已有材料接入',23,MUTED)
path([(400,2292),(460,2292)],TEAL)
text(475,2277,'常见创作交接',23,MUTED)
path([(745,2292),(805,2292)],ORANGE,dash=True)
text(820,2277,'按目标 / 条件选用',23,MUTED)
text(1230,2277,'所有箭头表示交接关系，不代表自动执行或自动通过审查。',23,MUTED)
text(50,2330,'原库的作用：专业创作方法 + 文件交接 + 检查工具 + 外部生产接入。提示词产出与真实媒体产出分开理解。',27,INK,True)
text(50,2386,'依据 zenstory-ai/drama-skills 固定提交 dc9b0fa；中文原创流程图，非运行截图或生成成片证明。',22,MUTED)
svg.append('</svg>')
(ROOT/'capability-workflow.svg').write_text('\n'.join(svg)+'\n',encoding='utf-8')
im.save(ROOT/'capability-workflow.png',optimize=True)
print(f'Created {W}x{H} PNG + SVG; checked {len(checks)} text widths.')
