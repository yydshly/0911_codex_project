const fs = require('node:fs');
const path = require('node:path');
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function renderRealDemos(project, dist) {
  const people = require('./people-cases.cjs');
  const ids = [...Object.keys(people.cases), 'coffee', 'astronaut', 'rocket', 'chelsea'];
  const run = path.join(project, 'runs/20260910-real-scenes-01');
  if (!fs.existsSync(run)) return '';
  const cards = [];
  for (const id of ids) {
    const caseRun = people.cases[id] ? people.run : '20260910-real-scenes-01';
    const file = path.join(project, 'runs', caseRun, id + '.json');
    if (!fs.existsSync(file)) continue;
    const r = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!r.generated || r.state !== 'reviewed') continue;
    const input = 'real-inputs/' + path.basename(r.input);
    const output = 'real-results/' + path.basename(r.output);
    const record = 'evidence/' + id + '.json';
    const prompt = 'evidence/' + id + '-prompt.txt';
    for (const [source, dest] of [[r.input, input], [r.output, output], ['runs/' + caseRun + '/' + id + '.json', record], [r.prompt, prompt]]) {
      const resolved = path.resolve(project, source);
      if (!resolved.startsWith(project + path.sep)) throw new Error('演示来源不可越界');
      const target = path.join(dist, dest);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(resolved, target);
    }
    const notes = r.visualReview.observations.map(s => '<li>' + escape(s) + '</li>').join('');
    const limits = r.visualReview.limitations.map(s => '<li>' + escape(s) + '</li>').join('');
    const history = (r.attemptRecords || []).map(attempt => {
      const imageUrl = 'real-results/' + path.basename(attempt.output);
      const promptUrl = 'evidence/' + id + '-attempt-' + attempt.attempt + '-prompt.txt';
      fs.copyFileSync(path.join(project, attempt.output), path.join(dist, imageUrl));
      fs.copyFileSync(path.join(project, attempt.prompt), path.join(dist, promptUrl));
      return '<li>第 ' + attempt.attempt + ' 次：' + escape(attempt.visualReview?.verdict || '见总验收') + ' · <a href="' + escape(imageUrl) + '">实际图片</a> · <a href="' + escape(promptUrl) + '">当次提示词</a></li>';
    }).join('');
    cards.push(`<article class="real-case" id="case-${escape(id)}"><div class="case-heading"><div><span class="eyebrow">实测 ${escape(r.order)} / ${escape(r.mode)} / 无文字</span><h3>${escape(r.title)}</h3><p>${escape(r.purpose)}</p></div><span class="run-badge">${escape(r.visualReview.verdict)}</span></div><div class="real-pair"><figure><a href="${escape(input)}"><img src="${escape(input)}" alt="${escape(r.title)}的真实摄影输入，未经预处理" loading="lazy"></a><figcaption>真实摄影输入 · ${escape(r.creator)}<small>${escape(r.license)}</small></figcaption></figure><figure><a href="${escape(output)}"><img src="${escape(output)}" alt="按 XXD Panel 028 原库 Skill 新生成的${escape(r.title)}成品" loading="lazy" width="${r.actualSize[0]}" height="${r.actualSize[1]}"></a><figcaption>本次新生成 · ${r.actualSize[0]} × ${r.actualSize[1]} PNG<small>整张画布一次生成；未通过程序拼接或改画。点击查看原文件。</small></figcaption></figure></div><div class="review-pair"><div><h4>验收观察</h4><ul>${notes}</ul></div><div><h4>实际边界</h4><ul>${limits}</ul></div></div><details class="run-details"><summary>查看执行依据与可复核记录</summary><p>固定库版本 3194d43。原始风格正文保持不变，仅追加库内所选模式、尺寸和无文字规则。${escape(r.attempts)} 次图像调用；下列参数由准备脚本解析，实际图像由宿主按 Skill 执行。</p><code>${escape(r.invocation)}</code><ul>${history}</ul><p>提示词 SHA-256：<code>${escape(r.promptSha256)}</code></p><div class="source-links"><a href="${escape(prompt)}">完整实际提示词</a><a href="${escape(record)}">输入／输出与验收记录</a><a href="${escape(r.inputDocumentation)}">摄影来源 ↗</a>${r.licenseUrl ? `<a href="${escape(r.licenseUrl)}">摄影许可 ↗</a>` : ''}<a href="${escape(input)}">原始输入文件</a><a href="${escape(output)}">生成 PNG</a></div></details></article>`);
  }
  if (!cards.length) return '<section id="real-demos" class="section wrap"><h2>真实摄影演示正在生成</h2><p>完成生成与检查后展示实际文件；此处不使用预制成品替代。</p></section>';
  return `<section id="real-demos" class="section wrap"><div class="section-title"><div><p class="eyebrow">REAL PHOTOS / EXECUTED WITH THE UPSTREAM SKILL</p><h2>${cards.length} 个真实场景，按库实际执行。</h2></div><p class="muted">2026-09-10 · 固定提交 3194d43<br>原始摄影、实际成品、提示词与验收记录</p></div><div class="execution-note"><strong>这里展示的是本次新生成结果，不是上游预制样张。</strong><p>执行原库 SKILL.md 的内置生图路径：读取完整审美原文，追加库内模式与交付块，再由宿主图像工具生成；针对失败项按库规则只重试一次。没有新增审美方案，没有运行仅供备用的 API 桥接。图像模型是该库规定的执行依赖，实际偏差在下方保留。</p></div>${cards.join('\n')}</section>`;
}
module.exports = { renderRealDemos };
