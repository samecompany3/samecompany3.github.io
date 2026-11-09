import {compare} from './engine.mjs';
const form=document.querySelector('#form'),cards=document.querySelector('#cards'),status=document.querySelector('#status');
const money=n=>n.toLocaleString('ja-JP');
function run(e){e?.preventDefault();if(!form.reportValidity())return;
try{const f=new FormData(form);const x=compare({length:f.get('length'),width:f.get('width'),height:f.get('height'),weight:f.get('weight'),anonymous:f.get('anonymous')==='yes',tracking:f.has('tracking'),post:f.has('post'),upright:f.has('upright')});
document.querySelector('#error').textContent='';status.textContent=`${x.results.length}件の候補 / 3辺合計 ${x.sum}cm・${money(x.weight)}g`;
cards.innerHTML=x.results.length?`<p class="small">送料＋必須の専用資材代の安い順。「要確認」の候補は、記載の条件を満たした場合に利用できます。</p>`+x.results.map((r,i)=>`<article class="result ${i===0?'first':''}"><div class="resultTop"><span class="rank">${String(i+1).padStart(2,'0')}</span><div class="tags"><span>${r.anon?'匿名':'匿名ではない'}</span><span>${r.tracking?'追跡あり':'追跡なし'}</span>${r.checks.length?'<span class="conditional">要確認</span>':''}</div></div><h3>${r.name}</h3><div class="price">${money(r.total)}<small>円 / 件</small></div><p class="breakdown">送料 ${money(r.fee)}円 ＋ 専用資材 ${r.material}円</p><p class="small">${r.material===0?'別途、袋・箱などの梱包費がかかります。':'別途、必要に応じて緩衝材などの費用がかかります。'}</p><dl><dt>サイズ・重さ</dt><dd>${r.limit}</dd><dt>発送場所</dt><dd>${r.where}</dd></dl>${r.checks.length?`<aside><b>選ぶ前に確認</b><ul>${r.checks.map(c=>`<li>${c}</li>`).join('')}</ul></aside>`:''}<details ${i===0?'open':''}><summary>この方法の使い方</summary><p>${r.steps}</p><a href="${r.source}" target="_blank" rel="noopener">公式の料金・利用条件を確認 ↗</a></details></article>`).join(''):'<div class="empty"><h2>比較対象に合う候補が見つかりませんでした。</h2><p>cmとgの入力単位を確認してください。小さすぎる荷物は宛名が読める大きさの封筒へ、大きな荷物は梱包・発送たのメル便などを検討しましょう。</p><a href="https://help.jp.mercari.com/guide/articles/1080/">公式の配送方法一覧へ →</a></div>';
document.querySelector('#results').focus({preventScroll:true});document.querySelector('#results').scrollIntoView({behavior:'smooth',block:'start'});
}catch(err){document.querySelector('#error').textContent=err.message;}}
form.addEventListener('submit',run);
form.addEventListener('input',()=>{if(status.textContent)status.textContent='入力が変わりました。「発送候補を見る」を押して再計算してください。';cards.classList.add('stale');});
form.addEventListener('submit',()=>cards.classList.remove('stale'));
document.querySelectorAll('[data-values]').forEach(b=>b.addEventListener('click',()=>{b.dataset.values.split(',').forEach((v,i)=>form.elements[['length','width','height','weight'][i]].value=v);cards.classList.remove('stale');run();}));
