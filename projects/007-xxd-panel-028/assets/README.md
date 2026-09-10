# 配图与来源

[返回项目](../README.md)

图片从 nevertoday/xxd-panel-028 固定提交 3194d43ba95edbad0082b3604959e45067f72b7e 的 assets/examples/ 原样复制，保留文件名。未裁切、改画或压缩；是上游成品，非本地生成结果、非网页截图。保留[上游许可证](../UPSTREAM-LICENSE.txt)。

| 文件 | 内容与来源性质 | 上游记录的输入 |
| :--- | :--- | :--- |
| [sample-01.jpg](examples/sample-01.jpg) | 上游标注的原始 X 样张 | 原作者小小东，VOL.028 |
| [sample-05.png](examples/sample-05.png) | 山湖，16:9 左右双联 | group_003/009.jpg |
| [sample-06.png](examples/sample-06.png) | 奔跑人物，16:9 左右双联 | group_003/010.jpg |
| [sample-07.png](examples/sample-07.png) | 海面铁路，16:9 左右双联 | group_003/011.jpg |
| [sample-08.png](examples/sample-08.png) | 草坡牛群，16:9 左右双联 | group_003/012.png |
| [sample-09.png](examples/sample-09.png) | 山湖，3:4 上下双联 | 同 group_003/009.jpg，独立生成画布 |

来源：[上游样张说明](https://github.com/nevertoday/xxd-panel-028/blob/3194d43ba95edbad0082b3604959e45067f72b7e/assets/examples/README.md)；[原始推文入口](https://x.com/xiaoxiaodong01/status/2090447110168822128)由上游提供，本研究未独立核实推文及摄影源素材。

样张 05–09 已包含摄影与设计区域，本地未从中提取“原图”。页面切换仅显示现有文件，没有实时生成。样张中地名、编号和日期未独立核实。布局方块是本地说明示意，不是生成作品。

发布时复制到 app/dist/assets/，检查脚本验证字节一致性。暂无真实网页截图；根 README 预览采用实际生成图并明确来源。商业使用和原始素材权利需另行确认。


## 本次新增的实际运行资料

[real-inputs/](real-inputs/README.md) 为七张原样真实摄影输入，来源独立于上游样张。[实测记录](../runs/20260910-real-scenes-01/README.md)关联 generated/20260910-real-scenes-01/ 下八张实际生成图片。所有输出原样保存，未缩放、裁切或拼版；未完全通过验收的结果保留并标注。根 README 现使用人物场景生成图，原始摄影另行提供。

新增[人物生活场景运行记录](../runs/20260910-people-scenes-02/README.md)，包含婚纱、亲子做饭、沙滩散步三张 Pexels 摄影输入和四张原样输出，位于 generated/20260910-people-scenes-02/。Pexels 素材许可与原库许可证分别记录。


## 扩展实验原始输出

[扩展运行记录](../runs/20260910-style-extensions-03/README.md)包含五任务、六张实际 PNG，位于 generated/20260910-style-extensions-03/。其中微缩两轮属于原库风格基准，其余四张属于本地摄影／水彩扩展。参考照片沿用用户已指定的婚纱与家庭照片，未预处理；水彩系列另引用本轮已生成水彩图，仅作为画法参考。页面版式不改变原始摄影或生成图文件字节。


## 微缩场景扩展

[本轮六张实际 PNG](../runs/20260910-miniature-scenes-04/README.md)位于 generated/20260910-miniature-scenes-04/，新增[Alina T 的真实场地照片](real-inputs/venue-source.md)。其余参考沿用此前已核实素材；局部修改输入为本轮已生成 venue 图，编辑结果另存，均未后期处理。人物与场地、咖啡及海边事件是创作组合，并不宣称真实生平。
