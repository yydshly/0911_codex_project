const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const upstream = path.resolve(process.argv[2] || '.');
const project = path.resolve(__dirname, '../..');
const commit = cp.execFileSync('git', ['-C', upstream, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
assert.equal(commit, '5b2c0007766c6a1cf1d53fd8fc73e979e0821022', '快照必须来自研究固定提交');
const skills = fs.readdirSync(path.join(upstream, 'skills'), { withFileTypes: true }).filter(e => e.isDirectory()).map(e => {
  const relative = `skills/${e.name}/SKILL.md`;
  const raw = fs.readFileSync(path.join(upstream, relative));
  const text = raw.toString('utf8');
  return { name: e.name, version: text.match(/^\s+version:\s*(\S+)/m)[1], source: relative, sha256: crypto.createHash('sha256').update(raw).digest('hex') };
}).sort((a, b) => a.name.localeCompare(b.name));
const inventory = {
  upstream: 'https://github.com/coreyhaines31/marketingskills', commit, researchDate: '2026-09-10',
  pluginVersion: JSON.parse(fs.readFileSync(path.join(upstream, '.claude-plugin/plugin.json'), 'utf8')).version,
  skillCount: skills.length,
  cliCount: fs.readdirSync(path.join(upstream, 'tools/clis')).filter(n => n.endsWith('.js')).length,
  integrationCount: fs.readdirSync(path.join(upstream, 'tools/integrations')).filter(n => n.endsWith('.md')).length,
  skills
};
assert.equal(inventory.skillCount, 50); assert.equal(inventory.cliCount, 64); assert.equal(inventory.integrationCount, 95);
fs.mkdirSync(path.join(project, 'sources'), { recursive: true });
fs.writeFileSync(path.join(project, 'sources/inventory.json'), JSON.stringify(inventory, null, 2) + '\n');
fs.writeFileSync(path.join(project, 'app/dist/inventory.js'), 'window.MARKETING_INVENTORY = ' + JSON.stringify(inventory, null, 2) + ';\n');
fs.copyFileSync(path.join(upstream, 'LICENSE'), path.join(project, 'sources/LICENSE'));
fs.copyFileSync(path.join(upstream, 'LICENSE'), path.join(project, 'app/dist/LICENSE-upstream.txt'));
console.log('已提取固定源码快照：50 技能 / 64 脚本 / 95 指南');
