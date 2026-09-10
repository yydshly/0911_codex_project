const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const app = __dirname;
const project = path.dirname(app);
const dist = path.join(app, 'dist');
const read = p => fs.readFileSync(p, 'utf8');
const page = read(path.join(dist, 'index.html'));
const notes = read(path.join(project, 'notes.md'));
const manifest = JSON.parse(read(path.join(dist, 'research-manifest.json')));
const ids = [...page.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, '页面 ID 不重复');
assert.equal(manifest.chapters.length, 10, '十章完整');
assert.equal(Object.keys(manifest.sources).length, 30, '30 个来源');
assert.equal(manifest.researchIndex, '013');
assert.equal(manifest.directory, '013-upscayl');
assert.equal(manifest.sourceSha256, crypto.createHash('sha256').update(fs.readFileSync(path.join(project, 'notes.md'))).digest('hex'), '构建使用当前正文');
assert.deepEqual(fs.readFileSync(path.join(project, 'notes.md')), fs.readFileSync(path.join(dist, 'downloads/upscayl-research.md')), '下载和主文档一致');
for (const id of manifest.chapters) {
  assert.ok(ids.includes(id), `存在章节 ${id}`);
  assert.ok(page.includes(`href="#${id}"`), `存在导航 ${id}`);
}
let localLinks = 0;
for (const [, link] of page.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (/^https:\/\//.test(link)) continue;
  const [file, anchor] = link.split('#');
  const target = path.resolve(dist, file || 'index.html');
  assert.ok(target.startsWith(dist + path.sep), '本地链接不越界');
  assert.ok(fs.existsSync(target), `资源存在 ${link}`);
  if ((!file || file === 'index.html') && anchor) assert.ok(ids.includes(anchor), `锚点存在 ${link}`);
  localLinks++;
}
for (const [, id] of notes.matchAll(/\]\[(s\d+)\]/g)) assert.ok(manifest.sources[id], `引用定义存在 ${id}`);
assert.doesNotMatch(page, /<!--(?:CONTENT|TOC|INTRO)-->|\{\{|\}\}|\]\[s\d+\]/, '没有模板或引用残留');
for (const term of ['Topaz','Adobe','chaiNNer','Real-ESRGAN','waifu2x','SwinIR','HAT','SUPIR','Qwen-Image','Vulkan','NCNN','时序','未运行上游']) assert.ok(page.includes(term), `完整覆盖 ${term}`);
for (const file of ['app.js','serve.cjs','check.cjs']) new vm.Script(read(path.join(app,file)), {filename:file});
new vm.Script(read(path.join(dist,'app.js')));
for (const file of ['README.md','notes.md','assets/README.md']) {
  const absolute = path.join(project,file);
  const content = read(absolute);
  assert.doesNotMatch(content,/\{\{|\}\}/, '模板占位已替换');
  for (const [, url] of content.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^(?:https?:|#)/.test(url)) continue;
    assert.ok(fs.existsSync(path.resolve(path.dirname(absolute),url.split('#')[0])), `文档资源 ${file}: ${url}`);
  }
}
console.log(JSON.stringify({status:'passed',chapters:10,sources:30,localLinks,documentSynced:true,scope:'静态内容、链接、锚点、脚本语法；非视觉与模型实测'},null,2));
