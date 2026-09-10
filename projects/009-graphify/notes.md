# Graphify 研究笔记

[返回介绍](README.md) · [上游真实查询输出](app/dist/evidence.json)

## 能力与原理

Graphify 将文件转为带来源的关系索引，帮助定位相关上下文。固定版本 v0.9.57，提交 `3f82bf7f837a07fb0f7668fbdbd5662801906942`。

| 阶段 | 上游模块与机制 | 本次结果 |
| --- | --- | --- |
| 代码提取 | extract.py：tree-sitter AST 与跨文件符号解析 | 调用、导入、包含和部分说明节点 |
| 建图 | build.py：去重、属性规范化、NetworkX | directed=True，保留关系方向 |
| 聚类 | cluster.py：Leiden，缺少可选包时回退 Louvain | 本次 Louvain，4 个社区 |
| 查询 | serve.py：关键词匹配、起始节点选择、图遍历、预算输出 | 查询 create_order，保存实际结果 |
| 路径 | serve.py：默认有向最短路径 | checkout 到 get_product 为 3 跳 |
| 影响 | affected.py：按关系反向遍历 | get_product 四跳内 9 个依赖节点 |
| 文档与媒体 | llm.py 等：内容提取与模型语义抽取 | 源码分析，未执行 |

“确定性解析”不等于静态分析完全正确。动态调用、反射、依赖注入可能漏连。EXTRACTED/INFERRED/AMBIGUOUS 区分抽取与推断状态，不是校准的正确率。查询返回图上下文，完整自然语言解释通常由宿主助手完成。

## 首轮教学样例记录

2026-09-10，在 Windows / Python 3.12.13 独立临时环境安装固定提交。依赖见 [锁文件](app/requirements.lock)。未运行安装技能，未修改宿主 Agent 配置。

输入是 [sample](sample/) 中五个原创 Python 文件：接口、订单、权限、计价、库存。通过 [generate.py](app/generate.py) 调用上游提取、建图、聚类、导出及查询函数，临时缓存随运行清理。

实际输出为 18 节点、40 关系、4 社区，40 条边都是 EXTRACTED，模型输入输出均为 0 token。结果记录在 [verification.json](verification.json)、[graph.json](app/dist/graph.json) 和 [evidence.json](app/dist/evidence.json)。不手工编造关系边。

## 首轮本地展示与验证

上游负责数据和查询证据；本地新增中文导览、按模块排布、筛选、高亮与源码面板。默认仅查看调用关系；全部关系模式含文件导入与包含关系，路径不能一律称为调用链。修改影响最多四跳。

[oracle.json](app/oracle.json) 的参照结果由 NetworkX 最短路径和上游 affected_nodes 生成。[check.cjs](app/check.cjs) 对全部节点与两种关系范围进行 648 组路径、36 组影响结果对照，并检查源文件 SHA-256、展示源码、端点和资源。浏览器词法搜索使用本地中文说明，不是已验证的中文语义检索。未执行浏览器视觉验收。

## 使用场景与我们的意义

- 陌生代码库：先定位关系和入口，再核对实现。
- 重构：辅助确定检查范围，不能代替测试验收。
- 工程案例库：从六篇已有完整总结连接问题、约束、方案、代价、证据，不能从标题补造事实。
- 长期任务：Agent 执行前查询相关代码与设计依据，执行后更新图；与 LongHorizon 的组合待实测。

## 扩展方向

1. 中文与英文术语统一，改进中文提问到代码符号的匹配。
2. 将结论关联原库提交及证据位置，生成上游变化后的待复核清单。
3. 连接测试、业务流程与责任模块，建议需要验证的范围。
4. 接入完整编译器索引及运行时证据；上游 SCIP 文件明确是简化 JSON 骨架，尚非完整标准实现。
5. 实验语义检索定位入口、图遍历扩展证据的组合。

上游已有全局图、增量更新、MCP 和多模型后端，不能算本地原创。社区由连接结构发现，不直接等于业务子系统。

## 局限与待验证事项

首轮只复现小型 Python 代码结构，没有真实认证、支付、持久化或事务。后续已补充 FastAPI 核心包与 MCP 实测，见下文；多模态、大规模性能基准、中文语义检索和 Agent 成本收益仍待验证。

作者 BENCHMARKS.md 的代码问答部分仅 6 个问题；部分记忆实验使用混合检索，不能将其成绩直接当作普通 CLI 查询收益。后续应使用真实任务与人工答案对照准确率、证据覆盖、耗时和 token 成本。

## 固定来源

以下为实际分析的固定提交：

- [README](https://github.com/Graphify-Labs/graphify/blob/3f82bf7f837a07fb0f7668fbdbd5662801906942/README.md)
- [extract.py](https://github.com/Graphify-Labs/graphify/blob/3f82bf7f837a07fb0f7668fbdbd5662801906942/graphify/extract.py)
- [serve.py](https://github.com/Graphify-Labs/graphify/blob/3f82bf7f837a07fb0f7668fbdbd5662801906942/graphify/serve.py)
- [affected.py](https://github.com/Graphify-Labs/graphify/blob/3f82bf7f837a07fb0f7668fbdbd5662801906942/graphify/affected.py)
- [global_graph.py](https://github.com/Graphify-Labs/graphify/blob/3f82bf7f837a07fb0f7668fbdbd5662801906942/graphify/global_graph.py)
- [scip_ingest.py](https://github.com/Graphify-Labs/graphify/blob/3f82bf7f837a07fb0f7668fbdbd5662801906942/graphify/scip_ingest.py)
- [BENCHMARKS.md](https://github.com/Graphify-Labs/graphify/blob/3f82bf7f837a07fb0f7668fbdbd5662801906942/BENCHMARKS.md)


## 原生完整演示补充（2026-09-10）

首轮页面的真实数据被本地教学界面重新排布，未能展示上游 README 中的原生效果。主演示现改为固定版本 Graphify 自身导出器，中文页只负责能力说明、产物导航和本地 CLI 入口。旧页面留在 [tutorial.html](app/dist/tutorial.html)，明确为辅助教学。

输入为 FastAPI 提交 `50113da16fec53b66b80d75e80a89296de4fa5a5` 的 `fastapi/` 核心包全部 48 个 Python 文件。实际输出 747 节点、1,971 关系和 46 个 Louvain 社区，1,734 条 EXTRACTED、237 条 INFERRED，0 模型 token，提取失败文件为 0。[生成凭证](app/dist/native/fastapi/receipt.json)与[源文件哈希](app/dist/native/fastapi/sources.json)随产物保留。

- 网络 HTML 使用原生 vis-network；747 节点和 1,971 边与原始 JSON 逐项相符，无抽样或社区聚合。原版 HTML 另存；服务版本只改本地依赖 URL。
- 原生树用 D3，调用流程用 Mermaid；子节点/图形规模上限高于或等于当前数据量。树按源码归属组织，外部无来源实体不会与网络一一对应；调用流程按上游规则组织章节，也不等于全图每条边都是调用。
- 原生报告与 Wiki 的 Markdown 正文未改写；HTML 增加阅读排版。SVG、GraphML、Cypher、Obsidian Vault、Canvas 和完整输入 ZIP 均实际生成。
- CLI 的 Query、Explain、Path、Affected 均实际执行。本地服务可输入新查询；静态发布只回放真实结果，并明确标明。Query 预算 100000，Explain 保留原生 20 连接详情上限，Affected 默认两跳。不能把任何一次查询当作全图。
- MCP 标准客户端实际完成初始化、工具枚举、graph_stats 和 query_graph。未执行 PR 工具或证明 Agent 任务收益。
- 增量实验复制五文件样例后新增 audit_order()，真实执行 extract / update：18 → 19 节点、40 → 42 关系；原有节点保留，新调用边存在，另 4 文件未变。未开启常驻监控。

[集成证据](app/dist/native/fastapi/integration.json)与前后图可下载。依赖记录见 [requirements-native.lock](app/requirements-native.lock)。图谱的46社区是结构算法输出，不应命名为46个经人工确认的业务模块。

校验通过：原生 HTML 全量节点/边一致、查看器依赖 SHA-256、原生内联脚本语法、48 个 ZIP 输入文件哈希、SVG/GraphML XML 解析、11 个本地资源地址、四类实时 CLI 请求及四类非法请求拒绝。教学页的648组路径和36组影响对照仍通过；Pages 合并构建通过。尚未进行浏览器交互或截图验收。

与先前研究的 Archify 相似的是最终都有图。Graphify 从代码/资料提取实体关系，Archify 从用户或 Agent 给出的结构化设计规格渲染图。两者的输入、责任和证据来源不同；将 Graphify 证据经 Agent 整理给 Archify 绘图，是可尝试的组合，尚未实现。

上游多模态语义提取、数据库连接、全局图、Git hooks、PR、记忆复盘仍需要相应输入或工作流专项验证。页面展示完整能力清单，并将“本次已运行”和“上游支持但未实测”区分，避免把未执行的链路写成真实效果。


## 输入、处理、输出与应用理解补充（2026-09-11）

已整理为 [完整理解文档](understanding.md)，并同步 [网页图文入口](app/dist/index.html#understanding)。[总览 SVG](assets/understanding-map.svg) / [PNG](assets/understanding-map.png)覆盖五段链路：使用入口、输入与接入、抽取建图和维护、输出与接口、使用意义与扩展。它是本地原创能力图，非上游截图，不替代已有真实图谱。

关键澄清：原始资料不必先整理成节点与关系表；代码用本地解析，文档/媒体的语义抽取需要模型及适用组件。生成的数据是从资料抽取和推导的知识结构，普通查询以文字匹配定位和图遍历为主。SQL 能力主要读取现有结构；实体/关系/来源表可通过 JSON 增加转换规则，自动业务建表与通用数据清洗不是本次已有实现。

应用方向为研究证据追溯、工程案例关联、需求/代码/测试一致性、重构检查、Agent 上下文和图谱二次交付。Graphify 提取证据后交由 Agent 核对，再给 Archify 画设计图，是尚未接通的组合。输入与输出能力清单源于固定版本，应用价值属于我们的判断；多模态、数据库与长期收益仍需专项验证。


## 首次公开部署（2026-09-11）

[在线能力与原生演示](https://yydshly.github.io/0911_codex_project/009-graphify/)已上线。Pages 提交 `18cdac156fb85d1b5e8e89e8a75b08c445ec3e9c` 成功，37 个线上文件与构建逐一核对，包含已有子站，见[验证证据](deployment-verification.json)。公开页保留完整原生查看器及真实查询记录；实时 CLI 仅在本地服务执行。
