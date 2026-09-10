const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const project = path.resolve(root, '..');
const source = fs.readFileSync(path.join(project, 'sources/upstream-README.md'), 'utf8');
const sourceHash = crypto.createHash('sha256').update(source).digest('hex');
if (sourceHash !== '42c907cc8b2d7464483fafb3b1e0b1898b801c0e5684f2900f34d6660747f53a') throw new Error('上游快照已变化，请先核对每条中文导读与原文的对应关系，再更新快照校验值');
const guideLines = fs.readFileSync(path.join(__dirname, 'guides.tsv'), 'utf8').trim().split(/\r?\n/);
const guides = new Map(guideLines.map(line => { const [id, ...text] = line.split('\t'); return [id, text.join('\t')]; }));
if (guides.size !== guideLines.length) throw new Error('重复导读编号');
const reviews = JSON.parse(fs.readFileSync(path.join(__dirname, 'reviews.json'), 'utf8'));
const topics = {
  'Architecture': { label: '架构设计', prompt: '关注系统边界、依赖关系和演进成本：问题出现在哪个环节，增加复杂度的收益是否明确？' },
  'Databases': { label: '数据库', prompt: '关注读写比例、数据规模、一致性与迁移验证：什么条件下才需要分片或更换存储？' },
  'Caching': { label: '缓存', prompt: '关注命中率、热点、失效与回源压力：性能收益会带来哪些一致性和运维成本？' },
  'Search': { label: '搜索与召回', prompt: '关注查询形态、候选召回与排序：如何同时衡量相关性、延迟和资源开销？' },
  'AI/ML': { label: 'AI 与机器学习', prompt: '关注数据来源、评估方法与线上反馈：模型效果是否改善了业务结果，如何识别回归？' },
  'Data Engineering': { label: '数据工程', prompt: '关注数据时效、质量、重复处理与重放：数据管道如何发现并恢复异常？' },
  'Infrastructure': { label: '基础设施', prompt: '关注容量、故障边界和恢复路径：如何验证服务在故障与扩容期间仍可工作？' },
  'Performance': { label: '性能优化', prompt: '关注真实瓶颈与延迟分布：基线、负载条件和优化后的资源代价是什么？' },
  'Messaging': { label: '消息与通知', prompt: '关注投递语义、顺序、背压和用户体验：重复、丢失与积压如何被发现和处理？' },
  'Frontend': { label: '前端体验', prompt: '关注加载过程、交互反馈与设备差异：优化是否改善了用户可感知的等待时间？' },
  'Mobile': { label: '移动应用', prompt: '关注设备、弱网、耗电与包体积：不同终端上的收益与成本是否一致？' },
  'Security': { label: '安全与风控', prompt: '关注威胁模型、误报漏报和权限边界：系统如何验证检测质量与处置效果？' },
  'Payments': { label: '支付系统', prompt: '关注状态流转、重试与核对：异常中断后如何判断操作是否已经生效？' },
  'Observability': { label: '可观测性', prompt: '关注指标定义、追踪关联和排障成本：怎样从异常信号找到可执行的诊断线索？' },
  'Cost Optimization': { label: '成本优化', prompt: '关注完整成本和回本周期：节省是否包含迁移、维护、读取及可靠性代价？' },
  'Video/Media': { label: '视频与媒体', prompt: '关注处理链路、质量和资源消耗：上传、编码、分发或理解环节的主要约束是什么？' }
};
let company = '';
const articles = [];
for (const line of source.split(/\r?\n/)) {
  const heading = line.match(/^## (.+)$/);
  if (heading) company = heading[1];
  const row = line.match(/^\|\s*(\d+)\s*\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*([^|]+)\|\s*(\d{4})\s*\|/);
  if (!row) continue;
  const id = String(articles.length + 1).padStart(3, '0');
  const tags = row[4].split(',').map(x => x.trim());
  if (!guides.get(id)) throw new Error('缺少中文导读 ' + id);
  for (const tag of tags) if (!topics[tag]) throw new Error('未知主题 ' + tag);
  articles.push({ id, order: articles.length + 1, sourceNumber: Number(row[1]), company, title: row[2], url: row[3], topics: tags, year: Number(row[5]), guide: guides.get(id), evidence: reviews[id] ? 'reviewed' : 'guide', review: reviews[id] || null });
}
if (articles.length !== guides.size) throw new Error('导读与源条目数量不一致');
for (const id of Object.keys(reviews)) if (!articles.some(x => x.id === id)) throw new Error('总结编号不存在 ' + id);
const data = { meta: { repo: 'https://github.com/ashishps1/awesome-engineering-articles', commit: '9ef9509126254406440c0e5ee09f609d0876418a', snapshotDate: '2026-03-01', collectedAt: '2026-09-10', total: articles.length, companies: new Set(articles.map(x => x.company)).size, reviewed: Object.keys(reviews).length }, topics, articles };
fs.writeFileSync(path.join(root, 'dist/data.js'), '/* 来源及 MIT 版权声明见 LICENSE.txt；由 scripts/build-data.cjs 生成。 */\nwindow.CASEBOOK = ' + JSON.stringify(data, null, 2) + ';\n');
fs.copyFileSync(path.join(project, 'sources/LICENSE'), path.join(root, 'dist/LICENSE.txt'));
const lines = ['# 工程案例中文目录', '', '[返回项目介绍](README.md)', '', '全部条目提供基于上游标题的中文导读，其中 6 篇补充了已阅读原文的总结。标题导读不代表全文总结，不据此推断实现细节或验证标题中的指标。', '', '来源：[Awesome Engineering Articles](https://github.com/ashishps1/awesome-engineering-articles)，研究版本 `'+data.meta.commit+'`。文章年份沿用上游标注；外链未全部逐一验证。', '', '## 原文总结', ''];
for (const a of articles.filter(a => a.review)) {
  const r = a.review;
  lines.push('### '+a.id+' · '+a.company+'：'+a.guide, '', r.summary, '', '- 问题：'+r.problem, '- 做法：'+r.approach.join(' '), '- 原文结果：'+r.result, '- 代价与边界：'+r.tradeoff, '- '+r.takeaway, '', '[阅读原文]('+a.url+') · 核对日期：'+r.checkedAt+' · 依据章节：'+r.sourceSection, '');
}
lines.push('## 全部条目', '');
company = '';
for (const a of articles) {
  if (company !== a.company) { company = a.company; lines.push('### '+company, '', '| 编号 | 中文导读 / 原文 | 主题 | 年份 | 内容依据 |', '| :--- | :--- | :--- | :--- | :--- |'); }
  lines.push('| '+a.id+' | ['+a.guide+']('+a.url+') | '+a.topics.map(t=>topics[t].label).join('、')+' | '+a.year+' | '+(a.review?'原文总结':'标题导读')+' |');
}
fs.writeFileSync(path.join(project, 'cases.md'), lines.join('\n')+'\n');
console.log(JSON.stringify(data.meta, null, 2));
