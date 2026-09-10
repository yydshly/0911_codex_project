# 用真实技能，把当前研究变成产品方向

这是当前 Agent 在 2026-09-10 读取 Marketing Skills 固定版本原文、分析本仓库真实资料并逐步生成的应用案例。上游提交：5b2c0007766c6a1cf1d53fd8fc73e979e0821022。上游技能是 Markdown 方法，由宿主 Agent 执行。本页面交互和循环脚本为本地新增，不是上游界面或独立智能代理。

建议定位：**开源落地实验室——为正在做 AI 应用的中文开发者，将具体工程问题转成有来源、有运行证据、有验收标准的开源实践包。** 先做“陌生代码库上手实践包”，复用 Graphify 已有 FastAPI 运行证据。当前第一位可确认的使用者是仓库维护者。受众、投入与付费假设仍待确认。

## 五步真实应用

| 顺序 | 实際使用的上游技能 | 输入如何传递 | 产物 |
| --- | --- | --- | --- |
| 1 | [product-marketing 原文](upstream/product-marketing/SKILL.md) | 读取研究索引、Graphify 说明与运行记录，整理十二类背景 | [共享产品背景 0.1](.agents/product-marketing.md) |
| 2 | [offers 原文](upstream/offers/SKILL.md) | 复用背景与证据，检查价值因素及六个交付组成部分 | [交付方案](02-offer.md) |
| 3 | [copywriting 原文](upstream/copywriting/SKILL.md) | 复用定位和交付方案，为一个明确行动写文案 | [产品入口文案与备选](03-copy.md) |
| 4 | [analytics 原文](upstream/analytics/SKILL.md) | 从页面行动推导事件与任务成功口径 | [验证与度量计划](04-validation.md) |
| 5 | [marketing-loops 原文](upstream/marketing-loops/SKILL.md) | 复用指标口径、反馈输入，定义九项循环要素 | [推进循环](05-loop.md) |

这些是基于资料的真实营销文档工作，不代表客户访谈、广告投放或业务增长已发生。没有把 marketing-plan 的完整大型规划流程算作已执行。技能没有全局安装；本场景背景独立保存，不替换整个研究仓库的正式定位。使用原技能的“检查/确认”要求进行草案自检；用户尚未审阅的内容保留待确认。

## 完整用户场景

维护者收到“如何快速接手一份陌生代码”的需求 → 选择已有真实证据的 Graphify 路线 → 用户在本地入口写下问题 → 导出任务单 → 用户实际阅读并核验源代码 → 用户导出有证据的反馈 → 负责人手工核验并补入 feedback.json → 手动循环产生下一步建议 → 必要时修订产品背景版本。

本次完成“任务入口、导出、反馈格式、推进规则与空数据运行验证”，并追加[一次真实源码走查与验收](06-internal-walkthrough.md)：Agent 读取 FastAPI 固定源码，定位请求处理器内的依赖解析调用，记录函数嵌套与证据边界。它是内部自检，不计入外部反馈。外部用户执行与反馈尚未发生。页面图规模统计均来自既有 Graphify 记录，不是假装这次重新跑出的分析。

## 输入证据与出处

- [研究总索引快照](inputs/research-index.md)：10 个按上游去重的条目，事实冻结于本次拷贝时间。
- [Graphify 研究说明快照](inputs/graphify-readme.md)：运行范围、版本与限制。
- [FastAPI 原始回执快照](inputs/fastapi-receipt.json)：48 文件、747 节点、1971 关系、46 社区；237 条关系标记 INFERRED。
- [哈希清单](manifest.json)：输入、技能原文、产物与状态的 SHA-256，证明文件一致性，不证明商业结论正确。
- [MIT 许可](upstream/LICENSE)：复制五份 SKILL.md 和实际使用的三个参考文档，保留原文；未复制其全部关联参考资料。原文中的相对链接有部分未镜像，请在固定上游仓库阅读完整参考。

inputs 下的两份说明是原始文档快照，其相对链接保持源文件写法，不能作为当前快照目录的浏览入口。请通过源项目阅读完整关联资料；本案例页面只链接已经镜像的文件。

## 怎样驱动实际工作

先自用一个问题，记录一条证据，再判断是否值得邀请同类使用者。建议四周探索路线见验证计划；目前未创建日程或发送邀请。负责人补入真实反馈后，从总仓库运行：

`node projects/010-marketingskills/app/scripts/run-product-loop.cjs`

记录文件为 [feedback.json](feedback.json)；当前为空。[下一步建议](next-actions.md)、[持久状态](.agents/loops/product-validation.json)、[追加日志](.agents/loops/product-validation.log) 可复核首次建立基线及复查结果。网页下载的 JSON 是单条记录，需要手动追加到 records 数组；不要直接覆盖整个文件。收录反馈后重新构建 real-case，将新状态同步到静态展示。

## 当前验收边界

代码检查覆盖五步切换、三条任务路线、用户输入转义、下载与反馈行为、空输入、循环首次基线、去重、停止与错误不改状态。只做离线程序检查与 HTTP 可达性检查，尚未做浏览器视觉验收。网页没有账户连接、上传、自动模型调用、付款或公开发布。
