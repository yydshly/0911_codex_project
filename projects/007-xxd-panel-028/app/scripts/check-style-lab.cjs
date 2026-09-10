const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const dist = path.join(root,'app/dist');
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const read = p => fs.readFileSync(path.join(root,p));
const run = 'runs/20260910-style-extensions-03/';
const original = read('vendor/xxd-panel-028/references/original-prompt/zh-CN.md').toString();
const body = original.slice(original.indexOf('\n')+1);
const skill = read('vendor/xxd-panel-028/SKILL.md').toString();
const profiles = JSON.parse(read('extensions/style-lab/profiles.json'));
let attempts = 0;
for(const job of JSON.parse(read('extensions/style-lab/jobs.json'))) {
  const r = JSON.parse(read(run+job.id+'.json'));
  assert.equal(r.state,'reviewed');
  assert.ok(r.review.observation && r.review.limit);
  assert.equal(r.originalSha256,hash(original));
  assert.equal(r.skillSha256,hash(skill));
  for(const ref of r.references) assert.equal(hash(read(ref.file)),ref.sha256,'参考图未改动');
  assert.equal(r.references.length,job.anchor?2:1);
  if(job.anchor) assert.equal(r.references[1].role,'style-only');
  for(const a of r.attemptRecords) {
    const prompt=read(a.prompt).toString();
    assert.equal(hash(prompt),a.promptSha256);
    assert.ok(prompt.startsWith(job.profile==='upstream-original'?body:profiles[job.profile].brief));
    assert.equal((prompt.match(/^OUTPUT MODE:/gm)||[]).length,1);
    assert.ok(prompt.includes('OUTPUT MODE: DESIGN_ONLY') && prompt.includes('TEXT MODE: NONE'));
    const image=read(a.output);
    assert.equal(hash(image),a.outputSha256);
    assert.equal(image.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
    assert.deepEqual(a.actualSize,[image.readUInt32BE(16),image.readUInt32BE(20)]);
    assert.ok(a.review);
    assert.equal(hash(fs.readFileSync(path.join(dist,'extension-assets',path.basename(a.output)))),a.outputSha256);
    attempts++;
  }
  assert.equal(r.exactPixels,r.actualSize.join('x')===r.size);
}
assert.equal(attempts,6);
assert.equal(hash(read('assets/real-inputs/wedding.jpg')),hash(fs.readFileSync(path.join(dist,'extension-assets/wedding.jpg'))));
const html=fs.readFileSync(path.join(dist,'extensions.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length);
for(const [,link] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if(/^https?:/.test(link)) continue;
  if(link.startsWith('#')) assert.ok(ids.includes(link.slice(1)));
  else assert.ok(fs.existsSync(path.join(dist,link)),link);
}
const data=JSON.parse(html.match(/<script id="extension-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
assert.equal(data.length,5);
new vm.Script(fs.readFileSync(path.join(dist,'extensions.js'),'utf8'));
for(const name of ['extensions.js','extensions.css']) assert.ok(read('app/'+name).equals(fs.readFileSync(path.join(dist,name))));
for(const rel of ['extensions/style-lab/README.md',run+'README.md']) {
  const file=path.join(root,rel);
  for(const [,link] of fs.readFileSync(file,'utf8').matchAll(/\]\(([^)]+)\)/g)) {
    if(/^(https?:|#)/.test(link)) continue;
    assert.ok(fs.existsSync(path.resolve(path.dirname(file),link.split('#')[0])),link);
  }
}
console.log('通过：扩展实验六次实际输出、提示词与来源保真、原片字节保留、网页证据链接');
