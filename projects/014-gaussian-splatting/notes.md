# 来源与研究记录

[返回总览](understanding.md) · [项目介绍](README.md)

## 本轮研究范围

2026-09-11，将讨论整理为七章中文文档与对应网页，覆盖官方库能力与代码原理、此前 Splat.js 实验、技术路线、同类产品、扩展方向和 ChatGPT 公开证据边界。

证据分四类：代码／论文、厂商公开功能说明、此前实际实验、明确标注的推断与建议。厂商宣传与历史实验不能替代同条件性能对比；闭源产品不猜测其内部网络。

## 固定版本与许可证

官方库研究提交为 `54c035f7834b564019656c3e3fcc3646292f727d`，提交日期 2024-10-30；通过上游 HEAD 与提交 API 核对。见 [版本记录](upstream.json)和 [许可证原文](UPSTREAM-LICENSE.txt)。

核对范围包括相机数据读取、训练损失、GaussianModel 参数和增密、渲染接口、转换脚本和 README 可选功能。[固定提交源码](https://github.com/graphdeco-inria/gaussian-splatting/tree/54c035f7834b564019656c3e3fcc3646292f727d)。子模块和可选加速分支存在各自版本，可选能力不代表默认启用。

本轮未运行官方训练，也未复制训练代码。官方库使用 Inria / MPII 专用研究与评估许可，商业使用需另行取得许可，完整条件以上游原文为准。其他框架、模型权重和素材许可独立。

## 先前 Splat.js 实测证据

历史记录日期 2026-09-09，研究提交 `128438ac803aacf868938471dcd52f2a16e0d3a6`。本轮读取既有记录并关联，未重新运行实验。

- 鞋子视频 65.5 秒、223 个选取帧全部注册、10,015 步训练，最终 SOG 约 3.8 MB；训练高斯预算 350,000，保存约 311,757。
- RTX 4070 Laptop、480px draft 设置；端到端约 27 分钟包含人工处理，外观训练约 1 分钟，不能与纯训练耗时直接比较。
- 28.68 dB 是训练视角指标，未记录独立测试视角，不能作为泛化质量结论。
- 卡车实验另有 100 张照片全部注册、10,035 步、约 19.6 MB 高斯 PLY 的记录。不是本轮官方库输出。
- 视频素材原作者记录为 N. Escobar（nickesc）。复用应继续核对原始出处与许可。

[历史研究资料](https://github.com/yydshly/0908_codex_project/tree/main/projects/008-splat-js) · [已公开鞋子结果](https://yydshly.github.io/0908_codex_project/demos/008-splat-js/video-test.html#result)

## 算法与代码来源

| 来源 | 支持的结论 |
| --- | --- |
| [3DGS 论文](https://arxiv.org/html/2308.04079v1) | 各向异性高斯、密度控制、可微投影与新视角合成 |
| [官方实现](https://github.com/graphdeco-inria/gaussian-splatting) | 输入、训练／渲染、可选更新与环境 |
| [COLMAP](https://colmap.github.io/tutorial.html) | SfM、MVS、标定与几何重建 |
| [NeRF](https://www.matthewtancik.com/nerf) | 位置与方向到密度和颜色、体渲染 |
| [NeuS](https://lingjie0206.github.io/papers/NeuS/) / [VolSDF](https://lioryariv.github.io/volsdf/) | 隐式表面与体渲染结合 |
| [DUSt3R](https://github.com/naver/dust3r) / [VGGT](https://github.com/facebookresearch/vggt) | 学习式几何预测及后续重建 |
| [TRELLIS](https://github.com/microsoft/TRELLIS) | 结构化潜变量、生成模型与三维解码 |
| [threestudio](https://github.com/threestudio-project/threestudio) | 预训练生成先验指导三维优化 |
| [Splat.js](https://github.com/arrival-space/splat.js) | 浏览器 SfM 与 WebGPU 高斯训练，当前功能与历史版本分开 |

## 产品与框架来源

| 来源 | 核对范围 |
| --- | --- |
| [RealityScan](https://www.realityscan.com/) | 摄影测量产品与桌面／移动用途 |
| [Metashape](https://www.agisoft.com/features/professional-edition/) | 多视图重建、控制点与测绘输出 |
| [Polycam Object Mode](https://learn.poly.cam/hc/en-us/articles/27425185907348-How-to-Use-Object-Mode) | Mesh 与 Gaussian Splat 模式 |
| [Niantic Spatial Capture](https://www.nianticspatial.com/products/capture) | Scaniverse 相关采集与当前产品入口 |
| [KIRI 视频重建](https://www.kiriengine.app/blog/from-2d-video-to-3d-magic) / [无特征扫描](https://www.kiriengine.app/features/featureless-object-scan) | 摄影测量、NSR、3DGS；不推定 NSR 具体网络 |
| [Postshot](https://www.jawset.com/) / [训练配置](https://www.jawset.com/docs/d/Postshot+User+Guide/Interface/Training+Configuration) | 桌面照片／视频工作流与当前高斯模型 |
| [Brush](https://github.com/ArthurBrussee/brush) | Burn / WebGPU 的可移植高斯重建 |
| [LichtFeld Studio](https://github.com/MrNeRF/LichtFeld-Studio) | 高斯训练、编辑、扩展及分发 |
| [Nerfstudio](https://github.com/nerfstudio-project/nerfstudio) / [Splatfacto](https://docs.nerf.studio/nerfology/methods/splat.html) | NeRF 与高斯训练框架 |
| [Meshroom](https://github.com/alicevision/Meshroom) | 摄影测量图工作流及可选 MrGSplat 插件 |
| [SuperSplat](https://github.com/playcanvas/supersplat) | 已有高斯资产的编辑、优化与发布 |
| [Meshy](https://www.meshy.ai/features/image-to-3d) / [Tripo](https://www.tripo3d.ai/) | 图片驱动三维生成；内部架构不作推定 |

## OpenAI 资料与判断边界

[GPT-6 Astra 文档](https://developers.openai.com/api/docs/models/gpt-6-astra)、[图像生成 API](https://developers.openai.com/api/docs/guides/image-generation)、[ChatGPT 图像说明](https://learn.chatgpt.com/zh-Hans/docs/image-generation)用于核对公开模态、图像工具和产品说明。没有据此确认用户所指的某个原生三维入口，也没有内部采用 3DGS 的公开证据。

程序建模、预训练重建、生成式三维与工具编排是一般技术候选，不是已证实的 OpenAI 架构。取得具体输出和工具过程后应更新结论。

## 扩展方向的代表实现

[Hierarchical 3DGS](https://github.com/graphdeco-inria/hierarchical-3d-gaussians)对应大场景层级管理；[SuGaR](https://github.com/Anttwo/SuGaR)对应表面对齐和提取网格；[4DGaussians](https://github.com/hustvl/4DGaussians)对应动态场景；[LangSplat](https://github.com/minghanqin/LangSplat)对应语言与空间语义。这些是独立扩展，不是官方主库全部原生具备的功能。

## 网页与文档验证

Node.js 内置模块将七章 Markdown 构建为七个页面。检查内部链接、章节锚点、图片、下载资料、模板残留、研究索引与来源记录；同时验证统一 Pages 打包继续保留其他项目。命令见 [网页说明](app/README.md)。

本轮不执行浏览器截图检查；SVG 是原创说明图。静态结构检查与本地 HTTP 访问不代表上游训练、全部产品效果或所有设备兼容性均已实测。线上部署结果见本章发布记录。

2026-09-11 实际验证：七个页面构建成功；275 处网页链接与资源引用、10 份 Markdown、41 条来源索引、21 个对比条目检查通过。统一站点打包通过，保留其他子站。本地首页 HTTP 返回 200；该次检查属于本地整理阶段，未执行上游训练；随后已按发布记录部署。结果保存在 [验证记录](validation.json)；[机器可读来源索引](sources.json)对应各章引用。

## 后续实验

优先在相同照片、相机参数、训练预算和独立测试视角下比较 Splat.js、官方实现和第三方引擎。记录注册率、覆盖、资源、质量、文件大小与可编辑性；需要测量时加入标尺和几何误差。详见 [实验设计](applications.md)。


## 网页正式发布

2026-09-11，已提交并发布 [中文研究网页](https://yydshly.github.io/0911_codex_project/014-gaussian-splatting/)。首次发布提交 `5d28334b5ce86265bcc941cd903cfd46ed89a70b` 的 [Pages 工作流](https://github.com/yydshly/0911_codex_project/actions/runs/34508962655)成功，42 项线上核验通过；全部新站文件对照本地构建，总入口和图片正常，其他既有子站可访问。[部署验证记录](deployment-verification.json)。本次未运行官方库训练或浏览器视觉测试。
