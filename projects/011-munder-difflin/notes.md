# 能力与对比整理记录

[返回能力概览](README.md)

## 2026-09-10 · 本次结论

用户最新决定：暂不归档，补充一张图完整展示能力、交互机制、同类差异、意义和按需扩展方向。当前状态为研究中，能力与总览图已整理；后期出现实际需求再深入，不设置自动跟进或待执行安装任务。

已核对上游说明、架构、协作路由、引擎适配、记忆、运行保护和唤醒的部分源码。没有运行上游 Agent 任务；不宣称可靠性、效率、成本或兼容性经过实测。

## 单图交付

[总览图 PNG](assets/overview.png) 与 [SVG](assets/overview.svg) 由同一[内容源](build_overview.py)生成。覆盖职责链、八组能力、文件投递和空闲唤醒流程、六项工具对比、场景与扩展，以及版本和验证边界。

核心差异表述为“多个真实 CLI、本机桌面管理、文件式协作与团队记忆的组合”；与 Multica 最接近。文件通信是实现选择，不作为能力领先证据。配图为原创研究说明，不是上游截图，新增静态研究页，未部署上游 Agent 应用。

## 必要的纠偏与源码入口

固定提交：`9ce27e76dae71ab1897a182c0cebbdcf94705a05`，代码版本 0.4.6。

| 核对项 | 保留结论 | 来源 |
| --- | --- | --- |
| 产品能力 | 包装真实 CLI，提供团队任务、记忆与管理界面 | [README](https://github.com/chaitanyagiri/munder-difflin/blob/9ce27e76dae71ab1897a182c0cebbdcf94705a05/README.md) |
| 消息路由 | 默认约 1.5 秒轮询发件箱；文件负责存储和交接，主进程负责投递 | [hive.ts](https://github.com/chaitanyagiri/munder-difflin/blob/9ce27e76dae71ab1897a182c0cebbdcf94705a05/src/main/hive.ts) |
| 唤醒 | 界面侧检查收件箱、排队提醒，再在满足条件时写入终端；主进程另有工作 Agent 唤醒补充 | [useHive.ts](https://github.com/chaitanyagiri/munder-difflin/blob/9ce27e76dae71ab1897a182c0cebbdcf94705a05/src/renderer/src/hooks/useHive.ts)、[workerWake.ts](https://github.com/chaitanyagiri/munder-difflin/blob/9ce27e76dae71ab1897a182c0cebbdcf94705a05/src/main/workerWake.ts) |
| Stop 事件 | 当前调用链不再因收件箱未读而强制继续；早期文档和残留函数不能代表当前实际路径 | [hooks.ts](https://github.com/chaitanyagiri/munder-difflin/blob/9ce27e76dae71ab1897a182c0cebbdcf94705a05/src/main/hooks.ts) |
| 引擎适配 | 能启动命令不等于具备完整生命周期与收件能力 | [agentProvider.ts](https://github.com/chaitanyagiri/munder-difflin/blob/9ce27e76dae71ab1897a182c0cebbdcf94705a05/src/shared/agentProvider.ts) |
| 记忆 | Markdown 保存、可选语义索引与压缩；压缩实现调用 Claude | [memory.ts](https://github.com/chaitanyagiri/munder-difflin/blob/9ce27e76dae71ab1897a182c0cebbdcf94705a05/src/main/memory.ts)、[reflect.ts](https://github.com/chaitanyagiri/munder-difflin/blob/9ce27e76dae71ab1897a182c0cebbdcf94705a05/src/main/reflect.ts) |
| 运行保护 | 强制停止默认关闭，纠偏和约束主要发消息；不可当作结果验收或完整隔离 | [breaker.ts](https://github.com/chaitanyagiri/munder-difflin/blob/9ce27e76dae71ab1897a182c0cebbdcf94705a05/src/main/breaker.ts)、[index.ts](https://github.com/chaitanyagiri/munder-difflin/blob/9ce27e76dae71ab1897a182c0cebbdcf94705a05/src/main/index.ts) |

轮询间隔不等于保证送达时延，消息投递也不等于业务动作成功。后续若需复现，先重新固定版本，再以明确任务检查实际交付。

## 已有研究入口

- [Multica 研究](https://github.com/yydshly/0909_codex_project/tree/main/projects/011-multica)：已运行原版与最小真实任务交接，不代表复杂项目效果已验证。
- [MetaGPT 研究](https://github.com/yydshly/0909_codex_project/tree/main/projects/012-metagpt)：已验证固定动作的调度与测试返修，当时没有调用模型。
- [LongHorizon](../003-longhorizon-harness/README.md)、[OMP](../004-oh-my-pi/README.md)：已有文档与源码研究可复用。
- [Memmy 研究](https://github.com/yydshly/0910_codex_project/tree/main/projects/002-memmy-agent)：共享记忆与任务执行的职责边界。


## 2026-09-11 · 整理与网页发布

用户确认摘要重点：原库是多 Agent 工具，核心实现差异是文件通信。同步能力说明与总览图，新增完整中文阅读页和六步文件交互讲解；步骤为教学内容。静态产物按统一 GitHub Pages 清单合并发布，上游任务仍未运行，暂不归档。
