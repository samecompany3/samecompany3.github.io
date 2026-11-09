export const UPDATED='2026年11月9日';
const merc=id=>`https://help.jp.mercari.com/guide/articles/${id}/`;
const chart=merc(1080);
export function compare(input){
 const dimensions=[input.length,input.width,input.height].map(Number),w=Number(input.weight);
 if([...dimensions,w].some(n=>!Number.isFinite(n)||n<=0))throw Error('縦・横・厚さ・重さを、0より大きい数字で入力してください。');
 const [a,b,c]=dimensions.sort((x,y)=>y-x),sum=Math.round((a+b+c)*10000)/10000;
 const results=[];
 function add(id,name,fee,material,anon,tracking,limit,where,steps,checks=[],source=chart){
  if(input.anonymous&&!anon||input.tracking&&!tracking)return;
  results.push({id,name,fee,material,total:fee+material,anon,tracking,limit,where,steps,checks,source});
 }
 const post=input.post?[]:['使う郵便ポストの投函口に、無理なく入ることを確認してください。'];
 const small=a<=34&&sum<=60&&a>=14&&b>=9;
 if(a+c<=21.1&&b+c<=16.8&&w<=2000)add('mini','ゆうパケットポストmini',160,20,true,true,'専用封筒の内寸21.1×16.8cm・2kg以内','郵便ポスト','専用封筒を購入 → アプリで二次元コードを読み取る → 控えを保管して投函 → 発送通知', ['厚みがあると封筒の使える幅が減ります。実際に入れて、ふたが閉じることを確認してください。',...post],merc(1479));
 if(a<=34&&sum<=60&&a>=23&&b>=11.5&&c<=3&&w<=1000)add('neko','ネコポス',210,0,true,true,'3辺計60cm・長辺34cm・厚さ3cm・1kg以内／最小23×11.5cm','ヤマト営業所・セブン‐イレブン・ファミリーマート等','らくらくメルカリ便を選択 → 発送場所とネコポスを選ぶ → コードを提示して発送 → 発送通知',[],merc(134));
 if(small&&w<=2000)add('post','ゆうパケットポスト（シール）',215,5,true,true,'3辺計60cm・長辺34cm・2kg以内／最小14×9cm','郵便ポスト','発送用シールを貼る → アプリで二次元コードを読み取る → 控えを保管して投函 → 発送通知',post,merc(834));
 if(small&&c<=3&&w<=1000)add('packet','ゆうパケット',230,0,true,true,'3辺計60cm・長辺34cm・厚さ3cm・1kg以内／最小14×9cm','郵便局・ローソン等','ゆうゆうメルカリ便を選択 → 発送場所とゆうパケットを選ぶ → コードで送り状を発行して発送 → 発送通知');
 if(small&&w<=2000)add('click','クリックポスト',240,0,false,true,'3辺計60cm・長辺34cm・2kg以内／最小14×9cm','原則、郵便ポスト','公式サイトで利用登録 → 宛先入力とオンライン決済 → ラベルを印刷して貼る → 投函し、取引画面で発送通知',[...post,'印刷環境と指定の決済方法が必要です。内容品の損害賠償はないため、壊れやすい品は補償条件も比較しましょう。'],'https://www.post.japanpost.jp/service/send/domestic/delivery/clickpost/');
 if((a<=25&&b<=20&&c<=5)||(a+c<=34&&b+c<=24.8&&c<=5))add('compact','宅急便コンパクト',450,70,true,true,'通常BOX外寸25×20×5cm／薄型外寸34×24.8cm・収納時厚さ5cm以内','ヤマト営業所・セブン‐イレブン・ファミリーマート等','新品の専用BOXを用意 → 付属テープで封をする → らくらくメルカリ便でコードを提示して発送',['表示寸法は外寸です。商品と緩衝材が実際の箱に収まり、ふたが自然に閉まることを確認してください。薄型は厚みにより使える幅が減ります。'],merc(135));
 if(a<=24&&b<=17&&c<=7&&w<=2000)add('plus','ゆうパケットプラス',455,65,true,true,'専用箱24×17×7cm・2kg以内','郵便局・ローソン等','専用箱を購入 → 変形させずに梱包 → ゆうゆうメルカリ便でコードを提示して発送',['専用箱の内側に緩衝材ごと入り、ふたが閉まることを確認してください。'],'https://www.post.japanpost.jp/service/send/domestic/delivery/e-shipping/yu-packetplus.html');
 const yamato=[[60,2000,750],[80,5000,850],[100,10000,1050],[120,15000,1200],[140,20000,1450],[160,25000,1700],[180,30000,2100],[200,30000,2500]].find(([s,k])=>sum<=s&&w<=k);
 if(yamato&&a<=170&&(!input.upright||a<=100))add('yamato','宅急便 '+yamato[0]+'サイズ',yamato[2],0,true,true,`3辺計${yamato[0]}cm・${yamato[1]/1000}kg以内`,yamato[0]>160?'ヤマト営業所（集荷は別途100円）':'ヤマト営業所・セブン‐イレブン・ファミリーマート等','らくらくメルカリ便を選択 → 宅急便と発送場所を選ぶ → コードを提示して発送 → 控えを保管',[],merc(136));
 const yu=[[60,750],[80,870],[100,1070],[120,1200],[140,1450],[160,1700],[170,1900]].find(([s])=>sum<=s);
 if(yu&&w<=25000)add('yu','ゆうパック '+yu[0]+'サイズ',yu[1],0,true,true,`3辺計${yu[0]}cm・25kg以内`,'郵便局・ローソン等','ゆうゆうメルカリ便を選択 → ゆうパックと発送場所を選ぶ → コードを提示して発送 → 控えを保管',[],merc(177));
 const letterSource='https://www.post.japanpost.jp/service/send/domestic/mail/letter/';
 if(a>=14&&b>=9){
 if(a<=23.5&&b<=12&&c<=1&&w<=50)add('standard','定形郵便',110,0,false,false,'23.5×12×1cm・50g以内／最小14×9cm','郵便局・郵便ポスト','宛先・差出人を記入 → 郵便局で料金を確認して発送 → 取引画面で発送通知',['追跡・補償がないため、未着が心配な品は追跡付きの候補を選ぶと安心です。'],letterSource);
 const within=a<=34&&b<=25&&c<=3;
 const rate=(within?[[50,140],[100,180],[150,270],[250,320],[500,510],[1000,750]]:[[50,260],[100,290],[150,390],[250,450],[500,660],[1000,920],[2000,1350],[4000,1750]]).find(([k])=>w<=k);
 if(a<=60&&sum<=90&&rate)add('regular','定形外郵便（'+(within?'規格内':'規格外')+'）',rate[1],0,false,false,within?'34×25×3cm・1kg以内':'3辺計90cm・長辺60cm・4kg以内','郵便局（小さいものは郵便ポストも可）','宛先・差出人を記入 → 郵便局で計量して発送 → 取引画面で発送通知',['追跡・補償はありません。重量の境目では、封筒やテープを含めて計量しましょう。'],letterSource);
 }
 results.sort((x,y)=>x.total-y.total||x.checks.length-y.checks.length);
 return {results,dimensions:[a,b,c],sum,weight:w};
}
