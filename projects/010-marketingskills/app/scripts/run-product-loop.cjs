const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const base = path.resolve(process.argv[2] || path.join(__dirname, '../../runs/product-positioning'));
const dir = path.join(base, '.agents/loops');
const source = fs.readFileSync(path.join(base, 'feedback.json'), 'utf8');
const input = JSON.parse(source);
if (typeof input.enabled !== 'boolean' || !Array.isArray(input.records)) throw Error('需要 enabled 和 records');
const ids = new Set();
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
for (const r of input.records) {
  if (!r || typeof r.id !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(r.id) || ['__proto__','constructor','prototype'].includes(r.id) || ids.has(r.id) || !['completed','blocked','abandoned'].includes(r.result) || typeof r.evidence !== 'string' || !r.evidence.trim() || r.evidence.length > 10000) throw Error('反馈格式错误或 ID 重复');
  ids.add(r.id);
}
fs.mkdirSync(dir, {recursive:true});
const stateFile = path.join(dir, 'product-validation.json');
const state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, 'utf8')) : null;
const hashes = Object.fromEntries(input.records.map(r => [r.id, digest(JSON.stringify(r))]));
if (state) for (const r of input.records) if (state.handled[r.id] && state.handled[r.id] !== hashes[r.id]) throw Error('已处理反馈内容发生变化；请使用新 ID 并说明修订关系');
const fresh = state ? input.records.filter(r => !state.handled[r.id]) : [];
const status = !input.enabled ? 'stopped' : !state ? 'baseline' : !fresh.length ? 'no_new_feedback' : 'drafted';
const next = state || {handled:{},runs:0};
if (input.enabled) {
  const processed = state ? fresh : input.records;
  for (const r of processed) next.handled[r.id] = hashes[r.id];
  if (fresh.length || !state) {
    const action = {completed:'先人工核验完成证据，再询问是否存在第二个同类任务。',blocked:'收集最小失败材料，区分引导、环境与能力问题；先修阻碍。',abandoned:'了解放弃原因与实际替代方案，重新核对任务价值。'};
    const lines = fresh.map(r => `- ${r.id}（用户自报 ${r.result}）：${action[r.result]}`);
    fs.writeFileSync(path.join(base,'next-actions.md'), '# 下一步建议\n\n状态：待负责人审阅。规则生成，无模型调用。\n\n' + (lines.join('\n') || '本次只建立基线；暂无新增反馈，不能判断外部需求。建议先用自己的真实任务完成一次核验。') + '\n');
  }
}
next.runs++; next.last_run = new Date().toISOString(); next.input_sha256 = digest(source); next.status = status;
fs.writeFileSync(stateFile, JSON.stringify(next,null,2)+'\n');
const receipt = {at:next.last_run,status,checked:input.records.length,acted:status==='drafted'?fresh.length:0};
fs.appendFileSync(path.join(dir,'product-validation.log'), JSON.stringify(receipt)+'\n');
console.log(JSON.stringify(receipt));
