# 图片说明

[返回项目](../README.md)

| 文件 | 性质与来源 | 用途 |
| :--- | :--- | :--- |
| [capability-overview.png](capability-overview.png) | 下列 SVG 的高清导出，2400×2960 | 文档、网页和总索引使用的单图总结 |
| [capability-overview.svg](capability-overview.svg) | 本地原创研究图，2026-09-11；依据手册的 30 个官方来源与固定版本源码 | 输入、输出、处理、训练、九类产品与底层原理、大模型差异、四种一致性和价值 |
| [architecture.svg](architecture.svg) | 本地原创技术关系图，2026-09-11 编写；依据固定版本文档与相关源码 | 解释输入、应用、模型、推理、输出与生成式修复的取舍 |

图中的 500×500 → 2000×2000 是尺寸教学例子，不是实际处理记录。没有复制上游效果图，也没有生成或伪造增强样张。暂无真实软件截图。本地网页复用总览 PNG，并提供 SVG 下载。完整来源见[研究手册](../notes.md#sources)。

总览图源代码为 [build-overview.py](../app/build-overview.py)，导出脚本为 [render-overview.cjs](../app/render-overview.cjs)。重新生成需要开发环境中的 Pillow、微软雅黑字体与 Sharp；可通过 `OVERVIEW_FONT`、`OVERVIEW_BOLD_FONT` 和 `SHARP_MODULE` 指定本机路径。正常网页构建直接复制已提交图片，无需这些制图依赖。
