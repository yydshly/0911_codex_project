const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../dist');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), context);
new vm.Script(fs.readFileSync(path.join(root, 'app.js'), 'utf8'));
new vm.Script(fs.readFileSync(path.join(root, 'experiments.js'), 'utf8'));
vm.runInNewContext(fs.readFileSync(path.join(root, 'experiments-data.js'), 'utf8'), context);
const experiments = context.window.PORTRAIT_EXPERIMENTS;
assert.equal(experiments.runs.length, 3);
assert.equal(new Set(experiments.runs.map(run => run.id)).size, 3);
for (const item of [experiments.source, ...experiments.runs]) {
  assert.ok(item.prompt && item.file && item.width > 0 && item.height > 0);
  const bytes = fs.readFileSync(path.join(root, 'assets', 'experiments', item.file));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), item.sha256);
}
for (const run of experiments.runs) {
  assert.equal(run.inputSha256, experiments.source.sha256, '每次编辑必须使用同一张原图');
  assert.ok(run.observation && run.limitations && run.verdict, '保留观察与局限');
  assert.ok(run.prompt.startsWith('EDIT:'));
}
const { PORTRAIT_DATA: data, compilePortraitPrompt: compile } = context.window;
vm.runInNewContext(fs.readFileSync(path.join(root, 'extensions-data.js'), 'utf8'), context);
new vm.Script(fs.readFileSync(path.join(root, 'extensions.js'), 'utf8'));
const extensions = context.window.PHOTO_EXTENSIONS;
assert.equal(extensions.cases.length, 2);
assert.equal(new Set(extensions.cases.map(sample => sample.id)).size, 2);
assert.ok(extensions.cases.find(sample => sample.id === 'headshot-reference').reusedFrom);
assert.equal(extensions.attempts.filter(attempt => attempt.status === 'succeeded' && attempt.stage === 'edit').length, 1);
assert.equal(extensions.attempts.filter(attempt => attempt.status === 'failed').length, 4);
for (const sample of extensions.cases) {
  assert.equal(sample.output.inputSha256, sample.source.sha256, '扩展样例输出对应自己的输入');
  for (const item of [sample.source, sample.output]) {
    const bytes = fs.readFileSync(path.join(root, 'assets', 'extensions', item.file));
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), item.sha256);
    assert.equal(bytes.readUInt32BE(16), item.width);
    assert.equal(bytes.readUInt32BE(20), item.height);
    assert.ok(item.prompt && item.actualTool && item.startUtc && item.endUtc);
  }
  for (const field of ['goal', 'preserve', 'observation', 'limitations', 'product', 'verdict']) assert.ok(sample[field]);
}
for (const run of experiments.runs) {
  assert.equal(run.prompt, compile(data.recipes.find(recipe => recipe.id === run.id)), '实际提示词与本次配方保持逐字一致');
}
assert.equal(data.examples.length, 4);
assert.equal(data.recipes.length, 6);
assert.equal(new Set(data.examples.map(item => item.id)).size, 4);
assert.equal(new Set(data.recipes.map(item => item.id)).size, 6);
for (const item of data.examples) assert.ok(fs.existsSync(path.join(root, 'assets', item.image)));
for (const recipe of data.recipes) {
  const prompt = compile(recipe);
  const count = prompt.split(/\s+/).length;
  assert.ok(count >= 55 && count <= 135, recipe.id + ': prompt words ' + count);
  assert.equal(prompt.split('\n').length, recipe.render ? 5 : 4);
  assert.ok(!/\b[LSEPTGDA]\d\b/.test(prompt), '配方代码不直接发送模型');
  assert.ok(prompt.includes('preserve source identity'));
  for (const field of ['change', 'preserve', 'use', 'audit']) assert.ok(recipe[field]);
}
// Verify that each selected result displays its own exact prompt and keeps the common source.
const element = () => ({
  children: [], attributes: {}, events: {}, textContent: '',
  append(...children) { this.children.push(...children); },
  setAttribute(name, value) { this.attributes[name] = value; },
  addEventListener(name, handler) { this.events[name] = handler; }
});
const elements = new Map([...html.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => [id, element()]));
const uiContext = {
  window: { PORTRAIT_EXPERIMENTS: experiments },
  document: { getElementById: id => { assert.ok(elements.has(id), 'UI id: ' + id); return elements.get(id); }, createElement: element },
  navigator: { clipboard: { writeText: async () => {} } }
};
vm.runInNewContext(fs.readFileSync(path.join(root, 'experiments.js'), 'utf8'), uiContext);
const runButtons = elements.get('experiment-controls').children;
assert.equal(runButtons.length, experiments.runs.length);
runButtons.forEach((button, index) => {
  button.events.click();
  const run = experiments.runs[index];
  assert.equal(elements.get('run-prompt').textContent, run.prompt);
  assert.equal(elements.get('run-output').src, 'assets/experiments/' + run.file);
  assert.equal(elements.get('run-source').src, 'assets/experiments/' + experiments.source.file);
  assert.equal(elements.get('run-limitations').textContent, run.limitations);
  assert.equal(runButtons.filter(item => item.attributes['aria-pressed'] === 'true').length, 1);
});
uiContext.window.PHOTO_EXTENSIONS = extensions;
vm.runInNewContext(fs.readFileSync(path.join(root, 'extensions.js'), 'utf8'), uiContext);
const extensionButtons = elements.get('extension-controls').children;
assert.equal(extensionButtons.length, extensions.cases.length);
extensionButtons.forEach((button, index) => {
  button.events.click();
  const sample = extensions.cases[index];
  assert.equal(elements.get('extension-prompt').textContent, sample.output.prompt);
  assert.equal(elements.get('extension-source-prompt').textContent, sample.source.prompt);
  assert.equal(elements.get('extension-source').src, 'assets/extensions/' + sample.source.file);
  assert.equal(elements.get('extension-output').src, 'assets/extensions/' + sample.output.file);
  assert.equal(elements.get('extension-limitations').textContent, sample.limitations);
  assert.equal(extensionButtons.filter(item => item.attributes['aria-pressed'] === 'true').length, 1);
});
assert.equal(data.recipes[0].code, 'L0 + E0 + S1 + P0 + T0 + G0 + D0 + A0');
assert.ok(data.recipes.find(item => item.id === 'capture').preserve.includes('景深'));
for (const [, link] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (link.startsWith('https:')) continue;
  if (link.startsWith('#')) { assert.ok(html.includes('id="' + link.slice(1) + '"')); continue; }
  const file = path.resolve(root, link);
  assert.ok(file.startsWith(root + path.sep));
  assert.ok(fs.existsSync(file), link);
}
assert.ok(html.includes('不代表本地实测'));
assert.ok(html.includes('页面不提供在线修图'));
const assets = path.resolve(__dirname, '../../assets');
for (const item of JSON.parse(fs.readFileSync(path.join(assets, 'sources.json'), 'utf8'))) {
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'assets', item.file))).digest('hex');
  assert.equal(hash, item.sha256, '发布图像必须与来源清单完全一致');
}
const project = path.resolve(__dirname, '../..');
for (const file of ['README.md', 'notes.md', 'extensions.md', 'assets/README.md', 'assets/extensions/README.md']) {
  const absolute = path.join(project, file);
  const content = fs.readFileSync(absolute, 'utf8');
  assert.ok(!/\{\{[^}]+\}\}/.test(content), '无模板占位符');
  for (const [, link] of content.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^(https?:|#)/.test(link)) continue;
    assert.ok(fs.existsSync(path.resolve(path.dirname(absolute), link.split('#')[0])), file + ': ' + link);
  }
}
console.log('已检查商品新样例与既有窗光参考、3 次人像布光、输入输出与提示词切换、原文件哈希、4 组上游示例、6 种配方和静态链接。');
