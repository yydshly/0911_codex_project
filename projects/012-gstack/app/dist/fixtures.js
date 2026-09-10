(function(root){
  const entry = {name:'gstack', researchIndex:'011', directory:'012-gstack', upstream:'https://github.com/garrytan/gstack', demoStatus:'local', imageKind:'diagram'};
  const fixtures = [
    {id:'clean',label:'合规收录',description:'研究索引 011 与目录 012 独立维护，允许不相等。',data:[entry]},
    {id:'duplicate',label:'同库不同写法',description:'大小写、.git、查询参数和尾部斜杠不同，仍是同一原库。',data:[entry,{...entry,name:'配套展示',researchIndex:'012',directory:'013-gstack-demo',upstream:'https://GitHub.com/GarryTan/GSTACK.git/?tab=readme-ov-file'}]},
    {id:'companion',label:'研究 + 配套演示',description:'同一原库使用同一研究索引、不同历史目录，原库只计一次。',data:[entry,{...entry,name:'配套展示',directory:'013-gstack-demo'}]},
    {id:'unproven',label:'缺证据的发布声明',description:'没有演示地址和核验记录，却把状态标成已发布。',data:[{...entry,demoStatus:'published',imageKind:'screenshot'}]},
    {id:'conflict',label:'索引与路径错误',description:'两个原库占用同一索引，且第二项目录包含路径跳转。',data:[entry,{...entry,name:'另一原库',upstream:'https://github.com/AMAP-ML/LongHorizon-Harness',directory:'../other'}]}
  ];
  if(typeof module!=='undefined'&&module.exports)module.exports=fixtures;else root.LAB_FIXTURES=fixtures;
})(typeof window!=='undefined'?window:globalThis);
