(() => {
  const data = JSON.parse(document.getElementById('extension-data').textContent);
  function selectStyle(id) {
    const r = data.find(j => j.id === id);
    document.getElementById('style-output').src = r.image;
    document.getElementById('style-output').alt = r.label + '实际生成结果';
    document.getElementById('style-title').textContent = r.label;
    document.getElementById('style-origin').textContent = r.origin === 'upstream-baseline' ? '原库风格 · 本轮新生成' : '本地扩展风格 · 本轮新生成';
    document.getElementById('style-review').textContent = r.review.observation;
    document.getElementById('style-limit').textContent = r.review.limit;
    document.getElementById('style-file').href = r.image;
    document.getElementById('style-prompt').href = r.promptUrl;
    document.querySelectorAll('[data-style]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.style === id)));
  }
  document.querySelectorAll('[data-style]').forEach(b => b.addEventListener('click', () => selectStyle(b.dataset.style)));
  document.querySelectorAll('[data-layout]').forEach(b => b.addEventListener('click', () => {
    document.getElementById('product-preview').dataset.layout = b.dataset.layout;
    document.querySelectorAll('[data-layout]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }));
  document.getElementById('product-title-input').addEventListener('input', e => {
    document.getElementById('product-title').textContent = e.target.value;
  });
  document.getElementById('print-product').addEventListener('click', () => window.print());
})();
