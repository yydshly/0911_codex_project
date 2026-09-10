# GitHub 项目研究集

持续收录值得研究的 GitHub 项目，以**原库的核心能力**为主线，说明它能做什么、如何工作、适用于什么场景，再关联我们的研究笔记和实践演示。

这里是研究总入口：先通过有序索引了解项目，再进入子目录查看研究笔记、界面截图和 Web 演示。

**当前进度：** 按原库统计，已收录 **10** 个研究项目。Awesome Engineering Articles 提供工程文章的收集、分类与导航，其配套案例手册提供 343 条中文导读与 6 篇原文总结；LongHorizon-Harness 聚焦复杂目标拆解与 Agent 持续执行；oh-my-pi 是基于 Pi 二次开发、类似 Codex CLI 的 AI 编程 Agent 工具；XXG Portrait Rebuild Light 将布光、曝光、肤质和成像风格经验封装为人像编辑技能。案例手册与 LongHorizon 研究存档已发布到 GitHub Pages；OMP 运行待复现，XXG 已有三次人像配方编辑、商品布光扩展、完整提示词与中文能力展示，两者尚未部署演示。 Drama Skills 将点子或原著转为剧本、视觉设定、分镜和生成提示词，并支持连接外部模型生产、剪辑与按需审查；当前已有《水浒传》选段创作示例和真实原库创作台截图，视频生产待实测。 XXD Panel 028 已完成七个真实摄影场景的 Skill 执行，含婚纱照、亲子做饭和伴侣散步，保留十二次生成的输入、提示词与验收偏差，展示未部署。 Marketing Skills 已扩充为完整中文手册，包含 50 技能详解、六个任务场景、95 份指南与 64 个脚本目录、上手和原理说明；展示未部署。

FreeLLMAPI 的研究索引为 005，资料存于历史目录 `008-freellmapi/`；已整理核心理解、模型接入与容错架构，以及七个模型网关产品对比，新增四种请求场景的中文教学网页；上游运行待复现，网页未公开部署。

Graphify 已完成 FastAPI 核心包真实建图，提供六种原生结果、实时 CLI 查询、MCP 与增量验证；研究索引 006，目录 `009-graphify/`，尚未线上部署。

[打开在线总入口](https://yydshly.github.io/0911_codex_project/) · [工程案例手册](https://yydshly.github.io/0911_codex_project/002-engineering-casebook/) · [LongHorizon-Harness 存档](https://yydshly.github.io/0911_codex_project/003-longhorizon-harness/)

Munder Difflin 已整理本地多 Agent 管理、文件消息与团队记忆能力，并新增一图完整展示原理与同类差异；研究索引 010，暂不归档，上游未实测、未部署演示。

## 项目索引

按原库去重、按研究索引升序排列：001 为工程文章库，002 为 LongHorizon-Harness，003 为 oh-my-pi，004 为 XXG Portrait Rebuild Light。案例手册归属 001，不单独计数。研究索引与历史存储路径分开：已发布网址继续有效；003 存于 `004-oh-my-pi/`，004 存于 `005-xxg-portrait-rebuild-light/`。

| 编号 | 项目 / 研究入口 | 原库 | 核心能力摘要 | 研究状态 | 演示 / 关联 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 001 | [Awesome Engineering Articles](projects/001-awesome-engineering-articles/README.md) | [ashishps1/awesome-engineering-articles](https://github.com/ashishps1/awesome-engineering-articles) | 按公司、技术主题和年份汇集 343 篇工程实践文章，帮助快速发现相关案例、定位原始资料，为架构调研、技术学习和实验选题提供入口。 | 研究中（初步分析完成） | [配套在线手册](https://yydshly.github.io/0911_codex_project/002-engineering-casebook/) |
| 002 | [LongHorizon-Harness](projects/003-longhorizon-harness/README.md) | [AMAP-ML/LongHorizon-Harness](https://github.com/AMAP-ML/LongHorizon-Harness) | 动态拆解复杂目标，指导现有 Agent 按计划分轮执行，以独立验收、可信进度和失败反馈持续修正计划，支持任务续接及无需持续盯守的推进。 | 文档与源码已整理，上游运行待复现 | [在线研究存档](https://yydshly.github.io/0911_codex_project/003-longhorizon-harness/) |
| 003 | [oh-my-pi（OMP）](projects/004-oh-my-pi/README.md) | [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi) | 基于 Pi 二次开发、类似 Codex CLI 的 AI 编程 Agent 工具；依靠接入的大模型，完善代码编辑、语言服务、调试和多代理协作，执行代码分析、修改、检查与反馈流程。 | 理解与模块研究已整理，上游运行待复现 | [研究笔记](projects/004-oh-my-pi/notes.md)；演示未部署 |
| 004 | [XXG Portrait Rebuild Light](projects/005-xxg-portrait-rebuild-light/README.md) | [moskoo/xxg-portrait-rebuild-light](https://github.com/moskoo/xxg-portrait-rebuild-light) | 用摄影配方与范围约束指导宿主图像模型调整已有的人像光影、曝光、肤质和成像风格；适用于创意修图、效果预演与摄影教学，结果需要验收。 | 三次布光与商品扩展已运行，完整技能与系统评测待复现 | [中文能力展示说明](projects/005-xxg-portrait-rebuild-light/README.md#我们新增的展示)；展示未部署 |
| 005 | [FreeLLMAPI](projects/008-freellmapi/README.md) | [tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi) | 统一多个供应商的模型接口、密钥与额度，按能力、可靠性、速度和余量路由请求并处理故障切换，支持个人原型与 Agent 实验。 | 能力、架构与同类对比已整理；上游运行待复现 | [中文理解网页](projects/008-freellmapi/app/dist/index.html) · [产品对比](projects/008-freellmapi/comparison.md)；未公开部署 |
| 006 | [Graphify](projects/009-graphify/README.md) | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 将代码、文档与设计依据转为可查询关系图，辅助项目阅读、依赖追踪和修改影响分析 | FastAPI 核心包 747 节点 / 1,971 关系；原生导出、MCP 与增量已验证 | [交互展示](projects/009-graphify/app/dist/index.html)；未部署 |
| 007 | [Marketing Skills](projects/010-marketingskills/README.md) | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | 将定位、内容、搜索优化、转化和实验方法组织为 50 个 Agent 技能，复用产品背景并衔接外部工具，帮助技术团队完成营销工作。 | 能力与代表性源码已研究，真实营销执行待验证 | [中文能力与流程展示](projects/010-marketingskills/app/dist/index.html)；未部署 |
| 008 | [Drama Skills](projects/006-drama-skills/README.md) | [zenstory-ai/drama-skills](https://github.com/zenstory-ai/drama-skills) | 将点子、原著或剧本转成分集剧本、视觉设定、分镜与图片／视频提示词；连接外部服务后支持素材生成、剪辑成片与按需审查，服务短剧及漫剧制作。 | 《水浒传》创作与原库创作台已运行，附技能效果对照及 8 段图片提示词；当前聚焦图片与提示词，生成状态见记录 | [水浒传演示](projects/006-drama-skills/demos/shuihu/README.md) · [技能与效果对照](projects/006-drama-skills/demos/shuihu/技能与效果逐步对照.md) · [提示词指南](projects/006-drama-skills/demos/shuihu/提示词使用指南.md)；仅本地运行，未公开部署 |
| 009 | [XXD Panel 028](projects/007-xxd-panel-028/README.md) | [nevertoday/xxd-panel-028](https://github.com/nevertoday/xxd-panel-028) | 将照片的主体、姿态、关系与源图色彩转译为等距纸上微缩景观；通过 Agent Skill 组织四模式、多比例、文字控制和批量交付，生成效果需验收。 | 七场景已实测，含婚纱与人物生活；偏差已记录 | [中文样张与交付预览](projects/007-xxd-panel-028/README.md#本地新增展示)；未部署 |
| 010 | [Munder Difflin](projects/011-munder-difflin/README.md) | [chaitanyagiri/munder-difflin](https://github.com/chaitanyagiri/munder-difflin) | 管理本机多个编程 CLI 的角色、任务、消息和记忆，提供真实终端、状态观察与人工干预 | 研究中（能力与对比图已整理，暂不归档；运行未实测） | [能力概览](projects/011-munder-difflin/README.md)；[总览图](projects/011-munder-difflin/assets/overview.png)；未部署 |

Drama Skills 的研究索引为 008，资料存于历史目录 `006-drama-skills/`；研究编号与目录编号分别稳定维护。

## 项目预览

### 001 · Awesome Engineering Articles

**原库能力：工程案例收集、分类与导航。** 研究版本收录 39 个公司／品牌的 343 个文章条目，标注主题、年份并链接原文，降低寻找工程经验的成本。复杂系统的实现位于原文中，上游本身是轻量的 Markdown 索引。

暂无截图。原库是文章索引，可通过配套在线手册浏览其案例；在线手册是本地新增的展示能力。

[查看研究](projects/001-awesome-engineering-articles/README.md) · [上游仓库](https://github.com/ashishps1/awesome-engineering-articles) · [配套在线手册](https://yydshly.github.io/0911_codex_project/002-engineering-casebook/)

#### 配套案例手册（保留历史目录 002）

**配套能力：中文案例检索与结构化阅读。** 基于原库的资料组织能力，补充搜索、组合筛选、排序和详情展示。已接入全部条目，其中 6 篇记录问题、做法、结果、代价和研究启示，其余 337 篇仍为标题导读。

暂无真实截图；展示页已通过数据与逻辑检查，并已验证 GitHub Pages 页面及主要资源与发布提交一致。

![工程案例手册：整体理解引导图](projects/002-engineering-casebook/assets/overview-guide.png)

上图为 AI 生成的整体说明图，非软件截图；记录 2026-09-10 部署前的理解快照。图中部署状态是历史记录，当前状态以索引和项目说明为准。

[在线展示](https://yydshly.github.io/0911_codex_project/002-engineering-casebook/) · [配套手册说明](projects/002-engineering-casebook/README.md) · [阅读中文案例目录](projects/002-engineering-casebook/cases.md) · [原库](https://github.com/ashishps1/awesome-engineering-articles)

### 002 · LongHorizon-Harness

**原库能力：复杂目标拆解、分轮执行与独立验收。** 管理者依据已验证进度安排任务，执行者调用现有 Agent 操作，审计者检查真实结果并反馈下一轮；在条件充分时无需人持续盯守，但不保证任意目标都成功。

![LongHorizon-Harness：整体能力与任务管控指导图](projects/003-longhorizon-harness/assets/guide.png)

原创指导图，非上游界面或运行截图。研究固定 v0.1.7；完整覆盖与 Codex、Claude Code、OpenClaw、Hermes 和 MetaGPT 的比较，区分源码事实、作者报告与待验证事项。

[完整研究](projects/003-longhorizon-harness/research.md) · [在线研究存档](https://yydshly.github.io/0911_codex_project/003-longhorizon-harness/) · [可编辑指导图](projects/003-longhorizon-harness/assets/guide.svg)

### 003 · oh-my-pi（OMP）

**原库能力：基于 Pi 二次开发、类似 Codex CLI 的 AI 编程 Agent 工具。** 大模型负责理解、分析和生成，OMP 完善工具、执行流程与协作，把任务落到实际项目的读代码、改文件、运行检查和结果反馈中；它本身没有训练一个新模型。

![oh-my-pi：Pi、模型、内部模块与执行反馈的整体理解引导图](projects/004-oh-my-pi/assets/guide.png)

沿用讨论确认的模块流程图，为原创理解示意图，非上游界面或运行截图。固定研究提交 `d884057`；已整理概念、文档与部分核心源码，未安装实测、未部署演示。

[查看研究](projects/004-oh-my-pi/README.md) · [内部模块与研究重点](projects/004-oh-my-pi/notes.md) · [上游仓库](https://github.com/can1357/oh-my-pi) · [矢量图](projects/004-oh-my-pi/assets/guide.svg) · [Mermaid 源文件](projects/004-oh-my-pi/assets/guide.mmd)

### 004 · XXG Portrait Rebuild Light

**原库能力：通过摄影规则与配方指导人像编辑。** 将主光、曝光、肤质、光色、调色和成像响应分开控制，调用宿主图像模型实现编辑，再检查人物、光影与构图。默认整图编辑后端无法保证局部像素不变。

![XXG Portrait Rebuild Light：本次实际夕阳逆光编辑结果](projects/005-xxg-portrait-rebuild-light/assets/experiments/golden.png)

上图为本次内置 ImageGen 实际编辑输出，输入是 AI 合成人像，非真人实拍或网页截图。固定研究 v2.1.0 / `60348ce`；网页包含同图三次布光、新增商品布光样例与既有窗光参考、逐字提示词和偏差说明，并梳理七个产品方向；婚纱编辑和老照片输入因连接失败未完成。另保留四组上游示例与六种配方解析。完整技能和系统性评测待复现，展示未部署。

[项目与展示说明](projects/005-xxg-portrait-rebuild-light/README.md) · [完整研究](projects/005-xxg-portrait-rebuild-light/notes.md) · [产品扩展与样例](projects/005-xxg-portrait-rebuild-light/extensions.md) · [上游仓库](https://github.com/moskoo/xxg-portrait-rebuild-light) · [素材来源与许可证](projects/005-xxg-portrait-rebuild-light/assets/README.md)

### 005 · FreeLLMAPI

**原库能力：统一模型接入、额度管理与自动路由。** 将多个供应商及自定义端点集中到自托管网关，根据能力、速度、可靠性和额度选择模型，在可重试错误时执行故障切换，适合个人原型、多模型评测和 Agent 实验。

![FreeLLMAPI：请求处理、模型调度与后台状态架构](projects/008-freellmapi/assets/architecture.png)

原创架构示意图，非上游界面或运行截图。研究固定提交 `83562ad`；本地新增中文能力、架构与研究记录，上游运行待复现，暂无真实截图，演示未部署。

[查看研究](projects/008-freellmapi/README.md) · [中文理解网页](projects/008-freellmapi/app/dist/index.html) · [核心交互](projects/008-freellmapi/understanding.md) · [同类产品对比](projects/008-freellmapi/comparison.md) · [架构详解](projects/008-freellmapi/architecture.md) · [上游仓库](https://github.com/tashfeenahmed/freellmapi)

网页展示统一接口、路线选择和失败管理，包含四种固定教学场景、七个产品对照与完整研究阅读页；模拟不是实际模型调用。暂无网页截图，已接入发布清单，未公开部署。

### 006 · Graphify

**原库能力：将代码、文档与设计依据转为可查询的关系图。** 通过本地 AST 与可选语义抽取连接实体，支持查询、路径和修改影响分析。

![Graphify 原生导出的 FastAPI 矢量网络图](projects/009-graphify/assets/native-fastapi.svg)

本次实际生成的上游原生 SVG，非浏览器截图。FastAPI 核心包全部 48 个 Python 文件生成 747 节点、1,971 关系和 46 社区；提供网络、树、调用流程、报告、SVG、Wiki，以及本地真实 CLI 查询。MCP 与隔离增量更新已验证，多模态和外部数据库尚未实测；未部署。

[项目说明](projects/009-graphify/README.md) · [交互展示](projects/009-graphify/app/dist/index.html) · [研究笔记](projects/009-graphify/notes.md)

### 007 · Marketing Skills

**原库能力：将营销经验组织为 Agent 技能与工具接入流程。** 固定版本包含 50 个技能，覆盖定位、内容、搜索、转化、推广、留存与实验，复用产品背景并由宿主 Agent 执行。

![Marketing Skills：技能、共享背景与工具执行原理](projects/010-marketingskills/assets/guide.png)

原创原理图，非上游截图或真实运行结果。本地新增 50 技能详细卡、六个六步教学场景、完整工具目录与上手手册；GA4 三个预览路径通过阻断网络的离线检查，真实业务执行待验证，展示未部署。

[中文展示页](projects/010-marketingskills/app/dist/index.html) · [完整研究](projects/010-marketingskills/notes.md) · [上游仓库](https://github.com/coreyhaines31/marketingskills) · [矢量原理图](projects/010-marketingskills/assets/guide.svg)

### 008 · Drama Skills

**原库能力：从故事到制作材料，再到确认后的媒体生产与剪辑。** 提供原著分析、故事开发、剧本、视觉资产、分镜、图片／视频提示词、外部生产、剪辑和按需审查，帮助创作者按明确输入输出完成各阶段交接。

![Drama Skills：多入口、各阶段技能与产物、最终交付流程](projects/006-drama-skills/assets/capability-workflow.png)

本地原创完整流程图，展示多种入口、全部 11 个技能及各阶段产物，区分分析策划、创作文档、媒体素材与剪辑成片；非上游界面或运行成果。研究固定提交 `dc9b0fa`；所选 145 项离线测试中 142 项通过、3 项跳过。另有《水浒传》选段创作与真实创作台截图；视频成片尚未生成，未公开部署。

[高清流程图](projects/006-drama-skills/assets/capability-workflow.png) · [矢量流程图](projects/006-drama-skills/assets/capability-workflow.svg) · [水浒传演示](projects/006-drama-skills/demos/shuihu/README.md) · [技能与效果逐步对照](projects/006-drama-skills/demos/shuihu/技能与效果逐步对照.md) · [项目介绍](projects/006-drama-skills/README.md) · [能力与产物示例](projects/006-drama-skills/capabilities.md) · [技术研究](projects/006-drama-skills/notes.md) · [上游仓库](https://github.com/zenstory-ai/drama-skills)

### 009 · XXD Panel 028

**原库能力：照片的等距纸上微缩转译与多规格交付。** 通过稳定的审美原文和参数化交付要求指导生图模型，支持上下、左右、纯设计和四端壁纸。主体保真与文字准确性需要验收。

![XXD Panel 028：婚纱双人照按原库 Skill 实际生成的上下对照](projects/007-xxd-panel-028/assets/generated/20260910-people-scenes-02/source-005-wedding-top-bottom-2x3-1024x1536-attempt-1.png)

上图为按固定上游 Skill 实际生成的婚纱场景，非网页截图；摄影区域也经过生成，拱门与花柱为模型补全。累计七场景、十二次生成，含婚纱、亲子做饭与伴侣散步，保留模式、尺寸与内容偏差。可查看[人物生活场景、原图与完整提示词](projects/007-xxd-panel-028/runs/20260910-people-scenes-02/README.md)及[此前四场景](projects/007-xxd-panel-028/runs/20260910-real-scenes-01/README.md)。展示未部署。

[项目与运行说明](projects/007-xxd-panel-028/README.md) · [完整研究](projects/007-xxd-panel-028/notes.md) · [原库](https://github.com/nevertoday/xxd-panel-028) · [样张来源](projects/007-xxd-panel-028/assets/README.md)

### 010 · Munder Difflin

**原库能力：本地多 Agent 执行与协作管理。** 包装已有编程 CLI，配置角色、模型和工作目录，通过文件收发箱、任务板和记忆组织交接，并提供实时终端、运行状态与人工干预。

![Munder Difflin：核心能力、交互原理与同类差异总览](projects/011-munder-difflin/assets/overview.png)

原创研究总览图，非软件截图。展示能力、文件投递与空闲唤醒流程、同类差异、场景和验证边界；能力与对比图已整理，暂不归档，上游未实测、演示未部署。

[放大矢量图](projects/011-munder-difflin/assets/overview.svg)

[能力概览](projects/011-munder-difflin/README.md) · [研究记录](projects/011-munder-difflin/notes.md) · [上游仓库](https://github.com/chaitanyagiri/munder-difflin)

## 仓库导航

| 入口 | 内容 |
| :--- | :--- |
| [研究项目](projects/README.md) | 编号规则与子项目目录 |
| [收录指南](docs/adding-a-project.md) | 如何新增项目、更新索引与配图 |
| [子项目模板](templates/project/README.md) | 项目摘要、上游信息、研究进度与演示入口 |
| [Web 演示约定](docs/web-demos.md) | 多个演示的组织方式与部署记录 |

## 组织方式

```text
0911_codex_project/
├── README.md                 # 对外摘要、有序索引与图片预览
├── projects/                 # 实际研究项目：001-slug、002-slug……
├── templates/project/        # 可复制的子项目模板
│   ├── README.md             # 子项目介绍与入口
│   ├── notes.md              # 研究过程、结论与复现记录
│   └── assets/               # 截图、示意图与图片说明
├── docs/                     # 收录和部署约定
└── AGENTS.md                 # 后续协作时的仓库维护约定
```

每个研究项目独立管理代码、依赖和运行说明；需要实现或改造时，在其目录内新增 `app/`。根目录保持轻量，方便同时研究不同技术栈。

上游项目的代码和素材遵循各自许可证，具体来源、版本与改动记录在对应子项目中。
