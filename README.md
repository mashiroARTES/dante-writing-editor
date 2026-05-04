# DANTE - AI Writing Editor

12言語対応のAIライティングエディターです。Grok AIを搭載し、スマホからもPCからも快適に使えるPWA対応のレスポンシブデザインで、小説・ブログ・ビジネス文書など様々なジャンルの執筆をサポートします。

## 🌐 アクセスURL

- **本番環境**: https://dante.ratio-lab.com/
- **ランディングページ**: https://dante-writing-editor-lp.pages.dev/
- **GitHub**: https://github.com/mashiroARTES/dante-writing-editor

## 🌍 対応言語（12言語）

日本語、English、中文、한국어、Español、Français、Deutsch、Italiano、Português、हिन्दी、Русский、العربية

## ✨ 実装済み機能

### 🔐 アカウント・認証機能
- ユーザー登録・ログイン（セッション30日間有効）
- **Googleログイン**（v1.4 NEW）
  - ワンクリックでGoogleアカウントでログイン
  - 新規ユーザーは自動でアカウント作成
  - 既存メールアドレスがあれば自動連携
- **Google連携機能**（v1.4 NEW）
  - 設定画面から既存アカウントにGoogle連携を追加
  - 連携済みの場合は解除も可能
  - パスワード未設定ユーザーは連携解除不可（ログイン手段確保）
- アカウント削除機能

### 💳 課金機能
- 文字数ベース課金システム（KOMOJU決済統合）
  - 無料プラン: 3,000文字（1回限り）
  - スタンダード: 500,000文字（約5冊分）$10 / ¥1,000
  - プレミアム: 6,000,000文字（約60冊分）$100 / ¥10,000
- **トークン消費の明確な説明**（v1.3）
  - AI生成時のみ消費、通常執筆は無料
  - 購入ページで視覚的に分かりやすく表示
- **招待コード機能**
  - 特別コードで文字数を追加取得可能

### 🤖 執筆相談AIアシスタント「マシロさん」（v1.3）
- **会話履歴保存**: 過去の会話をAIが記憶
- **履歴削除機能**: 会話履歴をクリアしてAIの記憶をリセット
- **文字数消費表示**: 相談ごとの消費文字数を表示
- **カスタマイズ機能**
  - AI名の変更（「マシロさん」→任意の名前）
  - アイコンの変更（カスタム画像URL対応）
  - キャラクター設定（性格、話し方、役割を自由に設定）
  - 執筆相談ページの⚙️アイコンから設定画面にアクセス
- **12言語対応**: 名前・説明・挨拶がすべての言語で表示

### 📝 ライティングエディター
- リアルタイム文字数カウント
  - 総文字数 / 空白除く文字数 / 行数
  - 読了時間（500文字/分で計算）
  - 原稿用紙換算（400字詰め）
- **自動保存機能**（30秒間隔、ON/OFF切替可能）
- プロジェクト管理（保存・読み込み・削除）

### 📜 縦書きモード（v1.1）
- **ワンクリック切替**: ツールバーのボタンで縦書き/横書きを即座に切替
- **英数字正立表示**: 1〜2文字の英数字は縦書き時も正立で表示（text-combine-upright）
- **専用スタイル**: 縦書き時は明朝体フォントを自動適用
- **スクロール対応**: 縦書き時は横スクロールで読み進める

### 📤 エクスポート機能（v1.1 拡張）
7種類の形式に対応:
- **TXT**: プレーンテキスト
- **Markdown**: 見出し付きMarkdown形式
- **DOCX**: Microsoft Word文書（Office Open XML）
- **PDF**: ブラウザ印刷ダイアログ経由で出力（縦書き対応）
- **RTF**: リッチテキスト形式
- **HTML**: スタイル付きHTMLページ（縦書き対応）
- **コピー**: クリップボードにコピー

### 📥 インポート機能（v1.1）
4種類の形式に対応:
- **TXT**: プレーンテキスト
- **RTF**: リッチテキストからテキスト抽出
- **DOCX**: Word文書からテキスト抽出
- **DOC**: 旧Word形式（基本対応）

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
- **フォルダ連動作成**: フォルダを開いた状態で新規作成すると、そのフォルダに自動配置

### 🗑️ ゴミ箱機能（v1.2）
- **30日間保持**: 削除したプロジェクトは30日間ゴミ箱に保持
- **復元機能**: 誤削除してもワンクリックで復元可能
- **完全削除**: 不要なプロジェクトを完全に削除
- **一括削除**: ゴミ箱を空にして全て削除
- **12言語対応**: 全ての言語でゴミ箱UIを利用可能

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
- **認証**: セッションベース + Google OAuth 2.0
- **デプロイ**: Cloudflare Pages

## 📁 プロジェクト構造

```
webapp/
├── src/
│   └── index.tsx          # メインアプリケーション（API + ルーティング）約2,950行
├── public/
│   ├── static/
│   │   ├── app.js         # フロントエンドJS（約6,660行）
│   │   ├── logo.png       # アプリロゴ
│   │   └── mashiro_icon.png # マシロさんアイコン
│   ├── manifest.json      # PWAマニフェスト
│   └── sw.js              # Service Worker
├── migrations/
│   ├── 0001_initial_schema.sql
│   ├── 0002_add_plans_and_usage.sql
│   ├── 0003_add_unlimited_plan.sql
│   ├── 0004_update_free_plan_limit.sql
│   ├── 0005_add_project_concept_plot.sql
│   ├── 0006_add_folders_tags.sql
│   ├── 0007_fix_ai_history_constraints.sql
│   ├── 0008_add_used_invite_codes.sql
│   ├── 0009_add_trash_feature.sql
│   ├── 0010_add_mashiro_history.sql      # v1.3 会話履歴
│   ├── 0011_add_ai_consultant_settings.sql # v1.3 AI設定
│   └── 0012_add_google_oauth.sql         # v1.4 Google OAuth
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
- **google_id** (v1.4 NEW) - Google OAuth連携用
- plan (free/standard/premium/unlimited)
- total_chars_limit, total_chars_used
- language, created_at, updated_at

### Projects
- id, user_id, title, genre, custom_genre
- project_type (idea/plot/writing)
- content, word_count
- concept, plot_content
- folder_id, deleted_at, created_at, updated_at

### AI History
- id, user_id, project_id
- prompt, response, model
- generation_type, target_length, created_at

### Mashiro History（v1.3）
- id, user_id, role (user/assistant)
- content, chars_consumed, created_at

### AI Consultant Settings（v1.3）
- id, user_id, ai_name, ai_icon_url
- ai_personality, created_at, updated_at

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

### Used Invite Codes
- id, user_id, code, chars_added, used_at

## 🔌 API エンドポイント

### 認証 API
| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| POST | `/api/auth/register` | 新規ユーザー登録 |
| POST | `/api/auth/login` | ログイン |
| POST | `/api/auth/logout` | ログアウト |
| GET | `/api/auth/me` | 現在のユーザー情報取得 |
| GET | `/api/auth/usage` | 文字数使用状況取得 |
| DELETE | `/api/auth/account` | アカウント削除 |

### Google OAuth API（v1.4 NEW）
| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| GET | `/api/auth/google` | Googleログイン開始 |
| GET | `/api/auth/callback/google` | Googleログインコールバック |
| GET | `/api/auth/google-status` | Google連携状態確認 |
| GET | `/api/auth/google/link` | 既存アカウントにGoogle連携開始 |
| GET | `/api/auth/callback/google-link` | Google連携コールバック |
| DELETE | `/api/auth/google/link` | Google連携解除 |

### プロジェクト API
| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| GET | `/api/projects` | プロジェクト一覧取得 |
| POST | `/api/projects` | プロジェクト作成 |
| PUT | `/api/projects/:id` | プロジェクト更新 |
| DELETE | `/api/projects/:id` | プロジェクト削除（ゴミ箱へ） |
| POST | `/api/projects/:id/restore` | ゴミ箱から復元 |
| DELETE | `/api/projects/:id/permanent` | 完全削除 |
| GET | `/api/projects/trash` | ゴミ箱一覧 |
| DELETE | `/api/projects/trash/empty` | ゴミ箱を空に |

### AI生成 API
| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| GET | `/api/grok/models` | 利用可能モデル一覧 |
| POST | `/api/grok/generate` | テキスト生成 |
| GET | `/api/history` | 生成履歴取得 |

### 執筆相談AI API（v1.3）
| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| POST | `/api/mashiro/chat` | マシロさんとチャット |
| GET | `/api/mashiro/history` | 会話履歴取得 |
| DELETE | `/api/mashiro/history` | 会話履歴削除 |
| GET | `/api/ai-settings` | AI設定取得 |
| PUT | `/api/ai-settings` | AI設定更新 |
| POST | `/api/ai-settings` | AI設定作成 |

### その他 API
| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| GET/POST | `/api/folders` | フォルダ管理 |
| GET/POST | `/api/tags` | タグ管理 |
| PUT | `/api/auth/preferences` | ユーザー設定更新 |
| POST | `/api/auth/invite-code` | 招待コード適用 |
| POST | `/api/komoju/webhook` | KOMOJU決済Webhook |

## 📝 使い方

1. **アカウント作成**: メールアドレス、パスワード、ユーザー名で登録、またはGoogleアカウントでログイン
2. **言語設定**: 設定画面から12言語から選択可能
3. **プロジェクト作成**: 「+」ボタンでジャンルとタイプを選択
4. **執筆**: エディターに文章を入力
5. **AI活用**: 
   - PC: 右パネルのAIアシスタント
   - スマホ: 右下の黄色いボタン
6. **執筆相談**: 「マシロさん」タブでAIと対話形式で相談
7. **AI設定**: 執筆相談ページの⚙️からAIをカスタマイズ
8. **Google連携**: 設定画面からGoogleアカウントを連携/解除
9. **ショートカット**: Ctrl+S で保存、Ctrl+Enter でAI生成
10. **保存**: 自動保存（30秒）or 手動保存ボタン
11. **縦書きモード**: ツールバーのボタンで切替（日本語小説執筆に最適）
12. **インポート**: TXT/RTF/DOCX/DOCファイルを読み込み
13. **エクスポート**: TXT/MD/DOCX/PDF/RTF/HTML形式でダウンロード

## 🔒 セキュリティ

- パスワードはSHA-256+saltでハッシュ化
- セッションはHttpOnly Cookieで管理
- Google OAuth 2.0による安全な認証
- APIキーは環境変数（Cloudflare Secrets）で管理
- Push Protection: GitHubへのシークレット漏洩防止済み

## 🚀 今後の開発予定

### 優先度高
- [ ] バージョン履歴管理（Undo/Redo強化）
- [ ] EPUB出力対応

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
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 📅 最終更新

2025-02-20（v1.4）

## 📋 更新履歴

### v1.4 (2025-02-20)
- ✨ **Googleログイン機能追加**
  - ワンクリックでGoogleアカウントでログイン可能
  - 新規ユーザーは自動でアカウント作成
  - 既存メールアドレスがあれば自動連携
- ✨ **Google連携機能追加**
  - 設定画面から既存アカウントにGoogle連携を追加/解除
  - パスワード未設定ユーザーの連携解除防止（ログイン手段確保）
- 🗄️ usersテーブルにgoogle_idカラム追加
- 🌍 Google連携関連の12言語翻訳対応

### v1.3 (2025-02-18)
- ✨ 執筆相談AIカスタマイズ機能（名前・アイコン・キャラクター設定）
- ✨ 執筆相談AI会話履歴の保存・削除機能
- ✨ 執筆相談AIの多言語対応（12言語）
- ✨ 文字数購入ページの説明改善（AI生成時のみ消費を明記）
- 🗄️ mashiro_history テーブル追加
- 🗄️ ai_consultant_settings テーブル追加

### v1.2 (2025-02-17)
- ✨ ゴミ箱機能追加（30日間保持、復元可能、完全削除）
- ✨ フォルダ連動プロジェクト作成（開いているフォルダに自動配置）
- 🌍 ゴミ箱機能の12言語翻訳対応

### v1.1 (2025-02-14)
- ✨ 縦書きモード追加（英数字正立対応）
- ✨ エクスポート形式拡張（PDF/RTF/HTML追加）
- ✨ インポート機能追加（TXT/RTF/DOCX/DOC対応）
- 🎨 エクスポートモーダルのUIレイアウト改善

### v1.0 (2025-01-18)
- 🎉 初回リリース
- 12言語対応AIライティングエディター
- 3段階AIワークフロー（ネタ考案→プロット→執筆）
- KOMOJU決済統合
- PWA対応

## 📄 ライセンス

© 2025 RATIO Lab., LLC

## 📞 お問い合わせ

RATIO Lab., LLC
- 住所: 〒305-0051 茨城県つくば市二の宮2-7-20-3階
- Email: info@ratio-lab.com
