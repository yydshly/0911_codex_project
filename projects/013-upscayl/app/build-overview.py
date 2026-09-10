"""Author the editable overview diagram. Development-only: requires Pillow for font metrics."""
from pathlib import Path
from html import escape
import os
from PIL import ImageFont

ROOT = Path(__file__).resolve().parents[1]
REGULAR = os.environ.get('OVERVIEW_FONT', 'C:/Windows/Fonts/msyh.ttc')
BOLD = os.environ.get('OVERVIEW_BOLD_FONT', 'C:/Windows/Fonts/msyhbd.ttc')
W, H = 2400, 2960
INK, MUTED, BLUE, LINE, NAVY = '#172945', '#4b5f7e', '#2455ce', '#cfdbeb', '#101f3c'
parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc">',
 '<title id="title">Upscayl 能力与理解全图：输入、处理、输出、同类产品、模型原理和一致性</title>',
 '<desc id="desc">本地图像超分辨率。应用组织任务，模型预测细节，NCNN 与 Vulkan 执行计算。对比商业工具、开源模型和生成式大模型，说明结构保真、细节真实、重复稳定与时序连续的不同。</desc>',
 '<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M1 1 L9 5 L1 9" fill="none" stroke="#2455ce" stroke-width="2"/></marker></defs>']
fonts = {}
def font(size, bold=False):
    key=(size,bold)
    if key not in fonts: fonts[key]=ImageFont.truetype(BOLD if bold else REGULAR,size)
    return fonts[key]
def rect(x,y,w,h,fill='white',stroke=LINE,r=12):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}"/>')
def text(x,y,value,size=30,color=INK,bold=False,max_width=None):
    if max_width is not None:
        assert font(size,bold).getlength(value) <= max_width, (value,max_width)
    parts.append(f'<text x="{x}" y="{y+size}" font-family="Microsoft YaHei,Segoe UI,sans-serif" font-size="{size}" font-weight="{700 if bold else 400}" fill="{color}">{escape(value)}</text>')
def wrap(value,width,size,bold=False):
    lines=[]
    for paragraph in value.split('\n'):
        line=''
        for char in paragraph:
            if line and font(size,bold).getlength(line+char)>width:
                lines.append(line);line=char
            else:line+=char
        lines.append(line)
    return lines
def paragraph(x,y,value,width,size=30,color=MUTED,bold=False,line=44,max_lines=None):
    lines=wrap(value,width,size,bold)
    if max_lines is not None:assert len(lines)<=max_lines,(value,lines)
    for i,s in enumerate(lines):text(x,y+i*line,s,size,color,bold,width)
    return y+len(lines)*line
def arrow(x1,y1,x2,y2):
    parts.append(f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{BLUE}" stroke-width="4" fill="none" marker-end="url(#arrow)"/>')
def section(y,n,title,subtitle=None):
    rect(80,y+2,56,48,BLUE,BLUE,6);text(91,y+4,n,29,'white',True)
    text(155,y,title,39,INK,True)
    if subtitle:text(155,y+53,subtitle,26,MUTED)

rect(0,0,W,H,'#f3f7fc','#f3f7fc',0)
rect(0,0,W,238,NAVY,NAVY,0)
text(80,30,'UPSCAYL  /  开源项目研究 013',27,'#aac5ff',True)
text(80,79,'让低清图片更可用，而不是保证找回真实细节。',58,'white',True,2240)
text(80,165,'核心价值：尽量保留原图内容，稳定、批量地提高分辨率和细节观感。',33,'#d8e5ff',False,2240)

section(272,'01','输入 → 如何处理 → 得到什么')
rect(80,342,490,421);rect(620,342,1110,421,'#eef3ff');rect(1780,342,540,421)
text(110,370,'输入 / 已有图片与要求',32,INK,True)
paragraph(110,430,'低清照片、商品图、插画\n单张图片或文件夹\n选择模型、倍率、输出格式',430,30,max_lines=4)
text(110,582,'示例：500 × 500',34,BLUE,True)
paragraph(110,640,'已有高清原件时优先用原件；\n严重失焦不属于擅长范围。',430,27,max_lines=3,line=40)
text(650,370,'处理 / 应用组织任务，模型完成计算',32,INK,True)
steps=[('1','桌面界面','选择文件、模型和参数；Electron 管理任务'),('2','启动后端','调用独立 upscayl-bin，传入输入与输出路径'),('3','加载模型','读取 .param 结构与 .bin 权重，预测高清细节'),('4','执行推理','NCNN 安排计算，Vulkan 使用兼容 GPU；可分块'),('5','生成文件','拼接，按需调整最终尺寸、编码；返回进度与结果')]
for i,(n,label,body) in enumerate(steps):
    y=430+i*58
    text(650,y,n,28,BLUE,True);text(694,y,label,29,INK,True)
    text(858,y,body,27,MUTED,False,840)
text(1810,370,'输出 / 更大、更清楚的图',32,INK,True)
text(1810,429,'2000 × 2000',38,BLUE,True)
paragraph(1810,489,'宽高各 4 倍，像素总量 16 倍\nPNG / JPEG / WebP\n前后对比、批量输出',480,29,max_lines=4,line=43)
paragraph(1810,645,'新增像素 ≠ 新增真实信息\n仍可能出现伪纹理和错误文字',480,27,INK,True,max_lines=2,line=40)
arrow(580,548,607,548);arrow(1740,548,1767,548)
rect(80,790,2240,72,'#e8eef9','#e8eef9',8)
text(106,808,'已有功能：7 种内置模型 · 自定义兼容模型 · 批处理 · 分块 · TTA · 两轮放大 · 输出控制',32,INK,True,2188)

section(900,'02','底层原理：训练与使用分开，倍率与真实信息分开')
rect(80,970,1100,251);rect(1210,970,1110,251)
text(110,993,'模型怎样学会？以 Real-ESRGAN 为例',32,INK,True)
paragraph(110,1044,'高清图 → 模糊、缩小、噪声、压缩等模拟退化\n低清／高清训练对 → 优化网络 → 保存权重\n结合重建、感知与对抗训练，学习较自然的细节。',1040,29,max_lines=3,line=43)
text(110,1178,'正常使用只做推理，不会为每张图片重新训练。',27,BLUE,True,1040)
text(1240,993,'为什么能放大？为什么不保证真实？',32,INK,True)
paragraph(1240,1044,'低清图可以对应多种高清原图，无法唯一反推。\n模型按先验估计细节；框架、GPU 和界面负责执行。\n内置模型标为 4×，其他输出尺寸可含后续普通缩放。',1050,29,max_lines=3,line=43)
text(1240,1178,'TTA 增加推理；Double Upscayl 是两轮模型处理。',27,BLUE,True,1050)

section(1260,'03','相关产品与底层项目：先分清“软件”和“模型”')
cols=[80,455,1030,1700,2320]
rect(80,1330,2240,60,NAVY,NAVY,0)
for x,value in zip(cols,['产品 / 项目','能力与定位','底层方式 / 公开信息','与 Upscayl 的关系']):text(x+20,1343,value,29,'white',True)
rows=[
 ('Upscayl','本地图片放大、批处理与对比','超分辨率模型 + NCNN / Vulkan','应用集成；不等于独创所有模型'),
 ('Topaz Gigapixel','商业图片放大与增强工具','官方区分核心与生成式模型','闭源；不能断言与 Upscayl 同算法'),
 ('Adobe Camera Raw','摄影工作流中的超分辨率','机器学习增强，完整结构未公开','工作流整合；不推断共用同一模型'),
 ('chaiNNer','可视化串联模型与图片处理','调用多种推理框架和兼容模型','更灵活；同模型也需比较完整处理链'),
 ('Real-ESRGAN','真实退化图片的超分辨率','卷积网络 + 对抗训练等目标','Upscayl 直接相关的底层技术'),
 ('waifu2x','偏动漫放大、降噪，也支持照片','经典版为卷积网络；后续迁至 nunif','同类方法，不等同于同一组权重'),
 ('SwinIR / HAT','图像重建、超分辨率等','窗口 / 混合注意力 Transformer','网络结构路线不同；需适配后使用'),
 ('SUPIR','文字引导的生成式图像修复','扩散模型 + SDXL 先验 + 修复约束','细节丰富，需平衡保真与计算成本'),
 ('Qwen-Image 系列','通用图像生成与编辑','图像基础模型；具体能力依版本','可修复 / 编辑，不等于任意倍率放大')]
for i,row in enumerate(rows):
    y=1390+i*65
    rect(80,y,2240,65,'white' if i%2==0 else '#eaf0f9',LINE,0)
    for c,value in enumerate(row):paragraph(cols[c]+20,y+13,value,cols[c+1]-cols[c]-40,26,INK if c==0 else MUTED,c==0,line=31,max_lines=1)
text(95,1990,'概念纠偏：CNN / Transformer 是网络结构；GAN 是训练方法；扩散是生成机制。它们并非互斥分类。',28,BLUE,True,2220)

section(2060,'04','专用超分辨率 vs 生成式大模型：目标与代价不同')
rect(80,2130,1100,241,'#eaf1ff');rect(1210,2130,1110,241,'white')
text(110,2154,'专用路线：侧重保留与批量',34,INK,True)
paragraph(110,2211,'适合：商品图、插画、已有素材的固定尺寸放大。\n通常更易保持整体结构、结果稳定、处理成本较低。\n局限：仍会补错纹理和文字，严重模糊可能无改善。',1040,29,max_lines=3,line=44)
text(1240,2154,'生成式路线：侧重修复与编辑',34,INK,True)
paragraph(1240,2211,'适合：补全、复杂修复、创意编辑、文字指令控制。\n可生成丰富细节，但内容可能变化、计算通常更重。\n修复约束与固定种子有帮助，不能保证真实或不变。',1050,29,max_lines=3,line=44)
text(95,2393,'两者都会估计缺失细节；以上为工程倾向，不是竞品实测排名。只输出文字的模型需调用图片处理工具。',27,MUTED,False,2220)

section(2460,'05','我们的理解：四种一致性，不能互相替代')
cards=[('结构保真','较易保持构图与物体\n仍然有内容变化可能'),('细节真实','纹理、字符可能猜错\n没有真实性保证'),('重复稳定','固定配置与环境通常稳定\n不保证跨设备逐比特一致'),('时序连续','单图增强没有时序保证\n多图与视频需另行验证')]
for i,(title,body) in enumerate(cards):
    x=80+i*570
    rect(x,2530,530,173)
    text(x+24,2550,title,33,BLUE,True)
    paragraph(x+24,2605,body,482,28,INK,max_lines=2,line=40)
rect(80,2740,2240,105,NAVY,NAVY,10)
text(110,2758,'观感更清楚 ≠ 细节更真实；输出稳定 ≠ 内容正确。',38,'white',True,2180)
text(110,2807,'产品价值在于提高旧素材可用性、降低操作成本；保真优势属于专用方案类别，并非 Upscayl 独有。',28,'#d8e5ff',False,2180)
text(80,2872,'研究示意图，非软件截图或真实增强样张；上游与竞品效果未实测。主仓库 a00d55f / 2.15.0 · 2026-09-11',25,MUTED,False,2240)
text(80,2910,'来源：Upscayl、各产品官方文档、Real-ESRGAN / SUPIR 论文。完整30项来源：yydshly.github.io/0911_codex_project/013-upscayl/',24,MUTED,False,2240)
parts.append('</svg>')
(ROOT/'assets/capability-overview.svg').write_text('\n'.join(parts)+'\n',encoding='utf-8',newline='\n')
print('Created capability-overview.svg',W,H)
