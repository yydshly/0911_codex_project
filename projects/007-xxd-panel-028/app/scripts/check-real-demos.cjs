const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const read = p => fs.readFileSync(path.join(root, p));
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const original = read('vendor/xxd-panel-028/references/original-prompt/zh-CN.md');
const body = original.toString('utf8').slice(original.toString('utf8').indexOf('\n') + 1);
const skill = read('vendor/xxd-panel-028/SKILL.md');
const people = require('./people-cases.cjs');
let checked = 0;
for (const id of ['coffee', 'astronaut', 'rocket', 'chelsea', ...Object.keys(people.cases)]) {
  const run = 'runs/' + (people.cases[id] ? people.run : '20260910-real-scenes-01') + '/';
  const r = JSON.parse(read(run + id + '.json'));
  const prompt = read(r.prompt);
  assert.equal(r.originalSha256, hash(original), '原始提示词快照未改动');
  assert.equal(r.skillSha256, hash(skill), 'Skill 快照未改动');
  assert.equal(r.promptSha256, hash(prompt), '实际提示词记录未改动');
  assert.equal(r.inputSha256, hash(read(r.input)), '输入摄影未改动');
  assert.ok(prompt.toString('utf8').startsWith(body), '原始审美正文逐字保留');
  assert.equal((prompt.toString('utf8').match(/^OUTPUT MODE:/gm) || []).length, 1);
  assert.ok(prompt.toString('utf8').includes('OUTPUT MODE: ' + r.contract));
  assert.match(prompt.toString('utf8'), /TEXT MODE: NONE\r?\nRender no letters, characters, numbers, logos, captions, labels, or pseudo-text anywhere\.\r?\n/);
  const initial = read(run + 'prompts/' + id + '.txt').toString('utf8');
  assert.ok(prompt.toString('utf8') === initial || (prompt.toString('utf8').startsWith(initial) && prompt.toString('utf8').slice(initial.length).trimStart().startsWith('RETRY — FAILED')), '重试只能保留原请求并追加失败约束');
  assert.equal(r.state, 'reviewed', '必须检查后才能发布');
  assert.equal(r.generated, true, '必须有实际生成结果');
  const image = read(r.output);
  assert.equal(image.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', '实际 PNG');
  assert.equal(hash(image), r.outputSha256);
  assert.deepEqual([image.readUInt32BE(16), image.readUInt32BE(20)], r.actualSize);
  assert.ok(r.visualReview.observations.length && r.visualReview.limitations.length);
  assert.equal(r.attemptRecords.length, r.attempts);
  assert.ok(r.attempts >= 1 && r.attempts <= 2, '单项最多一次重试');
  for (const attempt of r.attemptRecords) {
    assert.equal(hash(read(attempt.output)), attempt.outputSha256, '保留首轮与重试的实际输出');
    assert.equal(hash(read(attempt.prompt)), attempt.promptSha256);
    assert.ok(attempt.visualReview, '每轮都有验收记录');
  }
  const target = r.size.split('x').map(Number);
  assert.equal(r.deliveryCheck.exactPixels, target.every((n, i) => n === r.actualSize[i]), '准确尺寸状态必须真实');
  checked++;
}
console.log('通过：' + checked + ' 个真实输入／提示词／生成结果哈希、PNG 尺寸、原文保真与验收记录');
