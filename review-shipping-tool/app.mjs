import {compare} from './engine.mjs';
const form=document.querySelector('#form'),cards=document.querySelector('#cards'),status=document.querySelector('#status');
const money=n=>n.toLocaleString('ja-JP');
const postSupplyUrl='https://www.post.japanpost.jp/service/send/domestic/delivery/e-shipping/yu-packetpost.html';
const supplies={
 mini:['専用封筒','郵便局などの取扱店。店舗・在庫は公式の販売場所一覧で確認できます。',postSupplyUrl],
 post:['発送用シール','郵便局では20枚100円（1枚5円）。専用箱は不要で、規定に合う手持ちの封筒や箱にシールを貼って送れます。',postSupplyUrl],
 compact:['専用BOX（70円）','ヤマト運輸の営業所、取扱いのあるセブン‐イレブン・ファミリーマート、メルカリストア。店舗により取扱い・在庫が異なります。','https://help.jp.mercari.com/guide/articles/135/'],
 plus:['専用箱（65円）','郵便局・ローソンなどの取扱店。店舗により取扱い・在庫が異なります。','https://www.post.japanpost.jp/service/send/domestic/delivery/e-shipping/yu-packetplus.html']
};
const service=r=>['neko','compact','yamato'].includes(r.id)?'らくらくメルカリ便（ヤマト運輸）':['mini','post','packet','plus','yu'].includes(r.id)?'ゆうゆうメルカリ便（日本郵便）':'メルカリ便以外（日本郵便）';
const packing=r=>r.id==='post'?'手持ちの封筒・箱・緩衝材を使えば、シール以外の資材の追加購入は不要です。買い足す場合のみ、その費用が別途かかります。':r.material===0?'規定に合う手持ちの袋・箱などを使えます。梱包資材を買い足す場合のみ、その費用が別途かかります。':'緩衝材などは手持ちのものを使えます。買い足す場合のみ、その費用が別途かかります。';
function run(e){e?.preventDefault();if(!form.reportValidity())return;
try{const f=new FormData(form);const x=compare({length:f.get('length'),width:f.get('width'),height:f.get('height'),weight:f.get('weight'),anonymous:f.get('anonymous')==='yes',tracking:f.has('tracking'),post:f.has('post'),upright:f.has('upright')});
document.querySelector('#error').textContent='';status.textContent=`${x.results.length}件の候補 / 3辺合計 ${x.sum}cm・${money(x.weight)}g`;
cards.innerHTML=x.results.length?`<p class="small">送料＋必須の専用資材代の安い順。「要確認」の候補は、記載の条件を満たした場合に利用できます。</p>`+x.results.map((r,i)=>`<article class="result ${i===0?'first':''}"><div class="resultTop"><span class="rank">${String(i+1).padStart(2,'0')}</span><div class="tags"><span>${r.anon?'匿名':'匿名ではない'}</span><span>${r.tracking?'追跡あり':'追跡なし'}</span>${r.checks.length?'<span class="conditional">要確認</span>':''}</div></div><h3>${r.name}</h3><p class="service-name">${service(r)}</p><div class="price">${money(r.total)}<small>円 / 件</small></div><p class="breakdown">送料 ${money(r.fee)}円 ＋ ${r.id==='post'?'シール':'専用資材'} ${r.material}円</p><p class="small">${packing(r)}</p><dl><dt>サイズ・重さ</dt><dd>${r.limit}</dd><dt>発送場所</dt><dd>${r.where}</dd>${supplies[r.id]?`<dt>資材の購入場所</dt><dd><strong>${supplies[r.id][0]}</strong><br>${supplies[r.id][1]}<br><a href="${supplies[r.id][2]}" target="_blank" rel="noopener">公式の資材・購入先を確認 ↗</a></dd>`:''}</dl>${r.checks.length?`<aside><b>選ぶ前に確認</b><ul>${r.checks.map(c=>`<li>${c}</li>`).join('')}</ul></aside>`:''}<details ${i===0?'open':''}><summary>この方法の使い方</summary><p>${r.steps}</p><a href="${r.source}" target="_blank" rel="noopener">公式の料金・利用条件を確認 ↗</a></details></article>`).join(''):'<div class="empty"><h2>比較対象に合う候補が見つかりませんでした。</h2><p>cmとgの入力単位を確認してください。小さすぎる荷物は宛名が読める大きさの封筒へ、大きな荷物は梱包・発送たのメル便などを検討しましょう。</p><a href="https://help.jp.mercari.com/guide/articles/1080/">公式の配送方法一覧へ →</a></div>';
document.querySelector('#results').focus({preventScroll:true});document.querySelector('#results').scrollIntoView({behavior:'smooth',block:'start'});
}catch(err){document.querySelector('#error').textContent=err.message;}}
form.addEventListener('submit',run);
form.addEventListener('input',()=>{if(status.textContent)status.textContent='入力が変わりました。「発送候補を見る」を押して再計算してください。';cards.classList.add('stale');});
form.addEventListener('submit',()=>cards.classList.remove('stale'));
document.querySelectorAll('[data-values]').forEach(b=>b.addEventListener('click',()=>{b.dataset.values.split(',').forEach((v,i)=>form.elements[['length','width','height','weight'][i]].value=v);cards.classList.remove('stale');run();}));
