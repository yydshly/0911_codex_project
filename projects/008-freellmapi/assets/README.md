# 架构配图

[返回项目介绍](../README.md) · [架构详解](../architecture.md)

| 文件 | 内容 | 来源 |
| --- | --- | --- |
| [guide.png](guide.png) | 首页与总索引主引导图：应用、网关、模型、回退与状态反馈 | 沿用本次讨论中的 Mermaid 核心交互图 |
| [guide.svg](guide.svg) | 同图矢量版本，可放大查看 | 从 guide.mmd 渲染 |
| [guide.mmd](guide.mmd) | 用户指定沿用的 Mermaid 原图 | 保留讨论中的节点、箭头和颜色语义 |
| [guide.config.json](guide.config.json) | 字体、间距与非 HTML 文本渲染配置 | 用于稳定输出 SVG / PNG，不改变图的逻辑 |
| [guide.css](guide.css) | 中文文字样式 | Mermaid CLI 11.17.0 渲染时通过 `-C` 引用 |
| [architecture.png](architecture.png) | 请求路径、状态管理与后台维护总览，便于预览 | 本地原创，根据固定提交 `83562ad` 整理 |
| [architecture.svg](architecture.svg) | 同版可编辑矢量图 | 与 PNG 使用相同布局和文字 |
| [architecture.mmd](architecture.mmd) | 逻辑流程的 Mermaid 源文件 | 同一架构的流程表达，不要求与海报像素布局一致 |

以上均为解释性架构图，非上游截图、运行日志或性能证据。研究日期为 2026-09-10，暂无真实运行截图；上游程序尚未复现；研究网页正在发布与验证。

PNG 与 SVG 无外部资源、无密钥或真实请求内容。图中分层是阅读结构，不能解释成多个独立微服务；媒体端点与融合路径的差异见正文。
