# 研究项目

按原库去重，目前已收录 **14 个研究项目**，研究索引与历史目录独立维护；其中历史目录 `002-engineering-casebook` 是研究 001 的配套案例手册，不单独计数；LongHorizon 的研究索引为 002，oh-my-pi 的研究索引为 003，XXG 的研究索引为 004。

| 编号 | 项目 | 原库 | 核心能力 | 状态 | 在线入口 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 001 | [Awesome Engineering Articles](001-awesome-engineering-articles/README.md) | [awesome-engineering-articles](https://github.com/ashishps1/awesome-engineering-articles) | 收集、分类并导航工程实践文章，帮助发现问题相关案例和原始资料 | 研究中 | [配套案例手册](https://yydshly.github.io/0911_codex_project/002-engineering-casebook/) |
| 002 | [LongHorizon-Harness](003-longhorizon-harness/README.md) | [LongHorizon-Harness](https://github.com/AMAP-ML/LongHorizon-Harness) | 动态拆解复杂目标，指导 Agent 分轮执行，以独立验收、可信进度和失败反馈持续推进并支持续接 | 研究中（文档已整理，上游运行待复现） | [在线研究存档](https://yydshly.github.io/0911_codex_project/003-longhorizon-harness/) |
| 003 | [oh-my-pi（OMP）](004-oh-my-pi/README.md) | [oh-my-pi](https://github.com/can1357/oh-my-pi) | 基于 Pi 二次开发、类似 Codex CLI 的 AI 编程 Agent 工具，依靠模型并完善代码编辑、调试、执行反馈与协作能力 | 研究中（理解与模块已整理，运行待复现） | [研究笔记](004-oh-my-pi/notes.md)；演示未部署 |
| 004 | [XXG Portrait Rebuild Light](005-xxg-portrait-rebuild-light/README.md) | [xxg-portrait-rebuild-light](https://github.com/moskoo/xxg-portrait-rebuild-light) | 将光源方向、大小、软硬、颜色与投射阴影写成提示词，连同原图和人物／构图保留要求交给宿主图像大模型，生成重新布光、曝光与肤质编辑结果，再对照验收。原库提供摄影规则和流程，成像能力来自模型。 | 研究中（三次布光与商品扩展已运行，完整技能待复现） | [能力展示说明](005-xxg-portrait-rebuild-light/README.md#我们新增的展示)；[在线效果展示](https://yydshly.github.io/0911_codex_project/005-xxg-portrait-rebuild-light/) |
| 005 | [FreeLLMAPI](008-freellmapi/README.md) | [freellmapi](https://github.com/tashfeenahmed/freellmapi) | 自托管模型网关：对外统一模型接口，对内选择供应商、模型与密钥路线，适配接口差异并管理额度、冷却和失败回退；应用 / Agent 负责组织任务，实际模型负责推理。 | 研究中（能力、架构及同类对比已整理，运行待复现） | [在线模型网关理解](https://yydshly.github.io/0911_codex_project/008-freellmapi/) · [产品对比](008-freellmapi/comparison.md)；已部署并验证 |
| 006 | [Graphify](009-graphify/README.md) | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 支持将源码、文档、PDF、Word/Excel、图片、音视频及 SQL 结构提取为可查询知识图谱；代码本地解析，语义资料需模型。输出交互网络、层级树、调用流程、SVG/Canvas、报告/Wiki，以及 JSON、GraphML、Cypher，辅助研究、依赖追踪与证据交付。 | FastAPI 核心包 747 节点 / 1,971 关系；原生导出、MCP 与增量已验证 | [完整理解](009-graphify/understanding.md) · [在线能力与原生演示](https://yydshly.github.io/0911_codex_project/009-graphify/)；已部署并验证 |
| 007 | [Marketing Skills](010-marketingskills/README.md) | [marketingskills](https://github.com/coreyhaines31/marketingskills) | 50 个技能覆盖定位、内容、搜索、转化、推广、客户关系、留存与实验；将资料变成研究、方案、文案与验证计划 | 已完成五技能真实应用；业务效果待验证 | [能力与范围](010-marketingskills/scope.md) · [在线展示](https://yydshly.github.io/0911_codex_project/010-marketingskills/)；已部署并验证 |
| 008 | [Drama Skills](006-drama-skills/README.md) | [zenstory-ai/drama-skills](https://github.com/zenstory-ai/drama-skills) | 支持从小说或一句话点子生成短剧：开发故事、编写分集剧本、确定视觉设定、设计分镜与生成提示词；接入外部模型后生产图片、视频、配音和音乐，再剪辑成片，并支持任意阶段审查。 | 两种入口已有实际文档，点子案例获得六格图；视频未执行，网页已部署并验证 | [在线流程与案例展示](https://yydshly.github.io/0911_codex_project/006-drama-skills/) · [案例与证据](006-drama-skills/demos/README.md) |
| 009 | [XXD Panel 028](007-xxd-panel-028/README.md) | [xxd-panel-028](https://github.com/nevertoday/xxd-panel-028) | 以微缩审美和交付流程指导图像模型生成二维插画，支持模式、比例、文字与批量验收；无三维输出 | 七场景及六张微缩扩展已实测；价值待验证 | [理解与价值](007-xxd-panel-028/understanding.md) · [微缩效果](007-xxd-panel-028/extensions/miniature-scenes/README.md) · [在线微缩展示](https://yydshly.github.io/0911_codex_project/007-xxd-panel-028/miniatures.html)；已部署并验证 |
| 010 | [Munder Difflin](011-munder-difflin/README.md) | [chaitanyagiri/munder-difflin](https://github.com/chaitanyagiri/munder-difflin) | 多 Agent 工具：管理多个已有 Agent 的模型、身份、任务与运行状态；通过本地文件收发箱实现协作通信，由平台投递消息并在空闲时唤醒处理。 | 研究中（能力、文件通信与对比已整理；上游未实测） | [能力总览图](011-munder-difflin/assets/overview.png)；[在线理解展示](https://yydshly.github.io/0911_codex_project/011-munder-difflin/) |
| 011 | [gstack](012-gstack/README.md) | [garrytan/gstack](https://github.com/garrytan/gstack) | 57 项独立技能覆盖需求规划、设计页面、质量排障、浏览器数据、交付、文档、记忆、保护、iOS 真机、跨模型协作、路由与安装适配；宿主结合模型和工具执行，产出方案、修改、测试与交付证据。 | 57 项技能已解读；方法实践、21 项规则测试和 17 项浏览器检查通过；全量原生运行未复现 | [在线工程方法实验室](https://yydshly.github.io/0911_codex_project/012-gstack/)；已部署并验证 |
| 012 | [Gaussian Splatting](014-gaussian-splatting/README.md) | [graphdeco-inria/gaussian-splatting](https://github.com/graphdeco-inria/gaussian-splatting) | 多角度照片生成可交互三维效果：先求解相机与空间，再用 3DGS（三维高斯泼溅）优化场景，支持新视角实时浏览；原生输出是高斯资产，不自动等于精确网格。 | 已完成本轮文档与网页；上游训练未实测 | [在线研究网页](https://yydshly.github.io/0911_codex_project/014-gaussian-splatting/)；已部署并验证 |
| 013 | [Upscayl](013-upscayl/README.md) | [upscayl/upscayl](https://github.com/upscayl/upscayl) | 本地图片超分辨率与批量放大：预训练模型 + NCNN / Vulkan，支持多模型、输出尺寸与对比；较生成式编辑更侧重结构保持与固定尺寸处理，仍不保证真实细节。 | 能力、原理、部署、同类及大模型差异已整理；上游未实测 | [完整研究](013-upscayl/notes.md)；[在线研究手册](https://yydshly.github.io/0911_codex_project/013-upscayl/) 已部署并验证 |
| 014 | [Browser-use](015-browser-use/README.md) | [browser-use/browser-use](https://github.com/browser-use/browser-use) | Browser-use 是浏览器任务的 AI Agent 框架，支持网页导航、搜索、点击、输入、滚动、信息提取及多步流程。模型根据页面结构与可选截图选择目标；程序读取按钮当前布局、计算点击坐标，再通过底层 CDP 协议向真实浏览器发送鼠标移动、按下和松开事件，并读取结果继续执行。 | 12 节中文理解与完整图已整理；上游未实测 | [详细本地网页](015-browser-use/app/dist/index.html) · [完整文档](015-browser-use/understanding.md)；未部署 |

## 编号与目录

- Browser-use 研究索引 014，历史目录 `015-browser-use`；用户话题序号 16 独立保留。完整理解、CDP 点击总览图与教学网页已整理，未部署。

- Upscayl 研究索引 013，目录 `013-upscayl`；文档与网页研究已完成，上游未实测，网页已部署并验证。

- gstack 研究索引 011，历史目录 `012-gstack`；57 项、12 类软件研发技能的范围与原理、能力全图、九阶段案例已整理，网页已部署并验证。

- Marketing Skills 研究索引 007，历史目录 `010-marketingskills`；中文能力手册、完整输入输出图与五技能真实应用，展示已部署并验证。

- Graphify 研究索引 006，目录 `009-graphify`；完整输入/输出能力图解与 FastAPI 原生演示配套收录，不新增研究条目。

- Munder Difflin 的研究索引为 010，存储目录为 `011-munder-difflin`；多 Agent 工具，以文件通信组织协作，中文能力与对比页已发布并验证，暂不归档。

- XXD Panel 028 保留研究索引 009 与历史目录 007；原库二维微缩能力、实际扩展效果和价值边界已整理，已部署并验证。

- Drama Skills 保留登记研究索引 008 与历史目录 006；支持小说或点子生成短剧，两种案例和完整流程图已整理，网页已部署并验证。

- XXG Portrait Rebuild Light 的研究索引为 004，存储目录为 `005-xxg-portrait-rebuild-light`；新增中文静态展示、三次布光与商品扩展记录，另标注婚纱编辑和老照片输入连接失败未完成，已公开发布并验证，上游完整技能待复现。

- [工程案例手册（历史目录 002）](002-engineering-casebook/README.md) 归属 001，保留独立目录、依赖和已发布地址，用于中文导读、搜索筛选和原文总结。
- 项目总索引按原库去重；同一原库的研究、展示与实验关联到同一个研究条目，不重复计数。
- 研究索引与存储目录编号分开维护。LongHorizon 的研究索引为 002，历史目录与网址仍使用 `003-longhorizon-harness`；目录前缀不代表当前研究排序。
- oh-my-pi 的研究索引为 003，存储目录为 `004-oh-my-pi`；新增内容为中文研究和引导图，尚未增加运行演示。
- FreeLLMAPI 的研究索引为 005，存储目录为 `008-freellmapi`；新增中文能力、架构、同类产品对比与教学网页，四种请求场景为固定模拟；上游运行待复现，网页已部署并验证。
- 存储目录使用 `001-project-slug` 格式，按历史目录最大编号加一；短名使用小写英文和连字符。
- 研究索引从 `001` 开始，按独立原库收录顺序递增，配套演示不占用研究索引；超过 `999` 后扩展编号宽度。
- 本次按用户要求将 LongHorizon 的研究索引修正为 002。此后研究索引与存储编号分别保持稳定；归档不复用。
- 根 README 的索引与图片预览均按编号的数值升序排列。
- 项目状态使用：`待研究`、`研究中`、`已完成`、`已归档`；演示是否部署单独记录。

每个项目至少包含 `README.md`、`notes.md` 和 `assets/`。实际代码按需放入 `app/`，详细实验记录可继续拆分到项目内部。

请按照[收录指南](../docs/adding-a-project.md)复制模板，并同步更新[总索引](../README.md#项目索引)。
