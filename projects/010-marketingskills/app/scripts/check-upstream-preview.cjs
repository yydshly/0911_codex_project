const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const project = path.resolve(__dirname,'../..');
const source = fs.readFileSync(path.join(project,'sources/upstream-ga4.js'));
const evidence = JSON.parse(fs.readFileSync(path.join(project,'sources/evidence.json'),'utf8'));
assert.equal(crypto.createHash('sha256').update(source).digest('hex'),evidence.clis.find(c=>c.name==='ga4').sha256);
async function run(args) {
  let requests = 0; const logs=[];
  const context = {
    process:{env:{GA4_ACCESS_TOKEN:'research-placeholder'},argv:['node','ga4.js',...args],exit:code=>{throw new Error(`unexpected exit ${code}`);}},
    console:{log:entry=>logs.push(entry),error:entry=>{throw new Error(entry);}},
    URLSearchParams, fetch:()=>{requests++;throw new Error('Network disabled in offline preview test');}
  };
  await vm.runInNewContext(source.toString('utf8'),context,{timeout:1000});
  assert.equal(requests,0,'预览不得进行网络请求');
  assert.equal(logs.length,1);
  assert.ok(!logs[0].includes('research-placeholder')&&!logs[0].includes('dummy-api-secret'),'预览遮盖认证字段');
  const result=JSON.parse(logs[0]); assert.equal(result._dry_run,true); return result;
}
(async()=>{
  const report=await run(['reports','run','--property','123','--dimensions','date','--metrics','activeUsers','--dry-run']);
  assert.equal(report.method,'POST'); assert.equal(report.url,'https://analyticsdata.googleapis.com/v1beta/properties/123:runReport');
  assert.deepEqual(report.body.metrics,[{name:'activeUsers'}]); assert.equal(report.headers.Authorization,'***');
  const conversion=await run(['conversions','create','--property','123','--event-name','signup_complete','--dry-run']);
  assert.equal(conversion.url,'https://analyticsadmin.googleapis.com/v1beta/properties/123/conversionEvents');
  assert.equal(conversion.body.eventName,'signup_complete');
  const event=await run(['events','send','--measurement-id','G-EXAMPLE','--api-secret','dummy-api-secret','--client-id','sample-client','--event-name','demo_open','--dry-run']);
  assert.equal(new URL(event.url).searchParams.get('api_secret'),'***');
  assert.equal(event.body.events[0].name,'demo_open');
  console.log('通过：固定上游 GA4 脚本的报表、转化创建、事件发送预览；3 个路径均无网络请求并遮盖认证字段。未测试真实 API。');
})().catch(error=>{console.error(error);process.exitCode=1;});
