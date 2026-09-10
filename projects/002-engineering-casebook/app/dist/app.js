(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const data = window.CASEBOOK;
  const core = window.CasebookCore;
  if (!data || !core) { $('case-grid').innerHTML = '<p class="error">案例数据未能加载。请刷新页面，或检查 data.js 与 core.js 是否和页面在同一目录。</p>'; return; }
  const e = core.escapeHTML;
  const state = { query: '', company: '', topic: '', evidence: '', sort: 'recommended', page: 1 };
  let lastOpener = null;
  $('total-stat').textContent = data.articles.length;
  $('company-stat').textContent = data.meta.companies;
  $('review-stat').textContent = data.meta.reviewed;
  for (const company of [...new Set(data.articles.map(a => a.company))]) $('company').add(new Option(company, company));
  for (const [key, topic] of Object.entries(data.topics)) $('topic-select').add(new Option(topic.label, key));
  function renderTopics() {
    const entries = [['', { label: '全部案例' }], ...Object.entries(data.topics)];
    $('topics').innerHTML = entries.map(([key, topic]) => '<button type="button" class="topic-button" data-topic="'+e(key)+'" aria-pressed="'+(state.topic === key)+'"><span>'+e(topic.label)+'</span><span class="count">'+data.articles.filter(a => !key || a.topics.includes(key)).length+'</span></button>').join('');
  }
  function render() {
    const filtered = core.filterArticles(data, state);
    const page = core.paginate(filtered, state.page, 12);
    state.page = page.page;
    $('topic-title').textContent = state.topic ? data.topics[state.topic].label : '全部案例';
    $('result-count').textContent = filtered.length + ' 篇 · 原文总结 ' + filtered.filter(a => a.review).length + ' 篇';
    $('topic-description').textContent = state.topic ? data.topics[state.topic].prompt + ' 下列内容区分原文总结与标题导读。' : '“原文总结”来自已阅读的文章；“标题导读”仅概括上游标题，不推断实现细节。文中指标均为作者当时报告。';
    $('case-grid').innerHTML = page.items.map(a => '<article class="case-card '+a.evidence+'"><button type="button" class="card-button" data-case="'+a.id+'" aria-haspopup="dialog" aria-label="查看 '+e(a.company+'：'+a.guide)+'"><span class="card-meta"><span class="company-name">'+e(a.company)+'</span><span>'+a.year+'</span><span class="card-number">/'+a.id+'</span></span><h3>'+e(a.guide)+'</h3><p class="'+(a.review?'summary':'english-title')+'">'+e(a.review?a.review.summary:a.title)+'</p><span class="tags">'+a.topics.map(t=>'<span class="tag">'+e(data.topics[t].label)+'</span>').join('')+'</span></button><div class="card-bottom"><span class="badge '+a.evidence+'">'+(a.review?'原文总结':'标题导读')+'</span><a href="'+e(a.url)+'" target="_blank" rel="noopener noreferrer" aria-label="阅读 '+e(a.title)+' 原文（新标签页）">阅读原文 ↗</a></div></article>').join('');
    $('empty').hidden = filtered.length > 0;
    const pages = [...new Set([1, state.page - 1, state.page, state.page + 1, page.pageCount])].filter(p => p > 0 && p <= page.pageCount).sort((a,b)=>a-b);
    let previous = 0;
    $('pagination').innerHTML = filtered.length ? '<button type="button" data-page="'+(state.page-1)+'" '+(state.page===1?'disabled':'')+'>上一页</button>'+pages.map(p=>{const gap=previous&&p-previous>1?'<span aria-hidden="true">…</span>':'';previous=p;return gap+'<button type="button" data-page="'+p+'" aria-label="第 '+p+' 页" '+(p===state.page?'aria-current="page"':'')+'>'+p+'</button>';}).join('')+'<button type="button" data-page="'+(state.page+1)+'" '+(state.page===page.pageCount?'disabled':'')+'>下一页</button><span>'+state.page+' / '+page.pageCount+'</span>' : '';
  }
  function reset() { Object.assign(state, { query: '', company: '', topic: '', evidence: '', sort: 'recommended', page: 1 }); $('search').value=''; $('company').value=''; $('evidence').value=''; $('sort').value='recommended'; $('topic-select').value=''; renderTopics(); render(); }
  function section(title, text) { return '<section class="detail-section"><h3>'+title+'</h3><p>'+e(text)+'</p></section>'; }
  function openCase(id, opener) {
    const a = data.articles.find(a => a.id === id);
    if (!a) return;
    lastOpener = opener;
    $('detail-number').textContent = a.id;
    const r = a.review;
    let html = '<div class="detail-content"><div class="card-meta"><span class="company-name">'+e(a.company)+'</span><span>'+a.year+'</span><span class="badge '+a.evidence+'">'+(r?'原文总结':'标题导读')+'</span></div><h2 id="detail-title">'+e(a.guide)+'</h2><p class="english-title">'+e(a.title)+'</p><p class="detail-deck">'+e(r?r.summary:'本篇围绕“'+a.guide+'”展开，归入'+a.topics.map(t=>data.topics[t].label).join('、')+'主题。')+'</p>';
    if (r) html += section('01 / 面临的问题',r.problem)+'<section class="detail-section"><h3>02 / 关键做法</h3><ol>'+r.approach.map(x=>'<li>'+e(x)+'</li>').join('')+'</ol></section>'+section('03 / 原文报告',r.result)+section('04 / 代价与适用边界',r.tradeoff)+section('05 / 对我们的启示',r.takeaway)+'<p class="basis-note">内容依据：已阅读原文。相关章节：'+e(r.sourceSection)+'。研究总结未复现其生产结果。</p>';
    else html += '<p class="basis-note">本条是基于上游标题和主题的中文导读，尚未完成原文精读。具体方案、性能数字和适用条件请以原文为准。</p>'+section('阅读时值得追问',data.topics[a.topics[0]].prompt)+section('建议记录','读完后记录业务背景、关键约束、方案与替代选择、结果的测试条件，以及对自己项目的适用性。');
    html += '<div class="detail-source"><a href="'+e(a.url)+'" target="_blank" rel="noopener noreferrer">阅读 '+e(a.company)+' 原文 ↗</a><span>'+(r?'原文核对 '+r.checkedAt:'索引快照 '+data.meta.snapshotDate)+' · 上游序号 '+a.sourceNumber+'</span></div></div>';
    $('detail-body').innerHTML = html;
    $('case-dialog').showModal();
    $('case-dialog').scrollTop=0;
    $('close-dialog').focus();
  }
  $('search').addEventListener('input', event => {state.query=event.target.value;state.page=1;render();});
  for (const key of ['company','evidence','sort']) $(key).addEventListener('change',event=>{state[key]=event.target.value;state.page=1;render();});
  function setTopic(topic){state.topic=topic;state.page=1;$('topic-select').value=topic;renderTopics();render();}
  $('topics').addEventListener('click',event=>{const button=event.target.closest('[data-topic]');if(button)setTopic(button.dataset.topic);});
  $('topic-select').addEventListener('change',event=>setTopic(event.target.value));
  $('case-grid').addEventListener('click',event=>{const button=event.target.closest('[data-case]');if(button)openCase(button.dataset.case,button);});
  $('pagination').addEventListener('click',event=>{const button=event.target.closest('[data-page]');if(!button||button.disabled)return;state.page=Number(button.dataset.page);render();$('topic-title').setAttribute('tabindex','-1');$('topic-title').focus({preventScroll:true});$('topic-title').scrollIntoView({block:'start'});});
  $('reset').addEventListener('click',reset);$('empty-reset').addEventListener('click',reset);
  $('close-dialog').addEventListener('click',()=>$('case-dialog').close());
  $('case-dialog').addEventListener('click',event=>{if(event.target===$('case-dialog')){const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.target.close();}});
  $('case-dialog').addEventListener('close',()=>{if(lastOpener?.isConnected)lastOpener.focus({preventScroll:true});});
  renderTopics();render();
})();
