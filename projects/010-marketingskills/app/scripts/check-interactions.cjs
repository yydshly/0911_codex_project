// Run navigation event handlers with a minimal document model; no browser or API calls.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
class Element {
  constructor(tag) { this.tag = tag; this.children = []; this.attrs = {}; this.events = {}; this.textContent = ''; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  setAttribute(key, value) { this.attrs[key] = value; }
  removeAttribute(key) { delete this.attrs[key]; }
  addEventListener(key, callback) { this.events[key] = callback; }
  text() { return this.textContent + this.children.map(c => c.text()).join(''); }
  click() { if (!this.disabled) this.events.click(); }
}
const nodes = new Map();
const document = {
  createElement: tag => new Element(tag),
  createTextNode: text => { const node = new Element('#text'); node.textContent = text; return node; },
  querySelector: id => { if (!nodes.has(id)) nodes.set(id, new Element(id)); return nodes.get(id); },
  querySelectorAll: selector => { assert.equal(selector, '#step-buttons button'); return nodes.get('#step-buttons').children; }
};
const context = { window: {}, document }; vm.createContext(context);
for (const name of ['inventory.js', 'content.js', 'catalog.js', 'evidence.js', 'more-scenarios.js', 'app.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, '../dist', name), 'utf8'), context);
const get = id => nodes.get(id);
const scenarios = context.window.MARKETING_CONTENT.scenarios;
assert.equal(get('#skill-groups').children.length, 8);
assert.equal(get('#scenario').children.length, 6);
const catalog = context.window.MARKETING_CATALOG;
const visit = node => [node,...node.children.flatMap(visit)];
const skillButtons = visit(get('#skill-groups')).filter(node=>node.className==='skill-open');
assert.equal(skillButtons.length,50);
const skillNames = context.window.MARKETING_CONTENT.groups.flatMap(g=>Object.keys(g.skills));
skillButtons.forEach((button,i)=>{
  button.click(); const text=get('#skill-detail').text();
  assert.ok(text.includes(catalog[skillNames[i]].output)&&text.includes(catalog[skillNames[i]].check),'每个技能的产物与验收完整展示');
  assert.equal(skillButtons.filter(b=>b.attrs['aria-pressed']==='true').length,1);
});
const related = visit(get('#skill-detail')).find(node=>node.tag==='button');
related.click();assert.ok(get('#skill-detail').text().includes(catalog[related.textContent].output),'协作技能可跳转');
assert.equal(get('#tool-guide-table').children[0].children[2].children.length,95);
assert.equal(get('#tool-cli-table').children[0].children[2].children.length,64);
for (let scenario = 0; scenario < scenarios.length; scenario++) {
  get('#scenario').value = String(scenario); get('#scenario').events.change();
  assert.ok(get('#scenario-brief').text().includes(scenarios[scenario].brief));
  assert.equal(get('#previous').disabled, true, '切换场景回到首步');
  assert.equal(get('#next').disabled, false);
  const steps = scenarios[scenario].steps;
  for (let i = 0; i < steps.length; i++) {
    const panel = get('#step-panel').text();
    assert.ok(panel.includes(steps[i].result), '逐步展示对应产物');
    assert.ok(panel.includes(steps[i].boundary), '每步边界可见');
    assert.equal(get('#step-buttons').children[i].attrs['aria-current'], 'step');
    assert.equal(get('#step-buttons').children.filter(b => b.attrs['aria-current']).length, 1);
    get('#next').click();
  }
  assert.equal(get('#next').disabled, true, '末步停止向前');
  get('#previous').click(); assert.ok(get('#step-panel').text().includes(steps[4].result));
  get('#step-buttons').children[1].click(); assert.ok(get('#step-panel').text().includes(steps[1].result));
  get('#step-buttons').children[0].click(); assert.equal(get('#previous').disabled, true);
}
console.log('通过：50 技能详情与协作跳转、95 / 64 工具表、6 场景 × 6 步骤的产物、边界、前后导航、跳转和重置。未执行浏览器验收。');
