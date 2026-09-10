// Local extension: configurable aesthetics + unchanged upstream delivery blocks.
// Prepares evidence and copies returned PNGs. Image generation runs in the host, never here.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const run = '20260910-style-extensions-03';
const jobs = JSON.parse(fs.readFileSync(path.join(root, 'extensions/style-lab/jobs.json')));
const profiles = JSON.parse(fs.readFileSync(path.join(root, 'extensions/style-lab/profiles.json')));
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const [action, id, outputFile] = process.argv.slice(2);
const job = jobs.find(j => j.id === id);
assert.ok(job, 'Unknown job');
const dir = path.join(root, 'runs', run);
const recordFile = path.join(dir, id + '.json');
if (action === 'prepare') {
  assert.ok(!fs.existsSync(recordFile), 'Existing job cannot be overwritten');
  fs.mkdirSync(path.join(dir, 'prompts'), { recursive: true });
  const original = fs.readFileSync(path.join(root, 'vendor/xxd-panel-028/references/original-prompt/zh-CN.md'), 'utf8');
  const skill = fs.readFileSync(path.join(root, 'vendor/xxd-panel-028/SKILL.md'), 'utf8');
  const blocks = [...skill.matchAll(/```text\r?\n([\s\S]*?)```/g)].map(m => m[1].trimEnd());
  const common = blocks.find(b => b.startsWith('MODE-SPECIFIC DELIVERY OVERRIDE')).replace('<resolved ratio and/or exact WIDTHxHEIGHT>', job.ratio + ' / ' + job.size);
  const mode = blocks.find(b => b.startsWith('OUTPUT MODE: DESIGN_ONLY'));
  const text = blocks.find(b => b.startsWith('TEXT MODE: NONE'));
  const brief = job.profile === 'upstream-original' ? original.slice(original.indexOf('\n') + 1) : profiles[job.profile].brief;
  let prompt = brief + '\n' + common + '\n\n' + mode + '\n\n' + text + '\n';
  if (job.preservation === 'strict') prompt += '\nLOCAL EXTENSION — CONTENT PRESERVATION: Image 1 is the only content source. Preserve the number of people, their individual facial features, apparent ages, hairstyle, clothing, pose, gaze, hand relationships, relative positions, original camera viewpoint and framing. Keep the original visible setting and props; do not add people, architecture, flowers, furniture or invented accessories. Render through the selected medium without changing the scene. These are requested constraints, not a guarantee.\n';
  if (job.preservation === 'relaxed') prompt += '\nLOCAL EXTENSION — COMPOSITION FREEDOM: Image 1 is the only content source. Preserve the two people, their recognizable facial features, clothing, bouquet and mutual gaze. You may simplify and rearrange the existing background and reposition the pair on the paper to create a spacious illustrative composition. Let background washes and the existing floral motifs dissolve into paper whitespace. Do not introduce new people or narrative events.\n';
  const input = 'assets/real-inputs/' + job.source;
  const references = [{ role: 'content', file: input, sha256: hash(fs.readFileSync(path.join(root, input))) }];
  if (job.anchor) {
    const anchor = JSON.parse(fs.readFileSync(path.join(dir, job.anchor + '.json')));
    assert.ok(anchor.output, 'Generate and inspect anchor first');
    references.push({ role: 'style-only', file: anchor.output, sha256: anchor.outputSha256 });
    prompt += '\nLOCAL EXTENSION — SERIES REFERENCE: Image 2 is an approved watercolor style anchor only. Borrow its paper texture, watercolor edge treatment, detail hierarchy and paint handling. All people, faces, clothing, poses, objects and scene facts come exclusively from Image 1. Never transfer the wedding couple, bouquet, wedding clothes or wedding setting from Image 2. Derive colors from Image 1 rather than copying the anchor palette.\n';
  }
  const promptPath = 'runs/' + run + '/prompts/' + id + '.txt';
  fs.writeFileSync(path.join(root, promptPath), prompt);
  fs.writeFileSync(recordFile, JSON.stringify({ ...job, run, upstreamCommit: '3194d43ba95edbad0082b3604959e45067f72b7e', origin: job.profile === 'upstream-original' ? 'upstream-baseline' : 'local-extension', originalSha256: hash(original), skillSha256: hash(skill), briefSha256: hash(brief), references, prompt: promptPath, promptSha256: hash(prompt), state: 'prepared', preparedAt: new Date().toISOString() }, null, 2) + '\n');
  console.log(id + ': prepared');
} else if (action === 'retry') {
  const r = JSON.parse(fs.readFileSync(recordFile));
  assert.equal(id, 'miniature');
  assert.ok(r.output && !r.initialPrompt);
  r.initialPrompt = r.prompt;
  r.initialPromptSha256 = r.promptSha256;
  const base = fs.readFileSync(path.join(root, r.prompt), 'utf8');
  const original = fs.readFileSync(path.join(root, 'vendor/xxd-panel-028/references/original-prompt/zh-CN.md'), 'utf8');
  assert.ok(base.startsWith(original.slice(original.indexOf('\n') + 1)));
  const prompt = base + '\nRETRY — FAILED DESIGN_ONLY REQUIREMENT ONLY: The previous result incorrectly contained two stacked depictions, an upper portrait and a lower miniature. Produce one single uninterrupted transformed miniature artwork for the whole canvas. No upper portrait, no photograph section, no second depiction of the pair, no diptych. The selected DESIGN_ONLY contract completely replaces the legacy upper/lower container. Preserve all original aesthetic instructions, no-text requirement and exact 1024x1536 PNG delivery. Use only the original photograph as reference.\n';
  r.prompt = 'runs/' + run + '/prompts/' + id + '-retry.txt';
  r.promptSha256 = hash(prompt);
  fs.writeFileSync(path.join(root, r.prompt), prompt);
  r.state = 'prepared-retry';
  fs.writeFileSync(recordFile, JSON.stringify(r, null, 2) + '\n');
} else if (action === 'record') {
  const r = JSON.parse(fs.readFileSync(recordFile));
  assert.ok(!r.output || (r.state === 'prepared-retry' && r.attemptRecords.length === 1), 'No overwrite');
  const bytes = fs.readFileSync(outputFile);
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  r.actualSize = [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
  r.exactPixels = r.actualSize.join('x') === r.size;
  r.output = 'assets/generated/' + run + '/' + id + (r.initialPrompt ? '-retry' : '') + '-' + r.actualSize.join('x') + '.png';
  fs.mkdirSync(path.dirname(path.join(root, r.output)), { recursive: true });
  fs.copyFileSync(outputFile, path.join(root, r.output));
  r.outputSha256 = hash(bytes);
  r.tool = 'built-in imagegen';
  r.postprocessing = 'none';
  r.attemptRecords = [...(r.attemptRecords || []), { output: r.output, outputSha256: r.outputSha256, actualSize: r.actualSize, prompt: r.prompt, promptSha256: r.promptSha256 }];
  r.state = 'generated-awaiting-review';
  fs.writeFileSync(recordFile, JSON.stringify(r, null, 2) + '\n');
  console.log(JSON.stringify({ id, output: r.output, actualSize: r.actualSize }));
} else throw new Error('Use prepare or record');
