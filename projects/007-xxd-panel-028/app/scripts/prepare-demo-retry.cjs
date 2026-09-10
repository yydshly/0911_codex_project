const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const id = process.argv[2];
const corrections = {
  coffee: 'RETRY — FAILED TEXT-FREE REQUIREMENT ONLY: The previous output introduced an upright card with pseudo-writing. Enforce the selected TEXT MODE NONE everywhere, including tiny accessories. No menu, letters, labels, numbers, logos or pseudo-writing anywhere. Keep the requested complete LEFT_RIGHT canvas at exactly 1536x1024. Use only the attached original photograph as the source, not a previous generated image.',
  astronaut: 'RETRY — FAILED DELIVERY REQUIREMENTS ONLY: The previous output incorrectly showed an upper photographic portrait and a lower design. The selected DESIGN_ONLY contract replaces that legacy split completely. Produce ONE uninterrupted full-canvas transformed design, with NO photographic portrait area and NO diptych. The original photo is an invisible reference only. Enforce TEXT MODE NONE, including suit patches and miniature objects: no logos, letters, numbers or pseudo-text. Required final PNG dimensions: exactly 1536x2048. Use only the attached original photograph; do not reuse the previous result.',
  rocket: 'RETRY — FAILED DELIVERY REQUIREMENTS ONLY: The previous output retained insignia on the rocket and did not match the requested pixel dimensions. Enforce TEXT MODE NONE throughout both reality and design regions: no insignia, logos, letters, numbers or pseudo-text. Preserve the selected TOP_BOTTOM relationship and the original brief unchanged. Required final PNG dimensions: exactly 1536x2048. Use only the attached original photograph; do not reuse the previous result.',
  chelsea: 'RETRY — FAILED SIZE AND SOURCE-GROUNDING REQUIREMENTS ONLY: Required final PNG dimensions are exactly 1024x1024. The previous output expanded the close-up into a scene with books, vase, flowers, ball and blanket. Enforce the original brief’s restraint and source-grounded subject relationship: keep the recognizable cat as the single focus, avoid a collection of invented accessories. Preserve DESIGN_ONLY and TEXT MODE NONE. Use only the attached original photograph; do not reuse the previous result.'
};
const people = require('./people-cases.cjs');
const run = people.cases[id] ? people.run : '20260910-real-scenes-01';
corrections.beach = 'RETRY — FAILED EXACT-PIXEL DELIVERY REQUIREMENT ONLY: The previous output was 1254x1254 rather than the requested 1024x1024. Generate the complete final PNG at exactly 1024x1024 pixels. Preserve the selected DESIGN_ONLY and TEXT MODE NONE contracts and the entire original brief unchanged. Use only the attached original photograph as the source; no previous output is provided.';
assert.ok(corrections[id]);
const original = fs.readFileSync(path.join(root, 'vendor/xxd-panel-028/references/original-prompt/zh-CN.md'), 'utf8');
const body = original.slice(original.indexOf('\n') + 1);
const base = fs.readFileSync(path.join(root, 'runs', run, 'prompts', id + '.txt'), 'utf8');
assert.ok(base.startsWith(body));
const out = path.join(root, 'runs', run, 'prompts', id + '-retry.txt');
assert.ok(!fs.existsSync(out));
fs.writeFileSync(out, base + '\n' + corrections[id] + '\n');
console.log(id + ': retained upstream brief; appended failed-requirement retry only');
