# oh-my-pi 研究笔记

[返回项目介绍](README.md) · [模块引导图](assets/guide.png) · [Mermaid 源文件](assets/guide.mmd)

## 研究问题与结论

本次主要解决“它究竟是什么”及“哪些内部能力值得研究”两个问题。

**结论：oh-my-pi 是基于 Pi 二次开发、类似 Codex CLI 的 AI 编程 Agent 工具。它依赖接入的大模型完成分析与生成，并完善代理的工具、执行环境、反馈及协作能力。**

需要同时区分三种关系：

1. **代码来源**：上游明确标注 Fork of Pi，基础项目为 `badlogic/pi-mono`。
2. **产品类别**：类似 Codex CLI，能够接收任务并实际操作项目；这是类别类比，不是源码继承或功能等价关系。
3. **能力来源**：模型提供理解和推理，代理软件提供上下文组织、工具调用与连续执行，开发环境提供语言服务、调试及测试支持。

研究价值集中在“如何让已有模型有效使用工具和反馈”，而非训练新模型。工具和流程可能改善实际效果，但收益必须由对照实验验证。

## 版本与证据范围

| 字段 | 记录 |
| :--- | :--- |
| 研究日期 | 2026-09-10 |
| 上游提交 | `d884057f09c50ad096ccd4ca16cec79602e9879c` |
| 上游提交时间 | 2026-09-10T11:16:22Z；以提交页为准 |
| 本地研究环境 | Windows / PowerShell；仅文档整理、远程源码查阅和图形渲染 |
| 上游运行环境 | 未安装、未配置模型、未执行上游任务 |
| 许可证 | MIT；包含 Mario Zechner、Can Bölük、Stencil Labs, Inc. 的版权声明 |
| 实证边界 | 确认文档及部分源码结构；未验证任务成功率、性能、成本或平台兼容性 |

上游持续变化，以下核心证据均固定提交。外部产品文档按研究日期理解，不推断订阅、权限或效果相同。

## 核心执行流程

用户提出需求后，OMP 组织上下文并调用模型；模型返回文本或工具调用；OMP 执行工具，记录并反馈结果，再决定是否继续下一轮。核心循环还处理用户中途指令、后续消息和停止条件。

源码入口：[agent-loop.ts](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/packages/agent/src/agent-loop.ts)。本次查阅了 `agentLoop`、`runLoopBody`、`executeToolCalls` 及处理工具调用和后续消息的循环；不是对整个实现的完整审计。

例如，修复登录错误时，可能依次搜索登录代码、检查调用关系、运行测试、定位运行时变量、修改文件并再次检查。这是能力组合示例，本次没有实际执行该案例。

## 内部模块与证据

### 1. 搜索与代码编辑

- 原生搜索层提供文件遍历、正则匹配、路径过滤和结果整理；部分路径使用 Rust 正则引擎，并在需要时使用 PCRE2。
- 当前 Hashline 协议以文件快照标签与原始行号描述替换、插入、剪切或移动操作，并约束对未展示区域的修改。
- `tree-sitter` / `ast-grep` 支撑语法树查询与结构化改写。语法匹配与 LSP 提供的跨文件符号、类型信息作用不同。
- 研究重点：修改定位、过期快照、重试策略、预览与最终写入的一致性；补丁成功应用不等于逻辑正确。

证据：[搜索管线](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/natives-text-search-pipeline.md)、[Hashline 协议](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/crates/pi-edit/prompts/hashline.md)、[编辑入口](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/packages/coding-agent/src/edit/index.ts)、[AST 查询](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/tools/ast-grep.md)、[AST 改写](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/tools/ast-edit.md)。

### 2. LSP 语言服务与 DAP 调试

- LSP 获取定义、引用、类型、诊断和代码操作，也可执行重命名。内置配置包含 TypeScript Language Server、rust-analyzer、gopls、pyright 等。
- DAP 驱动断点、单步、调用栈和变量检查；内置适配器配置包含 debugpy、lldb-dap、Delve 等。
- 两者分别向模型提供代码语义和运行状态；需要可用的语言服务器、调试适配器及项目环境。
- 研究重点：模型何时使用这些证据，结果如何组织，以及是否能减少错误修改。

证据：[LSP 工具](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/tools/lsp.md)、[语言服务配置](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/packages/coding-agent/src/lsp/defaults.json)、[调试工具](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/tools/debug.md)、[调试适配器配置](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/packages/coding-agent/src/dap/defaults.json)。

### 3. 执行环境与原生能力

- TypeScript / Bun 负责上层编排；Rust 通过 Node-API 暴露搜索、AST、Shell、进程等能力。
- 基于 brush 的持久化 Shell 与内置命令支持执行任务；持久化 Python 内核和 Bun JavaScript Worker 支持跨次调用保留状态。
- Eval 可回调代理工具，并处理流式输出、超时、取消、后台执行和大输出存档。
- 研究重点：连续执行的状态和失败反馈，哪些场景真正受益于原生实现；解释器或 API 隔离不等于完整安全沙箱。

证据：[原生架构](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/natives-architecture.md)、[Rust 模块](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/native-crates.md)、[Eval](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/tools/eval.md)。

### 4. 多代理与任务管理

- 子任务可指定代理类型和输出结构，运行受并发、递归和策略限制。
- 工作区隔离是可选项；可交付补丁或分支结果，但不保证没有合并冲突。
- 结构化输出存在宽松与严格模式，不能把结构化数据当作正确性证明。
- 研究重点：背景传递、交付格式、失败与取消后的清理，以及相对单代理的额外成本。

证据：[任务工具](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/tools/task.md)、[代理发现与执行约束](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/task-agent-discovery.md)。

### 5. 会话、记忆与过程审查

- 历史压缩延续当前长任务；项目记忆把经验带入后续会话。记忆默认关闭，后端包括本地摘要、Mnemopi SQLite 和 Hindsight 等。
- Advisor 用额外模型检查进展并反馈建议，不能替代程序测试或操作审批。
- 研究重点：压缩是否保留约束与未完成事项，记忆能否追溯和纠错，审查是否产生有效发现而非重复干扰。

证据：[压缩](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/compaction.md)、[记忆](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/memory.md)、[Advisor](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/advisor-watchdog.md)。

### 6. 模型、工具和应用接入

- 模型层处理供应商差异、配置、发现及角色选择；模型由外部服务或本地环境提供。
- MCP 管理外部工具的发现、连接、注册和重连；扩展模块可注册工具、命令及生命周期处理。
- 浏览器能力可通过 Eval 接口检查页面和交互；SDK / RPC 可将代理嵌入自己的应用。
- 研究重点：将已有研究模板和验收规则接入，而不是一次性重建全部外围功能。

证据：[模型配置](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/models.md)、[MCP 生命周期](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/mcp-runtime-lifecycle.md)、[扩展](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/extensions.md)、[浏览器](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/tools/browser.md)、[SDK](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/sdk.md)。

## 适用场景与条件

适合评估的场景包括陌生仓库分析、跨文件重构、运行时故障定位、批量项目维护和定制研究助手。这些是依据能力推导的方向，并非本次运行验证成果。

使用前需提供模型、项目依赖和运行环境。语言服务和调试器各有前提；部分工具、记忆或审查功能需启用。当前审批文档中的默认模式为 `yolo`；工具审批不等于文件系统或进程隔离，用于共享服务时应单独设计边界。[审批机制](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/docs/approval-mode.md)

## 本次观察到的文档差异

固定提交的 `docs/tools/edit.md` 仍列出 `packages/hashline/` 及 `packages/coding-agent/src/edit/hashline/execute.ts` 等入口，其中后者在核查时不存在；当前 Hashline 协议与实现可在 `crates/pi-edit/` 查阅。包级 README 的记忆后端描述也少于 `docs/memory.md`。因此将文档作为导航，并在具体机制研究中核对源码；不根据旧路径推断当前实现。

## 对我们的意义与可扩展方向

1. 学习可复用的代理工程：模型循环、工具接口、上下文组织及验证反馈。
2. 建立固定任务评测：比较模型、编辑方式、单代理与多代理的质量和成本。
3. 通过扩展沉淀本仓库流程：记录原库与提交、分析模块、执行复现、保存证据、生成中文笔记并同步索引。
4. 按需增加可追溯记忆、任务可视化和团队执行管理。

第 3、4 项属于我们的候选新增能力。目前没有实现研究助手、运行平台或 Web 演示。

## 下一步实验

| 顺序 | 实验 | 评价依据 |
| :--- | :--- | :--- |
| 1 | 固定一个小项目，跟踪读代码、修改、检查和反馈 | 调用链清晰，结论有代码与执行证据 |
| 2 | 同模型、同任务比较文本替换、补丁与 Hashline | 首次应用成功率、重试次数、输出量、测试通过情况 |
| 3 | 用可复现错误比较是否接入 LSP / DAP | 定位正确性、修改质量、耗时与人工介入 |
| 4 | 同任务比较单代理与多代理 | 完成质量、运行时间、模型费用、整合成本 |
| 5 | 验证压缩和记忆是否保留约束 | 未完成事项、禁改范围及证据来源是否保留 |

上述实验均未执行。先研究主执行链，再决定是否引入更多模块。

## 2026-09-10 · 整理记录

- 从功能列表收敛到明确定位：Pi 二次开发、Codex CLI 同类工具、基于现有模型能力。
- 核对 Fork 声明、许可证、核心循环、模块文档和部分源码配置。
- 按用户确认的图保留节点、文字和关系，生成 GitHub 可直接显示的引导图。
- 本地只新增研究资料与图形，不引入上游程序源码，不宣称已安装或已部署。

基础证据：[固定版本 README](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/README.md)、[研究提交](https://github.com/can1357/oh-my-pi/commit/d884057f09c50ad096ccd4ca16cec79602e9879c)、[MIT 原文](https://github.com/can1357/oh-my-pi/blob/d884057f09c50ad096ccd4ca16cec79602e9879c/LICENSE)、[Codex CLI 官方产品说明](https://learn.chatgpt.com/docs/codex/cli)。
