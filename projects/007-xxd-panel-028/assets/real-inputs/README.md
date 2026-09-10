# 本次真实摄影输入

本次输入全部是已有公开摄影图片，不是先由模型生成的“伪原图”，也没有从上游双联样张中裁取摄影区域。首轮四张文件直接下载自 scikit-image v0.24.0，未经裁切或改画。

| 文件 | 摄影内容 | 作者／权利说明 |
| :--- | :--- | :--- |
| [coffee.png](coffee.png) | 咖啡杯、杯碟、金属勺和木桌 | Rachel Michetti；Pikolo Espresso Bar。数据文档标注 CC0 |
| [astronaut.png](astronaut.png) | 航天员 Eileen Collins 的肖像，含头盔与航天背景 | NASA 图片，数据文档标注公有领域、无已知版权限制 |
| [rocket.jpg](rocket.jpg) | 火箭与发射设施的暮色摄影 | SpaceX；数据文档标注公有领域 |
| [chelsea.png](chelsea.png) | Chelsea 猫的面部特写 | Stefan van der Walt；数据文档标注 CC0 |

数据与权利依据：[scikit-image 0.24 数据文档](https://scikit-image.org/docs/0.24.x/api/skimage.data.html)。下载基址为 `https://raw.githubusercontent.com/scikit-image/scikit-image/v0.24.0/skimage/data/`；每个 JSON 运行记录保存具体 URL 与输入 SHA-256。摄影素材许可与 XXD Skill 的非商业软件许可分开记录；不暗示照片作者为生成结果背书。

用途：本仓库内的非商业研究演示。输出必须标注 AI 风格转译，人物生成图不能作为真实摄影或精确身份重建证据。实际原图与生成画布分别提供下载，便于比较是否改变事实或细节。
# 人物生活场景补充（2026-09-10）

本轮从 Pexels 摄影作品页下载三张真实照片，作为用户要求的婚纱与生活场景输入。保存下载文件原始字节，未在本地裁剪、调色或重绘。它们是公开摄影素材，不是用户本人照片，也不代表照片中的人物为本项目背书。

| 文件 | 摄影作者 | 作品页 |
| --- | --- | --- |
| [wedding.jpg](wedding.jpg) | ömer çelik | [婚纱双人照](https://www.pexels.com/photo/bride-and-groom-standing-close-together-and-looking-at-each-other-17542182/) |
| [family.jpg](family.jpg) | Vanessa Loring | [一家四口在厨房准备食物](https://www.pexels.com/photo/a-family-preparing-food-together-in-the-kitchen-5082212/) |
| [beach.jpg](beach.jpg) | Kampus Production | [伴侣在沙滩牵手散步](https://www.pexels.com/photo/a-couple-walking-on-the-beach-6180470/) |

三张均采用 [Pexels License](https://www.pexels.com/license/)，不是 CC0；与原库代码的 PolyForm Noncommercial 许可证分别适用。下载地址、文件哈希和生成后的偏差见[人物场景运行记录](../../runs/20260910-people-scenes-02/README.md)。照片来源页在 2026-09-10 查阅。


新增微缩场景扩展使用的[婚礼场地照片与来源](venue-source.md)，作者 Alina T / Pexels，按 Pexels License 使用，未预处理。
