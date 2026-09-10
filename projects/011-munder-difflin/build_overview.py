"""Render the project overview as an editable SVG and a matching PNG.

Requires Pillow for font metrics and Playwright with local Chrome for PNG export.
"""
from pathlib import Path
from html import escape
from PIL import ImageFont

HERE = Path(__file__).resolve().parent
OUT = HERE / 'assets'
W, H = 1920, 2440
FONT = Path('C:/Windows/Fonts/msyh.ttc')
BOLD = Path('C:/Windows/Fonts/msyhbd.ttc')
parts = []
INK, MUTED, BLUE, TEAL = '#172C42', '#526579', '#2359A6', '#137F7C'

def rect(x,y,w,h,fill,stroke='none',r=18):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}"/>')

def text(x,y,s,size=24,color=INK,bold=False):
    parts.append(f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{700 if bold else 400}" fill="{color}">{escape(s)}</text>')

def lines(x,y,s,width,size=23,color=MUTED,bold=False,leading=34):
    font = ImageFont.truetype(str(BOLD if bold else FONT), size)
    result=[]
    for paragraph in s.split('\n'):
        line=''
        for ch in paragraph:
            if line and font.getlength(line+ch)>width:
                result.append(line)
                line=ch
            else: line+=ch
        result.append(line)
    for i,line in enumerate(result): text(x,y+i*leading,line,size,color,bold)
    return y+len(result)*leading

def panel(y,h,number,title,subtitle=''):
    rect(56,y,1808,h,'#FFFFFF','#DCE4ED',22)
    rect(80,y+23,42,38,BLUE,r=10)
    text(91,y+50,number,22,'#FFFFFF',True)
    text(138,y+52,title,29,INK,True)
    if subtitle: text(138,y+84,subtitle,20,MUTED)

def arrow(x1,y1,x2,y2,color=TEAL,dashed=False):
    dash=' stroke-dasharray="7 7"' if dashed else ''
    parts.append(f'<path d="M{x1},{y1} L{x2},{y2}" fill="none" stroke="{color}" stroke-width="3"{dash} marker-end="url(#arrow)"/>')

parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc">')
parts.append('<title id="title">Munder Difflin：核心能力、协作原理与同类差异总览</title><desc id="desc">中文原创研究图。说明本地多 CLI 管理、文件队列和空闲终端唤醒，与 Multica、MetaGPT、LongHorizon、Pi/OMP、Memmy 比较，并记录场景、按需扩展与未实测边界。</desc>')
parts.append('<defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#137F7C"/></marker></defs>')
parts.append('<g font-family="Microsoft YaHei, Noto Sans CJK SC, sans-serif">')
rect(0,0,W,H,'#EFF3F8',r=0)
rect(0,0,W,202,'#172C42',r=0)
text(64,49,'GITHUB 项目研究集  /  研究索引 010',22,'#AFC6E4',True)
text(64,113,'Munder Difflin',55,'#FFFFFF',True)
text(66,165,'本地多 Agent 工作台：组织已有编程工具，协调任务、消息与记忆',29,'#E3ECF8')
rect(1457,41,397,51,'#29455E',r=25)
text(1481,75,'能力整理与对比 · 暂不归档',24,'#FFFFFF',True)
text(1475,130,'源码基线 0.4.6 · 9ce27e7',22,'#BDCFDF')
text(1475,166,'2026-09-11 · 上游未实测',22,'#BDCFDF')

rect(56,225,1808,129,'#E2F0EE','#BBDDD7',22)
text(82,271,'核心能力：多 Agent 工具   /   实现差异：通过本地文件收发箱通信',31,TEAL,True)
text(82,314,'管理多个已有 Agent 的身份、模型与任务；平台投递文件消息并适时唤醒。与 Multica 最接近，不代表效果必然更强。',25,INK)

panel(379,302,'01','谁负责什么？','角色由指令与配置定义；模型做判断，程序落实调度，CLI 执行工具。')
boxes=[(82,344,'人 / 业务入口','提出目标 · 查看结果','必要时澄清、干预与验收'),
       (475,389,'主管 Agent · Michael','拆任务 · 选执行者 · 协调反馈','主管本身也由 CLI 与模型运行'),
       (913,389,'Munder 平台程序','启动进程 · 投递消息 · 跟踪状态','Electron 主进程 / 终端 / 事件'),
       (1351,487,'工作 Agent × N','Claude Code / Codex / Pi 等','各自调用模型与工具，读写项目')]
for x,w,title,a,b in boxes:
    rect(x,486,w,113,'#F1F5FB',r=15)
    text(x+18,521,title,25,BLUE,True)
    text(x+18,553,a,22,INK)
    text(x+18,583,b,19,MUTED)
for x1,x2 in [(426,465),(864,903),(1302,1341)]: arrow(x1,542,x2,542)
text(83,643,'持续反馈：工具结果 → CLI / 模型继续判断 → 消息与任务记录 → 主管协调 / 人查看；办公室动画反映运行状态。',24,MUTED)

panel(705,337,'02','能力地图','上游已有能力；功能需相应配置、外部依赖与可用配额，各引擎接入深度不同。')
cards=[('01  引擎与身份','配置 CLI、模型、职责、目录与权限选项'),
       ('02  任务与主管','分派、依赖、状态、反馈和人工问题'),
       ('03  消息协作','文件收发箱、路由、提醒、回复与归档'),
       ('04  团队记忆','Markdown、可选语义检索与历史压缩'),
       ('05  观察与操作','像素状态、真实终端、编辑器与 Git 查看'),
       ('06  持续执行入口','定时、心跳、Slack / Webhook、语音'),
       ('07  并行与扩展','可选 worktree；Skills、知识资料与模型接入'),
       ('08  运行控制','用量、异常检测、纠偏、暂停与停止')]
for i,(title,body) in enumerate(cards):
    x=82+(i%4)*443; y=810+(i//4)*107
    rect(x,y,424,92,'#F6F8FB',r=13)
    text(x+16,y+31,title,24,INK,True)
    lines(x+16,y+62,body,393,21,leading=26)

panel(1066,361,'03','文件怎样让另一个 Agent 开始工作？','文件负责持久化，轮询发现消息，事件帮助判断状态，终端输入触发下一轮执行。')
steps=[('A 写请求','自己的 outbox / JSON'),('平台投递','约 1.5 秒轮询发件箱'),('B 的 inbox','新消息 → 提醒排队'),('等待可投递','空闲、未暂停等条件'),('终端输入','输入提醒并提交'),('B 执行与回复','读文件 → 处理 → 回复')]
for i,(title,body) in enumerate(steps):
    x=82+i*297
    rect(x,1175,270,95,'#E8F3F1',r=14)
    text(x+16,1211,title,25,TEAL,True)
    text(x+16,1248,body,19,INK)
    if i<5: arrow(x+272,1222,x+290,1222)
text(83,1309,'状态来源：生命周期事件 + 终端活动；支持的桥接通过本地 Socket / Windows 命名管道传递事件。',23,INK)
text(83,1344,'提醒检查：界面约 4 秒；主进程工作 Agent 补充检查约 15 秒。消息 ID、冷却和投递前复查减少重复提醒。',23,MUTED)
text(83,1384,'版本纠正：当前 Stop 处理已取消“有未读消息就强制续跑”；改为空闲时机投递。检查间隔不等于送达保证。',23,BLUE,True)

panel(1451,471,'04','与已研究工具的核心差异','比较架构侧重点，不是功能互斥或效果排名；同类功能可以重叠，也可以通过扩展组合。')
xs=[83,349,937,1350]
for x,title in zip(xs,['工具','组织与执行重心','主要协作 / 状态载体','相对 Munder 的差异']): text(x,1573,title,23,MUTED,True)
rows=[
('Munder Difflin','已有 CLI 的本机桌面团队','收发箱文件 + 任务板 + 终端','会话、消息、记忆与实时管理'),
('Multica · 最接近','工单、Run 与执行节点 / Daemon','数据库队列、评论与事件','更围绕工单交付与人机团队'),
('MetaGPT','可编程的角色、动作与团队流程','角色消息、状态与动作触发','更适合定制业务分工和流程'),
('LongHorizon','复杂目标的管理—执行—审计循环','跨轮进度、契约与审计记录','更聚焦持续推进与完成判定'),
('Pi / oh-my-pi','Agent 内部模型与工具执行循环','会话、工具结果；OMP 子任务','强化执行底座；OMP 也有多 Agent'),
('Memmy Agent','跨会话 / 工具记忆；自带 Runtime','历史采集、提炼、索引与召回','重点是经验复用，不等于团队派工')]
for i,row in enumerate(rows):
    y=1593+i*49
    rect(77,y,1760,46,'#E5EFEC' if i==0 else ('#F5F7FA' if i%2==0 else '#FFFFFF'),r=7)
    for j,(x,value) in enumerate(zip(xs,row)):
        text(x,y+30,value,21,TEAL if i==0 else INK,j==0)
text(84,1900,'验证基础：Multica 已有最小真实任务；MetaGPT 已跑固定动作、零模型实验；Munder / LongHorizon / OMP 的效果未在本机复现。',20,MUTED)

panel(1946,206,'05','适用场景、对我们的意义与按需扩展')
for x,title,body in [
    (83,'适用场景','本机管理多 CLI、分工调研、多模块开发。\n任务应可拆分、有明确产物和验收标准。'),
    (677,'对我们的意义','已有 Multica 等样本，重点保留差异。\n参考本地会话管理、消息交接与观察体验。'),
    (1271,'有具体需求再扩展','证据验收、并行合并、硬权限与预算、\n研究流程模板、可追溯记忆、路由评测。')]:
    text(x,2045,title,25,TEAL,True)
    lines(x,2082,body,553,22,leading=32)

rect(56,2176,1808,153,'#FFF6E9','#EBD8B8',22)
text(83,2214,'使用与验证边界',26,'#805B23',True)
text(83,2253,'本地管理 ≠ 模型离线；已有订阅仍占配额；多 Agent ≠ 必然更好；消息送达 / 任务完成状态 ≠ 产物验收通过。',23,INK)
text(83,2293,'熔断硬停止默认关闭，约束阶段主要发消息；worktree 不等于安全沙箱。上游未运行，网页仅展示研究理解。',23,INK)
text(64,2370,'上游  chaitanyagiri/munder-difflin  ·  固定提交 9ce27e76dae71ab1897a182c0cebbdcf94705a05',21,MUTED)
text(64,2406,'原创研究示意图，非软件截图；来源见项目 notes.md。代码 MIT，部分上游像素素材另行许可；本图未使用上游素材。',21,MUTED)
parts.append('</g></svg>')
OUT.mkdir(exist_ok=True)
svg=OUT/'overview.svg'
svg.write_text('\n'.join(parts),encoding='utf-8')

if __name__ == '__main__':
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True,args=['--disable-gpu'])
        page=browser.new_page(viewport={'width':W,'height':H},device_scale_factor=1)
        page.set_content('<html><body style="margin:0">'+svg.read_text(encoding='utf-8')+'</body></html>')
        page.evaluate('document.fonts.ready')
        # Validate all text stays on canvas; layout is fixed and uses measured wraps.
        escaped=page.evaluate('''() => Array.from(document.querySelectorAll('text')).filter(e => {
          const b=e.getBBox(); return b.x<0 || b.y<0 || b.x+b.width>1920 || b.y+b.height>2440;
        }).map(e => e.textContent)''')
        assert not escaped, escaped
        page.screenshot(path=str(OUT/'overview.png'),timeout=60000)
        browser.close()
    print('Rendered overview.svg and overview.png (1920 x 2440)')
