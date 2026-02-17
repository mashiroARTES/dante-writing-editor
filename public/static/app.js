// DANTE - AI統合ライティングエディター
(function() {
  'use strict';

  // ==================== TRANSLATIONS ====================
  const i18n = {
    ja: {
      appName: 'DANTE',
      appSubtitle: 'AI統合ライティングエディター',
      login: 'ログイン',
      register: '新規登録',
      logout: 'ログアウト',
      email: 'メールアドレス',
      password: 'パスワード',
      username: 'ユーザー名',
      settings: '設定',
      help: '使い方',
      terms: '利用規約',
      privacy: 'プライバシーポリシー',
      deleteAccount: 'アカウント削除',
      projects: 'プロジェクト',
      newProject: '新規プロジェクト',
      idea: 'ネタ考案',
      plot: 'プロット',
      writing: 'ライティング',
      editor: 'エディター',
      generate: 'AI生成',
      generating: '生成中...',
      continue: '続きを書く',
      rewrite: '書き直す',
      expand: '拡張する',
      proofread: '校正する',
      summarize: '要約する',
      translate: '翻訳する',
      titleGenerate: 'タイトル案',
      styleFormal: '敬語に変換',
      styleCasual: 'カジュアルに',
      styleLiterary: '文学的に',
      characters: '文字',
      charactersNoSpace: '文字（空白除く）',
      lines: '行',
      readingTime: '読了時間',
      pages: '枚（400字）',
      save: '保存',
      saving: '保存中...',
      saved: '保存しました',
      delete: '削除',
      cancel: 'キャンセル',
      close: '閉じる',
      copy: 'コピー',
      copied: 'コピーしました',
      insert: '挿入',
      apply: '適用',
      export: '出力',
      history: 'AI生成ログ',
      historyDesc: 'AIが生成したテキストの記録です。プロジェクトに保存するには「保存」ボタンを押してください。',
      model: 'モデル',
      theme: 'テーマ',
      light: 'ライト',
      dark: 'ダーク',
      autoSave: '自動保存',
      autoSaved: '自動保存しました',
      autoSaveEnabled: '自動保存: ON',
      autoSaveDisabled: '自動保存: OFF',
      shortcuts: 'ショートカット',
      shortcutSave: 'Ctrl+S: 保存',
      shortcutGenerate: 'Ctrl+Enter: AI生成',
      shortcutUndo: 'Ctrl+Z: 元に戻す',
      rateLimitExceeded: 'リクエストが多すぎます。しばらくお待ちください',
      exportMarkdown: 'Markdown形式',
      exportText: 'テキスト形式',
      exportDocx: 'Word形式',
      templates: 'テンプレート',
      useTemplate: 'テンプレートを使用',
      folders: 'フォルダ',
      tags: 'タグ',
      addTag: 'タグを追加',
      addFolder: 'フォルダを追加',
      allProjects: 'すべてのプロジェクト',
      noFolder: '未分類',
      renameFolder: 'フォルダ名を変更',
      moveToFolder: 'フォルダに移動',
      removeFromFolder: 'フォルダから削除',
      language: '言語',
      genre: 'ジャンル',
      title: 'タイトル',
      customPrompt: 'AIライターに指示',
      concept: 'コンセプト・企画',
      conceptPlaceholder: '作品のコンセプトや企画内容を入力...',
      plotContent: 'プロット内容',
      useIdeaPlot: 'ネタ考案・プロットの内容を反映',
      savedIdeas: '保存済みアイデア',
      savedPlot: '保存済みプロット',
      selectContext: '参照するプロジェクト',
      selectContextDesc: '生成時に参考にするプロジェクトを選択',
      noContextSelected: '選択なし',
      contextSelected: '件選択中',
      referenceProjects: '参照プロジェクト',
      targetLength: '目標文字数',
      targetLengthNote: '※目安です。AIは指定通りの文字数で出力するとは限りません',
      plan: 'プラン',
      free: '無料',
      standard: 'スタンダード',
      premium: 'プレミアム',
      upgrade: '文字数を購入',
      usage: '使用状況',
      remaining: '残り',
      limitExceeded: '文字数制限に達したらご購入ください',
      pleaseUpgrade: '追加の文字数を購入してください',
      inviteCode: '招待コード',
      inviteCodePlaceholder: '招待コードを入力',
      inviteCodeApply: '適用',
      inviteCodeSuccess: '招待コードが適用されました！全機能が開放されました',
      inviteCodeCharsAdded: '{chars}文字が追加されました！',
      inviteCodeError: '無効な招待コードです',
      inviteCodeAlreadyUsed: 'このコードは既に使用済みです',
      payment: '決済',
      buyNow: '購入する',
      justNow: 'たった今',
      minutesAgo: '分前',
      hoursAgo: '時間前',
      daysAgo: '日前',
      confirmDelete: '本当に削除しますか？',
      confirmDeleteAccount: 'すべてのデータが削除されます。よろしいですか？',
      noProjects: 'プロジェクトがありません',
      selectText: '文章を選択してください',
      enterPrompt: 'プロンプトを入力してください',
      translationTarget: '翻訳先言語',
      agreeTerms: '利用規約とプライバシーポリシーに同意する',
      // Editor
      editorPlaceholder: 'ここに文章を書きます...',
      // Idea mode
      themeKeyword: 'テーマ・キーワード',
      themeKeywordPlaceholder: '例: 時間旅行、禁断の恋',
      conditions: '条件・制約',
      conditionsPlaceholder: '例: 主人公は高校生、舞台は現代日本',
      ideaCount: 'アイデア数',
      ideaCount3: '3つ',
      ideaCount5: '5つ',
      ideaCount10: '10つ',
      generatedIdeas: '生成されたアイデア',
      // Plot mode
      ideaTheme: 'アイデア・テーマ',
      plotPlaceholder: 'プロットを作成したいアイデアや概要を入力',
      detailLevel: '詳細度',
      detailSimple: 'シンプル（概要のみ）',
      detailStandard: '標準',
      detailDetailed: '詳細（各章の説明付き）',
      generatedPlot: '生成されたプロット',
      moveToWriting: 'ライティングへ移行して加筆・修正する',
      // Genres
      novel: '小説', essay: 'エッセイ', blog: 'ブログ', business: 'ビジネス文書',
      academic: '学術・論文', script: '脚本・シナリオ', poetry: '詩・俳句',
      news: 'ニュース記事', review: 'レビュー', sns: 'SNS投稿', emailGenre: 'メール',
      copywriting: 'コピーライティング', technical: '技術文書', fantasy: 'ファンタジー',
      mystery: 'ミステリー', romance: '恋愛', horror: 'ホラー', sf: 'SF', other: 'その他',
      // Vertical writing mode
      verticalWriting: '縦書きモード',
      horizontalWriting: '横書きモード',
      // Export formats
      exportPdf: 'PDF形式',
      exportRtf: 'RTF形式',
      exportEpub: 'EPUB形式',
      exportHtml: 'HTML形式',
      // Import
      import: 'インポート',
      importFile: 'ファイルを選択',
      importSupported: '対応形式: TXT, RTF, DOCX, DOC',
      // Trash
      trash: 'ごみ箱',
      restore: '復元',
      permanentDelete: '完全に削除',
      emptyTrash: 'ごみ箱を空にする',
      daysRemaining: '日後に自動削除',
      noTrashItems: 'ごみ箱は空です',
      confirmEmptyTrash: 'ごみ箱を空にしますか？この操作は取り消せません。',
      confirmPermanentDelete: '完全に削除しますか？この操作は取り消せません。',
      movedToTrash: 'ごみ箱に移動しました',
      restoredFromTrash: '復元しました',
      items: '件',
      trashInfo: 'ゴミ箱のアイテムは30日後に自動的に完全削除されます',
      trashEmptied: 'ごみ箱を空にしました',
      permanentlyDeleted: '完全に削除しました',
      untitled: '無題',
      // Mashiro AI Consultant
      mashiroConsultant: '執筆相談',
      mashiroGreeting: 'こんにちは！マシロです。執筆のお手伝いをさせてください。何でもお気軽にご相談くださいね。',
      mashiroPlaceholder: 'マシロさんに相談する...',
      mashiroSend: '送信',
      mashiroVoiceInput: '音声入力',
      mashiroListening: '聞いています...',
      // AI Options Modal
      aiOptionsTitle: 'AI生成オプション',
      additionalInstructions: '追加の指示（任意）',
      additionalInstructionsPlaceholder: '例: もっと詳細に、感情豊かに、会話を増やして...',
      executeGenerate: '生成実行'
    },
    en: {
      appName: 'DANTE',
      appSubtitle: 'AI Integrated Writing Editor',
      login: 'Login',
      register: 'Sign Up',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      username: 'Username',
      settings: 'Settings',
      help: 'Help',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      deleteAccount: 'Delete Account',
      projects: 'Projects',
      newProject: 'New Project',
      idea: 'Brainstorm',
      plot: 'Plot',
      writing: 'Writing',
      editor: 'Editor',
      generate: 'AI Generate',
      generating: 'Generating...',
      continue: 'Continue',
      rewrite: 'Rewrite',
      expand: 'Expand',
      proofread: 'Proofread',
      summarize: 'Summarize',
      translate: 'Translate',
      titleGenerate: 'Title Ideas',
      styleFormal: 'Formal Style',
      styleCasual: 'Casual Style',
      styleLiterary: 'Literary Style',
      characters: 'chars',
      charactersNoSpace: 'chars (no space)',
      lines: 'lines',
      readingTime: 'Reading time',
      pages: 'pages (400 chars)',
      save: 'Save',
      saving: 'Saving...',
      saved: 'Saved',
      delete: 'Delete',
      cancel: 'Cancel',
      close: 'Close',
      copy: 'Copy',
      copied: 'Copied',
      insert: 'Insert',
      apply: 'Apply',
      export: 'Export',
      history: 'AI Log',
      historyDesc: 'Records of AI-generated text. Press Save to save to your project.',
      model: 'Model',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      autoSave: 'Auto Save',
      autoSaved: 'Auto saved',
      autoSaveEnabled: 'Auto Save: ON',
      autoSaveDisabled: 'Auto Save: OFF',
      shortcuts: 'Shortcuts',
      shortcutSave: 'Ctrl+S: Save',
      shortcutGenerate: 'Ctrl+Enter: Generate',
      shortcutUndo: 'Ctrl+Z: Undo',
      rateLimitExceeded: 'Too many requests. Please wait a moment',
      exportMarkdown: 'Markdown',
      exportText: 'Plain Text',
      exportDocx: 'Word Document',
      templates: 'Templates',
      useTemplate: 'Use Template',
      folders: 'Folders',
      tags: 'Tags',
      addTag: 'Add Tag',
      addFolder: 'Add Folder',
      allProjects: 'All Projects',
      noFolder: 'Uncategorized',
      renameFolder: 'Rename Folder',
      moveToFolder: 'Move to Folder',
      removeFromFolder: 'Remove from Folder',
      language: 'Language',
      genre: 'Genre',
      title: 'Title',
      customPrompt: 'Instructions for AI Writer',
      concept: 'Concept & Planning',
      conceptPlaceholder: 'Enter your concept or planning details...',
      plotContent: 'Plot Content',
      useIdeaPlot: 'Apply Idea & Plot content',
      savedIdeas: 'Saved Ideas',
      savedPlot: 'Saved Plot',
      selectContext: 'Reference Projects',
      selectContextDesc: 'Select projects to use as context',
      noContextSelected: 'None selected',
      contextSelected: 'selected',
      referenceProjects: 'Reference Projects',
      targetLength: 'Target Length',
      targetLengthNote: '*Approximate. AI may not output the exact specified length',
      plan: 'Plan',
      free: 'Free',
      standard: 'Standard',
      premium: 'Premium',
      upgrade: 'Buy Characters',
      usage: 'Usage',
      remaining: 'Remaining',
      limitExceeded: 'Purchase when you reach the character limit',
      pleaseUpgrade: 'Purchase additional characters to continue',
      inviteCode: 'Invite Code',
      inviteCodePlaceholder: 'Enter invite code',
      inviteCodeApply: 'Apply',
      inviteCodeSuccess: 'Invite code applied! All features unlocked',
      inviteCodeCharsAdded: '{chars} characters added!',
      inviteCodeError: 'Invalid invite code',
      inviteCodeAlreadyUsed: 'This code has already been used',
      payment: 'Payment',
      buyNow: 'Buy Now',
      justNow: 'Just now',
      minutesAgo: 'm ago',
      hoursAgo: 'h ago',
      daysAgo: 'd ago',
      confirmDelete: 'Are you sure you want to delete?',
      confirmDeleteAccount: 'All data will be deleted. Continue?',
      noProjects: 'No projects',
      selectText: 'Please select text',
      enterPrompt: 'Please enter a prompt',
      translationTarget: 'Target Language',
      agreeTerms: 'I agree to the Terms of Service and Privacy Policy',
      // Editor
      editorPlaceholder: 'Write your text here...',
      // Idea mode
      themeKeyword: 'Theme / Keywords',
      themeKeywordPlaceholder: 'e.g., Time travel, Forbidden love',
      conditions: 'Conditions / Constraints',
      conditionsPlaceholder: 'e.g., Protagonist is a high schooler, Set in modern Japan',
      ideaCount: 'Number of Ideas',
      ideaCount3: '3 ideas',
      ideaCount5: '5 ideas',
      ideaCount10: '10 ideas',
      generatedIdeas: 'Generated Ideas',
      // Plot mode
      ideaTheme: 'Idea / Theme',
      plotPlaceholder: 'Enter the idea or outline you want to create a plot for',
      detailLevel: 'Detail Level',
      detailSimple: 'Simple (Overview only)',
      detailStandard: 'Standard',
      detailDetailed: 'Detailed (With chapter descriptions)',
      generatedPlot: 'Generated Plot',
      moveToWriting: 'Move to Writing to Edit & Expand',
      // Genres
      novel: 'Novel', essay: 'Essay', blog: 'Blog', business: 'Business',
      academic: 'Academic', script: 'Script', poetry: 'Poetry',
      news: 'News', review: 'Review', sns: 'SNS', emailGenre: 'Email',
      copywriting: 'Copywriting', technical: 'Technical', fantasy: 'Fantasy',
      mystery: 'Mystery', romance: 'Romance', horror: 'Horror', sf: 'Sci-Fi', other: 'Other',
      // Vertical writing mode
      verticalWriting: 'Vertical Mode',
      horizontalWriting: 'Horizontal Mode',
      // Export formats
      exportPdf: 'PDF',
      exportRtf: 'RTF',
      exportEpub: 'EPUB',
      exportHtml: 'HTML',
      // Import
      import: 'Import',
      importFile: 'Select File',
      importSupported: 'Supported: TXT, RTF, DOCX, DOC',
      // Trash
      trash: 'Trash',
      restore: 'Restore',
      permanentDelete: 'Delete Permanently',
      emptyTrash: 'Empty Trash',
      daysRemaining: 'days until auto-delete',
      noTrashItems: 'Trash is empty',
      confirmEmptyTrash: 'Empty trash? This cannot be undone.',
      confirmPermanentDelete: 'Delete permanently? This cannot be undone.',
      movedToTrash: 'Moved to trash',
      restoredFromTrash: 'Restored',
      items: 'items',
      trashInfo: 'Items in trash will be automatically deleted after 30 days',
      trashEmptied: 'Trash emptied',
      permanentlyDeleted: 'Permanently deleted',
      untitled: 'Untitled',
      // Mashiro AI Consultant
      mashiroConsultant: 'Writing Consultant',
      mashiroGreeting: 'Hello! I\'m Mashiro. Let me help you with your writing. Feel free to ask me anything!',
      mashiroPlaceholder: 'Ask Mashiro...',
      mashiroSend: 'Send',
      mashiroVoiceInput: 'Voice Input',
      mashiroListening: 'Listening...',
      // AI Options Modal
      aiOptionsTitle: 'AI Generation Options',
      additionalInstructions: 'Additional Instructions (optional)',
      additionalInstructionsPlaceholder: 'e.g., More detail, more emotional, add more dialogue...',
      executeGenerate: 'Generate'
    },
    zh: {
      appName: 'DANTE',
      appSubtitle: 'AI综合写作编辑器',
      login: '登录',
      register: '注册',
      logout: '退出',
      email: '邮箱',
      password: '密码',
      username: '用户名',
      settings: '设置',
      help: '帮助',
      terms: '服务条款',
      privacy: '隐私政策',
      deleteAccount: '删除账户',
      projects: '项目',
      newProject: '新建项目',
      idea: '创意',
      plot: '大纲',
      writing: '写作',
      editor: '编辑器',
      generate: 'AI生成',
      generating: '生成中...',
      continue: '续写',
      rewrite: '重写',
      expand: '扩展',
      proofread: '校对',
      summarize: '摘要',
      translate: '翻译',
      titleGenerate: '标题建议',
      styleFormal: '正式风格',
      styleCasual: '休闲风格',
      styleLiterary: '文学风格',
      characters: '字符',
      charactersNoSpace: '字符（无空格）',
      lines: '行',
      readingTime: '阅读时间',
      pages: '页（400字）',
      save: '保存',
      saving: '保存中...',
      saved: '已保存',
      delete: '删除',
      cancel: '取消',
      close: '关闭',
      copy: '复制',
      copied: '已复制',
      insert: '插入',
      apply: '应用',
      export: '导出',
      history: 'AI生成日志',
      historyDesc: 'AI生成文本的记录。按"保存"可保存到项目。',
      model: '模型',
      theme: '主题',
      light: '浅色',
      dark: '深色',
      autoSave: '自动保存',
      autoSaved: '已自动保存',
      autoSaveEnabled: '自动保存: 开',
      autoSaveDisabled: '自动保存: 关',
      shortcuts: '快捷键',
      shortcutSave: 'Ctrl+S: 保存',
      shortcutGenerate: 'Ctrl+Enter: AI生成',
      shortcutUndo: 'Ctrl+Z: 撤销',
      rateLimitExceeded: '请求过多，请稍候',
      exportMarkdown: 'Markdown格式',
      exportText: '纯文本',
      exportDocx: 'Word文档',
      templates: '模板',
      useTemplate: '使用模板',
      folders: '文件夹',
      tags: '标签',
      addTag: '添加标签',
      addFolder: '添加文件夹',
      allProjects: '所有项目',
      noFolder: '未分类',
      renameFolder: '重命名文件夹',
      moveToFolder: '移动到文件夹',
      removeFromFolder: '从文件夹中移除',
      language: '语言',
      genre: '类型',
      title: '标题',
      customPrompt: 'AI写作指令',
      concept: '概念与企划',
      conceptPlaceholder: '输入您的概念或企划内容...',
      plotContent: '情节内容',
      useIdeaPlot: '应用创意和情节内容',
      savedIdeas: '已保存的创意',
      savedPlot: '已保存的情节',
      selectContext: '参考项目',
      selectContextDesc: '选择作为上下文的项目',
      noContextSelected: '未选择',
      contextSelected: '已选择',
      referenceProjects: '参考项目',
      targetLength: '目标长度',
      targetLengthNote: '*仅供参考。AI可能不会按照指定的字符数输出',
      plan: '方案',
      free: '免费',
      standard: '标准',
      premium: '高级',
      upgrade: '购买字数',
      usage: '使用情况',
      remaining: '剩余',
      limitExceeded: '达到字符限制时请购买',
      pleaseUpgrade: '请购买额外字数以继续',
      inviteCode: '邀请码',
      inviteCodePlaceholder: '输入邀请码',
      inviteCodeApply: '应用',
      inviteCodeSuccess: '邀请码已应用！所有功能已解锁',
      inviteCodeCharsAdded: '已添加{chars}个字符！',
      inviteCodeError: '无效的邀请码',
      inviteCodeAlreadyUsed: '此码已被使用',
      payment: '支付',
      buyNow: '立即购买',
      justNow: '刚刚',
      minutesAgo: '分钟前',
      hoursAgo: '小时前',
      daysAgo: '天前',
      confirmDelete: '确定要删除吗？',
      confirmDeleteAccount: '所有数据将被删除，确定吗？',
      noProjects: '暂无项目',
      selectText: '请选择文本',
      enterPrompt: '请输入提示',
      translationTarget: '目标语言',
      agreeTerms: '我同意服务条款和隐私政策',
      // Editor
      editorPlaceholder: '在这里写作...',
      // Idea mode
      themeKeyword: '主题/关键词',
      themeKeywordPlaceholder: '例如：时间旅行、禁忌之恋',
      conditions: '条件/限制',
      conditionsPlaceholder: '例如：主人公是高中生，背景是现代日本',
      ideaCount: '创意数量',
      ideaCount3: '3个',
      ideaCount5: '5个',
      ideaCount10: '10个',
      generatedIdeas: '生成的创意',
      // Plot mode
      ideaTheme: '创意/主题',
      plotPlaceholder: '输入您想创建大纲的创意或概要',
      detailLevel: '详细程度',
      detailSimple: '简单（仅概要）',
      detailStandard: '标准',
      detailDetailed: '详细（含章节说明）',
      generatedPlot: '生成的大纲',
      moveToWriting: '移至写作模式进行编辑和扩展',
      // Genres
      novel: '小说', essay: '散文', blog: '博客', business: '商务',
      academic: '学术', script: '剧本', poetry: '诗歌',
      news: '新闻', review: '评论', sns: '社交', emailGenre: '邮件',
      copywriting: '文案', technical: '技术', fantasy: '奇幻',
      mystery: '悬疑', romance: '言情', horror: '恐怖', sf: '科幻', other: '其他',
      // Vertical writing mode
      verticalWriting: '竖排模式',
      horizontalWriting: '横排模式',
      // Export formats
      exportPdf: 'PDF格式',
      exportRtf: 'RTF格式',
      exportEpub: 'EPUB格式',
      exportHtml: 'HTML格式',
      // Import
      import: '导入',
      importFile: '选择文件',
      importSupported: '支持格式: TXT, RTF, DOCX, DOC',
      // Trash
      trash: '回收站',
      restore: '恢复',
      permanentDelete: '彻底删除',
      emptyTrash: '清空回收站',
      daysRemaining: '天后自动删除',
      noTrashItems: '回收站为空',
      confirmEmptyTrash: '清空回收站？此操作不可撤销。',
      confirmPermanentDelete: '彻底删除？此操作不可撤销。',
      movedToTrash: '已移至回收站',
      restoredFromTrash: '已恢复',
      items: '项',
      trashInfo: '回收站中的项目将30天后自动删除',
      trashEmptied: '已清空回收站',
      permanentlyDeleted: '已彻底删除',
      untitled: '无标题'
    },
    ko: {
      appName: 'DANTE',
      appSubtitle: 'AI 통합 글쓰기 에디터',
      login: '로그인',
      register: '회원가입',
      logout: '로그아웃',
      email: '이메일',
      password: '비밀번호',
      username: '사용자명',
      settings: '설정',
      help: '도움말',
      terms: '이용약관',
      privacy: '개인정보처리방침',
      deleteAccount: '계정 삭제',
      projects: '프로젝트',
      newProject: '새 프로젝트',
      idea: '아이디어',
      plot: '플롯',
      writing: '글쓰기',
      editor: '에디터',
      generate: 'AI 생성',
      generating: '생성 중...',
      continue: '이어쓰기',
      rewrite: '다시쓰기',
      expand: '확장',
      proofread: '교정',
      summarize: '요약',
      translate: '번역',
      titleGenerate: '제목 제안',
      styleFormal: '격식체',
      styleCasual: '비격식체',
      styleLiterary: '문학체',
      characters: '자',
      charactersNoSpace: '자 (공백제외)',
      lines: '줄',
      readingTime: '읽기 시간',
      pages: '매 (400자)',
      save: '저장',
      saving: '저장 중...',
      saved: '저장됨',
      delete: '삭제',
      cancel: '취소',
      close: '닫기',
      copy: '복사',
      copied: '복사됨',
      insert: '삽입',
      apply: '적용',
      export: '내보내기',
      history: 'AI 로그',
      historyDesc: 'AI가 생성한 텍스트 기록입니다. 프로젝트에 저장하려면 "저장"을 누르세요.',
      model: '모델',
      theme: '테마',
      light: '라이트',
      dark: '다크',
      autoSave: '자동 저장',
      autoSaved: '자동 저장됨',
      autoSaveEnabled: '자동 저장: ON',
      autoSaveDisabled: '자동 저장: OFF',
      shortcuts: '단축키',
      shortcutSave: 'Ctrl+S: 저장',
      shortcutGenerate: 'Ctrl+Enter: AI 생성',
      shortcutUndo: 'Ctrl+Z: 실행 취소',
      rateLimitExceeded: '요청이 너무 많습니다. 잠시 기다려 주세요',
      exportMarkdown: 'Markdown',
      exportText: '텍스트',
      exportDocx: 'Word 문서',
      templates: '템플릿',
      useTemplate: '템플릿 사용',
      folders: '폴더',
      tags: '태그',
      addTag: '태그 추가',
      addFolder: '폴더 추가',
      allProjects: '모든 프로젝트',
      noFolder: '미분류',
      renameFolder: '폴더 이름 변경',
      moveToFolder: '폴더로 이동',
      removeFromFolder: '폴더에서 제거',
      language: '언어',
      genre: '장르',
      title: '제목',
      customPrompt: 'AI 작가 지시',
      concept: '콘셉트 및 기획',
      conceptPlaceholder: '콘셉트나 기획 내용을 입력...',
      plotContent: '플롯 내용',
      useIdeaPlot: '아이디어 및 플롯 내용 적용',
      savedIdeas: '저장된 아이디어',
      savedPlot: '저장된 플롯',
      selectContext: '참조 프로젝트',
      selectContextDesc: '컨텍스트로 사용할 프로젝트 선택',
      noContextSelected: '선택 없음',
      contextSelected: '선택됨',
      referenceProjects: '참조 프로젝트',
      targetLength: '목표 길이',
      targetLengthNote: '*대략적인 수치입니다. AI가 지정된 길이대로 출력하지 않을 수 있습니다',
      plan: '플랜',
      free: '무료',
      standard: '스탠다드',
      premium: '프리미엄',
      upgrade: '글자 구매',
      usage: '사용량',
      remaining: '남은',
      limitExceeded: '글자 수 제한에 도달하면 구매해 주세요',
      pleaseUpgrade: '추가 글자를 구매하세요',
      inviteCode: '초대 코드',
      inviteCodePlaceholder: '초대 코드 입력',
      inviteCodeApply: '적용',
      inviteCodeSuccess: '초대 코드가 적용되었습니다! 모든 기능이 해제되었습니다',
      inviteCodeCharsAdded: '{chars}자가 추가되었습니다!',
      inviteCodeError: '유효하지 않은 초대 코드입니다',
      inviteCodeAlreadyUsed: '이 코드는 이미 사용되었습니다',
      payment: '결제',
      buyNow: '구매하기',
      justNow: '방금',
      minutesAgo: '분 전',
      hoursAgo: '시간 전',
      daysAgo: '일 전',
      confirmDelete: '정말 삭제하시겠습니까?',
      confirmDeleteAccount: '모든 데이터가 삭제됩니다. 계속하시겠습니까?',
      noProjects: '프로젝트 없음',
      selectText: '텍스트를 선택해 주세요',
      enterPrompt: '프롬프트를 입력해 주세요',
      translationTarget: '번역 대상 언어',
      agreeTerms: '이용약관 및 개인정보처리방침에 동의합니다',
      // Editor
      editorPlaceholder: '여기에 글을 작성하세요...',
      // Idea mode
      themeKeyword: '테마/키워드',
      themeKeywordPlaceholder: '예: 시간여행, 금지된 사랑',
      conditions: '조건/제약',
      conditionsPlaceholder: '예: 주인공은 고등학생, 배경은 현대 일본',
      ideaCount: '아이디어 수',
      ideaCount3: '3개',
      ideaCount5: '5개',
      ideaCount10: '10개',
      generatedIdeas: '생성된 아이디어',
      // Plot mode
      ideaTheme: '아이디어/테마',
      plotPlaceholder: '플롯을 만들고 싶은 아이디어나 개요를 입력하세요',
      detailLevel: '상세 수준',
      detailSimple: '간단 (개요만)',
      detailStandard: '표준',
      detailDetailed: '상세 (챕터 설명 포함)',
      generatedPlot: '생성된 플롯',
      moveToWriting: '라이팅으로 이동하여 편집 및 확장',
      // Genres
      novel: '소설', essay: '에세이', blog: '블로그', business: '비즈니스',
      academic: '학술', script: '시나리오', poetry: '시',
      news: '뉴스', review: '리뷰', sns: 'SNS', emailGenre: '이메일',
      copywriting: '카피라이팅', technical: '기술', fantasy: '판타지',
      mystery: '미스터리', romance: '로맨스', horror: '호러', sf: 'SF', other: '기타',
      // Vertical writing mode
      verticalWriting: '세로쓰기',
      horizontalWriting: '가로쓰기',
      // Export formats
      exportPdf: 'PDF',
      exportRtf: 'RTF',
      exportEpub: 'EPUB',
      exportHtml: 'HTML',
      // Import
      import: '가져오기',
      importFile: '파일 선택',
      importSupported: '지원 형식: TXT, RTF, DOCX, DOC',
      // Trash
      trash: '휴지통',
      restore: '복원',
      permanentDelete: '완전히 삭제',
      emptyTrash: '휴지통 비우기',
      daysRemaining: '일 후 자동 삭제',
      noTrashItems: '휴지통이 비어 있습니다',
      confirmEmptyTrash: '휴지통을 비우시겠습니까? 이 작업은 취소할 수 없습니다.',
      confirmPermanentDelete: '완전히 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.',
      movedToTrash: '휴지통으로 이동됨',
      restoredFromTrash: '복원됨',
      items: '개',
      trashInfo: '휴지통의 항목은 30일 후 자동 삭제됩니다',
      trashEmptied: '휴지통을 비웠습니다',
      permanentlyDeleted: '영구 삭제됨',
      untitled: '제목 없음'
    },
    it: {
      appName: 'DANTE',
      appSubtitle: 'Editor di Scrittura Integrato con IA',
      login: 'Accedi',
      register: 'Registrati',
      logout: 'Esci',
      email: 'Email',
      password: 'Password',
      username: 'Nome utente',
      settings: 'Impostazioni',
      help: 'Guida',
      terms: 'Termini di Servizio',
      privacy: 'Informativa sulla Privacy',
      deleteAccount: 'Elimina Account',
      projects: 'Progetti',
      newProject: 'Nuovo Progetto',
      idea: 'Brainstorming',
      plot: 'Trama',
      writing: 'Scrittura',
      editor: 'Editor',
      generate: 'Genera con IA',
      generating: 'Generazione...',
      continue: 'Continua',
      rewrite: 'Riscrivi',
      expand: 'Espandi',
      proofread: 'Correggi',
      summarize: 'Riassumi',
      translate: 'Traduci',
      titleGenerate: 'Suggerisci Titoli',
      styleFormal: 'Stile Formale',
      styleCasual: 'Stile Informale',
      styleLiterary: 'Stile Letterario',
      characters: 'caratteri',
      charactersNoSpace: 'caratteri (senza spazi)',
      lines: 'righe',
      readingTime: 'Tempo di lettura',
      pages: 'pagine (400 car.)',
      save: 'Salva',
      saving: 'Salvataggio...',
      saved: 'Salvato',
      delete: 'Elimina',
      cancel: 'Annulla',
      close: 'Chiudi',
      copy: 'Copia',
      copied: 'Copiato',
      insert: 'Inserisci',
      apply: 'Applica',
      export: 'Esporta',
      history: 'Log AI',
      historyDesc: "Record dei testi generati dall'AI. Premi Salva per salvare nel progetto.",
      model: 'Modello',
      theme: 'Tema',
      light: 'Chiaro',
      dark: 'Scuro',
      autoSave: 'Salvataggio Auto',
      autoSaved: 'Salvato automaticamente',
      autoSaveEnabled: 'Auto Save: ON',
      autoSaveDisabled: 'Auto Save: OFF',
      shortcuts: 'Scorciatoie',
      shortcutSave: 'Ctrl+S: Salva',
      shortcutGenerate: 'Ctrl+Enter: Genera',
      shortcutUndo: 'Ctrl+Z: Annulla',
      rateLimitExceeded: 'Troppe richieste. Attendere un momento',
      exportMarkdown: 'Markdown',
      exportText: 'Testo',
      exportDocx: 'Documento Word',
      templates: 'Modelli',
      useTemplate: 'Usa Modello',
      folders: 'Cartelle',
      tags: 'Tag',
      addTag: 'Aggiungi Tag',
      addFolder: 'Aggiungi Cartella',
      allProjects: 'Tutti i Progetti',
      noFolder: 'Non classificato',
      renameFolder: 'Rinomina Cartella',
      moveToFolder: 'Sposta in Cartella',
      removeFromFolder: 'Rimuovi dalla Cartella',
      language: 'Lingua',
      genre: 'Genere',
      title: 'Titolo',
      customPrompt: 'Istruzioni per AI Writer',
      concept: 'Concetto e Pianificazione',
      conceptPlaceholder: 'Inserisci il tuo concetto o piano...',
      plotContent: 'Contenuto della Trama',
      useIdeaPlot: 'Applica Idea e Trama',
      savedIdeas: 'Idee Salvate',
      savedPlot: 'Trama Salvata',
      selectContext: 'Progetti di Riferimento',
      selectContextDesc: 'Seleziona progetti da usare come contesto',
      noContextSelected: 'Nessuna selezione',
      contextSelected: 'selezionati',
      referenceProjects: 'Progetti di Riferimento',
      targetLength: 'Lunghezza Target',
      targetLengthNote: '*Approssimativo. L\'AI potrebbe non produrre la lunghezza esatta specificata',
      plan: 'Piano',
      free: 'Gratuito',
      standard: 'Standard',
      premium: 'Premium',
      upgrade: 'Acquista Caratteri',
      usage: 'Utilizzo',
      remaining: 'Rimanenti',
      limitExceeded: 'Acquista quando raggiungi il limite',
      pleaseUpgrade: 'Acquista caratteri aggiuntivi per continuare',
      purchaseCharacters: 'Acquista Caratteri',
      inviteCode: 'Codice Invito',
      inviteCodePlaceholder: 'Inserisci codice invito',
      inviteCodeApply: 'Applica',
      inviteCodeSuccess: 'Codice invito applicato! Tutte le funzioni sbloccate',
      inviteCodeCharsAdded: '{chars} caratteri aggiunti!',
      inviteCodeError: 'Codice invito non valido',
      inviteCodeAlreadyUsed: 'Questo codice è già stato utilizzato',
      payment: 'Pagamento',
      buyNow: 'Acquista Ora',
      justNow: 'Adesso',
      minutesAgo: 'm fa',
      hoursAgo: 'h fa',
      daysAgo: 'g fa',
      confirmDelete: 'Sei sicuro di voler eliminare?',
      confirmDeleteAccount: 'Tutti i dati verranno eliminati. Continuare?',
      noProjects: 'Nessun progetto',
      selectText: 'Seleziona il testo',
      enterPrompt: 'Inserisci un prompt',
      translationTarget: 'Lingua di Destinazione',
      agreeTerms: 'Accetto i Termini di Servizio e l\'Informativa sulla Privacy',
      // Editor
      editorPlaceholder: 'Scrivi il tuo testo qui...',
      // Idea mode
      themeKeyword: 'Tema / Parole chiave',
      themeKeywordPlaceholder: 'es. Viaggio nel tempo, Amore proibito',
      conditions: 'Condizioni / Vincoli',
      conditionsPlaceholder: 'es. Il protagonista è uno studente, Ambientato in Giappone moderno',
      ideaCount: 'Numero di Idee',
      ideaCount3: '3 idee',
      ideaCount5: '5 idee',
      ideaCount10: '10 idee',
      generatedIdeas: 'Idee Generate',
      // Plot mode
      ideaTheme: 'Idea / Tema',
      plotPlaceholder: 'Inserisci l\'idea o la bozza per cui vuoi creare una trama',
      detailLevel: 'Livello di Dettaglio',
      detailSimple: 'Semplice (Solo panoramica)',
      detailStandard: 'Standard',
      detailDetailed: 'Dettagliato (Con descrizione capitoli)',
      generatedPlot: 'Trama Generata',
      moveToWriting: 'Passa alla Scrittura per Modificare ed Espandere',
      // Genres
      novel: 'Romanzo', essay: 'Saggio', blog: 'Blog', business: 'Business',
      academic: 'Accademico', script: 'Sceneggiatura', poetry: 'Poesia',
      news: 'Notizie', review: 'Recensione', sns: 'Social', emailGenre: 'Email',
      copywriting: 'Copywriting', technical: 'Tecnico', fantasy: 'Fantasy',
      mystery: 'Giallo', romance: 'Romantico', horror: 'Horror', sf: 'Fantascienza', other: 'Altro',
      // Vertical writing mode
      verticalWriting: 'Scrittura Verticale',
      horizontalWriting: 'Scrittura Orizzontale',
      // Export formats
      exportPdf: 'PDF',
      exportRtf: 'RTF',
      exportEpub: 'EPUB',
      exportHtml: 'HTML',
      // Import
      import: 'Importa',
      importFile: 'Seleziona File',
      importSupported: 'Supportati: TXT, RTF, DOCX, DOC',
      // Trash
      trash: 'Cestino',
      restore: 'Ripristina',
      permanentDelete: 'Elimina definitivamente',
      emptyTrash: 'Svuota cestino',
      daysRemaining: 'giorni alla cancellazione',
      noTrashItems: 'Il cestino è vuoto',
      confirmEmptyTrash: 'Svuotare il cestino? Non può essere annullato.',
      confirmPermanentDelete: 'Eliminare definitivamente? Non può essere annullato.',
      movedToTrash: 'Spostato nel cestino',
      restoredFromTrash: 'Ripristinato',
      items: 'elementi',
      trashInfo: 'Gli elementi nel cestino verranno eliminati automaticamente dopo 30 giorni',
      trashEmptied: 'Cestino svuotato',
      permanentlyDeleted: 'Eliminato definitivamente',
      untitled: 'Senza titolo'
    },
    hi: {
      appName: 'DANTE',
      appSubtitle: 'AI एकीकृत लेखन संपादक',
      login: 'लॉगिन',
      register: 'साइन अप',
      logout: 'लॉगआउट',
      email: 'ईमेल',
      password: 'पासवर्ड',
      username: 'उपयोगकर्ता नाम',
      settings: 'सेटिंग्स',
      help: 'मदद',
      terms: 'सेवा की शर्तें',
      privacy: 'गोपनीयता नीति',
      deleteAccount: 'खाता हटाएं',
      projects: 'प्रोजेक्ट्स',
      newProject: 'नया प्रोजेक्ट',
      idea: 'विचार',
      plot: 'कथानक',
      writing: 'लेखन',
      editor: 'संपादक',
      generate: 'AI जनरेट',
      generating: 'जनरेट हो रहा है...',
      continue: 'जारी रखें',
      rewrite: 'पुनर्लेखन',
      expand: 'विस्तार',
      proofread: 'प्रूफरीड',
      summarize: 'सारांश',
      translate: 'अनुवाद',
      titleGenerate: 'शीर्षक सुझाव',
      styleFormal: 'औपचारिक शैली',
      styleCasual: 'अनौपचारिक शैली',
      styleLiterary: 'साहित्यिक शैली',
      characters: 'अक्षर',
      charactersNoSpace: 'अक्षर (रिक्त स्थान छोड़कर)',
      lines: 'पंक्तियाँ',
      readingTime: 'पढ़ने का समय',
      pages: 'पृष्ठ (400 अक्षर)',
      save: 'सहेजें',
      saving: 'सहेजा जा रहा है...',
      saved: 'सहेजा गया',
      delete: 'हटाएं',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      copy: 'कॉपी',
      copied: 'कॉपी हो गया',
      insert: 'डालें',
      apply: 'लागू करें',
      export: 'निर्यात',
      history: 'AI लॉग',
      historyDesc: 'AI द्वारा जनरेट किया गया टेक्स्ट रिकॉर्ड। प्रोजेक्ट में सेव करने के लिए "सेव" दबाएं।',
      model: 'मॉडल',
      theme: 'थीम',
      light: 'लाइट',
      dark: 'डार्क',
      autoSave: 'स्वतः सहेजें',
      autoSaved: 'स्वतः सहेजा गया',
      autoSaveEnabled: 'स्वतः सहेजें: ON',
      autoSaveDisabled: 'स्वतः सहेजें: OFF',
      shortcuts: 'शॉर्टकट',
      shortcutSave: 'Ctrl+S: सहेजें',
      shortcutGenerate: 'Ctrl+Enter: AI जनरेट',
      shortcutUndo: 'Ctrl+Z: अनडू',
      rateLimitExceeded: 'बहुत अधिक अनुरोध। कृपया प्रतीक्षा करें',
      exportMarkdown: 'Markdown',
      exportText: 'टेक्स्ट',
      exportDocx: 'Word दस्तावेज़',
      templates: 'टेम्पलेट',
      useTemplate: 'टेम्पलेट उपयोग करें',
      folders: 'फ़ोल्डर',
      tags: 'टैग',
      addTag: 'टैग जोड़ें',
      addFolder: 'फ़ोल्डर जोड़ें',
      allProjects: 'सभी प्रोजेक्ट',
      noFolder: 'अवर्गीकृत',
      renameFolder: 'फ़ोल्डर का नाम बदलें',
      moveToFolder: 'फ़ोल्डर में ले जाएं',
      removeFromFolder: 'फ़ोल्डर से हटाएं',
      language: 'भाषा',
      genre: 'विधा',
      title: 'शीर्षक',
      customPrompt: 'AI लेखक को निर्देश',
      concept: 'अवधारणा और योजना',
      conceptPlaceholder: 'अपनी अवधारणा या योजना दर्ज करें...',
      plotContent: 'कथानक सामग्री',
      useIdeaPlot: 'विचार और कथानक लागू करें',
      savedIdeas: 'सहेजे गए विचार',
      savedPlot: 'सहेजा गया कथानक',
      selectContext: 'संदर्भ प्रोजेक्ट',
      selectContextDesc: 'संदर्भ के रूप में उपयोग करने के लिए प्रोजेक्ट चुनें',
      noContextSelected: 'कोई चयन नहीं',
      contextSelected: 'चयनित',
      referenceProjects: 'संदर्भ प्रोजेक्ट',
      targetLength: 'लक्ष्य लंबाई',
      targetLengthNote: '*अनुमानित। AI निर्दिष्ट लंबाई के अनुसार आउटपुट नहीं दे सकता है',
      plan: 'योजना',
      free: 'निःशुल्क',
      standard: 'स्टैंडर्ड',
      premium: 'प्रीमियम',
      upgrade: 'अक्षर खरीदें',
      usage: 'उपयोग',
      remaining: 'शेष',
      limitExceeded: 'सीमा पूरी होने पर खरीदें',
      pleaseUpgrade: 'जारी रखने के लिए अतिरिक्त अक्षर खरीदें',
      purchaseCharacters: 'अक्षर खरीदें',
      inviteCode: 'आमंत्रण कोड',
      inviteCodePlaceholder: 'आमंत्रण कोड दर्ज करें',
      inviteCodeApply: 'लागू करें',
      inviteCodeSuccess: 'आमंत्रण कोड लागू! सभी सुविधाएं अनलॉक',
      inviteCodeCharsAdded: '{chars} अक्षर जोड़े गए!',
      inviteCodeError: 'अमान्य आमंत्रण कोड',
      inviteCodeAlreadyUsed: 'यह कोड पहले ही उपयोग किया जा चुका है',
      payment: 'भुगतान',
      buyNow: 'अभी खरीदें',
      justNow: 'अभी',
      minutesAgo: 'मि. पहले',
      hoursAgo: 'घं. पहले',
      daysAgo: 'दि. पहले',
      confirmDelete: 'क्या आप वाकई हटाना चाहते हैं?',
      confirmDeleteAccount: 'सभी डेटा हटा दिया जाएगा। जारी रखें?',
      noProjects: 'कोई प्रोजेक्ट नहीं',
      selectText: 'कृपया टेक्स्ट चुनें',
      enterPrompt: 'कृपया प्रॉम्प्ट दर्ज करें',
      translationTarget: 'लक्ष्य भाषा',
      agreeTerms: 'मैं सेवा की शर्तों और गोपनीयता नीति से सहमत हूं',
      // Editor
      editorPlaceholder: 'यहाँ अपना टेक्स्ट लिखें...',
      // Idea mode
      themeKeyword: 'थीम / कीवर्ड',
      themeKeywordPlaceholder: 'उदा. समय यात्रा, वर्जित प्रेम',
      conditions: 'शर्तें / प्रतिबंध',
      conditionsPlaceholder: 'उदा. नायक एक हाई स्कूल छात्र है, आधुनिक जापान में सेट',
      ideaCount: 'विचारों की संख्या',
      ideaCount3: '3 विचार',
      ideaCount5: '5 विचार',
      ideaCount10: '10 विचार',
      generatedIdeas: 'उत्पन्न विचार',
      // Plot mode
      ideaTheme: 'विचार / थीम',
      plotPlaceholder: 'जिस विचार या सारांश के लिए आप कथानक बनाना चाहते हैं उसे दर्ज करें',
      detailLevel: 'विस्तार स्तर',
      detailSimple: 'सरल (केवल सारांश)',
      detailStandard: 'मानक',
      detailDetailed: 'विस्तृत (अध्याय विवरण के साथ)',
      generatedPlot: 'उत्पन्न कथानक',
      moveToWriting: 'संपादित और विस्तारित करने के लिए लेखन में जाएं',
      // Genres
      novel: 'उपन्यास', essay: 'निबंध', blog: 'ब्लॉग', business: 'व्यापार',
      academic: 'अकादमिक', script: 'पटकथा', poetry: 'कविता',
      news: 'समाचार', review: 'समीक्षा', sns: 'सोशल', emailGenre: 'ईमेल',
      copywriting: 'कॉपीराइटिंग', technical: 'तकनीकी', fantasy: 'फैंटेसी',
      mystery: 'रहस्य', romance: 'रोमांस', horror: 'हॉरर', sf: 'साइ-फाई', other: 'अन्य',
      // Vertical writing mode
      verticalWriting: 'लंबवत लेखन',
      horizontalWriting: 'क्षैतिज लेखन',
      // Export formats
      exportPdf: 'PDF',
      exportRtf: 'RTF',
      exportEpub: 'EPUB',
      exportHtml: 'HTML',
      // Import
      import: 'आयात',
      importFile: 'फ़ाइल चुनें',
      importSupported: 'समर्थित: TXT, RTF, DOCX, DOC',
      // Trash
      trash: 'कूड़ा',
      restore: 'पुनर्स्थापित',
      permanentDelete: 'स्थायी रूप से हटाएं',
      emptyTrash: 'कूड़ा खाली करें',
      daysRemaining: 'दिन में स्वचालित हटाना',
      noTrashItems: 'कूड़ा खाली है',
      confirmEmptyTrash: 'कूड़ा खाली करें? यह वापस नहीं हो सकता।',
      confirmPermanentDelete: 'स्थायी रूप से हटाएं? यह वापस नहीं हो सकता।',
      movedToTrash: 'कूड़े में ले जाया गया',
      restoredFromTrash: 'पुनर्स्थापित',
      items: 'आइटम',
      trashInfo: 'कूड़े में आइटम 30 दिनों के बाद स्वचालित रूप से हटा दिए जाएंगे',
      trashEmptied: 'कूड़ा खाली हो गया',
      permanentlyDeleted: 'स्थायी रूप से हटा दिया गया',
      untitled: 'शीर्षकहीन'
    },
    es: {
      appName: 'DANTE', appSubtitle: 'Editor de Escritura Integrado con IA',
      login: 'Iniciar sesión', register: 'Registrarse', logout: 'Cerrar sesión',
      email: 'Correo electrónico', password: 'Contraseña', username: 'Nombre de usuario',
      settings: 'Configuración', help: 'Ayuda', terms: 'Términos de Servicio', privacy: 'Política de Privacidad',
      deleteAccount: 'Eliminar Cuenta', projects: 'Proyectos', newProject: 'Nuevo Proyecto',
      idea: 'Ideas', plot: 'Trama', writing: 'Escritura', editor: 'Editor',
      generate: 'Generar con IA', generating: 'Generando...', continue: 'Continuar',
      rewrite: 'Reescribir', expand: 'Expandir', proofread: 'Revisar', summarize: 'Resumir',
      translate: 'Traducir', titleGenerate: 'Ideas de Título',
      styleFormal: 'Estilo Formal', styleCasual: 'Estilo Casual', styleLiterary: 'Estilo Literario',
      characters: 'caracteres', charactersNoSpace: 'caracteres (sin espacios)', lines: 'líneas',
      readingTime: 'Tiempo de lectura', pages: 'páginas (400 car.)',
      save: 'Guardar', saving: 'Guardando...', saved: 'Guardado', delete: 'Eliminar', cancel: 'Cancelar', close: 'Cerrar',
      copy: 'Copiar', copied: 'Copiado', insert: 'Insertar', apply: 'Aplicar', export: 'Exportar',
      history: 'Log de IA', historyDesc: 'Registros de texto generado por IA. Presiona Guardar para guardar en el proyecto.', model: 'Modelo', theme: 'Tema', light: 'Claro', dark: 'Oscuro',
      autoSave: 'Autoguardar', autoSaved: 'Guardado automáticamente', autoSaveEnabled: 'Autoguardar: ON', autoSaveDisabled: 'Autoguardar: OFF',
      shortcuts: 'Atajos', shortcutSave: 'Ctrl+S: Guardar', shortcutGenerate: 'Ctrl+Enter: Generar', shortcutUndo: 'Ctrl+Z: Deshacer',
      rateLimitExceeded: 'Demasiadas solicitudes. Por favor espere', exportMarkdown: 'Markdown', exportText: 'Texto', exportDocx: 'Word',
      templates: 'Plantillas', useTemplate: 'Usar Plantilla', folders: 'Carpetas', tags: 'Etiquetas', addTag: 'Añadir Etiqueta', addFolder: 'Añadir Carpeta', allProjects: 'Todos los Proyectos', noFolder: 'Sin clasificar', renameFolder: 'Renombrar Carpeta', moveToFolder: 'Mover a Carpeta', removeFromFolder: 'Quitar de Carpeta',
      language: 'Idioma', genre: 'Género', title: 'Título',
      customPrompt: 'Instrucciones para AI Writer', targetLength: 'Longitud Objetivo', targetLengthNote: '*Aproximado. La IA puede no producir la longitud exacta especificada',
      concept: 'Concepto y Planificación', conceptPlaceholder: 'Ingresa tu concepto o plan...',
      plotContent: 'Contenido de la Trama', useIdeaPlot: 'Aplicar Idea y Trama',
      savedIdeas: 'Ideas Guardadas', savedPlot: 'Trama Guardada',
      selectContext: 'Proyectos de Referencia', selectContextDesc: 'Selecciona proyectos para usar como contexto',
      noContextSelected: 'Ninguno seleccionado', contextSelected: 'seleccionados', referenceProjects: 'Proyectos de Referencia',
      plan: 'Plan', free: 'Gratis', standard: 'Estándar', premium: 'Premium',
      upgrade: 'Comprar Caracteres', usage: 'Uso', remaining: 'Restante',
      limitExceeded: 'Compra cuando alcances el límite', pleaseUpgrade: 'Compra caracteres adicionales para continuar',
      purchaseCharacters: 'Comprar Caracteres', inviteCode: 'Código de Invitación',
      inviteCodePlaceholder: 'Ingresa código de invitación', inviteCodeApply: 'Aplicar',
      inviteCodeSuccess: '¡Código aplicado! Todas las funciones desbloqueadas', inviteCodeCharsAdded: '¡{chars} caracteres añadidos!', inviteCodeError: 'Código inválido', inviteCodeAlreadyUsed: 'Este código ya ha sido utilizado',
      payment: 'Pago', buyNow: 'Comprar Ahora', justNow: 'Ahora', minutesAgo: 'm', hoursAgo: 'h', daysAgo: 'd', confirmDelete: '¿Estás seguro de eliminar?',
      confirmDeleteAccount: 'Se eliminarán todos los datos. ¿Continuar?', noProjects: 'Sin proyectos',
      selectText: 'Selecciona texto', enterPrompt: 'Ingresa un prompt', translationTarget: 'Idioma destino',
      agreeTerms: 'Acepto los Términos de Servicio y Política de Privacidad',
      editorPlaceholder: 'Escribe tu texto aquí...',
      themeKeyword: 'Tema / Palabras clave', themeKeywordPlaceholder: 'ej. Viaje en el tiempo, amor prohibido',
      conditions: 'Condiciones / Restricciones', conditionsPlaceholder: 'ej. El protagonista es estudiante, ambientado en Japón moderno',
      ideaCount: 'Número de Ideas', ideaCount3: '3 ideas', ideaCount5: '5 ideas', ideaCount10: '10 ideas',
      generatedIdeas: 'Ideas Generadas', ideaTheme: 'Idea / Tema',
      plotPlaceholder: 'Ingresa la idea o resumen para crear la trama',
      detailLevel: 'Nivel de Detalle', detailSimple: 'Simple (solo resumen)', detailStandard: 'Estándar',
      detailDetailed: 'Detallado (con descripción de capítulos)', generatedPlot: 'Trama Generada',
      moveToWriting: 'Ir a Escritura para Editar y Expandir',
      novel: 'Novela', essay: 'Ensayo', blog: 'Blog', business: 'Negocios', academic: 'Académico',
      script: 'Guión', poetry: 'Poesía', news: 'Noticias', review: 'Reseña', sns: 'Redes Sociales',
      emailGenre: 'Email', copywriting: 'Copywriting', technical: 'Técnico', fantasy: 'Fantasía',
      mystery: 'Misterio', romance: 'Romance', horror: 'Terror', sf: 'Ciencia Ficción', other: 'Otro',
      // Vertical writing mode
      verticalWriting: 'Modo Vertical',
      horizontalWriting: 'Modo Horizontal',
      // Export formats
      exportPdf: 'PDF',
      exportRtf: 'RTF',
      exportEpub: 'EPUB',
      exportHtml: 'HTML',
      // Import
      import: 'Importar',
      importFile: 'Seleccionar Archivo',
      importSupported: 'Soportados: TXT, RTF, DOCX, DOC',
      // Trash
      trash: 'Papelera',
      restore: 'Restaurar',
      permanentDelete: 'Eliminar permanentemente',
      emptyTrash: 'Vaciar papelera',
      daysRemaining: 'días para eliminación',
      noTrashItems: 'La papelera está vacía',
      confirmEmptyTrash: '¿Vaciar papelera? No se puede deshacer.',
      confirmPermanentDelete: '¿Eliminar permanentemente? No se puede deshacer.',
      movedToTrash: 'Movido a la papelera',
      restoredFromTrash: 'Restaurado',
      items: 'elementos',
      trashInfo: 'Los elementos de la papelera se eliminarán automáticamente después de 30 días',
      trashEmptied: 'Papelera vaciada',
      permanentlyDeleted: 'Eliminado permanentemente',
      untitled: 'Sin título'
    },
    fr: {
      appName: 'DANTE', appSubtitle: 'Éditeur d\'Écriture Intégré IA',
      login: 'Connexion', register: 'S\'inscrire', logout: 'Déconnexion',
      email: 'Email', password: 'Mot de passe', username: 'Nom d\'utilisateur',
      settings: 'Paramètres', help: 'Aide', terms: 'Conditions d\'Utilisation', privacy: 'Politique de Confidentialité',
      deleteAccount: 'Supprimer le Compte', projects: 'Projets', newProject: 'Nouveau Projet',
      idea: 'Idées', plot: 'Scénario', writing: 'Écriture', editor: 'Éditeur',
      generate: 'Générer avec IA', generating: 'Génération...', continue: 'Continuer',
      rewrite: 'Réécrire', expand: 'Développer', proofread: 'Relire', summarize: 'Résumer',
      translate: 'Traduire', titleGenerate: 'Idées de Titre',
      styleFormal: 'Style Formel', styleCasual: 'Style Décontracté', styleLiterary: 'Style Littéraire',
      characters: 'caractères', charactersNoSpace: 'caractères (sans espaces)', lines: 'lignes',
      readingTime: 'Temps de lecture', pages: 'pages (400 car.)',
      save: 'Enregistrer', saving: 'Enregistrement...', saved: 'Enregistré', delete: 'Supprimer', cancel: 'Annuler', close: 'Fermer',
      copy: 'Copier', copied: 'Copié', insert: 'Insérer', apply: 'Appliquer', export: 'Exporter',
      history: 'Log IA', historyDesc: "Enregistrements des textes générés par l'IA. Appuyez sur Enregistrer pour sauvegarder.", model: 'Modèle', theme: 'Thème', light: 'Clair', dark: 'Sombre',
      autoSave: 'Sauvegarde auto', autoSaved: 'Sauvegardé automatiquement', autoSaveEnabled: 'Sauvegarde auto: ON', autoSaveDisabled: 'Sauvegarde auto: OFF',
      shortcuts: 'Raccourcis', shortcutSave: 'Ctrl+S: Sauvegarder', shortcutGenerate: 'Ctrl+Enter: Générer', shortcutUndo: 'Ctrl+Z: Annuler',
      rateLimitExceeded: 'Trop de requêtes. Veuillez patienter', exportMarkdown: 'Markdown', exportText: 'Texte', exportDocx: 'Word',
      templates: 'Modèles', useTemplate: 'Utiliser Modèle', folders: 'Dossiers', tags: 'Étiquettes', addTag: 'Ajouter Étiquette', addFolder: 'Ajouter Dossier', allProjects: 'Tous les Projets', noFolder: 'Non classé', renameFolder: 'Renommer Dossier', moveToFolder: 'Déplacer vers Dossier', removeFromFolder: 'Retirer du Dossier',
      language: 'Langue', genre: 'Genre', title: 'Titre',
      customPrompt: 'Instructions pour AI Writer', targetLength: 'Longueur Cible', targetLengthNote: '*Approximatif. L\'IA peut ne pas produire la longueur exacte spécifiée',
      concept: 'Concept et Planification', conceptPlaceholder: 'Entrez votre concept ou plan...',
      plotContent: 'Contenu du Scénario', useIdeaPlot: 'Appliquer Idée et Scénario',
      savedIdeas: 'Idées Sauvegardées', savedPlot: 'Scénario Sauvegardé',
      selectContext: 'Projets de Référence', selectContextDesc: 'Sélectionnez les projets à utiliser comme contexte',
      noContextSelected: 'Aucune sélection', contextSelected: 'sélectionnés', referenceProjects: 'Projets de Référence',
      plan: 'Plan', free: 'Gratuit', standard: 'Standard', premium: 'Premium',
      upgrade: 'Acheter des Caractères', usage: 'Utilisation', remaining: 'Restant',
      limitExceeded: 'Achetez quand vous atteignez la limite', pleaseUpgrade: 'Achetez des caractères supplémentaires',
      purchaseCharacters: 'Acheter des Caractères', inviteCode: 'Code d\'Invitation',
      inviteCodePlaceholder: 'Entrez le code d\'invitation', inviteCodeApply: 'Appliquer',
      inviteCodeSuccess: 'Code appliqué! Toutes les fonctions débloquées', inviteCodeCharsAdded: '{chars} caractères ajoutés!', inviteCodeError: 'Code invalide', inviteCodeAlreadyUsed: 'Ce code a déjà été utilisé',
      payment: 'Paiement', buyNow: 'Acheter Maintenant', justNow: "À l'instant", minutesAgo: 'm', hoursAgo: 'h', daysAgo: 'j', confirmDelete: 'Êtes-vous sûr de vouloir supprimer?',
      confirmDeleteAccount: 'Toutes les données seront supprimées. Continuer?', noProjects: 'Aucun projet',
      selectText: 'Sélectionnez le texte', enterPrompt: 'Entrez un prompt', translationTarget: 'Langue cible',
      agreeTerms: 'J\'accepte les Conditions d\'Utilisation et la Politique de Confidentialité',
      editorPlaceholder: 'Écrivez votre texte ici...',
      themeKeyword: 'Thème / Mots-clés', themeKeywordPlaceholder: 'ex. Voyage dans le temps, amour interdit',
      conditions: 'Conditions / Restrictions', conditionsPlaceholder: 'ex. Le protagoniste est étudiant, situé au Japon moderne',
      ideaCount: 'Nombre d\'Idées', ideaCount3: '3 idées', ideaCount5: '5 idées', ideaCount10: '10 idées',
      generatedIdeas: 'Idées Générées', ideaTheme: 'Idée / Thème',
      plotPlaceholder: 'Entrez l\'idée ou le résumé pour créer le scénario',
      detailLevel: 'Niveau de Détail', detailSimple: 'Simple (résumé seulement)', detailStandard: 'Standard',
      detailDetailed: 'Détaillé (avec descriptions de chapitres)', generatedPlot: 'Scénario Généré',
      moveToWriting: 'Passer à l\'Écriture pour Modifier et Développer',
      novel: 'Roman', essay: 'Essai', blog: 'Blog', business: 'Business', academic: 'Académique',
      script: 'Scénario', poetry: 'Poésie', news: 'Actualités', review: 'Critique', sns: 'Réseaux Sociaux',
      emailGenre: 'Email', copywriting: 'Copywriting', technical: 'Technique', fantasy: 'Fantasy',
      mystery: 'Mystère', romance: 'Romance', horror: 'Horreur', sf: 'Science-Fiction', other: 'Autre',
      // Vertical writing mode
      verticalWriting: 'Mode Vertical',
      horizontalWriting: 'Mode Horizontal',
      // Export formats
      exportPdf: 'PDF',
      exportRtf: 'RTF',
      exportEpub: 'EPUB',
      exportHtml: 'HTML',
      // Import
      import: 'Importer',
      importFile: 'Sélectionner un Fichier',
      importSupported: 'Formats: TXT, RTF, DOCX, DOC',
      // Trash
      trash: 'Corbeille',
      restore: 'Restaurer',
      permanentDelete: 'Supprimer définitivement',
      emptyTrash: 'Vider la corbeille',
      daysRemaining: 'jours avant suppression',
      noTrashItems: 'La corbeille est vide',
      confirmEmptyTrash: 'Vider la corbeille? Irréversible.',
      confirmPermanentDelete: 'Supprimer définitivement? Irréversible.',
      movedToTrash: 'Déplacé dans la corbeille',
      restoredFromTrash: 'Restauré',
      items: 'éléments',
      trashInfo: 'Les éléments de la corbeille seront supprimés automatiquement après 30 jours',
      trashEmptied: 'Corbeille vidée',
      permanentlyDeleted: 'Supprimé définitivement',
      untitled: 'Sans titre'
    },
    de: {
      appName: 'DANTE', appSubtitle: 'KI-integrierter Schreibeditor',
      login: 'Anmelden', register: 'Registrieren', logout: 'Abmelden',
      email: 'E-Mail', password: 'Passwort', username: 'Benutzername',
      settings: 'Einstellungen', help: 'Hilfe', terms: 'Nutzungsbedingungen', privacy: 'Datenschutzrichtlinie',
      deleteAccount: 'Konto Löschen', projects: 'Projekte', newProject: 'Neues Projekt',
      idea: 'Ideen', plot: 'Handlung', writing: 'Schreiben', editor: 'Editor',
      generate: 'Mit KI Generieren', generating: 'Generiere...', continue: 'Fortsetzen',
      rewrite: 'Umschreiben', expand: 'Erweitern', proofread: 'Korrekturlesen', summarize: 'Zusammenfassen',
      translate: 'Übersetzen', titleGenerate: 'Titelideen',
      styleFormal: 'Formeller Stil', styleCasual: 'Lockerer Stil', styleLiterary: 'Literarischer Stil',
      characters: 'Zeichen', charactersNoSpace: 'Zeichen (ohne Leerzeichen)', lines: 'Zeilen',
      readingTime: 'Lesezeit', pages: 'Seiten (400 Zeichen)',
      save: 'Speichern', saving: 'Speichern...', saved: 'Gespeichert', delete: 'Löschen', cancel: 'Abbrechen', close: 'Schließen',
      copy: 'Kopieren', copied: 'Kopiert', insert: 'Einfügen', apply: 'Anwenden', export: 'Exportieren',
      history: 'KI-Log', historyDesc: 'Aufzeichnungen der KI-generierten Texte. Drücken Sie Speichern, um im Projekt zu speichern.', model: 'Modell', theme: 'Design', light: 'Hell', dark: 'Dunkel',
      autoSave: 'Autospeichern', autoSaved: 'Automatisch gespeichert', autoSaveEnabled: 'Autospeichern: AN', autoSaveDisabled: 'Autospeichern: AUS',
      shortcuts: 'Tastenkombinationen', shortcutSave: 'Ctrl+S: Speichern', shortcutGenerate: 'Ctrl+Enter: Generieren', shortcutUndo: 'Ctrl+Z: Rückgängig',
      rateLimitExceeded: 'Zu viele Anfragen. Bitte warten', exportMarkdown: 'Markdown', exportText: 'Text', exportDocx: 'Word',
      templates: 'Vorlagen', useTemplate: 'Vorlage verwenden', folders: 'Ordner', tags: 'Tags', addTag: 'Tag hinzufügen', addFolder: 'Ordner hinzufügen', allProjects: 'Alle Projekte', noFolder: 'Nicht kategorisiert', renameFolder: 'Ordner umbenennen', moveToFolder: 'In Ordner verschieben', removeFromFolder: 'Aus Ordner entfernen',
      language: 'Sprache', genre: 'Genre', title: 'Titel',
      customPrompt: 'Anweisungen für AI Writer', targetLength: 'Ziellänge', targetLengthNote: '*Ungenähr. KI gibt möglicherweise nicht genau die angegebene Länge aus',
      concept: 'Konzept und Planung', conceptPlaceholder: 'Geben Sie Ihr Konzept oder Ihren Plan ein...',
      plotContent: 'Handlungsinhalt', useIdeaPlot: 'Idee und Handlung anwenden',
      savedIdeas: 'Gespeicherte Ideen', savedPlot: 'Gespeicherte Handlung',
      selectContext: 'Referenzprojekte', selectContextDesc: 'Wählen Sie Projekte als Kontext aus',
      noContextSelected: 'Keine Auswahl', contextSelected: 'ausgewählt', referenceProjects: 'Referenzprojekte',
      plan: 'Plan', free: 'Kostenlos', standard: 'Standard', premium: 'Premium',
      upgrade: 'Zeichen Kaufen', usage: 'Nutzung', remaining: 'Verbleibend',
      limitExceeded: 'Kaufen Sie bei Erreichen des Limits', pleaseUpgrade: 'Kaufen Sie zusätzliche Zeichen',
      purchaseCharacters: 'Zeichen Kaufen', inviteCode: 'Einladungscode',
      inviteCodePlaceholder: 'Einladungscode eingeben', inviteCodeApply: 'Anwenden',
      inviteCodeSuccess: 'Code angewendet! Alle Funktionen freigeschaltet', inviteCodeCharsAdded: '{chars} Zeichen hinzugefügt!', inviteCodeError: 'Ungültiger Code', inviteCodeAlreadyUsed: 'Dieser Code wurde bereits verwendet',
      payment: 'Zahlung', buyNow: 'Jetzt Kaufen', justNow: 'Gerade', minutesAgo: 'm', hoursAgo: 'h', daysAgo: 'T', confirmDelete: 'Sind Sie sicher, dass Sie löschen möchten?',
      confirmDeleteAccount: 'Alle Daten werden gelöscht. Fortfahren?', noProjects: 'Keine Projekte',
      selectText: 'Text auswählen', enterPrompt: 'Prompt eingeben', translationTarget: 'Zielsprache',
      agreeTerms: 'Ich akzeptiere die Nutzungsbedingungen und Datenschutzrichtlinie',
      editorPlaceholder: 'Schreiben Sie hier Ihren Text...',
      themeKeyword: 'Thema / Schlüsselwörter', themeKeywordPlaceholder: 'z.B. Zeitreise, verbotene Liebe',
      conditions: 'Bedingungen / Einschränkungen', conditionsPlaceholder: 'z.B. Der Protagonist ist Student, im modernen Japan angesiedelt',
      ideaCount: 'Anzahl der Ideen', ideaCount3: '3 Ideen', ideaCount5: '5 Ideen', ideaCount10: '10 Ideen',
      generatedIdeas: 'Generierte Ideen', ideaTheme: 'Idee / Thema',
      plotPlaceholder: 'Geben Sie die Idee oder Zusammenfassung ein, um die Handlung zu erstellen',
      detailLevel: 'Detailgrad', detailSimple: 'Einfach (nur Zusammenfassung)', detailStandard: 'Standard',
      detailDetailed: 'Detailliert (mit Kapitelbeschreibungen)', generatedPlot: 'Generierte Handlung',
      moveToWriting: 'Zum Schreiben wechseln zum Bearbeiten und Erweitern',
      novel: 'Roman', essay: 'Essay', blog: 'Blog', business: 'Business', academic: 'Akademisch',
      script: 'Drehbuch', poetry: 'Poesie', news: 'Nachrichten', review: 'Rezension', sns: 'Social Media',
      emailGenre: 'E-Mail', copywriting: 'Copywriting', technical: 'Technisch', fantasy: 'Fantasy',
      mystery: 'Krimi', romance: 'Romantik', horror: 'Horror', sf: 'Science-Fiction', other: 'Andere',
      // Vertical writing mode
      verticalWriting: 'Vertikaler Modus',
      horizontalWriting: 'Horizontaler Modus',
      // Export formats
      exportPdf: 'PDF',
      exportRtf: 'RTF',
      exportEpub: 'EPUB',
      exportHtml: 'HTML',
      // Import
      import: 'Importieren',
      importFile: 'Datei Auswählen',
      importSupported: 'Unterstützt: TXT, RTF, DOCX, DOC',
      // Trash
      trash: 'Papierkorb',
      restore: 'Wiederherstellen',
      permanentDelete: 'Endgültig löschen',
      emptyTrash: 'Papierkorb leeren',
      daysRemaining: 'Tage bis zur Löschung',
      noTrashItems: 'Der Papierkorb ist leer',
      confirmEmptyTrash: 'Papierkorb leeren? Nicht rückgängig machbar.',
      confirmPermanentDelete: 'Endgültig löschen? Nicht rückgängig machbar.',
      movedToTrash: 'In den Papierkorb verschoben',
      restoredFromTrash: 'Wiederhergestellt',
      items: 'Elemente',
      trashInfo: 'Elemente im Papierkorb werden nach 30 Tagen automatisch gelöscht',
      trashEmptied: 'Papierkorb geleert',
      permanentlyDeleted: 'Endgültig gelöscht',
      untitled: 'Unbenannt'
    },
    pt: {
      appName: 'DANTE', appSubtitle: 'Editor de Escrita Integrado com IA',
      login: 'Entrar', register: 'Registrar', logout: 'Sair',
      email: 'Email', password: 'Senha', username: 'Nome de usuário',
      settings: 'Configurações', help: 'Ajuda', terms: 'Termos de Serviço', privacy: 'Política de Privacidade',
      deleteAccount: 'Excluir Conta', projects: 'Projetos', newProject: 'Novo Projeto',
      idea: 'Ideias', plot: 'Enredo', writing: 'Escrita', editor: 'Editor',
      generate: 'Gerar com IA', generating: 'Gerando...', continue: 'Continuar',
      rewrite: 'Reescrever', expand: 'Expandir', proofread: 'Revisar', summarize: 'Resumir',
      translate: 'Traduzir', titleGenerate: 'Ideias de Título',
      styleFormal: 'Estilo Formal', styleCasual: 'Estilo Casual', styleLiterary: 'Estilo Literário',
      characters: 'caracteres', charactersNoSpace: 'caracteres (sem espaços)', lines: 'linhas',
      readingTime: 'Tempo de leitura', pages: 'páginas (400 car.)',
      save: 'Salvar', saving: 'Salvando...', saved: 'Salvo', delete: 'Excluir', cancel: 'Cancelar', close: 'Fechar',
      copy: 'Copiar', copied: 'Copiado', insert: 'Inserir', apply: 'Aplicar', export: 'Exportar',
      history: 'Log de IA', historyDesc: 'Registros de texto gerado por IA. Pressione Salvar para salvar no projeto.', model: 'Modelo', theme: 'Tema', light: 'Claro', dark: 'Escuro',
      autoSave: 'Salvar auto', autoSaved: 'Salvo automaticamente', autoSaveEnabled: 'Salvar auto: ON', autoSaveDisabled: 'Salvar auto: OFF',
      shortcuts: 'Atalhos', shortcutSave: 'Ctrl+S: Salvar', shortcutGenerate: 'Ctrl+Enter: Gerar', shortcutUndo: 'Ctrl+Z: Desfazer',
      rateLimitExceeded: 'Muitas solicitações. Por favor aguarde', exportMarkdown: 'Markdown', exportText: 'Texto', exportDocx: 'Word',
      templates: 'Modelos', useTemplate: 'Usar Modelo', folders: 'Pastas', tags: 'Tags', addTag: 'Adicionar Tag', addFolder: 'Adicionar Pasta', allProjects: 'Todos os Projetos', noFolder: 'Não categorizado', renameFolder: 'Renomear Pasta', moveToFolder: 'Mover para Pasta', removeFromFolder: 'Remover da Pasta',
      language: 'Idioma', genre: 'Gênero', title: 'Título',
      customPrompt: 'Instruções para AI Writer', targetLength: 'Comprimento Alvo', targetLengthNote: '*Aproximado. A IA pode não produzir o comprimento exato especificado',
      concept: 'Conceito e Planejamento', conceptPlaceholder: 'Insira seu conceito ou plano...',
      plotContent: 'Conteúdo do Enredo', useIdeaPlot: 'Aplicar Ideia e Enredo',
      savedIdeas: 'Ideias Salvas', savedPlot: 'Enredo Salvo',
      selectContext: 'Projetos de Referência', selectContextDesc: 'Selecione projetos para usar como contexto',
      noContextSelected: 'Nenhum selecionado', contextSelected: 'selecionados', referenceProjects: 'Projetos de Referência',
      plan: 'Plano', free: 'Grátis', standard: 'Padrão', premium: 'Premium',
      upgrade: 'Comprar Caracteres', usage: 'Uso', remaining: 'Restante',
      limitExceeded: 'Compre ao atingir o limite', pleaseUpgrade: 'Compre caracteres adicionais para continuar',
      purchaseCharacters: 'Comprar Caracteres', inviteCode: 'Código de Convite',
      inviteCodePlaceholder: 'Digite o código de convite', inviteCodeApply: 'Aplicar',
      inviteCodeSuccess: 'Código aplicado! Todas as funções desbloqueadas', inviteCodeCharsAdded: '{chars} caracteres adicionados!', inviteCodeError: 'Código inválido', inviteCodeAlreadyUsed: 'Este código já foi utilizado',
      payment: 'Pagamento', buyNow: 'Comprar Agora', justNow: 'Agora', minutesAgo: 'm', hoursAgo: 'h', daysAgo: 'd', confirmDelete: 'Tem certeza que deseja excluir?',
      confirmDeleteAccount: 'Todos os dados serão excluídos. Continuar?', noProjects: 'Sem projetos',
      selectText: 'Selecione o texto', enterPrompt: 'Digite um prompt', translationTarget: 'Idioma alvo',
      agreeTerms: 'Aceito os Termos de Serviço e Política de Privacidade',
      editorPlaceholder: 'Escreva seu texto aqui...',
      themeKeyword: 'Tema / Palavras-chave', themeKeywordPlaceholder: 'ex. Viagem no tempo, amor proibido',
      conditions: 'Condições / Restrições', conditionsPlaceholder: 'ex. O protagonista é estudante, ambientado no Japão moderno',
      ideaCount: 'Número de Ideias', ideaCount3: '3 ideias', ideaCount5: '5 ideias', ideaCount10: '10 ideias',
      generatedIdeas: 'Ideias Geradas', ideaTheme: 'Ideia / Tema',
      plotPlaceholder: 'Digite a ideia ou resumo para criar o enredo',
      detailLevel: 'Nível de Detalhe', detailSimple: 'Simples (apenas resumo)', detailStandard: 'Padrão',
      detailDetailed: 'Detalhado (com descrições de capítulos)', generatedPlot: 'Enredo Gerado',
      moveToWriting: 'Ir para Escrita para Editar e Expandir',
      novel: 'Romance', essay: 'Ensaio', blog: 'Blog', business: 'Negócios', academic: 'Acadêmico',
      script: 'Roteiro', poetry: 'Poesia', news: 'Notícias', review: 'Resenha', sns: 'Redes Sociais',
      emailGenre: 'Email', copywriting: 'Copywriting', technical: 'Técnico', fantasy: 'Fantasia',
      mystery: 'Mistério', romance: 'Romance', horror: 'Terror', sf: 'Ficção Científica', other: 'Outro',
      // Vertical writing mode
      verticalWriting: 'Modo Vertical',
      horizontalWriting: 'Modo Horizontal',
      // Export formats
      exportPdf: 'PDF',
      exportRtf: 'RTF',
      exportEpub: 'EPUB',
      exportHtml: 'HTML',
      // Import
      import: 'Importar',
      importFile: 'Selecionar Arquivo',
      importSupported: 'Suportados: TXT, RTF, DOCX, DOC',
      // Trash
      trash: 'Lixeira',
      restore: 'Restaurar',
      permanentDelete: 'Excluir permanentemente',
      emptyTrash: 'Esvaziar lixeira',
      daysRemaining: 'dias para exclusão',
      noTrashItems: 'A lixeira está vazia',
      confirmEmptyTrash: 'Esvaziar lixeira? Não pode ser desfeito.',
      confirmPermanentDelete: 'Excluir permanentemente? Não pode ser desfeito.',
      movedToTrash: 'Movido para lixeira',
      restoredFromTrash: 'Restaurado',
      items: 'itens',
      trashInfo: 'Os itens na lixeira serão excluídos automaticamente após 30 dias',
      trashEmptied: 'Lixeira esvaziada',
      permanentlyDeleted: 'Excluído permanentemente',
      untitled: 'Sem título'
    },
    ru: {
      appName: 'DANTE', appSubtitle: 'ИИ-интегрированный текстовый редактор',
      login: 'Вход', register: 'Регистрация', logout: 'Выход',
      email: 'Email', password: 'Пароль', username: 'Имя пользователя',
      settings: 'Настройки', help: 'Помощь', terms: 'Условия использования', privacy: 'Политика конфиденциальности',
      deleteAccount: 'Удалить аккаунт', projects: 'Проекты', newProject: 'Новый проект',
      idea: 'Идеи', plot: 'Сюжет', writing: 'Написание', editor: 'Редактор',
      generate: 'Генерация ИИ', generating: 'Генерация...', continue: 'Продолжить',
      rewrite: 'Переписать', expand: 'Расширить', proofread: 'Вычитка', summarize: 'Резюмировать',
      translate: 'Перевести', titleGenerate: 'Идеи названий',
      styleFormal: 'Формальный стиль', styleCasual: 'Разговорный стиль', styleLiterary: 'Литературный стиль',
      characters: 'символов', charactersNoSpace: 'символов (без пробелов)', lines: 'строк',
      readingTime: 'Время чтения', pages: 'страниц (400 симв.)',
      save: 'Сохранить', saving: 'Сохранение...', saved: 'Сохранено', delete: 'Удалить', cancel: 'Отмена', close: 'Закрыть',
      copy: 'Копировать', copied: 'Скопировано', insert: 'Вставить', apply: 'Применить', export: 'Экспорт',
      history: 'Лог ИИ', historyDesc: 'Записи текстов, созданных ИИ. Нажмите Сохранить для сохранения в проекте.', model: 'Модель', theme: 'Тема', light: 'Светлая', dark: 'Тёмная',
      autoSave: 'Автосохранение', autoSaved: 'Автосохранено', autoSaveEnabled: 'Автосохранение: ВКЛ', autoSaveDisabled: 'Автосохранение: ВЫКЛ',
      shortcuts: 'Горячие клавиши', shortcutSave: 'Ctrl+S: Сохранить', shortcutGenerate: 'Ctrl+Enter: Генерация', shortcutUndo: 'Ctrl+Z: Отмена',
      rateLimitExceeded: 'Слишком много запросов. Пожалуйста подождите', exportMarkdown: 'Markdown', exportText: 'Текст', exportDocx: 'Word',
      templates: 'Шаблоны', useTemplate: 'Использовать шаблон', folders: 'Папки', tags: 'Теги', addTag: 'Добавить тег', addFolder: 'Добавить папку', allProjects: 'Все проекты', noFolder: 'Без категории', renameFolder: 'Переименовать папку', moveToFolder: 'Переместить в папку', removeFromFolder: 'Удалить из папки',
      language: 'Язык', genre: 'Жанр', title: 'Название',
      customPrompt: 'Инструкции для AI писателя', targetLength: 'Целевая длина', targetLengthNote: '*Приблизительно. ИИ может не выдать точно указанную длину',
      concept: 'Концепция и планирование', conceptPlaceholder: 'Введите вашу концепцию или план...',
      plotContent: 'Содержание сюжета', useIdeaPlot: 'Применить идею и сюжет',
      savedIdeas: 'Сохранённые идеи', savedPlot: 'Сохранённый сюжет',
      selectContext: 'Справочные проекты', selectContextDesc: 'Выберите проекты для использования в качестве контекста',
      noContextSelected: 'Не выбрано', contextSelected: 'выбрано', referenceProjects: 'Справочные проекты',
      plan: 'План', free: 'Бесплатно', standard: 'Стандарт', premium: 'Премиум',
      upgrade: 'Купить символы', usage: 'Использование', remaining: 'Осталось',
      limitExceeded: 'Купите при достижении лимита', pleaseUpgrade: 'Купите дополнительные символы',
      purchaseCharacters: 'Купить символы', inviteCode: 'Код приглашения',
      inviteCodePlaceholder: 'Введите код приглашения', inviteCodeApply: 'Применить',
      inviteCodeSuccess: 'Код применён! Все функции разблокированы', inviteCodeCharsAdded: '{chars} символов добавлено!', inviteCodeError: 'Неверный код', inviteCodeAlreadyUsed: 'Этот код уже был использован',
      payment: 'Оплата', buyNow: 'Купить сейчас', justNow: 'Сейчас', minutesAgo: 'м', hoursAgo: 'ч', daysAgo: 'д', confirmDelete: 'Вы уверены, что хотите удалить?',
      confirmDeleteAccount: 'Все данные будут удалены. Продолжить?', noProjects: 'Нет проектов',
      selectText: 'Выберите текст', enterPrompt: 'Введите промпт', translationTarget: 'Целевой язык',
      agreeTerms: 'Я принимаю Условия использования и Политику конфиденциальности',
      editorPlaceholder: 'Пишите здесь...',
      themeKeyword: 'Тема / Ключевые слова', themeKeywordPlaceholder: 'напр. Путешествие во времени, запретная любовь',
      conditions: 'Условия / Ограничения', conditionsPlaceholder: 'напр. Главный герой - студент, действие в современной Японии',
      ideaCount: 'Количество идей', ideaCount3: '3 идеи', ideaCount5: '5 идей', ideaCount10: '10 идей',
      generatedIdeas: 'Сгенерированные идеи', ideaTheme: 'Идея / Тема',
      plotPlaceholder: 'Введите идею или краткое содержание для создания сюжета',
      detailLevel: 'Уровень детализации', detailSimple: 'Простой (только резюме)', detailStandard: 'Стандартный',
      detailDetailed: 'Детальный (с описанием глав)', generatedPlot: 'Сгенерированный сюжет',
      moveToWriting: 'Перейти к Письму для Редактирования и Расширения',
      novel: 'Роман', essay: 'Эссе', blog: 'Блог', business: 'Бизнес', academic: 'Академический',
      script: 'Сценарий', poetry: 'Поэзия', news: 'Новости', review: 'Обзор', sns: 'Соцсети',
      emailGenre: 'Email', copywriting: 'Копирайтинг', technical: 'Технический', fantasy: 'Фэнтези',
      mystery: 'Детектив', romance: 'Романтика', horror: 'Ужасы', sf: 'Научная фантастика', other: 'Другое',
      // Vertical writing mode
      verticalWriting: 'Вертикальный режим',
      horizontalWriting: 'Горизонтальный режим',
      // Export formats
      exportPdf: 'PDF',
      exportRtf: 'RTF',
      exportEpub: 'EPUB',
      exportHtml: 'HTML',
      // Import
      import: 'Импорт',
      importFile: 'Выбрать файл',
      importSupported: 'Поддерживаются: TXT, RTF, DOCX, DOC',
      // Trash
      trash: 'Корзина',
      restore: 'Восстановить',
      permanentDelete: 'Удалить навсегда',
      emptyTrash: 'Очистить корзину',
      daysRemaining: 'дней до удаления',
      noTrashItems: 'Корзина пуста',
      confirmEmptyTrash: 'Очистить корзину? Нельзя отменить.',
      confirmPermanentDelete: 'Удалить навсегда? Нельзя отменить.',
      movedToTrash: 'Перемещено в корзину',
      restoredFromTrash: 'Восстановлено',
      items: 'элементов',
      trashInfo: 'Элементы в корзине будут автоматически удалены через 30 дней',
      trashEmptied: 'Корзина очищена',
      permanentlyDeleted: 'Навсегда удалено',
      untitled: 'Без названия'
    },
    ar: {
      appName: 'DANTE', appSubtitle: 'محرر كتابة متكامل بالذكاء الاصطناعي',
      login: 'تسجيل الدخول', register: 'التسجيل', logout: 'تسجيل الخروج',
      email: 'البريد الإلكتروني', password: 'كلمة المرور', username: 'اسم المستخدم',
      settings: 'الإعدادات', help: 'المساعدة', terms: 'شروط الخدمة', privacy: 'سياسة الخصوصية',
      deleteAccount: 'حذف الحساب', projects: 'المشاريع', newProject: 'مشروع جديد',
      idea: 'أفكار', plot: 'الحبكة', writing: 'الكتابة', editor: 'المحرر',
      generate: 'توليد بالذكاء الاصطناعي', generating: 'جارٍ التوليد...', continue: 'متابعة',
      rewrite: 'إعادة الكتابة', expand: 'توسيع', proofread: 'تدقيق', summarize: 'تلخيص',
      translate: 'ترجمة', titleGenerate: 'أفكار العناوين',
      styleFormal: 'أسلوب رسمي', styleCasual: 'أسلوب غير رسمي', styleLiterary: 'أسلوب أدبي',
      characters: 'حرف', charactersNoSpace: 'حرف (بدون مسافات)', lines: 'سطر',
      readingTime: 'وقت القراءة', pages: 'صفحة (400 حرف)',
      save: 'حفظ', saving: 'جاري الحفظ...', saved: 'تم الحفظ', delete: 'حذف', cancel: 'إلغاء', close: 'إغلاق',
      copy: 'نسخ', copied: 'تم النسخ', insert: 'إدراج', apply: 'تطبيق', export: 'تصدير',
      history: 'سجل AI', historyDesc: 'سجلات النص المُنشأ بواسطة AI. اضغط حفظ للحفظ في المشروع.', model: 'النموذج', theme: 'المظهر', light: 'فاتح', dark: 'داكن',
      autoSave: 'حفظ تلقائي', autoSaved: 'تم الحفظ تلقائياً', autoSaveEnabled: 'حفظ تلقائي: مفعل', autoSaveDisabled: 'حفظ تلقائي: موقف',
      shortcuts: 'اختصارات', shortcutSave: 'Ctrl+S: حفظ', shortcutGenerate: 'Ctrl+Enter: توليد', shortcutUndo: 'Ctrl+Z: تراجع',
      rateLimitExceeded: 'طلبات كثيرة جداً. يرجى الانتظار', exportMarkdown: 'Markdown', exportText: 'نص', exportDocx: 'Word',
      templates: 'قوالب', useTemplate: 'استخدام قالب', folders: 'مجلدات', tags: 'علامات', addTag: 'إضافة علامة', addFolder: 'إضافة مجلد', allProjects: 'كل المشاريع', noFolder: 'غير مصنف', renameFolder: 'إعادة تسمية المجلد', moveToFolder: 'نقل إلى مجلد', removeFromFolder: 'إزالة من المجلد',
      language: 'اللغة', genre: 'النوع', title: 'العنوان',
      customPrompt: 'تعليمات لكاتب AI', targetLength: 'الطول المستهدف', targetLengthNote: '*تقريبي. قد لا ينتج الذكاء الاصطناعي الطول المحدد بالضبط',
      concept: 'المفهوم والتخطيط', conceptPlaceholder: 'أدخل مفهومك أو خطتك...',
      plotContent: 'محتوى الحبكة', useIdeaPlot: 'تطبيق الفكرة والحبكة',
      savedIdeas: 'أفكار محفوظة', savedPlot: 'حبكة محفوظة',
      selectContext: 'مشاريع مرجعية', selectContextDesc: 'حدد المشاريع لاستخدامها كسياق',
      noContextSelected: 'لم يتم الاختيار', contextSelected: 'مختار', referenceProjects: 'مشاريع مرجعية',
      plan: 'الخطة', free: 'مجاني', standard: 'قياسي', premium: 'مميز',
      upgrade: 'شراء أحرف', usage: 'الاستخدام', remaining: 'المتبقي',
      limitExceeded: 'اشترِ عند الوصول للحد', pleaseUpgrade: 'اشترِ أحرفًا إضافية للمتابعة',
      purchaseCharacters: 'شراء أحرف', inviteCode: 'رمز الدعوة',
      inviteCodePlaceholder: 'أدخل رمز الدعوة', inviteCodeApply: 'تطبيق',
      inviteCodeSuccess: 'تم تطبيق الرمز! جميع الميزات مفتوحة', inviteCodeCharsAdded: 'تمت إضافة {chars} حرف!', inviteCodeError: 'رمز غير صالح', inviteCodeAlreadyUsed: 'تم استخدام هذا الرمز بالفعل',
      payment: 'الدفع', buyNow: 'اشترِ الآن', justNow: 'الآن', minutesAgo: 'د', hoursAgo: 'س', daysAgo: 'ي', confirmDelete: 'هل أنت متأكد من الحذف؟',
      confirmDeleteAccount: 'سيتم حذف جميع البيانات. متابعة؟', noProjects: 'لا توجد مشاريع',
      selectText: 'حدد النص', enterPrompt: 'أدخل الموجه', translationTarget: 'اللغة المستهدفة',
      agreeTerms: 'أوافق على شروط الخدمة وسياسة الخصوصية',
      editorPlaceholder: 'اكتب نصك هنا...',
      themeKeyword: 'الموضوع / الكلمات المفتاحية', themeKeywordPlaceholder: 'مثال: السفر عبر الزمن، الحب المحرم',
      conditions: 'الشروط / القيود', conditionsPlaceholder: 'مثال: البطل طالب، في اليابان الحديثة',
      ideaCount: 'عدد الأفكار', ideaCount3: '3 أفكار', ideaCount5: '5 أفكار', ideaCount10: '10 أفكار',
      generatedIdeas: 'الأفكار المولدة', ideaTheme: 'الفكرة / الموضوع',
      plotPlaceholder: 'أدخل الفكرة أو الملخص لإنشاء الحبكة',
      detailLevel: 'مستوى التفصيل', detailSimple: 'بسيط (ملخص فقط)', detailStandard: 'قياسي',
      detailDetailed: 'مفصل (مع وصف الفصول)', generatedPlot: 'الحبكة المولدة',
      moveToWriting: 'انتقل إلى الكتابة للتحرير والتوسيع',
      novel: 'رواية', essay: 'مقال', blog: 'مدونة', business: 'أعمال', academic: 'أكاديمي',
      script: 'سيناريو', poetry: 'شعر', news: 'أخبار', review: 'مراجعة', sns: 'وسائل التواصل',
      emailGenre: 'بريد إلكتروني', copywriting: 'كتابة إعلانية', technical: 'تقني', fantasy: 'خيال',
      mystery: 'غموض', romance: 'رومانسية', horror: 'رعب', sf: 'خيال علمي', other: 'آخر',
      // Vertical writing mode
      verticalWriting: 'الوضع العمودي',
      horizontalWriting: 'الوضع الأفقي',
      // Export formats
      exportPdf: 'PDF',
      exportRtf: 'RTF',
      exportEpub: 'EPUB',
      exportHtml: 'HTML',
      // Import
      import: 'استيراد',
      importFile: 'اختر ملف',
      importSupported: 'المدعومة: TXT, RTF, DOCX, DOC',
      // Trash
      trash: 'سلة المهملات',
      restore: 'استعادة',
      permanentDelete: 'حذف نهائي',
      emptyTrash: 'تفريغ السلة',
      daysRemaining: 'يوم للحذف التلقائي',
      noTrashItems: 'السلة فارغة',
      confirmEmptyTrash: 'تفريغ السلة؟ لا يمكن التراجع.',
      confirmPermanentDelete: 'حذف نهائي؟ لا يمكن التراجع.',
      movedToTrash: 'نقل إلى السلة',
      restoredFromTrash: 'تمت الاستعادة',
      items: 'عناصر',
      trashInfo: 'سيتم حذف العناصر في السلة تلقائيًا بعد 30 يومًا',
      trashEmptied: 'تم تفريغ السلة',
      permanentlyDeleted: 'تم الحذف نهائيًا',
      untitled: 'بدون عنوان'
    }
  };

  // ==================== STATE ====================
  const state = {
    user: null,
    preferences: null,
    currentProject: null,
    projects: [],
    history: [],
    models: [],
    selectedModel: 'grok-4-1-fast-non-reasoning',
    currentTab: 'editor',
    currentMode: 'writing',
    isGenerating: false,
    theme: 'light',
    language: 'ja',
    sidebarOpen: false,
    autoSaveTimer: null,
    autoSaveEnabled: true,
    lastSavedContent: '',
    selectedContextProjects: [],
    folders: [],
    tags: [],
    selectedFolder: null,
    rateLimitCount: 0,
    rateLimitResetTime: 0,
    verticalWriting: false,  // Vertical writing mode
    // Mashiro consultant
    mashiroMessages: [],
    mashiroTyping: false
  };

  // ==================== TEMPLATES ====================
  const TEMPLATES = {
    novel: {
      ja: '# 第一章\n\n　主人公の名前は{name}。{setting}で暮らしていた。\n\n　ある日、{event}が起こり、物語は動き始める。',
      en: '# Chapter One\n\nThe protagonist, {name}, lived in {setting}.\n\nOne day, {event} occurred, and the story began to unfold.'
    },
    blog: {
      ja: '## {title}\n\n### はじめに\n\n今回は{topic}についてお話しします。\n\n### 本題\n\n{content}\n\n### まとめ\n\n{conclusion}',
      en: '## {title}\n\n### Introduction\n\nToday, I\'ll discuss {topic}.\n\n### Main Content\n\n{content}\n\n### Conclusion\n\n{conclusion}'
    },
    business: {
      ja: '【件名】{subject}\n\nお世話になっております。\n{company}の{name}です。\n\n{content}\n\nご確認のほど、よろしくお願いいたします。',
      en: 'Subject: {subject}\n\nDear {recipient},\n\n{content}\n\nBest regards,\n{name}'
    },
    script: {
      ja: '【シーン1】{location}\n\n{character1}：「{dialogue1}」\n\n{character2}：「{dialogue2}」\n\n（{action}）',
      en: '[SCENE 1] {location}\n\n{character1}: "{dialogue1}"\n\n{character2}: "{dialogue2}"\n\n({action})'
    },
    academic: {
      ja: '# {title}\n\n## 要旨\n\n{abstract}\n\n## 1. 序論\n\n{introduction}\n\n## 2. 方法\n\n{method}\n\n## 3. 結果\n\n{results}\n\n## 4. 考察\n\n{discussion}\n\n## 参考文献\n\n{references}',
      en: '# {title}\n\n## Abstract\n\n{abstract}\n\n## 1. Introduction\n\n{introduction}\n\n## 2. Methods\n\n{method}\n\n## 3. Results\n\n{results}\n\n## 4. Discussion\n\n{discussion}\n\n## References\n\n{references}'
    }
  };

  // Get translation
  function t(key) {
    const lang = state.language || 'ja';
    return i18n[lang]?.[key] || i18n.ja[key] || key;
  }

  // ==================== GENRES ====================
  const GENRES = [
    { id: 'novel', icon: 'fa-book' },
    { id: 'essay', icon: 'fa-feather' },
    { id: 'blog', icon: 'fa-blog' },
    { id: 'business', icon: 'fa-briefcase' },
    { id: 'academic', icon: 'fa-graduation-cap' },
    { id: 'script', icon: 'fa-film' },
    { id: 'poetry', icon: 'fa-heart' },
    { id: 'news', icon: 'fa-newspaper' },
    { id: 'review', icon: 'fa-star' },
    { id: 'sns', icon: 'fa-hashtag' },
    { id: 'emailGenre', icon: 'fa-envelope' },
    { id: 'copywriting', icon: 'fa-bullhorn' },
    { id: 'technical', icon: 'fa-code' },
    { id: 'fantasy', icon: 'fa-dragon' },
    { id: 'mystery', icon: 'fa-search' },
    { id: 'romance', icon: 'fa-heart' },
    { id: 'horror', icon: 'fa-ghost' },
    { id: 'sf', icon: 'fa-rocket' },
    { id: 'other', icon: 'fa-ellipsis-h' }
  ];

  const LANGUAGES = [
    { id: 'ja', name: '日本語' },
    { id: 'en', name: 'English' },
    { id: 'zh', name: '中文' },
    { id: 'ko', name: '한국어' },
    { id: 'es', name: 'Español' },
    { id: 'fr', name: 'Français' },
    { id: 'de', name: 'Deutsch' },
    { id: 'it', name: 'Italiano' },
    { id: 'pt', name: 'Português' },
    { id: 'hi', name: 'हिन्दी' },
    { id: 'ru', name: 'Русский' },
    { id: 'ar', name: 'العربية' }
  ];

  // ==================== API HELPERS ====================
  async function api(endpoint, options = {}) {
    const response = await fetch('/api' + endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      if (data.error === 'limit_exceeded') {
        showUpgradeModal();
      }
      throw new Error(data.error || data.message || 'API Error');
    }
    
    return data;
  }

  // ==================== HELPER FUNCTIONS ====================
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatNumber(num) {
    return num.toLocaleString();
  }

  // ==================== AUTO SAVE ====================
  function startAutoSave() {
    if (state.autoSaveTimer) {
      clearInterval(state.autoSaveTimer);
    }
    
    if (state.autoSaveEnabled) {
      state.autoSaveTimer = setInterval(async () => {
        if (state.currentMode === 'writing' && state.currentProject) {
          const content = document.getElementById('editor-content')?.value || '';
          if (content !== state.lastSavedContent && content.trim()) {
            try {
              await updateProjectSilent();
              state.lastSavedContent = content;
              showAutoSaveIndicator();
            } catch (e) {
              console.error('Auto save failed:', e);
            }
          }
        }
      }, 30000); // 30 seconds
    }
  }

  function stopAutoSave() {
    if (state.autoSaveTimer) {
      clearInterval(state.autoSaveTimer);
      state.autoSaveTimer = null;
    }
  }

  function showAutoSaveIndicator() {
    const indicator = document.getElementById('auto-save-indicator');
    if (indicator) {
      indicator.textContent = t('autoSaved');
      indicator.classList.remove('opacity-0');
      setTimeout(() => {
        indicator.classList.add('opacity-0');
      }, 2000);
    }
  }

  async function updateProjectSilent() {
    const content = document.getElementById('editor-content')?.value || '';
    const title = document.getElementById('project-title')?.value || t('newProject');
    
    if (!state.currentProject) return;
    
    // Update local state immediately
    state.currentProject.content = content;
    state.currentProject.title = title;
    state.currentProject.word_count = content.length;
    state.currentProject.updated_at = new Date().toISOString();
    
    // Update in projects list immediately
    const projectIndex = state.projects.findIndex(p => p.id === state.currentProject.id);
    if (projectIndex !== -1) {
      state.projects[projectIndex] = { ...state.currentProject };
      const [updatedProject] = state.projects.splice(projectIndex, 1);
      state.projects.unshift(updatedProject);
    }
    
    // Render sidebar immediately
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
      projectsList.innerHTML = renderProjectsList();
    }
    
    // Save to server in background
    api(`/projects/${state.currentProject.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        genre: state.currentProject.genre,
        custom_genre: state.currentProject.custom_genre,
        content
      })
    }).catch(e => console.error('Silent save failed:', e));
  }

  function toggleAutoSave() {
    state.autoSaveEnabled = !state.autoSaveEnabled;
    if (state.autoSaveEnabled) {
      startAutoSave();
      showToast(t('autoSaveEnabled'), 'success');
    } else {
      stopAutoSave();
      showToast(t('autoSaveDisabled'), 'info');
    }
    updateAutoSaveButton();
  }

  function updateAutoSaveButton() {
    const btn = document.getElementById('auto-save-btn');
    if (btn) {
      btn.innerHTML = `<i class="fas fa-sync"></i><span class="hidden sm:inline ml-1 text-xs">${state.autoSaveEnabled ? 'ON' : 'OFF'}</span>`;
      btn.className = state.autoSaveEnabled 
        ? 'p-1 sm:px-2 sm:py-1 text-green-600 hover:bg-green-50 rounded transition text-sm'
        : 'p-1 sm:px-2 sm:py-1 text-gray-400 hover:bg-gray-50 rounded transition text-sm';
    }
  }

  // ==================== KEYBOARD SHORTCUTS ====================
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', async (e) => {
      // Ctrl+S or Cmd+S: Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (state.currentMode === 'writing') {
          await window.saveProject();
        }
      }
      
      // Ctrl+Enter or Cmd+Enter: Generate
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (state.currentMode === 'writing' && !state.isGenerating) {
          const customPrompt = document.getElementById('custom-prompt')?.value;
          if (customPrompt?.trim()) {
            window.customGenerate();
          } else {
            window.aiContinue();
          }
        }
      }
      
      // Escape: Close modal
      if (e.key === 'Escape') {
        window.closeModal();
      }
    });
  }

  // ==================== RATE LIMITING ====================
  const RATE_LIMIT = 20; // requests per minute
  const RATE_LIMIT_WINDOW = 60000; // 1 minute

  function checkRateLimit() {
    const now = Date.now();
    
    if (now > state.rateLimitResetTime) {
      state.rateLimitCount = 0;
      state.rateLimitResetTime = now + RATE_LIMIT_WINDOW;
    }
    
    if (state.rateLimitCount >= RATE_LIMIT) {
      const waitTime = Math.ceil((state.rateLimitResetTime - now) / 1000);
      throw new Error(t('rateLimitExceeded') + ` (${waitTime}s)`);
    }
    
    state.rateLimitCount++;
    return true;
  }

  // ==================== TIME FORMATTING ====================
  function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffMin < 1) return t('justNow');
    if (diffMin < 60) return `${diffMin}${t('minutesAgo')}`;
    if (diffHour < 24) return `${diffHour}${t('hoursAgo')}`;
    if (diffDay < 7) return `${diffDay}${t('daysAgo')}`;
    return date.toLocaleDateString();
  }

  // ==================== TOAST NOTIFICATIONS ====================
  function showToast(message, type = 'info') {
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2`;
    toast.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ==================== AUTH ====================
  async function checkAuth() {
    try {
      const data = await api('/auth/me');
      state.user = data.user;
      state.preferences = data.preferences;
      if (state.user) {
        state.language = state.user.language || 'ja';
        state.selectedModel = state.preferences?.default_model || 'grok-4-1-fast-non-reasoning';
        state.theme = state.preferences?.theme || 'light';
        applyTheme();
      }
      return !!data.user;
    } catch (e) {
      return false;
    }
  }

  async function login(email, password) {
    const data = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    state.user = data.user;
    state.language = data.user.language || 'ja';
    return data;
  }

  async function register(email, password, username) {
    const data = await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username, language: state.language })
    });
    state.user = data.user;
    return data;
  }

  async function logout() {
    await api('/auth/logout', { method: 'POST' });
    state.user = null;
    state.projects = [];
    state.currentProject = null;
    render();
  }

  async function deleteAccount() {
    if (!confirm(t('confirmDelete'))) return;
    if (!confirm(t('confirmDeleteAccount'))) return;
    
    await api('/auth/account', { method: 'DELETE' });
    state.user = null;
    state.projects = [];
    showToast(t('deleted'), 'success');
    render();
  }

  // ==================== PROJECTS ====================
  async function loadProjects() {
    const data = await api('/projects');
    state.projects = data.projects;
  }

  async function createProject(title, genre, customGenre, type, content = '', concept = '', folderId = null) {
    const data = await api('/projects', {
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        genre, 
        custom_genre: customGenre,
        project_type: type, 
        content,
        concept,
        folder_id: folderId
      })
    });
    state.currentProject = data.project;
    await loadProjects();
    return data.project;
  }

  async function updateProject() {
    const content = document.getElementById('editor-content')?.value || '';
    const title = document.getElementById('project-title')?.value || t('newProject');
    
    // If no current project, create a new one
    if (!state.currentProject) {
      const data = await api('/projects', {
        method: 'POST',
        body: JSON.stringify({
          title: title || t('newProject'),
          project_type: 'writing',
          genre: 'other',
          content
        })
      });
      
      state.currentProject = {
        id: data.project.id,
        title: title,
        project_type: 'writing',
        genre: 'other',
        content: content,
        word_count: content.length,
        updated_at: new Date().toISOString()
      };
      
      // Immediately add to projects list for instant display
      state.projects.unshift(state.currentProject);
      
      // Immediately render sidebar
      const projectsList = document.getElementById('projects-list');
      if (projectsList) {
        projectsList.innerHTML = renderProjectsList();
      }
      
      updateCharCount();
      return;
    }
    
    // Update existing project
    // First update local state immediately for instant UI feedback
    state.currentProject.content = content;
    state.currentProject.title = title;
    state.currentProject.word_count = content.length;
    state.currentProject.updated_at = new Date().toISOString();
    
    // Update in projects list immediately
    const projectIndex = state.projects.findIndex(p => p.id === state.currentProject.id);
    if (projectIndex !== -1) {
      state.projects[projectIndex] = { ...state.currentProject };
      // Move to top of list (most recently updated)
      const [updatedProject] = state.projects.splice(projectIndex, 1);
      state.projects.unshift(updatedProject);
    }
    
    // Immediately render sidebar (before API call)
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
      projectsList.innerHTML = renderProjectsList();
    }
    
    updateCharCount();
    
    // Then save to server in background (non-blocking)
    api(`/projects/${state.currentProject.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        genre: state.currentProject.genre,
        custom_genre: state.currentProject.custom_genre,
        content
      })
    }).catch(e => console.error('Save failed:', e));
  }

  async function deleteProject(id) {
    if (!confirm(t('confirmDelete'))) return;
    
    await api(`/projects/${id}`, { method: 'DELETE' });
    if (state.currentProject?.id === id) {
      state.currentProject = null;
    }
    await loadProjects();
    render();
    showToast(t('deleted'), 'success');
  }

  async function loadProject(id) {
    const data = await api(`/projects/${id}`);
    state.currentProject = data.project;
    state.currentMode = data.project.project_type;
    state.lastSavedContent = data.project.content || '';
    render();
    startAutoSave();
  }

  // ==================== FOLDERS & TAGS ====================
  async function loadFolders() {
    try {
      const data = await api('/folders');
      state.folders = data.folders || [];
    } catch (e) {
      state.folders = [];
    }
  }

  async function loadTags() {
    try {
      const data = await api('/tags');
      state.tags = data.tags || [];
    } catch (e) {
      state.tags = [];
    }
  }

  async function createFolder(name, color) {
    const data = await api('/folders', {
      method: 'POST',
      body: JSON.stringify({ name, color })
    });
    state.folders.push(data.folder);
    return data.folder;
  }

  async function createTag(name, color) {
    const data = await api('/tags', {
      method: 'POST',
      body: JSON.stringify({ name, color })
    });
    state.tags.push(data.tag);
    return data.tag;
  }

  async function setProjectFolder(projectId, folderId) {
    await api(`/projects/${projectId}/folder`, {
      method: 'PUT',
      body: JSON.stringify({ folder_id: folderId })
    });
    const project = state.projects.find(p => p.id === projectId);
    if (project) {
      project.folder_id = folderId;
    }
    if (state.currentProject?.id === projectId) {
      state.currentProject.folder_id = folderId;
    }
  }

  // ==================== AI GENERATION ====================
  async function loadModels() {
    const data = await api('/grok/models');
    state.models = data.models;
  }

  async function generate(prompt, type, targetLength = null, context = null, targetLanguage = null) {
    // Check rate limit
    checkRateLimit();
    
    state.isGenerating = true;
    updateGenerateButton();
    
    try {
      const data = await api('/grok/generate', {
        method: 'POST',
        body: JSON.stringify({
          prompt,
          model: state.selectedModel,
          generation_type: type,
          target_length: targetLength,
          project_id: state.currentProject?.id,
          context,
          target_language: targetLanguage
        })
      });
      
      // Update usage display
      if (data.user_usage && state.user) {
        state.user.total_chars_used = data.user_usage.used;
        updateUsageDisplay();
      }
      
      return data.text;
    } finally {
      state.isGenerating = false;
      updateGenerateButton();
    }
  }

  // ==================== HISTORY ====================
  async function loadHistory() {
    const data = await api('/history');
    state.history = data.history;
  }

  // ==================== THEME ====================
  function applyTheme() {
    if (state.theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme();
  }

  // ==================== CHARACTER COUNT ====================
  function updateCharCount() {
    const editor = document.getElementById('editor-content');
    const counter = document.getElementById('char-count');
    if (editor && counter) {
      const text = editor.value;
      const chars = text.length;
      const charsNoSpace = text.replace(/\s/g, '').length;
      const lines = text.split('\n').length;
      
      const readingTimeMin = Math.ceil(charsNoSpace / 500);
      const readingTimeText = readingTimeMin < 1 ? '< 1 min' : `~${readingTimeMin} min`;
      const manuscriptPages = (charsNoSpace / 400).toFixed(1);
      
      counter.innerHTML = `
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
          <span><span class="font-semibold text-yellow-600">${formatNumber(chars)}</span> ${t('characters')}</span>
          <span class="hidden sm:inline text-gray-400">|</span>
          <span class="hidden sm:inline">${formatNumber(charsNoSpace)} ${t('charactersNoSpace')}</span>
          <span class="text-gray-400">|</span>
          <span>${formatNumber(lines)} ${t('lines')}</span>
          <span class="hidden sm:inline text-gray-400">|</span>
          <span class="hidden sm:inline"><i class="fas fa-clock text-gray-400 mr-1"></i>${readingTimeText}</span>
          <span class="hidden sm:inline text-gray-400">|</span>
          <span class="hidden sm:inline"><i class="fas fa-file-alt text-gray-400 mr-1"></i>${manuscriptPages} ${t('pages')}</span>
        </div>
      `;
    }
  }

  function updateGenerateButton() {
    const btn = document.getElementById('generate-btn');
    if (btn) {
      btn.disabled = state.isGenerating;
      btn.innerHTML = state.isGenerating 
        ? `<i class="fas fa-spinner fa-spin mr-2"></i>${t('generating')}`
        : `<i class="fas fa-magic mr-2"></i>${t('generate')}`;
    }
    
    // Show/hide loading overlay
    let overlay = document.getElementById('generating-overlay');
    if (state.isGenerating) {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'generating-overlay';
        overlay.className = 'fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50';
        overlay.innerHTML = `
          <div class="bg-white rounded-xl p-6 shadow-2xl flex items-center gap-4">
            <i class="fas fa-spinner fa-spin text-2xl text-yellow-600"></i>
            <span class="text-lg font-medium text-gray-800">${t('generating')}</span>
          </div>
        `;
        document.body.appendChild(overlay);
      }
    } else {
      if (overlay) {
        overlay.remove();
      }
    }
  }

  function updateUsageDisplay() {
    const usageEl = document.getElementById('usage-display');
    if (usageEl && state.user) {
      const used = state.user.total_chars_used || 0;
      const limit = state.user.total_chars_limit || 3000;
      const remaining = Math.max(0, limit - used);
      const percentage = Math.min(100, (used / limit) * 100);
      
      usageEl.innerHTML = `
        <div class="text-xs text-gray-600 mb-1">${t('usage')}: ${formatNumber(used)} / ${formatNumber(limit)}</div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="h-2 rounded-full ${percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'}" style="width: ${percentage}%"></div>
        </div>
        <div class="text-xs text-gray-500 mt-1">${t('remaining')}: ${formatNumber(remaining)}</div>
      `;
    }
  }

  // ==================== EDITOR EVENTS ====================
  function setupEditorEvents() {
    const editor = document.getElementById('editor-content');
    if (!editor) return;
    
    const newEditor = editor.cloneNode(true);
    editor.parentNode.replaceChild(newEditor, editor);
    
    // Apply vertical writing style if enabled
    if (state.verticalWriting) {
      newEditor.style.writingMode = 'vertical-rl';
      newEditor.style.textOrientation = 'mixed';
      newEditor.style.overflowX = 'auto';
      newEditor.style.overflowY = 'hidden';
      newEditor.classList.add('vertical-editor');
    }
    
    newEditor.addEventListener('input', () => {
      updateCharCount();
      
      // Clear existing timer
      if (state.autoSaveTimer) {
        clearTimeout(state.autoSaveTimer);
      }
      
      // Auto-save with debounce (shorter for new projects)
      const content = newEditor.value || '';
      const hasContent = content.trim().length > 0;
      
      if (hasContent) {
        // For new projects, save quickly (500ms) to create project immediately
        // For existing projects, use standard debounce (2000ms)
        const debounceTime = state.currentProject ? 2000 : 500;
        
        state.autoSaveTimer = setTimeout(async () => {
          try {
            await updateProject();
            // Only show toast for new project creation
            if (!state.currentProject) {
              showToast(t('saved'), 'success');
            }
          } catch (e) {
            console.error('Auto-save failed:', e);
          }
        }, debounceTime);
      }
    });
    
    newEditor.addEventListener('paste', () => setTimeout(updateCharCount, 10));
    newEditor.addEventListener('cut', () => setTimeout(updateCharCount, 10));
  }

  // ==================== UPGRADE MODAL ====================
  function showUpgradeModal() {
    const modals = document.getElementById('modals');
    if (!modals) return;
    
    // Pricing based on language (Japanese = JPY, others = USD)
    const isJapanese = state.language === 'ja';
    const standardPrice = isJapanese ? '¥1,000' : '$10';
    const premiumPrice = isJapanese ? '¥10,000' : '$100';
    
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-lg w-full p-6" onclick="event.stopPropagation()">
          <div class="text-center mb-6">
            <img src="/static/logo.png" alt="DANTE" class="w-16 h-16 mx-auto mb-4">
            <h3 class="text-xl font-bold text-gray-800">${t('purchaseCharacters') || t('upgrade')}</h3>
            <p class="text-gray-600 mt-2">${t('pleaseUpgrade')}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="border-2 border-yellow-500 rounded-lg p-4 bg-yellow-50 cursor-pointer hover:bg-yellow-100 transition" onclick="purchasePlan('standard')">
              <h4 class="font-bold text-lg">${t('standard')}</h4>
              <p class="text-2xl font-bold text-yellow-600">${standardPrice}</p>
              <p class="text-sm text-gray-600">500,000 ${t('characters')}</p>
              <p class="text-xs text-gray-500">≈ 5 books</p>
            </div>
            <div class="border-2 border-purple-500 rounded-lg p-4 bg-purple-50 cursor-pointer hover:bg-purple-100 transition" onclick="purchasePlan('premium')">
              <h4 class="font-bold text-lg">${t('premium')}</h4>
              <p class="text-2xl font-bold text-purple-600">${premiumPrice}</p>
              <p class="text-sm text-gray-600">6,000,000 ${t('characters')}</p>
              <p class="text-xs text-gray-500">≈ 60 books</p>
            </div>
          </div>
          
          <!-- Invite Code Section -->
          <div class="border-t pt-4 mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">${t('inviteCode')}</label>
            <div class="flex gap-2">
              <input type="text" id="invite-code-input" placeholder="${t('inviteCodePlaceholder')}" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
              <button onclick="applyInviteCode()" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">${t('inviteCodeApply')}</button>
            </div>
          </div>
          
          <button onclick="closeModal()" class="w-full py-2 text-gray-600 hover:text-gray-800">${t('close')}</button>
        </div>
      </div>
    `;
  }

  window.purchasePlan = async function(plan) {
    try {
      const data = await api('/payment/create', {
        method: 'POST',
        body: JSON.stringify({ plan })
      });
      
      if (data.session_url) {
        window.location.href = data.session_url;
      }
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.applyInviteCode = async function() {
    const input = document.getElementById('invite-code-input');
    if (!input) return;
    
    const code = input.value.trim();
    if (!code) return;
    
    try {
      const data = await api('/auth/invite-code', {
        method: 'POST',
        body: JSON.stringify({ code })
      });
      
      if (data.success) {
        // Show appropriate message based on whether chars were added
        if (data.chars_added) {
          const addedMsg = t('inviteCodeCharsAdded').replace('{chars}', data.chars_added.toLocaleString());
          showToast(addedMsg, 'success');
        } else {
          showToast(t('inviteCodeSuccess'), 'success');
        }
        closeModal();
        // Refresh user data
        await checkAuth();
        render();
      }
    } catch (e) {
      // Check if error message indicates code already used
      if (e.message && e.message.includes('already used')) {
        showToast(t('inviteCodeAlreadyUsed'), 'error');
      } else {
        showToast(t('inviteCodeError'), 'error');
      }
    }
  };

  // ==================== RENDER FUNCTIONS ====================
  
  function renderAuthPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 fade-in">
          <div class="text-center mb-8">
            <img src="/static/logo.png" alt="DANTE" class="w-24 h-24 mx-auto mb-4">
            <h1 class="text-3xl font-bold text-gray-800">${t('appName')}</h1>
            <p class="text-gray-600">${t('appSubtitle')}</p>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">${t('language')}</label>
            <select id="auth-language" class="w-full px-4 py-2 border border-gray-300 rounded-lg" onchange="changeAuthLanguage(this.value)">
              ${LANGUAGES.map(l => `<option value="${l.id}" ${state.language === l.id ? 'selected' : ''}>${l.name}</option>`).join('')}
            </select>
          </div>
          
          <div id="auth-form">
            <div class="space-y-4">
              <input type="email" id="auth-email" placeholder="${t('email')}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
              <input type="password" id="auth-password" placeholder="${t('password')}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
              <div id="username-field" class="hidden">
                <input type="text" id="auth-username" placeholder="${t('username')}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
              </div>
              <div id="terms-checkbox" class="hidden">
                <label class="flex items-start gap-2 text-sm text-gray-600">
                  <input type="checkbox" id="agree-terms" class="mt-1">
                  <span>${t('agreeTerms')}</span>
                </label>
                <div class="flex gap-4 mt-2 text-sm">
                  <a href="/terms?lang=${state.language}" target="_blank" class="text-blue-600 hover:underline">${t('terms')}</a>
                  <a href="/privacy?lang=${state.language}" target="_blank" class="text-blue-600 hover:underline">${t('privacy')}</a>
                </div>
              </div>
            </div>
            
            <button id="login-btn" onclick="handleLogin()" class="w-full mt-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-semibold">
              <i class="fas fa-sign-in-alt mr-2"></i>${t('login')}
            </button>
            
            <button id="register-btn" onclick="handleRegister()" class="hidden w-full mt-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-semibold">
              <i class="fas fa-user-plus mr-2"></i>${t('register')}
            </button>
            
            <div class="mt-4 text-center">
              <button id="toggle-mode-btn" onclick="toggleAuthMode()" class="text-yellow-600 hover:underline">
                ${t('register')}
              </button>
            </div>
          </div>
          
          <div class="mt-6 text-center text-sm text-gray-500">
            <a href="/help?lang=${state.language}" class="hover:underline">${t('help')}</a>
          </div>
        </div>
      </div>
    `;
  }

  window.changeAuthLanguage = function(lang) {
    state.language = lang;
    renderAuthPage();
  };

  let isRegisterMode = false;
  
  window.toggleAuthMode = function() {
    isRegisterMode = !isRegisterMode;
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const usernameField = document.getElementById('username-field');
    const termsCheckbox = document.getElementById('terms-checkbox');
    const toggleBtn = document.getElementById('toggle-mode-btn');
    
    if (isRegisterMode) {
      loginBtn.classList.add('hidden');
      registerBtn.classList.remove('hidden');
      usernameField.classList.remove('hidden');
      termsCheckbox.classList.remove('hidden');
      toggleBtn.textContent = t('login');
    } else {
      loginBtn.classList.remove('hidden');
      registerBtn.classList.add('hidden');
      usernameField.classList.add('hidden');
      termsCheckbox.classList.add('hidden');
      toggleBtn.textContent = t('register');
    }
  };

  window.handleLogin = async function() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    
    try {
      await login(email, password);
      await loadProjects();
      render();
      showToast(t('login') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.handleRegister = async function() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const username = document.getElementById('auth-username').value;
    const agreeTerms = document.getElementById('agree-terms').checked;
    
    if (!agreeTerms) {
      showToast(t('agreeTerms'), 'warning');
      return;
    }
    
    try {
      await register(email, password, username);
      await loadProjects();
      render();
      showToast(t('register') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  function renderMainApp() {
    const app = document.getElementById('app');
    const project = state.currentProject;
    
    app.innerHTML = `
      <div class="min-h-screen flex">
        <!-- Sidebar -->
        <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden md:hidden" onclick="toggleSidebar()"></div>
        <aside id="sidebar" class="sidebar w-64 bg-white border-r border-gray-200 flex flex-col h-screen md:relative md:left-0">
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center gap-3">
              <img src="/static/logo.png" alt="DANTE" class="w-10 h-10">
              <div>
                <h1 class="font-bold text-gray-800">${t('appName')}</h1>
                <p class="text-xs text-gray-500">${state.user?.username}</p>
              </div>
            </div>
            <div id="usage-display" class="mt-3"></div>
          </div>
          
          <!-- Folders & Projects List -->
          <div class="flex-1 overflow-y-auto p-4">
            <!-- Folders Section -->
            ${state.folders.length > 0 ? `
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xs font-semibold text-gray-500 uppercase">${t('folders')}</h3>
                <button onclick="showFolderModal()" class="text-gray-400 hover:text-yellow-600 transition" title="${t('addFolder')}">
                  <i class="fas fa-plus text-xs"></i>
                </button>
              </div>
              <div class="space-y-1">
                <button onclick="filterByFolder('')" class="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition ${state.selectedFolder === null ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-100 text-gray-600'}">
                  <i class="fas fa-layer-group text-xs"></i>
                  <span>${t('allProjects')}</span>
                  <span class="ml-auto text-xs text-gray-400">${state.projects.length}</span>
                </button>
                ${state.folders.map(f => {
                  const count = state.projects.filter(p => p.folder_id === f.id).length;
                  return `
                  <button onclick="filterByFolder('${f.id}')" class="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition ${state.selectedFolder === f.id ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-100 text-gray-600'}">
                    <div class="w-3 h-3 rounded" style="background-color: ${f.color}"></div>
                    <span class="truncate">${escapeHtml(f.name)}</span>
                    <span class="ml-auto text-xs text-gray-400">${count}</span>
                  </button>
                  `;
                }).join('')}
                <button onclick="filterByFolder('null')" class="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition ${state.selectedFolder === 'null' ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-100 text-gray-600'}">
                  <i class="fas fa-inbox text-xs text-gray-400"></i>
                  <span>${t('noFolder')}</span>
                  <span class="ml-auto text-xs text-gray-400">${state.projects.filter(p => !p.folder_id).length}</span>
                </button>
              </div>
            </div>
            <hr class="border-gray-200 mb-4">
            ` : `
            <div class="mb-3">
              <button onclick="showFolderModal()" class="w-full flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-yellow-500 hover:text-yellow-600 transition">
                <i class="fas fa-folder-plus"></i>
                <span>${t('addFolder')}</span>
              </button>
            </div>
            `}
            
            <!-- Projects Section -->
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xs font-semibold text-gray-500 uppercase">${t('projects')}</h3>
              <button onclick="showNewProjectModal()" class="text-yellow-600 hover:text-yellow-700 transition" title="${t('newProject')}">
                <i class="fas fa-plus text-xs"></i>
              </button>
            </div>
            <div id="projects-list">${renderProjectsList()}</div>
          </div>
          
          <!-- Bottom Actions -->
          <div class="p-4 border-t border-gray-200 space-y-2">
            <button onclick="showTrashModal()" class="w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-trash-alt"></i> ${t('trash')}
              <span id="trash-count" class="ml-auto text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded"></span>
            </button>
            <button onclick="showUpgradeModal()" class="w-full py-2 px-4 text-left text-yellow-600 hover:bg-yellow-50 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-crown"></i> ${t('upgrade')}
            </button>
            <button onclick="showSettingsModal()" class="w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-cog"></i> ${t('settings')}
            </button>
            <a href="/help?lang=${state.language}" class="block w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-question-circle"></i> ${t('help')}
            </a>
            <button onclick="logout()" class="w-full py-2 px-4 text-left text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-sign-out-alt"></i> ${t('logout')}
            </button>
          </div>
        </aside>
        
        <!-- Main Content -->
        <main class="flex-1 flex flex-col h-screen overflow-hidden">
          <!-- Header -->
          <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <button onclick="toggleSidebar()" class="md:hidden text-gray-600">
                <i class="fas fa-bars text-xl"></i>
              </button>
              <div class="flex gap-1 sm:gap-2">
                <button onclick="setMode('idea')" class="px-3 py-2 sm:px-4 rounded-lg transition ${state.currentMode === 'idea' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'}" title="${t('idea')}">
                  <i class="fas fa-lightbulb"></i><span class="hidden sm:inline ml-2">${t('idea')}</span>
                </button>
                <button onclick="setMode('plot')" class="px-3 py-2 sm:px-4 rounded-lg transition ${state.currentMode === 'plot' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'}" title="${t('plot')}">
                  <i class="fas fa-sitemap"></i><span class="hidden sm:inline ml-2">${t('plot')}</span>
                </button>
                <button onclick="setMode('writing')" class="px-3 py-2 sm:px-4 rounded-lg transition ${state.currentMode === 'writing' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'}" title="${t('writing')}">
                  <i class="fas fa-pen"></i><span class="hidden sm:inline ml-2">${t('writing')}</span>
                </button>
                <button onclick="setMode('mashiro')" class="px-3 py-2 sm:px-4 rounded-lg transition ${state.currentMode === 'mashiro' ? 'bg-pink-100 text-pink-700' : 'text-gray-600 hover:bg-gray-100'}" title="${t('mashiroConsultant')}">
                  <i class="fas fa-comments"></i><span class="hidden sm:inline ml-2">${t('mashiroConsultant')}</span>
                </button>
              </div>
            </div>
            <div class="flex items-center gap-1 sm:gap-2">
              <span id="auto-save-indicator" class="text-xs text-green-600 opacity-0 transition-opacity hidden sm:inline">${t('autoSaved')}</span>
              <button id="auto-save-btn" onclick="toggleAutoSave()" class="p-1 sm:px-2 sm:py-1 ${state.autoSaveEnabled ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'} rounded transition text-sm" title="${t('autoSave')}">
                <i class="fas fa-sync"></i><span class="hidden sm:inline ml-1 text-xs">${state.autoSaveEnabled ? 'ON' : 'OFF'}</span>
              </button>
              <button onclick="showTemplateModal()" class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg hidden sm:block" title="${t('templates')}">
                <i class="fas fa-file-alt"></i>
              </button>
              <button onclick="showShortcutsModal()" class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg hidden sm:block" title="${t('shortcuts')}">
                <i class="fas fa-keyboard"></i>
              </button>
              <select id="model-select" class="text-xs sm:text-sm border border-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 max-w-[100px] sm:max-w-none" onchange="changeModel(this.value)">
                ${state.models.map(m => `<option value="${m.id}" ${state.selectedModel === m.id ? 'selected' : ''}>${m.name}</option>`).join('')}
              </select>
              <button onclick="toggleTheme()" class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <i class="fas ${state.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
              </button>
            </div>
          </header>
          
          <!-- Content Area -->
          <div class="flex-1 overflow-auto p-4">
            ${renderCurrentMode()}
          </div>
        </main>
      </div>
      
      <!-- Mobile AI Button -->
      <button onclick="showMobileAIPanel()" class="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-yellow-600 text-white rounded-full shadow-lg flex items-center justify-center z-30">
        <i class="fas fa-magic text-xl"></i>
      </button>
      
      <!-- Modals Container -->
      <div id="modals"></div>
    `;
    
    setupEditorEvents();
    updateCharCount();
    updateUsageDisplay();
  }

  function renderProjectsList() {
    let filteredProjects = state.projects;
    
    // Filter by folder
    if (state.selectedFolder !== null) {
      if (state.selectedFolder === 'null') {
        filteredProjects = state.projects.filter(p => !p.folder_id);
      } else {
        filteredProjects = state.projects.filter(p => p.folder_id === state.selectedFolder);
      }
    }
    
    if (filteredProjects.length === 0) {
      return `<p class="text-sm text-gray-500 text-center py-4">${t('noProjects')}</p>`;
    }
    
    return filteredProjects.map(p => {
      const folder = state.folders.find(f => f.id === p.folder_id);
      const updatedAt = p.updated_at ? formatRelativeTime(p.updated_at) : '';
      return `
        <div class="group flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer ${state.currentProject?.id === p.id ? 'bg-yellow-50' : ''}" onclick="loadProject(${p.id})">
          <div class="flex flex-col items-center">
            <i class="fas ${getTypeIcon(p.project_type)} text-gray-400"></i>
            ${folder ? `<div class="w-2 h-2 rounded-full mt-1" style="background-color: ${folder.color}"></div>` : ''}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-700 truncate">${escapeHtml(p.title)}</p>
            <div class="flex items-center gap-2 text-xs text-gray-500">
              <span>${formatNumber(p.word_count || 0)} ${t('characters')}</span>
              ${updatedAt ? `<span class="text-gray-400">• ${updatedAt}</span>` : ''}
            </div>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
            <button onclick="event.stopPropagation(); showProjectFolderModal(${p.id})" class="text-gray-400 hover:text-yellow-600 p-1" title="${t('moveToFolder')}">
              <i class="fas fa-folder text-xs"></i>
            </button>
            <button onclick="event.stopPropagation(); deleteProject(${p.id})" class="text-gray-400 hover:text-red-600 p-1" title="${t('delete')}">
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function getTypeIcon(type) {
    const icons = { idea: 'fa-lightbulb', plot: 'fa-sitemap', writing: 'fa-pen' };
    return icons[type] || 'fa-file';
  }

  // Render context selection button
  function renderContextSelector() {
    const count = state.selectedContextProjects.length;
    const otherProjects = state.projects.filter(p => p.id !== state.currentProject?.id);
    if (otherProjects.length === 0) return '';
    
    return `
      <div class="bg-blue-50 rounded-lg p-3 mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i class="fas fa-book-reader text-blue-500"></i>
            <span class="text-sm font-medium text-gray-700">${t('referenceProjects')}</span>
          </div>
          <button id="context-selector-btn" onclick="showContextSelector()" class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
            ${count > 0 ? `${count} ${t('contextSelected')}` : t('noContextSelected')}
            <i class="fas fa-chevron-down ml-1"></i>
          </button>
        </div>
        <div id="selected-context-display" class="mt-2 flex flex-wrap gap-1 ${count > 0 ? '' : 'hidden'}">
          ${state.selectedContextProjects.map(id => {
            const p = state.projects.find(pr => pr.id === id);
            return p ? `<span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">${escapeHtml(p.title)}</span>` : '';
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderCurrentMode() {
    switch (state.currentMode) {
      case 'idea': return renderIdeaMode();
      case 'plot': return renderPlotMode();
      case 'mashiro': return renderMashiroMode();
      default: return renderWritingMode();
    }
  }

  function renderIdeaMode() {
    const savedConcept = state.currentProject?.concept || '';
    const savedIdeas = state.currentProject?.content || '';
    
    return `
      <div class="max-w-4xl mx-auto space-y-4">
        <!-- Context Selector -->
        ${renderContextSelector()}
        
        <!-- Concept Section -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>${t('concept')}</h2>
          <textarea id="concept-input" rows="4" placeholder="${t('conceptPlaceholder')}" class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3">${escapeHtml(savedConcept)}</textarea>
          <button onclick="saveConcept()" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
            <i class="fas fa-save mr-2"></i>${t('save')}
          </button>
        </div>
        
        <!-- Idea Generation -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-magic text-purple-500 mr-2"></i>${t('idea')}</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('genre')}</label>
              <select id="idea-genre" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                ${GENRES.map(g => `<option value="${g.id}"><i class="fas ${g.icon}"></i> ${t(g.id)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('themeKeyword')}</label>
              <input type="text" id="idea-theme" placeholder="${t('themeKeywordPlaceholder')}" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('conditions')}</label>
              <input type="text" id="idea-conditions" placeholder="${t('conditionsPlaceholder')}" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('ideaCount')}</label>
              <select id="idea-count" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="3">${t('ideaCount3')}</option>
                <option value="5" selected>${t('ideaCount5')}</option>
                <option value="10">${t('ideaCount10')}</option>
              </select>
            </div>
            <button onclick="generateIdeas()" id="generate-btn" class="w-full py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-semibold">
              <i class="fas fa-magic mr-2"></i>${t('generate')}
            </button>
          </div>
          
          <div id="idea-results" class="mt-6 ${savedIdeas ? '' : 'hidden'}">
            <div class="flex justify-between items-center mb-3">
              <h3 class="font-semibold text-gray-700">${t('generatedIdeas')}</h3>
              <button onclick="saveIdeas()" class="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                <i class="fas fa-save mr-1"></i>${t('save')}
              </button>
            </div>
            <div id="idea-output" class="prose max-w-none bg-gray-50 p-4 rounded-lg">${savedIdeas}</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPlotMode() {
    const savedConcept = state.currentProject?.concept || '';
    const savedPlot = state.currentProject?.plot_content || '';
    
    return `
      <div class="max-w-4xl mx-auto space-y-4">
        <!-- Context Selector -->
        ${renderContextSelector()}
        
        <!-- Show saved concept if exists -->
        ${savedConcept ? `
        <div class="bg-yellow-50 rounded-xl shadow p-4">
          <h3 class="font-semibold text-gray-700 mb-2"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>${t('concept')}</h3>
          <p class="text-gray-600 text-sm whitespace-pre-wrap">${escapeHtml(savedConcept)}</p>
        </div>
        ` : ''}
        
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-sitemap text-blue-500 mr-2"></i>${t('plot')}</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('genre')}</label>
              <select id="plot-genre" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                ${GENRES.map(g => `<option value="${g.id}">${t(g.id)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('ideaTheme')}</label>
              <textarea id="plot-idea" rows="3" placeholder="${t('plotPlaceholder')}" class="w-full px-4 py-2 border border-gray-300 rounded-lg">${escapeHtml(state.currentProject?.content || '')}</textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('detailLevel')}</label>
              <select id="plot-detail" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="simple">${t('detailSimple')}</option>
                <option value="standard" selected>${t('detailStandard')}</option>
                <option value="detailed">${t('detailDetailed')}</option>
              </select>
            </div>
            <button onclick="generatePlot()" id="generate-btn" class="w-full py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-semibold">
              <i class="fas fa-magic mr-2"></i>${t('generate')}
            </button>
          </div>
          
          <div id="plot-results" class="mt-6 ${savedPlot ? '' : 'hidden'}">
            <div class="flex justify-between items-center mb-3">
              <h3 class="font-semibold text-gray-700">${t('generatedPlot')}</h3>
              <div class="flex gap-2">
                <button onclick="savePlot()" class="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                  <i class="fas fa-save mr-1"></i>${t('save')}
                </button>
              </div>
            </div>
            <div id="plot-output" class="prose max-w-none bg-gray-50 p-4 rounded-lg">${savedPlot}</div>
            <button onclick="moveToWriting()" class="w-full mt-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-semibold">
              <i class="fas fa-pen-to-square mr-2"></i>${t('moveToWriting')}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderWritingMode() {
    const project = state.currentProject;
    const hasConcept = project?.concept?.trim();
    const hasPlot = project?.plot_content?.trim();
    const hasContext = hasConcept || hasPlot;
    const otherProjects = state.projects.filter(p => p.id !== project?.id);
    const hasOtherProjects = otherProjects.length > 0;
    const contextCount = state.selectedContextProjects.length;
    
    return `
      <div class="h-full flex gap-4">
        <!-- Editor -->
        <div class="flex-1 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
          <div class="p-2 sm:p-4 border-b border-gray-200 flex items-center justify-between gap-2">
            <input type="text" id="project-title" value="${escapeHtml(project?.title || '')}" placeholder="${t('title')}" class="text-base sm:text-lg font-semibold text-gray-800 border-none focus:outline-none flex-1 min-w-0">
            <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button id="save-btn" onclick="saveProject()" class="p-2 sm:px-3 sm:py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition" title="${t('save')}">
                <i class="fas fa-save"></i><span class="hidden sm:inline ml-1 text-sm">${t('save')}</span>
              </button>
              <button onclick="toggleVerticalWriting()" class="p-2 sm:px-3 sm:py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition ${state.verticalWriting ? 'bg-yellow-100 text-yellow-700' : ''}" title="${state.verticalWriting ? t('horizontalWriting') : t('verticalWriting')}">
                <i class="fas fa-align-${state.verticalWriting ? 'right' : 'left'} ${state.verticalWriting ? 'rotate-90' : ''}"></i>
              </button>
              <button onclick="showImportModal()" class="p-2 sm:px-3 sm:py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition" title="${t('import')}">
                <i class="fas fa-upload"></i><span class="hidden sm:inline ml-1 text-sm">${t('import')}</span>
              </button>
              <button onclick="showExportModal()" class="p-2 sm:px-3 sm:py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition" title="${t('export')}">
                <i class="fas fa-download"></i><span class="hidden sm:inline ml-1 text-sm">${t('export')}</span>
              </button>
              <button onclick="showHistoryModal()" class="p-2 sm:px-3 sm:py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition" title="${t('history')}">
                <i class="fas fa-history"></i><span class="hidden sm:inline ml-1 text-sm">${t('history')}</span>
              </button>
            </div>
          </div>
          
          <!-- Reference Projects Selector -->
          ${hasOtherProjects ? `
          <div id="writing-context-bar" class="border-b border-gray-200 bg-blue-50 px-4 py-2 flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-book-reader text-blue-500"></i>
              <span class="text-gray-700">${t('referenceProjects')}</span>
              <span id="writing-context-tags" class="flex flex-wrap gap-1 ml-2 ${contextCount > 0 ? '' : 'hidden'}">
                ${state.selectedContextProjects.slice(0, 2).map(id => {
                  const p = state.projects.find(pr => pr.id === id);
                  return p ? `<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">${escapeHtml(p.title)}</span>` : '';
                }).join('')}
                ${contextCount > 2 ? `<span class="text-xs text-blue-600">+${contextCount - 2}</span>` : ''}
              </span>
            </div>
            <button id="writing-context-btn" onclick="showContextSelector()" class="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition">
              ${contextCount > 0 ? `${contextCount} ${t('contextSelected')}` : t('noContextSelected')}
            </button>
          </div>
          ` : ''}
          
          <!-- Context Panel (Concept & Plot) -->
          ${hasContext ? `
          <div class="border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-blue-50">
            <button onclick="toggleContextPanel()" class="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-700 hover:bg-white/50">
              <span><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>${t('concept')} / ${t('plot')}</span>
              <i id="context-toggle-icon" class="fas fa-chevron-down"></i>
            </button>
            <div id="context-panel" class="hidden px-4 pb-3 space-y-2 text-sm">
              ${hasConcept ? `
              <div class="bg-white/70 rounded p-2">
                <strong class="text-yellow-700">${t('concept')}:</strong>
                <p class="text-gray-600 mt-1 whitespace-pre-wrap">${escapeHtml(project.concept)}</p>
              </div>
              ` : ''}
              ${hasPlot ? `
              <div class="bg-white/70 rounded p-2">
                <strong class="text-blue-700">${t('plotContent')}:</strong>
                <p class="text-gray-600 mt-1 whitespace-pre-wrap">${escapeHtml(project.plot_content)}</p>
              </div>
              ` : ''}
            </div>
          </div>
          ` : ''}
          
          <textarea id="editor-content" class="flex-1 p-6 resize-none border-none focus:outline-none focus:ring-0 text-gray-800 leading-relaxed editor-area" placeholder="${t('editorPlaceholder')}">${project?.content || ''}</textarea>
          
          <div class="p-3 border-t border-gray-200 bg-gray-50">
            <div id="char-count" class="text-sm text-gray-600 char-counter"></div>
          </div>
        </div>
        
        <!-- AI Panel (Desktop) -->
        <div class="hidden lg:flex w-80 bg-white rounded-xl shadow-lg flex-col overflow-hidden">
          <div class="p-4 border-b border-gray-200">
            <h3 class="font-semibold text-gray-800"><i class="fas fa-robot mr-2"></i>AI Assistant</h3>
          </div>
          
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <!-- Use Idea/Plot Checkbox -->
            ${hasContext ? `
            <label class="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg cursor-pointer">
              <input type="checkbox" id="use-idea-plot" class="w-4 h-4 text-yellow-600" checked>
              <span class="text-sm text-gray-700">${t('useIdeaPlot')}</span>
            </label>
            ` : ''}
            
            <button onclick="aiContinue()" class="w-full py-2 px-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-arrow-right text-green-500"></i> ${t('continue')}
            </button>
            <button onclick="aiRewrite()" class="w-full py-2 px-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-sync text-blue-500"></i> ${t('rewrite')}
            </button>
            <button onclick="aiExpand()" class="w-full py-2 px-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-expand-arrows-alt text-purple-500"></i> ${t('expand')}
            </button>
            <button onclick="aiProofread()" class="w-full py-2 px-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-spell-check text-orange-500"></i> ${t('proofread')}
            </button>
            <button onclick="aiSummarize()" class="w-full py-2 px-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-compress-alt text-teal-500"></i> ${t('summarize')}
            </button>
            <button onclick="showTranslateModal()" class="w-full py-2 px-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-language text-red-500"></i> ${t('translate')}
            </button>
            <button onclick="aiTitleGenerate()" class="w-full py-2 px-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-heading text-indigo-500"></i> ${t('titleGenerate')}
            </button>
            
            <hr class="my-2">
            <p class="text-xs text-gray-500 mb-1">${t('styleFormal').includes('Style') || t('styleFormal').includes('стиль') || t('styleFormal').includes('أسلوب') ? 'Style Conversion' : '文体変換'}</p>
            <div class="flex gap-2">
              <button onclick="aiStyleFormal()" class="flex-1 py-2 px-2 text-center bg-gray-50 hover:bg-gray-100 rounded-lg transition text-xs">
                <i class="fas fa-user-tie text-gray-600"></i><br>${t('styleFormal')}
              </button>
              <button onclick="aiStyleCasual()" class="flex-1 py-2 px-2 text-center bg-gray-50 hover:bg-gray-100 rounded-lg transition text-xs">
                <i class="fas fa-smile text-yellow-500"></i><br>${t('styleCasual')}
              </button>
              <button onclick="aiStyleLiterary()" class="flex-1 py-2 px-2 text-center bg-gray-50 hover:bg-gray-100 rounded-lg transition text-xs">
                <i class="fas fa-feather-alt text-pink-500"></i><br>${t('styleLiterary')}
              </button>
            </div>
            
            <hr class="my-2">
            
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">${t('customPrompt')}</label>
              <textarea id="custom-prompt" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="${t('enterPrompt')}"></textarea>
              <input type="number" id="target-length" placeholder="${t('targetLength')}" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <p class="text-xs text-gray-500">${t('targetLengthNote')}</p>
              <button onclick="customGenerate()" id="generate-btn" class="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-sm">
                <i class="fas fa-magic mr-2"></i>${t('generate')}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==================== MASHIRO CONSULTANT MODE ====================

  function renderMashiroMode() {
    return `
      <div class="max-w-3xl mx-auto h-full flex flex-col">
        <div class="bg-white rounded-xl shadow-lg flex-1 flex flex-col overflow-hidden">
          <!-- Mashiro Header -->
          <div class="bg-gradient-to-r from-pink-500 to-purple-500 p-4 flex items-center gap-4">
            <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <img src="/static/mashiro_icon.png" alt="Mashiro" class="w-full h-full object-cover object-top">
            </div>
            <div class="text-white">
              <h2 class="text-xl font-bold">マシロさん</h2>
              <p class="text-sm opacity-90">執筆相談AIアシスタント</p>
            </div>
          </div>
          
          <!-- Chat Messages -->
          <div id="mashiro-chat" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            ${state.mashiroMessages.length === 0 ? `
              <div class="flex gap-3">
                <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img src="/static/mashiro_icon.png" alt="Mashiro" class="w-full h-full object-cover object-top">
                </div>
                <div class="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%]">
                  <p class="text-gray-800">${t('mashiroGreeting')}</p>
                </div>
              </div>
            ` : state.mashiroMessages.map(msg => `
              <div class="flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}">
                ${msg.role === 'assistant' ? `
                  <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src="/static/mashiro_icon.png" alt="Mashiro" class="w-full h-full object-cover object-top">
                  </div>
                ` : `
                  <div class="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user text-white"></i>
                  </div>
                `}
                <div class="${msg.role === 'user' ? 'bg-yellow-500 text-white rounded-2xl rounded-tr-none' : 'bg-white rounded-2xl rounded-tl-none shadow-sm'} p-4 max-w-[80%]">
                  <p class="${msg.role === 'user' ? 'text-white' : 'text-gray-800'}" style="white-space: pre-wrap;">${escapeHtml(msg.content)}</p>
                </div>
              </div>
            `).join('')}
            ${state.mashiroTyping ? `
              <div class="flex gap-3">
                <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img src="/static/mashiro_icon.png" alt="Mashiro" class="w-full h-full object-cover object-top">
                </div>
                <div class="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm">
                  <div class="flex gap-1">
                    <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s;"></span>
                    <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></span>
                  </div>
                </div>
              </div>
            ` : ''}
          </div>
          
          <!-- Input Area -->
          <div class="p-4 border-t border-gray-200 bg-white">
            <div class="flex gap-2">
              <button onclick="toggleVoiceInput()" id="voice-btn" class="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition" title="${t('mashiroVoiceInput')}">
                <i class="fas fa-microphone text-gray-600"></i>
              </button>
              <input type="text" id="mashiro-input" 
                class="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-pink-500" 
                placeholder="${t('mashiroPlaceholder')}"
                onkeypress="if(event.key === 'Enter') sendToMashiro()">
              <button onclick="sendToMashiro()" class="p-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white transition">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
            <p id="voice-status" class="text-xs text-gray-500 mt-2 hidden text-center"></p>
          </div>
        </div>
      </div>
    `;
  }

  // ==================== MODAL FUNCTIONS ====================
  
  window.closeModal = function(event) {
    if (event && event.target !== event.currentTarget) return;
    const modals = document.getElementById('modals');
    if (modals) modals.innerHTML = '';
  };

  window.showNewProjectModal = function() {
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-md w-full p-6" onclick="event.stopPropagation()">
          <h3 class="text-xl font-bold text-gray-800 mb-4">${t('newProject')}</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('title')}</label>
              <input type="text" id="new-project-title" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('genre')}</label>
              <select id="new-project-genre" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                ${GENRES.map(g => `<option value="${g.id}">${t(g.id)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">タイプ</label>
              <div class="grid grid-cols-3 gap-2">
                <button onclick="selectProjectType('idea')" class="project-type-btn py-2 px-4 border rounded-lg text-center hover:border-yellow-500">
                  <i class="fas fa-lightbulb text-yellow-500"></i>
                  <div class="text-xs mt-1">${t('idea')}</div>
                </button>
                <button onclick="selectProjectType('plot')" class="project-type-btn py-2 px-4 border rounded-lg text-center hover:border-yellow-500">
                  <i class="fas fa-sitemap text-blue-500"></i>
                  <div class="text-xs mt-1">${t('plot')}</div>
                </button>
                <button onclick="selectProjectType('writing')" class="project-type-btn py-2 px-4 border rounded-lg text-center hover:border-yellow-500 border-yellow-500 bg-yellow-50">
                  <i class="fas fa-pen text-green-500"></i>
                  <div class="text-xs mt-1">${t('writing')}</div>
                </button>
              </div>
              <input type="hidden" id="selected-project-type" value="writing">
            </div>
          </div>
          
          <div class="mt-6 flex gap-3">
            <button onclick="closeModal()" class="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">${t('cancel')}</button>
            <button onclick="createNewProject()" class="flex-1 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">作成</button>
          </div>
        </div>
      </div>
    `;
  };

  window.selectProjectType = function(type) {
    document.getElementById('selected-project-type').value = type;
    document.querySelectorAll('.project-type-btn').forEach(btn => {
      btn.classList.remove('border-yellow-500', 'bg-yellow-50');
    });
    event.currentTarget.classList.add('border-yellow-500', 'bg-yellow-50');
  };

  window.createNewProject = async function() {
    const title = document.getElementById('new-project-title').value;
    const genre = document.getElementById('new-project-genre').value;
    const type = document.getElementById('selected-project-type').value;
    
    if (!title) {
      showToast(t('title') + ' is required', 'warning');
      return;
    }
    
    try {
      // Create project with current folder if one is selected
      // When selectedFolder is 'null' (string for uncategorized), or actual null (all projects view), pass null
      // When selectedFolder is an actual folder ID, pass it
      const folderId = (state.selectedFolder && state.selectedFolder !== 'null') ? state.selectedFolder : null;
      await createProject(title, genre, null, type, null, null, folderId);
      closeModal();
      render();
      showToast(t('saved'), 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.showSettingsModal = function() {
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-md w-full p-6" onclick="event.stopPropagation()">
          <h3 class="text-xl font-bold text-gray-800 mb-4">${t('settings')}</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('language')}</label>
              <select id="settings-language" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                ${LANGUAGES.map(l => `<option value="${l.id}" ${state.language === l.id ? 'selected' : ''}>${l.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('model')}</label>
              <select id="settings-model" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                ${state.models.map(m => `<option value="${m.id}" ${state.selectedModel === m.id ? 'selected' : ''}>${m.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('theme')}</label>
              <div class="flex gap-2">
                <button onclick="setSettingsTheme('light')" class="flex-1 py-2 border rounded-lg ${state.theme === 'light' ? 'border-yellow-500 bg-yellow-50' : ''}">${t('light')}</button>
                <button onclick="setSettingsTheme('dark')" class="flex-1 py-2 border rounded-lg ${state.theme === 'dark' ? 'border-yellow-500 bg-yellow-50' : ''}">${t('dark')}</button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-gray-700">${t('autoSave')}</label>
              <input type="checkbox" id="settings-autosave" ${state.preferences?.auto_save !== false ? 'checked' : ''} class="w-5 h-5 text-yellow-600 rounded">
            </div>
          </div>
          
          <div class="mt-6 flex gap-3">
            <button onclick="closeModal()" class="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">${t('cancel')}</button>
            <button onclick="saveSettings()" class="flex-1 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">${t('save')}</button>
          </div>
          
          <div class="mt-4 pt-4 border-t">
            <button onclick="deleteAccount()" class="w-full py-2 text-red-600 hover:bg-red-50 rounded-lg transition">${t('deleteAccount')}</button>
          </div>
        </div>
      </div>
    `;
  };

  window.setSettingsTheme = function(theme) {
    state.theme = theme;
    applyTheme();
    showSettingsModal();
  };

  window.saveSettings = async function() {
    const language = document.getElementById('settings-language').value;
    const model = document.getElementById('settings-model').value;
    const autoSave = document.getElementById('settings-autosave').checked;
    
    try {
      await api('/auth/preferences', {
        method: 'PUT',
        body: JSON.stringify({
          default_model: model,
          default_genre: state.preferences?.default_genre || 'novel',
          theme: state.theme,
          auto_save: autoSave,
          language
        })
      });
      
      state.selectedModel = model;
      state.language = language;
      state.preferences = { ...state.preferences, default_model: model, theme: state.theme, auto_save: autoSave };
      
      closeModal();
      render();
      showToast(t('saved'), 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.showTranslateModal = function() {
    const editor = document.getElementById('editor-content');
    const selected = editor.value.substring(editor.selectionStart, editor.selectionEnd);
    
    if (!selected.trim()) {
      showToast(t('selectText'), 'warning');
      return;
    }
    
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-md w-full p-6" onclick="event.stopPropagation()">
          <h3 class="text-xl font-bold text-gray-800 mb-4">${t('translate')}</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('translationTarget')}</label>
              <select id="translate-target" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                ${LANGUAGES.map(l => `<option value="${l.name}">${l.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">選択されたテキスト</label>
              <div class="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 max-h-32 overflow-y-auto">${escapeHtml(selected.substring(0, 500))}${selected.length > 500 ? '...' : ''}</div>
            </div>
          </div>
          
          <div class="mt-6 flex gap-3">
            <button onclick="closeModal()" class="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">${t('cancel')}</button>
            <button onclick="doTranslate()" class="flex-1 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">${t('translate')}</button>
          </div>
        </div>
      </div>
    `;
  };

  window.doTranslate = async function() {
    const editor = document.getElementById('editor-content');
    const selected = editor.value.substring(editor.selectionStart, editor.selectionEnd);
    const targetLang = document.getElementById('translate-target').value;
    
    closeModal();
    
    try {
      const result = await generate(`以下を${targetLang}に翻訳してください:\n\n${selected}`, 'translate', null, null, targetLang);
      
      const modals = document.getElementById('modals');
      modals.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
          <div class="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
            <h3 class="text-xl font-bold text-gray-800 mb-4">${t('translate')} → ${targetLang}</h3>
            <div class="prose max-w-none bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">${escapeHtml(result)}</div>
            <div class="mt-4 flex gap-3">
              <button onclick="closeModal()" class="flex-1 py-2 border border-gray-300 rounded-lg">${t('close')}</button>
              <button onclick="copyToClipboard(\`${result.replace(/`/g, "'")}\`)" class="flex-1 py-2 bg-gray-600 text-white rounded-lg">${t('copy')}</button>
              <button onclick="insertTranslation(\`${result.replace(/`/g, "'")}\`)" class="flex-1 py-2 bg-yellow-600 text-white rounded-lg">${t('insert')}</button>
            </div>
          </div>
        </div>
      `;
      
      showToast(t('translate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.insertTranslation = function(text) {
    const editor = document.getElementById('editor-content');
    const end = editor.selectionEnd;
    editor.value = editor.value.substring(0, end) + '\n\n' + text + editor.value.substring(end);
    updateCharCount();
    closeModal();
    showToast(t('insert') + ' OK', 'success');
  };

  window.showMobileAIPanel = function() {
    const modals = document.getElementById('modals');
    const editor = document.getElementById('editor-content');
    const content = editor ? editor.value : '';
    const charCount = content.length;
    const charCountNoSpace = content.replace(/\s/g, '').length;
    const lineCount = content ? content.split('\n').length : 0;
    const hasContext = state.currentProject?.concept || state.currentProject?.plot_content;
    
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50" onclick="closeModal(event)">
        <div class="bg-white rounded-t-xl w-full p-4 max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-bold text-gray-800">AI Assistant</h3>
            <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <!-- Character Count Display -->
          <div class="bg-gray-100 rounded-lg p-3 mb-4 text-sm">
            <div class="grid grid-cols-2 gap-2">
              <div><span class="text-gray-600">${t('characters')}:</span> <span class="font-semibold">${charCount.toLocaleString()}</span></div>
              <div><span class="text-gray-600">${t('charactersNoSpace')}:</span> <span class="font-semibold">${charCountNoSpace.toLocaleString()}</span></div>
              <div><span class="text-gray-600">${t('lines')}:</span> <span class="font-semibold">${lineCount.toLocaleString()}</span></div>
              <div><span class="text-gray-600">${t('pages')}:</span> <span class="font-semibold">${(charCount / 400).toFixed(1)}</span></div>
            </div>
          </div>
          
          <!-- Use Idea/Plot Checkbox (mobile) -->
          ${hasContext ? `
          <label class="flex items-center gap-2 p-2 mb-3 bg-yellow-50 rounded-lg cursor-pointer">
            <input type="checkbox" id="use-idea-plot" class="w-4 h-4 text-yellow-600" checked>
            <span class="text-sm text-gray-700">${t('useIdeaPlot')}</span>
          </label>
          ` : ''}
          
          <!-- Quick Actions -->
          <div class="grid grid-cols-3 gap-2 mb-4">
            <button onclick="closeModal(); aiContinue()" class="py-2 bg-gray-50 rounded-lg text-sm"><i class="fas fa-arrow-right text-green-500"></i><div class="text-xs mt-1">${t('continue')}</div></button>
            <button onclick="closeModal(); aiRewrite()" class="py-2 bg-gray-50 rounded-lg text-sm"><i class="fas fa-sync text-blue-500"></i><div class="text-xs mt-1">${t('rewrite')}</div></button>
            <button onclick="closeModal(); aiExpand()" class="py-2 bg-gray-50 rounded-lg text-sm"><i class="fas fa-expand-arrows-alt text-purple-500"></i><div class="text-xs mt-1">${t('expand')}</div></button>
            <button onclick="closeModal(); aiProofread()" class="py-2 bg-gray-50 rounded-lg text-sm"><i class="fas fa-spell-check text-orange-500"></i><div class="text-xs mt-1">${t('proofread')}</div></button>
            <button onclick="closeModal(); aiSummarize()" class="py-2 bg-gray-50 rounded-lg text-sm"><i class="fas fa-compress-alt text-teal-500"></i><div class="text-xs mt-1">${t('summarize')}</div></button>
            <button onclick="closeModal(); showTranslateModal()" class="py-2 bg-gray-50 rounded-lg text-sm"><i class="fas fa-language text-red-500"></i><div class="text-xs mt-1">${t('translate')}</div></button>
          </div>
          
          <!-- Custom Prompt Section -->
          <div class="border-t pt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">${t('customPrompt')}</label>
            <textarea id="mobile-custom-prompt" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2" placeholder="${t('enterPrompt')}"></textarea>
            <div class="flex gap-2 mb-1">
              <input type="number" id="mobile-target-length" placeholder="${t('targetLength')}" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <button onclick="mobileCustomGenerate()" class="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm">
                <i class="fas fa-magic mr-1"></i>${t('generate')}
              </button>
            </div>
            <p class="text-xs text-gray-500 mb-3">${t('targetLengthNote')}</p>
          </div>
          
          <!-- Title Generate -->
          <button onclick="closeModal(); aiTitleGenerate()" class="w-full py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm mb-3">
            <i class="fas fa-heading mr-2"></i>${t('titleGenerate')}
          </button>
          
          <!-- Style Conversion -->
          <div class="border-t pt-3">
            <p class="text-xs text-gray-500 mb-2">${t('styleFormal').includes('Style') || t('styleFormal').includes('стиль') || t('styleFormal').includes('أسلوب') ? 'Style Conversion' : '文体変換'}</p>
            <div class="grid grid-cols-3 gap-2">
              <button onclick="closeModal(); aiStyleFormal()" class="py-2 bg-gray-50 rounded-lg text-sm">
                <i class="fas fa-user-tie text-gray-600"></i>
                <div class="text-xs mt-1">${t('styleFormal')}</div>
              </button>
              <button onclick="closeModal(); aiStyleCasual()" class="py-2 bg-gray-50 rounded-lg text-sm">
                <i class="fas fa-smile text-yellow-500"></i>
                <div class="text-xs mt-1">${t('styleCasual')}</div>
              </button>
              <button onclick="closeModal(); aiStyleLiterary()" class="py-2 bg-gray-50 rounded-lg text-sm">
                <i class="fas fa-feather-alt text-pink-500"></i>
                <div class="text-xs mt-1">${t('styleLiterary')}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  };
  
  window.mobileCustomGenerate = async function() {
    const prompt = document.getElementById('mobile-custom-prompt').value;
    const targetLength = document.getElementById('mobile-target-length').value;
    const useContext = document.getElementById('use-idea-plot')?.checked;
    
    if (!prompt.trim()) {
      showToast(t('enterPrompt'), 'warning');
      return;
    }
    
    closeModal();
    
    const editor = document.getElementById('editor-content');
    const editorContext = editor?.value || '';
    let projectContext = '';
    if (useContext && state.currentProject) {
      if (state.currentProject.concept) {
        projectContext += `【コンセプト・企画】\n${state.currentProject.concept}\n\n`;
      }
      if (state.currentProject.plot_content) {
        projectContext += `【プロット】\n${state.currentProject.plot_content}\n\n`;
      }
    }
    const fullContext = projectContext + editorContext;
    
    try {
      state.isGenerating = true;
      updateGenerateButton();
      const result = await generate(prompt, 'writing', targetLength ? parseInt(targetLength) : null, fullContext);
      
      if (editor) {
        editor.value = editorContext + (editorContext ? '\n\n' : '') + result;
        updateCharCount();
      }
      
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      state.isGenerating = false;
      updateGenerateButton();
    }
  };

  window.showHistoryModal = async function() {
    await loadHistory();
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
          <h3 class="text-xl font-bold text-gray-800 mb-2">${t('history')}</h3>
          <p class="text-sm text-gray-500 mb-4 bg-blue-50 p-2 rounded"><i class="fas fa-info-circle mr-1"></i>${t('historyDesc')}</p>
          <div class="space-y-3">
            ${state.history.length === 0 ? '<p class="text-gray-500 text-center py-4">No history</p>' : state.history.slice(0, 20).map(h => `
              <div class="border border-gray-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs px-2 py-1 bg-gray-100 rounded">${h.generation_type}</span>
                  <span class="text-xs text-gray-500">${new Date(h.created_at).toLocaleString()}</span>
                </div>
                <p class="text-sm text-gray-600 truncate">${escapeHtml(h.prompt.substring(0, 100))}</p>
                <div class="mt-2 flex gap-2">
                  <button onclick="copyToClipboard(\`${h.response.replace(/`/g, "'").replace(/\n/g, "\\n")}\`)" class="text-xs text-blue-600">${t('copy')}</button>
                  <button onclick="insertToEditor(\`${h.response.replace(/`/g, "'").replace(/\n/g, "\\n")}\`)" class="text-xs text-green-600">${t('insert')}</button>
                </div>
              </div>
            `).join('')}
          </div>
          <button onclick="closeModal()" class="w-full mt-4 py-2 border border-gray-300 rounded-lg">${t('close')}</button>
        </div>
      </div>
    `;
  };

  window.showExportModal = function() {
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
          <h3 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-download mr-2 text-yellow-600"></i>${t('export')}</h3>
          <div class="grid grid-cols-2 gap-3">
            <button onclick="exportAs('txt')" class="py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-yellow-400 flex items-center gap-3 transition">
              <i class="fas fa-file-alt text-blue-500 w-5 text-center"></i>
              <span class="text-sm">.txt</span>
            </button>
            <button onclick="exportAs('md')" class="py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-yellow-400 flex items-center gap-3 transition">
              <i class="fab fa-markdown text-purple-500 w-5 text-center"></i>
              <span class="text-sm">.md</span>
            </button>
            <button onclick="exportAs('docx')" class="py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-yellow-400 flex items-center gap-3 transition">
              <i class="fas fa-file-word text-blue-600 w-5 text-center"></i>
              <span class="text-sm">.docx</span>
            </button>
            <button onclick="exportAs('pdf')" class="py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-yellow-400 flex items-center gap-3 transition">
              <i class="fas fa-file-pdf text-red-500 w-5 text-center"></i>
              <span class="text-sm">.pdf</span>
            </button>
            <button onclick="exportAs('rtf')" class="py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-yellow-400 flex items-center gap-3 transition">
              <i class="fas fa-file-lines text-green-500 w-5 text-center"></i>
              <span class="text-sm">.rtf</span>
            </button>
            <button onclick="exportAs('html')" class="py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-yellow-400 flex items-center gap-3 transition">
              <i class="fas fa-code text-teal-500 w-5 text-center"></i>
              <span class="text-sm">.html</span>
            </button>
            <button onclick="copyContent('editor-content')" class="py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-yellow-400 flex items-center gap-3 transition">
              <i class="fas fa-copy text-gray-500 w-5 text-center"></i>
              <span class="text-sm">${t('copy')}</span>
            </button>
          </div>
          <button onclick="closeModal()" class="w-full mt-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">${t('close')}</button>
        </div>
      </div>
    `;
  };

  // Import modal
  window.showImportModal = function() {
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-md w-full p-6" onclick="event.stopPropagation()">
          <h3 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-upload mr-2"></i>${t('import')}</h3>
          <div class="space-y-4">
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yellow-500 transition cursor-pointer" onclick="document.getElementById('import-file').click()">
              <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-3"></i>
              <p class="text-gray-600">${t('importFile')}</p>
              <p class="text-sm text-gray-400 mt-2">${t('importSupported')}</p>
            </div>
            <input type="file" id="import-file" class="hidden" accept=".txt,.rtf,.docx,.doc" onchange="handleImportFile(event)">
          </div>
          <button onclick="closeModal()" class="w-full mt-4 py-2 border border-gray-300 rounded-lg">${t('close')}</button>
        </div>
      </div>
    `;
  };

  // ==================== AI ACTIONS ====================

  window.generateIdeas = async function() {
    const genre = document.getElementById('idea-genre').value;
    const theme = document.getElementById('idea-theme').value;
    const conditions = document.getElementById('idea-conditions').value;
    const count = document.getElementById('idea-count').value;
    const conceptInput = document.getElementById('concept-input')?.value || '';
    
    const genreName = t(genre);
    let prompt = `ジャンル: ${genreName}\nテーマ・キーワード: ${theme || '自由'}\n条件: ${conditions || 'なし'}\n`;
    if (conceptInput) {
      prompt += `コンセプト: ${conceptInput}\n`;
    }
    prompt += `\n${count}つの斬新で魅力的なアイデアを提案してください。`;
    
    // Add context from selected reference projects
    const refContext = getProjectContext();
    
    try {
      const result = await generate(prompt, 'idea', null, refContext || null);
      document.getElementById('idea-output').innerHTML = result.replace(/\n/g, '<br>');
      document.getElementById('idea-results').classList.remove('hidden');
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.generatePlot = async function() {
    const genre = document.getElementById('plot-genre').value;
    const idea = document.getElementById('plot-idea').value;
    const detail = document.getElementById('plot-detail').value;
    
    // Allow generation with just genre (no idea required)
    const detailText = { simple: 'シンプルな概要', standard: '標準的な詳細度', detailed: '各章の詳細な説明付き' };
    let prompt = `ジャンル: ${t(genre)}\nアイデア: ${idea || '（ジャンルに基づいて自由に創作）'}\n詳細度: ${detailText[detail]}\n`;
    
    // Add current project concept if available
    const savedConcept = state.currentProject?.concept;
    if (savedConcept) {
      prompt += `コンセプト: ${savedConcept}\n`;
    }
    prompt += `\n魅力的なプロットを作成してください。`;
    
    // Add context from selected reference projects
    const refContext = getProjectContext();
    
    try {
      const result = await generate(prompt, 'plot', null, refContext || null);
      document.getElementById('plot-output').innerHTML = result.replace(/\n/g, '<br>');
      document.getElementById('plot-results').classList.remove('hidden');
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.aiContinue = async function() {
    showAiOptionsModal('continue');
  };

  // Show options modal for AI generation
  window.showAiOptionsModal = function(type) {
    const editor = document.getElementById('editor-content');
    const content = editor?.value || '';
    const start = editor?.selectionStart || 0;
    const end = editor?.selectionEnd || 0;
    const selected = editor?.value.substring(start, end) || '';
    
    // Check if text is needed
    if ((type === 'rewrite' || type === 'expand') && !selected.trim()) {
      showToast(t('selectText'), 'warning');
      return;
    }
    if (type === 'continue' && !content.trim()) {
      showToast(t('enterPrompt'), 'warning');
      return;
    }
    
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-md w-full p-6" onclick="event.stopPropagation()">
          <h3 class="text-xl font-bold text-gray-800 mb-4">
            <i class="fas ${type === 'continue' ? 'fa-arrow-right text-green-500' : type === 'rewrite' ? 'fa-sync text-blue-500' : 'fa-expand-arrows-alt text-purple-500'} mr-2"></i>
            ${t(type === 'continue' ? 'continue' : type === 'rewrite' ? 'rewrite' : 'expand')}
          </h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('additionalInstructions')}</label>
              <textarea id="ai-additional-instructions" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="${t('additionalInstructionsPlaceholder')}"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('targetLength')}</label>
              <input type="number" id="ai-target-length" placeholder="${t('targetLength')}" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <p class="text-xs text-gray-500 mt-1">${t('targetLengthNote')}</p>
            </div>
          </div>
          
          <div class="mt-6 flex gap-3">
            <button onclick="closeModal()" class="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">${t('cancel')}</button>
            <button onclick="executeAiGeneration('${type}')" class="flex-1 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">${t('executeGenerate')}</button>
          </div>
        </div>
      </div>
    `;
  };

  // Execute AI generation with options
  window.executeAiGeneration = async function(type) {
    const additionalInstructions = document.getElementById('ai-additional-instructions')?.value || '';
    const targetLength = document.getElementById('ai-target-length')?.value;
    
    closeModal();
    
    if (type === 'continue') {
      await aiContinueWithOptions(additionalInstructions, targetLength);
    } else if (type === 'rewrite') {
      await aiRewriteWithOptions(additionalInstructions, targetLength);
    } else if (type === 'expand') {
      await aiExpandWithOptions(additionalInstructions, targetLength);
    }
  };

  // AI Continue with options
  async function aiContinueWithOptions(additionalInstructions, targetLength) {
    const editor = document.getElementById('editor-content');
    const content = editor.value;
    
    try {
      const projectContext = getProjectContext();
      const fullContext = projectContext + content;
      const prompt = 'この文章の続きを自然に書いてください。' + (additionalInstructions ? `\n追加指示: ${additionalInstructions}` : '');
      const result = await generate(prompt, 'continuation', targetLength ? parseInt(targetLength) : null, fullContext);
      editor.value = content + '\n\n' + result;
      updateCharCount();
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  }

  // AI Rewrite with options
  async function aiRewriteWithOptions(additionalInstructions, targetLength) {
    const editor = document.getElementById('editor-content');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.substring(start, end);
    
    try {
      const prompt = selected + (additionalInstructions ? `\n追加指示: ${additionalInstructions}` : '');
      const result = await generate(prompt, 'rewrite', targetLength ? parseInt(targetLength) : null);
      editor.value = editor.value.substring(0, start) + result + editor.value.substring(end);
      updateCharCount();
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  }

  // AI Expand with options
  async function aiExpandWithOptions(additionalInstructions, targetLength) {
    const editor = document.getElementById('editor-content');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.substring(start, end);
    
    try {
      const projectContext = getProjectContext();
      const prompt = selected + (additionalInstructions ? `\n追加指示: ${additionalInstructions}` : '');
      const result = await generate(prompt, 'expand', targetLength ? parseInt(targetLength) : null, projectContext || null);
      editor.value = editor.value.substring(0, start) + result + editor.value.substring(end);
      updateCharCount();
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  }

  window.aiRewrite = async function() {
    showAiOptionsModal('rewrite');
  };

  window.aiExpand = async function() {
    showAiOptionsModal('expand');
  };

  window.aiProofread = async function() {
    const editor = document.getElementById('editor-content');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.substring(start, end);
    
    if (!selected.trim()) {
      showToast(t('selectText'), 'warning');
      return;
    }
    
    try {
      const result = await generate(selected, 'proofread');
      
      const modals = document.getElementById('modals');
      modals.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
          <div class="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
            <h3 class="text-xl font-bold text-gray-800 mb-4">${t('proofread')}</h3>
            <div class="prose max-w-none bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">${escapeHtml(result)}</div>
            <div class="mt-4 flex gap-3">
              <button onclick="closeModal()" class="flex-1 py-2 border border-gray-300 rounded-lg">${t('close')}</button>
              <button onclick="copyToClipboard(\`${result.replace(/`/g, "'")}\`)" class="flex-1 py-2 bg-gray-600 text-white rounded-lg">${t('copy')}</button>
            </div>
          </div>
        </div>
      `;
      
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.aiSummarize = async function() {
    const editor = document.getElementById('editor-content');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.substring(start, end);
    const targetLength = document.getElementById('target-length')?.value;
    
    if (!selected.trim()) {
      showToast(t('selectText'), 'warning');
      return;
    }
    
    try {
      const result = await generate(selected, 'summarize', targetLength ? parseInt(targetLength) : null);
      
      const modals = document.getElementById('modals');
      modals.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
          <div class="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
            <h3 class="text-xl font-bold text-gray-800 mb-4">${t('summarize')}</h3>
            <div class="text-sm text-gray-500 mb-2">Original: ${formatNumber(selected.length)} → Summary: ${formatNumber(result.length)} ${t('characters')}</div>
            <div class="prose max-w-none bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">${escapeHtml(result)}</div>
            <div class="mt-4 flex gap-3">
              <button onclick="closeModal()" class="flex-1 py-2 border border-gray-300 rounded-lg">${t('close')}</button>
              <button onclick="copyToClipboard(\`${result.replace(/`/g, "'")}\`)" class="flex-1 py-2 bg-gray-600 text-white rounded-lg">${t('copy')}</button>
            </div>
          </div>
        </div>
      `;
      
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.aiTitleGenerate = async function() {
    const editor = document.getElementById('editor-content');
    const content = editor.value;
    
    if (!content.trim()) {
      showToast(t('enterPrompt'), 'warning');
      return;
    }
    
    try {
      const result = await generate(content.substring(0, 2000), 'title_generate');
      
      const modals = document.getElementById('modals');
      modals.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
          <div class="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
            <h3 class="text-xl font-bold text-gray-800 mb-4">${t('titleGenerate')}</h3>
            <div class="prose max-w-none bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">${escapeHtml(result)}</div>
            <div class="mt-4 flex gap-3">
              <button onclick="closeModal()" class="flex-1 py-2 border border-gray-300 rounded-lg">${t('close')}</button>
              <button onclick="copyToClipboard(\`${result.replace(/`/g, "'")}\`)" class="flex-1 py-2 bg-gray-600 text-white rounded-lg">${t('copy')}</button>
            </div>
          </div>
        </div>
      `;
      
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  // Style conversion functions
  window.aiStyleFormal = async function() {
    const editor = document.getElementById('editor-content');
    const content = editor.value;
    const selectedText = content.substring(editor.selectionStart, editor.selectionEnd);
    const textToConvert = selectedText || content;
    
    if (!textToConvert.trim()) {
      showToast(t('enterPrompt'), 'warning');
      return;
    }
    
    try {
      const result = await generate(textToConvert, 'style_formal');
      
      if (selectedText) {
        editor.value = content.substring(0, editor.selectionStart) + result + content.substring(editor.selectionEnd);
      } else {
        editor.value = result;
      }
      updateCharCount();
      showToast(t('styleFormal') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.aiStyleCasual = async function() {
    const editor = document.getElementById('editor-content');
    const content = editor.value;
    const selectedText = content.substring(editor.selectionStart, editor.selectionEnd);
    const textToConvert = selectedText || content;
    
    if (!textToConvert.trim()) {
      showToast(t('enterPrompt'), 'warning');
      return;
    }
    
    try {
      const result = await generate(textToConvert, 'style_casual');
      
      if (selectedText) {
        editor.value = content.substring(0, editor.selectionStart) + result + content.substring(editor.selectionEnd);
      } else {
        editor.value = result;
      }
      updateCharCount();
      showToast(t('styleCasual') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.aiStyleLiterary = async function() {
    const editor = document.getElementById('editor-content');
    const content = editor.value;
    const selectedText = content.substring(editor.selectionStart, editor.selectionEnd);
    const textToConvert = selectedText || content;
    
    if (!textToConvert.trim()) {
      showToast(t('enterPrompt'), 'warning');
      return;
    }
    
    try {
      const result = await generate(textToConvert, 'style_literary');
      
      if (selectedText) {
        editor.value = content.substring(0, editor.selectionStart) + result + content.substring(editor.selectionEnd);
      } else {
        editor.value = result;
      }
      updateCharCount();
      showToast(t('styleLiterary') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.customGenerate = async function() {
    const prompt = document.getElementById('custom-prompt').value;
    const targetLength = document.getElementById('target-length').value;
    const editor = document.getElementById('editor-content');
    
    if (!prompt.trim()) {
      showToast(t('enterPrompt'), 'warning');
      return;
    }
    
    try {
      const projectContext = getProjectContext();
      const editorContext = editor.value;
      const fullContext = projectContext + editorContext;
      const result = await generate(prompt, 'writing', targetLength ? parseInt(targetLength) : null, fullContext || null);
      
      const cursorPos = editor.selectionEnd;
      if (cursorPos > 0) {
        editor.value = editor.value.substring(0, cursorPos) + '\n\n' + result + editor.value.substring(cursorPos);
      } else {
        editor.value = editor.value + '\n\n' + result;
      }
      
      updateCharCount();
      document.getElementById('custom-prompt').value = '';
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  // ==================== UTILITY FUNCTIONS ====================

  window.copyContent = function(elementId) {
    const el = document.getElementById(elementId);
    const text = el.value || el.textContent;
    navigator.clipboard.writeText(text);
    showToast(t('copied'), 'success');
  };

  window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text.replace(/\\n/g, '\n'));
    showToast(t('copied'), 'success');
  };

  window.insertToEditor = function(text) {
    const editor = document.getElementById('editor-content');
    editor.value += '\n\n' + text.replace(/\\n/g, '\n');
    updateCharCount();
    closeModal();
    showToast(t('insert') + ' OK', 'success');
  };

  window.exportAs = function(format) {
    const editor = document.getElementById('editor-content');
    const content = editor.value;
    const title = document.getElementById('project-title')?.value || 'document';
    
    let blob, filename;
    if (format === 'md') {
      blob = new Blob([`# ${title}\n\n${content}`], { type: 'text/markdown' });
      filename = `${title}.md`;
    } else if (format === 'docx') {
      // Generate simple DOCX (Office Open XML format)
      const docxContent = generateDocx(title, content);
      blob = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      filename = `${title}.docx`;
    } else if (format === 'pdf') {
      // Generate PDF using browser print
      exportToPdf(title, content);
      return;
    } else if (format === 'rtf') {
      // Generate RTF format
      const rtfContent = generateRtf(title, content);
      blob = new Blob([rtfContent], { type: 'application/rtf' });
      filename = `${title}.rtf`;
    } else if (format === 'epub') {
      // Generate EPUB format
      const epubContent = generateEpub(title, content);
      blob = new Blob([epubContent], { type: 'application/epub+zip' });
      filename = `${title}.epub`;
    } else if (format === 'html') {
      // Generate HTML format
      const htmlContent = generateHtml(title, content);
      blob = new Blob([htmlContent], { type: 'text/html' });
      filename = `${title}.html`;
    } else {
      blob = new Blob([content], { type: 'text/plain' });
      filename = `${title}.txt`;
    }
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    closeModal();
    showToast(t('export') + ' OK', 'success');
  };

  // Export to PDF using browser print
  function exportToPdf(title, content) {
    const printWindow = window.open('', '_blank');
    const isVertical = state.verticalWriting;
    const paragraphs = content.split('\n').map(p => `<p>${processVerticalText(escapeHtml(p || '　'))}</p>`).join('\n');
    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(title)}</title>
  <style>
    @page { 
      size: A4; 
      margin: 2cm;
      ${isVertical ? '@page { size: A4 landscape; }' : ''}
    }
    body {
      font-family: "Noto Serif JP", "Yu Mincho", "游明朝", serif;
      font-size: 12pt;
      line-height: 2;
      ${isVertical ? `
        writing-mode: vertical-rl;
        text-orientation: mixed;
        height: 100vh;
      ` : ''}
    }
    h1 {
      font-size: 18pt;
      margin-bottom: 1em;
      ${isVertical ? 'writing-mode: vertical-rl;' : ''}
    }
    p {
      text-indent: 1em;
      margin: 0.5em 0;
    }
    .upright {
      text-combine-upright: all;
      -webkit-text-combine: horizontal;
    }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  ${paragraphs}
</body>
</html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      closeModal();
      showToast(t('export') + ' OK', 'success');
    }, 500);
  }

  // Generate RTF format
  function generateRtf(title, content) {
    const rtfContent = content.split('\\n').map(p => p || '').join('\\par ');
    return `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0 Yu Mincho;}}
{\\colortbl;\\red0\\green0\\blue0;}
\\f0\\fs24
{\\b ${escapeRtf(title)}}\\par\\par
${escapeRtf(rtfContent)}
}`;
  }

  function escapeRtf(str) {
    return str
      .replace(/\\\\/g, '\\\\\\\\')
      .replace(/\\{/g, '\\\\{')
      .replace(/\\}/g, '\\\\}')
      .replace(/[\\u0080-\\uffff]/g, char => '\\\\u' + char.charCodeAt(0) + '?');
  }

  // Generate HTML format
  function generateHtml(title, content) {
    const isVertical = state.verticalWriting;
    const paragraphs = content.split('\n').map(p => `<p>${processVerticalText(escapeHtml(p || '　'))}</p>`).join('\n    ');
    return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    body {
      font-family: "Noto Serif JP", "Yu Mincho", "游明朝", serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 2;
      ${isVertical ? `
        writing-mode: vertical-rl;
        text-orientation: mixed;
        min-height: 100vh;
        max-width: none;
        padding: 2rem 4rem;
      ` : ''}
    }
    h1 {
      font-size: 1.8rem;
      margin-bottom: 2rem;
      border-bottom: 2px solid #333;
      padding-bottom: 0.5rem;
    }
    p {
      text-indent: 1em;
      margin: 0.5em 0;
    }
    .upright {
      text-combine-upright: all;
      -webkit-text-combine: horizontal;
    }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  ${paragraphs}
</body>
</html>`;
  }

  // Generate EPUB format (properly formatted)
  function generateEpub(title, content) {
    const isVertical = state.verticalWriting;
    const uuid = 'urn:uuid:' + crypto.randomUUID();
    const paragraphs = content.split('\n').map(p => `<p>${escapeXml(p || '　')}</p>`).join('\n  ');
    
    const containerXml = `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`;

    const contentOpf = `<?xml version="1.0" encoding="UTF-8"?>
<package version="3.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="BookId">${uuid}</dc:identifier>
    <dc:title>${escapeXml(title)}</dc:title>
    <dc:language>ja</dc:language>
    <meta property="dcterms:modified">${new Date().toISOString().split('.')[0]}Z</meta>
  </metadata>
  <manifest>
    <item id="chapter1" href="chapter1.xhtml" media-type="application/xhtml+xml"/>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="css" href="style.css" media-type="text/css"/>
  </manifest>
  <spine${isVertical ? ' page-progression-direction="rtl"' : ''}>
    <itemref idref="chapter1"/>
  </spine>
</package>`;

    const navXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="ja">
<head>
  <meta charset="UTF-8"/>
  <title>Navigation</title>
</head>
<body>
  <nav epub:type="toc">
    <h1>目次</h1>
    <ol>
      <li><a href="chapter1.xhtml">${escapeXml(title)}</a></li>
    </ol>
  </nav>
</body>
</html>`;

    const styleCss = `body {
  font-family: "Noto Serif JP", serif;
  line-height: 2;
  ${isVertical ? `
  writing-mode: vertical-rl;
  text-orientation: mixed;
  -epub-writing-mode: vertical-rl;
  ` : ''}
}
h1 { font-size: 1.5em; margin-bottom: 1em; }
p { text-indent: 1em; margin: 0.5em 0; }
.upright { text-combine-upright: all; -webkit-text-combine: horizontal; }`;

    const chapter1 = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ja">
<head>
  <meta charset="UTF-8"/>
  <title>${escapeXml(title)}</title>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
  <h1>${escapeXml(title)}</h1>
  ${paragraphs}
</body>
</html>`;

    const mimetypeContent = 'application/epub+zip';
    
    // Use proper EPUB ZIP generation
    return generateEpubZip(mimetypeContent, containerXml, contentOpf, navXhtml, styleCss, chapter1);
  }

  // Generate proper EPUB ZIP file
  function generateEpubZip(mimetype, container, opf, nav, css, chapter) {
    const files = [
      { name: 'mimetype', content: mimetype, store: true }, // Must be first and uncompressed
      { name: 'META-INF/container.xml', content: container, store: false },
      { name: 'OEBPS/content.opf', content: opf, store: false },
      { name: 'OEBPS/nav.xhtml', content: nav, store: false },
      { name: 'OEBPS/style.css', content: css, store: false },
      { name: 'OEBPS/chapter1.xhtml', content: chapter, store: false }
    ];
    
    const parts = [];
    let offset = 0;
    const centralDir = [];
    const encoder = new TextEncoder();
    
    for (const file of files) {
      const nameBytes = encoder.encode(file.name);
      const data = encoder.encode(file.content);
      
      // Local file header
      const header = new Uint8Array(30 + nameBytes.length);
      const headerView = new DataView(header.buffer);
      
      headerView.setUint32(0, 0x04034b50, true); // Local file header signature
      headerView.setUint16(4, 20, true); // Version needed
      headerView.setUint16(6, 0, true); // General purpose bit flag
      headerView.setUint16(8, file.store ? 0 : 0, true); // Compression method (0 = store)
      headerView.setUint16(10, 0, true); // Last mod time
      headerView.setUint16(12, 0, true); // Last mod date
      headerView.setUint32(14, crc32(data), true); // CRC-32
      headerView.setUint32(18, data.length, true); // Compressed size
      headerView.setUint32(22, data.length, true); // Uncompressed size
      headerView.setUint16(26, nameBytes.length, true); // File name length
      headerView.setUint16(28, 0, true); // Extra field length
      header.set(nameBytes, 30);
      
      // Central directory header
      const centralHeader = new Uint8Array(46 + nameBytes.length);
      const centralView = new DataView(centralHeader.buffer);
      
      centralView.setUint32(0, 0x02014b50, true); // Central directory signature
      centralView.setUint16(4, 20, true); // Version made by
      centralView.setUint16(6, 20, true); // Version needed
      centralView.setUint16(8, 0, true); // General purpose bit flag
      centralView.setUint16(10, 0, true); // Compression method
      centralView.setUint16(12, 0, true); // Last mod time
      centralView.setUint16(14, 0, true); // Last mod date
      centralView.setUint32(16, crc32(data), true); // CRC-32
      centralView.setUint32(20, data.length, true); // Compressed size
      centralView.setUint32(24, data.length, true); // Uncompressed size
      centralView.setUint16(28, nameBytes.length, true); // File name length
      centralView.setUint16(30, 0, true); // Extra field length
      centralView.setUint16(32, 0, true); // File comment length
      centralView.setUint16(34, 0, true); // Disk number start
      centralView.setUint16(36, 0, true); // Internal file attributes
      centralView.setUint32(38, 0, true); // External file attributes
      centralView.setUint32(42, offset, true); // Relative offset of local header
      centralHeader.set(nameBytes, 46);
      
      parts.push(header);
      parts.push(data);
      centralDir.push(centralHeader);
      
      offset += header.length + data.length;
    }
    
    // End of central directory record
    const centralDirSize = centralDir.reduce((sum, c) => sum + c.length, 0);
    const endRecord = new Uint8Array(22);
    const endView = new DataView(endRecord.buffer);
    
    endView.setUint32(0, 0x06054b50, true); // End of central directory signature
    endView.setUint16(4, 0, true); // Number of this disk
    endView.setUint16(6, 0, true); // Disk where central directory starts
    endView.setUint16(8, files.length, true); // Number of central directory records on this disk
    endView.setUint16(10, files.length, true); // Total number of central directory records
    endView.setUint32(12, centralDirSize, true); // Size of central directory
    endView.setUint32(16, offset, true); // Offset of start of central directory
    endView.setUint16(20, 0, true); // Comment length
    
    // Combine all parts
    const totalSize = parts.reduce((sum, p) => sum + p.length, 0) + centralDirSize + 22;
    const result = new Uint8Array(totalSize);
    let pos = 0;
    
    for (const part of parts) {
      result.set(part, pos);
      pos += part.length;
    }
    for (const cd of centralDir) {
      result.set(cd, pos);
      pos += cd.length;
    }
    result.set(endRecord, pos);
    
    return result;
  }

  // CRC32 calculation for ZIP
  function crc32(data) {
    let crc = 0xFFFFFFFF;
    const table = getCrc32Table();
    for (let i = 0; i < data.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xFF];
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  // CRC32 lookup table (lazy initialization)
  let crc32Table = null;
  function getCrc32Table() {
    if (crc32Table) return crc32Table;
    crc32Table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      crc32Table[i] = c;
    }
    return crc32Table;
  }

  // Process text for vertical writing (make alphanumerics upright)
  function processVerticalText(text) {
    if (!state.verticalWriting) return text;
    // Wrap consecutive alphanumeric sequences (1-2 chars) with upright span
    return text.replace(/([A-Za-z0-9]{1,2})/g, '<span class="upright">$1</span>');
  }

  // ==================== IMPORT FUNCTIONS ====================
  
  // Handle file import
  window.handleImportFile = async function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const filename = file.name.toLowerCase();
    let content = '';
    
    try {
      if (filename.endsWith('.txt')) {
        content = await readTextFile(file);
      } else if (filename.endsWith('.rtf')) {
        content = await readRtfFile(file);
      } else if (filename.endsWith('.docx')) {
        content = await readDocxFile(file);
      } else if (filename.endsWith('.doc')) {
        // For .doc files, try to read as text (basic support)
        content = await readTextFile(file);
      } else {
        showToast('Unsupported file format', 'error');
        return;
      }
      
      // Set content to editor
      const editor = document.getElementById('editor-content');
      if (editor) {
        editor.value = content;
        updateCharCount();
      }
      
      // Set filename as title if no title exists
      const titleInput = document.getElementById('project-title');
      if (titleInput && !titleInput.value) {
        const title = file.name.replace(/\\.[^/.]+$/, '');
        titleInput.value = title;
      }
      
      closeModal();
      showToast(t('import') + ' OK', 'success');
    } catch (e) {
      console.error('Import error:', e);
      showToast('Import failed: ' + e.message, 'error');
    }
  };

  // Read plain text file
  async function readTextFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = e => reject(e);
      reader.readAsText(file, 'UTF-8');
    });
  }

  // Read RTF file and extract plain text
  async function readRtfFile(file) {
    const rtfContent = await readTextFile(file);
    // Basic RTF to plain text conversion
    let text = rtfContent
      .replace(/\\{\\\\[^{}]*\\}/g, '') // Remove RTF groups
      .replace(/\\\\par\\s*/g, '\\n') // Convert paragraphs to newlines
      .replace(/\\\\[a-z]+\\d*\\s?/gi, '') // Remove RTF commands
      .replace(/[{}]/g, '') // Remove braces
      .replace(/\\\\\\\\/g, '\\\\') // Unescape backslashes
      .replace(/\\\\'/g, "'") // Unescape quotes
      .trim();
    return text;
  }

  // Read DOCX file and extract text
  async function readDocxFile(file) {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Parse ZIP to find document.xml
    const documentXml = await extractDocxDocument(uint8Array);
    if (!documentXml) {
      throw new Error('Could not read DOCX content');
    }
    
    // Parse XML to extract text
    const parser = new DOMParser();
    const doc = parser.parseFromString(documentXml, 'text/xml');
    
    // Extract text from w:t elements
    const textElements = doc.getElementsByTagNameNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 't');
    const paragraphs = [];
    let currentParagraph = '';
    
    // Group text by paragraphs
    const pElements = doc.getElementsByTagNameNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 'p');
    for (const p of pElements) {
      const texts = p.getElementsByTagNameNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 't');
      let paragraphText = '';
      for (const t of texts) {
        paragraphText += t.textContent;
      }
      if (paragraphText) {
        paragraphs.push(paragraphText);
      }
    }
    
    return paragraphs.join('\\n');
  }

  // Extract document.xml from DOCX ZIP
  async function extractDocxDocument(uint8Array) {
    let offset = 0;
    const files = {};
    
    while (offset < uint8Array.length - 4) {
      const signature = uint8Array[offset] | (uint8Array[offset + 1] << 8) | 
                       (uint8Array[offset + 2] << 16) | (uint8Array[offset + 3] << 24);
      
      if (signature !== 0x04034b50) break; // Local file header signature
      
      const nameLength = uint8Array[offset + 26] | (uint8Array[offset + 27] << 8);
      const extraLength = uint8Array[offset + 28] | (uint8Array[offset + 29] << 8);
      const compressedSize = uint8Array[offset + 18] | (uint8Array[offset + 19] << 8) |
                            (uint8Array[offset + 20] << 16) | (uint8Array[offset + 21] << 24);
      
      const nameStart = offset + 30;
      const nameBytes = uint8Array.slice(nameStart, nameStart + nameLength);
      const filename = new TextDecoder().decode(nameBytes);
      
      const dataStart = nameStart + nameLength + extraLength;
      const fileData = uint8Array.slice(dataStart, dataStart + compressedSize);
      
      files[filename] = new TextDecoder().decode(fileData);
      
      offset = dataStart + compressedSize;
    }
    
    return files['word/document.xml'] || null;
  }

  // ==================== VERTICAL WRITING MODE ====================
  
  // Toggle vertical writing mode
  window.toggleVerticalWriting = function() {
    state.verticalWriting = !state.verticalWriting;
    applyVerticalWritingStyle();
    showToast(state.verticalWriting ? t('verticalWriting') : t('horizontalWriting'), 'info');
  };

  // Apply vertical writing CSS
  function applyVerticalWritingStyle() {
    const editor = document.getElementById('editor-content');
    if (!editor) return;
    
    if (state.verticalWriting) {
      editor.style.writingMode = 'vertical-rl';
      editor.style.textOrientation = 'mixed';
      editor.style.overflowX = 'auto';
      editor.style.overflowY = 'hidden';
      editor.classList.add('vertical-editor');
    } else {
      editor.style.writingMode = 'horizontal-tb';
      editor.style.textOrientation = 'mixed';
      editor.style.overflowX = 'hidden';
      editor.style.overflowY = 'auto';
      editor.classList.remove('vertical-editor');
    }
  }

  // Generate DOCX file (simplified Office Open XML)
  function generateDocx(title, content) {
    const paragraphs = content.split('\n').map(p => 
      `<w:p><w:r><w:t>${escapeXml(p || ' ')}</w:t></w:r></w:p>`
    ).join('');
    
    const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:pPr><w:pStyle w:val="Title"/></w:pPr><w:r><w:t>${escapeXml(title)}</w:t></w:r></w:p>
    ${paragraphs}
  </w:body>
</w:document>`;

    const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

    const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

    // Create ZIP file manually (simplified)
    return createSimpleDocx(contentTypesXml, relsXml, documentXml);
  }

  function escapeXml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }

  function createSimpleDocx(contentTypes, rels, document) {
    // Use JSZip-like manual ZIP creation for DOCX
    // For simplicity, we'll use a base64 template approach
    const zip = new JSZipLite();
    zip.file('[Content_Types].xml', contentTypes);
    zip.file('_rels/.rels', rels);
    zip.file('word/document.xml', document);
    return zip.generate();
  }

  // Minimal ZIP implementation for DOCX export
  class JSZipLite {
    constructor() {
      this.files = {};
    }
    
    file(name, content) {
      this.files[name] = content;
    }
    
    generate() {
      const files = Object.entries(this.files);
      const parts = [];
      let offset = 0;
      const centralDir = [];
      
      for (const [name, content] of files) {
        const encoder = new TextEncoder();
        const data = encoder.encode(content);
        const header = this._createLocalHeader(name, data);
        parts.push(header, data);
        centralDir.push(this._createCentralHeader(name, data, offset));
        offset += header.byteLength + data.byteLength;
      }
      
      const centralDirData = this._concatArrays(centralDir);
      const endRecord = this._createEndRecord(files.length, centralDirData.byteLength, offset);
      
      return this._concatArrays([...parts, centralDirData, endRecord]);
    }
    
    _createLocalHeader(name, data) {
      const encoder = new TextEncoder();
      const nameBytes = encoder.encode(name);
      const header = new Uint8Array(30 + nameBytes.length);
      const view = new DataView(header.buffer);
      
      view.setUint32(0, 0x04034b50, true); // signature
      view.setUint16(4, 20, true); // version
      view.setUint16(6, 0, true); // flags
      view.setUint16(8, 0, true); // compression
      view.setUint16(10, 0, true); // mod time
      view.setUint16(12, 0, true); // mod date
      view.setUint32(14, this._crc32(data), true); // crc32
      view.setUint32(18, data.byteLength, true); // compressed size
      view.setUint32(22, data.byteLength, true); // uncompressed size
      view.setUint16(26, nameBytes.length, true); // name length
      view.setUint16(28, 0, true); // extra length
      header.set(nameBytes, 30);
      
      return header;
    }
    
    _createCentralHeader(name, data, offset) {
      const encoder = new TextEncoder();
      const nameBytes = encoder.encode(name);
      const header = new Uint8Array(46 + nameBytes.length);
      const view = new DataView(header.buffer);
      
      view.setUint32(0, 0x02014b50, true); // signature
      view.setUint16(4, 20, true); // version made by
      view.setUint16(6, 20, true); // version needed
      view.setUint16(8, 0, true); // flags
      view.setUint16(10, 0, true); // compression
      view.setUint16(12, 0, true); // mod time
      view.setUint16(14, 0, true); // mod date
      view.setUint32(16, this._crc32(data), true); // crc32
      view.setUint32(20, data.byteLength, true); // compressed size
      view.setUint32(24, data.byteLength, true); // uncompressed size
      view.setUint16(28, nameBytes.length, true); // name length
      view.setUint16(30, 0, true); // extra length
      view.setUint16(32, 0, true); // comment length
      view.setUint16(34, 0, true); // disk start
      view.setUint16(36, 0, true); // internal attr
      view.setUint32(38, 0, true); // external attr
      view.setUint32(42, offset, true); // offset
      header.set(nameBytes, 46);
      
      return header;
    }
    
    _createEndRecord(count, centralSize, centralOffset) {
      const record = new Uint8Array(22);
      const view = new DataView(record.buffer);
      
      view.setUint32(0, 0x06054b50, true); // signature
      view.setUint16(4, 0, true); // disk number
      view.setUint16(6, 0, true); // central dir disk
      view.setUint16(8, count, true); // entries on disk
      view.setUint16(10, count, true); // total entries
      view.setUint32(12, centralSize, true); // central dir size
      view.setUint32(16, centralOffset, true); // central dir offset
      view.setUint16(20, 0, true); // comment length
      
      return record;
    }
    
    _crc32(data) {
      let crc = 0xffffffff;
      const table = this._getCrc32Table();
      for (let i = 0; i < data.length; i++) {
        crc = table[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
      }
      return (crc ^ 0xffffffff) >>> 0;
    }
    
    _getCrc32Table() {
      if (!this._crc32Table) {
        this._crc32Table = new Uint32Array(256);
        for (let i = 0; i < 256; i++) {
          let c = i;
          for (let j = 0; j < 8; j++) {
            c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
          }
          this._crc32Table[i] = c;
        }
      }
      return this._crc32Table;
    }
    
    _concatArrays(arrays) {
      const totalLength = arrays.reduce((sum, arr) => sum + arr.byteLength, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const arr of arrays) {
        result.set(new Uint8Array(arr.buffer || arr), offset);
        offset += arr.byteLength;
      }
      return result;
    }
  }

  // ==================== TEMPLATE MODAL ====================
  window.showTemplateModal = function() {
    const lang = state.language === 'ja' ? 'ja' : 'en';
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
          <h3 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-file-alt text-yellow-600 mr-2"></i>${t('templates')}</h3>
          <div class="space-y-3">
            ${Object.entries(TEMPLATES).map(([key, template]) => `
              <button onclick="applyTemplate('${key}')" class="w-full py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <div class="flex items-center gap-3">
                  <i class="fas ${GENRES.find(g => g.id === key)?.icon || 'fa-file'} text-yellow-600"></i>
                  <div>
                    <div class="font-medium">${t(key)}</div>
                    <div class="text-xs text-gray-500">${template[lang].substring(0, 50)}...</div>
                  </div>
                </div>
              </button>
            `).join('')}
          </div>
          <button onclick="closeModal()" class="w-full mt-4 py-2 border border-gray-300 rounded-lg">${t('close')}</button>
        </div>
      </div>
    `;
  };

  window.applyTemplate = function(templateKey) {
    const lang = state.language === 'ja' ? 'ja' : 'en';
    const template = TEMPLATES[templateKey]?.[lang];
    if (template) {
      const editor = document.getElementById('editor-content');
      if (editor) {
        if (editor.value && !confirm('現在の内容を置き換えますか？ / Replace current content?')) {
          return;
        }
        editor.value = template;
        updateCharCount();
        showToast(t('useTemplate') + ' OK', 'success');
      }
    }
    closeModal();
  };

  // ==================== SHORTCUTS MODAL ====================
  window.showShortcutsModal = function() {
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-md w-full p-6" onclick="event.stopPropagation()">
          <h3 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-keyboard text-yellow-600 mr-2"></i>${t('shortcuts')}</h3>
          <div class="space-y-3">
            <div class="flex justify-between py-2 border-b">
              <span class="text-gray-700">${t('save')}</span>
              <kbd class="px-2 py-1 bg-gray-100 rounded text-sm">Ctrl + S</kbd>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="text-gray-700">${t('generate')}</span>
              <kbd class="px-2 py-1 bg-gray-100 rounded text-sm">Ctrl + Enter</kbd>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="text-gray-700">${t('close')}</span>
              <kbd class="px-2 py-1 bg-gray-100 rounded text-sm">Escape</kbd>
            </div>
          </div>
          <button onclick="closeModal()" class="w-full mt-4 py-2 border border-gray-300 rounded-lg">${t('close')}</button>
        </div>
      </div>
    `;
  };

  // ==================== FOLDER MODAL ====================
  window.showFolderModal = function() {
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-md w-full p-6" onclick="event.stopPropagation()">
          <h3 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-folder text-yellow-600 mr-2"></i>${t('folders')}</h3>
          
          <div class="mb-4">
            <div class="flex gap-2">
              <input type="text" id="new-folder-name" placeholder="${t('addFolder')}" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg">
              <input type="color" id="new-folder-color" value="#6b7280" class="w-10 h-10 rounded cursor-pointer">
              <button onclick="createNewFolder()" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          
          <div class="space-y-2 max-h-60 overflow-y-auto">
            ${state.folders.length === 0 ? `<p class="text-gray-500 text-center py-4">${t('noFolder')}</p>` : 
              state.folders.map(f => `
                <div class="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg group" id="folder-item-${f.id}">
                  <div class="flex items-center gap-2 flex-1">
                    <input type="color" value="${f.color}" class="w-6 h-6 rounded cursor-pointer" onchange="updateFolderColor(${f.id}, this.value)">
                    <input type="text" value="${escapeHtml(f.name)}" 
                      class="flex-1 bg-transparent border-none focus:outline-none focus:bg-white focus:border focus:border-gray-300 rounded px-1"
                      onblur="updateFolderName(${f.id}, this.value)"
                      onkeydown="if(event.key==='Enter'){this.blur()}"
                    >
                  </div>
                  <button onclick="deleteFolder(${f.id})" class="text-red-500 hover:text-red-700 opacity-50 group-hover:opacity-100 transition ml-2">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              `).join('')}
          </div>
          
          <button onclick="closeModal()" class="w-full mt-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">${t('close')}</button>
        </div>
      </div>
    `;
  };

  window.createNewFolder = async function() {
    const name = document.getElementById('new-folder-name').value;
    const color = document.getElementById('new-folder-color').value;
    
    if (!name.trim()) {
      showToast('Folder name is required', 'warning');
      return;
    }
    
    try {
      await createFolder(name, color);
      showToast(t('saved'), 'success');
      showFolderModal(); // Refresh modal
      render(); // Update sidebar
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.updateFolderName = async function(id, newName) {
    if (!newName.trim()) return;
    
    const folder = state.folders.find(f => f.id === id);
    if (!folder || folder.name === newName.trim()) return;
    
    try {
      await api(`/folders/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name: newName.trim(), color: folder.color })
      });
      folder.name = newName.trim();
      showToast(t('saved'), 'success');
      render(); // Update sidebar
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.updateFolderColor = async function(id, newColor) {
    const folder = state.folders.find(f => f.id === id);
    if (!folder) return;
    
    try {
      await api(`/folders/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name: folder.name, color: newColor })
      });
      folder.color = newColor;
      render(); // Update sidebar
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.deleteFolder = async function(id) {
    if (!confirm(t('confirmDelete'))) return;
    
    try {
      await api(`/folders/${id}`, { method: 'DELETE' });
      state.folders = state.folders.filter(f => f.id !== id);
      // Reset folder filter if deleted folder was selected
      if (state.selectedFolder === id) {
        state.selectedFolder = null;
      }
      showToast(t('deleted'), 'success');
      showFolderModal(); // Refresh modal
      render(); // Update sidebar
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.filterByFolder = function(folderId) {
    state.selectedFolder = folderId === '' ? null : (folderId === 'null' ? 'null' : parseInt(folderId));
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
      projectsList.innerHTML = renderProjectsList();
    }
  };

  // Show project folder selection modal
  window.showProjectFolderModal = function(projectId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-sm w-full p-6" onclick="event.stopPropagation()">
          <h3 class="text-lg font-bold text-gray-800 mb-4"><i class="fas fa-folder-open text-yellow-600 mr-2"></i>${t('moveToFolder')}</h3>
          
          <div class="space-y-2 max-h-60 overflow-y-auto">
            <button onclick="moveProjectToFolder(${projectId}, null)" 
              class="w-full flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition ${!project.folder_id ? 'bg-yellow-50 border border-yellow-300' : 'bg-gray-50'}">
              <i class="fas fa-inbox text-gray-400"></i>
              <span>${t('noFolder')}</span>
              ${!project.folder_id ? '<i class="fas fa-check text-yellow-600 ml-auto"></i>' : ''}
            </button>
            ${state.folders.map(f => `
              <button onclick="moveProjectToFolder(${projectId}, ${f.id})" 
                class="w-full flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition ${project.folder_id === f.id ? 'bg-yellow-50 border border-yellow-300' : 'bg-gray-50'}">
                <div class="w-4 h-4 rounded" style="background-color: ${f.color}"></div>
                <span>${escapeHtml(f.name)}</span>
                ${project.folder_id === f.id ? '<i class="fas fa-check text-yellow-600 ml-auto"></i>' : ''}
              </button>
            `).join('')}
          </div>
          
          <button onclick="closeModal()" class="w-full mt-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">${t('close')}</button>
        </div>
      </div>
    `;
  };

  window.moveProjectToFolder = async function(projectId, folderId) {
    try {
      await setProjectFolder(projectId, folderId);
      showToast(t('saved'), 'success');
      closeModal();
      render(); // Update sidebar
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.toggleAutoSave = toggleAutoSave;

  window.saveProject = async function() {
    const saveBtn = document.getElementById('save-btn');
    const originalContent = saveBtn?.innerHTML;
    
    try {
      // Show saving state
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i><span class="hidden sm:inline ml-1 text-sm">${t('saving')}</span>`;
      }
      
      await updateProject();
      showToast(t('saved'), 'success');
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      // Restore button state
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalContent;
      }
    }
  };

  // Save concept from Idea mode
  window.saveConcept = async function() {
    const concept = document.getElementById('concept-input')?.value || '';
    
    if (!state.currentProject) {
      // Create new project for idea
      const data = await api('/projects', {
        method: 'POST',
        body: JSON.stringify({
          title: t('newProject'),
          project_type: 'idea',
          genre: 'other',
          content: '',
          concept: concept
        })
      });
      state.currentProject = {
        id: data.project.id,
        title: t('newProject'),
        project_type: 'idea',
        genre: 'other',
        content: '',
        concept: concept,
        updated_at: new Date().toISOString()
      };
      // Immediately add to projects list
      state.projects.unshift(state.currentProject);
    } else {
      // Update local state immediately
      state.currentProject.concept = concept;
      state.currentProject.updated_at = new Date().toISOString();
      
      // Update in projects list
      const projectIndex = state.projects.findIndex(p => p.id === state.currentProject.id);
      if (projectIndex !== -1) {
        state.projects[projectIndex] = { ...state.currentProject };
        const [updatedProject] = state.projects.splice(projectIndex, 1);
        state.projects.unshift(updatedProject);
      }
      
      // Save to server in background
      api(`/projects/${state.currentProject.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: state.currentProject.title,
          genre: state.currentProject.genre,
          content: state.currentProject.content,
          concept: concept,
          plot_content: state.currentProject.plot_content || ''
        })
      }).catch(e => console.error('Save concept failed:', e));
    }
    
    // Immediately render sidebar
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
      projectsList.innerHTML = renderProjectsList();
    }
    showToast(t('saved'), 'success');
  };

  // Save generated ideas
  window.saveIdeas = async function() {
    const ideas = document.getElementById('idea-output')?.innerHTML || '';
    
    if (!state.currentProject) {
      const concept = document.getElementById('concept-input')?.value || '';
      const genre = document.getElementById('idea-genre')?.value || 'other';
      const data = await api('/projects', {
        method: 'POST',
        body: JSON.stringify({
          title: t('newProject'),
          project_type: 'idea',
          genre: genre,
          content: ideas,
          concept: concept
        })
      });
      state.currentProject = {
        id: data.project.id,
        title: t('newProject'),
        project_type: 'idea',
        genre: genre,
        content: ideas,
        concept: concept,
        updated_at: new Date().toISOString()
      };
      // Immediately add to projects list
      state.projects.unshift(state.currentProject);
    } else {
      // Update local state immediately
      state.currentProject.content = ideas;
      state.currentProject.updated_at = new Date().toISOString();
      
      // Update in projects list
      const projectIndex = state.projects.findIndex(p => p.id === state.currentProject.id);
      if (projectIndex !== -1) {
        state.projects[projectIndex] = { ...state.currentProject };
        const [updatedProject] = state.projects.splice(projectIndex, 1);
        state.projects.unshift(updatedProject);
      }
      
      // Save to server in background
      api(`/projects/${state.currentProject.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: state.currentProject.title,
          genre: state.currentProject.genre,
          content: ideas,
          concept: state.currentProject.concept || '',
          plot_content: state.currentProject.plot_content || ''
        })
      }).catch(e => console.error('Save ideas failed:', e));
    }
    
    // Immediately render sidebar
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
      projectsList.innerHTML = renderProjectsList();
    }
    showToast(t('saved'), 'success');
  };

  // Save generated plot
  window.savePlot = async function() {
    const plot = document.getElementById('plot-output')?.innerHTML || '';
    
    if (!state.currentProject) {
      const genre = document.getElementById('plot-genre')?.value || 'other';
      const content = document.getElementById('plot-idea')?.value || '';
      const data = await api('/projects', {
        method: 'POST',
        body: JSON.stringify({
          title: t('newProject'),
          project_type: 'plot',
          genre: genre,
          content: content,
          plot_content: plot
        })
      });
      state.currentProject = {
        id: data.project.id,
        title: t('newProject'),
        project_type: 'plot',
        genre: genre,
        content: content,
        plot_content: plot,
        updated_at: new Date().toISOString()
      };
      // Immediately add to projects list
      state.projects.unshift(state.currentProject);
    } else {
      // Update local state immediately
      state.currentProject.plot_content = plot;
      state.currentProject.updated_at = new Date().toISOString();
      
      // Update in projects list
      const projectIndex = state.projects.findIndex(p => p.id === state.currentProject.id);
      if (projectIndex !== -1) {
        state.projects[projectIndex] = { ...state.currentProject };
        const [updatedProject] = state.projects.splice(projectIndex, 1);
        state.projects.unshift(updatedProject);
      }
      
      // Save to server in background
      api(`/projects/${state.currentProject.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: state.currentProject.title,
          genre: state.currentProject.genre,
          content: state.currentProject.content || '',
          concept: state.currentProject.concept || '',
          plot_content: plot
        })
      }).catch(e => console.error('Save plot failed:', e));
    }
    
    // Immediately render sidebar
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
      projectsList.innerHTML = renderProjectsList();
    }
    showToast(t('saved'), 'success');
  };

  // Move plot to writing mode
  window.moveToWriting = async function() {
    const plotOutput = document.getElementById('plot-output');
    if (!plotOutput) return;
    
    // Get plot content as plain text (remove HTML tags, convert <br> to newlines)
    let plotText = plotOutput.innerHTML
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();
    
    if (!plotText) {
      showToast(t('noContent'), 'error');
      return;
    }
    
    // Save plot to current project if exists
    if (state.currentProject) {
      state.currentProject.plot_content = plotOutput.innerHTML;
      state.currentProject.content = plotText;
      state.currentProject.project_type = 'writing';
      state.currentProject.updated_at = new Date().toISOString();
      
      // Update in projects list
      const projectIndex = state.projects.findIndex(p => p.id === state.currentProject.id);
      if (projectIndex !== -1) {
        state.projects[projectIndex] = { ...state.currentProject };
        const [updatedProject] = state.projects.splice(projectIndex, 1);
        state.projects.unshift(updatedProject);
      }
      
      // Save to server in background
      api(`/projects/${state.currentProject.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: state.currentProject.title,
          genre: state.currentProject.genre,
          content: plotText,
          concept: state.currentProject.concept || '',
          plot_content: plotOutput.innerHTML
        })
      }).catch(e => console.error('Save failed:', e));
    } else {
      // Create new project with plot content
      const genre = document.getElementById('plot-genre')?.value || 'other';
      const data = await api('/projects', {
        method: 'POST',
        body: JSON.stringify({
          title: t('newProject'),
          project_type: 'writing',
          genre: genre,
          content: plotText,
          plot_content: plotOutput.innerHTML
        })
      });
      
      state.currentProject = {
        id: data.project.id,
        title: t('newProject'),
        project_type: 'writing',
        genre: genre,
        content: plotText,
        plot_content: plotOutput.innerHTML,
        updated_at: new Date().toISOString()
      };
      
      // Add to projects list
      state.projects.unshift(state.currentProject);
    }
    
    // Update sidebar
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
      projectsList.innerHTML = renderProjectsList();
    }
    
    // Switch to writing mode
    state.currentMode = 'writing';
    render();
    showToast(t('saved'), 'success');
  };

  // Toggle context panel in writing mode
  window.toggleContextPanel = function() {
    const panel = document.getElementById('context-panel');
    const icon = document.getElementById('context-toggle-icon');
    if (panel && icon) {
      panel.classList.toggle('hidden');
      icon.classList.toggle('fa-chevron-down');
      icon.classList.toggle('fa-chevron-up');
    }
  };

  // Show context selector modal
  window.showContextSelector = function() {
    const modals = document.getElementById('modals');
    const otherProjects = state.projects.filter(p => p.id !== state.currentProject?.id);
    
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800">${t('selectContext')}</h3>
            <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          <p class="text-sm text-gray-600 mb-4">${t('selectContextDesc')}</p>
          
          <div class="space-y-2 max-h-[50vh] overflow-y-auto">
            ${otherProjects.length === 0 ? `<p class="text-gray-500 text-center py-4">${t('noProjects')}</p>` :
              otherProjects.map(p => {
                const isSelected = state.selectedContextProjects.includes(p.id);
                const typeIcon = p.project_type === 'idea' ? 'fa-lightbulb text-yellow-500' : 
                                 p.project_type === 'plot' ? 'fa-sitemap text-blue-500' : 'fa-pen text-green-500';
                const preview = (p.content || p.concept || p.plot_content || '').substring(0, 100);
                return `
                  <label class="flex items-start gap-3 p-3 rounded-lg border ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'} cursor-pointer transition">
                    <input type="checkbox" class="mt-1 w-4 h-4 text-blue-600" ${isSelected ? 'checked' : ''} onchange="toggleContextProject(${p.id})">
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2">
                        <i class="fas ${typeIcon}"></i>
                        <span class="font-medium text-gray-800">${escapeHtml(p.title)}</span>
                      </div>
                      <p class="text-xs text-gray-500 mt-1 truncate">${escapeHtml(preview)}${preview.length >= 100 ? '...' : ''}</p>
                      <span class="text-xs text-gray-400">${formatNumber(p.word_count || 0)} ${t('characters')}</span>
                    </div>
                  </label>
                `;
              }).join('')
            }
          </div>
          
          <div class="mt-4 flex justify-end gap-2">
            <button onclick="clearContextSelection()" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
              ${t('cancel')}
            </button>
            <button onclick="closeModal(); render();" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              OK
            </button>
          </div>
        </div>
      </div>
    `;
  };

  window.toggleContextProject = function(projectId) {
    const idx = state.selectedContextProjects.indexOf(projectId);
    if (idx === -1) {
      state.selectedContextProjects.push(projectId);
    } else {
      state.selectedContextProjects.splice(idx, 1);
    }
    // Re-render the modal to update checkboxes and update background UI
    showContextSelector();
    updateContextDisplay();
  };

  // Update context display without full re-render
  function updateContextDisplay() {
    const contextCount = state.selectedContextProjects.length;
    const btnText = contextCount > 0 ? `${contextCount} ${t('contextSelected')}` : t('noContextSelected');
    
    // Update button in idea/plot modes (with chevron icon)
    const contextSelectorBtn = document.getElementById('context-selector-btn');
    if (contextSelectorBtn) {
      contextSelectorBtn.innerHTML = `${btnText} <i class="fas fa-chevron-down ml-1"></i>`;
    }
    
    // Update button in writing mode (no icon)
    const writingContextBtn = document.getElementById('writing-context-btn');
    if (writingContextBtn) {
      writingContextBtn.textContent = btnText;
    }
    
    // Update selected projects display in idea/plot modes
    const selectedDisplay = document.getElementById('selected-context-display');
    if (selectedDisplay) {
      if (contextCount > 0) {
        selectedDisplay.innerHTML = state.selectedContextProjects.map(id => {
          const p = state.projects.find(pr => pr.id === id);
          return p ? `<span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">${escapeHtml(p.title)}</span>` : '';
        }).join('');
        selectedDisplay.classList.remove('hidden');
      } else {
        selectedDisplay.innerHTML = '';
        selectedDisplay.classList.add('hidden');
      }
    }
    
    // Update tags in writing mode
    const writingContextTags = document.getElementById('writing-context-tags');
    if (writingContextTags) {
      if (contextCount > 0) {
        let tagsHtml = state.selectedContextProjects.slice(0, 2).map(id => {
          const p = state.projects.find(pr => pr.id === id);
          return p ? `<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">${escapeHtml(p.title)}</span>` : '';
        }).join('');
        if (contextCount > 2) {
          tagsHtml += `<span class="text-xs text-blue-600">+${contextCount - 2}</span>`;
        }
        writingContextTags.innerHTML = tagsHtml;
        writingContextTags.classList.remove('hidden');
      } else {
        writingContextTags.innerHTML = '';
        writingContextTags.classList.add('hidden');
      }
    }
  }

  window.clearContextSelection = function() {
    state.selectedContextProjects = [];
    closeModal();
    render();
  };

  // Get context for AI generation (from current project + selected reference projects)
  function getProjectContext() {
    let context = '';
    
    // Add current project's concept/plot if checkbox is checked
    const useCurrentContext = document.getElementById('use-idea-plot')?.checked;
    if (useCurrentContext && state.currentProject) {
      if (state.currentProject.concept) {
        context += `【現在のプロジェクトのコンセプト】\n${state.currentProject.concept}\n\n`;
      }
      if (state.currentProject.plot_content) {
        context += `【現在のプロジェクトのプロット】\n${state.currentProject.plot_content}\n\n`;
      }
    }
    
    // Add selected reference projects
    if (state.selectedContextProjects.length > 0) {
      context += '【参照プロジェクト】\n';
      for (const projectId of state.selectedContextProjects) {
        const project = state.projects.find(p => p.id === projectId);
        if (project) {
          context += `\n--- ${project.title} (${project.project_type}) ---\n`;
          if (project.concept) {
            context += `コンセプト: ${project.concept}\n`;
          }
          if (project.plot_content) {
            context += `プロット: ${project.plot_content}\n`;
          }
          if (project.content) {
            context += `内容: ${project.content}\n`;
          }
        }
      }
      context += '\n';
    }
    
    return context;
  }

  window.setMode = function(mode) {
    state.currentMode = mode;
    state.currentProject = null;
    render();
  };

  window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    state.sidebarOpen = !state.sidebarOpen;
    
    if (state.sidebarOpen) {
      sidebar.classList.add('open');
      overlay.classList.remove('hidden');
    } else {
      sidebar.classList.remove('open');
      overlay.classList.add('hidden');
    }
  };

  window.changeModel = function(model) {
    state.selectedModel = model;
  };

  window.loadProject = loadProject;
  window.deleteProject = deleteProject;
  window.logout = logout;
  window.deleteAccount = deleteAccount;
  window.toggleTheme = toggleTheme;
  window.showUpgradeModal = showUpgradeModal;

  // ==================== TRASH FUNCTIONS ====================

  // Load trash items
  async function loadTrash() {
    try {
      const res = await fetch('/api/trash', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to load trash');
      const data = await res.json();
      return data.projects || [];
    } catch (e) {
      console.error('Load trash error:', e);
      return [];
    }
  }

  // Update trash count in sidebar
  async function updateTrashCount() {
    const trashItems = await loadTrash();
    const countEl = document.getElementById('trash-count');
    if (countEl) {
      if (trashItems.length > 0) {
        countEl.textContent = trashItems.length;
        countEl.style.display = '';
      } else {
        countEl.style.display = 'none';
      }
    }
  }

  // ==================== MASHIRO CONSULTANT FUNCTIONS ====================

  window.sendToMashiro = async function() {
    const input = document.getElementById('mashiro-input');
    const message = input.value.trim();
    if (!message) return;
    
    // Add user message
    state.mashiroMessages.push({ role: 'user', content: message });
    input.value = '';
    state.mashiroTyping = true;
    render();
    
    // Scroll to bottom
    setTimeout(() => {
      const chat = document.getElementById('mashiro-chat');
      if (chat) chat.scrollTop = chat.scrollHeight;
    }, 100);
    
    try {
      const res = await fetch('/api/mashiro/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          message,
          history: state.mashiroMessages.slice(-10) // Last 10 messages for context
        })
      });
      
      if (!res.ok) throw new Error('Failed to get response');
      const data = await res.json();
      
      state.mashiroMessages.push({ role: 'assistant', content: data.response });
    } catch (e) {
      state.mashiroMessages.push({ role: 'assistant', content: 'すみません、エラーが発生しました。もう一度お試しください。' });
    }
    
    state.mashiroTyping = false;
    render();
    
    // Scroll to bottom
    setTimeout(() => {
      const chat = document.getElementById('mashiro-chat');
      if (chat) chat.scrollTop = chat.scrollHeight;
    }, 100);
  };

  // Voice input for Mashiro
  let recognition = null;
  window.toggleVoiceInput = function() {
    const btn = document.getElementById('voice-btn');
    const status = document.getElementById('voice-status');
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast('音声入力はこのブラウザでサポートされていません', 'warning');
      return;
    }
    
    if (recognition && recognition.running) {
      recognition.stop();
      btn.classList.remove('bg-red-500', 'text-white');
      btn.classList.add('bg-gray-100');
      status.classList.add('hidden');
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = state.language === 'ja' ? 'ja-JP' : 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
    
    recognition.onstart = function() {
      btn.classList.add('bg-red-500', 'text-white');
      btn.classList.remove('bg-gray-100');
      status.textContent = t('mashiroListening');
      status.classList.remove('hidden');
    };
    
    recognition.onresult = function(event) {
      const input = document.getElementById('mashiro-input');
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        input.value = finalTranscript;
      }
    };
    
    recognition.onend = function() {
      btn.classList.remove('bg-red-500', 'text-white');
      btn.classList.add('bg-gray-100');
      status.classList.add('hidden');
      recognition.running = false;
    };
    
    recognition.onerror = function(event) {
      console.error('Speech recognition error:', event.error);
      btn.classList.remove('bg-red-500', 'text-white');
      btn.classList.add('bg-gray-100');
      status.classList.add('hidden');
    };
    
    recognition.running = true;
    recognition.start();
  };

  // Show trash modal
  window.showTrashModal = async function() {
    const trashItems = await loadTrash();
    const modals = document.getElementById('modals');
    
    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const now = new Date();
      const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
      const remaining = 30 - diffDays;
      return `${remaining}${t('daysRemaining')}`;
    };

    modals.innerHTML = `
      <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onclick="if(event.target === this) closeModal()">
        <div class="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
          <div class="p-4 border-b border-gray-200 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <i class="fas fa-trash-alt text-gray-400"></i>
              <h2 class="text-lg font-semibold">${t('trash')}</h2>
              <span class="text-sm text-gray-500">${trashItems.length} ${t('items')}</span>
            </div>
            <div class="flex items-center gap-2">
              ${trashItems.length > 0 ? `
              <button onclick="emptyTrashConfirm()" class="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                <i class="fas fa-trash mr-1"></i> ${t('emptyTrash')}
              </button>
              ` : ''}
              <button onclick="closeModal()" class="p-2 text-gray-400 hover:text-gray-600">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div class="flex-1 overflow-y-auto p-4">
            ${trashItems.length === 0 ? `
              <div class="text-center py-12 text-gray-400">
                <i class="fas fa-trash-alt text-4xl mb-4"></i>
                <p>${t('noTrashItems')}</p>
              </div>
            ` : `
              <div class="space-y-2">
                ${trashItems.map(p => `
                  <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div class="flex-1 min-w-0">
                      <h4 class="font-medium text-gray-800 truncate">${escapeHtml(p.title || t('untitled'))}</h4>
                      <div class="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span>${t(p.project_type) || p.project_type}</span>
                        <span>•</span>
                        <span class="text-orange-600">${formatDate(p.deleted_at)}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-1">
                      <button onclick="restoreFromTrash('${p.id}')" class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="${t('restore')}">
                        <i class="fas fa-undo"></i>
                      </button>
                      <button onclick="permanentlyDelete('${p.id}')" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="${t('permanentlyDelete')}">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
          <div class="p-4 border-t border-gray-200 text-sm text-gray-500">
            <i class="fas fa-info-circle mr-1"></i> ${t('trashInfo')}
          </div>
        </div>
      </div>
    `;
  };

  // Restore from trash
  window.restoreFromTrash = async function(id) {
    try {
      const res = await fetch(`/api/trash/${id}/restore`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to restore');
      await loadProjects();
      await updateTrashCount();
      showToast(t('restoredFromTrash'), 'success');
      showTrashModal(); // Refresh modal
    } catch (e) {
      console.error('Restore error:', e);
      showToast(t('error'), 'error');
    }
  };

  // Confirm empty trash
  window.emptyTrashConfirm = function() {
    if (confirm(t('confirmEmptyTrash'))) {
      emptyTrash();
    }
  };

  // Empty trash
  async function emptyTrash() {
    try {
      const res = await fetch('/api/trash', {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to empty trash');
      await updateTrashCount();
      showToast(t('trashEmptied'), 'success');
      showTrashModal(); // Refresh modal
    } catch (e) {
      console.error('Empty trash error:', e);
      showToast(t('error'), 'error');
    }
  }

  // Permanently delete
  window.permanentlyDelete = async function(id) {
    if (!confirm(t('confirmPermanentDelete'))) return;
    
    try {
      const res = await fetch(`/api/trash/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete');
      await updateTrashCount();
      showToast(t('permanentlyDeleted'), 'success');
      showTrashModal(); // Refresh modal
    } catch (e) {
      console.error('Permanent delete error:', e);
      showToast(t('error'), 'error');
    }
  };

  // ==================== RENDER ====================

  function render() {
    if (!state.user) {
      renderAuthPage();
    } else {
      renderMainApp();
    }
  }

  // ==================== INIT ====================
  
  async function init() {
    try {
      await loadModels();
      const isAuthed = await checkAuth();
      
      if (isAuthed) {
        await Promise.all([loadProjects(), loadFolders(), loadTags()]);
      }
      
      // Initialize keyboard shortcuts
      initKeyboardShortcuts();
      
      render();
    } catch (e) {
      console.error('Init error:', e);
      render();
    }
  }

  // Start app
  init();
})();
