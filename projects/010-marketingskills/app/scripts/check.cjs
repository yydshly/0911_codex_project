const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const project = path.resolve(__dirname, '../..');
const dist = path.join(project, 'app/dist');
const context = { window: {} }; vm.createContext(context);
for (const name of ['content.js', 'inventory.js', 'catalog.js', 'evidence.js', 'more-scenarios.js']) vm.runInContext(fs.readFileSync(path.join(dist, name), 'utf8'), context);
for (const name of fs.readdirSync(dist).filter(n => n.endsWith('.js'))) new vm.Script(fs.readFileSync(path.join(dist, name), 'utf8'));
const data = context.window.MARKETING_CONTENT;
const inventory = context.window.MARKETING_INVENTORY;
const ids = data.groups.flatMap(g => Object.keys(g.skills));
assert.equal(ids.length, 50); assert.equal(new Set(ids).size, 50);
assert.deepEqual([...ids].sort(), Array.from(inventory.skills, s => s.name).sort());
assert.equal(JSON.stringify(inventory), JSON.stringify(JSON.parse(fs.readFileSync(path.join(project, 'sources/inventory.json'), 'utf8'))));
assert.equal(data.scenarios.length, 6);
const catalog=context.window.MARKETING_CATALOG;
const evidence=context.window.MARKETING_EVIDENCE;
assert.deepEqual(Object.keys(catalog).sort(), [...ids].sort());
for (const [name, card] of Object.entries(catalog)) {
  for (const key of ['when','input','method','output','check']) assert.ok(card[key]?.trim(), `${name} 缺少 ${key}`);
  for (const related of card.related) assert.ok(ids.includes(related), `${name} 的协作技能存在`);
}
assert.equal(evidence.guides.length,95);assert.equal(evidence.clis.length,64);assert.equal(evidence.skills.length,50);
assert.equal(JSON.stringify(evidence),JSON.stringify(JSON.parse(fs.readFileSync(path.join(project,'sources/evidence.json'),'utf8'))));
assert.equal(fs.readFileSync(path.join(project,'catalog.md'),'utf8'),fs.readFileSync(path.join(dist,'catalog.md'),'utf8'));
assert.ok(htmlHandbookMatches(), '网页手册与源片段一致');
function htmlHandbookMatches() {return fs.readFileSync(path.join(dist,'index.html'),'utf8').includes(fs.readFileSync(path.join(project,'app/handbook.html'),'utf8'));}
for (const scenario of data.scenarios) {
  assert.equal(scenario.steps.length, 6);
  for (const step of scenario.steps) {
    assert.ok(ids.includes(step.skill), '步骤引用的技能真实存在');
    for (const key of ['name', 'actor', 'file', 'action', 'result', 'boundary']) assert.ok(step[key]?.trim(), `步骤缺少 ${key}`);
  }
}
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const anchors = Array.from(html.matchAll(/id="([^"]+)"/g), m => m[1]);
assert.equal(anchors.length, new Set(anchors).size);
for (const [, link] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (/^https?:/.test(link)) continue;
  if (link.startsWith('#')) { if (link.length > 1) assert.ok(anchors.includes(link.slice(1)), '页内锚点存在'); continue; }
  assert.ok(fs.existsSync(path.join(dist, link)), `资源缺失：${link}`);
}
assert.ok(html.includes('教学示例') && html.includes('非上游界面截图'));
assert.ok(!html.includes('{{'));
for (const name of ['README.md', 'notes.md', 'assets/README.md', 'catalog.md']) {
  const filename = path.join(project, name);
  const markdown = fs.readFileSync(filename, 'utf8');
  assert.ok(!/\{\{[^}]+\}\}/.test(markdown), `模板未替换：${name}`);
  for (const [, target] of markdown.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^(?:https?:|#)/.test(target)) continue;
    assert.ok(fs.existsSync(path.resolve(path.dirname(filename), target.split('#')[0])), `文档链接缺失：${target}`);
  }
}
console.log('通过：50 技能详细卡、6 × 6 步骤、95 指南 / 64 脚本、协作引用、源码清单与生成手册一致，资源、链接和语法检查。');
