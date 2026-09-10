# 工程案例中文目录

[返回项目介绍](README.md)

全部条目提供基于上游标题的中文导读，其中 6 篇补充了已阅读原文的总结。标题导读不代表全文总结，不据此推断实现细节或验证标题中的指标。

来源：[Awesome Engineering Articles](https://github.com/ashishps1/awesome-engineering-articles)，研究版本 `9ef9509126254406440c0e5ee09f609d0876418a`。文章年份沿用上游标注；外链未全部逐一验证。

## 原文总结

### 030 · Canva：按访问模式优化 S3 存储成本

先分析对象大小与访问频率，再计算迁移回本周期，将合适的冷数据迁往更低成本的存储层。

- 问题：用户媒体不断增长，但大部分旧内容访问稀少；仅比较每 GB 单价不足以判断迁移是否划算。
- 做法：分析不同存储桶的数据年龄、读取比例和对象大小。 把一次性迁移费用与持续存储节省放在一起，计算回本周期。 优先迁移适合的较大对象，使用生命周期策略完成存储类别转换。
- 原文结果：作者在 2023 年报告每月节省约 30 万美元，同时说明迁移前期花费超过 160 万美元。
- 代价与边界：小对象和频繁读取可能改变收益；文中的价格与规模是历史条件。
- 我们的启示：优化前先建立访问分布和完整成本模型，再决定迁移范围。

[阅读原文](https://www.canva.dev/blog/engineering/optimising-s3-savings/) · 核对日期：2026-09-10 · 依据章节：Understanding our Data / Cost to Transition / Conclusion

### 032 · Canva：用感知哈希实现可扩展的反向图片搜索

把图片转换为感知哈希，分段查询候选，再用汉明距离筛选相似图片。

- 问题：轻微修改就会改变文件哈希，普通字节级去重无法识别视觉相似图片。
- 做法：用感知哈希表示图像的视觉特征。 把哈希分段存入 DynamoDB，以多索引查询获得候选。 合并去重后按完整哈希距离过滤，并处理低复杂度图片导致的候选膨胀。
- 原文结果：作者报告系统在百亿图片哈希规模下平均查询约 40 毫秒；这是原文环境的结果。
- 代价与边界：分段数量会影响召回与候选规模；简单图形可能形成高频键。
- 我们的启示：检索实验应使用真实数据分布，并单独检查极端高频输入。

[阅读原文](https://www.canva.dev/blog/engineering/simple-fast-and-scalable-reverse-image-search-using-perceptual-hashes-and-dynamodb/) · 核对日期：2026-09-10 · 依据章节：Matching perceptual hashes / Insights / How well does it run?

### 041 · Discord：支撑万亿级消息的存储与读取

在数据库前合并相同读取请求，并结合存储迁移，缓解热门频道造成的消息读取压力。

- 问题：热点分区、压缩积压和垃圾回收暂停导致延迟波动与较重的运维负担。
- 做法：用 Rust 数据服务合并同时读取同一行的请求。 按频道进行一致性哈希路由，提高请求合并机会。 迁移到 ScyllaDB，双写新数据并抽样对比读取结果。
- 原文结果：作者报告历史消息读取 p99 从 40–125 毫秒改善到约 15 毫秒。
- 代价与边界：热点仍需处理；新增服务和存储迁移需要额外的运维与验证。
- 我们的启示：先测量重复读取和热点分布，再判断请求合并与数据库迁移的价值。

[阅读原文](https://discord.com/blog/how-discord-stores-trillions-of-messages) · 核对日期：2026-09-10 · 依据章节：Data Services Serving Data / A Very Big Migration / Several Months Later

### 081 · Facebook/Meta：检测与定位缓存一致性问题

用多时间窗口的一致性检查发现缓存异常，再追踪状态变化，定位难以复现的并发错误。

- 问题：缓存填充与失效事件交错，可能留下旧数据；仅使用版本字段仍可能遇到边界问题。
- 做法：由 Polaris 接收失效事件并像客户端一样检查缓存副本。 在多个时间窗口重试，区分暂时延迟与持续不一致。 结合缓存状态追踪，还原触发问题的操作顺序。
- 原文结果：原文展示了定位罕见错误的过程，并按明确的时间窗口报告一致性指标。
- 代价与边界：回源验证会增加数据库负担，需要控制时机与频率。
- 我们的启示：为一致性定义可观测的时间边界，记录关键状态变化。

[阅读原文](https://engineering.fb.com/2022/06/08/core-infra/cache-made-consistent/) · 核对日期：2026-09-10 · 依据章节：Polaris / Consistency tracing / A real bug we found and fixed this year

### 107 · GitHub：为大规模代码搜索设计专用索引

围绕代码子串检索构建专用倒排索引，用候选集运算与分片减少搜索工作量。

- 问题：海量代码搜索需要同时考虑子串与正则查询、索引体积、查询速度和更新开销。
- 做法：按字符片段建立倒排索引，缩小可能匹配的文档集合。 使用 sparse grams 改善常见短片段产生过多候选的问题。 通过惰性迭代器进行候选集合运算，并将索引分片。
- 原文结果：原文解释了代码搜索的专用索引设计，以及固定三元片段在其规模下的局限。
- 代价与边界：索引设计需要在空间、候选精度与查询开销之间取舍。
- 我们的启示：先收集实际查询形态，再选择合适的索引结构。

[阅读原文](https://github.blog/engineering/architecture-optimization/the-technology-behind-githubs-new-code-search/) · 核对日期：2026-09-10 · 依据章节：Inverted indexes / Indexing 45 million repositories / sparse grams footnote

### 256 · Slack：用单元化架构缩小故障影响范围

让服务流量尽量留在同一可用区，并从入口逐步转移流量，降低单区异常的影响。

- 问题：局部网络故障造成各组件对可用性的判断不同，跨区调用使错误扩散到用户请求。
- 做法：将可隔离服务按可用区组织成独立单元，限制跨区调用。 使用 Envoy 的加权集群与动态权重在入口转移流量。 让控制机制独立于被隔离的可用区，并支持逐步恢复流量。
- 原文结果：原文展示渐进式流量排空，并说明控制更新与优雅处理在途请求的设计。
- 代价与边界：部分服务不能直接隔离，单元化也需要配套容量与控制平面。
- 我们的启示：容灾设计应包含可操作的隔离与恢复路径，并用演练验证。

[阅读原文](https://slack.engineering/slacks-migration-to-a-cellular-architecture/) · 核对日期：2026-09-10 · 依据章节：Background: the incident / Our solution: AZs are cells, and cells may be drained

## 全部条目

### Airbnb

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 001 | [用向量表示改进 Airbnb 搜索召回](https://medium.com/airbnb-engineering/embedding-based-retrieval-for-airbnb-search-aabebfc85839) | 搜索与召回、AI 与机器学习 | 2025 | 标题导读 |
| 002 | [通过 HTTP 流式传输改善页面性能](https://medium.com/airbnb-engineering/improving-performance-with-http-streaming-ba9e72c66408) | 性能优化、前端体验 | 2023 | 标题导读 |
| 003 | [为读密集负载构建更快、更可靠的数据访问框架](https://medium.com/airbnb-engineering/riverbed-optimizing-data-access-at-airbnbs-scale-c37ecf6456d9) | 数据工程、性能优化 | 2023 | 标题导读 |
| 004 | [避免分布式支付系统中的重复付款](https://medium.com/airbnb-engineering/avoiding-double-payments-in-a-distributed-payments-system-2981f6b070bb) | 支付系统、架构设计 | 2019 | 标题导读 |
### Amazon Science

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 005 | [训练代码生成模型调试自己的输出](https://www.amazon.science/blog/training-code-generation-models-to-debug-their-own-outputs) | AI 与机器学习 | 2025 | 标题导读 |
| 006 | [探索生成式 AI 购物助手 Rufus 的技术设计](https://www.amazon.science/blog/the-technology-behind-amazons-genai-powered-shopping-assistant-rufus) | AI 与机器学习 | 2024 | 标题导读 |
| 007 | [让顾客及时发现热门商品](https://www.amazon.science/blog/ensuring-that-customers-dont-miss-out-on-trending-products) | 搜索与召回、AI 与机器学习 | 2023 | 标题导读 |
| 008 | [从结构化搜索走向学习排序与召回](https://www.amazon.science/blog/from-structured-search-to-learning-to-rank-and-retrieve) | 搜索与召回、AI 与机器学习 | 2023 | 标题导读 |
| 009 | [实时识别并剔除机器人广告点击](https://www.amazon.science/blog/invalidating-robotic-ad-clicks-in-real-time) | 安全与风控、数据工程 | 2023 | 标题导读 |
| 010 | [使用大语言模型合成训练数据](https://www.amazon.science/blog/using-large-language-models-llms-to-synthesize-training-data) | AI 与机器学习 | 2023 | 标题导读 |
| 011 | [回顾 DynamoDB 十年的工程经验](https://www.amazon.science/blog/lessons-learned-from-10-years-of-dynamodb) | 数据库 | 2022 | 标题导读 |
| 012 | [用图神经网络推荐关联商品](https://www.amazon.science/blog/using-graph-neural-networks-to-recommend-related-products) | AI 与机器学习、搜索与召回 | 2022 | 标题导读 |
### Atlassian

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 013 | [扩展 Jira 导出服务并提高吞吐量](https://www.atlassian.com/blog/atlassian-engineering/boosting-performance-how-we-scaled-and-enhanced-throughput-in-the-jira-export-service) | 性能优化、架构设计 | 2025 | 标题导读 |
| 014 | [建设具备高可用性的关键服务](https://www.atlassian.com/blog/atlassian-engineering/atlassian-critical-services-above-six-nines-of-availability) | 基础设施 | 2022 | 标题导读 |
| 015 | [加快 Bitbucket Cloud 的 HTTPS Git 推送](https://www.atlassian.com/blog/atlassian-engineering/faster-git-push-over-https-for-bitbucket-cloud) | 性能优化 | 2022 | 标题导读 |
| 016 | [重构 Confluence Cloud 搜索能力](https://www.atlassian.com/blog/atlassian-engineering/revamping-confluence-cloud-search) | 搜索与召回 | 2021 | 标题导读 |
| 017 | [用缓存降低 Jira JQL 查询的数据库负载](https://www.atlassian.com/blog/atlassian-engineering/reducing-jql-database-load-with-caches) | 缓存、数据库 | 2021 | 标题导读 |
| 018 | [扩容、重构并拆分 Confluence Cloud](https://www.atlassian.com/blog/atlassian-engineering/scaling-rearchitecting-and-decomposing-confluence-cloud) | 架构设计 | 2020 | 标题导读 |
| 019 | [扩展 Bitbucket 的数据库容量](https://www.atlassian.com/blog/atlassian-engineering/scaling-bitbuckets-database) | 数据库 | 2020 | 标题导读 |
| 020 | [在 AWS 上扩展低延迟、多区域服务](https://www.atlassian.com/blog/atlassian-engineering/aws-scaling-multi-region-low-latency-service) | 基础设施、性能优化 | 2019 | 标题导读 |
### Booking.com

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 021 | [用统计分析检测时间序列异常](https://medium.com/booking-com-development/anomaly-detection-in-time-series-using-statistical-analysis-cc587b21d008) | 可观测性、数据工程 | 2025 | 标题导读 |
| 022 | [通过一次代码改动降低云成本](https://medium.com/booking-com-development/use-compression-luke-cut-20-of-the-cloud-cost-with-a-single-code-change-510d14d96891) | 成本优化 | 2025 | 标题导读 |
| 023 | [构建高性能排序平台](https://medium.com/booking-com-development/the-engineering-behind-booking-coms-ranking-platform-a-system-overview-2fb222003ca6) | 搜索与召回、性能优化 | 2024 | 标题导读 |
| 024 | [用图技术实时发现和预防欺诈](https://medium.com/booking-com-development/leverage-graph-technology-for-real-time-fraud-detection-and-prevention-438336076ea5) | 安全与风控 | 2024 | 标题导读 |
| 025 | [使用生存分析模型预测订单取消](https://booking.ai/predicting-cancellations-with-survival-modeling-a299af54249b) | AI 与机器学习 | 2024 | 标题导读 |
### Canva

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 026 | [构建持续更新的数据平台](https://www.canva.dev/blog/engineering/snowpipe-streaming/) | 数据工程 | 2025 | 标题导读 |
| 027 | [理解 Canva 绘图工具的实现](https://www.canva.dev/blog/engineering/behind-the-draw/) | 前端体验 | 2024 | 标题导读 |
| 028 | [构建每日采集海量事件的分析管道](https://www.canva.dev/blog/engineering/product-analytics-event-collection/) | 数据工程 | 2024 | 标题导读 |
| 029 | [扩展可靠的内容使用计数服务](https://www.canva.dev/blog/engineering/scaling-to-count-billions/) | 架构设计、性能优化 | 2024 | 标题导读 |
| 030 | [按访问模式优化 S3 存储成本](https://www.canva.dev/blog/engineering/optimising-s3-savings/) | 成本优化 | 2023 | 原文总结 |
| 031 | [将媒体上传服务扩展至每日数千万次](https://www.canva.dev/blog/engineering/from-zero-to-50-million-uploads-per-day-scaling-media-at-canva/) | 性能优化、基础设施 | 2022 | 标题导读 |
| 032 | [用感知哈希实现可扩展的反向图片搜索](https://www.canva.dev/blog/engineering/simple-fast-and-scalable-reverse-image-search-using-perceptual-hashes-and-dynamodb/) | 搜索与召回、数据库 | 2022 | 原文总结 |
| 033 | [借助 RSocket 实现实时协作](https://www.canva.dev/blog/engineering/enabling-real-time-collaboration-with-rsocket/) | 消息与通知、架构设计 | 2021 | 标题导读 |
### Coinbase

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 034 | [优化网络请求以改善应用性能](https://www.coinbase.com/blog/boosting-app-performance-strategies-to-optimize-network-requests) | 性能优化 | 2024 | 标题导读 |
| 035 | [加速深度学习在业务中的应用](https://www.coinbase.com/blog/accelerating-deep-learning-adoption-at-coinbase) | AI 与机器学习 | 2024 | 标题导读 |
| 036 | [总结企业级生成式 AI 产品的上线经验](https://www.coinbase.com/blog/lessons-from-launching-enterprise-grade-genAI-solutions-at-Coinbase) | AI 与机器学习 | 2024 | 标题导读 |
| 037 | [用机器学习预测流量并扩展数据库](https://www.coinbase.com/blog/how-coinbase-is-using-machine-learning-to-predict) | AI 与机器学习、数据库 | 2024 | 标题导读 |
| 038 | [识别欺诈交易与区块链地址风险](https://www.coinbase.com/blog/detecting-fraudulent-transactions-coinbase-scalable-blockchain-address-risk) | 安全与风控 | 2023 | 标题导读 |
| 039 | [构建统一通知平台](https://www.coinbase.com/blog/building-a-notification-platform-at-coinbase) | 消息与通知、架构设计 | 2022 | 标题导读 |
### Discord

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 040 | [减少 WebSocket 通信流量](https://discord.com/blog/how-discord-reduced-websocket-traffic-by-40-percent) | 性能优化、消息与通知 | 2024 | 标题导读 |
| 041 | [支撑万亿级消息的存储与读取](https://discord.com/blog/how-discord-stores-trillions-of-messages) | 数据库 | 2023 | 原文总结 |
| 042 | [应对单个社区百万用户同时在线](https://discord.com/blog/maxjourney-pushing-discords-limits-with-a-million-plus-online-users-in-a-single-server) | 性能优化、基础设施 | 2023 | 标题导读 |
| 043 | [用机器学习改善通知体验](https://discord.com/blog/building-delightful-notifications-using-ml) | AI 与机器学习、消息与通知 | 2022 | 标题导读 |
| 044 | [从海量数据点中提取业务洞察](https://discord.com/blog/how-discord-creates-insights-from-trillions-of-data-points) | 数据工程 | 2021 | 标题导读 |
### DoorDash

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 045 | [用大语言模型转录餐厅菜单照片](https://careersatdoordash.com/blog/doordash-llm-transcribe-menu/) | AI 与机器学习 | 2025 | 标题导读 |
| 046 | [借助大语言模型改善搜索召回](https://careersatdoordash.com/blog/how-doordash-leverages-llms-for-better-search-retrieval/) | AI 与机器学习、搜索与召回 | 2024 | 标题导读 |
| 047 | [用大语言模型构建商品知识图谱](https://careersatdoordash.com/blog/building-doordashs-product-knowledge-graph-with-large-language-models/) | AI 与机器学习、数据工程 | 2024 | 标题导读 |
| 048 | [建设 DoorDash 自研搜索引擎](https://careersatdoordash.com/blog/introducing-doordashs-in-house-search-engine/) | 搜索与召回 | 2024 | 标题导读 |
| 049 | [设计可扩展、可靠的写密集库存平台](https://careersatdoordash.com/blog/how-doordash-designed-a-successful-write-heavy-scalable-and-reliable-inventory-platform/) | 架构设计、数据库 | 2023 | 标题导读 |
| 050 | [使用 Kafka 与 Flink 处理实时事件](https://careersatdoordash.com/blog/building-scalable-real-time-event-processing-with-kafka-and-flink/) | 数据工程 | 2022 | 标题导读 |
| 051 | [改善高流量网页的性能](https://careersatdoordash.com/blog/doordashs-lessons-on-improving-performance-on-high-traffic-web-pages/) | 性能优化、前端体验 | 2022 | 标题导读 |
| 052 | [通过客户端缓存加速特征存储访问](https://careersatdoordash.com/blog/how-we-applied-client-side-caching/) | 缓存、AI 与机器学习 | 2022 | 标题导读 |
| 053 | [统一不同场景的聊天体验](https://careersatdoordash.com/blog/building-a-unified-chat-experience-at-doordash/) | 消息与通知 | 2022 | 标题导读 |
### Dropbox

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 054 | [围绕消息系统演进异步基础设施](https://dropbox.tech/infrastructure/infrastructure-messaging-system-model-async-platform-evolution) | 架构设计、消息与通知 | 2025 | 标题导读 |
| 055 | [构建可扩展且一致的元数据缓存](https://dropbox.tech/infrastructure/meet-chrono-our-scalable-consistent-metadata-caching-solution) | 缓存 | 2024 | 标题导读 |
| 056 | [在网页文件预览中提供 AI 问答与摘要](https://dropbox.tech/machine-learning/bringing-ai-powered-answers-and-summaries-to-file-previews-on-the-web) | AI 与机器学习 | 2024 | 标题导读 |
| 057 | [用机器学习自动整理文件](https://dropbox.tech/machine-learning/smart-move-ml-ai-file-organization-automation) | AI 与机器学习 | 2023 | 标题导读 |
| 058 | [识别文件名中的日期格式](https://dropbox.tech/machine-learning/using-ml-to-identify-date-formats-in-file-names) | AI 与机器学习 | 2023 | 标题导读 |
| 059 | [用机器学习优化支付流程](https://dropbox.tech/machine-learning/optimizing-payments-with-machine-learning) | AI 与机器学习、支付系统 | 2021 | 标题导读 |
### eBay

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 060 | [从事务型图数据库导出十亿级图数据](https://innovation.ebayinc.com/stories/how-we-export-billion-scale-graphs-on-transactional-graph-databases/) | 数据库 | 2023 | 标题导读 |
| 061 | [构建面向用户的个性化推荐排序模型](https://innovation.ebayinc.com/stories/evolving-recommendations-a-personalized-user-based-ranking-model/) | AI 与机器学习、搜索与召回 | 2023 | 标题导读 |
| 062 | [用多模态向量表示改善商品推荐](https://innovation.ebayinc.com/stories/beyond-words-how-multimodal-embeddings-elevate-ebays-product-recommendations/) | AI 与机器学习、搜索与召回 | 2023 | 标题导读 |
| 063 | [建设十亿级向量相似度检索引擎](https://innovation.ebayinc.com/stories/ebays-blazingly-fast-billion-scale-vector-similarity-engine/) | 搜索与召回、性能优化 | 2023 | 标题导读 |
| 064 | [大规模处理实时推送通知](https://innovation.ebayinc.com/stories/ebays-notification-streaming-platform-how-ebay-handles-real-time-push-notifications-at-scale/) | 消息与通知 | 2022 | 标题导读 |
| 065 | [用深度学习实现个性化推荐召回](https://innovation.ebayinc.com/stories/building-a-deep-learning-based-retrieval-system-for-personalized-recommendations/) | AI 与机器学习、搜索与召回 | 2022 | 标题导读 |
| 066 | [高效、一致地加载和更新百亿顶点图](https://innovation.ebayinc.com/stories/graphload-a-framework-to-load-and-update-over-ten-billion-vertex-graphs-with-performance-and-consistency/) | 数据库、性能优化 | 2021 | 标题导读 |
| 067 | [为自研数据库构建实时二级索引服务](https://innovation.ebayinc.com/stories/ebays-global-secondary-indexes/) | 数据库 | 2021 | 标题导读 |
### Facebook/Meta

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 068 | [用开源 Glean 系统进行大规模代码索引](https://engineering.fb.com/2024/12/19/developer-tools/glean-open-source-code-indexing/) | 搜索与召回、基础设施 | 2024 | 标题导读 |
| 069 | [理解 Facebook 视频分发系统](https://engineering.fb.com/2024/12/10/video-engineering/inside-facebooks-video-delivery-system/) | 视频与媒体 | 2024 | 标题导读 |
| 070 | [用序列学习实现个性化广告推荐](https://engineering.fb.com/2024/11/19/data-infrastructure/sequence-learning-personalized-ads-recommendations/) | AI 与机器学习 | 2024 | 标题导读 |
| 071 | [规模化地让 AI 生成的图片动起来](https://engineering.fb.com/2024/08/14/production-engineering/how-meta-animates-ai-generated-images-at-scale/) | AI 与机器学习、基础设施 | 2024 | 标题导读 |
| 072 | [扩展大语言模型训练系统](https://engineering.fb.com/2024/06/12/data-infrastructure/training-large-language-models-at-scale-meta/) | AI 与机器学习、基础设施 | 2024 | 标题导读 |
| 073 | [建设生成式 AI 基础设施](https://engineering.fb.com/2024/03/12/data-center-engineering/building-metas-genai-infrastructure/) | AI 与机器学习、基础设施 | 2024 | 标题导读 |
| 074 | [为分布式 AI 训练部署 RoCE 网络](https://engineering.fb.com/2024/08/05/data-center-engineering/roce-network-distributed-ai-training-at-scale/) | 基础设施、AI 与机器学习 | 2024 | 标题导读 |
| 075 | [建设 Threads 背后的基础设施](https://engineering.fb.com/2023/12/19/core-infra/how-meta-built-the-infrastructure-for-threads/) | 基础设施 | 2023 | 标题导读 |
| 076 | [为 Messenger 构建端到端安全能力](https://engineering.fb.com/2023/12/06/security/building-end-to-end-security-for-messenger/) | 安全与风控 | 2023 | 标题导读 |
| 077 | [推进 Meta 数据平台现代化](https://engineering.fb.com/2023/01/26/data-infrastructure/tulip-modernizing-metas-data-platform/) | 数据工程 | 2023 | 标题导读 |
| 078 | [在基础设施中部署精确时间协议](https://engineering.fb.com/2022/11/21/production-engineering/precision-time-protocol-at-meta/) | 基础设施 | 2022 | 标题导读 |
| 079 | [扩展机器学习训练的数据摄入能力](https://engineering.fb.com/2022/09/19/ml-applications/data-ingestion-machine-learning-training-meta/) | AI 与机器学习、数据工程 | 2022 | 标题导读 |
| 080 | [构建云游戏基础设施](https://engineering.fb.com/2022/06/09/web/cloud-gaming-infrastructure/) | 基础设施 | 2022 | 标题导读 |
| 081 | [检测与定位缓存一致性问题](https://engineering.fb.com/2022/06/08/core-infra/cache-made-consistent/) | 缓存 | 2022 | 原文总结 |
| 082 | [通过链式复制构建高可用、强一致存储](https://engineering.fb.com/2022/05/04/data-infrastructure/delta/) | 数据库、架构设计 | 2022 | 标题导读 |
| 083 | [为分布式优先级队列建设容灾能力](https://engineering.fb.com/2022/01/18/production-engineering/foqs-disaster-ready/) | 架构设计 | 2022 | 标题导读 |
| 084 | [用 ZippyDB 构建通用键值存储](https://engineering.fb.com/2021/08/06/core-infra/zippydb/) | 数据库 | 2021 | 标题导读 |
| 085 | [通过完全分片数据并行降低训练资源需求](https://engineering.fb.com/2021/07/15/open-source/fsdp/) | AI 与机器学习、基础设施 | 2021 | 标题导读 |
| 086 | [理解 Facebook 视频编码流程](https://engineering.fb.com/2021/04/05/video-engineering/how-facebook-encodes-your-videos/) | 视频与媒体 | 2021 | 标题导读 |
| 087 | [扩展分布式优先级队列](https://engineering.fb.com/2021/02/22/production-engineering/foqs-scaling-a-distributed-priority-queue/) | 架构设计 | 2021 | 标题导读 |
| 088 | [用机器学习为动态消息流排序](https://engineering.fb.com/2021/01/26/ml-applications/news-feed-ranking/) | AI 与机器学习 | 2021 | 标题导读 |
| 089 | [支撑数百万观众同时观看直播](https://engineering.fb.com/2020/10/22/video-engineering/live-streaming/) | 视频与媒体、性能优化 | 2020 | 标题导读 |
### Figma

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 090 | [构建 Figma AI 搜索基础设施](https://www.figma.com/blog/the-infrastructure-behind-ai-search-in-figma/) | 搜索与召回、AI 与机器学习 | 2024 | 标题导读 |
| 091 | [缩短 Figma 文件加载时间](https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/) | 性能优化 | 2024 | 标题导读 |
| 092 | [用 LiveGraph 支撑大规模实时数据访问](https://www.figma.com/blog/livegraph-real-time-data-at-scale/) | 架构设计、数据工程 | 2024 | 标题导读 |
| 093 | [通过水平扩展提升 Postgres 容量](https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/) | 数据库 | 2024 | 标题导读 |
| 094 | [通过增量画面加载改善速度与性能](https://www.figma.com/blog/incremental-frame-loading/) | 性能优化 | 2024 | 标题导读 |
| 095 | [将负载分散到多个数据库以降低不稳定性](https://www.figma.com/blog/how-figma-scaled-to-multiple-databases/) | 数据库 | 2023 | 标题导读 |
| 096 | [理解自动保存背后的隐藏挑战](https://www.figma.com/blog/behind-the-feature-autosave/) | 架构设计 | 2020 | 标题导读 |
| 097 | [通过深度搜索更快找到合适的文件](https://www.figma.com/blog/deep-search/) | 搜索与召回 | 2020 | 标题导读 |
### Flipkart

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 098 | [建设高可用 MySQL 系统](https://blog.flipkart.tech/mysql-high-availability-5f71838f19e1) | 数据库 | 2023 | 标题导读 |
| 099 | [运行跨区域 ZooKeeper 集群](https://blog.flipkart.tech/running-a-multi-region-zookeeper-58e52cec44ff) | 基础设施 | 2021 | 标题导读 |
| 100 | [调优高吞吐微服务的内存使用](https://blog.flipkart.tech/memory-tuning-a-high-throughput-microservice-ed57b3e60997) | 性能优化 | 2021 | 标题导读 |
| 101 | [构建个性化搜索联想](https://blog.flipkart.tech/building-personalized-autosuggestion-9e705d5bf5f8) | AI 与机器学习、搜索与召回 | 2021 | 标题导读 |
| 102 | [在用户输入之前预测下一次查询](https://blog.flipkart.tech/predicting-your-next-query-even-before-you-type-83487a34109d) | AI 与机器学习、搜索与召回 | 2021 | 标题导读 |
| 103 | [让搜索适配印度语音特点](https://blog.flipkart.tech/adapting-search-to-indian-phonetics-cdbe65259686) | 搜索与召回 | 2020 | 标题导读 |
### GitHub

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 104 | [优化 GitHub 的推送处理流程](https://github.blog/engineering/architecture-optimization/how-we-improved-push-processing-on-github/) | 性能优化 | 2024 | 标题导读 |
| 105 | [使用合并队列持续交付代码变更](https://github.blog/engineering/engineering-principles/how-github-uses-merge-queue-to-ship-hundreds-of-changes-every-day/) | 基础设施 | 2024 | 标题导读 |
| 106 | [理解 GitHub 文档搜索的实现](https://github.blog/engineering/architecture-optimization/how-github-docs-new-search-works/) | 搜索与召回 | 2023 | 标题导读 |
| 107 | [为大规模代码搜索设计专用索引](https://github.blog/engineering/architecture-optimization/the-technology-behind-githubs-new-code-search/) | 搜索与召回 | 2023 | 原文总结 |
| 108 | [扩展 Git 垃圾回收能力](https://github.blog/engineering/architecture-optimization/scaling-gits-garbage-collection/) | 性能优化 | 2022 | 标题导读 |
| 109 | [通过文件系统监控加速 Git 大仓库操作](https://github.blog/engineering/infrastructure/improve-git-monorepo-performance-with-a-file-system-monitor/) | 性能优化、基础设施 | 2022 | 标题导读 |
| 110 | [通过分区扩展关系型数据库](https://github.blog/engineering/infrastructure/partitioning-githubs-relational-databases-scale/) | 数据库 | 2021 | 标题导读 |
### Google Research

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 111 | [处理任务随机到达时的负载均衡](https://research.google/blog/load-balancing-with-random-job-arrivals/) | 基础设施 | 2025 | 标题导读 |
| 112 | [将 Transformer 用于音乐推荐](https://research.google/blog/transformers-in-music-recommendation/) | AI 与机器学习、搜索与召回 | 2024 | 标题导读 |
| 113 | [将多模态理解扩展至长视频](https://research.google/blog/scaling-multimodal-understanding-to-long-videos/) | AI 与机器学习、视频与媒体 | 2023 | 标题导读 |
| 114 | [低延迟地响应海量报表查询](https://research.google/blog/answering-billions-of-reporting-queries-each-day-with-low-latency/) | 数据库、性能优化 | 2023 | 标题导读 |
| 115 | [在大规模搜索中执行语法检查](https://research.google/blog/grammar-checking-at-google-search-scale/) | AI 与机器学习、搜索与召回 | 2023 | 标题导读 |
| 116 | [在地图业务中应用大规模逆强化学习](https://research.google/blog/world-scale-inverse-reinforcement-learning-in-google-maps/) | AI 与机器学习 | 2023 | 标题导读 |
| 117 | [用机器学习处理代码审查意见](https://research.google/blog/resolving-code-review-comments-with-ml/) | AI 与机器学习 | 2023 | 标题导读 |
### Instagram

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 118 | [扩展 Instagram Explore 推荐系统](https://engineering.fb.com/2023/08/09/ml-applications/scaling-instagram-explore-recommendations-system/) | AI 与机器学习、搜索与召回 | 2023 | 标题导读 |
| 119 | [减少基础视频处理的计算时间](https://engineering.fb.com/2022/11/04/video-engineering/instagram-video-processing-encoding-reduction/) | 视频与媒体、性能优化 | 2022 | 标题导读 |
| 120 | [用机器学习与因果推断改善通知管理](https://engineering.fb.com/2022/10/31/ml-applications/instagram-notification-management-machine-learning/) | AI 与机器学习、消息与通知 | 2022 | 标题导读 |
| 121 | [实现 Stories 的文字动画](https://engineering.fb.com/2022/07/18/developer-tools/building-text-animations-for-instagram-stories/) | 前端体验 | 2022 | 标题导读 |
| 122 | [优化移动应用中的压缩技术](https://engineering.fb.com/2021/09/13/core-infra/superpack/) | 移动应用、性能优化 | 2021 | 标题导读 |
| 123 | [理解 Instagram 的新内容推荐](https://engineering.fb.com/2020/12/10/web/how-instagram-suggests-new-content/) | AI 与机器学习、搜索与召回 | 2020 | 标题导读 |
### Instacart

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 124 | [结合 Yoda 与 ClickHouse 实时检测欺诈](https://tech.instacart.com/real-time-fraud-detection-with-yoda-and-clickhouse-bd08e9dbe3f4) | 安全与风控、数据工程 | 2024 | 标题导读 |
| 125 | [为缺货商品推荐替代品](https://tech.instacart.com/how-instacart-uses-machine-learning-to-suggest-replacements-for-out-of-stock-products-8f80d03bb5af) | AI 与机器学习 | 2024 | 标题导读 |
| 126 | [用序列模型实现上下文推荐](https://tech.instacart.com/sequence-models-for-contextual-recommendations-at-instacart-93414a28e70c) | AI 与机器学习、搜索与召回 | 2024 | 标题导读 |
| 127 | [借助大语言模型增强搜索发现能力](https://tech.instacart.com/supercharging-discovery-in-search-with-llms-556c585d4720) | AI 与机器学习、搜索与召回 | 2024 | 标题导读 |
| 128 | [使用混合检索提升搜索相关性](https://tech.instacart.com/optimizing-search-relevance-at-instacart-using-hybrid-retrieval-88cb579b959c) | 搜索与召回 | 2024 | 标题导读 |
| 129 | [兼顾商品可售状态的规模与一致性](https://tech.instacart.com/instacarts-item-availability-architecture-solving-for-scale-and-consistency-f5661acb20a6) | 架构设计 | 2023 | 标题导读 |
| 130 | [让一个深度学习模型服务多个产品入口](https://tech.instacart.com/one-model-to-serve-them-all-0eb6bf60b00d) | AI 与机器学习 | 2023 | 标题导读 |
| 131 | [建设分布式机器学习能力](https://tech.instacart.com/distributed-machine-learning-at-instacart-4b11d7569423) | AI 与机器学习、基础设施 | 2023 | 标题导读 |
| 132 | [通过向量表示提升搜索相关性](https://tech.instacart.com/how-instacart-uses-embeddings-to-improve-search-relevance-e569839c3c36) | AI 与机器学习、搜索与召回 | 2022 | 标题导读 |
| 133 | [演进实时机器学习系统](https://tech.instacart.com/lessons-learned-the-journey-to-real-time-machine-learning-at-instacart-942f3a656af3) | AI 与机器学习 | 2022 | 标题导读 |
| 134 | [通过智能补全帮助用户选购商品](https://tech.instacart.com/how-instacart-uses-machine-learning-driven-autocomplete-to-help-people-fill-their-carts-9bc56d22bafb) | AI 与机器学习、搜索与召回 | 2022 | 标题导读 |
| 135 | [用机器学习优化配送物流引擎](https://tech.instacart.com/dont-let-the-crow-guide-your-routes-f24c96daedba) | AI 与机器学习 | 2021 | 标题导读 |
| 136 | [在资源有限时用启发式方法纠正查询](https://tech.instacart.com/avacado-or-avocado-4b4b78dc0698) | 搜索与召回 | 2020 | 标题导读 |
| 137 | [预测海量生鲜商品的实时可售状态](https://tech.instacart.com/predicting-real-time-availability-of-200-million-grocery-items-in-us-canada-stores-61f43a16eafe) | AI 与机器学习 | 2018 | 标题导读 |
| 138 | [理解按时交付订单的工程实践](https://tech.instacart.com/how-instacart-delivers-on-time-using-quantile-regression-2383e2e03edb) | AI 与机器学习 | 2018 | 标题导读 |
### LinkedIn

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 139 | [构建可扩展的联邦学习系统](https://www.linkedin.com/blog/engineering/machine-learning/scalable-federated-learning-at-linkedin) | AI 与机器学习 | 2025 | 标题导读 |
| 140 | [为大规模基础设施构建可靠 DNS 客户端](https://www.linkedin.com/blog/engineering/infrastructure/building-a-resilient-dns-client-for-web-scale-infrastructure) | 基础设施 | 2025 | 标题导读 |
| 141 | [演进数据系统的新一代控制平面](https://www.linkedin.com/blog/engineering/infrastructure/journey-of-next-generation-control-plane-for-data-systems) | 基础设施、数据工程 | 2025 | 标题导读 |
| 142 | [在大规模图推荐系统中生成候选项](https://www.linkedin.com/blog/engineering/recommendations/candidate-generation-in-a-large-scale-graph-recommendation-system-people-you-may-know) | AI 与机器学习、搜索与召回 | 2024 | 标题导读 |
| 143 | [降低人脉页面延迟并改善体验](https://www.linkedin.com/blog/engineering/infrastructure/accelerating-linkedins-my-network-tab) | 性能优化、前端体验 | 2024 | 标题导读 |
| 144 | [为高性能服务调优 Java](https://www.linkedin.com/blog/engineering/infrastructure/java-heap-memory-and-garbage-collection-tuning-for-high-performance-services) | 性能优化 | 2024 | 标题导读 |
| 145 | [用 OpenHouse 管理大数据](https://www.linkedin.com/blog/engineering/data-management/taking-charge-of-tables--introducing-openhouse-for-big-data-mana) | 数据工程 | 2023 | 标题导读 |
| 146 | [将 GraphQL 架构用于产品开发](https://www.linkedin.com/blog/engineering/architecture/how-linkedin-adopted-a-graphql-architecture-for-product-developm) | 架构设计 | 2023 | 标题导读 |
| 147 | [用向量表示改善职位与求职者匹配](https://www.linkedin.com/blog/engineering/platform-platformization/using-embeddings-to-up-its-match-game-for-job-seekers) | AI 与机器学习、搜索与召回 | 2023 | 标题导读 |
| 148 | [构建提供劳动力市场洞察的数据基础设施](https://www.linkedin.com/blog/engineering/economic-graph/from-the-economic-graph-to-economic-insights-building-the-infra) | 数据工程 | 2023 | 标题导读 |
| 149 | [扩展用户资料存储并降低成本](https://www.linkedin.com/blog/engineering/data-management/upscaling-profile-datastore-while-reducing-costs) | 数据库、成本优化 | 2023 | 标题导读 |
| 150 | [统一 LinkedIn 的消息体验](https://www.linkedin.com/blog/engineering/messaging-notifications/unifying-messaging-experiences-across-linkedin) | 消息与通知 | 2023 | 标题导读 |
| 151 | [在 AI 模型中应用多任务学习](https://www.linkedin.com/blog/engineering/data-modeling/applying-multitask-learning-to-ai-models-at-linkedin) | AI 与机器学习 | 2022 | 标题导读 |
| 152 | [在数据湖中构建可变数据集](https://www.linkedin.com/blog/engineering/data-management/opal-building-a-mutable-dataset-in-data-lake) | 数据工程 | 2022 | 标题导读 |
| 153 | [用图神经网络补全会员知识图谱](https://www.linkedin.com/blog/engineering/knowledge/completing-a-member-knowledge-graph-with-graph-neural-networks) | AI 与机器学习 | 2021 | 标题导读 |
| 154 | [用 TensorFlow 实现首页信息流多任务学习](https://www.linkedin.com/blog/engineering/feed/homepage-feed-multi-task-learning-using-tensorflow) | AI 与机器学习 | 2021 | 标题导读 |
| 155 | [演进 LinkedIn 的分析技术栈](https://www.linkedin.com/blog/engineering/analytics/evolving-linkedin-s-analytics-tech-stack) | 数据工程 | 2021 | 标题导读 |
| 156 | [将 Hadoop YARN 集群扩展到万节点以上](https://www.linkedin.com/blog/engineering/open-source/scaling-linkedin-s-hadoop-yarn-cluster-beyond-10-000-nodes) | 基础设施、数据工程 | 2021 | 标题导读 |
| 157 | [通过 HTTP/2 重构 Ambry 网络栈](https://www.linkedin.com/blog/engineering/optimization/http-2-in-infrastructure-ambry-network-stack-refactoring) | 基础设施、性能优化 | 2021 | 标题导读 |
| 158 | [构建异构社交网络推荐系统](https://www.linkedin.com/blog/engineering/optimization/building-a-heterogeneous-social-network-recommendation-system) | AI 与机器学习、搜索与召回 | 2020 | 标题导读 |
### Lyft

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 159 | [用 Verity 提升数据质量](https://eng.lyft.com/from-big-data-to-better-data-ensuring-data-quality-with-verity-a996b49343f6) | 数据工程 | 2023 | 标题导读 |
| 160 | [建设实时机器学习基础能力](https://eng.lyft.com/building-real-time-machine-learning-foundations-at-lyft-6dd99b385a4e) | AI 与机器学习、基础设施 | 2023 | 标题导读 |
| 161 | [理解 Lyft 推荐系统](https://eng.lyft.com/the-recommendation-system-at-lyft-67bc9dcc1793) | AI 与机器学习、搜索与召回 | 2023 | 标题导读 |
| 162 | [使用 lyft2vec 构建向量表示](https://eng.lyft.com/lyft2vec-embeddings-at-lyft-d4231a76d219) | AI 与机器学习 | 2023 | 标题导读 |
| 163 | [用 LyftLearn Serving 支撑实时决策](https://eng.lyft.com/powering-millions-of-real-time-decisions-with-lyftlearn-serving-9bb1f73318dc) | AI 与机器学习、基础设施 | 2023 | 标题导读 |
| 164 | [探索 Lyft 的定价机制](https://eng.lyft.com/pricing-at-lyft-8a4022065f8b) | 架构设计 | 2022 | 标题导读 |
| 165 | [在 Kubernetes 上建设模型训练基础设施](https://eng.lyft.com/lyftlearn-ml-model-training-infrastructure-built-on-kubernetes-aef8218842bb) | AI 与机器学习、基础设施 | 2021 | 标题导读 |
| 166 | [优化 Elasticsearch 的使用](https://eng.lyft.com/elasticsearch-optimizations-at-lyft-b555dc020932) | 搜索与召回、性能优化 | 2021 | 标题导读 |
| 167 | [评估 OpenStreetMap 对网约车地图时效性的价值](https://eng.lyft.com/how-lyft-discovered-openstreetmap-is-the-freshest-map-for-rideshare-a7a41bf92ec) | 数据工程 | 2021 | 标题导读 |
| 168 | [利用客户端地图数据改善实时定位](https://eng.lyft.com/using-client-side-map-data-to-improve-real-time-positioning-a382585ac6e) | 移动应用 | 2021 | 标题导读 |
| 169 | [预测乘客目的地以改善应用体验](https://eng.lyft.com/how-lyft-predicts-your-destination-with-attention-791146b0a439) | AI 与机器学习 | 2020 | 标题导读 |
| 170 | [设计实时地图匹配算法](https://eng.lyft.com/a-new-real-time-map-matching-algorithm-at-lyft-da593ab7b006) | AI 与机器学习 | 2020 | 标题导读 |
### Netflix

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 171 | [将基础模型用于个性化推荐](https://netflixtechblog.com/foundation-model-for-personalized-recommendation-1a0bd8e02d39) | AI 与机器学习、搜索与召回 | 2025 | 标题导读 |
| 172 | [处理每天数十亿次曝光事件](https://netflixtechblog.com/introducing-impressions-at-netflix-e2b67c88c9fb) | 数据工程 | 2025 | 标题导读 |
| 173 | [抽象分布式计数能力](https://netflixtechblog.com/netflixs-distributed-counter-abstraction-8d0c45eb66b2) | 架构设计 | 2024 | 标题导读 |
| 174 | [演进 WebSocket 代理架构](https://netflixtechblog.com/pushy-to-the-limit-evolving-netflixs-websocket-proxy-for-the-future-b468bc0ff658) | 消息与通知、基础设施 | 2024 | 标题导读 |
| 175 | [建立统一键值数据访问抽象](https://netflixtechblog.com/introducing-netflixs-key-value-data-abstraction-layer-1ea8a0a11b30) | 数据库 | 2024 | 标题导读 |
| 176 | [建立时间序列数据访问抽象](https://netflixtechblog.com/introducing-netflix-timeseries-data-abstraction-layer-31552f6326f8) | 数据库 | 2024 | 标题导读 |
| 177 | [面向会员长期满意度进行推荐](https://netflixtechblog.com/recommending-for-long-term-member-satisfaction-at-netflix-ac15cada49ef) | AI 与机器学习 | 2024 | 标题导读 |
| 178 | [用 Maestro 编排数据与机器学习工作流](https://netflixtechblog.com/maestro-netflixs-workflow-orchestrator-ee13a06f9c78) | 数据工程、AI 与机器学习 | 2024 | 标题导读 |
| 179 | [在联邦图中进行反向搜索](https://netflixtechblog.com/reverse-searching-netflixs-federated-graph-222ac5d23576) | 架构设计、搜索与召回 | 2024 | 标题导读 |
| 180 | [支撑多样化的机器学习系统](https://netflixtechblog.com/supporting-diverse-ml-systems-at-netflix-2d2e6b6d205d) | AI 与机器学习、基础设施 | 2024 | 标题导读 |
| 181 | [用微服务重建视频处理管道](https://netflixtechblog.com/rebuilding-netflix-video-processing-pipeline-with-microservices-4e5e6310e359) | 视频与媒体、架构设计 | 2024 | 标题导读 |
| 182 | [构建视频内部内容搜索](https://netflixtechblog.com/building-in-video-search-936766f0017c) | 搜索与召回、视频与媒体 | 2023 | 标题导读 |
| 183 | [在数据网格中运行流式 SQL](https://netflixtechblog.com/streaming-sql-in-data-mesh-0d83f5a00d08) | 数据工程 | 2023 | 标题导读 |
| 184 | [安全地迁移至 GraphQL](https://netflixtechblog.com/migrating-netflix-to-graphql-safely-8e1e4d4f1e72) | 架构设计 | 2023 | 标题导读 |
| 185 | [扩展媒体机器学习能力](https://netflixtechblog.com/scaling-media-machine-learning-at-netflix-f19b400243) | AI 与机器学习、视频与媒体 | 2023 | 标题导读 |
| 186 | [建设媒体理解平台以支持机器学习创新](https://netflixtechblog.com/building-a-media-understanding-platform-for-ml-innovations-9bef9962dcb7) | AI 与机器学习、视频与媒体 | 2023 | 标题导读 |
| 187 | [用机器学习寻找视觉过渡平滑的剪辑点](https://netflixtechblog.com/match-cutting-at-netflix-finding-cuts-with-smooth-visual-transitions-31c3fc14ae59) | AI 与机器学习、视频与媒体 | 2022 | 标题导读 |
| 188 | [在流媒体服务中用机器学习检测欺诈](https://netflixtechblog.com/machine-learning-for-fraud-detection-in-streaming-services-b0b4ef3be3f6) | AI 与机器学习、安全与风控 | 2022 | 标题导读 |
| 189 | [构建高吞吐、低延迟优先级队列](https://netflixtechblog.com/timestone-netflixs-high-throughput-low-latency-priority-queueing-system-with-built-in-support-1abf249ba95f) | 架构设计、性能优化 | 2022 | 标题导读 |
| 190 | [建设快速事件通知系统](https://netflixtechblog.com/rapid-event-notification-system-at-netflix-6deb1d2b57d1) | 消息与通知 | 2022 | 标题导读 |
| 191 | [构建分布式追踪基础设施](https://netflixtechblog.com/building-netflixs-distributed-tracing-infrastructure-bb856c319304) | 可观测性 | 2020 | 标题导读 |
### Notion

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 192 | [构建并扩展 Notion 数据湖](https://www.notion.com/blog/building-and-scaling-notions-data-lake) | 数据工程 | 2024 | 标题导读 |
| 193 | [用 WASM SQLite 加速浏览器中的 Notion](https://www.notion.com/blog/how-we-sped-up-notion-in-the-browser-with-wasm-sqlite) | 性能优化、前端体验 | 2024 | 标题导读 |
| 194 | [通过不停机重新分片增加 Postgres 容量](https://www.notion.com/blog/the-great-re-shard) | 数据库 | 2023 | 标题导读 |
| 195 | [设计并创建 Notion API](https://www.notion.com/blog/creating-the-notion-api) | 架构设计 | 2022 | 标题导读 |
| 196 | [理解支撑 Notion 灵活性的数据模型](https://www.notion.com/blog/data-model-behind-notion) | 架构设计、数据库 | 2021 | 标题导读 |
| 197 | [总结 Postgres 分片的实践经验](https://www.notion.com/blog/sharding-postgres-at-notion) | 数据库 | 2021 | 标题导读 |
### PayPal

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 198 | [用 Cosmos.AI 平台扩展 AI 能力](https://medium.com/paypal-tech/scaling-paypals-ai-capabilities-with-paypal-cosmos-ai-platform-e67a48e04691) | AI 与机器学习、基础设施 | 2024 | 标题导读 |
| 199 | [扩展 Kafka 以应对数据增长](https://medium.com/paypal-tech/scaling-kafka-to-support-paypals-data-growth-a0b4da420fab) | 数据工程 | 2023 | 标题导读 |
| 200 | [理解 PayPal 的 JunoDB 键值存储](https://medium.com/paypal-tech/unlocking-the-power-of-junodb-paypals-key-value-store-goes-open-source-ee85f935bdc1) | 数据库 | 2023 | 标题导读 |
| 201 | [扩展 Kubernetes 至数千节点与数十万 Pod](https://medium.com/paypal-tech/scaling-kubernetes-to-over-4k-nodes-and-200k-pods-29988fad6ed) | 基础设施 | 2022 | 标题导读 |
| 202 | [回顾 GraphQL 在 PayPal 的采用过程](https://medium.com/paypal-tech/graphql-at-paypal-an-adoption-story-b7e01175f2b7) | 架构设计 | 2021 | 标题导读 |
| 203 | [使用实时图数据库与图分析打击欺诈](https://medium.com/paypal-tech/how-paypal-uses-real-time-graph-database-and-graph-analysis-to-fight-fraud-96a2b918619a) | 安全与风控、数据库 | 2021 | 标题导读 |
| 204 | [构建下一代数据传输平台](https://medium.com/paypal-tech/next-gen-data-movement-platform-at-paypal-100f70a7a6b) | 数据工程 | 2021 | 标题导读 |
| 205 | [部署大规模反欺诈机器学习模型](https://medium.com/paypal-tech/machine-learning-model-ci-cd-and-shadow-platform-8c4f44998c78) | AI 与机器学习、安全与风控 | 2021 | 标题导读 |
### Pinterest

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 206 | [用大语言模型改善搜索相关性](https://medium.com/pinterest-engineering/improving-pinterest-search-relevance-using-large-language-models-4cd938d4e892) | AI 与机器学习、搜索与召回 | 2025 | 标题导读 |
| 207 | [构建自然语言转 SQL 功能](https://medium.com/pinterest-engineering/how-we-built-text-to-sql-at-pinterest-30bad30dabff) | AI 与机器学习、数据工程 | 2024 | 标题导读 |
| 208 | [建设变更数据捕获能力](https://medium.com/pinterest-engineering/change-data-capture-at-pinterest-7e4c357ac527) | 数据工程 | 2024 | 标题导读 |
| 209 | [实时检测业务与系统异常](https://medium.com/pinterest-engineering/warden-real-time-anomaly-detection-at-pinterest-210c122f6afa) | 可观测性 | 2023 | 标题导读 |
| 210 | [提升分布式缓存的性能与效率](https://medium.com/pinterest-engineering/improving-distributed-caching-performance-and-efficiency-at-pinterest-92484b5fe39b) | 缓存 | 2022 | 标题导读 |
| 211 | [利用实时用户行为改善首页互动](https://medium.com/pinterest-engineering/how-pinterest-leverages-realtime-user-actions-in-recommendation-to-boost-homefeed-engagement-volume-165ae2e8cde8) | AI 与机器学习、搜索与召回 | 2022 | 标题导读 |
| 212 | [大幅扩展广告候选集合](https://medium.com/pinterest-engineering/how-we-scaled-the-size-of-pinterests-ad-corpus-by-60x-d6d5bfa6bf16) | 性能优化 | 2021 | 标题导读 |
| 213 | [用机器学习投放相关广告](https://medium.com/pinterest-engineering/the-machine-learning-behind-delivering-relevant-ads-8987fc5ba1c0) | AI 与机器学习 | 2021 | 标题导读 |
### Quora

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 214 | [构建基于向量表示的搜索](https://quoraengineering.quora.com/Building-Embedding-Search-at-Quora) | 搜索与召回、AI 与机器学习 | 2024 | 标题导读 |
| 215 | [将多年 Redshift 分析负载迁移至 Trino](https://quoraengineering.quora.com/Migrating-a-decade-of-Redshift-usages-to-Trino-at-Quora) | 数据工程 | 2024 | 标题导读 |
| 216 | [平衡 Trino 的成本、速度与可靠性](https://quoraengineering.quora.com/Trino-at-Quora-Scale-Cost-Speed-and-Reliability) | 数据工程、性能优化 | 2023 | 标题导读 |
| 217 | [在 Quora 实施 MySQL 分片](https://quoraengineering.quora.com/MySQL-sharding-at-Quora) | 数据库 | 2020 | 标题导读 |
### Razorpay

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 218 | [重构 Razorpay 身份认证系统](https://engineering.razorpay.com/razorpays-authentication-revamp-turbocharging-performance-b8bb9d750fe8) | 性能优化、安全与风控 | 2023 | 标题导读 |
| 219 | [构建开发者控制台](https://engineering.razorpay.com/the-making-of-developer-console-978018ce2aed) | 前端体验 | 2023 | 标题导读 |
| 220 | [降低数据平台成本](https://engineering.razorpay.com/reducing-data-platform-cost-by-2m-d8f82285c4ae) | 成本优化 | 2023 | 标题导读 |
| 221 | [降低 Kubernetes 运行成本](https://engineering.razorpay.com/the-culture-of-cost-optimization-reducing-kubernetes-cost-by-300-000-32611cdd19d9) | 成本优化、基础设施 | 2023 | 标题导读 |
| 222 | [发现重复或欺诈商户](https://engineering.razorpay.com/how-does-razorpay-capital-detect-duplicate-or-fraud-merchants-5ddc67e1535a) | 安全与风控、AI 与机器学习 | 2023 | 标题导读 |
| 223 | [构建实时反规范化数据流平台](https://engineering.razorpay.com/real-time-denormalized-data-streaming-platform-part-3-optimisations-and-monitoring-5f7a58d9d97) | 数据工程 | 2023 | 标题导读 |
| 224 | [让通知服务承载持续增长的负载](https://engineering.razorpay.com/how-razorpays-notification-service-handles-increasing-load-f787623a490f) | 消息与通知、性能优化 | 2022 | 标题导读 |
| 225 | [用 Trino 与 Alluxio 支撑数据分析](https://engineering.razorpay.com/how-trino-and-alluxio-power-analytics-at-razorpay-803d3386daaf) | 数据工程 | 2022 | 标题导读 |
| 226 | [应对 IPL 赛事期间的突发流量](https://engineering.razorpay.com/ipl-razorpays-second-innings-ae7c86b0894c) | 性能优化、基础设施 | 2021 | 标题导读 |
### Reddit

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 227 | [演进 Reddit 媒体基础设施](https://www.reddit.com/r/RedditEng/comments/1k4o2mc/evolving_reddits_media_infrastructure/) | 视频与媒体、基础设施 | 2025 | 标题导读 |
| 228 | [扩展基于 Flink 的实时广告事件验证管道](https://www.reddit.com/r/RedditEng/comments/1ijcfge/scaling_our_apache_flink_powered_realtime_ad/) | 数据工程 | 2025 | 标题导读 |
| 229 | [扩展广告投放系统](https://www.reddit.com/r/RedditEng/comments/1gzua17/scaling_ads_serving_find_and_eliminate_redundant/) | 性能优化 | 2024 | 标题导读 |
| 230 | [为动态商品广告生成商品候选项](https://www.reddit.com/r/RedditEng/comments/1gug4x9/product_candidate_generation_for_reddit_dynamic/) | AI 与机器学习 | 2024 | 标题导读 |
| 231 | [将广告投放节奏控制从单实例改为分片](https://www.reddit.com/r/RedditEng/comments/1e5mhs3/scaling_ads_pacing_from_singleton_to_sharded/) | 架构设计 | 2024 | 标题导读 |
| 232 | [在广告漏斗中引入全局召回排序模型](https://www.reddit.com/r/RedditEng/comments/1d2wfsd/introducing_a_global_retrieval_ranking_model_in/) | AI 与机器学习 | 2024 | 标题导读 |
| 233 | [构建基于实验的路由服务](https://www.reddit.com/r/RedditEng/comments/1c4pkql/building_an_experimentbased_routing_service/) | 架构设计 | 2023 | 标题导读 |
| 234 | [设计 Reddit 媒体元数据存储](https://www.reddit.com/r/RedditEng/comments/1avlywv/the_reddit_media_metadata_store/) | 视频与媒体、数据库 | 2023 | 标题导读 |
### Salesforce

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 235 | [扩展低延迟实时搜索服务](https://engineering.salesforce.com/scaling-real-time-search-to-30-billion-queries-with-sub-second-latency-and-0-downtime/) | 搜索与召回、性能优化 | 2025 | 标题导读 |
| 236 | [扩展支撑海量预测的智能体 AI 系统](https://engineering.salesforce.com/agentforce-scaling-agentic-ai-for-enterprise-automation-observability-powering-2-billion-predictions-monthly/) | AI 与机器学习 | 2025 | 标题导读 |
| 237 | [用 Agentforce Data Library 支撑高可用 RAG](https://engineering.salesforce.com/optimizing-ai-retrieval-how-agentforce-data-library-powers-rag-with-99-99-uptime/) | AI 与机器学习 | 2025 | 标题导读 |
| 238 | [管理高并发训练与元数据请求](https://engineering.salesforce.com/scaling-ai-systems-secrets-for-managing-100000-training-and-metadata-requests-per-minute/) | AI 与机器学习、基础设施 | 2024 | 标题导读 |
| 239 | [理解 Agentforce 的核心设计](https://engineering.salesforce.com/inside-the-brain-of-agentforce-revealing-the-atlas-reasoning-engine/) | AI 与机器学习 | 2024 | 标题导读 |
| 240 | [让生成式 AI 服务支持数百万用户](https://engineering.salesforce.com/scaling-generative-ai-how-salesforce-supports-millions-of-users-seamlessly/) | AI 与机器学习、基础设施 | 2024 | 标题导读 |
| 241 | [建设可扩展的时间序列预测 AI 平台](https://engineering.salesforce.com/inside-salesforces-scalable-time-series-forecasting-ai-platform/) | AI 与机器学习、数据工程 | 2024 | 标题导读 |
| 242 | [用 Data Cloud 处理超大规模事务负载](https://engineering.salesforce.com/the-unstructured-data-dilemma-how-data-cloud-handles-250-trillion-transactions-weekly/) | 数据工程、性能优化 | 2024 | 标题导读 |
### Shopify

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 243 | [用实时机器学习理解消费者搜索意图](https://shopify.engineering/how-shopify-improved-consumer-search-intent-with-real-time-ml) | AI 与机器学习、搜索与召回 | 2024 | 标题导读 |
| 244 | [用 Vitess 水平扩展 Rails 后端](https://shopify.engineering/horizontally-scaling-the-rails-backend-of-shop-app-with-vitess) | 数据库、性能优化 | 2024 | 标题导读 |
| 245 | [改善 Shopify 移动应用性能](https://shopify.engineering/improving-shopify-app-s-performance) | 性能优化、移动应用 | 2024 | 标题导读 |
| 246 | [构建 ShopifyQL 代码编辑器](https://shopify.engineering/building-a-shopifyql-code-editor) | 前端体验 | 2023 | 标题导读 |
| 247 | [用 Shopify Functions 实现灵活订单路由](https://shopify.engineering/creating-a-flexible-order-routing-system-with-shopify-functions) | 架构设计 | 2023 | 标题导读 |
| 248 | [用服务端发送事件简化实时数据流](https://shopify.engineering/server-sent-events-data-streaming) | 架构设计、数据工程 | 2022 | 标题导读 |
| 249 | [捕获分片单体应用中的每次数据变更](https://shopify.engineering/capturing-every-change-shopify-sharded-monolith) | 数据工程、架构设计 | 2021 | 标题导读 |
### Slack

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 250 | [加速端到端测试流水线](https://slack.engineering/speedup-e2e-testing/) | 基础设施 | 2025 | 标题导读 |
| 251 | [为企业搜索保护安全与隐私](https://slack.engineering/how-we-built-enterprise-search-to-be-secure-and-private/) | 搜索与召回、安全与风控 | 2025 | 标题导读 |
| 252 | [演进 Chef 基础设施](https://slack.engineering/advancing-our-chef-infrastructure/) | 基础设施 | 2024 | 标题导读 |
| 253 | [为最大规模客户重构 Slack](https://slack.engineering/unified-grid-how-we-re-architected-slack-for-our-largest-customers/) | 架构设计 | 2024 | 标题导读 |
| 254 | [自动检测被盗会话 Cookie](https://slack.engineering/catching-compromised-cookies/) | 安全与风控 | 2024 | 标题导读 |
| 255 | [从用户视角追踪请求流转路径](https://slack.engineering/traffic-101-packets-mostly-flow/) | 架构设计 | 2023 | 标题导读 |
| 256 | [用单元化架构缩小故障影响范围](https://slack.engineering/slacks-migration-to-a-cellular-architecture/) | 架构设计 | 2023 | 原文总结 |
| 257 | [理解 Slack 的实时消息系统](https://slack.engineering/real-time-messaging/) | 消息与通知 | 2023 | 标题导读 |
| 258 | [跨系统追踪通知的流转过程](https://slack.engineering/tracing-notifications/) | 可观测性、消息与通知 | 2023 | 标题导读 |
| 259 | [建设端到端统一推荐基础设施](https://slack.engineering/recommend-api/) | AI 与机器学习 | 2023 | 标题导读 |
| 260 | [总结 Slack API 设计方法](https://slack.engineering/how-we-design-our-apis-at-slack/) | 架构设计 | 2021 | 标题导读 |
| 261 | [用最终一致的数据模型预测 Slack Connect 邀请](https://slack.engineering/email-classification/) | AI 与机器学习、架构设计 | 2021 | 标题导读 |
| 262 | [将海量并发 WebSocket 连接迁移到 Envoy](https://slack.engineering/migrating-millions-of-concurrent-websockets-to-envoy/) | 基础设施、消息与通知 | 2021 | 标题导读 |
| 263 | [通过 Vitess 扩展数据存储](https://slack.engineering/scaling-datastores-at-slack-with-vitess/) | 数据库 | 2020 | 标题导读 |
### Snap

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 264 | [介绍 Bento 机器学习平台](https://eng.snap.com/introducing-bento) | AI 与机器学习、基础设施 | 2025 | 标题导读 |
| 265 | [为视频推荐构建向量召回](https://eng.snap.com/embedding-based-retrieval) | AI 与机器学习、搜索与召回 | 2023 | 标题导读 |
| 266 | [加速推荐系统特征工程](https://eng.snap.com/speed-up-feature-engineering) | AI 与机器学习、数据工程 | 2022 | 标题导读 |
| 267 | [用合成数据加快机器学习模型开发](https://eng.snap.com/synthetic-data-for-machine-learning) | AI 与机器学习 | 2022 | 标题导读 |
| 268 | [使用 TPU 训练大规模推荐模型](https://eng.snap.com/training-models-with-tpus) | AI 与机器学习、基础设施 | 2022 | 标题导读 |
| 269 | [用机器学习进行广告排序](https://eng.snap.com/machine-learning-snap-ad-ranking) | AI 与机器学习 | 2022 | 标题导读 |
### Spotify

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 270 | [生成海量内容标注](https://engineering.atspotify.com/2024/10/how-we-generated-millions-of-content-annotations/) | AI 与机器学习、数据工程 | 2024 | 标题导读 |
| 271 | [理解 Spotify 数据平台](https://engineering.atspotify.com/2024/05/data-platform-explained-part-ii/) | 数据工程 | 2024 | 标题导读 |
| 272 | [系统性地控制移动应用体积](https://engineering.atspotify.com/2023/11/the-what-why-and-how-of-mastering-app-size/) | 移动应用、性能优化 | 2023 | 标题导读 |
| 273 | [自动化内容营销以扩大用户获取](https://engineering.atspotify.com/2023/11/how-we-automated-content-marketing-to-acquire-users-at-scale/) | AI 与机器学习 | 2023 | 标题导读 |
| 274 | [建设用户规模预测基础设施](https://engineering.atspotify.com/2022/06/how-we-built-infrastructure-to-run-user-forecasts-at-spotify/) | 基础设施、AI 与机器学习 | 2022 | 标题导读 |
### Stripe

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 275 | [用 Ledger 追踪并验证资金流动](https://stripe.com/blog/ledger-stripe-system-for-tracking-and-validating-money-movement) | 支付系统、架构设计 | 2024 | 标题导读 |
| 276 | [通过不停机数据库迁移支撑大规模支付](https://stripe.com/blog/how-stripes-document-databases-supported-99.999-uptime-with-zero-downtime-data-migrations) | 数据库、支付系统 | 2023 | 标题导读 |
| 277 | [构建 Stripe Radar 反欺诈系统](https://stripe.com/blog/how-we-built-it-stripe-radar) | 安全与风控、支付系统 | 2023 | 标题导读 |
| 278 | [用 Markdoc 构建交互式文档](https://stripe.com/blog/markdoc) | 前端体验 | 2022 | 标题导读 |
| 279 | [回顾支付 API 的十年设计演进](https://stripe.com/blog/payment-api-design) | 架构设计、支付系统 | 2020 | 标题导读 |
### Swiggy

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 280 | [使用 Hermes 将自然语言转换为 SQL](https://bytes.swiggy.com/hermes-a-text-to-sql-solution-at-swiggy-81573fb4fb6e) | AI 与机器学习、数据工程 | 2024 | 标题导读 |
| 281 | [优化拣货流程以加快配送](https://bytes.swiggy.com/optimizing-the-picking-process-to-enable-faster-deliveries-for-instamart-93de0fe9d819) | AI 与机器学习 | 2024 | 标题导读 |
| 282 | [用小语言模型改善本地餐饮搜索相关性](https://bytes.swiggy.com/improving-search-relevance-in-hyperlocal-food-delivery-using-small-language-models-ecda2acc24e6) | AI 与机器学习、搜索与召回 | 2024 | 标题导读 |
| 283 | [在购物车阶段预测送达时间](https://bytes.swiggy.com/predicting-food-delivery-time-at-cart-cda23a84ba63) | AI 与机器学习 | 2023 | 标题导读 |
| 284 | [用上下文多臂老虎机进行广告推荐](https://bytes.swiggy.com/contextual-bandits-for-ads-recommendations-ec210775fcf) | AI 与机器学习 | 2022 | 标题导读 |
| 285 | [用深度学习检测地址文本与位置不一致](https://bytes.swiggy.com/using-deep-learning-to-detect-dissonance-between-address-text-and-location-4b228bc2c3fb) | AI 与机器学习 | 2022 | 标题导读 |
| 286 | [设计具有韧性的微服务](https://bytes.swiggy.com/designing-resilient-microservices-part-1-6a72fe964759) | 架构设计 | 2021 | 标题导读 |
| 287 | [构建大规模配送可服务性平台](https://bytes.swiggy.com/designing-the-serviceability-platform-at-swiggy-for-high-scale-part-2-ab20365fbc23) | 架构设计、性能优化 | 2021 | 标题导读 |
| 288 | [概览 Swiggy 的工程挑战](https://bytes.swiggy.com/engineering-challenges-at-swiggy-430dea6c86a3) | 架构设计 | 2021 | 标题导读 |
| 289 | [重构物流系统](https://bytes.swiggy.com/re-architecting-swiggys-logistics-systems-ddf301a29fa0) | 架构设计 | 2021 | 标题导读 |
| 290 | [用深度学习为菜品搜索排序](https://bytes.swiggy.com/using-deep-learning-for-ranking-in-dish-search-4df2772dddce) | AI 与机器学习、搜索与召回 | 2021 | 标题导读 |
| 291 | [学习预测两轮车行驶距离](https://bytes.swiggy.com/learning-to-predict-two-wheeler-travel-distance-752d836d741d) | AI 与机器学习 | 2021 | 标题导读 |
| 292 | [学习餐厅排序模型](https://bytes.swiggy.com/learning-to-rank-restaurants-c6a69ba4b330) | AI 与机器学习、搜索与召回 | 2021 | 标题导读 |
| 293 | [大规模执行地理位置查询](https://bytes.swiggy.com/running-geo-queries-at-scale-adea70f5af45) | 数据库、性能优化 | 2020 | 标题导读 |
| 294 | [规模化部署深度学习模型](https://bytes.swiggy.com/deploying-deep-learning-models-at-scale-at-swiggy-tensorflow-serving-on-dsp-ad5da40f7a6c) | AI 与机器学习、基础设施 | 2020 | 标题导读 |
### Tinder

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 295 | [建立 Tinder API 风格规范](https://medium.com/tinder/tinder-api-style-guide-part-1-081804a7ef40) | 架构设计 | 2024 | 标题导读 |
| 296 | [构建 Obsidian 设计系统](https://medium.com/tinder/building-obsidian-tinders-design-system-e127770d8e3f) | 前端体验 | 2023 | 标题导读 |
| 297 | [建设 Tinder API 网关](https://medium.com/tinder/how-we-built-the-tinder-api-gateway-831c6ca5ceca) | 架构设计、基础设施 | 2022 | 标题导读 |
| 298 | [用状态机扩展 Android 支付流程](https://medium.com/tinder/scaling-out-tinder-android-payment-flow-using-state-machine-e14ef0591b6) | 移动应用、支付系统 | 2020 | 标题导读 |
### Twitch

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 299 | [在全球范围接入直播视频流](https://blog.twitch.tv/en/2022/04/26/ingesting-live-video-streams-at-global-scale/) | 视频与媒体、基础设施 | 2022 | 标题导读 |
| 300 | [拆分 Twitch 单体应用](https://blog.twitch.tv/en/2022/04/12/breaking-the-monolith-at-twitch-part-2/) | 架构设计 | 2022 | 标题导读 |
| 301 | [使用机器学习审核表情内容](https://blog.twitch.tv/en/2022/06/22/smarter-better-faster-using-machine-learning-to-review-emotes/) | AI 与机器学习 | 2022 | 标题导读 |
| 302 | [通过威胁建模与防御设计提高可用性](https://blog.twitch.tv/en/2021/11/16/defend-your-castle-high-availability-for-high-stakes-cloud-services/) | 安全与风控、基础设施 | 2021 | 标题导读 |
### Twitter/X

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 303 | [理解 Twitter 推荐算法](https://blog.x.com/engineering/en_us/topics/open-source/2023/twitter-recommendation-algorithm) | AI 与机器学习、搜索与召回 | 2023 | 标题导读 |
| 304 | [扩展用户数据库的读取能力](https://blog.x.com/engineering/en_us/topics/infrastructure/2023/how-we-scaled-reads-on-the-twitter-users-database) | 数据库、性能优化 | 2023 | 标题导读 |
| 305 | [用 Druid 支撑实时数据分析](https://blog.x.com/engineering/en_us/topics/infrastructure/2022/powering-real-time-data-analytics-with-druid-at-twitter) | 数据工程 | 2022 | 标题导读 |
| 306 | [构建高可靠广告投放节奏控制服务](https://blog.x.com/engineering/en_us/topics/infrastructure/2021/how-we-built-twitter-s-highly-reliable-ads-pacing-service) | 架构设计 | 2021 | 标题导读 |
| 307 | [存取每秒数百万条广告曝光记录](https://blog.x.com/engineering/en_us/topics/infrastructure/2021/storing-and-retrieving-millions-of-ad-impressions-per-second) | 数据库、性能优化 | 2021 | 标题导读 |
| 308 | [实时处理数十亿事件](https://blog.x.com/engineering/en_us/topics/infrastructure/2021/processing-billions-of-events-in-real-time-at-twitter-) | 数据工程 | 2021 | 标题导读 |
| 309 | [理解 Twitter 日志系统](https://blog.x.com/engineering/en_us/topics/infrastructure/2021/logging-at-twitter-updated) | 可观测性 | 2021 | 标题导读 |
| 310 | [通过分片与简化设计演进广告服务平台](https://blog.x.com/engineering/en_us/topics/infrastructure/2021/sharding-simplification-and-twitters-ads-serving-platform) | 架构设计 | 2021 | 标题导读 |
### Uber

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 311 | [将计算平台迁移至 Kubernetes](https://www.uber.com/en-IN/blog/migrating-ubers-compute-platform-to-kubernetes-a-technical-journey/?uclick_id=b4e6f2b7-b4a5-446a-beeb-0cc53334b2fe) | 基础设施 | 2025 | 标题导读 |
| 312 | [理解 MySQL 在 Uber 的应用](https://www.uber.com/en-IN/blog/mysql-at-uber/) | 数据库 | 2025 | 标题导读 |
| 313 | [使用 Ray 优化出行业务](https://www.uber.com/en-IN/blog/how-uber-uses-ray-to-optimize-the-rides-business/) | AI 与机器学习 | 2025 | 标题导读 |
| 314 | [结合开源与自研能力优化大模型训练](https://www.uber.com/en-IN/blog/open-source-and-in-house-how-uber-optimizes-llm-training/) | AI 与机器学习 | 2024 | 标题导读 |
| 315 | [用 QueryGPT 将自然语言转换为 SQL](https://www.uber.com/en-IN/blog/query-gpt/) | AI 与机器学习 | 2024 | 标题导读 |
| 316 | [升级基于 Lucene 的搜索平台](https://www.uber.com/en-IN/blog/lucene-version-upgrade/) | 搜索与召回 | 2024 | 标题导读 |
| 317 | [在 iOS 上实现实时活动功能](https://www.uber.com/en-IN/blog/live-activity-on-ios/) | 移动应用 | 2024 | 标题导读 |
| 318 | [用 Odin 管理有状态平台](https://www.uber.com/en-IN/blog/odin-stateful-platform/) | 基础设施 | 2024 | 标题导读 |
| 319 | [在 Kafka 中使用分层存储](https://www.uber.com/en-IN/blog/kafka-tiered-storage/) | 数据工程 | 2024 | 标题导读 |
| 320 | [用 CLP 改造日志系统](https://www.uber.com/en-IN/blog/modernizing-logging-with-clp-ii/) | 可观测性 | 2024 | 标题导读 |
| 321 | [让 Cassandra 容忍单可用区故障](https://www.uber.com/en-IN/blog/single-zone-failure-tolerance/) | 数据库、基础设施 | 2024 | 标题导读 |
| 322 | [用 LedgerStore 支撑万亿级索引](https://www.uber.com/en-IN/blog/how-ledgerstore-supports-trillions-of-indexes/) | 数据库 | 2024 | 标题导读 |
| 323 | [均衡数据湖中的 HDFS 数据节点](https://www.uber.com/en-IN/blog/balancing-hdfs-datanodes-in-the-uber-datalake/) | 数据工程 | 2024 | 标题导读 |
| 324 | [用集成缓存支撑高并发在线存储读取](https://www.uber.com/en-IN/blog/how-uber-serves-over-40-million-reads-per-second-using-an-integrated-cache/) | 缓存、性能优化 | 2024 | 标题导读 |
| 325 | [优化大规模 Cassandra 运维](https://www.uber.com/en-IN/blog/how-uber-optimized-cassandra-operations-at-scale/) | 数据库 | 2023 | 标题导读 |
| 326 | [结合机器学习与线性规划优化推送时机](https://www.uber.com/en-IN/blog/how-uber-optimizes-push-notifications-using-ml/) | AI 与机器学习、消息与通知 | 2022 | 标题导读 |
| 327 | [为 Uber Eats 图片去重并管理存储](https://www.uber.com/en-IN/blog/deduping-and-storing-images-at-uber-eats/) | 基础设施 | 2022 | 标题导读 |
| 328 | [用 gRPC 构建新一代推送平台](https://www.uber.com/en-IN/blog/ubers-next-gen-push-platform-on-grpc/) | 消息与通知、基础设施 | 2022 | 标题导读 |
| 329 | [将高扩展分布式 Shuffle 作为服务提供](https://www.uber.com/en-IN/blog/ubers-highly-scalable-and-distributed-shuffle-as-a-service/) | 数据工程 | 2022 | 标题导读 |
| 330 | [用深度学习预测到达时间](https://www.uber.com/en-IN/blog/deepeta-how-uber-predicts-arrival-times/) | AI 与机器学习 | 2022 | 标题导读 |
| 331 | [用 Flink、Kafka 与 Pinot 实现恰好一次广告事件处理](https://www.uber.com/en-IN/blog/real-time-exactly-once-ad-event-processing/) | 数据工程 | 2021 | 标题导读 |
### Walmart

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 332 | [为 Cassandra 构建变更数据捕获方案](https://medium.com/walmartglobaltech/walmarts-cassandra-cdc-solution-6fc650031a3) | 数据工程、数据库 | 2022 | 标题导读 |
| 333 | [扩展库存预留 API 以应对高峰流量](https://medium.com/walmartglobaltech/scaling-the-walmart-inventory-reservations-api-for-peak-traffic-9ba37833ef9d) | 性能优化、架构设计 | 2022 | 标题导读 |
| 334 | [用马尔可夫链描述生鲜商品拣货过程](https://medium.com/walmartglobaltech/a-markov-chain-formulation-of-grocery-item-picking-process-54c65a3ec5b5) | AI 与机器学习 | 2021 | 标题导读 |
| 335 | [重建自动补全后端](https://medium.com/walmartglobaltech/how-we-rebuilt-the-walmart-autocomplete-backend-10efe71d624a) | 搜索与召回、性能优化 | 2021 | 标题导读 |
| 336 | [为微服务应用构建通知框架](https://medium.com/walmartglobaltech/building-a-notification-framework-for-microservice-based-application-6fe5ac9dfcee) | 消息与通知、架构设计 | 2021 | 标题导读 |
### Zomato

| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |
| :--- | :--- | :--- | :--- | :--- |
| 337 | [用 ClickHouse 构建低成本 PB 级日志平台](https://blog.zomato.com/building-a-cost-effective-logging-platform-using-clickhouse-for-petabyte-scale) | 可观测性、成本优化 | 2023 | 标题导读 |
| 338 | [处理每日上亿次搜索查询](https://blog.zomato.com/explained-how-zomato-handles-100-million-daily-search-queries-part-three) | 搜索与召回、性能优化 | 2023 | 标题导读 |
| 339 | [用机器学习支撑餐厅广告](https://blog.zomato.com/powering-restaurant-ads-on-zomato) | AI 与机器学习 | 2022 | 标题导读 |
| 340 | [用向量表示识别并聚类地址](https://blog.zomato.com/unique-addresses) | AI 与机器学习 | 2022 | 标题导读 |
| 341 | [预测订单的食物准备时间](https://blog.zomato.com/predicting-fpt-optimally) | AI 与机器学习 | 2022 | 标题导读 |
| 342 | [改善用户位置识别](https://blog.zomato.com/to-help-us-locate-you-better) | 移动应用 | 2021 | 标题导读 |
| 343 | [探索食物准备时间预测的技术方法](https://blog.zomato.com/food-preparation-time) | AI 与机器学习 | 2020 | 标题导读 |
