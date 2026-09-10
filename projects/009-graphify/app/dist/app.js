(function(){
  'use strict';
  const D=window.GRAPHIFY_DATA,E=window.GraphExplorer,$=id=>document.getElementById(id);
  const nodes=new Map(D.nodes.map(n=>[n.id,n]));
  const order=['api.py','orders.py','auth.py','pricing.py','catalog.py'];
  const names={'api.py':'接口入口','orders.py':'订单编排','auth.py':'身份权限','pricing.py':'价格计算','catalog.py':'商品库存'};
  const colors=['#e3ecf4','#dcecbc','#efead8','#e6def1','#d6ece4'];
  const descriptions={checkout:'订单入口，将请求交给订单处理。',preview_price:'预览价格前检查用户身份，再计算金额。',create_order:'串联用户校验、价格计算、库存预留和订单保存。',save_order:'将订单写入教学用内存列表。',require_member:'检查示例身份，未通过则拒绝访问。',resolve_user:'教学用身份解析，只有 demo 被识别。',calculate_total:'读取商品价格，计算会员折扣后的金额。',member_discount:'应用教学示例中的九折规则。',get_product:'读取商品信息，是计价和库存检查的共同依赖。',check_stock:'检查商品库存是否足够。',reserve_stock:'检查库存后扣减库存。此示例没有事务与并发保护。'};
  let state={mode:'explore',selected:'orders_create_order',target:'catalog_get_product',scope:'calls',search:''};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const label=id=>nodes.get(id)?.label||id;
  const bare=n=>n.label.replace(/\(\)$/,'');
  function available(){return D.nodes.filter(n=>state.scope==='all'||n._callable);}
  function getEdges(){return D.edges.filter(e=>state.scope==='all'||e.relation==='calls');}
  function options(){for(const id of ['start','target']){$(id).innerHTML=available().map(n=>`<option value="${esc(n.id)}">${esc(n.label.length>40?n.label.slice(0,38)+'…':n.label)}</option>`).join('');}if(!available().some(n=>n.id===state.selected))state.selected='orders_create_order';if(!available().some(n=>n.id===state.target))state.target='catalog_get_product';$('start').value=state.selected;$('target').value=state.target;}
  function render(){
    options();$('target-wrap').hidden=state.mode!=='path';
    document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===state.mode)));
    const ns=available(),edges=getEdges(),selected=nodes.get(state.selected);
    const route=state.mode==='path'?E.path(edges,state.selected,state.target):[];
    const hits=state.mode==='affected'?E.affected(edges,state.selected):[];
    const focus=new Set([state.selected]);
    if(state.mode==='path')route.forEach(n=>focus.add(n));
    else if(state.mode==='affected')hits.forEach(n=>focus.add(n.id));
    else edges.filter(e=>e.source===state.selected||e.target===state.selected).forEach(e=>{focus.add(e.source);focus.add(e.target);});
    const match=new Set(ns.filter(n=>`${n.label} ${n.source_file} ${names[n.source_file]} ${descriptions[bare(n)]||''}`.toLowerCase().includes(state.search.toLowerCase())).map(n=>n.id));
    const positions=new Map();
    let svg='<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="none" stroke="#618977" stroke-width="1.3"/></marker></defs>';
    order.forEach((file,i)=>{const x=24+i*216,group=ns.filter(n=>n.source_file===file);svg+=`<rect x="${x}" y="24" width="188" height="416" rx="13" fill="${colors[i]}" fill-opacity=".23" stroke="#dbe4d8"/><text x="${x+14}" y="50" class="lane-label">${file}</text><text x="${x+14}" y="71" class="lane-sub">${names[file]}</text>`;group.forEach((n,j)=>positions.set(n.id,{x:x+94,y:117+j*(group.length>1?270/(group.length-1):0),i}));});
    edges.forEach(e=>{const a=positions.get(e.source),b=positions.get(e.target);if(!a||!b)return;let active=state.mode==='path'?route.some((n,i)=>n===e.source&&route[i+1]===e.target):state.mode==='affected'?hits.some(h=>h.edge.source===e.source&&h.edge.target===e.target):e.source===state.selected||e.target===state.selected;const same=a.i===b.i;const sx=same?a.x+72:a.x+(b.x>a.x?76:-76),tx=same?b.x+72:b.x+(b.x>a.x?-80:80);const delta=same?50:Math.max(25,Math.abs(tx-sx)*.45)*(b.x>a.x?1:-1);const d=`M${sx},${a.y} C${sx+delta},${a.y} ${same?tx+delta:tx-delta},${b.y} ${tx},${b.y}`;svg+=`<path d="${d}" class="edge ${active?'active':'dim'}" marker-end="url(#arrow)"><title>${esc(label(e.source)+' → '+label(e.target)+' · '+e.relation+' · '+e.confidence)}</title></path>`;});
    ns.forEach(n=>{const p=positions.get(n.id);if(!p)return;const isSelected=n.id===state.selected,dim=state.search?!match.has(n.id):!focus.has(n.id);const title=n.file_type==='rationale'?'设计说明':n.label;svg+=`<g role="button" tabindex="0" aria-label="查看 ${esc(n.label)}" data-node="${esc(n.id)}" class="svg-node ${dim?'dim':''}" transform="translate(${p.x},${p.y})"><rect x="-79" y="-22" width="158" height="44" rx="9" fill="${isSelected?'#244f40':colors[p.i]}" stroke="${isSelected?'#244f40':'#b9ccbc'}" stroke-width="${isSelected?2:1}"/><text text-anchor="middle" y="-1" font-family="Consolas,monospace" font-size="11" fill="${isSelected?'#f3f8eb':'#2a4d3e'}">${esc(title)}</text><text text-anchor="middle" y="13" font-size="9" fill="${isSelected?'#b8d0bb':'#6c8374'}">${esc(n.source_location)} · ${n._callable?'函数':n.file_type==='rationale'?'说明':'模块'}</text><title>${esc(n.label)}</title></g>`;});
    $('graph').innerHTML=svg;
    $('visible-count').textContent=state.search?`匹配 ${match.size} / ${ns.length} 个节点`:`当前 ${ns.length} 个节点 · ${edges.length} 条关系`;
    $('node-title').textContent=selected.label;$('node-meta').textContent=`${selected.source_file} · ${selected.source_location} · 社区 ${selected.community}`;
    $('node-desc').textContent=descriptions[bare(selected)]||(selected.file_type==='rationale'?'从源码注释抽取的说明节点。':'文件级节点，记录文件包含和导入的实体。');
    const related=edges.filter(e=>e.source===state.selected||e.target===state.selected);
    $('connections').innerHTML='<p class="connection-head">'+related.length+' 条直接关系 · 点击继续探索</p>'+related.map(e=>{const outgoing=e.source===state.selected,id=outgoing?e.target:e.source;return `<button class="connection" data-node="${esc(id)}">${outgoing?'→':'←'} <strong>${esc(label(id))}</strong><small>${esc(e.relation)} · ${esc(e.confidence)} · ${esc(e.source_file||'')} ${esc(e.source_location||'')}</small></button>`;}).join('');
    let title,text;
    if(state.mode==='path'){title=route.length?route.map(label).join(' → '):'当前范围内没有找到有向路径';text=route.length?`${route.length-1} 跳。沿图中存储的关系方向查找最短路径；它不是运行时调用记录。`:'可调整起点、终点或关系范围。静态图中的无路径结果，不代表运行时一定没有关系。';}
    else if(state.mode==='affected'){title=`${selected.label} 的 ${hits.length} 个潜在依赖方`;text=hits.length?hits.map(h=>`${label(h.id)}（${h.depth} 跳）`).join('、')+'。最多反向查找 4 跳，结果用于确定检查范围。':'当前关系范围与 4 跳深度内没有找到依赖方。';}
    else {title=`${selected.label} · ${related.length} 条直接关系`;text='高亮关联节点；点击节点或右侧关系列表继续追踪，展开源文件核对代码。';}
    if(state.search&&!match.size){title='没有匹配的符号';text='尝试函数名、文件名或“库存”“权限”“价格”等中文导览词；可用重置按钮恢复。';}
    $('result-label').textContent={explore:'关系探索',path:'有向路径',affected:'修改影响'}[state.mode];$('result-title').textContent=title;$('result-text').textContent=text;
    $('source-name').textContent=selected.source_file;const line=Number((selected.source_location||'').replace(/^L/,''));
    $('source-code').innerHTML=(D.files[selected.source_file]||'无本地源文件').split('\n').map((t,i)=>`<span class="code-line ${i+1===line?'active':''}"><span class="line-no">${i+1}</span>${esc(t)}</span>`).join('');
  }
  $('stats').innerHTML=`<div><strong>${Object.keys(D.files).length}</strong><span>源文件</span></div><div><strong>${D.nodes.length}</strong><span>真实节点</span></div><div><strong>${D.edges.length}</strong><span>提取关系</span></div>`;
  for(const key of ['query','path','affected'])$(key+'-evidence').textContent=D.evidence[key];
  document.addEventListener('click',event=>{const mode=event.target.closest('[data-mode]'),node=event.target.closest('[data-node]'),example=event.target.closest('[data-example]');if(mode){state.mode=mode.dataset.mode;render();}if(node){state.selected=node.dataset.node;render();}if(example){const name=example.dataset.example;state={mode:name==='order'?'explore':name==='route'?'path':'affected',selected:name==='order'?'orders_create_order':name==='route'?'api_checkout':'catalog_get_product',target:'catalog_get_product',scope:'calls',search:''};$('scope').value='calls';$('search').value='';render();}});
  $('graph').addEventListener('keydown',event=>{if(['Enter',' '].includes(event.key)&&event.target.dataset.node){event.preventDefault();state.selected=event.target.dataset.node;render();$('start').focus();}});
  $('start').addEventListener('change',e=>{state.selected=e.target.value;render();});$('target').addEventListener('change',e=>{state.target=e.target.value;render();});$('scope').addEventListener('change',e=>{state.scope=e.target.value;render();});$('search').addEventListener('input',e=>{state.search=e.target.value.trim();render();});$('reset').addEventListener('click',()=>{state={mode:'explore',selected:'orders_create_order',target:'catalog_get_product',scope:'calls',search:''};$('scope').value='calls';$('search').value='';render();});
  render();
})();
