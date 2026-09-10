'use strict';
(() => {
  const record = window.PORTRAIT_EXPERIMENTS;
  const byId = id => document.getElementById(id);
  const asset = name => 'assets/experiments/' + name;
  const buttons = [];
  let selected;
  const source = record.source;
  byId('run-source').src = asset(source.file);
  byId('run-source').width = source.width;
  byId('run-source').height = source.height;
  byId('run-source-link').href = asset(source.file);
  byId('run-source-link').setAttribute('aria-label', '查看输入原图完整文件');
  byId('source-prompt').textContent = source.prompt;
  function select(run, index) {
    selected = run;
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(index === i)));
    byId('run-title').textContent = run.title;
    byId('run-verdict').textContent = run.verdict;
    byId('run-output').src = asset(run.file);
    byId('run-output').width = run.width;
    byId('run-output').height = run.height;
    byId('run-output').alt = run.title + '：实际模型输出';
    byId('run-output-link').href = asset(run.file);
    byId('run-output-link').setAttribute('aria-label', '查看' + run.title + '输出完整文件');
    byId('run-output-label').textContent = run.label + ' · 实际输出';
    byId('run-output-meta').textContent = run.width + ' × ' + run.height;
    for (const field of ['goal', 'observation', 'limitations', 'prompt']) byId('run-' + field).textContent = run[field];
    byId('run-meta').textContent = '实际调用日期：' + record.date + ' · 内置 ImageGen · 单次编辑，未筛选多个候选。工具未提供可验证的底层模型版本或费用。';
    byId('run-copy-status').textContent = '';
  }
  record.runs.forEach((run, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.textContent = run.label;
    button.setAttribute('aria-controls', 'run-title');
    button.addEventListener('click', () => select(run, index));
    buttons.push(button); byId('experiment-controls').append(button);
  });
  byId('copy-run').addEventListener('click', async () => {
    const run = selected;
    try {
      await navigator.clipboard.writeText(run.prompt);
      if (run === selected) byId('run-copy-status').textContent = '已复制本次实际提示词。';
    } catch {
      if (run === selected) byId('run-copy-status').textContent = '无法自动复制，请选中提示词手动复制。';
    }
  });
  const initial = Math.max(0, record.runs.findIndex(run => run.id === record.defaultRun));
  select(record.runs[initial], initial);
})();
