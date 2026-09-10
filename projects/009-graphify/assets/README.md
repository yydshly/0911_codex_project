# 配图说明

[返回介绍](../README.md)

- `guide.svg`：本地原创矢量能力示意图，说明文件提取、连接与查询流程，不是软件截图或完整调用图。
- 5 文件、18 节点、40 关系与 0 模型 token 来自 [verification.json](../verification.json)，上游版本 v0.9.57。
- 真实结果可通过 [交互展示](../app/dist/index.html) 核对。暂无浏览器截图，未将示意图当作实测界面。

- `native-fastapi.svg`：本次固定版本 Graphify 原生 SVG 导出器生成，和 [原始产物](../app/dist/native/fastapi/graph.svg) 字节一致；747 节点、1,971 关系、46 社区。输入为 FastAPI 核心包全部 48 个 Python 文件。它是实际图谱导出，非浏览器截图。现在作为主预览，旧 guide.svg 保留作教学说明。

- `understanding-map.svg` / `understanding-map.png`：2026-09-11 新增的完整理解总览，2200 × 2520，覆盖入口、输入方式、处理、输出与扩展。是本地原创能力关系图，非上游截图；实测、待接入与扩展方向分别标注。网页保留字节一致副本，文字详解见 [understanding.md](../understanding.md)。
- `app/build_understanding.py` 同时维护 SVG、PNG、完整理解文档与网页内容；在本项目锁定环境运行，需要 Pillow 与 Windows 微软雅黑字体。生成时检查卡片内文字高度，已人工查看 PNG 排版；未进行浏览器截图验收。
