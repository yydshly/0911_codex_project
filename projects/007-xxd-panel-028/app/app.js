(function () {
  'use strict';
  const modesAllowed = ['top-bottom', 'left-right', 'design-only', 'wallpaper-pack'];
  const sizesAllowed = ['1:1', '3:4', '9:16', '16:9'];
  function planDelivery({ modes, sizes, count, text, locale, wallpaper }) {
    const uniqueModes = [...new Set(modes)];
    const uniqueSizes = [...new Set(sizes)];
    if (!uniqueModes.length || uniqueModes.some(m => !modesAllowed.includes(m))) throw new Error('请至少选择一种有效的成品类型。');
    if (!Number.isInteger(count) || count < 1 || count > 1000) throw new Error('原图数量需为 1–1000 的整数。');
    const ordinary = uniqueModes.filter(m => m !== 'wallpaper-pack').length;
    const pack = uniqueModes.includes('wallpaper-pack');
    if (ordinary && (!uniqueSizes.length || uniqueSizes.some(s => !sizesAllowed.includes(s)))) throw new Error('请为普通成品至少选择一种比例。');
    if (!['none', 'prompt', 'exact'].includes(text)) throw new Error('请选择有效的文字方式。');
    if (text !== 'none' && !['zh-CN', 'en-GB', 'ja-JP', 'ko-KR', 'ar-SA'].includes(locale)) throw new Error('请选择画面文字语言。');
    if (pack && !['linked', 'independent'].includes(wallpaper)) throw new Error('请选择壁纸之间的关系。');
    const ordinaryOutputs = ordinary * uniqueSizes.length;
    const perSource = ordinaryOutputs + (pack ? 4 : 0);
    let command = '/xxd-panel-028 ' + (count === 1 ? 'photo.jpg' : '"./photos"') + ' --mode ' + uniqueModes.join(',');
    if (ordinary) command += ' --size ' + uniqueSizes.join(',');
    command += ' --text ' + text;
    if (text !== 'none') command += ' --locale ' + locale;
    if (text === 'exact') command += ' --copy "你的准确文案"';
    if (pack) command += ' --wallpaper ' + wallpaper;
    return { total: count * perSource, perSource, ordinaryOutputs, command,
      breakdown: count + ' 张原图 ×（' + (ordinary ? ordinary + ' 种普通模式 × ' + uniqueSizes.length + ' 种比例' : '0 张普通成品') + (pack ? ' + 4 张壁纸' : '') + '）' };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { planDelivery };
  if (typeof document === 'undefined') return;
  const form = document.querySelector('#plan-form');
  const command = document.querySelector('#command');
  const copy = document.querySelector('#copy-command');
  function update() {
    const modes = [...form.querySelectorAll('[name=mode]:checked')].map(el => el.value);
    const text = document.querySelector('#text-mode').value;
    document.querySelector('#wallpaper-field').hidden = !modes.includes('wallpaper-pack');
    document.querySelector('#locale-field').hidden = text === 'none';
    document.querySelector('#exact-note').hidden = text !== 'exact';
    document.querySelector('#size-field').disabled = !modes.some(m => m !== 'wallpaper-pack');
    document.querySelector('#copy-state').textContent = '';
    try {
      const result = planDelivery({ modes, sizes: [...form.querySelectorAll('[name=size]:checked')].map(el => el.value), count: Number(document.querySelector('#source-count').value), text, locale: document.querySelector('#locale').value, wallpaper: document.querySelector('#wallpaper').value });
      document.querySelector('#total').textContent = result.total;
      document.querySelector('#breakdown').textContent = result.breakdown;
      document.querySelector('#plan-error').textContent = '';
      command.value = result.command;
      copy.disabled = false;
    } catch (error) {
      document.querySelector('#total').textContent = '—';
      document.querySelector('#breakdown').textContent = '补全设置后显示交付计划';
      document.querySelector('#plan-error').textContent = error.message;
      command.value = '';
      copy.disabled = true;
    }
  }
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', event => event.preventDefault());
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(command.value); document.querySelector('#copy-state').textContent = '已复制'; }
    catch { command.focus(); command.select(); document.querySelector('#copy-state').textContent = '已选中，请手动复制'; }
  });
  document.querySelectorAll('[data-layout]').forEach(button => button.addEventListener('click', () => {
    const portrait = button.dataset.layout === 'portrait';
    const source = 'assets/' + (portrait ? 'sample-09.png' : 'sample-05.png');
    const img = document.querySelector('#hero-image');
    img.src = source;
    img.width = 1536; img.height = portrait ? 2048 : 864;
    img.alt = portrait ? '上游竖版样张：上方山湖摄影画面，下方纸上微缩景观，同一输入的独立重构' : '上游横版样张：左侧山湖摄影画面，右侧纸上微缩景观';
    const full = document.querySelector('#hero-full'); full.href = source;
    full.setAttribute('aria-label', portrait ? '打开山湖竖版上游样张原图' : '打开山湖横版上游样张原图');
    document.querySelector('.hero-art').classList.toggle('portrait', portrait);
    document.querySelector('#hero-caption').textContent = portrait ? '上游样张 09 · 山湖 / 上下双联 / 3:4' : '上游样张 05 · 山湖 / 左右双联 / 16:9';
    document.querySelectorAll('[data-layout]').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
  }));
  update();
})();
