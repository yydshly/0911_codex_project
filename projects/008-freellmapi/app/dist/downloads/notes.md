# 研究记录与来源

[返回项目介绍](README.md) · [我们的理解](understanding.md) · [能力与场景](capabilities.md) · [架构详解](architecture.md) · [同类产品](comparison.md)

## 版本与证据边界

| 项目 | 记录 |
| --- | --- |
| 上游 | `tashfeenahmed/freellmapi` |
| 固定提交 | `83562ad360a65d80b6319297fee4cd47dc5a2ff3` |
| 提交时间 | 2026-09-07T11:13:21+01:00 |
| 研究日期 | 2026-09-10 |
| 分析环境 | Windows；通过临时研究副本只读检查源码，未启动网关 |
| 上游环境要求 | 根 package.json：Node.js >=20.18.0 且 <25.0.0，npm >=10 |
| 关键组件 | Express 5、TypeScript 5、SQLite（better-sqlite3）、React / Vite；Electron 桌面封装 |
| 包版本注意 | server/package.json 为 0.2.1，desktop/package.json 为 0.9.8；不将某个子包版本当作整个项目的统一版本 |
| 许可证 | MIT；原文见来源 S10 |

**源码核对**表示确认存在相应实现与控制流程，不能替代运行测试。目录规模、额度及客户端兼容性等作者声明需要结合账户、网络、实际端点继续验证。

## 2026-09-10 · 能力与架构整理

- 阅读 README、架构总览、路由评分、额度账本、流式处理、故障恢复和目录同步说明。
- 核对 `app.ts` 的路由挂载，`index.ts` 的数据库初始化与后台调度，`scoring.ts` 的评分方式，`router.ts` 的路线选择。
- 核对 `fallback-loop.ts` 的失败处理、`fusion.ts` 的融合路径、`crypto.ts` 的密钥加密算法。
- 从项目模板新建研究目录，新增能力说明、架构详解与原创架构图，关联已有 Agent 研究。
- 未安装上游依赖，未执行上游测试，未进行真实 API 调用，当时未发布网页演示。

### 初版文档验证结果

- 本目录及两个索引中的 104 个相对文件链接检查通过；本项目使用的 Markdown 锚点检查通过。
- 29 个固定版本上游引用与研究副本的真实文件或目录对应，版本一致。
- 总索引条目、预览顺序、数量及已登记研究索引的唯一性检查通过；本目录未残留模板占位内容。
- PNG（1600 × 1120）可读取，SVG XML 可解析；已人工查看架构图并修正文字与边框间距。
- `git diff --check` 通过。以上仅为文档与图片验证，不代表上游功能或性能实测。

## 2026-09-10 · 同类产品与网页展示

- 新增 `understanding.md`，归纳对外统一模型接口、对内路由与适配，以及应用 / 网关 / 模型三方职责。
- 新增 `comparison.md`，基于已查阅的官方文档比较 LiteLLM、New API、Portkey、Bifrost、OpenRouter 和 Cloudflare AI Gateway；版本差异和建议单独标注。
- 本地新增静态教学网页，包含正常返回、主路线限流、全部不可用、输出后中断四种固定场景；没有真实模型请求。
- 阅读页及首页对比表从 Markdown 自动生成，保留可下载文档和内容哈希以检查同步。
- 已合并 GitHub Pages 发布清单与检查步骤，保留其他项目。当前没有 Sites 发布工具；当时未创建 Sites 项目，也未公开部署。
- 验证覆盖本地资源与锚点、JavaScript 语法、四种场景状态、文档同步、页面入口的本地 HTTP 响应及统一站点打包。未执行浏览器截图或浏览器交互测试。

## 2026-09-10 · 模型网关定位与正式发布

- 统一根摘要、项目介绍与网页首屏：FreeLLMAPI 是一个自托管模型网关，负责统一接入、选路、协议适配和额度／失败管理。
- 主引导图沿用讨论中的 Mermaid 图，保留应用、网关、实际模型、失败回退与状态反馈关系；PNG 和 SVG 已检查。
- 补充未来自研网关的取舍：确定用户与首要问题，选择主参考，再按场景补充能力；不以所有产品的功能并集作为首版目标。
- 已通过仓库统一 GitHub Pages 工作流发布：[在线理解展示](https://yydshly.github.io/0911_codex_project/008-freellmapi/)；首次发布提交 `76b886f986a20c3ff6e6ebc703a70069687fdf20`，[Actions 成功记录](https://github.com/yydshly/0911_codex_project/actions/runs/34498793268)。
- 线上核对 29 个文件：7 个网页、全部图文与下载资源、总入口及既有五个子站均返回 200；文本按 LF 归一后比较，图片按原始字节比较，内容与发布构建一致。[部署证据](deployment-verification.json)记录文件哈希。
- 发布状态与正式地址写回后，检查通过 7 页、124 个 HTML 本地引用、6 篇文档同步、4 种固定场景及两个索引顺序与数量；未执行浏览器交互测试，上游模型服务仍未启动。

## 需要谨慎解读的上游描述

1. README 的目录端点和月度额度属于作者公布的目录统计，不代表我们的可用资源，更不代表单一模型的独占额度。
2. README 与架构文档关于前沿模型可得性的描述存在差异；本文不将具体免费模型或额度当成稳定承诺。
3. “智能路由”的可靠性来自调用表现，能力等级来自目录元数据，不是我们的任务正确率。
4. `fusion` 的 `best_of` 在所读源码中按答案长度选择，不能直接解释为质量最优。
5. 流式响应已经发送有效内容后失败，不能再隐式换模型拼接答案。
6. 目录同步的“每天检查两次”与“免费目录约滞后 30 天”是不同维度：前者是拉取频率，后者是可获取内容的新鲜度。

## 后续复现方案（尚未执行）

在独立上游检出目录进行，避免把依赖引入研究总仓库。根据 S1 与 S8：

```powershell
git clone https://github.com/tashfeenahmed/freellmapi.git freellmapi-upstream
Set-Location freellmapi-upstream
git checkout 83562ad360a65d80b6319297fee4cd47dc5a2ff3
npm ci
npm test
npm run build
```

后续按固定版本安装文档配置环境与密钥后启动开发服务。使用非敏感样本，至少验证以下场景，并记录实际供应商、模型、版本、配置、时间和结果。

| 验证项 | 验收依据 |
| --- | --- |
| 普通与流式问答 | 返回格式正确，实际路线可追溯；验证中途断流的客户端行为 |
| 工具与结构化输出 | 参数通过模式校验，工具结果能在后续轮次正确使用 |
| 限流与故障恢复 | 用模拟供应商注入 429、5xx 和超时，检查冷却、重试预算与最终错误；不靠冲击真实免费额度制造故障 |
| 会话与模型切换 | 关键事实、工具结果和未完成事项保持一致；记录偏差 |
| 固定模型 / 自动路由 / 角色配置 | 对同一组任务比较验收通过率、耗时、重试、人工返工和总成本 |
| 本地 / 云模型混用 | 验证自定义端点、上下文上限及数据实际流向 |

文档维护时检查：相对链接与图片存在、研究索引唯一且有序、模板占位清除、根首页状态与本项目一致。未部署时不添加在线演示地址。

## 固定版本来源

以下引用均属于同一研究提交。

| 编号 | 来源 | 支撑内容 |
| --- | --- | --- |
| S1 | [README](https://github.com/tashfeenahmed/freellmapi/blob/83562ad360a65d80b6319297fee4cd47dc5a2ff3/README.md) | 产品能力、目录声明、个人实验定位 |
| S2 | [架构总览](https://github.com/tashfeenahmed/freellmapi/blob/83562ad360a65d80b6319297fee4cd47dc5a2ff3/docs/en/architecture/00-high-level-index.md) | 技术栈、支持范围与限制 |
| S3 | [路由与评分](https://github.com/tashfeenahmed/freellmapi/blob/83562ad360a65d80b6319297fee4cd47dc5a2ff3/docs/en/architecture/01-routing-and-bandit-scoring.md) | 模型链、Thompson Sampling、会话与分组 |
| S4 | [额度与冷却](https://github.com/tashfeenahmed/freellmapi/blob/83562ad360a65d80b6319297fee4cd47dc5a2ff3/docs/en/architecture/02-quota-and-cooldown-engine.md) | RPM / RPD / TPM / TPD、占用预留、冷却 |
| S5 | [流式管线](https://github.com/tashfeenahmed/freellmapi/blob/83562ad360a65d80b6319297fee4cd47dc5a2ff3/docs/en/architecture/03-streaming-pipeline.md) | 协议转换、工具调用修复、断流边界 |
| S6 | [降级与故障切换](https://github.com/tashfeenahmed/freellmapi/blob/83562ad360a65d80b6319297fee4cd47dc5a2ff3/docs/en/architecture/04-degraded-mode-and-failover.md) | 重试预算、错误轨迹与幂等限制 |
| S7 | [目录同步](https://github.com/tashfeenahmed/freellmapi/blob/83562ad360a65d80b6319297fee4cd47dc5a2ff3/docs/en/architecture/05-catalog-sync.md) | Ed25519、快照、事务更新与覆盖规则 |
| S8 | [安装说明](https://github.com/tashfeenahmed/freellmapi/blob/83562ad360a65d80b6319297fee4cd47dc5a2ff3/docs/en/install/01-install.md) | 源码、容器与桌面部署方式 |
| S9 | [根 package.json](https://github.com/tashfeenahmed/freellmapi/blob/83562ad360a65d80b6319297fee4cd47dc5a2ff3/package.json) | 工作区、运行要求与测试命令 |
| S10 | [LICENSE](https://github.com/tashfeenahmed/freellmapi/blob/83562ad360a65d80b6319297fee4cd47dc5a2ff3/LICENSE) | MIT 许可与版权信息 |

具体实现入口见[架构模块表](architecture.md#模块与源码入口)。
