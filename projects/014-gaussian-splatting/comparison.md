# 同类产品与工具对比

[返回总览](understanding.md) · [技术原理](principles.md)

核查日期：2026-09-11。以下为代表性清单，不是全市场穷尽或性能排行榜。按“成品应用、计算框架、前处理与后处理、生成研究”区分，避免把不同环节当成完全替代品。商业产品的内部架构仅记录官方明确披露的部分；价格、套餐和平台限制需另行实时核对。

## 成品扫描与重建应用

| 产品 | 输入与交付 | 公开的底层路线 | 使用特点与边界 |
| --- | --- | --- | --- |
| [RealityScan](https://www.realityscan.com/) | 多视角图像、激光扫描 → 纹理三维模型等 | 摄影测量、空间对齐、表面重建；可融合扫描数据 | 适合物体、建筑、影视与游戏资产。闭源实现，不能把所有内部步骤认作 COLMAP。桌面产品与移动端入口应区分 |
| [Agisoft Metashape](https://www.agisoft.com/features/professional-edition/) | 航测／近景照片、扫描 → 点云、纹理模型、DEM、正射影像 | 摄影测量三角测量、深度与表面重建 | 专业测绘、控制点、比例尺、坐标和批处理能力较完整；测量精度依赖采集和校验 |
| [Polycam](https://learn.poly.cam/hc/en-us/articles/27425185907348-How-to-Use-Object-Mode) | 照片／视频 → 网格或高斯；其他模式可用深度传感器 | Object Mode 明确区分摄影测量与 Gaussian Splats | 面向手机采集与内容分享；一款产品不等于一种算法，平台与方案支持不同 |
| [Scaniverse](https://www.nianticspatial.com/products/capture) | 移动采集 → 高斯与网格，导出／分享 | 官方确认高斯和网格，可设备端处理 | 当前入口归入 Niantic Spatial Capture；还涉及团队数据流程。不能把企业多传感器精度承诺套用到每次手机扫描 |
| [KIRI Engine](https://www.kiriengine.app/blog/from-2d-video-to-3d-magic) | 照片／视频 → 物体网格、高斯及相关导出 | Photo：摄影测量；Featureless：NSR；3DGS：高斯，可选转网格 | 一个产品组织多模式；NSR 私有实现不能直接等同 NeuS。高斯转网格是额外处理 |
| [Postshot](https://www.jawset.com/) | 图像／视频／已有位姿 → 辐射场场景、编辑与渲染 | 当前训练说明列出 Splat3、Splat MCMC、Splat ADC 等 | 本机处理、实时训练预览、区域训练和影视集成。旧版 NeRF 历史记录不等于当前默认配置；私有细节未知 |

[Postshot 当前训练配置](https://www.jawset.com/docs/d/Postshot+User+Guide/Interface/Training+Configuration)说明不同 profile 的细节表现、随机采样和增密差异。[KIRI NSR 说明](https://www.kiriengine.app/features/featureless-object-scan)用于确认其公开路线，不作为“所有透明反光物都能成功”的证明。

## 可研究、集成和二次开发的计算工具

| 工具 | 负责的环节 | 原理与技术栈 | 与本项目的关系 |
| --- | --- | --- | --- |
| [Splat.js](https://github.com/arrival-space/splat.js) | 照片处理、空间求解、训练、导出与查看 | JavaScript SfM、WebGPU 三维高斯训练 | 我们已实测；完整浏览器实现，不是只有查看器 |
| [gaussian-splatting](https://github.com/graphdeco-inria/gaussian-splatting) | 高斯训练、渲染、评估、数据准备与桌面查看 | PyTorch、CUDA、可微光栅器、SIBR | 本项目核心原库；本次尚未在本机训练 |
| [Brush](https://github.com/ArthurBrussee/brush) | 高斯重建引擎 | 3DGS、Burn、WebGPU 兼容计算 | 用于研究跨设备实现；不能把引擎可移植等同所有采集步骤都无需外部数据准备 |
| [LichtFeld Studio](https://github.com/MrNeRF/LichtFeld-Studio) | 高斯训练、检查、编辑、自动化与导出 | C++、CUDA；包括 MCMC、外观建模等 | 原生桌面工作流与扩展接口；当前要求 NVIDIA。源码与预编译分发条件分别核对 |
| [Nerfstudio](https://github.com/nerfstudio-project/nerfstudio) | 数据处理、训练、评估、查看及方法集成 | 多种 NeRF 方法；Splatfacto 为 3DGS 路线 | 适合同数据比较多种方法，不能仅看名称就认为只支持 NeRF |
| [Meshroom／AliceVision](https://github.com/alicevision/Meshroom) | 可视化计算流程、摄影测量与插件 | 经典 SfM/MVS/网格流程；当前可通过 MrGSplat 接入高斯 | 适合理解可组合管线；主流程、插件与安装版本需要区分 |
| [COLMAP](https://colmap.github.io/tutorial.html) | 相机标定、稀疏及稠密重建 | 特征匹配、几何验证、三角测量、BA、MVS | 可作为网格、NeRF 和 3DGS 的空间前处理；不是专门的高斯训练器 |

Nerfstudio 的 [Splatfacto 文档](https://docs.nerf.studio/nerfology/methods/splat.html)明确其高斯方法。软件采用公开算法不意味着直接复制官方仓库；实现方式、梯度、抗锯齿、相机支持、增密策略与优化器都会影响结果。

## 邻近产品、研究模型与后处理工具

| 项目 | 类型与输入 | 原理／输出 | 为什么要单独区分 |
| --- | --- | --- | --- |
| [SuperSplat](https://github.com/playcanvas/supersplat) | 已有高斯资产的浏览器编辑器 | 检查、裁剪、优化和发布高斯 | 主要位于重建之后，不能当成与 SfM 等价的照片求解器 |
| [DUSt3R](https://github.com/naver/dust3r) | 预训练几何研究模型，输入图像对 | 预测点图并通过全局对齐组织空间 | 主要解决空间估计，不是完整商品展示产品 |
| [VGGT](https://github.com/facebookresearch/vggt) | 预训练 Transformer，输入一个或多个视角 | 预测相机、深度、点图与轨迹；可导出供后续训练的数据 | 可以位于 3DGS 前面，两者可组合 |
| [NeuS](https://lingjie0206.github.io/papers/NeuS/) | 多视角神经表面研究方法 | 学习隐式表面并通过可微渲染优化，提取网格 | 侧重几何表面，区别于自由密度场 |
| [Meshy](https://www.meshy.ai/features/image-to-3d) | 图片／少量视图驱动的生成产品 | 生成三维网格与纹理等 | 隐藏区域依赖推断；页面功能不能证明其具体内部网络架构 |
| [Tripo](https://www.tripo3d.ai/) | 图片／文字驱动的三维生成产品 | 生成并处理三维资产 | 不应自动归类为多视角摄影测量；商业模型细节按公开证据判断 |
| [TRELLIS](https://github.com/microsoft/TRELLIS) | 公开的三维生成研究实现 | 结构化三维潜在表示、流模型；解码为网格、高斯、辐射场 | 清楚展示“生成方法”和“最终表示”可分开 |
| [threestudio](https://github.com/threestudio-project/threestudio) | 组织文字／图像指导的三维生成与编辑框架 | 接入预训练模型，结合三维表示、可微渲染与优化 | 方法组合框架，不是单一网络；不同方法有不同输入和输出 |

## Splat.js 与官方库：相同核心，不同工程实现

| 比较项 | Splat.js | 官方 Gaussian Splatting |
| --- | --- | --- |
| 能力目标 | 在浏览器组织照片到高斯的流程 | 提供原论文方法参考实现与配套查看评估 |
| 空间求解 | 自有 JavaScript SfM、GPU 匹配等 | 通常通过 COLMAP 准备 |
| 高斯训练 | WebGPU，含自身增长／迁移等策略 | PyTorch/CUDA，原版增密及可选增强 |
| 输出 | 高斯 PLY；旧实验另保存 SOG | 高斯 PLY、设置及可选检查点 |
| 交互 | 浏览器流程 | SIBR 等桌面查看器 |
| 已知本机证据 | 鞋子与 Truck，见总览 | 本轮无训练结果 |
| 是否同一个代码库 | 不应如此表述 | 不能仅凭同为 3DGS 认定代码直接复用 |

当前 Splat.js README 说明库中有视频选帧能力，而应用视频入口暂关闭；旧实测版本支持的流程应通过固定版本复现，不把旧体验承诺为当前线上入口。

## 选产品前看五件事

1. **交付物**：需要真实外观、高斯资产、可编辑网格、实际尺寸，还是仅一个演示视频？
2. **计算位置**：浏览器本机、桌面显卡、手机设备端或云服务；浏览器界面不意味着计算一定在本机。
3. **采集条件**：支持照片还是视频？是否需要外部位姿？物体能否静止？是否有足够覆盖？
4. **后处理**：物体分割、坐标与尺度、网格修复、动画和语义交互是否需要额外系统？
5. **证据与授权**：相同数据、留出视角、全流程耗时、显存和导出兼容；软件、模型、数据和媒体各有条件。

## 对我们的具体取舍

已有鞋子高斯可以先用于商品外观浏览，再增加热点与商品说明；要比较技术，应使用同一组照片分别跑高斯与网格流程。要比较 3DGS 产品，应统一视角、分辨率和留出集；不能把某厂商宣传中的一个场景成绩当作全场景排名。

本轮没有重新运行产品横评。除了引用的 Splat.js 旧实验，表中能力来自官方资料；易用性和适用性建议是我们的技术判断。
