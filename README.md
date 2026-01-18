# DANTE - AI Writing Editor

12言語対応のAIライティングエディターです。Grok AIを搭載し、スマホからもPCからも快適に使えるPWA対応のレスポンシブデザインで、小説・ブログ・ビジネス文書など様々なジャンルの執筆をサポートします。

## 🌐 アクセスURL

- **本番環境**: https://project-fb113820.pages.dev/
- **GitHub**: https://github.com/mashiroARTES/dante-writing-editor

## 🌍 対応言語（12言語）

日本語、English、中文、한국어、Español、Français、Deutsch、Italiano、Português、हिन्दी、Русский、العربية

## ✨ 実装済み機能

### 🔐 アカウント・課金機能
- ユーザー登録・ログイン（セッション30日間有効）
- アカウント削除機能
- 文字数ベース課金システム（KOMOJU決済統合）
  - 無料プラン: 3,000文字（1回限り）
  - スタンダード: 500,000文字（約5冊分）$10 / ¥1,000
  - プレミアム: 6,000,000文字（約60冊分）$100 / ¥10,000

### 📝 ライティングエディター
- リアルタイム文字数カウント
  - 総文字数 / 空白除く文字数 / 行数
  - 読了時間（500文字/分で計算）
  - 原稿用紙換算（400字詰め）
- **自動保存機能**（30秒間隔、ON/OFF切替可能）
- プロジェクト管理（保存・読み込み・削除）
- **エクスポート機能（TXT/Markdown/DOCX）**

### ⌨️ キーボードショートカット
- `Ctrl+S` / `Cmd+S`: 保存
- `Ctrl+Enter` / `Cmd+Enter`: AI生成
- `Escape`: モーダルを閉じる

### 🚦 レート制限
- 1分あたり20リクエストの制限
- 超過時に残り待ち時間を表示

### 📁 プロジェクト整理機能
- **フォルダ管理**: カラー付きフォルダでプロジェクトを整理
- **タグ機能**: プロジェクトにタグ付け
- **フォルダフィルタ**: サイドバーでフォルダ別にプロジェクトを表示

### 📄 テンプレート機能
ジャンル別の定型テンプレート：
- 小説（起承転結構成）
- ブログ（導入・本文・結論）
- ビジネス文書（件名・本文・署名）
- 脚本（シーン・台詞・ト書き）
- 学術論文（序論・方法・結果・考察）

### 🎯 ジャンル選択
19種類のプリセットジャンル + 自由入力:
- 小説、エッセイ、ブログ、ビジネス文書、学術・論文
- 脚本・シナリオ、詩・俳句、ニュース記事、レビュー、SNS投稿
- メール、コピーライティング、技術文書
- ファンタジー、ミステリー、恋愛、ホラー、SF
- その他（カスタム入力）

### 💡 3段階AIワークフロー

#### 1. ネタ考案モード
- テーマ・キーワード入力
- 追加条件の設定
- アイデア数の選択（3/5/10個）
- コンセプトの保存

#### 2. プロット作成モード
- アイデアからプロット生成
- 詳細度選択（シンプル/標準/詳細）
- コンセプトとプロットの連携

#### 3. 執筆モード
- **続きを書く**: 文章の続きを自動生成
- **書き直す**: 選択部分をより良い表現に
- **拡張する**: 選択部分を詳しく描写
- **目標文字数指定**: 生成する文字数を指定可能（※目安表示）

### 🔗 参照プロジェクト機能
- 他のプロジェクトをAI生成の参照として選択
- 過去のアイデアやプロットを知識ベースとして活用
- 複数プロジェクトの同時参照に対応

### 🔧 編集ツール
- **校正機能**: 誤字脱字・文法チェック（修正箇所リスト付き）
- **要約機能**: 長文を簡潔に要約
- **タイトル案生成**: 内容に最適なタイトルを5つ提案
- **翻訳機能**: 13言語間での翻訳

### 🎨 文体変換
- **敬語変換**: ビジネス文体に
- **カジュアル変換**: 口語体に
- **文学的変換**: 美しい表現に

### 🤖 AIモデル
- grok-4-1-fast-non-reasoning（高速）
- grok-4-1-fast-reasoning（推論強化）

### 📱 レスポンシブ・PWA対応
- スマホ・タブレット最適化
- モバイル用AIアシスタントパネル（右下ボタン）
- ダークモード対応
- **PWA対応**: ホーム画面に追加可能
- **オフラインキャッシュ**: Service Workerによるキャッシュ

### 📜 生成履歴
- AI生成の全履歴を保存
- 履歴からの再利用・コピー
- 生成タイプ別フィルタリング

## 🏗️ 技術スタック

- **バックエンド**: Hono (TypeScript) on Cloudflare Workers
- **フロントエンド**: Vanilla JS + TailwindCSS (CDN)
- **データベース**: Cloudflare D1 (SQLite)
- **AI**: Grok API (x.ai)
- **決済**: KOMOJU
- **デプロイ**: Cloudflare Pages

## 📁 プロジェクト構造

```
webapp/
├── src/
│   └── index.tsx          # メインアプリケーション（API + ルーティング）
├── public/
│   ├── static/
│   │   └── app.js         # フロントエンドJS（3,500行以上）
│   ├── manifest.json      # PWAマニフェスト
│   └── sw.js              # Service Worker
├── migrations/
│   ├── 0001_initial_schema.sql
│   ├── 0002_add_plans_and_usage.sql
│   ├── 0003_add_unlimited_plan.sql
│   ├── 0004_update_free_plan_limit.sql
│   ├── 0005_add_project_concept_plot.sql
│   └── 0006_add_folders_tags.sql
├── .dev.vars              # 環境変数（ローカル開発用）
├── .gitignore             # Git除外設定
├── wrangler.jsonc         # Cloudflare設定
├── vite.config.ts         # Viteビルド設定
├── tsconfig.json          # TypeScript設定
└── package.json
```

## 🗄️ データモデル

### Users
- id, email, password_hash, username
- plan (free/standard/premium/unlimited)
- total_chars_limit, total_chars_used
- language, created_at, updated_at

### Projects
- id, user_id, title, genre, custom_genre
- project_type (idea/plot/writing)
- content, word_count
- concept, plot_content
- folder_id, created_at, updated_at

### AI History
- id, user_id, project_id
- prompt, response, model
- generation_type, target_length, created_at

### Sessions
- id, user_id, expires_at, created_at

### User Preferences
- user_id, default_model, default_genre, theme, auto_save

### Payments
- id, user_id, amount, currency, plan
- chars_added, komoju_payment_id, status, created_at

### Folders
- id, user_id, name, color, created_at

### Tags
- id, user_id, name, color, created_at

### Project Tags
- project_id, tag_id

## 📝 使い方

1. **アカウント作成**: メールアドレス、パスワード、ユーザー名で登録
2. **言語設定**: 設定画面から12言語から選択可能
3. **プロジェクト作成**: 「+」ボタンでジャンルとタイプを選択
4. **執筆**: エディターに文章を入力
5. **AI活用**: 
   - PC: 右パネルのAIアシスタント
   - スマホ: 右下の黄色いボタン
6. **ショートカット**: Ctrl+S で保存、Ctrl+Enter でAI生成
7. **保存**: 自動保存（30秒）or 手動保存ボタン
8. **エクスポート**: TXT/Markdown/DOCX形式でダウンロード

## 🔒 セキュリティ

- パスワードはSHA-256+saltでハッシュ化
- セッションはHttpOnly Cookieで管理
- APIキーは環境変数（Cloudflare Secrets）で管理
- Push Protection: GitHubへのシークレット漏洩防止済み

## 🚀 今後の開発予定

### 優先度高
- [ ] バージョン履歴管理（Undo/Redo強化）
- [ ] PDF出力（サーバーサイド）

### 優先度中
- [ ] コラボレーション（プロジェクト共有、コメント機能）
- [ ] 複数AIモデル対応（Claude, GPT等）

### 優先度低
- [ ] 音声入力対応
- [ ] プラグイン機構

## 🛠️ ローカル開発

```bash
# 依存関係インストール
npm install

# ローカル開発サーバー起動
npm run build
npx wrangler pages dev dist --d1=ai-writer-production --local

# マイグレーション適用（ローカル）
npx wrangler d1 migrations apply ai-writer-production --local

# マイグレーション適用（本番）
npx wrangler d1 migrations apply ai-writer-production

# デプロイ
npm run build && npx wrangler pages deploy dist --project-name project-fb113820
```

環境変数（.dev.vars）:
```
GROK_API_KEY=your_grok_api_key
KOMOJU_SECRET_KEY=your_komoju_secret_key
```

## 📅 最終更新

2025-01-18

## 📄 ライセンス

© 2025 RATIO Lab., LLC
