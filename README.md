# 📊 都道府県別人口推移グラフ表示アプリ ゆめみコーディング試験

このアプリは、都道府県を選択して人口推移をグラフで可視化できる Web アプリケーションです。Vue 3（Composition API + `<script setup>`）と Chart.js を用いて構築されています。

🔗 **公開アプリ**:  
[https://yumemi-exam-dyxzab250-rrepos-projects.vercel.app/](https://yumemi-exam-dyxzab250-rrepos-projects.vercel.app/)
---
![アプリ画像](/app.png "サンプル")

## 🔧 主な機能

- 直感的に、都道府県を複数選択して人口推移を折れ線グラフで表示  
- 「詳細モード」ON で年少・生産年齢・老年人口も表示  
- 選択に応じて自動でデータを取得し、グラフ更新  
- Chart.js による滑らかな描画  
- スマホ・PC対応のレスポンシブレイアウト

---

## 🧪 技術スタック

- **Vue 3**
  - Composition API
  - `<script setup>` 構文
- **TypeScript**
- **Chart.js**
  - 折れ線グラフ描画に使用
- **Vercel**
  - 自動ビルド & デプロイ対応

---

## 🗂 ファイル・機能概要

### `template`

- 都道府県選択（`<SelectMap />`）
- 詳細モード切り替え（`<input type="checkbox">`）
- 折れ線グラフ表示（`<Line />`）

### `script setup`

- API 型定義（都道府県・人口構成データ）
- `useFetch` による都道府県一覧取得
- 都道府県選択に応じて人口データを `$fetch` で取得・キャッシュ
- `watchEffect` によりリアクティブにグラフを更新
- `getRandomColor()` 関数で線の色をランダムに生成

---

## 🚀 デプロイについて

このアプリは [Vercel](https://vercel.com/) にデプロイされており、以下の特徴を持ちます：

- GitHub に Push するだけで自動的に **ビルド & デプロイ**
- ビルドコマンドと静的ディレクトリの設定のみで運用可能
- ステージングと本番環境の切り替えも簡単
- github actionsで、firebaseのエラーが出ていますが、現在は使用しておりません。

---

## 📌 API エンドポイン

- `/api/prefectures`  
  → 都道府県一覧を取得

- `/api/population?prefCode=XX`  
  → 指定した都道府県の人口推移データを取得

---

## 🧪 テストについて

`/server/api/population.test.ts` ハンドラのテストには `Vitest` を使用して、API の挙動を確認しています。


## 📜 ライセンス

[MIT](LICENSE)

