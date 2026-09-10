"""Build the Chinese understanding document, web section and shareable diagram.

Pillow is used only to render the authored diagram, not to edit an existing image.
"""
from pathlib import Path
from html import escape
import json
import shutil
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'app/dist'
ASSETS = ROOT / 'assets'
UPSTREAM = 'https://github.com/Graphify-Labs/graphify/blob/3f82bf7f837a07fb0f7668fbdbd5662801906942/'

SECTIONS = [
    ('入口与输入：资料不必先整理成关系图', [
        '可以从命令行指定文件夹，也可在 AI 助手中通过 /graphify 技能发起。已有 graph.json 可供 CLI、MCP 或程序继续查询；这些是使用入口，不表示当前演示网页提供任意文件上传。',
        '不需要先人工编制节点表、关系表或指定 JSON。先选择资料范围，保证内容可读取并保留出处即可；更清晰的命名、结构和上下文有助于抽取，资料中的错误、歧义和缺失仍会影响结果。',
    ], ['输入', '接入与处理方式', '本次状态'], [
        ['源码与项目文件', '支持多种语言；本地 AST / 语法解析，抽取类、函数、调用、导入、继承。部分语言或项目格式有专门解析器。', 'FastAPI 核心包 48 个 Python 文件已实测'],
        ['文档与办公资料', 'Markdown、文本、HTML、Word、Excel、PDF 等；读取或转换内容，再经模型抽取语义，部分格式需要可选组件。', '语义链路未实测'],
        ['图片与音视频', '模型理解图片；音视频通常先转写再抽取，支持的链接需要下载/转写组件。', '需要媒体、模型与依赖，未实测'],
        ['SQL 与数据库结构', '读取 SQL 中的结构与依赖，或连接 PostgreSQL 读取已有 schema。', '数据库接入未实测'],
        ['已有图谱与授权资料', '可合并已有图；Google Workspace 快捷文件需要授权导出内容后处理。', '合并、全局图与 Workspace 未实测'],
    ]),
    ('处理能力：生成什么、怎样搜索、能否建表', [
        '生成的是从资料抽取或推导出的知识数据：实体、关系、属性、来源与可信状态。它不自动保证输入事实正确，EXTRACTED / INFERRED / AMBIGUOUS 也不是校准后的正确率。',
        '普通 CLI 查询先用文字匹配定位图中入口，再进行图遍历，按范围和预算返回证据。自然语言提问不等于每次都调用模型生成完整答案；宿主助手可进一步阅读证据并解释。',
    ], ['处理', '支持到什么程度', '边界'], [
        ['抽取与建图', '解析代码或语义，规范属性、合并去重、连接跨文件关系，生成 NetworkX 图。', '动态调用和含糊描述可能漏连或误连'],
        ['关系分析', '发现密集社区、核心节点、跨模块联系，并生成建议问题。', '算法社区不直接等于经确认的业务模块'],
        ['查询与影响', 'Query 找相关子图；Explain 解释节点；Path 找连接路径；Affected 反向查潜在依赖方。', '查询有范围/预算；静态影响不能代替测试'],
        ['更新与协作', '缓存、增量更新、合并图、全局图、监控、Git hooks、PR 辅助及记忆复盘。', '本次只验证隔离增量；其余需要专项接入'],
        ['生成表格', '可在完整 JSON 上增加转换规则，输出实体表、关系表、来源表或项目能力表。', '属于本地可扩展能力，尚未实现'],
        ['构建数据库表', '已有 SQL / PostgreSQL 能力主要用于理解现存结构；Cypher 可交付图数据库节点和关系。', '自动业务建模、建 SQL 表和数据清洗需另接流程'],
    ]),
    ('输出：图形、文档、数据与工具接口', [
        '各视图按用途组织内容，不能把任一视图都当作全图。当前网络 HTML 包含全部 747 个节点和 1,971 条关系；树按源码归属组织，调用流程表达静态结构，不是运行时录像。',
    ], ['输出', '可观察或继续使用的能力', '本次状态'], [
        ['交互网络图', '缩放、拖拽、搜索、节点详情和社区筛选；探索谁与谁相连。', '原生 HTML 已生成'],
        ['层级树', '按文件及符号归属展开与收拢，观察层级结构。', '原生 D3 页面已生成'],
        ['架构 / 调用流程图', '按上游规则组织结构章节与 Mermaid 图，观察静态调用联系。', '原生页面已生成'],
        ['SVG 与 Canvas', 'SVG 可缩放并放入文档；Obsidian Canvas 可在画布中继续浏览。', '已导出'],
        ['报告、Wiki、笔记', '分析报告、社区/实体文章、Obsidian 节点笔记与链接。', '已生成；HTML 仅增加阅读排版'],
        ['JSON / GraphML / Cypher', 'JSON 用于二次开发；GraphML 交给 Gephi / yEd；Cypher 用于图数据库导入。', '全部已导出，未连接外部图数据库'],
        ['CLI / MCP / HTTP', '程序或 AI 助手查询图谱，获得带来源的证据上下文。', 'CLI 与 MCP 已实测；演示 HTTP 网关为本地新增'],
    ]),
    ('使用意义与扩展：让资料、实现和结论可追溯', [
        '下列场景是结合我们的研究仓库提出的应用方向，尚未全部实现。价值应通过真实任务验证：定位是否更准确、证据是否覆盖、结论是否过期，以及耗时和模型成本是否改善。',
    ], ['场景', '如何扩展', '意义'], [
        ['GitHub 项目研究', '关联源码、README、研究结论与证据位置。', '从找到项目进一步到找到实现和依据'],
        ['工程案例知识库', '从已精读材料提取问题、约束、方案、代价与来源。', '比较不同场景的取舍，不从标题补造事实'],
        ['重构与文档维护', '连接需求、设计、代码和测试，结合提交检测变化。', '提示潜在影响和需要复核的说明'],
        ['持续执行的 Agent', '任务前查询相关上下文，修改后更新图并记录反馈。', '为长任务提供可追溯资料；收益待评测'],
        ['图谱转业务表', '约定实体类型、字段和转换规则，再从 JSON 导出表格。', '接入能力清单、依赖表、证据表等管理方式'],
        ['Graphify + Archify', 'Graphify 提取关系，Agent 核对并整理规格，Archify 绘制讲解图。', '兼顾事实来源与设计表达；组合尚未接通'],
    ]),
]


def table_html(head, rows):
    return '<div class="understanding-table"><table><thead><tr>'+''.join('<th scope="col">'+escape(x)+'</th>' for x in head)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+escape(x)+'</td>' for x in row)+'</tr>' for row in rows)+'</tbody></table></div>'


def documents():
    intro='Graphify 可以直接处理尚未整理成关系图的资料，从中提取实体与关系，生成可查询、可分析、可交付的知识图谱。图形只是结果的一部分。'
    md=['# Graphify：入口、输入、处理、输出与扩展\n',intro+'\n','[返回项目](README.md) · [真实演示](app/dist/index.html#understanding) · [SVG 总览](assets/understanding-map.svg) · [PNG 总览](assets/understanding-map.png)\n','![Graphify 完整理解总览](assets/understanding-map.png)\n','本地原创能力关系图，非上游界面截图。绿色表示本次已运行的主要链路；金色表示上游支持但需条件或未实测；蓝色表示建议扩展。版本 v0.9.57，整理日期 2026-09-11。\n']
    fragment=['<section id="understanding" class="understanding"><div class="heading"><div><p class="kicker">INPUT → PROCESS → OUTPUT → USE</p><h2>一张图，理解 Graphify 的完整链路。</h2></div><a class="button" href="understanding-map.svg" target="_blank" rel="noreferrer">独立打开可缩放总览 ↗</a></div><p>'+intro+'</p><figure class="understanding-map"><a href="understanding-map.svg" target="_blank" rel="noreferrer" aria-label="打开完整 Graphify 能力总览"><img src="understanding-map.png" width="2200" height="2520" alt="Graphify 从入口、原始资料、解析建图到查询分析、图形文档数据输出及使用扩展的完整链路。详细说明见下方四项展开内容。"></a><figcaption>原创能力关系图，非上游截图。已实测、需条件和可扩展方向分别标注。<a href="understanding-map.png" download>下载 PNG</a> · <a href="understanding-map.svg" download>下载 SVG</a></figcaption></figure><div class="understanding-details">']
    for i,(title,paragraphs,head,rows) in enumerate(SECTIONS,1):
        md+=['## '+str(i)+'．'+title+'\n',* [p+'\n' for p in paragraphs],'| '+' | '.join(head)+' |','| '+' | '.join(['---']*len(head))+' |',*['| '+' | '.join(row)+' |' for row in rows],'']
        fragment+=['<details><summary>'+str(i)+'．'+escape(title)+'</summary>'+''.join('<p>'+escape(p)+'</p>' for p in paragraphs)+table_html(head,rows)+'</details>']
    md+=['## 本次验证与来源\n','实测：FastAPI 核心包 48 文件，747 节点、1,971 关系、46 社区；模型 token 为 0。原生查看器与多格式导出、四类 CLI 查询、MCP 和隔离增量更新已有实际记录。多模态、数据库、跨项目及长期 Agent 效果尚未实测。\n','[生成凭证](app/dist/native/fastapi/receipt.json) · [集成验证](app/dist/native/fastapi/integration.json) · [研究记录](notes.md)\n','固定提交：`3f82bf7f837a07fb0f7668fbdbd5662801906942`。\n',*['- ['+label+']('+UPSTREAM+url+')' for label,url in [('输入与命令说明','README.md'),('抽取与建图','graphify/build.py'),('查询实现','graphify/serve.py'),('SQL 结构抽取','graphify/extractors/sql.py'),('导出实现','graphify/export.py')]]]
    fragment+=['</div><p class="section-note">当前网页固定分析 FastAPI，提供真实查询与产物浏览；没有通用文件上传或在线语义抽取入口。<a href="understanding.md" download>下载完整理解文档</a> · <a href="'+UPSTREAM+'README.md" target="_blank" rel="noreferrer">固定版本上游说明 ↗</a></p></section>']
    text='\n'.join(md)+'\n'
    (ROOT/'understanding.md').write_text(text,encoding='utf-8')
    # Web download keeps links valid relative to dist, including its source references.
    webmd=text.replace('(README.md)','(index.html)').replace('(app/dist/','(').replace('(assets/','(').replace('[研究记录](notes.md)','[运行记录](native/fastapi/integration.html)')
    (DIST/'understanding.md').write_text(webmd,encoding='utf-8')
    index=DIST/'index.html';page=index.read_text(encoding='utf-8')
    start='<!-- understanding:start -->';end='<!-- understanding:end -->'
    section=start+'\n'+''.join(fragment)+'\n'+end
    if start in page:
        a=page.index(start);b=page.index(end,a)+len(end);page=page[:a]+section+page[b:]
    else:page=page.replace('<section class="proof">',section+'\n<section class="proof">')
    if 'href="#understanding"' not in page:page=page.replace('<nav>','<nav><a href="#understanding">完整理解</a>')
    index.write_text(page,encoding='utf-8')


def diagram():
    W,H=2200,2520
    bg='#0d1422';panel='#172337';line='#344761';white='#f1f5fc';muted='#b7c7dd';green='#9ee2bf';gold='#edca85';blue='#9fc5ff'
    im=Image.new('RGB',(W,H),bg);draw=ImageDraw.Draw(im)
    svg=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc"><title id="title">Graphify 完整理解总览</title><desc id="desc">入口、输入方式、抽取建图、查询分析、图形文档数据输出，以及使用意义和扩展边界。固定版本 0.9.57。</desc>']
    fonts={}
    def font(n,bold=False):
        key=n,bold
        if key not in fonts:fonts[key]=ImageFont.truetype('C:/Windows/Fonts/'+('msyhbd.ttc' if bold else 'msyh.ttc'),n)
        return fonts[key]
    def rect(x,y,w,h,fill=panel,stroke=line,r=18):
        draw.rounded_rectangle((x,y,x+w,y+h),r,fill=fill,outline=stroke,width=2)
        svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="2"/>')
    def txt(x,y,s,n=26,color=white,bold=False):
        draw.text((x,y),s,font=font(n,bold),fill=color,anchor='lt')
        svg.append(f'<text x="{x}" y="{y}" font-family="Microsoft YaHei, Noto Sans CJK SC, sans-serif" font-size="{n}" font-weight="{700 if bold else 400}" fill="{color}" dominant-baseline="text-before-edge">{escape(s)}</text>')
    def words(x,y,s,width,n=26,color=muted,leading=40):
        lines=[];current=''
        for c in s:
            if c=='\n' or draw.textlength(current+c,font=font(n))>width:
                lines.append(current);current='' if c=='\n' else c
            else:current+=c
        if current:lines.append(current)
        for i,value in enumerate(lines):txt(x,y+i*leading,value,n,color)
        return y+len(lines)*leading
    def card(x,y,w,h,title,lines,status=None):
        color=green if status=='已实测' else gold if status=='需条件 / 未实测' else blue if status=='可扩展' else blue
        rect(x,y,w,h)
        txt(x+25,y+23,title,30,white,True)
        top=y+76
        if status:txt(x+25,top,status,22,color,True);top+=39
        for item in lines:top=words(x+25,top,item,w-50,25,muted,38)+8
        assert top<=y+h,(title,top,y+h)
    def stage(y,number,title,subtitle):
        txt(70,y,number,29,blue,True);txt(140,y,title,34,white,True)
        txt(70,y+49,subtitle,25,muted)
    def arrow(y):
        x=W//2;draw.line((x,y,x,y+30),fill=blue,width=3);draw.polygon([(x-9,y+21),(x+9,y+21),(x,y+34)],fill=blue)
        svg.append(f'<path d="M{x} {y}v30m-9 -9l9 13 9 -13" fill="none" stroke="{blue}" stroke-width="3"/>')
    rect(0,0,W,H,bg,bg,0)
    txt(70,40,'GRAPHIFY',27,blue,True);txt(275,40,'006  /  v0.9.57  /  2026-09-11',24,muted)
    txt(70,90,'从原始资料到可查询、可追溯、可交付的知识图谱',48,white,True)
    txt(70,159,'无需先编制节点表或关系 JSON；选择范围、保证可读取、保留来源即可开始。',28,muted)
    stage(230,'01','使用入口','入口负责发起任务；原始资料是输入，已有图谱也可继续查询、合并与交付。')
    xs=[70,591,1112,1633]
    for x,title,lines in zip(xs,['命令行 CLI','AI 助手技能','已有图谱 / 程序','链接与连接器'],[
        ['指定文件或目录','extract / update / export'],['通过 /graphify 发起','由宿主助手编排处理'],['graph.json / Python','CLI、MCP 或 HTTP 查询'],['支持的资料 / 视频链接','Workspace 授权、数据库连接']]):card(x,320,497,170,title,lines)
    arrow(506)
    stage(555,'02','输入与接入方式','原始内容可以直接进入支持的提取链路；语义资料需要模型，部分格式需要可选依赖。')
    for x,title,lines,status in zip(xs,['源码与项目文件','文档与办公资料','图片与音视频','SQL / 数据库结构'],[
        ['多语言源码、项目目录','本地 AST / 专门解析器','提取函数、类和依赖'],['MD / TXT / HTML / PDF','Word / Excel 等先读取','模型识别概念与关系'],['图片理解；音视频转写','支持的链接需相应组件','转写 / 理解后语义抽取'],['读取 SQL 定义与依赖','PostgreSQL 读取已有结构','并非自动业务建表']
    ],['已实测','需条件 / 未实测','需条件 / 未实测','需条件 / 未实测']):card(x,645,497,280,title,lines,status)
    arrow(941)
    stage(990,'03','抽取、建图、分析与维护','代码解析可全程本地运行；文档和媒体的语义提取使用宿主助手或配置的模型。')
    for x,title,lines in zip([70,764,1458],['抽取 → 连接 → 建图','查询 → 遍历 → 分析','更新 → 接入 → 反馈'],[
        ['解析代码 / 抽取语义','实体去重、属性规范、跨文件连接','构建节点与关系；发现社区','记录来源与提取 / 推断状态'],['Query 找相关子图；Explain 解释','Path 找路径；Affected 查影响','核心节点、跨模块联系、建议问题','普通查询以文字匹配 + 图遍历为主'],['缓存与增量更新【已实测】','MCP 标准查询【已实测】','合并 / 全局图、监控 / hooks','PR 辅助、记忆复盘【待专项验证】']
    ]):card(x,1080,672,280,title,lines)
    rect(70,1382,2060,106,'#203a3b','#426d68')
    txt(98,1401,'共同结果：可复用的知识图谱',30,green,True)
    txt(98,1444,'节点 + 关系 + 属性 + 来源 + 社区 + 可信状态；生成的是抽取与推导数据，原始事实仍需有依据。',27,white)
    arrow(1500)
    stage(1547,'04','输出效果与继续使用的能力','同一份图谱可用于交互探索、阅读交付、二次开发与 AI 查询；各视图按用途组织内容。')
    for x,title,lines in zip([70,764,1458],['图形与交互【已生成】','文档与阅读【已生成】','数据与工具【已运行 / 导出】'],[
        ['网络图：缩放、搜索、详情、社区','层级树：文件 / 符号归属与展开','Mermaid：架构 / 静态调用流程','SVG：可缩放矢量网络','Canvas：Obsidian 画布'],['分析报告：核心节点与联系','Wiki：社区与实体文章','Obsidian：节点笔记与双向链接','来源与可信状态便于核对','本地 HTML 为原生 Markdown 排版'],['JSON：完整图谱与二次开发','GraphML：Gephi / yEd 分析','Cypher：图数据库导入，未执行','CLI / MCP：返回可引用的图上下文','本地 HTTP 查询网关：本项目新增']
    ]):card(x,1637,672,325,title,lines)
    arrow(1976)
    stage(2023,'05','使用意义与可扩展场景','把资料、实现、结论与证据连接起来；以下是我们的应用方向，尚未全部接通。')
    for x,title,lines in zip([70,764,1458],['研究与维护','任务与知识管理','二次交付'],[
        ['项目研究、案例取舍、来源追溯','关联需求 / 代码 / 测试，提示过期'],['Agent 查上下文，修改后更新图','中文术语、反馈记录与效果评测'],['JSON → 实体表 / 关系表 / 证据表','Graphify → Agent 核对 → Archify']
    ]):card(x,2113,672,168,title,lines)
    rect(70,2307,2060,144,'#20293a',line)
    txt(96,2327,'实测范围',25,green,True);txt(250,2327,'FastAPI 核心包 48 文件 → 747 节点 / 1,971 关系 / 46 社区；0 模型 token。',26,white)
    txt(96,2370,'关键边界',25,gold,True);txt(250,2370,'推断需核对；静态图 ≠ 运行时轨迹；表格转换 / 业务建表需扩展；语义资料与外部连接未实测。',25,muted)
    txt(70,2473,'绿色：主要实测链路  ·  金色：需条件或未实测  ·  蓝色：入口与扩展  |  本地原创关系图，非上游截图',23,muted)
    svg.append('</svg>')
    ASSETS.mkdir(exist_ok=True)
    (ASSETS/'understanding-map.svg').write_text('\n'.join(svg),encoding='utf-8')
    im.save(ASSETS/'understanding-map.png')
    for ext in ['svg','png']:shutil.copyfile(ASSETS/f'understanding-map.{ext}',DIST/f'understanding-map.{ext}')


if __name__=='__main__':
    diagram()
    documents()
    print('Built understanding.md, web section and 2200 × 2520 SVG / PNG diagrams.')
