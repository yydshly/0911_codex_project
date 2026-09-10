(() => {
  'use strict';
  const data = window.MARKETING_CONTENT;
  const inventory = window.MARKETING_INVENTORY;
  const catalog = window.MARKETING_CATALOG;
  const evidence = window.MARKETING_EVIDENCE;
  const skillButtons = [];
  const base = `https://github.com/coreyhaines31/marketingskills/blob/${inventory.commit}/skills/`;
  const element = (tag, value, cls) => {
    const node = document.createElement(tag);
    if (value !== undefined) node.textContent = value;
    if (cls) node.className = cls;
    return node;
  };
  const skillLink = (name, label = name) => {
    const link = element('a', label); link.href = `${base}${name}/SKILL.md`; return link;
  };
  const groups = document.querySelector('#skill-groups');
  function renderSkill(name, focus = false) {
    const card = catalog[name];
    const title = data.groups.find(g => g.skills[name]).skills[name];
    const meta = inventory.skills.find(s => s.name === name);
    const source = evidence.skills.find(s => s.name === name);
    const panel = document.querySelector('#skill-detail');
    const header = element('div', undefined, 'skill-detail-header');
    const heading = element('div');
    heading.append(element('p', '所选技能 / ' + name, 'eyebrow'), element('h3', title));
    header.append(heading, skillLink(name, `v${meta.version} · 固定源码 ↗`));
    const fields = element('dl', undefined, 'skill-fields');
    for (const [label, key] of [['何时使用', 'when'], ['准备什么', 'input'], ['主要方法', 'method'], ['典型产物', 'output'], ['本地验收提示', 'check']]) {
      const field = element('div'); field.append(element('dt', label), element('dd', card[key])); fields.append(field);
    }
    const related = element('div', undefined, 'related-skills');
    related.append(element('span', '通常可协作（本地建议）：'));
    card.related.forEach(id => { const button = element('button', id); button.type = 'button'; button.addEventListener('click', () => renderSkill(id, true)); related.append(button); });
    const references = element('details', undefined, 'skill-evidence');
    references.append(element('summary', '源码证据与参考资料入口'));
    const sources = element('ul');
    source.headings.slice(0, 5).forEach(h => { const li = element('li'); const link = skillLink(name, `${h.title} · L${h.line}`); link.href += `#L${h.line}`; li.append(link); sources.append(li); });
    source.references.forEach(reference => { const li = element('li'); const link = element('a', reference); link.href = `${base}${name}/${reference}`; li.append(link); sources.append(li); });
    references.append(element('p', '节标题与行号由固定源码提取。中文输入、方法、产物为阅读归纳；验收和协作是本地实践建议。', 'source-note'), sources);
    panel.replaceChildren(header, fields, related, references);
    skillButtons.forEach(({ id, button }) => button.setAttribute('aria-pressed', String(id === name)));
    if (focus) { panel.scrollIntoView?.({ block: 'start', behavior: 'auto' }); panel.focus?.({ preventScroll: true }); }
  }
  data.groups.forEach((group, i) => {
    const details = element('details', undefined, 'skill-group');
    const summary = element('summary');
    const top = element('div', undefined, 'group-top');
    top.append(element('span', `0${i + 1}`), element('span', `${Object.keys(group.skills).length} 个技能`));
    summary.append(top, element('h3', group.title), element('p', group.goal));
    const list = element('ul', undefined, 'skill-list');
    Object.entries(group.skills).forEach(([id, label]) => {
      const li = element('li');
      const button = element('button', label, 'skill-open'); button.type = 'button'; button.setAttribute('aria-controls', 'skill-detail');
      button.addEventListener('click', () => renderSkill(id, true)); skillButtons.push({ id, button });
      li.append(button, element('code', `${id} · ${inventory.skills.find(s => s.name === id).version}`));
      list.append(li);
    });
    details.append(summary, list); groups.append(details);
  });
  renderSkill('product-marketing');
  let scenarioIndex = 0;
  let stepIndex = 0;
  const select = document.querySelector('#scenario');
  data.scenarios.forEach((scenario, i) => { const option = element('option', scenario.label); option.value = String(i); select.append(option); });
  const previous = document.querySelector('#previous');
  const next = document.querySelector('#next');
  function renderStep() {
    const scenario = data.scenarios[scenarioIndex];
    const step = scenario.steps[stepIndex];
    document.querySelectorAll('#step-buttons button').forEach((button, i) => {
      if (i === stepIndex) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current');
    });
    const meta = element('div', undefined, 'step-meta');
    meta.append(element('span', `执行者：${step.actor}`), skillLink(step.skill));
    const content = element('div', undefined, 'step-content');
    const action = element('div');
    action.append(element('h4', '这一阶段做什么'), element('p', step.action), element('p', `读取 / 产物位置：${step.file}`, 'file'));
    const output = element('div');
    output.append(element('h4', '示例产物 · 非实际运行结果'), element('pre', step.result, 'example-output'));
    content.append(action, output);
    const panel = document.querySelector('#step-panel');
    panel.replaceChildren(element('h3', `${String(stepIndex + 1).padStart(2, '0')} / ${step.name}`), meta, content, element('p', `能力边界：${step.boundary}`, 'step-boundary'));
    document.querySelector('#step-progress').textContent = `第 ${stepIndex + 1} 步 / 共 ${scenario.steps.length} 步`;
    previous.disabled = stepIndex === 0;
    next.disabled = stepIndex === scenario.steps.length - 1;
  }
  function renderScenario() {
    const scenario = data.scenarios[scenarioIndex];
    document.querySelector('#scenario-brief').textContent = scenario.brief;
    document.querySelector('#scenario-input').textContent = scenario.input;
    const buttons = scenario.steps.map((step, i) => {
      const button = element('button'); button.type = 'button';
      button.append(element('span', String(i + 1).padStart(2, '0')), document.createTextNode(step.name));
      button.addEventListener('click', () => { stepIndex = i; renderStep(); });
      return button;
    });
    document.querySelector('#step-buttons').replaceChildren(...buttons);
    renderStep();
  }
  select.addEventListener('change', () => { scenarioIndex = Number(select.value); stepIndex = 0; renderScenario(); });
  previous.addEventListener('click', () => { if (stepIndex > 0) { stepIndex--; renderStep(); } });
  next.addEventListener('click', () => { if (stepIndex < data.scenarios[scenarioIndex].steps.length - 1) { stepIndex++; renderStep(); } });
  renderScenario();
  const sourceBase = `https://github.com/coreyhaines31/marketingskills/blob/${inventory.commit}/`;
  const sourceLink = (file, label) => { const link = element('a', label); link.href = sourceBase + file; return link; };
  function table(container, caption, headers, rows) {
    const node = element('table'); node.append(element('caption', caption));
    const head = element('thead'); const header = element('tr');
    headers.forEach(label => { const th = element('th', label); th.setAttribute('scope', 'col'); header.append(th); }); head.append(header);
    const body = element('tbody');
    rows.forEach(row => { const tr = element('tr'); row.forEach(value => { const td = element('td'); if (typeof value === 'string') td.textContent = value; else td.append(value); tr.append(td); }); body.append(tr); });
    node.append(head, body); document.querySelector(container).replaceChildren(node);
  }
  table('#tool-guide-table', '固定版本的 95 份工具指南', ['指南', '上游类别', '上游登记的接入方式', '本库脚本链接'], evidence.guides.map(tool => {
    const r = tool.registry;
    return [sourceLink(tool.source, `${r?.partner ? '◆ ' : ''}${tool.name}`), r?.category || '未登记', ['api', 'mcp', 'cli', 'sdk'].filter(key => r?.[key]).map(key => key.toUpperCase()).join(' / ') || '无标记', r?.bundledCli ? sourceLink('tools/' + r.bundledCli, '查看文件 ↗') : '无本库文件链接'];
  }));
  table('#tool-cli-table', '固定版本的 64 个本库脚本', ['脚本', '读取的环境变量', '检测到预览分支'], evidence.clis.map(cli => [sourceLink(cli.source, cli.name), element('code', cli.environmentVariables.join(' / ') || '未提取到'), cli.hasDryRunBranch ? '有（静态检测）' : '未检测到']));
})();
