(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CasebookCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function filterArticles(data, state) {
    const terms = (state.query || '').normalize('NFKC').trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return data.articles.filter(a => {
      if (state.company && a.company !== state.company) return false;
      if (state.topic && !a.topics.includes(state.topic)) return false;
      if (state.evidence && a.evidence !== state.evidence) return false;
      const text = [a.title, a.guide, a.company, a.year, ...a.topics, ...a.topics.map(t => data.topics[t].label), a.review ? JSON.stringify(a.review) : ''].join(' ').normalize('NFKC').toLocaleLowerCase();
      return terms.every(term => text.includes(term));
    }).sort((a, b) => {
      if (state.sort === 'newest') return b.year - a.year || a.order - b.order;
      if (state.sort === 'oldest') return a.year - b.year || a.order - b.order;
      if (state.sort === 'source') return a.order - b.order;
      return Number(Boolean(b.review)) - Number(Boolean(a.review)) || a.order - b.order;
    });
  }
  function paginate(items, requestedPage, size) {
    const pageCount = Math.max(1, Math.ceil(items.length / size));
    const page = Math.max(1, Math.min(pageCount, Number(requestedPage) || 1));
    return { items: items.slice((page - 1) * size, page * size), page, pageCount, total: items.length };
  }
  function escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  return { filterArticles, paginate, escapeHTML };
});
