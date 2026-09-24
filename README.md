# さめちゃん 特典ライブラリ

公開URL: https://samecompany3.github.io/

HTML・CSS・JavaScriptだけで動くGitHub Pagesサイトです。ビルドや外部サービスの設定は不要です。

## 現在の特典

- product-selection/ : 商品選び5つの基準シート
- batch-listing/ : 10品いっき出品チェックリスト
- after-listing/ : 出品後チェックシート
- listing-review/ : 売れないを直す5点チェックシート
- ng-actions/ : メルカリNG行動チェックリスト

各特典の本文をWeb上で読めます。チェック欄はその場で操作でき、再読み込みするとリセットされます。downloads/ に保存用PDFが入っています。

## 更新する場所

- 一覧: index.html
- 本文: 各フォルダの index.html
- 共通デザイン: assets/site.css
- カテゴリ絞り込み: assets/site.js
- 公式LINE: https://lin.ee/5Yp4quy （今回の配布資料のリンク）

PDF内の一覧リンクは公開URLへ設定済みです。LINEリンクを変更するときはWeb本文とPDFの両方を更新してください。

既存の kobutsusho/、mercari-claim/、profile/ は過去のリンクを維持するため残していますが、今回の一覧には掲載していません。

## 公開

main ブランチをGitHub Pagesで公開します。既存の .nojekyll は残してください。更新後はGitHubのPagesデプロイ完了を確認します。

noindex, nofollow を維持しています。これはアクセス制限ではなく、URLを知っている方は閲覧できます。
