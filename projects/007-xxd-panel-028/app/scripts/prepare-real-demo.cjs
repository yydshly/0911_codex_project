// Compile the pinned upstream Skill's delivery blocks without rewriting its aesthetic brief.
// This prepares a request; the host Agent executes it with its built-in image tool.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const id = process.argv[2];
const cases = {
  coffee: { order: '001', source: 'coffee.png', mode: 'left-right', contract: 'LEFT_RIGHT', ratio: '3:2', size: '1536x1024', title: '咖啡桌面 · 摄影与纸面转译', purpose: '摄影内容的编辑设计演示', creator: 'Rachel Michetti / Pikolo Espresso Bar', license: 'CC0，依据 scikit-image 数据说明' },
  astronaut: { order: '002', source: 'astronaut.png', mode: 'design-only', contract: 'DESIGN_ONLY', ratio: '3:4', size: '1536x2048', title: '航天员肖像 · 纪念插画', purpose: '人物特征与职业语境的艺术概括', creator: 'NASA，Eileen Collins 肖像', license: '公有领域，依据 scikit-image 数据说明' },
  rocket: { order: '003', source: 'rocket.jpg', mode: 'top-bottom', contract: 'TOP_BOTTOM', ratio: '3:4', size: '1536x2048', title: '发射设施 · 科普视觉转译', purpose: '工程设施与环境关系的微缩概括', creator: 'SpaceX', license: '公有领域，依据 scikit-image 数据说明' },
  chelsea: { order: '004', source: 'chelsea.png', mode: 'design-only', contract: 'DESIGN_ONLY', ratio: '1:1', size: '1024x1024', title: '宠物特写 · 收藏插画', purpose: '毛色、目光与面部特征的保留实验', creator: 'Stefan van der Walt', license: 'CC0，依据 scikit-image 数据说明' }
};
const people = require('./people-cases.cjs');
Object.assign(cases, people.cases);
assert.ok(cases[id], '输入有效的演示 id');
const item = cases[id];
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const vendor = path.join(root, 'vendor/xxd-panel-028');
// Re-read the original immediately before preparing each distinct generation request.
const original = fs.readFileSync(path.join(vendor, 'references/original-prompt/zh-CN.md'), 'utf8');
const body = original.slice(original.indexOf('\n') + 1);
const skill = fs.readFileSync(path.join(vendor, 'SKILL.md'), 'utf8');
const blocks = [...skill.matchAll(/```text\r?\n([\s\S]*?)```/g)].map(m => m[1].trimEnd());
const common = blocks.find(b => b.startsWith('MODE-SPECIFIC DELIVERY OVERRIDE'));
const mode = blocks.find(b => b.startsWith('OUTPUT MODE: ' + item.contract));
const text = blocks.find(b => b.startsWith('TEXT MODE: NONE'));
assert.ok(common && mode && text, '原库交付块完整');
const prompt = body + '\n' + common.replace('<resolved ratio and/or exact WIDTHxHEIGHT>', item.ratio + ' / ' + item.size) + '\n\n' + mode + '\n\n' + text + '\n';
assert.ok(prompt.startsWith(body), '风格正文逐字保留');
assert.equal((prompt.match(/^OUTPUT MODE:/gm) || []).length, 1, '恰好一个输出模式');
assert.equal((prompt.match(/^TEXT MODE:/gm) || []).length, 1, '恰好一个文字块');
const run = people.cases[id] ? people.run : '20260910-real-scenes-01';
const dir = path.join(root, 'runs', run);
fs.mkdirSync(path.join(dir, 'prompts'), { recursive: true });
fs.mkdirSync(path.join(root, 'assets/generated', run), { recursive: true });
const promptFile = path.join(dir, 'prompts', id + '.txt');
assert.ok(!fs.existsSync(promptFile), '已有提示词不可静默覆盖');
fs.writeFileSync(promptFile, prompt);
const record = {
  id, ...item, run, state: 'prepared', preparedAt: new Date().toISOString(),
  upstream: 'https://github.com/nevertoday/xxd-panel-028', commit: '3194d43ba95edbad0082b3604959e45067f72b7e',
  originalSha256: hash(Buffer.from(original)), skillSha256: hash(Buffer.from(skill)), promptSha256: hash(Buffer.from(prompt)),
  input: 'assets/real-inputs/' + item.source,
  inputSha256: hash(fs.readFileSync(path.join(root, 'assets/real-inputs', item.source))),
  inputUrl: item.inputUrl || 'https://raw.githubusercontent.com/scikit-image/scikit-image/v0.24.0/skimage/data/' + item.source,
  inputDocumentation: item.inputDocumentation || 'https://scikit-image.org/docs/0.24.x/api/skimage.data.html#skimage.data.' + id,
  prompt: 'runs/' + run + '/prompts/' + id + '.txt',
  plannedOutput: 'assets/generated/' + run + '/source-' + item.order + '-' + id + '-' + item.mode + '-' + item.ratio.replace(':', 'x') + '-' + item.size + '.png',
  invocation: '/xxd-panel-028 ' + item.source + ' --mode ' + item.mode + ' --size ' + item.size + ' --text none --prefs off',
  execution: '宿主 Agent 按固定版本 SKILL.md 执行；通过内置 imagegen 通道生成；不是独立 Python 生图引擎。',
  promptComposition: '原始正文（仅去首行标题） + 上游 common preamble（代入画布） + 上游所选 mode block + 上游 text-free block；无新增审美段落。',
  generated: false, visualReview: null
};
fs.writeFileSync(path.join(dir, id + '.json'), JSON.stringify(record, null, 2) + '\n');
console.log(JSON.stringify({ id, state: record.state, source: record.input, promptSha256: record.promptSha256 }));
