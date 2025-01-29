<div id="top"></div>

# デジタル名詞アプリ

以下からアプリの確認が可能です。

https://business-card-acec2.web.app/

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンド -->
  <img src="https://img.shields.io/badge/Node.js-000000?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/Chakra UI-000000?logo=chakraui&style=for-the-badge">
  <img src="https://img.shields.io/badge/React-000000?logo=react&style=for-the-badge">
  <img src="https://img.shields.io/badge/React Hook Form-000000?logo=reacthookform&style=for-the-badge">
  <img src="https://img.shields.io/badge/React Router-000000?logo=reactrouter&style=for-the-badge">
  <img src="https://img.shields.io/badge/TypeScript-000000?logo=typescript&style=for-the-badge">
  <!-- テスト -->
  <img src="https://img.shields.io/badge/Jest-000000?logo=jest&style=for-the-badge&logoColor=C21325">
  <img src="https://img.shields.io/badge/Testing Library-000000?logo=testinglibrary&style=for-the-badge">
  <!-- インフラ -->
  <img src="https://img.shields.io/badge/Vite-000000?logo=vite&style=for-the-badge">
  <img src="https://img.shields.io/badge/Supabase-000000?logo=supabase&style=for-the-badge">
  <img src="https://img.shields.io/badge/Firebase-000000?logo=firebase&style=for-the-badge&logoColor=DD2C00">
  <img src="https://img.shields.io/badge/GitHub Actions-000000.svg?logo=githubactions&style=for-the-badge">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)

## プロジェクトについて

デジタル名詞アプリでは、以下の機能を備えています。

- 名刺の検索
- 名刺の登録
- 名刺の表示
- 名刺の削除（日次バッチにより、毎朝6:00に自動で削除されます）

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

| 言語・フレームワーク | バージョン |
| -------------------- | ---------- |
| Node.js              | 23.3.0     |
| Chakra UI            | 3.2.4      |
| React                | 18.3.1     |
| React Hook Form      | 7.54.2     |
| React Router         | 7.1.1      |
| TypeScript           | 5.6.2      |
| Vite                 | 6.0.5      |
| Supabase             | 2.47.10    |

その他のパッケージのバージョンは `package.json` を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

## 画面一覧

| 画面名       | URL             | 機能       |
| ------------ | --------------- | ---------- |
| TOP画面      | /               | 名刺の検索 |
| 名刺登録画面 | /cards/register | 名刺の登録 |
| 名刺閲覧画面 | /cards/{id}     | 名刺の表示 |

<p align="right">(<a href="#top">トップへ</a>)</p>

## バッチ一覧

| バッチ名             | 実行条件     | 機能                                                      |
| -------------------- | ------------ | --------------------------------------------------------- |
| 名刺データ削除バッチ | 毎日 AM 6:00 | 前日の `users` および `user_skill` テーブルのデータを削除 |

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

❯ tree -a -I "node_modules|.git|dist" -L 2s

```
.
├── .env
├── .firebase
├── .firebaserc
├── .github
│   └── workflows
├── .gitignore
├── .prettierrc.cjs
├── Makefile
├── README.md
├── batch
│   └── index.ts
├── eslint.config.js
├── firebase.json
├── index.html
├── jest.config.js
├── jest.setup.ts
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.tsx
│   ├── __tests__
│   ├── assets
│   ├── components
│   ├── domain
│   ├── hooks
│   ├── main.tsx
│   ├── router
│   ├── theme
│   ├── utils
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

### 1. `.env`の作成

`.env` ファイルを、以下の環境変数例と[環境変数の一覧](#環境変数の一覧)を元に作成してください。

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### 2. 開発環境を構築

`.env` ファイルを作成後、以下のコマンドで開発環境を構築します。

```
$ git clone https://github.com/ritsu21ctws/business-card.git
$ cd business-card
$ npm i
$ npm run dev
```

### 3. 動作確認

`npm run dev` 実行時に表示されるURLへアクセスできるかを確認してください。<br>
アクセスできたら成功です。

### 4. テストの実行

テストを実施するには、以下のコマンドを実行してください。

```
$ make test
```

### 環境変数の一覧

| 変数名                 | 役割                       | デフォルト値 | DEV 環境での値 |
| ---------------------- | -------------------------- | ------------ | -------------- |
| VITE_SUPABASE_URL      | SupabaseのProject URL      |              |                |
| VITE_SUPABASE_ANON_KEY | SupabaseのProject API Keys |              |                |

### コマンド一覧

| Make      | 実行する処理   | 元のコマンド               |
| --------- | -------------- | -------------------------- |
| make lint | リンターの実行 | ./node_modules/.bin/eslint |
| make test | テストを実行   | npm run test               |

<p align="right">(<a href="#開発環境構築">開発環境構築へ</a>)</p>
<p align="right">(<a href="#top">トップへ</a>)</p>
