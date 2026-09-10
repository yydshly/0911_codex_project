"""Build the Chinese reading page and original SVG overview from local sources."""
from pathlib import Path
import html
import re
import shutil
import markdown

BASE = Path(__file__).resolve().parent
PROJECT = BASE.parent
OUT = BASE / 'dist'
OUT.mkdir(exist_ok=True)
(OUT / 'assets').mkdir(exist_ok=True)
(OUT / 'downloads').mkdir(exist_ok=True)

parts = []
def rect(x, y, w, h, fill='#ffffff', stroke='#ccd8e5', radius=18):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}"/>')
def text(x, y, lines, size=24, color='#1b3147', weight=400, gap=None):
    for n, line in enumerate(lines.split('\n')):
        parts.append(f'<text x="{x}" y="{y+n*(gap or size*1.65)}" font-size="{size}" fill="{color}" font-weight="{weight}">{html.escape(line)}</text>')
def arrow(x1, y1, x2, y2, color='#476278'):
    parts.append(f'<path d="M{x1} {y1} L{x2} {y2}" fill="none" stroke="{color}" stroke-width="4" marker-end="url(#arrow)"/>')
def label(y, number, title, subtitle=''):
    text(70, y, number, 24, '#b34a11', 700)
    text(125, y, title, 33, '#142b45', 700)
    if subtitle: text(125, y+40, subtitle, 22, '#476278')
def panel(x,y,w,h,title,body,fill='#ffffff',accent='#175bb7',size=24):
    rect(x,y,w,h,fill)
    text(x+28,y+46,title,28,accent,700)
    text(x+28,y+92,body,size)

parts.append('<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="3200" viewBox="0 0 1800 3200" role="img" aria-labelledby="title desc">')
parts.append('<title id="title">Browser-use：从网页理解到 CDP 点击的完整总览</title><desc id="desc">模型根据页面文字和可选截图选择目标。程序映射元素、滚动、定位并计算点击坐标，通过 CDP 发送鼠标移动、左键按下和松开事件。浏览器执行网页逻辑，结果返回模型。还包括动作能力、同类项目、场景、扩展和边界。</desc>')
parts.append('<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0 0 L8 3 L0 6" fill="#476278"/></marker></defs>')
parts.append('<g font-family="Microsoft YaHei, Noto Sans CJK SC, sans-serif">')
rect(0,0,1800,3200,'#edf3f9','#edf3f9',0)
rect(0,0,1800,215,'#132b46','#132b46',0)
text(70,54,'BROWSER-USE / 中文研究总览 / 2026-09-11',22,'#b8d4ef',600)
text(70,116,'模型选择目标，程序控制浏览器。',48,'#ffffff',700)
text(70,170,'底层通过 CDP 传递操作指令；鼠标移动与点击由程序发送浏览器输入事件实现。',26,'#dce9f7')

for x,title,body,fill,col in [
 (70,'大模型','理解任务 / 选择动作','#e4edff','#175bb7'),
 (495,'browser-use 程序','整理上下文 / 定位 / 执行','#ffffff','#142b45'),
 (920,'CDP 协议','命令 / 响应 / 事件','#fff0e0','#b34a11'),
 (1345,'真实浏览器','加载 / 渲染 / 处理输入','#e2f3ee','#16624f')]:
    rect(x,255,385,118,fill)
    text(x+24,301,title,28,col,700)
    text(x+24,342,body,22)
for x in [464,889,1314]: arrow(x,314,x+24,314)
text(70,410,'模型接口连接“程序与模型”；CDP 连接“程序与浏览器”。两条链路由程序衔接。',25,'#476278')

label(475,'01','网页如何交给模型','模型看到的是程序提供的信息；不会自动知道你当前打开了哪个网页。')
panel(70,540,800,265,'浏览器提供的原始资料','DOM：元素、文字、属性与层级\n无障碍信息：按钮名称、角色与状态\n布局：元素位置、可见性与区域\n截图：实际画面，视觉输入按配置使用', '#ffffff','#16624f')
panel(930,540,800,265,'程序整理后的模型上下文（示意）','任务：搜索无线耳机，查看价格\n[1] 输入框：搜索商品，当前为空\n[2] 按钮：搜索\n另附可用动作、历史结果与可选截图', '#eaf1ff')
arrow(878,675,920,675)

label(880,'02','模型做判断，程序接收动作','模型凭已有的文字和图像能力理解任务；浏览网页时不需要重新训练。')
panel(70,945,800,255,'模型输出：下一步做什么','① 向元素 1 输入“无线耳机”\n② 点击元素 2\n结构化动作可由程序解析与校验\n模型本身不移动物理鼠标', '#eaf1ff')
panel(930,945,800,255,'程序处理：把目标变成可执行操作','动作解析 → 参数校验 → 工具分发\n编号 2 → 当前网页中的搜索按钮节点\n编号由框架维护，不是 CDP 原生编号\n页面变化后，旧引用可能需要刷新', '#ffffff','#142b45')
arrow(878,1070,920,1070)

label(1280,'03','点击如何真正执行：底层程序 + CDP','以按钮当前点击点 (420, 180) 为例。数字仅为教学示意。')
panel(70,1345,800,270,'A · 定位和计算坐标','查找真实节点 → 必要时滚入视口\n读取当前布局 → 确定可点击位置\n按元素点击：模型选编号，程序找坐标\n坐标点击：需启用并处理坐标换算', '#ffffff','#142b45')
panel(930,1345,800,270,'B · CDP 传递具体浏览器指令','常见通道：WebSocket 长连接\n消息：JSON 命令、对应响应、异步事件\n程序选择正确页面目标／会话\n浏览器内部实现这些控制接口', '#fff0e0','#b34a11')
arrow(878,1480,920,1480)

rect(70,1650,1660,205,'#132b46','#132b46')
text(104,1695,'C · Input.dispatchMouseEvent：移动 → 按下 → 松开',29,'#ffffff',700)
for x,title,body in [(105,'① mouseMoved','移动到 (420, 180)'),(665,'② mousePressed','左键在该位置按下'),(1225,'③ mouseReleased','左键在该位置松开')]:
    text(x,1752,title,27,'#ffcf99',600)
    text(x,1801,body,25,'#e4edf7')
arrow(540,1770,620,1770)
arrow(1100,1770,1180,1770)
panel(70,1880,1660,180,'D · 浏览器接收输入，网页运行自己的响应逻辑','浏览器处理目标位置的鼠标事件 → 按钮触发搜索逻辑 → 网站可能返回商品列表或错误。\n坐标通常相对页面视口，以 CSS 像素计；截图像素、缩放、滚动与框架位置可能需要换算。', '#e2f3ee','#16624f',25)

label(2130,'04','再次观察，才能知道是否达成目标')
panel(70,2165,1660,210,'反馈回路：新页面 → 程序整理 → 模型继续／结束','正常：搜索结果出现 → 提取商品和价格 → 按目标验收。\n异常：按钮失效、登录弹窗或页面错误 → 获取新状态 → 调整动作、有限重试或报告未完成。\n程序已发出点击 ≠ 业务成功；框架管理历史、超时与步骤，结果仍需要证据验证。', '#ffffff','#142b45',25)

label(2445,'05','动作、同类项目与我们可以怎样使用')
panel(70,2480,800,295,'原库主要动作（按配置开放）','打开 / 搜索 / 后退 / 切换与关闭标签页\n点击 / 输入 / 键盘 / 滚动 / 下拉选择\n截图 / 页内查找 / 提取 / 结构化输出\n上传 / 下载跟踪 / PDF / 任务文件读写\n等待 / 页面脚本 / 自定义工具', '#ffffff','#175bb7',23)
panel(930,2480,800,295,'定位与应用（组合方向尚未实测）','browser-use：浏览器任务的 Agent 框架\ngstack：研发方法 + 浏览器工具\nOMP：编程 Agent + 浏览器工具\n可用于研究采集、后台流程、网页检查\n可衔接 Graphify、营销技能与长期任务', '#ffffff','#16624f',23)

rect(70,2820,1660,220,'#fff0e0','#e7c8a8')
text(104,2867,'最重要的补充：这里的鼠标不一定是桌面可见指针。',31,'#963f12',700)
text(104,2916,'程序可以直接给浏览器发送模拟鼠标事件；即使系统指针不动、浏览器无可见窗口，也能操作网页。\nCDP 不是模型，browser-use 不是浏览器内核；协议有某个接口，也不等于模型默认有对应工具。\n稳定 API 优先、固定步骤可用脚本；对结果检查来源、准确率、耗时、成本和人工干预。',25,'#553c28')
text(70,3100,'原创研究示意图，非上游截图或真实 Agent 运行轨迹。教学坐标、商品与状态均为预设。',23,'#476278')
text(70,3145,'依据 browser-use 固定提交 50f2055 / MIT；CDP 官方协议。完整来源与适用边界见配套中文文档。',23,'#476278')
parts.append('</g></svg>')
svg = '\n'.join(parts)
(PROJECT/'assets'/'understanding-map.svg').write_text(svg,encoding='utf-8',newline='\n')
(OUT/'assets'/'understanding-map.svg').write_text(svg,encoding='utf-8',newline='\n')

source = (PROJECT/'understanding.md').read_text(encoding='utf-8')
body_source = source.split('\n',1)[1]
toc = []
for num,title in re.findall(r'^## (\d+) · (.+)$',body_source,re.M):
    toc.append(f'<a href="#s{num}"><span>{num}</span>{html.escape(title)}</a>')
article = markdown.markdown(body_source, extensions=['tables','fenced_code'])
article = re.sub(r'<h2>(\d+) · (.*?)</h2>',lambda m:f'<h2 id="s{m[1]}"><span>{m[1]}</span>{m[2]}</h2>',article)
article = article.replace('<table>','<div class="table-scroll" tabindex="0" role="region" aria-label="可横向滚动的数据表"><table>').replace('</table>','</table></div>')
for i in range(1,12):
    article = article.replace(f'[S{i}]',f'<a href="#source-{i}" class="cite">[S{i}]</a>')
article = re.sub(r'<li><a href="([^"]+)">S(\d+) · ',lambda m:f'<li id="source-{m[2]}"><a href="{m[1]}">S{m[2]} · ',article)
template = (BASE/'page.html').read_text(encoding='utf-8')
(OUT/'index.html').write_text(template.replace('<!-- TOC -->','\n'.join(toc)).replace('<!-- ARTICLE -->',article),encoding='utf-8',newline='\n')
for filename in ['style.css','lesson.js','app.js']:
    shutil.copyfile(BASE/filename,OUT/filename)
for filename in ['understanding.md','README.md','notes.md']:
    shutil.copyfile(PROJECT/filename,OUT/'downloads'/filename)
shutil.copyfile(PROJECT/'sources'/'LICENSE.browser-use',OUT/'downloads'/'LICENSE.browser-use')
png = PROJECT/'assets'/'understanding-map.png'
if png.exists(): shutil.copyfile(png,OUT/'assets'/png.name)
print('已生成详细中文网页与 1800×3200 矢量总览图。')

