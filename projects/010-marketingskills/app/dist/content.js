/* 中文分类、教学场景为本地新增；技能名称和版本来自固定上游快照。 */
window.MARKETING_CONTENT = {
  groups: [
    { title: '定位与决策', goal: '先决定为谁解决什么问题', skills: {
      'product-marketing': '产品背景', 'customer-research': '用户研究', 'competitor-profiling': '竞品研究', 'marketing-plan': '营销计划', 'marketing-council': '多视角决策模拟', 'marketing-ideas': '营销策略库', 'marketing-psychology': '营销心理模型', 'offers': '产品方案与价值表达', 'pricing': '定价与套餐'
    }},
    { title: '内容与创作', goal: '把产品能力讲成用户能理解的价值', skills: {
      'content-strategy': '内容策略', 'copywriting': '营销文案', 'copy-editing': '文案编辑', 'image': '图片制作指导', 'video': '视频制作指导'
    }},
    { title: '搜索与发现', goal: '让有需求的人找到相关内容', skills: {
      'seo-audit': '搜索优化诊断', 'ai-seo': 'AI 搜索可见性', 'programmatic-seo': '数据驱动的批量页面', 'site-architecture': '网站信息结构', 'schema': '结构化数据', 'aso': '应用商店优化', 'competitors': '竞品对比页面', 'directory-submissions': '目录收录'
    }},
    { title: '页面与转化', goal: '减少从理解到行动之间的阻力', skills: {
      'cro': '页面与表单转化', 'signup': '注册流程', 'onboarding': '首次使用引导', 'popups': '弹窗与浮层', 'paywalls': '付费升级时机'
    }},
    { title: '传播与推广', goal: '围绕目标受众组织渠道和材料', skills: {
      'ads': '广告投放策略', 'ad-creative': '广告创意', 'social': '社交内容', 'launch': '产品发布', 'public-relations': '公共关系', 'influencer-marketing': '创作者合作', 'events': '活动营销', 'co-marketing': '联合营销'
    }},
    { title: '销售与客户关系', goal: '把潜在线索推进为可跟进的关系', skills: {
      'prospecting': '潜客发现', 'cold-email': '初次联系邮件', 'sales-enablement': '销售材料', 'revops': '收入运营', 'emails': '生命周期邮件', 'sms': '短信营销'
    }},
    { title: '留存与增长', goal: '让使用价值带来持续访问和推荐', skills: {
      'churn-prevention': '流失预防', 'referrals': '推荐与联盟', 'marketing-loops': '增长循环', 'free-tools': '免费工具获客', 'lead-magnets': '有用资料获客', 'community-marketing': '社区营销'
    }},
    { title: '衡量与实验', goal: '用数据检验假设，决定下一步', skills: {
      'analytics': '事件与分析', 'attribution': '渠道归因', 'ab-testing': '实验设计'
    }}
  ],
  scenarios: [
    {
      id: 'casebook', label: '研究手册 · 让读者找到案例', brief: '工程案例手册的入口怎么改，才能让架构学习者更快找到合适案例？',
      input: '示例假设：读者是工程师；目标是找到并打开相关案例；已有分类目录，但尚无用户行为数据。',
      steps: [
        { name: '明确目标', actor: '用户 + Agent', skill: 'product-marketing', file: '.agents/product-marketing.md', action: '整理目标读者、具体任务、真实能力和成功标准；将未知信息标为待确认。', result: '目标：帮助读者找到一个相关案例。\n事实：手册已有案例目录和部分精读内容。\n待验证：读者更习惯按公司、技术主题，还是问题查找？', boundary: '产品背景是共享文档；它不会自动产生真实用户研究。' },
        { name: '诊断入口', actor: 'Agent 读取页面与技能', skill: 'cro', file: 'skills/cro/SKILL.md', action: '依次检查价值表达、标题、行动入口、视觉层级、证据、疑虑和操作阻力。', result: '待验证假设：第一次访问的读者不知道从哪里开始。\n改动候选：将“查找架构案例”设为清晰入口，并解释筛选方式。\n证据需求：观察读者完成指定查找任务的过程。', boundary: '这里呈现分析方法，没有声称已审查当前页面或发现真实转化问题。' },
        { name: '形成内容', actor: 'Agent 生成草稿', skill: 'copywriting', file: 'skills/copywriting/SKILL.md', action: '复用目标读者和产品事实，把功能描述改写为任务导向的说明。', result: '标题示例：从真实工程案例中，找到解决问题的思路。\n入口示例：按技术主题找案例。\n补充说明：区分原文导航、中文导读与已经完成的精读。', boundary: '文案是本地编写的教学示例，不能添加没有依据的效果数字。' },
        { name: '落到页面', actor: '宿主 Agent 的文件工具', skill: 'site-architecture', file: '项目页面与导航文件', action: '依据内容与信息结构方案修改网页，再检查链接、移动端布局和可访问性。', result: '预期产物：可审查的页面改动 + 入口层级说明。\n检查：目标案例可达；原库链接可用；已有地址保持稳定。', boundary: '真正改文件、运行检查的是宿主工具；技能本身不是网站运行时。' },
        { name: '设计衡量', actor: 'Agent + 已连接的数据工具', skill: 'analytics', file: '事件计划 / 分析工具配置', action: '从要做的决策反推事件；区分浏览、查找、打开案例与打开原文。', result: '事件候选：搜索提交、案例打开、原文点击。\n主要问题：读者是否找到相关案例？\n补充证据：任务完成时间和访谈反馈。', boundary: '没有接入分析账户，不显示虚构流量；点击也不等于真正读懂内容。' },
        { name: '验证再改', actor: '团队审阅真实证据', skill: 'ab-testing', file: '实验方案与结果记录', action: '先明确假设和判定标准；流量不足时先做任务式阅读测试，样本充足再开展实验。', result: '验收问题：读者能否找到指定主题案例，并说明为什么相关？\n记录：成功与失败原因。\n下一步：用真实结果决定保留、修改或撤回方案。', boundary: '本展示不会运行 A/B 实验，也不承诺改动必然提升转化。' }
      ]
    },
    {
      id: 'launch', label: '产品发布 · 从定位到上线材料', brief: '一个开发者工具准备发布，怎样让介绍、官网和发布内容保持一致？',
      input: '示例假设：工具已经能运行；需要说明适合谁、解决什么问题；尚无公开客户成绩。',
      steps: [
        { name: '产品背景', actor: '用户 + Agent', skill: 'product-marketing', file: '.agents/product-marketing.md', action: '汇总目标开发者、使用场景、替代方案、产品证据与表达风格。', result: '受众：需要减少重复配置的开发者。\n证据：可复现的操作步骤和真实演示。\n未知：实际节省多少时间，等待测量。', boundary: '演示可运行与业务价值已经验证，是两个不同结论。' },
        { name: '安排发布', actor: 'Agent', skill: 'launch', file: 'skills/launch/SKILL.md', action: '规划发布前准备、发布时材料和发布后跟进，确定适合当前资源的渠道。', result: '发布材料：一句话介绍、功能说明、演示入口、常见问题。\n发布后：收集安装失败和使用疑问。', boundary: '发布计划不代表已经向任何平台发送内容。' },
        { name: '撰写官网', actor: 'Agent', skill: 'copywriting', file: '页面文案草稿', action: '用同一背景组织标题、价值说明、使用案例与行动入口。', result: '表达示例：把重复配置整理成可复用流程。\n主要入口：查看真实演示。\n补充：环境要求与不适用情况。', boundary: '不能把待验证收益写成已经实现的客户结果。' },
        { name: '检查发现性', actor: 'Agent + 页面检查工具', skill: 'seo-audit', file: '页面标题 / 描述 / 导航', action: '检查页面标题、描述、内容结构、抓取条件与内部链接。', result: '预期产物：问题清单、证据位置和修改建议。\n每个页面围绕一个清晰的用户问题。', boundary: '技能指导检查；收录和排名取决于搜索系统及长期表现。' },
        { name: '渠道适配', actor: 'Agent；发布需实际工具', skill: 'social', file: '各渠道内容草稿', action: '根据平台和受众调整篇幅、结构与材料，保持核心事实一致。', result: '短帖：问题、做法、演示链接。\n长文：背景、步骤、边界和复现。\n评论答复：回到真实产品资料。', boundary: '本地展示只讲解流程，不连接社交账户或自动发帖。' },
        { name: '观察使用', actor: '团队 + 数据工具', skill: 'analytics', file: '发布结果与用户反馈', action: '衡量相关访问、演示使用与真实激活，结合反馈更新产品背景。', result: '关注：读者是否进入演示，是否成功完成首次任务。\n将反复出现的问题写回文档与引导。', boundary: '外部工具需要单独配置；没有数据就保留“待验证”。' }
      ]
    },
    {
      id: 'signup', label: '注册优化 · 从假设到实验', brief: '有访问但注册少，怎样系统分析，而不是凭感觉改按钮？',
      input: '示例假设：已有网站和注册流程；需要取得真实基线、流量来源及用户反馈。',
      steps: [
        { name: '确认基线', actor: '团队 + Agent', skill: 'analytics', file: '漏斗与事件定义', action: '核对访问、注册开始、注册成功是否定义一致，排除埋点漏报。', result: '需要数据：各步骤人数、设备和渠道。\n需要检查：注册成功事件是否真正代表账户创建完成。', boundary: '不使用编造的转化率代替实际基线。' },
        { name: '诊断注册', actor: 'Agent', skill: 'signup', file: 'skills/signup/SKILL.md', action: '检查表单字段、错误反馈、信任信息和步骤负担，结合用户反馈定位阻力。', result: '假设示例：非必要字段使用户犹豫。\n需要证据：字段放弃情况和用户反馈。', boundary: '经验规则产生候选原因，不自动证明因果。' },
        { name: '选择改动', actor: '团队 + Agent', skill: 'cro', file: '改动说明与预期机制', action: '优先选择有证据、可回退、可衡量的改动，将其他因素保持一致。', result: '改动候选：延后收集一个非必要字段。\n预期机制：减少首次注册负担。\n风险：后续资料补全率可能变化。', boundary: '示例是否适用必须结合具体产品确认。' },
        { name: '设计实验', actor: 'Agent', skill: 'ab-testing', file: '实验计划', action: '预先记录主要指标、护栏指标、样本量与分析方法。', result: '主要指标：注册成功率。\n护栏：后续激活与资料完整度。\n样本量：依据真实基线和最小可检测变化计算。', boundary: '不能看到短期上涨就提前宣布成功。' },
        { name: '实现与核对', actor: '宿主 Agent + 实验平台', skill: 'analytics', file: '实验配置 / 页面改动 / 事件', action: '配置分流并核验事件，对照实验方案检查实际实现。', result: '预期产物：可回退的变体、正确分流与事件验证记录。', boundary: '需要可用工具、账户权限和实际实现，本页面没有执行这些操作。' },
        { name: '解释结果', actor: '团队审阅数据', skill: 'ab-testing', file: '实验结论', action: '按预定方法分析，结合不确定性与护栏决定保留、继续观察或撤回。', result: '可能结论：支持改动、发现负面影响、证据不足。\n将结论和条件写回下一轮任务。', boundary: '证据不足也是有效结论；没有保证增长的技能。' }
      ]
    }
  ]
};
