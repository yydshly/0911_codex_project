const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { planDelivery } = require('../app.js');
const input = { modes: ['left-right'], sizes: ['16:9'], count: 1, text: 'none', locale: 'zh-CN', wallpaper: 'linked' };
assert.equal(planDelivery(input).total, 1);
assert.equal(planDelivery({ ...input, modes: ['top-bottom', 'design-only'], sizes: ['1:1', '3:4', '9:16'], count: 10 }).total, 60);
assert.equal(planDelivery({ ...input, modes: ['top-bottom', 'left-right', 'design-only', 'wallpaper-pack'] }).total, 7);
const pack = planDelivery({ ...input, modes: ['wallpaper-pack'], sizes: ['1:1', '3:4', '9:16'], count: 2 });
assert.equal(pack.total, 8, '普通尺寸不能倍增壁纸套装');
assert.ok(!pack.command.includes('--size'));
assert.equal(planDelivery({ ...input, modes: ['left-right', 'left-right'], sizes: ['16:9', '16:9'] }).total, 1);
assert.ok(!planDelivery(input).command.includes('--locale'));
assert.ok(planDelivery({ ...input, text: 'exact' }).command.includes('--copy "你的准确文案"'));
for (const invalid of [{ modes: [] }, { sizes: [] }, { count: 0 }, { count: 1.5 }, { count: 1001 }, { count: NaN }, { modes: ['unknown'] }]) assert.throws(() => planDelivery({ ...input, ...invalid }));
const dist = path.resolve(__dirname, '../dist');
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'HTML id 唯一');
for (const [, link] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (/^https?:/.test(link) || link === '#') continue;
  if (link.startsWith('#')) { assert.ok(ids.includes(link.slice(1)), '锚点存在：' + link); continue; }
  const [file, anchor] = link.split('#');
  const target = path.resolve(dist, file);
  assert.ok(fs.existsSync(target), '静态资源存在：' + link);
  if (anchor) assert.ok(fs.readFileSync(target, 'utf8').includes('id="' + anchor + '"'), '跨页锚点存在：' + link);
}
new vm.Script(fs.readFileSync(path.join(dist, 'app.js'), 'utf8'));
for (const name of ['style.css', 'app.js']) assert.equal(fs.readFileSync(path.join(dist, name), 'utf8'), fs.readFileSync(path.resolve(__dirname, '..', name), 'utf8'), '构建与源码一致');
for (const name of ['sample-01.jpg', 'sample-05.png', 'sample-06.png', 'sample-07.png', 'sample-08.png', 'sample-09.png']) assert.ok(fs.readFileSync(path.join(dist, 'assets', name)).equals(fs.readFileSync(path.resolve(__dirname, '../../assets/examples', name))), '发布样张保持原始字节');
assert.match(fs.readFileSync(path.join(dist, 'UPSTREAM-LICENSE.txt'), 'utf8'), /PolyForm Noncommercial/);
const project = path.resolve(__dirname, '../..');
for (const name of ['README.md', 'notes.md', 'understanding.md', 'assets/README.md', 'assets/real-inputs/README.md', 'vendor/README.md', 'runs/20260910-real-scenes-01/README.md', 'runs/20260910-people-scenes-02/README.md']) {
  const file = path.join(project, name);
  const markdown = fs.readFileSync(file, 'utf8');
  assert.ok(!markdown.includes('{{'), '没有模板占位符：' + name);
  for (const [, link] of markdown.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^(?:https?:|#)/.test(link)) continue;
    assert.ok(fs.existsSync(path.resolve(path.dirname(file), link.split('#')[0])), '文档链接存在：' + name + ' → ' + link);
  }
}
assert.equal((html.match(/class="real-case"/g) || []).length, 7, '七个真实摄影场景全部展示');
assert.equal((html.match(/当次提示词/g) || []).length, 12, '全部十二次提示词均可查看');
assert.ok(html.includes('尺寸未达标') && html.includes('模式退化'), '展示真实偏差而非全部通过');
console.log('通过：交付计算、输入边界、资源、锚点、脚本语法、构建一致性与原样素材');
require('./check-style-lab.cjs');
require('./check-miniature-scenes.cjs');
