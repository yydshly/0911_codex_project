/* 来源及 MIT 版权声明见 LICENSE.txt；由 scripts/build-data.cjs 生成。 */
window.CASEBOOK = {
  "meta": {
    "repo": "https://github.com/ashishps1/awesome-engineering-articles",
    "commit": "9ef9509126254406440c0e5ee09f609d0876418a",
    "snapshotDate": "2026-03-01",
    "collectedAt": "2026-09-10",
    "total": 343,
    "companies": 39,
    "reviewed": 6
  },
  "topics": {
    "Architecture": {
      "label": "架构设计",
      "prompt": "关注系统边界、依赖关系和演进成本：问题出现在哪个环节，增加复杂度的收益是否明确？"
    },
    "Databases": {
      "label": "数据库",
      "prompt": "关注读写比例、数据规模、一致性与迁移验证：什么条件下才需要分片或更换存储？"
    },
    "Caching": {
      "label": "缓存",
      "prompt": "关注命中率、热点、失效与回源压力：性能收益会带来哪些一致性和运维成本？"
    },
    "Search": {
      "label": "搜索与召回",
      "prompt": "关注查询形态、候选召回与排序：如何同时衡量相关性、延迟和资源开销？"
    },
    "AI/ML": {
      "label": "AI 与机器学习",
      "prompt": "关注数据来源、评估方法与线上反馈：模型效果是否改善了业务结果，如何识别回归？"
    },
    "Data Engineering": {
      "label": "数据工程",
      "prompt": "关注数据时效、质量、重复处理与重放：数据管道如何发现并恢复异常？"
    },
    "Infrastructure": {
      "label": "基础设施",
      "prompt": "关注容量、故障边界和恢复路径：如何验证服务在故障与扩容期间仍可工作？"
    },
    "Performance": {
      "label": "性能优化",
      "prompt": "关注真实瓶颈与延迟分布：基线、负载条件和优化后的资源代价是什么？"
    },
    "Messaging": {
      "label": "消息与通知",
      "prompt": "关注投递语义、顺序、背压和用户体验：重复、丢失与积压如何被发现和处理？"
    },
    "Frontend": {
      "label": "前端体验",
      "prompt": "关注加载过程、交互反馈与设备差异：优化是否改善了用户可感知的等待时间？"
    },
    "Mobile": {
      "label": "移动应用",
      "prompt": "关注设备、弱网、耗电与包体积：不同终端上的收益与成本是否一致？"
    },
    "Security": {
      "label": "安全与风控",
      "prompt": "关注威胁模型、误报漏报和权限边界：系统如何验证检测质量与处置效果？"
    },
    "Payments": {
      "label": "支付系统",
      "prompt": "关注状态流转、重试与核对：异常中断后如何判断操作是否已经生效？"
    },
    "Observability": {
      "label": "可观测性",
      "prompt": "关注指标定义、追踪关联和排障成本：怎样从异常信号找到可执行的诊断线索？"
    },
    "Cost Optimization": {
      "label": "成本优化",
      "prompt": "关注完整成本和回本周期：节省是否包含迁移、维护、读取及可靠性代价？"
    },
    "Video/Media": {
      "label": "视频与媒体",
      "prompt": "关注处理链路、质量和资源消耗：上传、编码、分发或理解环节的主要约束是什么？"
    }
  },
  "articles": [
    {
      "id": "001",
      "order": 1,
      "sourceNumber": 1,
      "company": "Airbnb",
      "title": "Embedding-Based Retrieval for Airbnb Search",
      "url": "https://medium.com/airbnb-engineering/embedding-based-retrieval-for-airbnb-search-aabebfc85839",
      "topics": [
        "Search",
        "AI/ML"
      ],
      "year": 2025,
      "guide": "用向量表示改进 Airbnb 搜索召回",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "002",
      "order": 2,
      "sourceNumber": 2,
      "company": "Airbnb",
      "title": "How Airbnb improved page performance using HTTP Streaming",
      "url": "https://medium.com/airbnb-engineering/improving-performance-with-http-streaming-ba9e72c66408",
      "topics": [
        "Performance",
        "Frontend"
      ],
      "year": 2023,
      "guide": "通过 HTTP 流式传输改善页面性能",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "003",
      "order": 3,
      "sourceNumber": 3,
      "company": "Airbnb",
      "title": "Airbnb's Data Framework for faster and more reliable read-heavy workloads",
      "url": "https://medium.com/airbnb-engineering/riverbed-optimizing-data-access-at-airbnbs-scale-c37ecf6456d9",
      "topics": [
        "Data Engineering",
        "Performance"
      ],
      "year": 2023,
      "guide": "为读密集负载构建更快、更可靠的数据访问框架",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "004",
      "order": 4,
      "sourceNumber": 4,
      "company": "Airbnb",
      "title": "Avoiding Double Payments in a Distributed Payments System",
      "url": "https://medium.com/airbnb-engineering/avoiding-double-payments-in-a-distributed-payments-system-2981f6b070bb",
      "topics": [
        "Payments",
        "Architecture"
      ],
      "year": 2019,
      "guide": "避免分布式支付系统中的重复付款",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "005",
      "order": 5,
      "sourceNumber": 1,
      "company": "Amazon Science",
      "title": "Training code generation models to debug their own outputs",
      "url": "https://www.amazon.science/blog/training-code-generation-models-to-debug-their-own-outputs",
      "topics": [
        "AI/ML"
      ],
      "year": 2025,
      "guide": "训练代码生成模型调试自己的输出",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "006",
      "order": 6,
      "sourceNumber": 2,
      "company": "Amazon Science",
      "title": "The technology behind Amazon's GenAI-powered shopping assistant, Rufus",
      "url": "https://www.amazon.science/blog/the-technology-behind-amazons-genai-powered-shopping-assistant-rufus",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "探索生成式 AI 购物助手 Rufus 的技术设计",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "007",
      "order": 7,
      "sourceNumber": 3,
      "company": "Amazon Science",
      "title": "Ensuring that customers don't miss out on trending products",
      "url": "https://www.amazon.science/blog/ensuring-that-customers-dont-miss-out-on-trending-products",
      "topics": [
        "Search",
        "AI/ML"
      ],
      "year": 2023,
      "guide": "让顾客及时发现热门商品",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "008",
      "order": 8,
      "sourceNumber": 4,
      "company": "Amazon Science",
      "title": "From structured search to learning-to-rank-and-retrieve",
      "url": "https://www.amazon.science/blog/from-structured-search-to-learning-to-rank-and-retrieve",
      "topics": [
        "Search",
        "AI/ML"
      ],
      "year": 2023,
      "guide": "从结构化搜索走向学习排序与召回",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "009",
      "order": 9,
      "sourceNumber": 5,
      "company": "Amazon Science",
      "title": "Invalidating robotic ad clicks in real time",
      "url": "https://www.amazon.science/blog/invalidating-robotic-ad-clicks-in-real-time",
      "topics": [
        "Security",
        "Data Engineering"
      ],
      "year": 2023,
      "guide": "实时识别并剔除机器人广告点击",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "010",
      "order": 10,
      "sourceNumber": 6,
      "company": "Amazon Science",
      "title": "Using large language models (LLMs) to synthesize training data",
      "url": "https://www.amazon.science/blog/using-large-language-models-llms-to-synthesize-training-data",
      "topics": [
        "AI/ML"
      ],
      "year": 2023,
      "guide": "使用大语言模型合成训练数据",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "011",
      "order": 11,
      "sourceNumber": 7,
      "company": "Amazon Science",
      "title": "Lessons learned from 10 years of DynamoDB",
      "url": "https://www.amazon.science/blog/lessons-learned-from-10-years-of-dynamodb",
      "topics": [
        "Databases"
      ],
      "year": 2022,
      "guide": "回顾 DynamoDB 十年的工程经验",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "012",
      "order": 12,
      "sourceNumber": 8,
      "company": "Amazon Science",
      "title": "Using graph neural networks to recommend related products",
      "url": "https://www.amazon.science/blog/using-graph-neural-networks-to-recommend-related-products",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2022,
      "guide": "用图神经网络推荐关联商品",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "013",
      "order": 13,
      "sourceNumber": 1,
      "company": "Atlassian",
      "title": "How Atlassian Scaled and Enhanced Throughput in the Jira Export Service",
      "url": "https://www.atlassian.com/blog/atlassian-engineering/boosting-performance-how-we-scaled-and-enhanced-throughput-in-the-jira-export-service",
      "topics": [
        "Performance",
        "Architecture"
      ],
      "year": 2025,
      "guide": "扩展 Jira 导出服务并提高吞吐量",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "014",
      "order": 14,
      "sourceNumber": 2,
      "company": "Atlassian",
      "title": "How one of Atlassian's critical services consistently gets above 99.9999% of availability",
      "url": "https://www.atlassian.com/blog/atlassian-engineering/atlassian-critical-services-above-six-nines-of-availability",
      "topics": [
        "Infrastructure"
      ],
      "year": 2022,
      "guide": "建设具备高可用性的关键服务",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "015",
      "order": 15,
      "sourceNumber": 3,
      "company": "Atlassian",
      "title": "How Atlassian made Git push over HTTPS faster for Bitbucket Cloud",
      "url": "https://www.atlassian.com/blog/atlassian-engineering/faster-git-push-over-https-for-bitbucket-cloud",
      "topics": [
        "Performance"
      ],
      "year": 2022,
      "guide": "加快 Bitbucket Cloud 的 HTTPS Git 推送",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "016",
      "order": 16,
      "sourceNumber": 4,
      "company": "Atlassian",
      "title": "How Atlassian Revamped Confluence Cloud Search",
      "url": "https://www.atlassian.com/blog/atlassian-engineering/revamping-confluence-cloud-search",
      "topics": [
        "Search"
      ],
      "year": 2021,
      "guide": "重构 Confluence Cloud 搜索能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "017",
      "order": 17,
      "sourceNumber": 5,
      "company": "Atlassian",
      "title": "Caching JQL search in Jira Cloud",
      "url": "https://www.atlassian.com/blog/atlassian-engineering/reducing-jql-database-load-with-caches",
      "topics": [
        "Caching",
        "Databases"
      ],
      "year": 2021,
      "guide": "用缓存降低 Jira JQL 查询的数据库负载",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "018",
      "order": 18,
      "sourceNumber": 6,
      "company": "Atlassian",
      "title": "Scaling, rearchitecting, and decomposing Confluence Cloud",
      "url": "https://www.atlassian.com/blog/atlassian-engineering/scaling-rearchitecting-and-decomposing-confluence-cloud",
      "topics": [
        "Architecture"
      ],
      "year": 2020,
      "guide": "扩容、重构并拆分 Confluence Cloud",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "019",
      "order": 19,
      "sourceNumber": 7,
      "company": "Atlassian",
      "title": "Scaling Bitbucket's Database",
      "url": "https://www.atlassian.com/blog/atlassian-engineering/scaling-bitbuckets-database",
      "topics": [
        "Databases"
      ],
      "year": 2020,
      "guide": "扩展 Bitbucket 的数据库容量",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "020",
      "order": 20,
      "sourceNumber": 8,
      "company": "Atlassian",
      "title": "Atlassian's journey scaling low latency, multi-region services on AWS",
      "url": "https://www.atlassian.com/blog/atlassian-engineering/aws-scaling-multi-region-low-latency-service",
      "topics": [
        "Infrastructure",
        "Performance"
      ],
      "year": 2019,
      "guide": "在 AWS 上扩展低延迟、多区域服务",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "021",
      "order": 21,
      "sourceNumber": 1,
      "company": "Booking.com",
      "title": "Anomaly Detection in Time Series Using Statistical Analysis",
      "url": "https://medium.com/booking-com-development/anomaly-detection-in-time-series-using-statistical-analysis-cc587b21d008",
      "topics": [
        "Observability",
        "Data Engineering"
      ],
      "year": 2025,
      "guide": "用统计分析检测时间序列异常",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "022",
      "order": 22,
      "sourceNumber": 2,
      "company": "Booking.com",
      "title": "How Booking Cut 20% of the Cloud Cost with a Single Code Change",
      "url": "https://medium.com/booking-com-development/use-compression-luke-cut-20-of-the-cloud-cost-with-a-single-code-change-510d14d96891",
      "topics": [
        "Cost Optimization"
      ],
      "year": 2025,
      "guide": "通过一次代码改动降低云成本",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "023",
      "order": 23,
      "sourceNumber": 3,
      "company": "Booking.com",
      "title": "The Engineering Behind Booking.com's High-Performance Ranking Platform",
      "url": "https://medium.com/booking-com-development/the-engineering-behind-booking-coms-ranking-platform-a-system-overview-2fb222003ca6",
      "topics": [
        "Search",
        "Performance"
      ],
      "year": 2024,
      "guide": "构建高性能排序平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "024",
      "order": 24,
      "sourceNumber": 4,
      "company": "Booking.com",
      "title": "How Booking.com Leverage graph technology for real-time Fraud Detection and Prevention",
      "url": "https://medium.com/booking-com-development/leverage-graph-technology-for-real-time-fraud-detection-and-prevention-438336076ea5",
      "topics": [
        "Security"
      ],
      "year": 2024,
      "guide": "用图技术实时发现和预防欺诈",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "025",
      "order": 25,
      "sourceNumber": 5,
      "company": "Booking.com",
      "title": "How Booking.com Predicts cancellations with survival modeling",
      "url": "https://booking.ai/predicting-cancellations-with-survival-modeling-a299af54249b",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "使用生存分析模型预测订单取消",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "026",
      "order": 26,
      "sourceNumber": 1,
      "company": "Canva",
      "title": "Canva's continuous data platform",
      "url": "https://www.canva.dev/blog/engineering/snowpipe-streaming/",
      "topics": [
        "Data Engineering"
      ],
      "year": 2025,
      "guide": "构建持续更新的数据平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "027",
      "order": 27,
      "sourceNumber": 2,
      "company": "Canva",
      "title": "How Canva's drawing tool works",
      "url": "https://www.canva.dev/blog/engineering/behind-the-draw/",
      "topics": [
        "Frontend"
      ],
      "year": 2024,
      "guide": "理解 Canva 绘图工具的实现",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "028",
      "order": 28,
      "sourceNumber": 3,
      "company": "Canva",
      "title": "How Canva collects 25 billion events per day",
      "url": "https://www.canva.dev/blog/engineering/product-analytics-event-collection/",
      "topics": [
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "构建每日采集海量事件的分析管道",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "029",
      "order": 29,
      "sourceNumber": 4,
      "company": "Canva",
      "title": "Canva's scalable and reliable content usage counting service",
      "url": "https://www.canva.dev/blog/engineering/scaling-to-count-billions/",
      "topics": [
        "Architecture",
        "Performance"
      ],
      "year": 2024,
      "guide": "扩展可靠的内容使用计数服务",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "030",
      "order": 30,
      "sourceNumber": 5,
      "company": "Canva",
      "title": "How Canva saves millions annually in Amazon S3 costs",
      "url": "https://www.canva.dev/blog/engineering/optimising-s3-savings/",
      "topics": [
        "Cost Optimization"
      ],
      "year": 2023,
      "guide": "按访问模式优化 S3 存储成本",
      "evidence": "reviewed",
      "review": {
        "summary": "先分析对象大小与访问频率，再计算迁移回本周期，将合适的冷数据迁往更低成本的存储层。",
        "problem": "用户媒体不断增长，但大部分旧内容访问稀少；仅比较每 GB 单价不足以判断迁移是否划算。",
        "approach": [
          "分析不同存储桶的数据年龄、读取比例和对象大小。",
          "把一次性迁移费用与持续存储节省放在一起，计算回本周期。",
          "优先迁移适合的较大对象，使用生命周期策略完成存储类别转换。"
        ],
        "result": "作者在 2023 年报告每月节省约 30 万美元，同时说明迁移前期花费超过 160 万美元。",
        "tradeoff": "小对象和频繁读取可能改变收益；文中的价格与规模是历史条件。",
        "takeaway": "我们的启示：优化前先建立访问分布和完整成本模型，再决定迁移范围。",
        "sourceSection": "Understanding our Data / Cost to Transition / Conclusion",
        "checkedAt": "2026-09-10"
      }
    },
    {
      "id": "031",
      "order": 31,
      "sourceNumber": 6,
      "company": "Canva",
      "title": "How Canva scaled media uploads from Zero to 50 Million per day",
      "url": "https://www.canva.dev/blog/engineering/from-zero-to-50-million-uploads-per-day-scaling-media-at-canva/",
      "topics": [
        "Performance",
        "Infrastructure"
      ],
      "year": 2022,
      "guide": "将媒体上传服务扩展至每日数千万次",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "032",
      "order": 32,
      "sourceNumber": 7,
      "company": "Canva",
      "title": "Canva's fast and scalable reverse image search",
      "url": "https://www.canva.dev/blog/engineering/simple-fast-and-scalable-reverse-image-search-using-perceptual-hashes-and-dynamodb/",
      "topics": [
        "Search",
        "Databases"
      ],
      "year": 2022,
      "guide": "用感知哈希实现可扩展的反向图片搜索",
      "evidence": "reviewed",
      "review": {
        "summary": "把图片转换为感知哈希，分段查询候选，再用汉明距离筛选相似图片。",
        "problem": "轻微修改就会改变文件哈希，普通字节级去重无法识别视觉相似图片。",
        "approach": [
          "用感知哈希表示图像的视觉特征。",
          "把哈希分段存入 DynamoDB，以多索引查询获得候选。",
          "合并去重后按完整哈希距离过滤，并处理低复杂度图片导致的候选膨胀。"
        ],
        "result": "作者报告系统在百亿图片哈希规模下平均查询约 40 毫秒；这是原文环境的结果。",
        "tradeoff": "分段数量会影响召回与候选规模；简单图形可能形成高频键。",
        "takeaway": "我们的启示：检索实验应使用真实数据分布，并单独检查极端高频输入。",
        "sourceSection": "Matching perceptual hashes / Insights / How well does it run?",
        "checkedAt": "2026-09-10"
      }
    },
    {
      "id": "033",
      "order": 33,
      "sourceNumber": 8,
      "company": "Canva",
      "title": "How Canva enables real-time collaboration with RSocket",
      "url": "https://www.canva.dev/blog/engineering/enabling-real-time-collaboration-with-rsocket/",
      "topics": [
        "Messaging",
        "Architecture"
      ],
      "year": 2021,
      "guide": "借助 RSocket 实现实时协作",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "034",
      "order": 34,
      "sourceNumber": 1,
      "company": "Coinbase",
      "title": "How Coinbase Optimizes Network Requests",
      "url": "https://www.coinbase.com/blog/boosting-app-performance-strategies-to-optimize-network-requests",
      "topics": [
        "Performance"
      ],
      "year": 2024,
      "guide": "优化网络请求以改善应用性能",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "035",
      "order": 35,
      "sourceNumber": 2,
      "company": "Coinbase",
      "title": "Accelerating Deep Learning Adoption at Coinbase",
      "url": "https://www.coinbase.com/blog/accelerating-deep-learning-adoption-at-coinbase",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "加速深度学习在业务中的应用",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "036",
      "order": 36,
      "sourceNumber": 3,
      "company": "Coinbase",
      "title": "Lessons from launching Enterprise-grade GenAI solutions at Coinbase",
      "url": "https://www.coinbase.com/blog/lessons-from-launching-enterprise-grade-genAI-solutions-at-Coinbase",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "总结企业级生成式 AI 产品的上线经验",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "037",
      "order": 37,
      "sourceNumber": 4,
      "company": "Coinbase",
      "title": "How Coinbase Uses ML to Predict Traffic and Scale Databases",
      "url": "https://www.coinbase.com/blog/how-coinbase-is-using-machine-learning-to-predict",
      "topics": [
        "AI/ML",
        "Databases"
      ],
      "year": 2024,
      "guide": "用机器学习预测流量并扩展数据库",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "038",
      "order": 38,
      "sourceNumber": 5,
      "company": "Coinbase",
      "title": "Detecting Fraudulent Transactions at Coinbase",
      "url": "https://www.coinbase.com/blog/detecting-fraudulent-transactions-coinbase-scalable-blockchain-address-risk",
      "topics": [
        "Security"
      ],
      "year": 2023,
      "guide": "识别欺诈交易与区块链地址风险",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "039",
      "order": 39,
      "sourceNumber": 6,
      "company": "Coinbase",
      "title": "Building a notification platform at Coinbase",
      "url": "https://www.coinbase.com/blog/building-a-notification-platform-at-coinbase",
      "topics": [
        "Messaging",
        "Architecture"
      ],
      "year": 2022,
      "guide": "构建统一通知平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "040",
      "order": 40,
      "sourceNumber": 1,
      "company": "Discord",
      "title": "How Discord Reduced Websocket Traffic by 40%",
      "url": "https://discord.com/blog/how-discord-reduced-websocket-traffic-by-40-percent",
      "topics": [
        "Performance",
        "Messaging"
      ],
      "year": 2024,
      "guide": "减少 WebSocket 通信流量",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "041",
      "order": 41,
      "sourceNumber": 2,
      "company": "Discord",
      "title": "How Discord Stores Trillions of Messages",
      "url": "https://discord.com/blog/how-discord-stores-trillions-of-messages",
      "topics": [
        "Databases"
      ],
      "year": 2023,
      "guide": "支撑万亿级消息的存储与读取",
      "evidence": "reviewed",
      "review": {
        "summary": "在数据库前合并相同读取请求，并结合存储迁移，缓解热门频道造成的消息读取压力。",
        "problem": "热点分区、压缩积压和垃圾回收暂停导致延迟波动与较重的运维负担。",
        "approach": [
          "用 Rust 数据服务合并同时读取同一行的请求。",
          "按频道进行一致性哈希路由，提高请求合并机会。",
          "迁移到 ScyllaDB，双写新数据并抽样对比读取结果。"
        ],
        "result": "作者报告历史消息读取 p99 从 40–125 毫秒改善到约 15 毫秒。",
        "tradeoff": "热点仍需处理；新增服务和存储迁移需要额外的运维与验证。",
        "takeaway": "我们的启示：先测量重复读取和热点分布，再判断请求合并与数据库迁移的价值。",
        "sourceSection": "Data Services Serving Data / A Very Big Migration / Several Months Later",
        "checkedAt": "2026-09-10"
      }
    },
    {
      "id": "042",
      "order": 42,
      "sourceNumber": 3,
      "company": "Discord",
      "title": "Pushing Discord's Limits with a Million+ Online Users in a Single Server",
      "url": "https://discord.com/blog/maxjourney-pushing-discords-limits-with-a-million-plus-online-users-in-a-single-server",
      "topics": [
        "Performance",
        "Infrastructure"
      ],
      "year": 2023,
      "guide": "应对单个社区百万用户同时在线",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "043",
      "order": 43,
      "sourceNumber": 4,
      "company": "Discord",
      "title": "How Discord uses ML to Build a Delightful Notification Experience",
      "url": "https://discord.com/blog/building-delightful-notifications-using-ml",
      "topics": [
        "AI/ML",
        "Messaging"
      ],
      "year": 2022,
      "guide": "用机器学习改善通知体验",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "044",
      "order": 44,
      "sourceNumber": 5,
      "company": "Discord",
      "title": "How Discord Creates Insights from Trillions of Data Points",
      "url": "https://discord.com/blog/how-discord-creates-insights-from-trillions-of-data-points",
      "topics": [
        "Data Engineering"
      ],
      "year": 2021,
      "guide": "从海量数据点中提取业务洞察",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "045",
      "order": 45,
      "sourceNumber": 1,
      "company": "DoorDash",
      "title": "How DoorDash Uses LLMs to transcribe restaurant menu photos",
      "url": "https://careersatdoordash.com/blog/doordash-llm-transcribe-menu/",
      "topics": [
        "AI/ML"
      ],
      "year": 2025,
      "guide": "用大语言模型转录餐厅菜单照片",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "046",
      "order": 46,
      "sourceNumber": 2,
      "company": "DoorDash",
      "title": "How DoorDash leverages LLMs for better search retrieval",
      "url": "https://careersatdoordash.com/blog/how-doordash-leverages-llms-for-better-search-retrieval/",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2024,
      "guide": "借助大语言模型改善搜索召回",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "047",
      "order": 47,
      "sourceNumber": 3,
      "company": "DoorDash",
      "title": "Building DoorDash's product knowledge graph with large language models",
      "url": "https://careersatdoordash.com/blog/building-doordashs-product-knowledge-graph-with-large-language-models/",
      "topics": [
        "AI/ML",
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "用大语言模型构建商品知识图谱",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "048",
      "order": 48,
      "sourceNumber": 4,
      "company": "DoorDash",
      "title": "DoorDash's in-house search engine",
      "url": "https://careersatdoordash.com/blog/introducing-doordashs-in-house-search-engine/",
      "topics": [
        "Search"
      ],
      "year": 2024,
      "guide": "建设 DoorDash 自研搜索引擎",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "049",
      "order": 49,
      "sourceNumber": 5,
      "company": "DoorDash",
      "title": "DoorDash's write-heavy scalable and reliable inventory platform",
      "url": "https://careersatdoordash.com/blog/how-doordash-designed-a-successful-write-heavy-scalable-and-reliable-inventory-platform/",
      "topics": [
        "Architecture",
        "Databases"
      ],
      "year": 2023,
      "guide": "设计可扩展、可靠的写密集库存平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "050",
      "order": 50,
      "sourceNumber": 6,
      "company": "DoorDash",
      "title": "Doordash's scalable real time event processing with Kafka and Flink",
      "url": "https://careersatdoordash.com/blog/building-scalable-real-time-event-processing-with-kafka-and-flink/",
      "topics": [
        "Data Engineering"
      ],
      "year": 2022,
      "guide": "使用 Kafka 与 Flink 处理实时事件",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "051",
      "order": 51,
      "sourceNumber": 7,
      "company": "DoorDash",
      "title": "DoorDash's Lessons on Improving Performance on High-Traffic Web Pages",
      "url": "https://careersatdoordash.com/blog/doordashs-lessons-on-improving-performance-on-high-traffic-web-pages/",
      "topics": [
        "Performance",
        "Frontend"
      ],
      "year": 2022,
      "guide": "改善高流量网页的性能",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "052",
      "order": 52,
      "sourceNumber": 8,
      "company": "DoorDash",
      "title": "How DoorDash Applied Client-Side Caching to Improve Feature Store Performance by 70%",
      "url": "https://careersatdoordash.com/blog/how-we-applied-client-side-caching/",
      "topics": [
        "Caching",
        "AI/ML"
      ],
      "year": 2022,
      "guide": "通过客户端缓存加速特征存储访问",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "053",
      "order": 53,
      "sourceNumber": 9,
      "company": "DoorDash",
      "title": "Building a Unified Chat Experience at DoorDash",
      "url": "https://careersatdoordash.com/blog/building-a-unified-chat-experience-at-doordash/",
      "topics": [
        "Messaging"
      ],
      "year": 2022,
      "guide": "统一不同场景的聊天体验",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "054",
      "order": 54,
      "sourceNumber": 1,
      "company": "Dropbox",
      "title": "How Dropbox evolved its infrastructure through the messaging system model",
      "url": "https://dropbox.tech/infrastructure/infrastructure-messaging-system-model-async-platform-evolution",
      "topics": [
        "Architecture",
        "Messaging"
      ],
      "year": 2025,
      "guide": "围绕消息系统演进异步基础设施",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "055",
      "order": 55,
      "sourceNumber": 2,
      "company": "Dropbox",
      "title": "Dropbox's scalable, consistent, metadata caching solution",
      "url": "https://dropbox.tech/infrastructure/meet-chrono-our-scalable-consistent-metadata-caching-solution",
      "topics": [
        "Caching"
      ],
      "year": 2024,
      "guide": "构建可扩展且一致的元数据缓存",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "056",
      "order": 56,
      "sourceNumber": 3,
      "company": "Dropbox",
      "title": "Bringing AI-powered answers and summaries to file previews on the web",
      "url": "https://dropbox.tech/machine-learning/bringing-ai-powered-answers-and-summaries-to-file-previews-on-the-web",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "在网页文件预览中提供 AI 问答与摘要",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "057",
      "order": 57,
      "sourceNumber": 4,
      "company": "Dropbox",
      "title": "Dropbox's ML-powered file organization",
      "url": "https://dropbox.tech/machine-learning/smart-move-ml-ai-file-organization-automation",
      "topics": [
        "AI/ML"
      ],
      "year": 2023,
      "guide": "用机器学习自动整理文件",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "058",
      "order": 58,
      "sourceNumber": 5,
      "company": "Dropbox",
      "title": "How Dropbox uses ML to identify date formats in file names",
      "url": "https://dropbox.tech/machine-learning/using-ml-to-identify-date-formats-in-file-names",
      "topics": [
        "AI/ML"
      ],
      "year": 2023,
      "guide": "识别文件名中的日期格式",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "059",
      "order": 59,
      "sourceNumber": 6,
      "company": "Dropbox",
      "title": "How Dropbox optimizes payments with machine learning",
      "url": "https://dropbox.tech/machine-learning/optimizing-payments-with-machine-learning",
      "topics": [
        "AI/ML",
        "Payments"
      ],
      "year": 2021,
      "guide": "用机器学习优化支付流程",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "060",
      "order": 60,
      "sourceNumber": 1,
      "company": "eBay",
      "title": "How ebay Exports Billion-Scale Graphs on Transactional Graph Databases",
      "url": "https://innovation.ebayinc.com/stories/how-we-export-billion-scale-graphs-on-transactional-graph-databases/",
      "topics": [
        "Databases"
      ],
      "year": 2023,
      "guide": "从事务型图数据库导出十亿级图数据",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "061",
      "order": 61,
      "sourceNumber": 2,
      "company": "eBay",
      "title": "eBay's Personalized User-Based Ranking Model for Recommendations",
      "url": "https://innovation.ebayinc.com/stories/evolving-recommendations-a-personalized-user-based-ranking-model/",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2023,
      "guide": "构建面向用户的个性化推荐排序模型",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "062",
      "order": 62,
      "sourceNumber": 3,
      "company": "eBay",
      "title": "How Multimodal Embeddings Elevate eBay's Product Recommendations",
      "url": "https://innovation.ebayinc.com/stories/beyond-words-how-multimodal-embeddings-elevate-ebays-product-recommendations/",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2023,
      "guide": "用多模态向量表示改善商品推荐",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "063",
      "order": 63,
      "sourceNumber": 4,
      "company": "eBay",
      "title": "eBay's Blazingly Fast Billion-Scale Vector Similarity Engine",
      "url": "https://innovation.ebayinc.com/stories/ebays-blazingly-fast-billion-scale-vector-similarity-engine/",
      "topics": [
        "Search",
        "Performance"
      ],
      "year": 2023,
      "guide": "建设十亿级向量相似度检索引擎",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "064",
      "order": 64,
      "sourceNumber": 5,
      "company": "eBay",
      "title": "How eBay Handles Real-Time Push Notifications at Scale",
      "url": "https://innovation.ebayinc.com/stories/ebays-notification-streaming-platform-how-ebay-handles-real-time-push-notifications-at-scale/",
      "topics": [
        "Messaging"
      ],
      "year": 2022,
      "guide": "大规模处理实时推送通知",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "065",
      "order": 65,
      "sourceNumber": 6,
      "company": "eBay",
      "title": "Building a Deep Learning Based Retrieval System for Personalized Recommendations",
      "url": "https://innovation.ebayinc.com/stories/building-a-deep-learning-based-retrieval-system-for-personalized-recommendations/",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2022,
      "guide": "用深度学习实现个性化推荐召回",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "066",
      "order": 66,
      "sourceNumber": 7,
      "company": "eBay",
      "title": "How eBay Loads and Updates Over Ten-Billion-Vertex Graphs",
      "url": "https://innovation.ebayinc.com/stories/graphload-a-framework-to-load-and-update-over-ten-billion-vertex-graphs-with-performance-and-consistency/",
      "topics": [
        "Databases",
        "Performance"
      ],
      "year": 2021,
      "guide": "高效、一致地加载和更新百亿顶点图",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "067",
      "order": 67,
      "sourceNumber": 8,
      "company": "eBay",
      "title": "eBay's real-time and performant index service for its large-scale, in-house database platform",
      "url": "https://innovation.ebayinc.com/stories/ebays-global-secondary-indexes/",
      "topics": [
        "Databases"
      ],
      "year": 2021,
      "guide": "为自研数据库构建实时二级索引服务",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "068",
      "order": 68,
      "sourceNumber": 1,
      "company": "Facebook/Meta",
      "title": "Indexing code at scale with Glean - Meta's open source system",
      "url": "https://engineering.fb.com/2024/12/19/developer-tools/glean-open-source-code-indexing/",
      "topics": [
        "Search",
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "用开源 Glean 系统进行大规模代码索引",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "069",
      "order": 69,
      "sourceNumber": 2,
      "company": "Facebook/Meta",
      "title": "Inside Facebook's video delivery system",
      "url": "https://engineering.fb.com/2024/12/10/video-engineering/inside-facebooks-video-delivery-system/",
      "topics": [
        "Video/Media"
      ],
      "year": 2024,
      "guide": "理解 Facebook 视频分发系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "070",
      "order": 70,
      "sourceNumber": 3,
      "company": "Facebook/Meta",
      "title": "Meta's Sequence learning Model for personalized ads recommendations",
      "url": "https://engineering.fb.com/2024/11/19/data-infrastructure/sequence-learning-personalized-ads-recommendations/",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "用序列学习实现个性化广告推荐",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "071",
      "order": 71,
      "sourceNumber": 4,
      "company": "Facebook/Meta",
      "title": "How Meta animates AI-generated images at scale",
      "url": "https://engineering.fb.com/2024/08/14/production-engineering/how-meta-animates-ai-generated-images-at-scale/",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "规模化地让 AI 生成的图片动起来",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "072",
      "order": 72,
      "sourceNumber": 5,
      "company": "Facebook/Meta",
      "title": "How Meta trains large language models at scale",
      "url": "https://engineering.fb.com/2024/06/12/data-infrastructure/training-large-language-models-at-scale-meta/",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "扩展大语言模型训练系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "073",
      "order": 73,
      "sourceNumber": 6,
      "company": "Facebook/Meta",
      "title": "Building Meta's GenAI Infrastructure",
      "url": "https://engineering.fb.com/2024/03/12/data-center-engineering/building-metas-genai-infrastructure/",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "建设生成式 AI 基础设施",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "074",
      "order": 74,
      "sourceNumber": 7,
      "company": "Facebook/Meta",
      "title": "RoCE networks for distributed AI training at scale",
      "url": "https://engineering.fb.com/2024/08/05/data-center-engineering/roce-network-distributed-ai-training-at-scale/",
      "topics": [
        "Infrastructure",
        "AI/ML"
      ],
      "year": 2024,
      "guide": "为分布式 AI 训练部署 RoCE 网络",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "075",
      "order": 75,
      "sourceNumber": 8,
      "company": "Facebook/Meta",
      "title": "How Meta built the infrastructure for Threads",
      "url": "https://engineering.fb.com/2023/12/19/core-infra/how-meta-built-the-infrastructure-for-threads/",
      "topics": [
        "Infrastructure"
      ],
      "year": 2023,
      "guide": "建设 Threads 背后的基础设施",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "076",
      "order": 76,
      "sourceNumber": 9,
      "company": "Facebook/Meta",
      "title": "Building end-to-end security for Messenger",
      "url": "https://engineering.fb.com/2023/12/06/security/building-end-to-end-security-for-messenger/",
      "topics": [
        "Security"
      ],
      "year": 2023,
      "guide": "为 Messenger 构建端到端安全能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "077",
      "order": 77,
      "sourceNumber": 10,
      "company": "Facebook/Meta",
      "title": "Modernizing Meta's data platform",
      "url": "https://engineering.fb.com/2023/01/26/data-infrastructure/tulip-modernizing-metas-data-platform/",
      "topics": [
        "Data Engineering"
      ],
      "year": 2023,
      "guide": "推进 Meta 数据平台现代化",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "078",
      "order": 78,
      "sourceNumber": 11,
      "company": "Facebook/Meta",
      "title": "How Precision Time Protocol is being deployed at Meta",
      "url": "https://engineering.fb.com/2022/11/21/production-engineering/precision-time-protocol-at-meta/",
      "topics": [
        "Infrastructure"
      ],
      "year": 2022,
      "guide": "在基础设施中部署精确时间协议",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "079",
      "order": 79,
      "sourceNumber": 12,
      "company": "Facebook/Meta",
      "title": "Scaling data ingestion for machine learning training at Meta",
      "url": "https://engineering.fb.com/2022/09/19/ml-applications/data-ingestion-machine-learning-training-meta/",
      "topics": [
        "AI/ML",
        "Data Engineering"
      ],
      "year": 2022,
      "guide": "扩展机器学习训练的数据摄入能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "080",
      "order": 80,
      "sourceNumber": 13,
      "company": "Facebook/Meta",
      "title": "Meta's cloud gaming infrastructure",
      "url": "https://engineering.fb.com/2022/06/09/web/cloud-gaming-infrastructure/",
      "topics": [
        "Infrastructure"
      ],
      "year": 2022,
      "guide": "构建云游戏基础设施",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "081",
      "order": 81,
      "sourceNumber": 14,
      "company": "Facebook/Meta",
      "title": "Cache made consistent - How Meta handles cache invalidation",
      "url": "https://engineering.fb.com/2022/06/08/core-infra/cache-made-consistent/",
      "topics": [
        "Caching"
      ],
      "year": 2022,
      "guide": "检测与定位缓存一致性问题",
      "evidence": "reviewed",
      "review": {
        "summary": "用多时间窗口的一致性检查发现缓存异常，再追踪状态变化，定位难以复现的并发错误。",
        "problem": "缓存填充与失效事件交错，可能留下旧数据；仅使用版本字段仍可能遇到边界问题。",
        "approach": [
          "由 Polaris 接收失效事件并像客户端一样检查缓存副本。",
          "在多个时间窗口重试，区分暂时延迟与持续不一致。",
          "结合缓存状态追踪，还原触发问题的操作顺序。"
        ],
        "result": "原文展示了定位罕见错误的过程，并按明确的时间窗口报告一致性指标。",
        "tradeoff": "回源验证会增加数据库负担，需要控制时机与频率。",
        "takeaway": "我们的启示：为一致性定义可观测的时间边界，记录关键状态变化。",
        "sourceSection": "Polaris / Consistency tracing / A real bug we found and fixed this year",
        "checkedAt": "2026-09-10"
      }
    },
    {
      "id": "082",
      "order": 82,
      "sourceNumber": 15,
      "company": "Facebook/Meta",
      "title": "A highly available, strongly consistent storage service using chain replication",
      "url": "https://engineering.fb.com/2022/05/04/data-infrastructure/delta/",
      "topics": [
        "Databases",
        "Architecture"
      ],
      "year": 2022,
      "guide": "通过链式复制构建高可用、强一致存储",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "083",
      "order": 83,
      "sourceNumber": 16,
      "company": "Facebook/Meta",
      "title": "Making a distributed priority queue disaster-ready",
      "url": "https://engineering.fb.com/2022/01/18/production-engineering/foqs-disaster-ready/",
      "topics": [
        "Architecture"
      ],
      "year": 2022,
      "guide": "为分布式优先级队列建设容灾能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "084",
      "order": 84,
      "sourceNumber": 17,
      "company": "Facebook/Meta",
      "title": "How we built a general purpose key value store for Facebook with ZippyDB",
      "url": "https://engineering.fb.com/2021/08/06/core-infra/zippydb/",
      "topics": [
        "Databases"
      ],
      "year": 2021,
      "guide": "用 ZippyDB 构建通用键值存储",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "085",
      "order": 85,
      "sourceNumber": 18,
      "company": "Facebook/Meta",
      "title": "Fully Sharded Data Parallel: faster AI training with fewer GPUs",
      "url": "https://engineering.fb.com/2021/07/15/open-source/fsdp/",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2021,
      "guide": "通过完全分片数据并行降低训练资源需求",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "086",
      "order": 86,
      "sourceNumber": 19,
      "company": "Facebook/Meta",
      "title": "How Facebook encodes your videos",
      "url": "https://engineering.fb.com/2021/04/05/video-engineering/how-facebook-encodes-your-videos/",
      "topics": [
        "Video/Media"
      ],
      "year": 2021,
      "guide": "理解 Facebook 视频编码流程",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "087",
      "order": 87,
      "sourceNumber": 20,
      "company": "Facebook/Meta",
      "title": "Scaling a distributed priority queue at Meta",
      "url": "https://engineering.fb.com/2021/02/22/production-engineering/foqs-scaling-a-distributed-priority-queue/",
      "topics": [
        "Architecture"
      ],
      "year": 2021,
      "guide": "扩展分布式优先级队列",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "088",
      "order": 88,
      "sourceNumber": 21,
      "company": "Facebook/Meta",
      "title": "How machine learning powers Facebook's News Feed ranking algorithm",
      "url": "https://engineering.fb.com/2021/01/26/ml-applications/news-feed-ranking/",
      "topics": [
        "AI/ML"
      ],
      "year": 2021,
      "guide": "用机器学习为动态消息流排序",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "089",
      "order": 89,
      "sourceNumber": 22,
      "company": "Facebook/Meta",
      "title": "How Meta scaled Live streaming for millions of viewers simultaneously",
      "url": "https://engineering.fb.com/2020/10/22/video-engineering/live-streaming/",
      "topics": [
        "Video/Media",
        "Performance"
      ],
      "year": 2020,
      "guide": "支撑数百万观众同时观看直播",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "090",
      "order": 90,
      "sourceNumber": 1,
      "company": "Figma",
      "title": "The infrastructure behind AI search in Figma",
      "url": "https://www.figma.com/blog/the-infrastructure-behind-ai-search-in-figma/",
      "topics": [
        "Search",
        "AI/ML"
      ],
      "year": 2024,
      "guide": "构建 Figma AI 搜索基础设施",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "091",
      "order": 91,
      "sourceNumber": 2,
      "company": "Figma",
      "title": "Speeding up file load times at Figma",
      "url": "https://www.figma.com/blog/speeding-up-file-load-times-one-page-at-a-time/",
      "topics": [
        "Performance"
      ],
      "year": 2024,
      "guide": "缩短 Figma 文件加载时间",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "092",
      "order": 92,
      "sourceNumber": 3,
      "company": "Figma",
      "title": "Figma's LiveGraph: a real-time data system at scale",
      "url": "https://www.figma.com/blog/livegraph-real-time-data-at-scale/",
      "topics": [
        "Architecture",
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "用 LiveGraph 支撑大规模实时数据访问",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "093",
      "order": 93,
      "sourceNumber": 4,
      "company": "Figma",
      "title": "How Figma horizontally scaled Postgres to unlock nearly infinite scalability",
      "url": "https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/",
      "topics": [
        "Databases"
      ],
      "year": 2024,
      "guide": "通过水平扩展提升 Postgres 容量",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "094",
      "order": 94,
      "sourceNumber": 5,
      "company": "Figma",
      "title": "How Figma improved performance and load time with incremental frame loading",
      "url": "https://www.figma.com/blog/incremental-frame-loading/",
      "topics": [
        "Performance"
      ],
      "year": 2024,
      "guide": "通过增量画面加载改善速度与性能",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "095",
      "order": 95,
      "sourceNumber": 6,
      "company": "Figma",
      "title": "How Figma reduced potential instability by scaling to multiple databases",
      "url": "https://www.figma.com/blog/how-figma-scaled-to-multiple-databases/",
      "topics": [
        "Databases"
      ],
      "year": 2023,
      "guide": "将负载分散到多个数据库以降低不稳定性",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "096",
      "order": 96,
      "sourceNumber": 7,
      "company": "Figma",
      "title": "The hidden challenges of autosave",
      "url": "https://www.figma.com/blog/behind-the-feature-autosave/",
      "topics": [
        "Architecture"
      ],
      "year": 2020,
      "guide": "理解自动保存背后的隐藏挑战",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "097",
      "order": 97,
      "sourceNumber": 8,
      "company": "Figma",
      "title": "Figma's deep search to find the right files even faster",
      "url": "https://www.figma.com/blog/deep-search/",
      "topics": [
        "Search"
      ],
      "year": 2020,
      "guide": "通过深度搜索更快找到合适的文件",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "098",
      "order": 98,
      "sourceNumber": 1,
      "company": "Flipkart",
      "title": "Flipkart's MySQL Highly Available Setup",
      "url": "https://blog.flipkart.tech/mysql-high-availability-5f71838f19e1",
      "topics": [
        "Databases"
      ],
      "year": 2023,
      "guide": "建设高可用 MySQL 系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "099",
      "order": 99,
      "sourceNumber": 2,
      "company": "Flipkart",
      "title": "Running a multi-region Zookeeper at Flipkart",
      "url": "https://blog.flipkart.tech/running-a-multi-region-zookeeper-58e52cec44ff",
      "topics": [
        "Infrastructure"
      ],
      "year": 2021,
      "guide": "运行跨区域 ZooKeeper 集群",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "100",
      "order": 100,
      "sourceNumber": 3,
      "company": "Flipkart",
      "title": "Memory Tuning a High Throughput Microservice",
      "url": "https://blog.flipkart.tech/memory-tuning-a-high-throughput-microservice-ed57b3e60997",
      "topics": [
        "Performance"
      ],
      "year": 2021,
      "guide": "调优高吞吐微服务的内存使用",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "101",
      "order": 101,
      "sourceNumber": 4,
      "company": "Flipkart",
      "title": "Building Flipkart's Personalized Search Autosuggestion",
      "url": "https://blog.flipkart.tech/building-personalized-autosuggestion-9e705d5bf5f8",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2021,
      "guide": "构建个性化搜索联想",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "102",
      "order": 102,
      "sourceNumber": 5,
      "company": "Flipkart",
      "title": "Predicting your next query even before you type!",
      "url": "https://blog.flipkart.tech/predicting-your-next-query-even-before-you-type-83487a34109d",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2021,
      "guide": "在用户输入之前预测下一次查询",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "103",
      "order": 103,
      "sourceNumber": 6,
      "company": "Flipkart",
      "title": "How Flipkart Adapted Search to Indian Phonetics",
      "url": "https://blog.flipkart.tech/adapting-search-to-indian-phonetics-cdbe65259686",
      "topics": [
        "Search"
      ],
      "year": 2020,
      "guide": "让搜索适配印度语音特点",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "104",
      "order": 104,
      "sourceNumber": 1,
      "company": "GitHub",
      "title": "How we improved push processing on GitHub",
      "url": "https://github.blog/engineering/architecture-optimization/how-we-improved-push-processing-on-github/",
      "topics": [
        "Performance"
      ],
      "year": 2024,
      "guide": "优化 GitHub 的推送处理流程",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "105",
      "order": 105,
      "sourceNumber": 2,
      "company": "GitHub",
      "title": "How GitHub uses merge queue to ship hundreds of changes every day",
      "url": "https://github.blog/engineering/engineering-principles/how-github-uses-merge-queue-to-ship-hundreds-of-changes-every-day/",
      "topics": [
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "使用合并队列持续交付代码变更",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "106",
      "order": 106,
      "sourceNumber": 3,
      "company": "GitHub",
      "title": "How GitHub Docs' new search works",
      "url": "https://github.blog/engineering/architecture-optimization/how-github-docs-new-search-works/",
      "topics": [
        "Search"
      ],
      "year": 2023,
      "guide": "理解 GitHub 文档搜索的实现",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "107",
      "order": 107,
      "sourceNumber": 4,
      "company": "GitHub",
      "title": "The technology behind GitHub's new code search",
      "url": "https://github.blog/engineering/architecture-optimization/the-technology-behind-githubs-new-code-search/",
      "topics": [
        "Search"
      ],
      "year": 2023,
      "guide": "为大规模代码搜索设计专用索引",
      "evidence": "reviewed",
      "review": {
        "summary": "围绕代码子串检索构建专用倒排索引，用候选集运算与分片减少搜索工作量。",
        "problem": "海量代码搜索需要同时考虑子串与正则查询、索引体积、查询速度和更新开销。",
        "approach": [
          "按字符片段建立倒排索引，缩小可能匹配的文档集合。",
          "使用 sparse grams 改善常见短片段产生过多候选的问题。",
          "通过惰性迭代器进行候选集合运算，并将索引分片。"
        ],
        "result": "原文解释了代码搜索的专用索引设计，以及固定三元片段在其规模下的局限。",
        "tradeoff": "索引设计需要在空间、候选精度与查询开销之间取舍。",
        "takeaway": "我们的启示：先收集实际查询形态，再选择合适的索引结构。",
        "sourceSection": "Inverted indexes / Indexing 45 million repositories / sparse grams footnote",
        "checkedAt": "2026-09-10"
      }
    },
    {
      "id": "108",
      "order": 108,
      "sourceNumber": 5,
      "company": "GitHub",
      "title": "Scaling Git's garbage collection",
      "url": "https://github.blog/engineering/architecture-optimization/scaling-gits-garbage-collection/",
      "topics": [
        "Performance"
      ],
      "year": 2022,
      "guide": "扩展 Git 垃圾回收能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "109",
      "order": 109,
      "sourceNumber": 6,
      "company": "GitHub",
      "title": "Improve Git monorepo performance with a file system monitor",
      "url": "https://github.blog/engineering/infrastructure/improve-git-monorepo-performance-with-a-file-system-monitor/",
      "topics": [
        "Performance",
        "Infrastructure"
      ],
      "year": 2022,
      "guide": "通过文件系统监控加速 Git 大仓库操作",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "110",
      "order": 110,
      "sourceNumber": 7,
      "company": "GitHub",
      "title": "Partitioning GitHub's relational databases to handle scale",
      "url": "https://github.blog/engineering/infrastructure/partitioning-githubs-relational-databases-scale/",
      "topics": [
        "Databases"
      ],
      "year": 2021,
      "guide": "通过分区扩展关系型数据库",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "111",
      "order": 111,
      "sourceNumber": 1,
      "company": "Google Research",
      "title": "Load balancing with random job arrivals",
      "url": "https://research.google/blog/load-balancing-with-random-job-arrivals/",
      "topics": [
        "Infrastructure"
      ],
      "year": 2025,
      "guide": "处理任务随机到达时的负载均衡",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "112",
      "order": 112,
      "sourceNumber": 2,
      "company": "Google Research",
      "title": "Transformers in music recommendation",
      "url": "https://research.google/blog/transformers-in-music-recommendation/",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2024,
      "guide": "将 Transformer 用于音乐推荐",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "113",
      "order": 113,
      "sourceNumber": 3,
      "company": "Google Research",
      "title": "Scaling multimodal understanding to long videos",
      "url": "https://research.google/blog/scaling-multimodal-understanding-to-long-videos/",
      "topics": [
        "AI/ML",
        "Video/Media"
      ],
      "year": 2023,
      "guide": "将多模态理解扩展至长视频",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "114",
      "order": 114,
      "sourceNumber": 4,
      "company": "Google Research",
      "title": "Answering billions of reporting queries each day with low latency",
      "url": "https://research.google/blog/answering-billions-of-reporting-queries-each-day-with-low-latency/",
      "topics": [
        "Databases",
        "Performance"
      ],
      "year": 2023,
      "guide": "低延迟地响应海量报表查询",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "115",
      "order": 115,
      "sourceNumber": 5,
      "company": "Google Research",
      "title": "Grammar checking at Google Search scale",
      "url": "https://research.google/blog/grammar-checking-at-google-search-scale/",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2023,
      "guide": "在大规模搜索中执行语法检查",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "116",
      "order": 116,
      "sourceNumber": 6,
      "company": "Google Research",
      "title": "World scale inverse reinforcement learning in Google Maps",
      "url": "https://research.google/blog/world-scale-inverse-reinforcement-learning-in-google-maps/",
      "topics": [
        "AI/ML"
      ],
      "year": 2023,
      "guide": "在地图业务中应用大规模逆强化学习",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "117",
      "order": 117,
      "sourceNumber": 7,
      "company": "Google Research",
      "title": "Resolving code review comments with ML",
      "url": "https://research.google/blog/resolving-code-review-comments-with-ml/",
      "topics": [
        "AI/ML"
      ],
      "year": 2023,
      "guide": "用机器学习处理代码审查意见",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "118",
      "order": 118,
      "sourceNumber": 1,
      "company": "Instagram",
      "title": "Scaling the Instagram Explore recommendations system",
      "url": "https://engineering.fb.com/2023/08/09/ml-applications/scaling-instagram-explore-recommendations-system/",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2023,
      "guide": "扩展 Instagram Explore 推荐系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "119",
      "order": 119,
      "sourceNumber": 2,
      "company": "Instagram",
      "title": "Reducing Instagram's basic video compute time by 94 percent",
      "url": "https://engineering.fb.com/2022/11/04/video-engineering/instagram-video-processing-encoding-reduction/",
      "topics": [
        "Video/Media",
        "Performance"
      ],
      "year": 2022,
      "guide": "减少基础视频处理的计算时间",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "120",
      "order": 120,
      "sourceNumber": 3,
      "company": "Instagram",
      "title": "Improving Instagram notification management with machine learning and causal inference",
      "url": "https://engineering.fb.com/2022/10/31/ml-applications/instagram-notification-management-machine-learning/",
      "topics": [
        "AI/ML",
        "Messaging"
      ],
      "year": 2022,
      "guide": "用机器学习与因果推断改善通知管理",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "121",
      "order": 121,
      "sourceNumber": 4,
      "company": "Instagram",
      "title": "Building text animations for Instagram Stories",
      "url": "https://engineering.fb.com/2022/07/18/developer-tools/building-text-animations-for-instagram-stories/",
      "topics": [
        "Frontend"
      ],
      "year": 2022,
      "guide": "实现 Stories 的文字动画",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "122",
      "order": 122,
      "sourceNumber": 5,
      "company": "Instagram",
      "title": "Pushing the limits of compression in Facebook's mobile apps",
      "url": "https://engineering.fb.com/2021/09/13/core-infra/superpack/",
      "topics": [
        "Mobile",
        "Performance"
      ],
      "year": 2021,
      "guide": "优化移动应用中的压缩技术",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "123",
      "order": 123,
      "sourceNumber": 6,
      "company": "Instagram",
      "title": "How Instagram suggests new content",
      "url": "https://engineering.fb.com/2020/12/10/web/how-instagram-suggests-new-content/",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2020,
      "guide": "理解 Instagram 的新内容推荐",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "124",
      "order": 124,
      "sourceNumber": 1,
      "company": "Instacart",
      "title": "Real-time Fraud Detection with Yoda and ClickHouse",
      "url": "https://tech.instacart.com/real-time-fraud-detection-with-yoda-and-clickhouse-bd08e9dbe3f4",
      "topics": [
        "Security",
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "结合 Yoda 与 ClickHouse 实时检测欺诈",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "125",
      "order": 125,
      "sourceNumber": 2,
      "company": "Instacart",
      "title": "How Instacart Uses ML to Suggest Replacements for Out-of-Stock Products",
      "url": "https://tech.instacart.com/how-instacart-uses-machine-learning-to-suggest-replacements-for-out-of-stock-products-8f80d03bb5af",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "为缺货商品推荐替代品",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "126",
      "order": 126,
      "sourceNumber": 3,
      "company": "Instacart",
      "title": "Sequence models for Contextual Recommendations at Instacart",
      "url": "https://tech.instacart.com/sequence-models-for-contextual-recommendations-at-instacart-93414a28e70c",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2024,
      "guide": "用序列模型实现上下文推荐",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "127",
      "order": 127,
      "sourceNumber": 4,
      "company": "Instacart",
      "title": "Supercharging Discovery in Search with LLMs",
      "url": "https://tech.instacart.com/supercharging-discovery-in-search-with-llms-556c585d4720",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2024,
      "guide": "借助大语言模型增强搜索发现能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "128",
      "order": 128,
      "sourceNumber": 5,
      "company": "Instacart",
      "title": "Optimizing search relevance at Instacart using hybrid retrieval",
      "url": "https://tech.instacart.com/optimizing-search-relevance-at-instacart-using-hybrid-retrieval-88cb579b959c",
      "topics": [
        "Search"
      ],
      "year": 2024,
      "guide": "使用混合检索提升搜索相关性",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "129",
      "order": 129,
      "sourceNumber": 6,
      "company": "Instacart",
      "title": "Instacart's Item Availability Architecture: Solving for scale and consistency",
      "url": "https://tech.instacart.com/instacarts-item-availability-architecture-solving-for-scale-and-consistency-f5661acb20a6",
      "topics": [
        "Architecture"
      ],
      "year": 2023,
      "guide": "兼顾商品可售状态的规模与一致性",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "130",
      "order": 130,
      "sourceNumber": 7,
      "company": "Instacart",
      "title": "Instacart's one Deep Learning model for multiple surfaces",
      "url": "https://tech.instacart.com/one-model-to-serve-them-all-0eb6bf60b00d",
      "topics": [
        "AI/ML"
      ],
      "year": 2023,
      "guide": "让一个深度学习模型服务多个产品入口",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "131",
      "order": 131,
      "sourceNumber": 8,
      "company": "Instacart",
      "title": "Distributed Machine Learning at Instacart",
      "url": "https://tech.instacart.com/distributed-machine-learning-at-instacart-4b11d7569423",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2023,
      "guide": "建设分布式机器学习能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "132",
      "order": 132,
      "sourceNumber": 9,
      "company": "Instacart",
      "title": "How Instacart Uses Embeddings to Improve Search Relevance",
      "url": "https://tech.instacart.com/how-instacart-uses-embeddings-to-improve-search-relevance-e569839c3c36",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2022,
      "guide": "通过向量表示提升搜索相关性",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "133",
      "order": 133,
      "sourceNumber": 10,
      "company": "Instacart",
      "title": "The Journey to Real-Time Machine Learning at Instacart",
      "url": "https://tech.instacart.com/lessons-learned-the-journey-to-real-time-machine-learning-at-instacart-942f3a656af3",
      "topics": [
        "AI/ML"
      ],
      "year": 2022,
      "guide": "演进实时机器学习系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "134",
      "order": 134,
      "sourceNumber": 11,
      "company": "Instacart",
      "title": "How Instacart Uses ML-Driven Autocomplete to Help People Fill Their Carts",
      "url": "https://tech.instacart.com/how-instacart-uses-machine-learning-driven-autocomplete-to-help-people-fill-their-carts-9bc56d22bafb",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2022,
      "guide": "通过智能补全帮助用户选购商品",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "135",
      "order": 135,
      "sourceNumber": 12,
      "company": "Instacart",
      "title": "How Instacart optimized its Logistics engine using ML",
      "url": "https://tech.instacart.com/dont-let-the-crow-guide-your-routes-f24c96daedba",
      "topics": [
        "AI/ML"
      ],
      "year": 2021,
      "guide": "用机器学习优化配送物流引擎",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "136",
      "order": 136,
      "sourceNumber": 13,
      "company": "Instacart",
      "title": "A simple search query correction heuristic for the resource-constrained",
      "url": "https://tech.instacart.com/avacado-or-avocado-4b4b78dc0698",
      "topics": [
        "Search"
      ],
      "year": 2020,
      "guide": "在资源有限时用启发式方法纠正查询",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "137",
      "order": 137,
      "sourceNumber": 14,
      "company": "Instacart",
      "title": "Predicting the real-time availability of 200 million grocery items",
      "url": "https://tech.instacart.com/predicting-real-time-availability-of-200-million-grocery-items-in-us-canada-stores-61f43a16eafe",
      "topics": [
        "AI/ML"
      ],
      "year": 2018,
      "guide": "预测海量生鲜商品的实时可售状态",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "138",
      "order": 138,
      "sourceNumber": 15,
      "company": "Instacart",
      "title": "How Instacart delivers on time",
      "url": "https://tech.instacart.com/how-instacart-delivers-on-time-using-quantile-regression-2383e2e03edb",
      "topics": [
        "AI/ML"
      ],
      "year": 2018,
      "guide": "理解按时交付订单的工程实践",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "139",
      "order": 139,
      "sourceNumber": 1,
      "company": "LinkedIn",
      "title": "Scalable federated learning at LinkedIn",
      "url": "https://www.linkedin.com/blog/engineering/machine-learning/scalable-federated-learning-at-linkedin",
      "topics": [
        "AI/ML"
      ],
      "year": 2025,
      "guide": "构建可扩展的联邦学习系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "140",
      "order": 140,
      "sourceNumber": 2,
      "company": "LinkedIn",
      "title": "Building a resilient DNS client for web-scale infrastructure",
      "url": "https://www.linkedin.com/blog/engineering/infrastructure/building-a-resilient-dns-client-for-web-scale-infrastructure",
      "topics": [
        "Infrastructure"
      ],
      "year": 2025,
      "guide": "为大规模基础设施构建可靠 DNS 客户端",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "141",
      "order": 141,
      "sourceNumber": 3,
      "company": "LinkedIn",
      "title": "Journey of next generation control plane for data systems",
      "url": "https://www.linkedin.com/blog/engineering/infrastructure/journey-of-next-generation-control-plane-for-data-systems",
      "topics": [
        "Infrastructure",
        "Data Engineering"
      ],
      "year": 2025,
      "guide": "演进数据系统的新一代控制平面",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "142",
      "order": 142,
      "sourceNumber": 4,
      "company": "LinkedIn",
      "title": "Candidate Generation in a Large Scale Graph Recommendation System",
      "url": "https://www.linkedin.com/blog/engineering/recommendations/candidate-generation-in-a-large-scale-graph-recommendation-system-people-you-may-know",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2024,
      "guide": "在大规模图推荐系统中生成候选项",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "143",
      "order": 143,
      "sourceNumber": 5,
      "company": "LinkedIn",
      "title": "Accelerating LinkedIn's My Network tab by reducing latency and improving UX",
      "url": "https://www.linkedin.com/blog/engineering/infrastructure/accelerating-linkedins-my-network-tab",
      "topics": [
        "Performance",
        "Frontend"
      ],
      "year": 2024,
      "guide": "降低人脉页面延迟并改善体验",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "144",
      "order": 144,
      "sourceNumber": 6,
      "company": "LinkedIn",
      "title": "Tuning Java for high-performance services",
      "url": "https://www.linkedin.com/blog/engineering/infrastructure/java-heap-memory-and-garbage-collection-tuning-for-high-performance-services",
      "topics": [
        "Performance"
      ],
      "year": 2024,
      "guide": "为高性能服务调优 Java",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "145",
      "order": 145,
      "sourceNumber": 7,
      "company": "LinkedIn",
      "title": "LinkedIn OpenHouse for Big Data Management",
      "url": "https://www.linkedin.com/blog/engineering/data-management/taking-charge-of-tables--introducing-openhouse-for-big-data-mana",
      "topics": [
        "Data Engineering"
      ],
      "year": 2023,
      "guide": "用 OpenHouse 管理大数据",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "146",
      "order": 146,
      "sourceNumber": 8,
      "company": "LinkedIn",
      "title": "How LinkedIn Adopted A GraphQL Architecture for Product Development",
      "url": "https://www.linkedin.com/blog/engineering/architecture/how-linkedin-adopted-a-graphql-architecture-for-product-developm",
      "topics": [
        "Architecture"
      ],
      "year": 2023,
      "guide": "将 GraphQL 架构用于产品开发",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "147",
      "order": 147,
      "sourceNumber": 9,
      "company": "LinkedIn",
      "title": "How LinkedIn Is Using Embeddings to Up Its Match Game for Job Seekers",
      "url": "https://www.linkedin.com/blog/engineering/platform-platformization/using-embeddings-to-up-its-match-game-for-job-seekers",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2023,
      "guide": "用向量表示改善职位与求职者匹配",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "148",
      "order": 148,
      "sourceNumber": 10,
      "company": "LinkedIn",
      "title": "Building the Infrastructure for Delivering Labor Market Insights from LinkedIn Data",
      "url": "https://www.linkedin.com/blog/engineering/economic-graph/from-the-economic-graph-to-economic-insights-building-the-infra",
      "topics": [
        "Data Engineering"
      ],
      "year": 2023,
      "guide": "构建提供劳动力市场洞察的数据基础设施",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "149",
      "order": 149,
      "sourceNumber": 11,
      "company": "LinkedIn",
      "title": "Upscaling LinkedIn's Profile Datastore While Reducing Costs",
      "url": "https://www.linkedin.com/blog/engineering/data-management/upscaling-profile-datastore-while-reducing-costs",
      "topics": [
        "Databases",
        "Cost Optimization"
      ],
      "year": 2023,
      "guide": "扩展用户资料存储并降低成本",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "150",
      "order": 150,
      "sourceNumber": 12,
      "company": "LinkedIn",
      "title": "Unifying Messaging Experiences across LinkedIn",
      "url": "https://www.linkedin.com/blog/engineering/messaging-notifications/unifying-messaging-experiences-across-linkedin",
      "topics": [
        "Messaging"
      ],
      "year": 2023,
      "guide": "统一 LinkedIn 的消息体验",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "151",
      "order": 151,
      "sourceNumber": 13,
      "company": "LinkedIn",
      "title": "Applying multitask learning to AI models at LinkedIn",
      "url": "https://www.linkedin.com/blog/engineering/data-modeling/applying-multitask-learning-to-ai-models-at-linkedin",
      "topics": [
        "AI/ML"
      ],
      "year": 2022,
      "guide": "在 AI 模型中应用多任务学习",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "152",
      "order": 152,
      "sourceNumber": 14,
      "company": "LinkedIn",
      "title": "Building a mutable dataset in data lake",
      "url": "https://www.linkedin.com/blog/engineering/data-management/opal-building-a-mutable-dataset-in-data-lake",
      "topics": [
        "Data Engineering"
      ],
      "year": 2022,
      "guide": "在数据湖中构建可变数据集",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "153",
      "order": 153,
      "sourceNumber": 15,
      "company": "LinkedIn",
      "title": "Completing a member knowledge graph with Graph Neural Networks",
      "url": "https://www.linkedin.com/blog/engineering/knowledge/completing-a-member-knowledge-graph-with-graph-neural-networks",
      "topics": [
        "AI/ML"
      ],
      "year": 2021,
      "guide": "用图神经网络补全会员知识图谱",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "154",
      "order": 154,
      "sourceNumber": 16,
      "company": "LinkedIn",
      "title": "Homepage feed multi-task learning using TensorFlow",
      "url": "https://www.linkedin.com/blog/engineering/feed/homepage-feed-multi-task-learning-using-tensorflow",
      "topics": [
        "AI/ML"
      ],
      "year": 2021,
      "guide": "用 TensorFlow 实现首页信息流多任务学习",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "155",
      "order": 155,
      "sourceNumber": 17,
      "company": "LinkedIn",
      "title": "Evolving LinkedIn's analytics tech stack",
      "url": "https://www.linkedin.com/blog/engineering/analytics/evolving-linkedin-s-analytics-tech-stack",
      "topics": [
        "Data Engineering"
      ],
      "year": 2021,
      "guide": "演进 LinkedIn 的分析技术栈",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "156",
      "order": 156,
      "sourceNumber": 18,
      "company": "LinkedIn",
      "title": "Scaling LinkedIn's Hadoop YARN cluster beyond 10,000 nodes",
      "url": "https://www.linkedin.com/blog/engineering/open-source/scaling-linkedin-s-hadoop-yarn-cluster-beyond-10-000-nodes",
      "topics": [
        "Infrastructure",
        "Data Engineering"
      ],
      "year": 2021,
      "guide": "将 Hadoop YARN 集群扩展到万节点以上",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "157",
      "order": 157,
      "sourceNumber": 19,
      "company": "LinkedIn",
      "title": "HTTP/2 in infrastructure: Ambry network stack refactoring",
      "url": "https://www.linkedin.com/blog/engineering/optimization/http-2-in-infrastructure-ambry-network-stack-refactoring",
      "topics": [
        "Infrastructure",
        "Performance"
      ],
      "year": 2021,
      "guide": "通过 HTTP/2 重构 Ambry 网络栈",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "158",
      "order": 158,
      "sourceNumber": 20,
      "company": "LinkedIn",
      "title": "Building a heterogeneous social network recommendation system",
      "url": "https://www.linkedin.com/blog/engineering/optimization/building-a-heterogeneous-social-network-recommendation-system",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2020,
      "guide": "构建异构社交网络推荐系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "159",
      "order": 159,
      "sourceNumber": 1,
      "company": "Lyft",
      "title": "From Big Data to Better Data: Ensuring Data Quality with Verity",
      "url": "https://eng.lyft.com/from-big-data-to-better-data-ensuring-data-quality-with-verity-a996b49343f6",
      "topics": [
        "Data Engineering"
      ],
      "year": 2023,
      "guide": "用 Verity 提升数据质量",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "160",
      "order": 160,
      "sourceNumber": 2,
      "company": "Lyft",
      "title": "Building Real-time Machine Learning Foundations at Lyft",
      "url": "https://eng.lyft.com/building-real-time-machine-learning-foundations-at-lyft-6dd99b385a4e",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2023,
      "guide": "建设实时机器学习基础能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "161",
      "order": 161,
      "sourceNumber": 3,
      "company": "Lyft",
      "title": "The Recommendation System at Lyft",
      "url": "https://eng.lyft.com/the-recommendation-system-at-lyft-67bc9dcc1793",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2023,
      "guide": "理解 Lyft 推荐系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "162",
      "order": 162,
      "sourceNumber": 4,
      "company": "Lyft",
      "title": "lyft2vec — Embeddings at Lyft",
      "url": "https://eng.lyft.com/lyft2vec-embeddings-at-lyft-d4231a76d219",
      "topics": [
        "AI/ML"
      ],
      "year": 2023,
      "guide": "使用 lyft2vec 构建向量表示",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "163",
      "order": 163,
      "sourceNumber": 5,
      "company": "Lyft",
      "title": "Powering Millions of Real-Time Decisions with LyftLearn Serving",
      "url": "https://eng.lyft.com/powering-millions-of-real-time-decisions-with-lyftlearn-serving-9bb1f73318dc",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2023,
      "guide": "用 LyftLearn Serving 支撑实时决策",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "164",
      "order": 164,
      "sourceNumber": 6,
      "company": "Lyft",
      "title": "Pricing at Lyft",
      "url": "https://eng.lyft.com/pricing-at-lyft-8a4022065f8b",
      "topics": [
        "Architecture"
      ],
      "year": 2022,
      "guide": "探索 Lyft 的定价机制",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "165",
      "order": 165,
      "sourceNumber": 7,
      "company": "Lyft",
      "title": "ML Model Training Infrastructure built on Kubernetes",
      "url": "https://eng.lyft.com/lyftlearn-ml-model-training-infrastructure-built-on-kubernetes-aef8218842bb",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2021,
      "guide": "在 Kubernetes 上建设模型训练基础设施",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "166",
      "order": 166,
      "sourceNumber": 8,
      "company": "Lyft",
      "title": "Elasticsearch Optimizations at Lyft",
      "url": "https://eng.lyft.com/elasticsearch-optimizations-at-lyft-b555dc020932",
      "topics": [
        "Search",
        "Performance"
      ],
      "year": 2021,
      "guide": "优化 Elasticsearch 的使用",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "167",
      "order": 167,
      "sourceNumber": 9,
      "company": "Lyft",
      "title": "How Lyft discovered OpenStreetMap is the Freshest Map for Rideshare",
      "url": "https://eng.lyft.com/how-lyft-discovered-openstreetmap-is-the-freshest-map-for-rideshare-a7a41bf92ec",
      "topics": [
        "Data Engineering"
      ],
      "year": 2021,
      "guide": "评估 OpenStreetMap 对网约车地图时效性的价值",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "168",
      "order": 168,
      "sourceNumber": 10,
      "company": "Lyft",
      "title": "Using Client-Side Map Data to Improve Real-Time Positioning",
      "url": "https://eng.lyft.com/using-client-side-map-data-to-improve-real-time-positioning-a382585ac6e",
      "topics": [
        "Mobile"
      ],
      "year": 2021,
      "guide": "利用客户端地图数据改善实时定位",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "169",
      "order": 169,
      "sourceNumber": 11,
      "company": "Lyft",
      "title": "How Lyft predicts a rider's destination for better in-app experience",
      "url": "https://eng.lyft.com/how-lyft-predicts-your-destination-with-attention-791146b0a439",
      "topics": [
        "AI/ML"
      ],
      "year": 2020,
      "guide": "预测乘客目的地以改善应用体验",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "170",
      "order": 170,
      "sourceNumber": 12,
      "company": "Lyft",
      "title": "A New Real-Time Map-Matching Algorithm at Lyft",
      "url": "https://eng.lyft.com/a-new-real-time-map-matching-algorithm-at-lyft-da593ab7b006",
      "topics": [
        "AI/ML"
      ],
      "year": 2020,
      "guide": "设计实时地图匹配算法",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "171",
      "order": 171,
      "sourceNumber": 1,
      "company": "Netflix",
      "title": "Foundation Model for Personalized Recommendation",
      "url": "https://netflixtechblog.com/foundation-model-for-personalized-recommendation-1a0bd8e02d39",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2025,
      "guide": "将基础模型用于个性化推荐",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "172",
      "order": 172,
      "sourceNumber": 2,
      "company": "Netflix",
      "title": "How Netflix processes billions of impressions daily",
      "url": "https://netflixtechblog.com/introducing-impressions-at-netflix-e2b67c88c9fb",
      "topics": [
        "Data Engineering"
      ],
      "year": 2025,
      "guide": "处理每天数十亿次曝光事件",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "173",
      "order": 173,
      "sourceNumber": 3,
      "company": "Netflix",
      "title": "Netflix's Distributed Counter Abstraction",
      "url": "https://netflixtechblog.com/netflixs-distributed-counter-abstraction-8d0c45eb66b2",
      "topics": [
        "Architecture"
      ],
      "year": 2024,
      "guide": "抽象分布式计数能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "174",
      "order": 174,
      "sourceNumber": 4,
      "company": "Netflix",
      "title": "Evolving Netflix's WebSocket proxy for the future",
      "url": "https://netflixtechblog.com/pushy-to-the-limit-evolving-netflixs-websocket-proxy-for-the-future-b468bc0ff658",
      "topics": [
        "Messaging",
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "演进 WebSocket 代理架构",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "175",
      "order": 175,
      "sourceNumber": 5,
      "company": "Netflix",
      "title": "Netflix's Key-Value Data Abstraction Layer",
      "url": "https://netflixtechblog.com/introducing-netflixs-key-value-data-abstraction-layer-1ea8a0a11b30",
      "topics": [
        "Databases"
      ],
      "year": 2024,
      "guide": "建立统一键值数据访问抽象",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "176",
      "order": 176,
      "sourceNumber": 6,
      "company": "Netflix",
      "title": "Netflix's TimeSeries Data Abstraction Layer",
      "url": "https://netflixtechblog.com/introducing-netflix-timeseries-data-abstraction-layer-31552f6326f8",
      "topics": [
        "Databases"
      ],
      "year": 2024,
      "guide": "建立时间序列数据访问抽象",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "177",
      "order": 177,
      "sourceNumber": 7,
      "company": "Netflix",
      "title": "Recommending for Long-Term Member Satisfaction at Netflix",
      "url": "https://netflixtechblog.com/recommending-for-long-term-member-satisfaction-at-netflix-ac15cada49ef",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "面向会员长期满意度进行推荐",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "178",
      "order": 178,
      "sourceNumber": 8,
      "company": "Netflix",
      "title": "Maestro: Data/ML Workflow Orchestrator at Netflix",
      "url": "https://netflixtechblog.com/maestro-netflixs-workflow-orchestrator-ee13a06f9c78",
      "topics": [
        "Data Engineering",
        "AI/ML"
      ],
      "year": 2024,
      "guide": "用 Maestro 编排数据与机器学习工作流",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "179",
      "order": 179,
      "sourceNumber": 9,
      "company": "Netflix",
      "title": "Reverse Searching Netflix's Federated Graph",
      "url": "https://netflixtechblog.com/reverse-searching-netflixs-federated-graph-222ac5d23576",
      "topics": [
        "Architecture",
        "Search"
      ],
      "year": 2024,
      "guide": "在联邦图中进行反向搜索",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "180",
      "order": 180,
      "sourceNumber": 10,
      "company": "Netflix",
      "title": "Supporting Diverse ML Systems at Netflix",
      "url": "https://netflixtechblog.com/supporting-diverse-ml-systems-at-netflix-2d2e6b6d205d",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "支撑多样化的机器学习系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "181",
      "order": 181,
      "sourceNumber": 11,
      "company": "Netflix",
      "title": "Rebuilding Netflix Video Processing Pipeline with Microservices",
      "url": "https://netflixtechblog.com/rebuilding-netflix-video-processing-pipeline-with-microservices-4e5e6310e359",
      "topics": [
        "Video/Media",
        "Architecture"
      ],
      "year": 2024,
      "guide": "用微服务重建视频处理管道",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "182",
      "order": 182,
      "sourceNumber": 12,
      "company": "Netflix",
      "title": "Building In-Video Search",
      "url": "https://netflixtechblog.com/building-in-video-search-936766f0017c",
      "topics": [
        "Search",
        "Video/Media"
      ],
      "year": 2023,
      "guide": "构建视频内部内容搜索",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "183",
      "order": 183,
      "sourceNumber": 13,
      "company": "Netflix",
      "title": "Streaming SQL in Data Mesh",
      "url": "https://netflixtechblog.com/streaming-sql-in-data-mesh-0d83f5a00d08",
      "topics": [
        "Data Engineering"
      ],
      "year": 2023,
      "guide": "在数据网格中运行流式 SQL",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "184",
      "order": 184,
      "sourceNumber": 14,
      "company": "Netflix",
      "title": "Migrating Netflix to GraphQL Safely",
      "url": "https://netflixtechblog.com/migrating-netflix-to-graphql-safely-8e1e4d4f1e72",
      "topics": [
        "Architecture"
      ],
      "year": 2023,
      "guide": "安全地迁移至 GraphQL",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "185",
      "order": 185,
      "sourceNumber": 15,
      "company": "Netflix",
      "title": "Scaling Media Machine Learning at Netflix",
      "url": "https://netflixtechblog.com/scaling-media-machine-learning-at-netflix-f19b400243",
      "topics": [
        "AI/ML",
        "Video/Media"
      ],
      "year": 2023,
      "guide": "扩展媒体机器学习能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "186",
      "order": 186,
      "sourceNumber": 16,
      "company": "Netflix",
      "title": "Building a Media Understanding Platform for ML Innovations",
      "url": "https://netflixtechblog.com/building-a-media-understanding-platform-for-ml-innovations-9bef9962dcb7",
      "topics": [
        "AI/ML",
        "Video/Media"
      ],
      "year": 2023,
      "guide": "建设媒体理解平台以支持机器学习创新",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "187",
      "order": 187,
      "sourceNumber": 17,
      "company": "Netflix",
      "title": "Finding Cuts with Smooth Visual Transitions Using Machine Learning",
      "url": "https://netflixtechblog.com/match-cutting-at-netflix-finding-cuts-with-smooth-visual-transitions-31c3fc14ae59",
      "topics": [
        "AI/ML",
        "Video/Media"
      ],
      "year": 2022,
      "guide": "用机器学习寻找视觉过渡平滑的剪辑点",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "188",
      "order": 188,
      "sourceNumber": 18,
      "company": "Netflix",
      "title": "Machine Learning for Fraud Detection in Streaming Services",
      "url": "https://netflixtechblog.com/machine-learning-for-fraud-detection-in-streaming-services-b0b4ef3be3f6",
      "topics": [
        "AI/ML",
        "Security"
      ],
      "year": 2022,
      "guide": "在流媒体服务中用机器学习检测欺诈",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "189",
      "order": 189,
      "sourceNumber": 19,
      "company": "Netflix",
      "title": "Netflix's High-Throughput, Low-Latency Priority Queueing System",
      "url": "https://netflixtechblog.com/timestone-netflixs-high-throughput-low-latency-priority-queueing-system-with-built-in-support-1abf249ba95f",
      "topics": [
        "Architecture",
        "Performance"
      ],
      "year": 2022,
      "guide": "构建高吞吐、低延迟优先级队列",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "190",
      "order": 190,
      "sourceNumber": 20,
      "company": "Netflix",
      "title": "Rapid Event Notification System at Netflix",
      "url": "https://netflixtechblog.com/rapid-event-notification-system-at-netflix-6deb1d2b57d1",
      "topics": [
        "Messaging"
      ],
      "year": 2022,
      "guide": "建设快速事件通知系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "191",
      "order": 191,
      "sourceNumber": 21,
      "company": "Netflix",
      "title": "Building Netflix's Distributed Tracing Infrastructure",
      "url": "https://netflixtechblog.com/building-netflixs-distributed-tracing-infrastructure-bb856c319304",
      "topics": [
        "Observability"
      ],
      "year": 2020,
      "guide": "构建分布式追踪基础设施",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "192",
      "order": 192,
      "sourceNumber": 1,
      "company": "Notion",
      "title": "Building and scaling Notion's data lake",
      "url": "https://www.notion.com/blog/building-and-scaling-notions-data-lake",
      "topics": [
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "构建并扩展 Notion 数据湖",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "193",
      "order": 193,
      "sourceNumber": 2,
      "company": "Notion",
      "title": "How we sped up Notion in the browser with WASM SQLite",
      "url": "https://www.notion.com/blog/how-we-sped-up-notion-in-the-browser-with-wasm-sqlite",
      "topics": [
        "Performance",
        "Frontend"
      ],
      "year": 2024,
      "guide": "用 WASM SQLite 加速浏览器中的 Notion",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "194",
      "order": 194,
      "sourceNumber": 3,
      "company": "Notion",
      "title": "The Great Re-shard: adding Postgres capacity (again) with zero downtime",
      "url": "https://www.notion.com/blog/the-great-re-shard",
      "topics": [
        "Databases"
      ],
      "year": 2023,
      "guide": "通过不停机重新分片增加 Postgres 容量",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "195",
      "order": 195,
      "sourceNumber": 4,
      "company": "Notion",
      "title": "Creating the Notion API",
      "url": "https://www.notion.com/blog/creating-the-notion-api",
      "topics": [
        "Architecture"
      ],
      "year": 2022,
      "guide": "设计并创建 Notion API",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "196",
      "order": 196,
      "sourceNumber": 5,
      "company": "Notion",
      "title": "The data model behind Notion's flexibility",
      "url": "https://www.notion.com/blog/data-model-behind-notion",
      "topics": [
        "Architecture",
        "Databases"
      ],
      "year": 2021,
      "guide": "理解支撑 Notion 灵活性的数据模型",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "197",
      "order": 197,
      "sourceNumber": 6,
      "company": "Notion",
      "title": "Lessons learned from sharding Postgres at Notion",
      "url": "https://www.notion.com/blog/sharding-postgres-at-notion",
      "topics": [
        "Databases"
      ],
      "year": 2021,
      "guide": "总结 Postgres 分片的实践经验",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "198",
      "order": 198,
      "sourceNumber": 1,
      "company": "PayPal",
      "title": "Scaling PayPal's AI Capabilities with PayPal Cosmos.AI Platform",
      "url": "https://medium.com/paypal-tech/scaling-paypals-ai-capabilities-with-paypal-cosmos-ai-platform-e67a48e04691",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "用 Cosmos.AI 平台扩展 AI 能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "199",
      "order": 199,
      "sourceNumber": 2,
      "company": "PayPal",
      "title": "Scaling Kafka to Support PayPal's Data Growth",
      "url": "https://medium.com/paypal-tech/scaling-kafka-to-support-paypals-data-growth-a0b4da420fab",
      "topics": [
        "Data Engineering"
      ],
      "year": 2023,
      "guide": "扩展 Kafka 以应对数据增长",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "200",
      "order": 200,
      "sourceNumber": 3,
      "company": "PayPal",
      "title": "JunoDB: PayPal's Key-Value Store",
      "url": "https://medium.com/paypal-tech/unlocking-the-power-of-junodb-paypals-key-value-store-goes-open-source-ee85f935bdc1",
      "topics": [
        "Databases"
      ],
      "year": 2023,
      "guide": "理解 PayPal 的 JunoDB 键值存储",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "201",
      "order": 201,
      "sourceNumber": 4,
      "company": "PayPal",
      "title": "Scaling Kubernetes to Over 4k Nodes and 200k Pods",
      "url": "https://medium.com/paypal-tech/scaling-kubernetes-to-over-4k-nodes-and-200k-pods-29988fad6ed",
      "topics": [
        "Infrastructure"
      ],
      "year": 2022,
      "guide": "扩展 Kubernetes 至数千节点与数十万 Pod",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "202",
      "order": 202,
      "sourceNumber": 5,
      "company": "PayPal",
      "title": "GraphQL at PayPal: An Adoption Story",
      "url": "https://medium.com/paypal-tech/graphql-at-paypal-an-adoption-story-b7e01175f2b7",
      "topics": [
        "Architecture"
      ],
      "year": 2021,
      "guide": "回顾 GraphQL 在 PayPal 的采用过程",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "203",
      "order": 203,
      "sourceNumber": 6,
      "company": "PayPal",
      "title": "How PayPal Uses Real-time Graph Database and Graph Analysis to Fight Fraud",
      "url": "https://medium.com/paypal-tech/how-paypal-uses-real-time-graph-database-and-graph-analysis-to-fight-fraud-96a2b918619a",
      "topics": [
        "Security",
        "Databases"
      ],
      "year": 2021,
      "guide": "使用实时图数据库与图分析打击欺诈",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "204",
      "order": 204,
      "sourceNumber": 7,
      "company": "PayPal",
      "title": "Next-Gen Data Movement Platform at PayPal",
      "url": "https://medium.com/paypal-tech/next-gen-data-movement-platform-at-paypal-100f70a7a6b",
      "topics": [
        "Data Engineering"
      ],
      "year": 2021,
      "guide": "构建下一代数据传输平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "205",
      "order": 205,
      "sourceNumber": 8,
      "company": "PayPal",
      "title": "Deploying Large-scale Fraud Detection Machine Learning Models at PayPal",
      "url": "https://medium.com/paypal-tech/machine-learning-model-ci-cd-and-shadow-platform-8c4f44998c78",
      "topics": [
        "AI/ML",
        "Security"
      ],
      "year": 2021,
      "guide": "部署大规模反欺诈机器学习模型",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "206",
      "order": 206,
      "sourceNumber": 1,
      "company": "Pinterest",
      "title": "How Pinterest improved Search Relevance using LLMs",
      "url": "https://medium.com/pinterest-engineering/improving-pinterest-search-relevance-using-large-language-models-4cd938d4e892",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2025,
      "guide": "用大语言模型改善搜索相关性",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "207",
      "order": 207,
      "sourceNumber": 2,
      "company": "Pinterest",
      "title": "How Pinterest built it's Text-to-SQL feature",
      "url": "https://medium.com/pinterest-engineering/how-we-built-text-to-sql-at-pinterest-30bad30dabff",
      "topics": [
        "AI/ML",
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "构建自然语言转 SQL 功能",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "208",
      "order": 208,
      "sourceNumber": 3,
      "company": "Pinterest",
      "title": "Change Data Capture at Pinterest",
      "url": "https://medium.com/pinterest-engineering/change-data-capture-at-pinterest-7e4c357ac527",
      "topics": [
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "建设变更数据捕获能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "209",
      "order": 209,
      "sourceNumber": 4,
      "company": "Pinterest",
      "title": "Real Time Anomaly Detection at Pinterest",
      "url": "https://medium.com/pinterest-engineering/warden-real-time-anomaly-detection-at-pinterest-210c122f6afa",
      "topics": [
        "Observability"
      ],
      "year": 2023,
      "guide": "实时检测业务与系统异常",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "210",
      "order": 210,
      "sourceNumber": 5,
      "company": "Pinterest",
      "title": "Improving Distributed Caching Performance and Efficiency at Pinterest",
      "url": "https://medium.com/pinterest-engineering/improving-distributed-caching-performance-and-efficiency-at-pinterest-92484b5fe39b",
      "topics": [
        "Caching"
      ],
      "year": 2022,
      "guide": "提升分布式缓存的性能与效率",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "211",
      "order": 211,
      "sourceNumber": 6,
      "company": "Pinterest",
      "title": "How Pinterest Leverages Realtime User Actions to Boost Homefeed Engagement Volume",
      "url": "https://medium.com/pinterest-engineering/how-pinterest-leverages-realtime-user-actions-in-recommendation-to-boost-homefeed-engagement-volume-165ae2e8cde8",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2022,
      "guide": "利用实时用户行为改善首页互动",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "212",
      "order": 212,
      "sourceNumber": 7,
      "company": "Pinterest",
      "title": "How Pinterest scaled the size of it's ad corpus by 60x",
      "url": "https://medium.com/pinterest-engineering/how-we-scaled-the-size-of-pinterests-ad-corpus-by-60x-d6d5bfa6bf16",
      "topics": [
        "Performance"
      ],
      "year": 2021,
      "guide": "大幅扩展广告候选集合",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "213",
      "order": 213,
      "sourceNumber": 8,
      "company": "Pinterest",
      "title": "The machine learning behind delivering relevant ads",
      "url": "https://medium.com/pinterest-engineering/the-machine-learning-behind-delivering-relevant-ads-8987fc5ba1c0",
      "topics": [
        "AI/ML"
      ],
      "year": 2021,
      "guide": "用机器学习投放相关广告",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "214",
      "order": 214,
      "sourceNumber": 1,
      "company": "Quora",
      "title": "Building Embedding Search at Quora",
      "url": "https://quoraengineering.quora.com/Building-Embedding-Search-at-Quora",
      "topics": [
        "Search",
        "AI/ML"
      ],
      "year": 2024,
      "guide": "构建基于向量表示的搜索",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "215",
      "order": 215,
      "sourceNumber": 2,
      "company": "Quora",
      "title": "Migrating a decade of Redshift usages to Trino at Quora",
      "url": "https://quoraengineering.quora.com/Migrating-a-decade-of-Redshift-usages-to-Trino-at-Quora",
      "topics": [
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "将多年 Redshift 分析负载迁移至 Trino",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "216",
      "order": 216,
      "sourceNumber": 3,
      "company": "Quora",
      "title": "Trino at Quora Scale: Cost, Speed, and Reliability",
      "url": "https://quoraengineering.quora.com/Trino-at-Quora-Scale-Cost-Speed-and-Reliability",
      "topics": [
        "Data Engineering",
        "Performance"
      ],
      "year": 2023,
      "guide": "平衡 Trino 的成本、速度与可靠性",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "217",
      "order": 217,
      "sourceNumber": 4,
      "company": "Quora",
      "title": "MySQL sharding at Quora",
      "url": "https://quoraengineering.quora.com/MySQL-sharding-at-Quora",
      "topics": [
        "Databases"
      ],
      "year": 2020,
      "guide": "在 Quora 实施 MySQL 分片",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "218",
      "order": 218,
      "sourceNumber": 1,
      "company": "Razorpay",
      "title": "Razorpay's Authentication Revamp",
      "url": "https://engineering.razorpay.com/razorpays-authentication-revamp-turbocharging-performance-b8bb9d750fe8",
      "topics": [
        "Performance",
        "Security"
      ],
      "year": 2023,
      "guide": "重构 Razorpay 身份认证系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "219",
      "order": 219,
      "sourceNumber": 2,
      "company": "Razorpay",
      "title": "The Making of Razorpay Developer-Console",
      "url": "https://engineering.razorpay.com/the-making-of-developer-console-978018ce2aed",
      "topics": [
        "Frontend"
      ],
      "year": 2023,
      "guide": "构建开发者控制台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "220",
      "order": 220,
      "sourceNumber": 3,
      "company": "Razorpay",
      "title": "How Razorpay Reduced Data Platform Cost by $2M",
      "url": "https://engineering.razorpay.com/reducing-data-platform-cost-by-2m-d8f82285c4ae",
      "topics": [
        "Cost Optimization"
      ],
      "year": 2023,
      "guide": "降低数据平台成本",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "221",
      "order": 221,
      "sourceNumber": 4,
      "company": "Razorpay",
      "title": "Reducing Kubernetes cost by $300,000 at Razorpay",
      "url": "https://engineering.razorpay.com/the-culture-of-cost-optimization-reducing-kubernetes-cost-by-300-000-32611cdd19d9",
      "topics": [
        "Cost Optimization",
        "Infrastructure"
      ],
      "year": 2023,
      "guide": "降低 Kubernetes 运行成本",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "222",
      "order": 222,
      "sourceNumber": 5,
      "company": "Razorpay",
      "title": "How does Razorpay Capital Detect Duplicate or Fraud Merchants?",
      "url": "https://engineering.razorpay.com/how-does-razorpay-capital-detect-duplicate-or-fraud-merchants-5ddc67e1535a",
      "topics": [
        "Security",
        "AI/ML"
      ],
      "year": 2023,
      "guide": "发现重复或欺诈商户",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "223",
      "order": 223,
      "sourceNumber": 6,
      "company": "Razorpay",
      "title": "Razorpay's Real-Time Denormalized Data Streaming Platform",
      "url": "https://engineering.razorpay.com/real-time-denormalized-data-streaming-platform-part-3-optimisations-and-monitoring-5f7a58d9d97",
      "topics": [
        "Data Engineering"
      ],
      "year": 2023,
      "guide": "构建实时反规范化数据流平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "224",
      "order": 224,
      "sourceNumber": 7,
      "company": "Razorpay",
      "title": "How Razorpay's Notification Service Handles Increasing Load",
      "url": "https://engineering.razorpay.com/how-razorpays-notification-service-handles-increasing-load-f787623a490f",
      "topics": [
        "Messaging",
        "Performance"
      ],
      "year": 2022,
      "guide": "让通知服务承载持续增长的负载",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "225",
      "order": 225,
      "sourceNumber": 8,
      "company": "Razorpay",
      "title": "How Trino and Alluxio power analytics at Razorpay",
      "url": "https://engineering.razorpay.com/how-trino-and-alluxio-power-analytics-at-razorpay-803d3386daaf",
      "topics": [
        "Data Engineering"
      ],
      "year": 2022,
      "guide": "用 Trino 与 Alluxio 支撑数据分析",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "226",
      "order": 226,
      "sourceNumber": 9,
      "company": "Razorpay",
      "title": "Handling Burst Traffic During IPL",
      "url": "https://engineering.razorpay.com/ipl-razorpays-second-innings-ae7c86b0894c",
      "topics": [
        "Performance",
        "Infrastructure"
      ],
      "year": 2021,
      "guide": "应对 IPL 赛事期间的突发流量",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "227",
      "order": 227,
      "sourceNumber": 1,
      "company": "Reddit",
      "title": "Evolving Reddit's Media Infrastructure",
      "url": "https://www.reddit.com/r/RedditEng/comments/1k4o2mc/evolving_reddits_media_infrastructure/",
      "topics": [
        "Video/Media",
        "Infrastructure"
      ],
      "year": 2025,
      "guide": "演进 Reddit 媒体基础设施",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "228",
      "order": 228,
      "sourceNumber": 2,
      "company": "Reddit",
      "title": "Scaling our Apache Flink powered real-time ad event validation pipeline",
      "url": "https://www.reddit.com/r/RedditEng/comments/1ijcfge/scaling_our_apache_flink_powered_realtime_ad/",
      "topics": [
        "Data Engineering"
      ],
      "year": 2025,
      "guide": "扩展基于 Flink 的实时广告事件验证管道",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "229",
      "order": 229,
      "sourceNumber": 3,
      "company": "Reddit",
      "title": "Scaling Reddit's ad-serving system",
      "url": "https://www.reddit.com/r/RedditEng/comments/1gzua17/scaling_ads_serving_find_and_eliminate_redundant/",
      "topics": [
        "Performance"
      ],
      "year": 2024,
      "guide": "扩展广告投放系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "230",
      "order": 230,
      "sourceNumber": 4,
      "company": "Reddit",
      "title": "Product Candidate Generation for Reddit Dynamic Product Ads",
      "url": "https://www.reddit.com/r/RedditEng/comments/1gug4x9/product_candidate_generation_for_reddit_dynamic/",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "为动态商品广告生成商品候选项",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "231",
      "order": 231,
      "sourceNumber": 5,
      "company": "Reddit",
      "title": "Scaling Ads Pacing: from Singleton to Sharded",
      "url": "https://www.reddit.com/r/RedditEng/comments/1e5mhs3/scaling_ads_pacing_from_singleton_to_sharded/",
      "topics": [
        "Architecture"
      ],
      "year": 2024,
      "guide": "将广告投放节奏控制从单实例改为分片",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "232",
      "order": 232,
      "sourceNumber": 6,
      "company": "Reddit",
      "title": "Introducing a Global Retrieval Ranking Model in the Ads Funnel",
      "url": "https://www.reddit.com/r/RedditEng/comments/1d2wfsd/introducing_a_global_retrieval_ranking_model_in/",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "在广告漏斗中引入全局召回排序模型",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "233",
      "order": 233,
      "sourceNumber": 7,
      "company": "Reddit",
      "title": "Building an Experiment-Based Routing Service",
      "url": "https://www.reddit.com/r/RedditEng/comments/1c4pkql/building_an_experimentbased_routing_service/",
      "topics": [
        "Architecture"
      ],
      "year": 2023,
      "guide": "构建基于实验的路由服务",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "234",
      "order": 234,
      "sourceNumber": 8,
      "company": "Reddit",
      "title": "The Reddit Media Metadata Store",
      "url": "https://www.reddit.com/r/RedditEng/comments/1avlywv/the_reddit_media_metadata_store/",
      "topics": [
        "Video/Media",
        "Databases"
      ],
      "year": 2023,
      "guide": "设计 Reddit 媒体元数据存储",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "235",
      "order": 235,
      "sourceNumber": 1,
      "company": "Salesforce",
      "title": "Scaling Real-Time Search to 30 Billion Queries with Sub-Second Latency and 0% Downtime",
      "url": "https://engineering.salesforce.com/scaling-real-time-search-to-30-billion-queries-with-sub-second-latency-and-0-downtime/",
      "topics": [
        "Search",
        "Performance"
      ],
      "year": 2025,
      "guide": "扩展低延迟实时搜索服务",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "236",
      "order": 236,
      "sourceNumber": 2,
      "company": "Salesforce",
      "title": "Scaling Agentic AI Powering 2 Billion Predictions Monthly",
      "url": "https://engineering.salesforce.com/agentforce-scaling-agentic-ai-for-enterprise-automation-observability-powering-2-billion-predictions-monthly/",
      "topics": [
        "AI/ML"
      ],
      "year": 2025,
      "guide": "扩展支撑海量预测的智能体 AI 系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "237",
      "order": 237,
      "sourceNumber": 3,
      "company": "Salesforce",
      "title": "How Agentforce Data Library Powers RAG with 99.99% Uptime",
      "url": "https://engineering.salesforce.com/optimizing-ai-retrieval-how-agentforce-data-library-powers-rag-with-99-99-uptime/",
      "topics": [
        "AI/ML"
      ],
      "year": 2025,
      "guide": "用 Agentforce Data Library 支撑高可用 RAG",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "238",
      "order": 238,
      "sourceNumber": 4,
      "company": "Salesforce",
      "title": "Secrets for Managing 100,000 Training and Metadata Requests Per Minute",
      "url": "https://engineering.salesforce.com/scaling-ai-systems-secrets-for-managing-100000-training-and-metadata-requests-per-minute/",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "管理高并发训练与元数据请求",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "239",
      "order": 239,
      "sourceNumber": 5,
      "company": "Salesforce",
      "title": "Inside the Brain of Agentforce",
      "url": "https://engineering.salesforce.com/inside-the-brain-of-agentforce-revealing-the-atlas-reasoning-engine/",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "理解 Agentforce 的核心设计",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "240",
      "order": 240,
      "sourceNumber": 6,
      "company": "Salesforce",
      "title": "How Salesforce Supports Millions of Users Seamlessly for GenAI",
      "url": "https://engineering.salesforce.com/scaling-generative-ai-how-salesforce-supports-millions-of-users-seamlessly/",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "让生成式 AI 服务支持数百万用户",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "241",
      "order": 241,
      "sourceNumber": 7,
      "company": "Salesforce",
      "title": "Inside Salesforce's Scalable Time Series Forecasting AI Platform",
      "url": "https://engineering.salesforce.com/inside-salesforces-scalable-time-series-forecasting-ai-platform/",
      "topics": [
        "AI/ML",
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "建设可扩展的时间序列预测 AI 平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "242",
      "order": 242,
      "sourceNumber": 8,
      "company": "Salesforce",
      "title": "How Salesforce's Data Cloud Handles 250 Trillion Transactions Weekly",
      "url": "https://engineering.salesforce.com/the-unstructured-data-dilemma-how-data-cloud-handles-250-trillion-transactions-weekly/",
      "topics": [
        "Data Engineering",
        "Performance"
      ],
      "year": 2024,
      "guide": "用 Data Cloud 处理超大规模事务负载",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "243",
      "order": 243,
      "sourceNumber": 1,
      "company": "Shopify",
      "title": "How Shopify improved consumer search intent with real-time ML",
      "url": "https://shopify.engineering/how-shopify-improved-consumer-search-intent-with-real-time-ml",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2024,
      "guide": "用实时机器学习理解消费者搜索意图",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "244",
      "order": 244,
      "sourceNumber": 2,
      "company": "Shopify",
      "title": "Horizontally scaling the Rails backend of Shop app with Vitess",
      "url": "https://shopify.engineering/horizontally-scaling-the-rails-backend-of-shop-app-with-vitess",
      "topics": [
        "Databases",
        "Performance"
      ],
      "year": 2024,
      "guide": "用 Vitess 水平扩展 Rails 后端",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "245",
      "order": 245,
      "sourceNumber": 3,
      "company": "Shopify",
      "title": "Improving Shopify App's Performance",
      "url": "https://shopify.engineering/improving-shopify-app-s-performance",
      "topics": [
        "Performance",
        "Mobile"
      ],
      "year": 2024,
      "guide": "改善 Shopify 移动应用性能",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "246",
      "order": 246,
      "sourceNumber": 4,
      "company": "Shopify",
      "title": "Building a ShopifyQL Code Editor",
      "url": "https://shopify.engineering/building-a-shopifyql-code-editor",
      "topics": [
        "Frontend"
      ],
      "year": 2023,
      "guide": "构建 ShopifyQL 代码编辑器",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "247",
      "order": 247,
      "sourceNumber": 5,
      "company": "Shopify",
      "title": "Creating a Flexible Order Routing System with Shopify Functions",
      "url": "https://shopify.engineering/creating-a-flexible-order-routing-system-with-shopify-functions",
      "topics": [
        "Architecture"
      ],
      "year": 2023,
      "guide": "用 Shopify Functions 实现灵活订单路由",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "248",
      "order": 248,
      "sourceNumber": 6,
      "company": "Shopify",
      "title": "Using Server Sent Events to Simplify Real-time Streaming at Scale",
      "url": "https://shopify.engineering/server-sent-events-data-streaming",
      "topics": [
        "Architecture",
        "Data Engineering"
      ],
      "year": 2022,
      "guide": "用服务端发送事件简化实时数据流",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "249",
      "order": 249,
      "sourceNumber": 7,
      "company": "Shopify",
      "title": "Capturing Every Change From Shopify's Sharded Monolith",
      "url": "https://shopify.engineering/capturing-every-change-shopify-sharded-monolith",
      "topics": [
        "Data Engineering",
        "Architecture"
      ],
      "year": 2021,
      "guide": "捕获分片单体应用中的每次数据变更",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "250",
      "order": 250,
      "sourceNumber": 1,
      "company": "Slack",
      "title": "How Slack Optimizes its E2E Pipeline",
      "url": "https://slack.engineering/speedup-e2e-testing/",
      "topics": [
        "Infrastructure"
      ],
      "year": 2025,
      "guide": "加速端到端测试流水线",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "251",
      "order": 251,
      "sourceNumber": 2,
      "company": "Slack",
      "title": "How Slack built enterprise search to be secure and private",
      "url": "https://slack.engineering/how-we-built-enterprise-search-to-be-secure-and-private/",
      "topics": [
        "Search",
        "Security"
      ],
      "year": 2025,
      "guide": "为企业搜索保护安全与隐私",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "252",
      "order": 252,
      "sourceNumber": 3,
      "company": "Slack",
      "title": "Advancing Our Chef Infrastructure",
      "url": "https://slack.engineering/advancing-our-chef-infrastructure/",
      "topics": [
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "演进 Chef 基础设施",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "253",
      "order": 253,
      "sourceNumber": 4,
      "company": "Slack",
      "title": "How We Re-Architected Slack for Our Largest Customers",
      "url": "https://slack.engineering/unified-grid-how-we-re-architected-slack-for-our-largest-customers/",
      "topics": [
        "Architecture"
      ],
      "year": 2024,
      "guide": "为最大规模客户重构 Slack",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "254",
      "order": 254,
      "sourceNumber": 5,
      "company": "Slack",
      "title": "How Slack automatically detects stolen session cookies",
      "url": "https://slack.engineering/catching-compromised-cookies/",
      "topics": [
        "Security"
      ],
      "year": 2024,
      "guide": "自动检测被盗会话 Cookie",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "255",
      "order": 255,
      "sourceNumber": 6,
      "company": "Slack",
      "title": "How a request flows — from a Slack's user perspective",
      "url": "https://slack.engineering/traffic-101-packets-mostly-flow/",
      "topics": [
        "Architecture"
      ],
      "year": 2023,
      "guide": "从用户视角追踪请求流转路径",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "256",
      "order": 256,
      "sourceNumber": 7,
      "company": "Slack",
      "title": "Slack's Migration to a Cellular Architecture",
      "url": "https://slack.engineering/slacks-migration-to-a-cellular-architecture/",
      "topics": [
        "Architecture"
      ],
      "year": 2023,
      "guide": "用单元化架构缩小故障影响范围",
      "evidence": "reviewed",
      "review": {
        "summary": "让服务流量尽量留在同一可用区，并从入口逐步转移流量，降低单区异常的影响。",
        "problem": "局部网络故障造成各组件对可用性的判断不同，跨区调用使错误扩散到用户请求。",
        "approach": [
          "将可隔离服务按可用区组织成独立单元，限制跨区调用。",
          "使用 Envoy 的加权集群与动态权重在入口转移流量。",
          "让控制机制独立于被隔离的可用区，并支持逐步恢复流量。"
        ],
        "result": "原文展示渐进式流量排空，并说明控制更新与优雅处理在途请求的设计。",
        "tradeoff": "部分服务不能直接隔离，单元化也需要配套容量与控制平面。",
        "takeaway": "我们的启示：容灾设计应包含可操作的隔离与恢复路径，并用演练验证。",
        "sourceSection": "Background: the incident / Our solution: AZs are cells, and cells may be drained",
        "checkedAt": "2026-09-10"
      }
    },
    {
      "id": "257",
      "order": 257,
      "sourceNumber": 8,
      "company": "Slack",
      "title": "Real-time Messaging at Slack",
      "url": "https://slack.engineering/real-time-messaging/",
      "topics": [
        "Messaging"
      ],
      "year": 2023,
      "guide": "理解 Slack 的实时消息系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "258",
      "order": 258,
      "sourceNumber": 9,
      "company": "Slack",
      "title": "How Slack traces the flow of notifications across systems",
      "url": "https://slack.engineering/tracing-notifications/",
      "topics": [
        "Observability",
        "Messaging"
      ],
      "year": 2023,
      "guide": "跨系统追踪通知的流转过程",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "259",
      "order": 259,
      "sourceNumber": 10,
      "company": "Slack",
      "title": "Slack's Unified end-to-end machine learning infrastructure to generate recommendations",
      "url": "https://slack.engineering/recommend-api/",
      "topics": [
        "AI/ML"
      ],
      "year": 2023,
      "guide": "建设端到端统一推荐基础设施",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "260",
      "order": 260,
      "sourceNumber": 11,
      "company": "Slack",
      "title": "How We Design Our APIs at Slack",
      "url": "https://slack.engineering/how-we-design-our-apis-at-slack/",
      "topics": [
        "Architecture"
      ],
      "year": 2021,
      "guide": "总结 Slack API 设计方法",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "261",
      "order": 261,
      "sourceNumber": 12,
      "company": "Slack",
      "title": "How we built an eventually-consistent data model to predict Slack Connect invites",
      "url": "https://slack.engineering/email-classification/",
      "topics": [
        "AI/ML",
        "Architecture"
      ],
      "year": 2021,
      "guide": "用最终一致的数据模型预测 Slack Connect 邀请",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "262",
      "order": 262,
      "sourceNumber": 13,
      "company": "Slack",
      "title": "Migrating Millions of Concurrent Websockets to Envoy",
      "url": "https://slack.engineering/migrating-millions-of-concurrent-websockets-to-envoy/",
      "topics": [
        "Infrastructure",
        "Messaging"
      ],
      "year": 2021,
      "guide": "将海量并发 WebSocket 连接迁移到 Envoy",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "263",
      "order": 263,
      "sourceNumber": 14,
      "company": "Slack",
      "title": "Scaling Datastores at Slack with Vitess",
      "url": "https://slack.engineering/scaling-datastores-at-slack-with-vitess/",
      "topics": [
        "Databases"
      ],
      "year": 2020,
      "guide": "通过 Vitess 扩展数据存储",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "264",
      "order": 264,
      "sourceNumber": 1,
      "company": "Snap",
      "title": "Bento - Snap's ML Platform",
      "url": "https://eng.snap.com/introducing-bento",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2025,
      "guide": "介绍 Bento 机器学习平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "265",
      "order": 265,
      "sourceNumber": 2,
      "company": "Snap",
      "title": "Snap's Embedding-based Retrieval for its video recommendation system",
      "url": "https://eng.snap.com/embedding-based-retrieval",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2023,
      "guide": "为视频推荐构建向量召回",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "266",
      "order": 266,
      "sourceNumber": 3,
      "company": "Snap",
      "title": "How Snap Speed Up Feature Engineering for Recommendation Systems",
      "url": "https://eng.snap.com/speed-up-feature-engineering",
      "topics": [
        "AI/ML",
        "Data Engineering"
      ],
      "year": 2022,
      "guide": "加速推荐系统特征工程",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "267",
      "order": 267,
      "sourceNumber": 4,
      "company": "Snap",
      "title": "How Snap leverages synthetic data to boost the development of ML models",
      "url": "https://eng.snap.com/synthetic-data-for-machine-learning",
      "topics": [
        "AI/ML"
      ],
      "year": 2022,
      "guide": "用合成数据加快机器学习模型开发",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "268",
      "order": 268,
      "sourceNumber": 5,
      "company": "Snap",
      "title": "Training Large-Scale Recommendation Models with TPUs",
      "url": "https://eng.snap.com/training-models-with-tpus",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2022,
      "guide": "使用 TPU 训练大规模推荐模型",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "269",
      "order": 269,
      "sourceNumber": 6,
      "company": "Snap",
      "title": "Machine Learning for Snapchat Ad Ranking",
      "url": "https://eng.snap.com/machine-learning-snap-ad-ranking",
      "topics": [
        "AI/ML"
      ],
      "year": 2022,
      "guide": "用机器学习进行广告排序",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "270",
      "order": 270,
      "sourceNumber": 1,
      "company": "Spotify",
      "title": "How Spotify Generated Millions of Content Annotations",
      "url": "https://engineering.atspotify.com/2024/10/how-we-generated-millions-of-content-annotations/",
      "topics": [
        "AI/ML",
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "生成海量内容标注",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "271",
      "order": 271,
      "sourceNumber": 2,
      "company": "Spotify",
      "title": "Spotify's Data Platform",
      "url": "https://engineering.atspotify.com/2024/05/data-platform-explained-part-ii/",
      "topics": [
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "理解 Spotify 数据平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "272",
      "order": 272,
      "sourceNumber": 3,
      "company": "Spotify",
      "title": "The What, Why, and How of Mastering App Size",
      "url": "https://engineering.atspotify.com/2023/11/the-what-why-and-how-of-mastering-app-size/",
      "topics": [
        "Mobile",
        "Performance"
      ],
      "year": 2023,
      "guide": "系统性地控制移动应用体积",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "273",
      "order": 273,
      "sourceNumber": 4,
      "company": "Spotify",
      "title": "How Spotify Automated Content Marketing to Acquire Users at Scale",
      "url": "https://engineering.atspotify.com/2023/11/how-we-automated-content-marketing-to-acquire-users-at-scale/",
      "topics": [
        "AI/ML"
      ],
      "year": 2023,
      "guide": "自动化内容营销以扩大用户获取",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "274",
      "order": 274,
      "sourceNumber": 5,
      "company": "Spotify",
      "title": "How We Built Infrastructure to Run User Forecasts at Spotify",
      "url": "https://engineering.atspotify.com/2022/06/how-we-built-infrastructure-to-run-user-forecasts-at-spotify/",
      "topics": [
        "Infrastructure",
        "AI/ML"
      ],
      "year": 2022,
      "guide": "建设用户规模预测基础设施",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "275",
      "order": 275,
      "sourceNumber": 1,
      "company": "Stripe",
      "title": "Stripe's system for tracking and validating money movement",
      "url": "https://stripe.com/blog/ledger-stripe-system-for-tracking-and-validating-money-movement",
      "topics": [
        "Payments",
        "Architecture"
      ],
      "year": 2024,
      "guide": "用 Ledger 追踪并验证资金流动",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "276",
      "order": 276,
      "sourceNumber": 2,
      "company": "Stripe",
      "title": "How Stripe Processed $1 Trillion in Payments with Zero Downtime",
      "url": "https://stripe.com/blog/how-stripes-document-databases-supported-99.999-uptime-with-zero-downtime-data-migrations",
      "topics": [
        "Databases",
        "Payments"
      ],
      "year": 2023,
      "guide": "通过不停机数据库迁移支撑大规模支付",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "277",
      "order": 277,
      "sourceNumber": 3,
      "company": "Stripe",
      "title": "How Stripe built its fraud prevention system",
      "url": "https://stripe.com/blog/how-we-built-it-stripe-radar",
      "topics": [
        "Security",
        "Payments"
      ],
      "year": 2023,
      "guide": "构建 Stripe Radar 反欺诈系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "278",
      "order": 278,
      "sourceNumber": 4,
      "company": "Stripe",
      "title": "How Stripe builds interactive docs with Markdoc",
      "url": "https://stripe.com/blog/markdoc",
      "topics": [
        "Frontend"
      ],
      "year": 2022,
      "guide": "用 Markdoc 构建交互式文档",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "279",
      "order": 279,
      "sourceNumber": 5,
      "company": "Stripe",
      "title": "Stripe's payments APIs: The first 10 years",
      "url": "https://stripe.com/blog/payment-api-design",
      "topics": [
        "Architecture",
        "Payments"
      ],
      "year": 2020,
      "guide": "回顾支付 API 的十年设计演进",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "280",
      "order": 280,
      "sourceNumber": 1,
      "company": "Swiggy",
      "title": "Swiggy's Text-to-SQL Solution",
      "url": "https://bytes.swiggy.com/hermes-a-text-to-sql-solution-at-swiggy-81573fb4fb6e",
      "topics": [
        "AI/ML",
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "使用 Hermes 将自然语言转换为 SQL",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "281",
      "order": 281,
      "sourceNumber": 2,
      "company": "Swiggy",
      "title": "Optimising the picking process for faster Instamart deliveries",
      "url": "https://bytes.swiggy.com/optimizing-the-picking-process-to-enable-faster-deliveries-for-instamart-93de0fe9d819",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "优化拣货流程以加快配送",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "282",
      "order": 282,
      "sourceNumber": 3,
      "company": "Swiggy",
      "title": "Improving search relevance using small language models",
      "url": "https://bytes.swiggy.com/improving-search-relevance-in-hyperlocal-food-delivery-using-small-language-models-ecda2acc24e6",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2024,
      "guide": "用小语言模型改善本地餐饮搜索相关性",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "283",
      "order": 283,
      "sourceNumber": 4,
      "company": "Swiggy",
      "title": "Predicting Food Delivery Time at Cart",
      "url": "https://bytes.swiggy.com/predicting-food-delivery-time-at-cart-cda23a84ba63",
      "topics": [
        "AI/ML"
      ],
      "year": 2023,
      "guide": "在购物车阶段预测送达时间",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "284",
      "order": 284,
      "sourceNumber": 5,
      "company": "Swiggy",
      "title": "Contextual Bandits for Ads Recommendations",
      "url": "https://bytes.swiggy.com/contextual-bandits-for-ads-recommendations-ec210775fcf",
      "topics": [
        "AI/ML"
      ],
      "year": 2022,
      "guide": "用上下文多臂老虎机进行广告推荐",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "285",
      "order": 285,
      "sourceNumber": 6,
      "company": "Swiggy",
      "title": "Using deep learning to detect dissonance between address text and location",
      "url": "https://bytes.swiggy.com/using-deep-learning-to-detect-dissonance-between-address-text-and-location-4b228bc2c3fb",
      "topics": [
        "AI/ML"
      ],
      "year": 2022,
      "guide": "用深度学习检测地址文本与位置不一致",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "286",
      "order": 286,
      "sourceNumber": 7,
      "company": "Swiggy",
      "title": "Designing Resilient Microservices at Swiggy",
      "url": "https://bytes.swiggy.com/designing-resilient-microservices-part-1-6a72fe964759",
      "topics": [
        "Architecture"
      ],
      "year": 2021,
      "guide": "设计具有韧性的微服务",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "287",
      "order": 287,
      "sourceNumber": 8,
      "company": "Swiggy",
      "title": "Designing the Serviceability Platform at Swiggy for High Scale",
      "url": "https://bytes.swiggy.com/designing-the-serviceability-platform-at-swiggy-for-high-scale-part-2-ab20365fbc23",
      "topics": [
        "Architecture",
        "Performance"
      ],
      "year": 2021,
      "guide": "构建大规模配送可服务性平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "288",
      "order": 288,
      "sourceNumber": 9,
      "company": "Swiggy",
      "title": "A brief introduction to Engineering challenges at Swiggy",
      "url": "https://bytes.swiggy.com/engineering-challenges-at-swiggy-430dea6c86a3",
      "topics": [
        "Architecture"
      ],
      "year": 2021,
      "guide": "概览 Swiggy 的工程挑战",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "289",
      "order": 289,
      "sourceNumber": 10,
      "company": "Swiggy",
      "title": "Re-Architecting Swiggy's logistics systems",
      "url": "https://bytes.swiggy.com/re-architecting-swiggys-logistics-systems-ddf301a29fa0",
      "topics": [
        "Architecture"
      ],
      "year": 2021,
      "guide": "重构物流系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "290",
      "order": 290,
      "sourceNumber": 11,
      "company": "Swiggy",
      "title": "Using Deep Learning for Ranking in Dish Search",
      "url": "https://bytes.swiggy.com/using-deep-learning-for-ranking-in-dish-search-4df2772dddce",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2021,
      "guide": "用深度学习为菜品搜索排序",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "291",
      "order": 291,
      "sourceNumber": 12,
      "company": "Swiggy",
      "title": "Learning to Predict Two-Wheeler Travel Distance",
      "url": "https://bytes.swiggy.com/learning-to-predict-two-wheeler-travel-distance-752d836d741d",
      "topics": [
        "AI/ML"
      ],
      "year": 2021,
      "guide": "学习预测两轮车行驶距离",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "292",
      "order": 292,
      "sourceNumber": 13,
      "company": "Swiggy",
      "title": "Learning To Rank Restaurants",
      "url": "https://bytes.swiggy.com/learning-to-rank-restaurants-c6a69ba4b330",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2021,
      "guide": "学习餐厅排序模型",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "293",
      "order": 293,
      "sourceNumber": 14,
      "company": "Swiggy",
      "title": "Running Geo Queries At Scale",
      "url": "https://bytes.swiggy.com/running-geo-queries-at-scale-adea70f5af45",
      "topics": [
        "Databases",
        "Performance"
      ],
      "year": 2020,
      "guide": "大规模执行地理位置查询",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "294",
      "order": 294,
      "sourceNumber": 16,
      "company": "Swiggy",
      "title": "Deploying deep learning models at scale at Swiggy",
      "url": "https://bytes.swiggy.com/deploying-deep-learning-models-at-scale-at-swiggy-tensorflow-serving-on-dsp-ad5da40f7a6c",
      "topics": [
        "AI/ML",
        "Infrastructure"
      ],
      "year": 2020,
      "guide": "规模化部署深度学习模型",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "295",
      "order": 295,
      "sourceNumber": 1,
      "company": "Tinder",
      "title": "Tinder API Style Guide",
      "url": "https://medium.com/tinder/tinder-api-style-guide-part-1-081804a7ef40",
      "topics": [
        "Architecture"
      ],
      "year": 2024,
      "guide": "建立 Tinder API 风格规范",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "296",
      "order": 296,
      "sourceNumber": 2,
      "company": "Tinder",
      "title": "Building Obsidian, Tinder's Design System",
      "url": "https://medium.com/tinder/building-obsidian-tinders-design-system-e127770d8e3f",
      "topics": [
        "Frontend"
      ],
      "year": 2023,
      "guide": "构建 Obsidian 设计系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "297",
      "order": 297,
      "sourceNumber": 3,
      "company": "Tinder",
      "title": "How Tinder built its API Gateway",
      "url": "https://medium.com/tinder/how-we-built-the-tinder-api-gateway-831c6ca5ceca",
      "topics": [
        "Architecture",
        "Infrastructure"
      ],
      "year": 2022,
      "guide": "建设 Tinder API 网关",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "298",
      "order": 298,
      "sourceNumber": 4,
      "company": "Tinder",
      "title": "Scaling out Tinder Android Payment Flow using State Machine",
      "url": "https://medium.com/tinder/scaling-out-tinder-android-payment-flow-using-state-machine-e14ef0591b6",
      "topics": [
        "Mobile",
        "Payments"
      ],
      "year": 2020,
      "guide": "用状态机扩展 Android 支付流程",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "299",
      "order": 299,
      "sourceNumber": 1,
      "company": "Twitch",
      "title": "Ingesting Live Video Streams at Global Scale",
      "url": "https://blog.twitch.tv/en/2022/04/26/ingesting-live-video-streams-at-global-scale/",
      "topics": [
        "Video/Media",
        "Infrastructure"
      ],
      "year": 2022,
      "guide": "在全球范围接入直播视频流",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "300",
      "order": 300,
      "sourceNumber": 2,
      "company": "Twitch",
      "title": "Breaking the Monolith at Twitch",
      "url": "https://blog.twitch.tv/en/2022/04/12/breaking-the-monolith-at-twitch-part-2/",
      "topics": [
        "Architecture"
      ],
      "year": 2022,
      "guide": "拆分 Twitch 单体应用",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "301",
      "order": 301,
      "sourceNumber": 3,
      "company": "Twitch",
      "title": "Using Machine Learning to Review Emotes",
      "url": "https://blog.twitch.tv/en/2022/06/22/smarter-better-faster-using-machine-learning-to-review-emotes/",
      "topics": [
        "AI/ML"
      ],
      "year": 2022,
      "guide": "使用机器学习审核表情内容",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "302",
      "order": 302,
      "sourceNumber": 4,
      "company": "Twitch",
      "title": "Defense, threat modeling and High Availability at Twitch",
      "url": "https://blog.twitch.tv/en/2021/11/16/defend-your-castle-high-availability-for-high-stakes-cloud-services/",
      "topics": [
        "Security",
        "Infrastructure"
      ],
      "year": 2021,
      "guide": "通过威胁建模与防御设计提高可用性",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "303",
      "order": 303,
      "sourceNumber": 1,
      "company": "Twitter/X",
      "title": "Twitter's Recommendation Algorithm",
      "url": "https://blog.x.com/engineering/en_us/topics/open-source/2023/twitter-recommendation-algorithm",
      "topics": [
        "AI/ML",
        "Search"
      ],
      "year": 2023,
      "guide": "理解 Twitter 推荐算法",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "304",
      "order": 304,
      "sourceNumber": 2,
      "company": "Twitter/X",
      "title": "How we scaled Reads On the Twitter Users Database",
      "url": "https://blog.x.com/engineering/en_us/topics/infrastructure/2023/how-we-scaled-reads-on-the-twitter-users-database",
      "topics": [
        "Databases",
        "Performance"
      ],
      "year": 2023,
      "guide": "扩展用户数据库的读取能力",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "305",
      "order": 305,
      "sourceNumber": 3,
      "company": "Twitter/X",
      "title": "Powering real-time data analytics with Druid at Twitter",
      "url": "https://blog.x.com/engineering/en_us/topics/infrastructure/2022/powering-real-time-data-analytics-with-druid-at-twitter",
      "topics": [
        "Data Engineering"
      ],
      "year": 2022,
      "guide": "用 Druid 支撑实时数据分析",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "306",
      "order": 306,
      "sourceNumber": 4,
      "company": "Twitter/X",
      "title": "How we built Twitter's highly reliable ads pacing service",
      "url": "https://blog.x.com/engineering/en_us/topics/infrastructure/2021/how-we-built-twitter-s-highly-reliable-ads-pacing-service",
      "topics": [
        "Architecture"
      ],
      "year": 2021,
      "guide": "构建高可靠广告投放节奏控制服务",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "307",
      "order": 307,
      "sourceNumber": 5,
      "company": "Twitter/X",
      "title": "Storing and retrieving millions of ad impressions per second",
      "url": "https://blog.x.com/engineering/en_us/topics/infrastructure/2021/storing-and-retrieving-millions-of-ad-impressions-per-second",
      "topics": [
        "Databases",
        "Performance"
      ],
      "year": 2021,
      "guide": "存取每秒数百万条广告曝光记录",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "308",
      "order": 308,
      "sourceNumber": 6,
      "company": "Twitter/X",
      "title": "Processing billions of events in real time at Twitter",
      "url": "https://blog.x.com/engineering/en_us/topics/infrastructure/2021/processing-billions-of-events-in-real-time-at-twitter-",
      "topics": [
        "Data Engineering"
      ],
      "year": 2021,
      "guide": "实时处理数十亿事件",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "309",
      "order": 309,
      "sourceNumber": 7,
      "company": "Twitter/X",
      "title": "Logging at Twitter",
      "url": "https://blog.x.com/engineering/en_us/topics/infrastructure/2021/logging-at-twitter-updated",
      "topics": [
        "Observability"
      ],
      "year": 2021,
      "guide": "理解 Twitter 日志系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "310",
      "order": 310,
      "sourceNumber": 8,
      "company": "Twitter/X",
      "title": "Twitter's ads serving platform",
      "url": "https://blog.x.com/engineering/en_us/topics/infrastructure/2021/sharding-simplification-and-twitters-ads-serving-platform",
      "topics": [
        "Architecture"
      ],
      "year": 2021,
      "guide": "通过分片与简化设计演进广告服务平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "311",
      "order": 311,
      "sourceNumber": 1,
      "company": "Uber",
      "title": "Migrating Uber's Compute Platform to Kubernetes",
      "url": "https://www.uber.com/en-IN/blog/migrating-ubers-compute-platform-to-kubernetes-a-technical-journey/?uclick_id=b4e6f2b7-b4a5-446a-beeb-0cc53334b2fe",
      "topics": [
        "Infrastructure"
      ],
      "year": 2025,
      "guide": "将计算平台迁移至 Kubernetes",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "312",
      "order": 312,
      "sourceNumber": 2,
      "company": "Uber",
      "title": "MySQL At Uber",
      "url": "https://www.uber.com/en-IN/blog/mysql-at-uber/",
      "topics": [
        "Databases"
      ],
      "year": 2025,
      "guide": "理解 MySQL 在 Uber 的应用",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "313",
      "order": 313,
      "sourceNumber": 3,
      "company": "Uber",
      "title": "How Uber Uses Ray to Optimize the Rides Business",
      "url": "https://www.uber.com/en-IN/blog/how-uber-uses-ray-to-optimize-the-rides-business/",
      "topics": [
        "AI/ML"
      ],
      "year": 2025,
      "guide": "使用 Ray 优化出行业务",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "314",
      "order": 314,
      "sourceNumber": 4,
      "company": "Uber",
      "title": "How Uber Optimizes LLM Training",
      "url": "https://www.uber.com/en-IN/blog/open-source-and-in-house-how-uber-optimizes-llm-training/",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "结合开源与自研能力优化大模型训练",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "315",
      "order": 315,
      "sourceNumber": 5,
      "company": "Uber",
      "title": "Natural Language to SQL Using Gen AI",
      "url": "https://www.uber.com/en-IN/blog/query-gpt/",
      "topics": [
        "AI/ML"
      ],
      "year": 2024,
      "guide": "用 QueryGPT 将自然语言转换为 SQL",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "316",
      "order": 316,
      "sourceNumber": 6,
      "company": "Uber",
      "title": "Lucene: Uber's Search Platform",
      "url": "https://www.uber.com/en-IN/blog/lucene-version-upgrade/",
      "topics": [
        "Search"
      ],
      "year": 2024,
      "guide": "升级基于 Lucene 的搜索平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "317",
      "order": 317,
      "sourceNumber": 7,
      "company": "Uber",
      "title": "Uber's implementation of Live Activity on iOS",
      "url": "https://www.uber.com/en-IN/blog/live-activity-on-ios/",
      "topics": [
        "Mobile"
      ],
      "year": 2024,
      "guide": "在 iOS 上实现实时活动功能",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "318",
      "order": 318,
      "sourceNumber": 8,
      "company": "Uber",
      "title": "Odin: Uber's Stateful Platform",
      "url": "https://www.uber.com/en-IN/blog/odin-stateful-platform/",
      "topics": [
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "用 Odin 管理有状态平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "319",
      "order": 319,
      "sourceNumber": 9,
      "company": "Uber",
      "title": "Kafka Tiered Storage at Uber",
      "url": "https://www.uber.com/en-IN/blog/kafka-tiered-storage/",
      "topics": [
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "在 Kafka 中使用分层存储",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "320",
      "order": 320,
      "sourceNumber": 10,
      "company": "Uber",
      "title": "Modernizing Logging at Uber with CLP",
      "url": "https://www.uber.com/en-IN/blog/modernizing-logging-with-clp-ii/",
      "topics": [
        "Observability"
      ],
      "year": 2024,
      "guide": "用 CLP 改造日志系统",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "321",
      "order": 321,
      "sourceNumber": 11,
      "company": "Uber",
      "title": "How Uber ensures Apache Cassandra's tolerance for single-zone failure",
      "url": "https://www.uber.com/en-IN/blog/single-zone-failure-tolerance/",
      "topics": [
        "Databases",
        "Infrastructure"
      ],
      "year": 2024,
      "guide": "让 Cassandra 容忍单可用区故障",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "322",
      "order": 322,
      "sourceNumber": 12,
      "company": "Uber",
      "title": "How LedgerStore Supports Trillions of Indexes at Uber",
      "url": "https://www.uber.com/en-IN/blog/how-ledgerstore-supports-trillions-of-indexes/",
      "topics": [
        "Databases"
      ],
      "year": 2024,
      "guide": "用 LedgerStore 支撑万亿级索引",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "323",
      "order": 323,
      "sourceNumber": 13,
      "company": "Uber",
      "title": "Balancing HDFS DataNodes in the Uber DataLake",
      "url": "https://www.uber.com/en-IN/blog/balancing-hdfs-datanodes-in-the-uber-datalake/",
      "topics": [
        "Data Engineering"
      ],
      "year": 2024,
      "guide": "均衡数据湖中的 HDFS 数据节点",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "324",
      "order": 324,
      "sourceNumber": 14,
      "company": "Uber",
      "title": "How Uber Serves Over 40 Million Reads Per Second from Online Storage Using an Integrated Cache",
      "url": "https://www.uber.com/en-IN/blog/how-uber-serves-over-40-million-reads-per-second-using-an-integrated-cache/",
      "topics": [
        "Caching",
        "Performance"
      ],
      "year": 2024,
      "guide": "用集成缓存支撑高并发在线存储读取",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "325",
      "order": 325,
      "sourceNumber": 15,
      "company": "Uber",
      "title": "How Uber Optimized Cassandra Operations At Scale",
      "url": "https://www.uber.com/en-IN/blog/how-uber-optimized-cassandra-operations-at-scale/",
      "topics": [
        "Databases"
      ],
      "year": 2023,
      "guide": "优化大规模 Cassandra 运维",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "326",
      "order": 326,
      "sourceNumber": 16,
      "company": "Uber",
      "title": "How Uber Optimizes the Timing of Push Notifications using ML and Linear Programming",
      "url": "https://www.uber.com/en-IN/blog/how-uber-optimizes-push-notifications-using-ml/",
      "topics": [
        "AI/ML",
        "Messaging"
      ],
      "year": 2022,
      "guide": "结合机器学习与线性规划优化推送时机",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "327",
      "order": 327,
      "sourceNumber": 17,
      "company": "Uber",
      "title": "Deduping and Storing Images at Uber Eats",
      "url": "https://www.uber.com/en-IN/blog/deduping-and-storing-images-at-uber-eats/",
      "topics": [
        "Infrastructure"
      ],
      "year": 2022,
      "guide": "为 Uber Eats 图片去重并管理存储",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "328",
      "order": 328,
      "sourceNumber": 18,
      "company": "Uber",
      "title": "Uber's Next Gen Push Platform on gRPC",
      "url": "https://www.uber.com/en-IN/blog/ubers-next-gen-push-platform-on-grpc/",
      "topics": [
        "Messaging",
        "Infrastructure"
      ],
      "year": 2022,
      "guide": "用 gRPC 构建新一代推送平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "329",
      "order": 329,
      "sourceNumber": 19,
      "company": "Uber",
      "title": "Uber's Highly Scalable and Distributed Shuffle as a Service",
      "url": "https://www.uber.com/en-IN/blog/ubers-highly-scalable-and-distributed-shuffle-as-a-service/",
      "topics": [
        "Data Engineering"
      ],
      "year": 2022,
      "guide": "将高扩展分布式 Shuffle 作为服务提供",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "330",
      "order": 330,
      "sourceNumber": 20,
      "company": "Uber",
      "title": "How Uber Predicts Arrival Times Using Deep Learning",
      "url": "https://www.uber.com/en-IN/blog/deepeta-how-uber-predicts-arrival-times/",
      "topics": [
        "AI/ML"
      ],
      "year": 2022,
      "guide": "用深度学习预测到达时间",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "331",
      "order": 331,
      "sourceNumber": 21,
      "company": "Uber",
      "title": "Real-Time Exactly-Once Ad Event Processing with Apache Flink, Kafka, and Pinot",
      "url": "https://www.uber.com/en-IN/blog/real-time-exactly-once-ad-event-processing/",
      "topics": [
        "Data Engineering"
      ],
      "year": 2021,
      "guide": "用 Flink、Kafka 与 Pinot 实现恰好一次广告事件处理",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "332",
      "order": 332,
      "sourceNumber": 1,
      "company": "Walmart",
      "title": "Walmart's Cassandra CDC Solution",
      "url": "https://medium.com/walmartglobaltech/walmarts-cassandra-cdc-solution-6fc650031a3",
      "topics": [
        "Data Engineering",
        "Databases"
      ],
      "year": 2022,
      "guide": "为 Cassandra 构建变更数据捕获方案",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "333",
      "order": 333,
      "sourceNumber": 2,
      "company": "Walmart",
      "title": "Scaling the Walmart Inventory Reservations API for Peak Traffic",
      "url": "https://medium.com/walmartglobaltech/scaling-the-walmart-inventory-reservations-api-for-peak-traffic-9ba37833ef9d",
      "topics": [
        "Performance",
        "Architecture"
      ],
      "year": 2022,
      "guide": "扩展库存预留 API 以应对高峰流量",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "334",
      "order": 334,
      "sourceNumber": 3,
      "company": "Walmart",
      "title": "A Markov Chain Formulation for the Grocery Item Picking Process",
      "url": "https://medium.com/walmartglobaltech/a-markov-chain-formulation-of-grocery-item-picking-process-54c65a3ec5b5",
      "topics": [
        "AI/ML"
      ],
      "year": 2021,
      "guide": "用马尔可夫链描述生鲜商品拣货过程",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "335",
      "order": 335,
      "sourceNumber": 4,
      "company": "Walmart",
      "title": "How we rebuilt the Walmart Autocomplete Backend",
      "url": "https://medium.com/walmartglobaltech/how-we-rebuilt-the-walmart-autocomplete-backend-10efe71d624a",
      "topics": [
        "Search",
        "Performance"
      ],
      "year": 2021,
      "guide": "重建自动补全后端",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "336",
      "order": 336,
      "sourceNumber": 5,
      "company": "Walmart",
      "title": "Building a Notification Framework for Microservice-based Application",
      "url": "https://medium.com/walmartglobaltech/building-a-notification-framework-for-microservice-based-application-6fe5ac9dfcee",
      "topics": [
        "Messaging",
        "Architecture"
      ],
      "year": 2021,
      "guide": "为微服务应用构建通知框架",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "337",
      "order": 337,
      "sourceNumber": 1,
      "company": "Zomato",
      "title": "Building a cost-effective logging platform for petabyte scale",
      "url": "https://blog.zomato.com/building-a-cost-effective-logging-platform-using-clickhouse-for-petabyte-scale",
      "topics": [
        "Observability",
        "Cost Optimization"
      ],
      "year": 2023,
      "guide": "用 ClickHouse 构建低成本 PB 级日志平台",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "338",
      "order": 338,
      "sourceNumber": 2,
      "company": "Zomato",
      "title": "How Zomato Handles 100 Million Daily Search Queries",
      "url": "https://blog.zomato.com/explained-how-zomato-handles-100-million-daily-search-queries-part-three",
      "topics": [
        "Search",
        "Performance"
      ],
      "year": 2023,
      "guide": "处理每日上亿次搜索查询",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "339",
      "order": 339,
      "sourceNumber": 3,
      "company": "Zomato",
      "title": "How Zomato Powers restaurant ads using ML",
      "url": "https://blog.zomato.com/powering-restaurant-ads-on-zomato",
      "topics": [
        "AI/ML"
      ],
      "year": 2022,
      "guide": "用机器学习支撑餐厅广告",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "340",
      "order": 340,
      "sourceNumber": 4,
      "company": "Zomato",
      "title": "How Zomato uses embeddings to identify and cluster unique addresses",
      "url": "https://blog.zomato.com/unique-addresses",
      "topics": [
        "AI/ML"
      ],
      "year": 2022,
      "guide": "用向量表示识别并聚类地址",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "341",
      "order": 341,
      "sourceNumber": 5,
      "company": "Zomato",
      "title": "How Zomato predicts your order's Food preparation time",
      "url": "https://blog.zomato.com/predicting-fpt-optimally",
      "topics": [
        "AI/ML"
      ],
      "year": 2022,
      "guide": "预测订单的食物准备时间",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "342",
      "order": 342,
      "sourceNumber": 6,
      "company": "Zomato",
      "title": "How Zomato locates its users",
      "url": "https://blog.zomato.com/to-help-us-locate-you-better",
      "topics": [
        "Mobile"
      ],
      "year": 2021,
      "guide": "改善用户位置识别",
      "evidence": "guide",
      "review": null
    },
    {
      "id": "343",
      "order": 343,
      "sourceNumber": 7,
      "company": "Zomato",
      "title": "The Deep Tech Behind Estimating Food Preparation Time",
      "url": "https://blog.zomato.com/food-preparation-time",
      "topics": [
        "AI/ML"
      ],
      "year": 2020,
      "guide": "探索食物准备时间预测的技术方法",
      "evidence": "guide",
      "review": null
    }
  ]
};
