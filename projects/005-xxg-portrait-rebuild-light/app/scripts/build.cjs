const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const app = path.resolve(__dirname, '..');
const project = path.dirname(app);
const output = path.join(app, 'dist');
assert.equal(path.dirname(output), app);
assert.equal(path.basename(output), 'dist');
if (fs.existsSync(output)) {
  assert.equal(fs.lstatSync(output).isSymbolicLink(), false);
  assert.equal(fs.realpathSync(output), output);
  fs.rmSync(output, { recursive: true });
}
fs.cpSync(path.join(app, 'public'), output, { recursive: true });
fs.mkdirSync(path.join(output, 'assets'));
for (const name of ['skill-demo1.jpg', 'skill-demo2.jpg', 'skill-demo3.jpg', 'skill-demo4.jpg', 'LICENSE.upstream', 'sources.json', 'README.md']) {
  fs.copyFileSync(path.join(project, 'assets', name), path.join(output, 'assets', name));
}
const experimentDirectory = path.join(project, 'assets', 'experiments');
const experiments = JSON.parse(fs.readFileSync(path.join(experimentDirectory, 'runs.json'), 'utf8'));
fs.cpSync(experimentDirectory, path.join(output, 'assets', 'experiments'), { recursive: true });
fs.writeFileSync(path.join(output, 'experiments-data.js'), 'window.PORTRAIT_EXPERIMENTS = ' + JSON.stringify(experiments, null, 2) + ';\n');
const extensionDirectory = path.join(project, 'assets', 'extensions');
const extensions = JSON.parse(fs.readFileSync(path.join(extensionDirectory, 'runs.json'), 'utf8'));
fs.cpSync(extensionDirectory, path.join(output, 'assets', 'extensions'), { recursive: true });
fs.writeFileSync(path.join(output, 'extensions-data.js'), 'window.PHOTO_EXTENSIONS = ' + JSON.stringify(extensions, null, 2) + ';\n');
// Preserve working links in the standalone Markdown research records.
for (const [source, destination] of [['notes.md', 'research.md'], ['README.md', 'project.md'], ['extensions.md', 'extensions.md']]) {
  const content = fs.readFileSync(path.join(project, source), 'utf8')
    .replaceAll('](README.md)', '](project.md)')
    .replaceAll('](notes.md)', '](research.md)')
    .replaceAll('](app/public/index.html)', '](index.html)')
    .replaceAll('](../../README.md#项目索引)', '](https://github.com/yydshly/0911_codex_project#项目索引)');
  fs.writeFileSync(path.join(output, destination), content);
}
require('./check.cjs');
console.log('XXG 人像光影展示页已构建：' + output);
