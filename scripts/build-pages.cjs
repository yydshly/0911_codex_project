const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const output = path.join(root, '_site');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs/web-demos.json'), 'utf8'));
const projects = [...manifest.projects].sort((a, b) => Number(a.id) - Number(b.id));
const e = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const repoLink = file => manifest.repository + '/blob/main/' + file.split('/').map(encodeURIComponent).join('/');
function checkedSource(relative) {
  const absolute = path.resolve(root, relative);
  if (!absolute.startsWith(root + path.sep)) throw new Error('源路径超出仓库范围');
  if (!fs.existsSync(absolute)) throw new Error('缺少发布文件：' + relative);
  if (!fs.realpathSync(absolute).startsWith(fs.realpathSync(root) + path.sep)) throw new Error('不允许发布仓库外的链接');
  return absolute;
}
assert.ok(projects.length > 0, '至少一个演示项目');
assert.equal(new Set(projects.map(p => p.slug)).size, projects.length, '发布路径不能重复');
assert.equal(new Set(projects.map(p => p.id)).size, projects.length, '项目编号不能重复');
for (const p of projects) {
  assert.match(p.slug, /^\d{3,}-[a-z0-9-]+$/);
  assert.equal(Number(p.slug.split('-')[0]), Number(p.id));
  checkedSource(p.sourceDirectory + '/index.html');
  checkedSource(p.readme);
  checkedSource(p.research);
  checkedSource(p.image);
  assert.equal(new URL(p.upstream).protocol, 'https:');
}
// Only remove the known staging directory, never a symlink or a computed external path.
assert.equal(path.dirname(output), root);
assert.equal(path.basename(output), '_site');
if (fs.existsSync(output)) {
  assert.equal(fs.lstatSync(output).isSymbolicLink(), false);
  fs.rmSync(output, { recursive: true });
}
fs.mkdirSync(output);
fs.mkdirSync(path.join(output, 'assets'));
for (const p of projects) {
  fs.cpSync(checkedSource(p.sourceDirectory), path.join(output, p.slug), { recursive: true });
  fs.copyFileSync(checkedSource(p.image), path.join(output, 'assets', p.slug + '.png'));
}
const cards = projects.map(p => `<article><div class="number">${e(p.id)} / ${e(p.kind || "实践演示")}</div><h2>${e(p.name)}</h2><h3>原库的核心能力</h3><p>${e(p.capability)}</p><a class="source" href="${e(p.upstream)}">原库：${e(p.upstreamName)} ↗</a><h3>我们的配套实践</h3><p>${e(p.extension)}</p><nav aria-label="${e(p.name)}相关入口"><a class="primary" href="${e(p.slug)}/">${e(p.entryLabel || "打开案例展示 →")}</a><a href="${e(repoLink(p.research))}">原库能力分析</a><a href="${e(repoLink(p.readme))}">项目研究与说明</a></nav><details><summary>整体理解引导图</summary><a href="assets/${e(p.slug)}.png"><img src="assets/${e(p.slug)}.png" alt="${e(p.imageAlt || "工程案例研究与实践整体引导图")}" loading="lazy"></a><p class="caption">${e(p.imageCaption || "AI 生成的说明图，非界面截图。图中部署状态是历史记录，以项目说明为准。")}</p></details></article>`).join('\n');
const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>GitHub 项目研究集 · 能力与演示</title><meta name="description" content="从开源项目的核心能力出发，关联原始仓库、中文研究和实践演示。"><style>
:root{font-family:"Segoe UI","Microsoft YaHei",sans-serif;color:#132a39;background:#f3f6f8}*{box-sizing:border-box}body{margin:0}header{background:#132a39;color:white;padding:32px max(24px,calc((100vw - 1080px)/2))}header a{color:#bfe8dc;font-size:14px}h1{font-size:32px;margin:18px 0 10px}header p{color:#cfdae1;line-height:1.9;margin:0}main{max-width:1128px;margin:32px auto;padding:0 24px}article{background:white;border:1px solid #d9e1e5;border-top:4px solid #14624f;border-radius:6px;padding:30px;margin-bottom:24px}.number{font-size:14px;color:#526976}h2{font-size:26px;margin:12px 0 24px}h3{font-size:16px;color:#14624f;margin:22px 0 8px}p{font-size:16px;line-height:1.9;margin:8px 0}a{color:#14624f;text-underline-offset:4px}nav{display:flex;gap:20px;align-items:center;flex-wrap:wrap;margin-top:24px}nav a{font-size:15px}.primary{background:#132a39;color:white;text-decoration:none;padding:12px 18px;border-radius:4px}.source{display:inline-block;margin:5px 0;font-size:14px}details{border-top:1px solid #d9e1e5;margin-top:28px;padding-top:20px}summary{cursor:pointer;font-size:16px}img{display:block;width:100%;height:auto;margin-top:20px}.caption,footer{font-size:13px;color:#526976;line-height:1.8}footer{margin:24px 0}a:focus-visible,summary:focus-visible{outline:3px solid #2580b8;outline-offset:5px}@media(max-width:600px){h1{font-size:26px}main{padding:0 16px}article{padding:22px}nav{gap:16px}}</style></head><body><header><a href="${e(manifest.repository)}#项目索引">GitHub 研究总索引 ↗</a><h1>理解开源能力，连接工程实践。</h1><p>从原库能做什么出发，关联原始资料、研究结论与可使用的演示。</p></header><main>${cards}<footer>静态演示由 GitHub Pages 提供。原库索引的 MIT 版权声明保留在案例手册中；外链文章按各自使用条件处理。</footer></main></body></html>`;
fs.writeFileSync(path.join(output, 'index.html'), html);
fs.writeFileSync(path.join(output, '.nojekyll'), '');
// Verify the exact assembled output, including nested HTML asset links and JavaScript syntax.
function inspect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    assert.equal(entry.isSymbolicLink(), false, '不发布符号链接');
    if (entry.isDirectory()) { inspect(file); continue; }
    if (file.endsWith('.js')) new vm.Script(fs.readFileSync(file, 'utf8'), { filename: file });
    if (!file.endsWith('.html')) continue;
    for (const [, link] of fs.readFileSync(file, 'utf8').matchAll(/(?:src|href)="([^"]+)"/g)) {
      if (/^(?:https?:|#)/.test(link)) continue;
      const target = path.resolve(path.dirname(file), link.split('#')[0]);
      assert.ok(target.startsWith(output + path.sep), '页面链接不越出发布目录');
      assert.ok(fs.existsSync(target), '发布资源存在：' + link);
    }
  }
}
inspect(output);
console.log('发布目录已生成并检查：' + output + '；项目：' + projects.map(p=>p.slug).join(', '));
