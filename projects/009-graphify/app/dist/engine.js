/* Original browser traversal over Graphify's actual extracted edges. */
(function (root) {
  const relations = new Set(['calls','indirect_call','references','imports','imports_from','dynamic_import','re_exports','inherits','extends','implements','uses','mixes_in','embeds','requires']);
  function path(edges, source, target) {
    const queue = [[source]], seen = new Set([source]);
    for (let i=0;i<queue.length;i++) {
      const route=queue[i], end=route[route.length-1];
      if(end===target)return route;
      for(const edge of edges.filter(e=>e.source===end))if(!seen.has(edge.target)){seen.add(edge.target);queue.push([...route,edge.target]);}
    }
    return [];
  }
  function affected(edges, source, depth=4) {
    const queue=[{id:source,depth:0}],seen=new Set([source]),hits=[];
    for(const edge of edges.filter(e=>e.source===source&&['method','contains'].includes(e.relation)))if(!seen.has(edge.target)){seen.add(edge.target);queue.push({id:edge.target,depth:0});}
    for(let i=0;i<queue.length;i++){
      const here=queue[i];if(here.depth>=depth)continue;
      for(const edge of edges.filter(e=>e.target===here.id&&relations.has(e.relation)))if(!seen.has(edge.source)){
        const hit={id:edge.source,depth:here.depth+1,edge};seen.add(hit.id);hits.push(hit);queue.push(hit);
      }
    }
    return hits;
  }
  root.GraphExplorer={path,affected};
  if(typeof module!=='undefined')module.exports=root.GraphExplorer;
})(typeof window!=='undefined'?window:globalThis);
