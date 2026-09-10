# 006 · Graphify

> **从代码和资料中提取实体与关系，建立可查询、可分析、可交付的知识图谱。** 本项目实际运行固定版本上游，完整展示 FastAPI 核心包的原生输出。

[返回总索引](../../README.md#项目索引) · [能力与原生演示](app/dist/index.html) · [研究笔记](notes.md) · [完整图](app/dist/native/fastapi/graph.json) · [生成凭证](app/dist/native/fastapi/receipt.json)

## 原库能力与技术原理

代码通过 tree-sitter / AST 提取类、函数、导入、调用与继承；资料可经助手或模型抽取实体和语义关系。上游合并、去重，构建 NetworkX 图，再进行社区发现、核心节点与跨模块联系分析。查询返回带来源的相关子图，也支持节点解释、有向路径、潜在修改影响与 MCP 工具访问。

可视化只是输出之一，还能生成树形结构、调用流程、报告、Wiki、Obsidian 笔记、SVG、GraphML、Cypher、Canvas 与 JSON。适用于陌生项目阅读、重构依赖检查、资料关联和为 Agent 提供上下文。静态关系不是运行时轨迹，推断也不是已确认的业务事实。

## 本次真实演示

分析输入为 FastAPI `fastapi/` 核心包的 **全部 48 个 Python 文件**，没有扫描测试、教程或外部依赖实现。原生网络保留全部 **747 个节点、1,971 条关系、46 个社区**；1,734 条标为 EXTRACTED，237 条标为 INFERRED。模型输入、输出均为 0 token；本次社区分析使用 Louvain 回退。

![Graphify 原生导出的 FastAPI 矢量网络图](assets/native-fastapi.svg)

这是本次实际生成的原生 SVG，非浏览器截图。[配图说明](assets/README.md)。

| 已执行能力 | 可核对的结果 |
| --- | --- |
| 原生交互网络 | [graph.html](app/dist/native/fastapi/graph.html)，全部节点和关系；另存[未改动上游 HTML](app/dist/native/fastapi/graph.upstream.html) |
| 原生层级与调用流程 | [层级树](app/dist/native/fastapi/tree.html)、[调用流程](app/dist/native/fastapi/callflow.html)；树按有来源的文件/符号组织，不等同网络节点一一映射 |
| 图分析与文档 | [报告](app/dist/native/fastapi/report.html)、[原始 Markdown](app/dist/native/fastapi/GRAPH_REPORT.md)、[Wiki](app/dist/native/fastapi/wiki/index.html)；HTML 仅增加阅读排版 |
| Query / Explain / Path / Affected | [完整查询记录](app/dist/native/fastapi/queries.json)；本地服务可输入新问题实际调用上游 CLI |
| MCP | [标准协议实测记录](app/dist/native/fastapi/integration.html)，完成初始化、工具枚举及 graph_stats / query_graph 调用 |
| 增量更新 | 同一记录中保留隔离五文件样例更新前后图；18 → 19 节点、40 → 42 关系，新增函数及调用边，原节点保留 |
| 完整导出 | 演示页提供 SVG、GraphML、Cypher、Obsidian Vault、Canvas、JSON、源文件 ZIP 和哈希清单 |

“全量”指所选 48 文件范围的全部建图结果与上述导出，不代表整个 FastAPI 仓库，也不代表上游所有集成都已执行。网络图不抽样、不聚合；原生各视图根据用途组织内容。Query 保留原生相关子图算法，预算设为 100000；Explain 原生最多详细列出 20 个连接，其余按类型汇总；Affected 默认两跳。完整关系以图谱和 JSON 为准。

文档/PDF/图片/音视频语义提取、数据库连接、跨项目全局图、Git hooks、PR 工作流、记忆复盘和 Agent 长期收益尚未实测，页面逐项标注。仅生成 Cypher，没有执行数据库写入。

## 为什么现在与 README 更一致

主演示直接使用上游 `graph.html`、树和调用流程导出器，保持其界面与交互；只将脚本依赖改成本地固定版本。README 截图与本次的输入版本、范围和力导布局可能不同，因此不应要求节点位置完全相同。

旧版五文件中文教学页面保留为[辅助教学样例](app/dist/tutorial.html)，不再代表原生效果。它的数据真实，但布局与路径交互是本地新增。

Archify 的核心是接收用户或 Agent 整理的 JSON 设计规格并画架构/流程图；Graphify 负责从资料提取关系并建图。两者可通过“提取证据 → Agent 整理 → 绘制设计图”组合，尚未接通。

## 版本与许可证

| 项目 | 固定研究输入 |
| --- | --- |
| 研究索引 / 目录 | 006 / `009-graphify` |
| 上游 | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)，v0.9.57 |
| 上游提交 | `3f82bf7f837a07fb0f7668fbdbd5662801906942`，2026-09-09 |
| FastAPI 输入 | [fastapi/fastapi](https://github.com/fastapi/fastapi/tree/50113da16fec53b66b80d75e80a89296de4fa5a5/fastapi)，提交 `50113da16fec53b66b80d75e80a89296de4fa5a5` |
| Graphify 许可证 | [Apache-2.0](upstream-licenses/LICENSE)、[历史 MIT](upstream-licenses/LICENSE-MIT)、[NOTICE](upstream-licenses/NOTICE) |
| 输入与查看器许可证 | [FastAPI MIT](app/dist/native/fastapi/LICENSE-FastAPI)；[查看器版本和校验清单](app/dist/native/vendor/manifest.json)，许可证随文件保留 |
| 发布状态 | 本地真实服务可运行；已加入 Pages 合并清单，未部署 |

## 运行与复现

在本项目目录建立 Python 3.12 环境，安装固定锁文件：

```powershell
uv venv .venv --python 3.12
uv pip install --python .venv/Scripts/python.exe -r app/requirements-native.lock
.venv/Scripts/python.exe app/server.py --port 8769
```

打开 <http://127.0.0.1:8769/>，原生查看器和实际 CLI 查询均可使用。只需要浏览已生成产物时，可用普通静态服务器；Pages 上保留原生交互和真实查询记录，实时查询按钮会说明需本地服务。

重新生成需准备 FastAPI 仓库并检出表中固定提交，再执行：

```powershell
.venv/Scripts/python.exe app/generate_native.py --source <FastAPI仓库路径>
.venv/Scripts/python.exe app/verify_integrations.py
node app/check-native.cjs
node app/check.cjs
```

生成脚本验证 FastAPI 提交，运行提取、所有导出与查询；MCP 和增量验证在临时目录执行。锁文件记录 Windows / Python 3.12 环境，其他平台需调整平台专用依赖并验证。旧教学样例可通过 `app/generate.py` 复现。

检查覆盖网络与 JSON 全量一致、来源哈希、依赖完整性、脚本语法、导出文件及真实集成记录；教学样例另有路径和影响分析对照。根目录 `node scripts/build-pages.cjs` 合并站点。尚未进行浏览器交互和截图验收。

## 对我们的意义与扩展

可先用于本研究仓库的源码导航和重构检查，再关联已精读文章中的问题、约束、方案与证据。面向持续执行任务，可把相关实现和约束作为 Agent 上下文，但节省成本与提高成功率需独立评测。

本地值得扩展的是中文术语统一、结论过期提醒、代码与测试/业务需求关联，以及用编译器或运行时证据校验静态关系。上游已有的增量更新、全局图和 MCP 应直接集成，不重复计为原创能力。
