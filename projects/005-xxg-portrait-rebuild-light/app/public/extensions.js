'use strict';
(() => {
  const record = window.PHOTO_EXTENSIONS;
  const byId = id => document.getElementById(id);
  const asset = file => 'assets/extensions/' + file;
  const buttons = [];
  let selected;
  function select(sample, index) {
    selected = sample;
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(index === i)));
    for (const field of ['title', 'verdict', 'story', 'goal', 'preserve', 'observation', 'limitations', 'product']) byId('extension-' + field).textContent = sample[field];
    for (const kind of ['source', 'output']) {
      const item = sample[kind];
      const img = byId('extension-' + kind);
      img.src = asset(item.file); img.width = item.width; img.height = item.height;
      img.alt = sample.label + (kind === 'source' ? '：AI 合成的问题照片输入' : '：真实编辑调用输出');
      byId('extension-' + kind + '-link').href = asset(item.file);
      byId('extension-' + kind + '-link').setAttribute('aria-label', '查看' + img.alt + '完整文件');
    }
    byId('extension-meta').textContent = sample.output.width + ' × ' + sample.output.height;
    byId('extension-prompt').textContent = sample.output.prompt;
    byId('extension-source-prompt').textContent = sample.source.prompt;
    byId('extension-call-meta').textContent = '日期：' + record.date + ' · 内置 ImageGen · 输入生成 ' + sample.source.attemptCount + ' 次尝试，编辑 ' + sample.output.attemptCount + ' 次尝试，保留 1 张实际输出。' + sample.attemptNote + ' 无后期处理，模型版本和费用未公开。';
    byId('extension-copy-status').textContent = '';
  }
  record.cases.forEach((sample, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.textContent = sample.label;
    button.setAttribute('aria-controls', 'extension-title');
    button.addEventListener('click', () => select(sample, index));
    buttons.push(button); byId('extension-controls').append(button);
  });
  byId('copy-extension').addEventListener('click', async () => {
    const sample = selected;
    try {
      await navigator.clipboard.writeText(sample.output.prompt);
      if (selected === sample) byId('extension-copy-status').textContent = '已复制本次实际编辑提示词。';
    } catch {
      if (selected === sample) byId('extension-copy-status').textContent = '无法自动复制，请选中上方文字手动复制。';
    }
  });
  byId('wedding-failed-prompt').textContent = record.attempts.find(attempt => attempt.scenario === 'wedding' && attempt.stage === 'edit').arguments.prompt;
  select(record.cases[0], 0);
})();
