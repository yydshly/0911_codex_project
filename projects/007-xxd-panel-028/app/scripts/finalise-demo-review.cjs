// Persist an explicit visual review after the Agent has inspected each returned bitmap.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const [id, reviewFile] = process.argv.slice(2);
const people = require('./people-cases.cjs');
assert.ok(['coffee', 'astronaut', 'rocket', 'chelsea', ...Object.keys(people.cases)].includes(id));
const run = people.cases[id] ? people.run : '20260910-real-scenes-01';
const file = path.join(root, 'runs', run, id + '.json');
const r = JSON.parse(fs.readFileSync(file, 'utf8'));
const review = JSON.parse(fs.readFileSync(path.resolve(root, reviewFile), 'utf8'));
assert.equal(review.id, id);
assert.equal(review.attemptReviews.length, r.attemptRecords.length);
r.attemptRecords.forEach((a, i) => { a.visualReview = review.attemptReviews[i]; });
const selected = r.attemptRecords.find(a => a.attempt === review.selectedAttempt);
assert.ok(selected);
r.selectedAttempt = selected.attempt;
r.output = selected.output;
r.actualSize = selected.actualSize;
r.outputSha256 = selected.outputSha256;
r.initialPrompt = r.prompt;
r.initialPromptSha256 = r.promptSha256;
r.prompt = selected.prompt;
r.promptSha256 = selected.promptSha256;
r.visualReview = selected.visualReview;
r.deliveryCheck = {
  ...review.deliveryCheck,
  exactPixels: r.size.split('x').map(Number).every((n, i) => n === r.actualSize[i]),
  aspectRatio: Math.abs(r.actualSize[0] / r.actualSize[1] - r.ratio.split(':').map(Number).reduce((a, b) => a / b)) < 0.002
};
r.generated = true;
r.state = 'reviewed';
r.reviewedAt = new Date().toISOString();
r.reviewMethod = 'Agent 对原始输入与每轮实际 PNG 逐张视觉检查；像素和格式由文件头检查。未做 OCR 或人脸识别准确率评测。';
r.cost = null;
r.costNote = '内置图像工具未提供可核实的逐张费用，本研究不估算账单。';
fs.writeFileSync(file, JSON.stringify(r, null, 2) + '\n');
console.log(id + ': ' + r.visualReview.verdict + '; exactPixels=' + r.deliveryCheck.exactPixels);
