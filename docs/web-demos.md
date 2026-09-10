# Web 演示约定

[返回首页](../README.md)

## 当前发布方式

使用 GitHub Pages，由 [发布工作流](../.github/workflows/pages.yml) 将 [部署清单](web-demos.json) 中的项目统一发布。首次发布已于 2026-09-10 完成并验证。

[站点总入口](https://yydshly.github.io/0911_codex_project/) · [001 的配套工程案例手册](https://yydshly.github.io/0911_codex_project/002-engineering-casebook/) · [002 LongHorizon-Harness 存档](https://yydshly.github.io/0911_codex_project/003-longhorizon-harness/)

- 站点根目录：能力与演示总入口，关联原库、能力研究和案例展示。
- `002-engineering-casebook/`：工程案例手册的独立访问路径。
- `003-longhorizon-harness/`：LongHorizon-Harness 研究存档，不是上游 Agent 实测演示。
- `assets/`：站点展示所需的整体引导图。
- 本地预览仅用于本机，不作为线上部署结果。

## 构建与部署流程

1. 推送 `main` 分支中与部署相关的文件，或手动运行发布工作流。
2. 在 002 项目中生成数据，检查原文对应关系、搜索筛选、排序、分页及静态资源，并确认生成文件与提交一致。
3. 从根目录执行 `node scripts/build-pages.cjs`，根据部署清单汇总每个项目的静态目录。
4. 输出到根 `_site/`，只上传此目录；不上传整个仓库、研究原始资料或本地配置。
5. 通过 GitHub Actions 的 Pages artifact 和 deploy-pages 发布。
6. 部署完成后验证首页、各子路径与资源，核对部署提交，再更新文档入口。

本仓库根目录没有统一应用依赖；打包脚本使用 Node.js 内置模块。项目自身依赖、锁文件和检查命令仍独立维护。

## 增加其他演示

在 [web-demos.json](web-demos.json) 中追加项目，保留已有条目。每个条目包括：

| 字段 | 用途 |
| :--- | :--- |
| researchIndex | 所属原库的研究索引，用于展示和排序；同一原库的配套演示使用相同索引 |
| id / slug | 历史存储编号与独立 URL 子路径，保持已发布链接稳定；不代表研究索引 |
| sourceDirectory | 已完成构建的静态目录 |
| name / capability | 项目名称与原库核心能力摘要 |
| extension | 本地新增能力，避免与原库能力混淆 |
| upstream / upstreamName | 真实原库地址与名称 |
| readme / research | 本地项目介绍与原库能力研究 |
| image | 项目说明图或真实截图；明确图片性质 |

同时为新项目补充工作流中的构建检查步骤和路径触发条件，再更新根 README、子项目 README 的演示入口。打包按研究索引排序，同一研究内按存储编号排序，并检查重复路径、引用文件和 JavaScript 语法。

所有子项目一次性汇总发布，避免后部署的项目覆盖先前演示。静态文件使用相对资源路径，确保放在子路径下仍可加载。包含后端的项目需另外配置服务，GitHub Pages 不运行后端。

## 部署记录

| 项目 | 记录 |
| :--- | :--- |
| 平台 | GitHub Pages |
| 仓库 | [yydshly/0911_codex_project](https://github.com/yydshly/0911_codex_project) |
| 分支与触发 | main 的相关变更，或 workflow_dispatch |
| 工作流 | [.github/workflows/pages.yml](../.github/workflows/pages.yml) |
| 打包命令 | 根目录执行 `node scripts/build-pages.cjs` |
| 上传目录 | `_site/` |
| 002 静态源目录 | `projects/002-engineering-casebook/app/dist/` |
| 002 路径 | `002-engineering-casebook/` |
| 上游研究版本 | `9ef9509126254406440c0e5ee09f609d0876418a` |
| 首次发布状态 | 成功；2026-09-10 验证首页、两个子路径及主要静态资源正常，内容与提交一致 |
| 首次发布提交 | `9dc501b1926baac79be8c371b07eebe96ba299e0` |
| 工作流证据 | [Actions 运行记录](https://github.com/yydshly/0911_codex_project/actions/runs/34477023345) |
| HTTPS | 已启用并强制使用 |

权限由 GitHub Actions 的 `contents: read`、`pages: write` 和 `id-token: write` 控制，无需将访问令牌放入仓库。

参考：[GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## XXG 人像光影展示（已部署）

研究 004，路径 `005-xxg-portrait-rebuild-light/`。通过光源方向、软硬、颜色与阴影描述指导图像大模型编辑原图。展示包含三次布光、商品新样例、职业头像方向的既有参考、完整提示词与局限；婚纱编辑和老照片输入因网络失败未完成。入口使用实际夕阳布光效果图，不把说明图或网页截图当作生成结果。

构建检查：`node projects/005-xxg-portrait-rebuild-light/app/scripts/build.cjs`；统一汇总仍为 `node scripts/build-pages.cjs`，保留已有两个子路径。公开地址：[在线效果展示](https://yydshly.github.io/0911_codex_project/005-xxg-portrait-rebuild-light/)。

XXG 部署验证：2026-09-10，首次发布提交 `f04a91b5a2c9f1e9668a48a65cb8d9422425337a`，[Actions 成功记录](https://github.com/yydshly/0911_codex_project/actions/runs/34489688585)。核对线上 35 个文件，覆盖总入口、两个已有子站、XXG 全部发布文件与实际效果预览；文本按换行归一比较、图像按原始字节比较。

## Drama Skills · 小说或点子生成短剧

研究 008，历史路径 `006-drama-skills/`。新增只读中文网页，使用讨论中的完整流程图作引导，逐步关联原始技能、两种案例和实际效果；视频生产与剪辑未执行。构建零第三方依赖：

```text
node projects/006-drama-skills/app/build.cjs
node projects/006-drama-skills/app/check.cjs
```

发布清单合并 `projects/006-drama-skills/app/dist`，保留既有案例手册、LongHorizon 和 XXG 等站点。仅导出明确列出的文档和图片，原库本地创作台与运行令牌不公开。目标子路径为 `006-drama-skills/`，远端已部署并验证。

首次部署验证：2026-09-10，[Drama Skills 在线展示](https://yydshly.github.io/0911_codex_project/006-drama-skills/)。提交 `22328ccddf11edd8c4a64c9d4658187f4065a0e5` 的 [GitHub Pages 流程](https://github.com/yydshly/0911_codex_project/actions/runs/34494114594) 构建与部署成功；远端 HTML、样式、脚本、24 份阅读数据、完整流程图 PNG/SVG、真实六格图与创作台截图共 8 个文件返回 200，内容与标准化本地构建一致。在线总入口已收录本页。

## XXD Panel 028 已发布展示

[在线能力展示](https://yydshly.github.io/0911_codex_project/007-xxd-panel-028/) · [六张微缩扩展效果](https://yydshly.github.io/0911_codex_project/007-xxd-panel-028/miniatures.html) · [花艺修改对照](https://yydshly.github.io/0911_codex_project/007-xxd-panel-028/miniatures.html#customize)

首次发布：2026-09-10，提交 `d01ee23`，[Pages 流程成功](https://github.com/yydshly/0911_codex_project/actions/runs/34497060467)。21 个线上文件均返回 200，文本换行归一后与本地一致，PNG 原始字节一致；含既有子站、三页展示、主预览、六张微缩图及定制证据。详见[验证记录](../projects/007-xxd-panel-028/deployment-verification.json)。

研究 009 的中文样张与交付预览位于 `projects/007-xxd-panel-028/app/`，构建目录为 `app/dist/`，使用独立子路径 `007-xxd-panel-028/`。已合并发布清单与构建检查，保留现有站点产物；现已发布并完成线上内容核对。现已补充七场景、十二次实际生成及原图与提示词记录，含婚纱、亲子做饭和伴侣沙滩散步；上游样张和本次输出分别标注，模式及尺寸偏差原样保留。新增同目录 extensions.html，包含五任务六次真实生成的风格扩展、保留程度与系列参考，以及三种可交互成品版式；随同一站点构建发布，不新增研究条目或站点。同目录 miniatures.html 进一步展示五类微缩场景扩展、六张实际 PNG 和花艺修改前后切换；视频与可旋转三维未制作。主预览统一采用淡蓝花艺定制最终图；首页与微缩页同步补全原库能力、本地扩展、二维／三维区别和产品价值假设，完整结论见[理解文档](../projects/007-xxd-panel-028/understanding.md)。

## FreeLLMAPI · 模型网关理解与对比

研究 005，历史目录与发布子路径为 `008-freellmapi/`。原库是自托管模型网关：对外统一模型接口，对内选路、适配并管理额度与失败。

[在线理解展示](https://yydshly.github.io/0911_codex_project/008-freellmapi/)包含讨论中的引导图、四种固定请求场景、七个产品对比、后续自研网关取舍与六篇完整文档。网页不提供在线网关服务，场景没有调用真实模型。

安装本项目 `app/requirements.txt` 后，执行 `python projects/008-freellmapi/app/build.py` 和 `node projects/008-freellmapi/app/check.cjs`，由统一脚本汇总 `app/dist/`；已有五个子站保留。

2026-09-10 首次发布提交 `76b886f986a20c3ff6e6ebc703a70069687fdf20`，[Pages 流程成功](https://github.com/yydshly/0911_codex_project/actions/runs/34498793268)。核对 29 个线上文件，覆盖完整新站、引导图、总入口和既有子站，全部返回 200 并与本地构建一致；文本按 LF 归一比较，图片按原始字节比较。[验证证据](../projects/008-freellmapi/deployment-verification.json)。

[项目说明](../projects/008-freellmapi/README.md) · [我们的理解](../projects/008-freellmapi/understanding.md) · [同类产品](../projects/008-freellmapi/comparison.md)


## Munder Difflin · 多 Agent 与文件通信

研究 010，发布子路径 `011-munder-difflin/`，静态目录 `projects/011-munder-difflin/app/dist/`。原库是管理多个已有 Agent 的多 Agent 工具，以文件收发箱实现通信；本地新增能力说明、总览图与六步交互讲解，上游未运行，网页不是在线 Agent 服务。

安装项目 `app/requirements.txt`，运行 `app/build.py` 与 `app/check.cjs` 后，由统一发布脚本合并产物；保留现有站点。发布结果以实际线上验证记录为准。


Munder Difflin 首次发布验证：2026-09-11，[在线理解展示](https://yydshly.github.io/0911_codex_project/011-munder-difflin/)。提交 `21f6bac31d06ff70ea5a4b152718577f8a94c017` 的 [Pages 流程](https://github.com/yydshly/0911_codex_project/actions/runs/34500138183)成功；19 个线上文件与构建一致，覆盖新页、总入口、已有子站及预览图。[验证记录](../projects/011-munder-difflin/deployment-verification.json)。


## Graphify 已发布展示

`009-graphify/` 已加入合并发布清单，静态源目录为 `projects/009-graphify/app/dist/`，检查命令为 `node projects/009-graphify/app/check.cjs` 和 `node projects/009-graphify/app/check-native.cjs`。[在线能力与原生演示](https://yydshly.github.io/0911_codex_project/009-graphify/)已发布并验证。展示包含完整 FastAPI 核心包的上游原生网络、树、调用流程、报告、SVG、Wiki 与导出。 页面新增完整理解区及 SVG / PNG 总览，按入口、输入、处理、输出与扩展组织，并有可展开的文字表格说明及文档下载。安装子项目固定环境后运行 `app/server.py`，本地端口 8769 提供真实 CLI 查询；Pages 静态站仅提供原生交互与已保存的真实查询结果，自动标明实时查询不可用。



2026-09-11，[提交 18cdac1 的 Pages 工作流](https://github.com/yydshly/0911_codex_project/actions/runs/34502181725)成功；37 个线上文件与构建一致，覆盖新站、完整输入/输出总览、原生产物与既有子站。[验证记录](../projects/009-graphify/deployment-verification.json)。


## Marketing Skills · 营销方法、技能范围与真实应用

研究 007，历史路径 `010-marketingskills/`，静态源目录 `projects/010-marketingskills/app/dist/`。50 个技能覆盖定位、内容、搜索、转化、推广、客户关系、留存与实验；宿主结合产品资料和工具执行。中文网页包含完整范围摘要、输入输出说明图、50 技能手册及五技能真实应用。页面支持任务单和反馈导出，不提供在线模型、广告投放或账户操作。

构建使用 `build-handbook.cjs` 和 `build-real-case.cjs`，并执行子项目四项检查；统一清单合并全部既有子站。已部署并验证：[在线完整展示](https://yydshly.github.io/0911_codex_project/010-marketingskills/) · [真实应用](https://yydshly.github.io/0911_codex_project/010-marketingskills/real-case.html)。

2026-09-11，[Pages 流程](https://github.com/yydshly/0911_codex_project/actions/runs/34503602382)成功，53 个线上文件均返回 200 且与构建一致，包含新站、证据下载、完整图与八个已有子站。[验证记录](../projects/010-marketingskills/deployment-verification.json)。

[范围与能力摘要](../projects/010-marketingskills/scope.md) · [项目说明](../projects/010-marketingskills/README.md)

## gstack 工程方法实验室

研究索引 011，历史路径 `012-gstack/`。静态源目录 `projects/012-gstack/app/dist/`；已追加统一清单与校验步骤，[在线网页](https://yydshly.github.io/0911_codex_project/012-gstack/)已部署并验证。

包含 57 项技能原理、九阶段收录检查器方法实践、21 项规则测试与 17 项实际浏览器检查、真实截图和修复前后报告。当前 Agent 采用固定方法并替换工具，非上游全量原生运行。原文来源与 MIT 许可随页面保存。

本地检查：`node projects/012-gstack/app/scripts/check.cjs`。该检查核对已保存测试证据和当前源文件指纹，防止发布过期结果；真实浏览器检查在源文件改变后重跑。


[范围与能力摘要](../projects/012-gstack/scope.md)：57 项独立技能覆盖需求规划、设计页面、质量排障、浏览器数据、交付、文档、记忆、保护、iOS 真机、跨模型协作、路由与安装适配；宿主结合模型和工具执行，产出方案、修改、测试与交付证据。

2026-09-11，提交 `cdccd382c43e0e16e9a7bd9cbaf3ca84909186c5` 的 [Pages 流程](https://github.com/yydshly/0911_codex_project/actions/runs/34504589047)成功。142 项线上资源核验及 5 项线上交互检查通过；覆盖新站全部静态文件、总入口、能力图和 9 个既有子站入口。新站文件对照构建，CI 报告排除运行时间，总入口归一换行；既有子站检查可访问性。[资源证据](../projects/012-gstack/deployment-verification.json) · [交互证据](../projects/012-gstack/deployment-browser.json)。
