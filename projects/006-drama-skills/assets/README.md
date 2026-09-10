# Drama Skills · 配图说明

[返回项目介绍](../README.md)

| 文件 | 展示内容 | 来源与性质 |
| :--- | :--- | :--- |
| [capability-workflow.png](capability-workflow.png) | 完整多入口流程：入口 → 技能与产物 → 分析资料、五文档、媒体素材或成片；任意阶段按需审查 | 2400 × 2440 中文原创流程图，非运行截图 |
| [capability-workflow.svg](capability-workflow.svg) | 相同流程的可编辑矢量版 | 放大清晰；保留文本、箭头与结构 |
| [render-workflow.py](render-workflow.py) | 重绘完整流程图 | Python + Pillow；校验卡片内文字宽度 |
| [capabilities.svg](capabilities.svg) | 从故事、视觉、分镜到生产、剪辑和审查的能力、产物及使用条件 | 本地原创矢量说明图；非上游界面截图或实跑成果 |
| [capabilities.png](capabilities.png) | 同一能力图的 PNG 版本，便于预览 | 本地绘制，与 SVG 内容一致 |
| [render-guide.py](render-guide.py) | 可选的配图重绘工具 | Python + Pillow；默认使用 Windows Microsoft YaHei 字体 |
| [水浒传创作台截图](../demos/shuihu/生成记录/dashboard-script.png) | 原库创作台实际加载《风雪山神庙》剧本 | 2026-09-10 本机真实运行截图；无图像生成内容，非网页仿制 |
| [技能与效果关联截图](../demos/shuihu/生成记录/dashboard-skill-effect.png) | 原库创作台的剧本顶部显示关联技能与本次效果 | 本轮重新载入后真实截取；非生图结果 |
| [空房签收首版六格图](../demos/empty-room/剧集/EP001/制作成果/images/storyboard-v1.png) | 一句话点子经开发、首集写作与分镜后生成的代表性画面 | Codex 内置 imagegen 真实输出；第 3、6 格偏差与定点修订在案例中记录，不冒充视频起始帧 |
| [空房签收创作台截图](../demos/empty-room/生成记录/dashboard-media-v1.png) | 原库创作台加载新案例真实图片 | 本机真实截图，验证案例已接入 |
| [中文网页桌面截图](web-desktop.png) | 本地新增展示页的摘要与完整流程入口 | 1280 × 900 浏览器视口真实截图，非上游界面 |
| [中文网页手机截图](web-mobile.png) | 同一页面的窄屏适配 | 390 × 844 浏览器视口真实截图，非生图 |

依据上游提交 `dc9b0fac15225629856f17ca06640b470c89cfca` 的技能与实现整理，制作日期为 2026-09-10。图示为常见组合，已有材料可以直接进入相应阶段，审查按需进行。它不代表本地已生产媒体或部署创作台。

上述流程图未引用上游图片、视频或执行代码；《水浒传》案例的公版原著来源另见案例说明。上游 MIT 许可证见[固定版本原文](https://github.com/zenstory-ai/drama-skills/blob/dc9b0fac15225629856f17ca06640b470c89cfca/LICENSE)；本地说明案例为原创文字示意。

阅读无需安装依赖。仅重绘图片时需要 Pillow，在仓库根目录运行 `python projects/006-drama-skills/assets/render-guide.py`；其他系统可修改字体位置，或直接使用已提供的文件。
