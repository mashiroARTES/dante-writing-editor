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
      saved: '保存しました',
      delete: '削除',
      cancel: 'キャンセル',
      close: '閉じる',
      copy: 'コピー',
      copied: 'コピーしました',
      insert: '挿入',
      apply: '適用',
      export: '出力',
      history: '履歴',
      model: 'モデル',
      theme: 'テーマ',
      light: 'ライト',
      dark: 'ダーク',
      autoSave: '自動保存',
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
      inviteCodeError: '無効な招待コードです',
      payment: '決済',
      buyNow: '購入する',
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
      // Genres
      novel: '小説', essay: 'エッセイ', blog: 'ブログ', business: 'ビジネス文書',
      academic: '学術・論文', script: '脚本・シナリオ', poetry: '詩・俳句',
      news: 'ニュース記事', review: 'レビュー', sns: 'SNS投稿', emailGenre: 'メール',
      copywriting: 'コピーライティング', technical: '技術文書', fantasy: 'ファンタジー',
      mystery: 'ミステリー', romance: '恋愛', horror: 'ホラー', sf: 'SF', other: 'その他'
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
      saved: 'Saved',
      delete: 'Delete',
      cancel: 'Cancel',
      close: 'Close',
      copy: 'Copy',
      copied: 'Copied',
      insert: 'Insert',
      apply: 'Apply',
      export: 'Export',
      history: 'History',
      model: 'Model',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      autoSave: 'Auto Save',
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
      inviteCodeError: 'Invalid invite code',
      payment: 'Payment',
      buyNow: 'Buy Now',
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
      // Genres
      novel: 'Novel', essay: 'Essay', blog: 'Blog', business: 'Business',
      academic: 'Academic', script: 'Script', poetry: 'Poetry',
      news: 'News', review: 'Review', sns: 'SNS', emailGenre: 'Email',
      copywriting: 'Copywriting', technical: 'Technical', fantasy: 'Fantasy',
      mystery: 'Mystery', romance: 'Romance', horror: 'Horror', sf: 'Sci-Fi', other: 'Other'
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
      saved: '已保存',
      delete: '删除',
      cancel: '取消',
      close: '关闭',
      copy: '复制',
      copied: '已复制',
      insert: '插入',
      apply: '应用',
      export: '导出',
      history: '历史',
      model: '模型',
      theme: '主题',
      light: '浅色',
      dark: '深色',
      autoSave: '自动保存',
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
      inviteCodeError: '无效的邀请码',
      payment: '支付',
      buyNow: '立即购买',
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
      // Genres
      novel: '小说', essay: '散文', blog: '博客', business: '商务',
      academic: '学术', script: '剧本', poetry: '诗歌',
      news: '新闻', review: '评论', sns: '社交', emailGenre: '邮件',
      copywriting: '文案', technical: '技术', fantasy: '奇幻',
      mystery: '悬疑', romance: '言情', horror: '恐怖', sf: '科幻', other: '其他'
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
      saved: '저장됨',
      delete: '삭제',
      cancel: '취소',
      close: '닫기',
      copy: '복사',
      copied: '복사됨',
      insert: '삽입',
      apply: '적용',
      export: '내보내기',
      history: '기록',
      model: '모델',
      theme: '테마',
      light: '라이트',
      dark: '다크',
      autoSave: '자동 저장',
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
      inviteCodeError: '유효하지 않은 초대 코드입니다',
      payment: '결제',
      buyNow: '구매하기',
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
      // Genres
      novel: '소설', essay: '에세이', blog: '블로그', business: '비즈니스',
      academic: '학술', script: '시나리오', poetry: '시',
      news: '뉴스', review: '리뷰', sns: 'SNS', emailGenre: '이메일',
      copywriting: '카피라이팅', technical: '기술', fantasy: '판타지',
      mystery: '미스터리', romance: '로맨스', horror: '호러', sf: 'SF', other: '기타'
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
      saved: 'Salvato',
      delete: 'Elimina',
      cancel: 'Annulla',
      close: 'Chiudi',
      copy: 'Copia',
      copied: 'Copiato',
      insert: 'Inserisci',
      apply: 'Applica',
      export: 'Esporta',
      history: 'Cronologia',
      model: 'Modello',
      theme: 'Tema',
      light: 'Chiaro',
      dark: 'Scuro',
      autoSave: 'Salvataggio Auto',
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
      inviteCodeError: 'Codice invito non valido',
      payment: 'Pagamento',
      buyNow: 'Acquista Ora',
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
      // Genres
      novel: 'Romanzo', essay: 'Saggio', blog: 'Blog', business: 'Business',
      academic: 'Accademico', script: 'Sceneggiatura', poetry: 'Poesia',
      news: 'Notizie', review: 'Recensione', sns: 'Social', emailGenre: 'Email',
      copywriting: 'Copywriting', technical: 'Tecnico', fantasy: 'Fantasy',
      mystery: 'Giallo', romance: 'Romantico', horror: 'Horror', sf: 'Fantascienza', other: 'Altro'
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
      saved: 'सहेजा गया',
      delete: 'हटाएं',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      copy: 'कॉपी',
      copied: 'कॉपी हो गया',
      insert: 'डालें',
      apply: 'लागू करें',
      export: 'निर्यात',
      history: 'इतिहास',
      model: 'मॉडल',
      theme: 'थीम',
      light: 'लाइट',
      dark: 'डार्क',
      autoSave: 'स्वतः सहेजें',
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
      inviteCodeError: 'अमान्य आमंत्रण कोड',
      payment: 'भुगतान',
      buyNow: 'अभी खरीदें',
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
      // Genres
      novel: 'उपन्यास', essay: 'निबंध', blog: 'ब्लॉग', business: 'व्यापार',
      academic: 'अकादमिक', script: 'पटकथा', poetry: 'कविता',
      news: 'समाचार', review: 'समीक्षा', sns: 'सोशल', emailGenre: 'ईमेल',
      copywriting: 'कॉपीराइटिंग', technical: 'तकनीकी', fantasy: 'फैंटेसी',
      mystery: 'रहस्य', romance: 'रोमांस', horror: 'हॉरर', sf: 'साइ-फाई', other: 'अन्य'
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
      save: 'Guardar', saved: 'Guardado', delete: 'Eliminar', cancel: 'Cancelar', close: 'Cerrar',
      copy: 'Copiar', copied: 'Copiado', insert: 'Insertar', apply: 'Aplicar', export: 'Exportar',
      history: 'Historial', model: 'Modelo', theme: 'Tema', light: 'Claro', dark: 'Oscuro',
      autoSave: 'Autoguardar', language: 'Idioma', genre: 'Género', title: 'Título',
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
      inviteCodeSuccess: '¡Código aplicado! Todas las funciones desbloqueadas', inviteCodeError: 'Código inválido',
      payment: 'Pago', buyNow: 'Comprar Ahora', confirmDelete: '¿Estás seguro de eliminar?',
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
      novel: 'Novela', essay: 'Ensayo', blog: 'Blog', business: 'Negocios', academic: 'Académico',
      script: 'Guión', poetry: 'Poesía', news: 'Noticias', review: 'Reseña', sns: 'Redes Sociales',
      emailGenre: 'Email', copywriting: 'Copywriting', technical: 'Técnico', fantasy: 'Fantasía',
      mystery: 'Misterio', romance: 'Romance', horror: 'Terror', sf: 'Ciencia Ficción', other: 'Otro'
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
      save: 'Enregistrer', saved: 'Enregistré', delete: 'Supprimer', cancel: 'Annuler', close: 'Fermer',
      copy: 'Copier', copied: 'Copié', insert: 'Insérer', apply: 'Appliquer', export: 'Exporter',
      history: 'Historique', model: 'Modèle', theme: 'Thème', light: 'Clair', dark: 'Sombre',
      autoSave: 'Sauvegarde auto', language: 'Langue', genre: 'Genre', title: 'Titre',
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
      inviteCodeSuccess: 'Code appliqué! Toutes les fonctions débloquées', inviteCodeError: 'Code invalide',
      payment: 'Paiement', buyNow: 'Acheter Maintenant', confirmDelete: 'Êtes-vous sûr de vouloir supprimer?',
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
      novel: 'Roman', essay: 'Essai', blog: 'Blog', business: 'Business', academic: 'Académique',
      script: 'Scénario', poetry: 'Poésie', news: 'Actualités', review: 'Critique', sns: 'Réseaux Sociaux',
      emailGenre: 'Email', copywriting: 'Copywriting', technical: 'Technique', fantasy: 'Fantasy',
      mystery: 'Mystère', romance: 'Romance', horror: 'Horreur', sf: 'Science-Fiction', other: 'Autre'
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
      save: 'Speichern', saved: 'Gespeichert', delete: 'Löschen', cancel: 'Abbrechen', close: 'Schließen',
      copy: 'Kopieren', copied: 'Kopiert', insert: 'Einfügen', apply: 'Anwenden', export: 'Exportieren',
      history: 'Verlauf', model: 'Modell', theme: 'Design', light: 'Hell', dark: 'Dunkel',
      autoSave: 'Autospeichern', language: 'Sprache', genre: 'Genre', title: 'Titel',
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
      inviteCodeSuccess: 'Code angewendet! Alle Funktionen freigeschaltet', inviteCodeError: 'Ungültiger Code',
      payment: 'Zahlung', buyNow: 'Jetzt Kaufen', confirmDelete: 'Sind Sie sicher, dass Sie löschen möchten?',
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
      novel: 'Roman', essay: 'Essay', blog: 'Blog', business: 'Business', academic: 'Akademisch',
      script: 'Drehbuch', poetry: 'Poesie', news: 'Nachrichten', review: 'Rezension', sns: 'Social Media',
      emailGenre: 'E-Mail', copywriting: 'Copywriting', technical: 'Technisch', fantasy: 'Fantasy',
      mystery: 'Krimi', romance: 'Romantik', horror: 'Horror', sf: 'Science-Fiction', other: 'Andere'
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
      save: 'Salvar', saved: 'Salvo', delete: 'Excluir', cancel: 'Cancelar', close: 'Fechar',
      copy: 'Copiar', copied: 'Copiado', insert: 'Inserir', apply: 'Aplicar', export: 'Exportar',
      history: 'Histórico', model: 'Modelo', theme: 'Tema', light: 'Claro', dark: 'Escuro',
      autoSave: 'Salvar auto', language: 'Idioma', genre: 'Gênero', title: 'Título',
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
      inviteCodeSuccess: 'Código aplicado! Todas as funções desbloqueadas', inviteCodeError: 'Código inválido',
      payment: 'Pagamento', buyNow: 'Comprar Agora', confirmDelete: 'Tem certeza que deseja excluir?',
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
      novel: 'Romance', essay: 'Ensaio', blog: 'Blog', business: 'Negócios', academic: 'Acadêmico',
      script: 'Roteiro', poetry: 'Poesia', news: 'Notícias', review: 'Resenha', sns: 'Redes Sociais',
      emailGenre: 'Email', copywriting: 'Copywriting', technical: 'Técnico', fantasy: 'Fantasia',
      mystery: 'Mistério', romance: 'Romance', horror: 'Terror', sf: 'Ficção Científica', other: 'Outro'
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
      save: 'Сохранить', saved: 'Сохранено', delete: 'Удалить', cancel: 'Отмена', close: 'Закрыть',
      copy: 'Копировать', copied: 'Скопировано', insert: 'Вставить', apply: 'Применить', export: 'Экспорт',
      history: 'История', model: 'Модель', theme: 'Тема', light: 'Светлая', dark: 'Тёмная',
      autoSave: 'Автосохранение', language: 'Язык', genre: 'Жанр', title: 'Название',
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
      inviteCodeSuccess: 'Код применён! Все функции разблокированы', inviteCodeError: 'Неверный код',
      payment: 'Оплата', buyNow: 'Купить сейчас', confirmDelete: 'Вы уверены, что хотите удалить?',
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
      novel: 'Роман', essay: 'Эссе', blog: 'Блог', business: 'Бизнес', academic: 'Академический',
      script: 'Сценарий', poetry: 'Поэзия', news: 'Новости', review: 'Обзор', sns: 'Соцсети',
      emailGenre: 'Email', copywriting: 'Копирайтинг', technical: 'Технический', fantasy: 'Фэнтези',
      mystery: 'Детектив', romance: 'Романтика', horror: 'Ужасы', sf: 'Научная фантастика', other: 'Другое'
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
      save: 'حفظ', saved: 'تم الحفظ', delete: 'حذف', cancel: 'إلغاء', close: 'إغلاق',
      copy: 'نسخ', copied: 'تم النسخ', insert: 'إدراج', apply: 'تطبيق', export: 'تصدير',
      history: 'السجل', model: 'النموذج', theme: 'المظهر', light: 'فاتح', dark: 'داكن',
      autoSave: 'حفظ تلقائي', language: 'اللغة', genre: 'النوع', title: 'العنوان',
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
      inviteCodeSuccess: 'تم تطبيق الرمز! جميع الميزات مفتوحة', inviteCodeError: 'رمز غير صالح',
      payment: 'الدفع', buyNow: 'اشترِ الآن', confirmDelete: 'هل أنت متأكد من الحذف؟',
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
      novel: 'رواية', essay: 'مقال', blog: 'مدونة', business: 'أعمال', academic: 'أكاديمي',
      script: 'سيناريو', poetry: 'شعر', news: 'أخبار', review: 'مراجعة', sns: 'وسائل التواصل',
      emailGenre: 'بريد إلكتروني', copywriting: 'كتابة إعلانية', technical: 'تقني', fantasy: 'خيال',
      mystery: 'غموض', romance: 'رومانسية', horror: 'رعب', sf: 'خيال علمي', other: 'آخر'
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
    selectedContextProjects: [] // IDs of projects to use as context
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

  async function createProject(title, genre, customGenre, type, content = '') {
    const data = await api('/projects', {
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        genre, 
        custom_genre: customGenre,
        project_type: type, 
        content 
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
        word_count: content.length
      };
      
      await loadProjects();
      updateCharCount();
      return;
    }
    
    // Update existing project
    await api(`/projects/${state.currentProject.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        genre: state.currentProject.genre,
        custom_genre: state.currentProject.custom_genre,
        content
      })
    });
    
    state.currentProject.content = content;
    state.currentProject.title = title;
    state.currentProject.word_count = content.length;
    
    // Update project in the projects list for sidebar display
    const projectIndex = state.projects.findIndex(p => p.id === state.currentProject.id);
    if (projectIndex !== -1) {
      state.projects[projectIndex].title = title;
      state.projects[projectIndex].word_count = content.length;
      // Re-render sidebar project list
      const projectsList = document.getElementById('projects-list');
      if (projectsList) {
        projectsList.innerHTML = renderProjectsList();
      }
    }
    
    updateCharCount();
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
    render();
  }

  // ==================== AI GENERATION ====================
  async function loadModels() {
    const data = await api('/grok/models');
    state.models = data.models;
  }

  async function generate(prompt, type, targetLength = null, context = null, targetLanguage = null) {
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
    
    newEditor.addEventListener('input', () => {
      updateCharCount();
      
      if (state.currentProject) {
        if (state.autoSaveTimer) {
          clearTimeout(state.autoSaveTimer);
        }
        
        state.autoSaveTimer = setTimeout(async () => {
          if (state.preferences?.auto_save !== false) {
            await updateProject();
            showToast(t('saved'), 'info');
          }
        }, 3000);
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
        showToast(t('inviteCodeSuccess'), 'success');
        closeModal();
        // Refresh user data
        await checkAuth();
        render();
      }
    } catch (e) {
      showToast(t('inviteCodeError'), 'error');
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
          
          <!-- Projects List -->
          <div class="flex-1 overflow-y-auto p-4">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-semibold text-gray-700">${t('projects')}</h3>
              <button onclick="showNewProjectModal()" class="text-yellow-600 hover:text-yellow-700">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div id="projects-list">${renderProjectsList()}</div>
          </div>
          
          <!-- Bottom Actions -->
          <div class="p-4 border-t border-gray-200 space-y-2">
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
              </div>
            </div>
            <div class="flex items-center gap-1 sm:gap-2">
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
    if (state.projects.length === 0) {
      return `<p class="text-sm text-gray-500 text-center py-4">${t('noProjects')}</p>`;
    }
    
    return state.projects.map(p => `
      <div class="group flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer ${state.currentProject?.id === p.id ? 'bg-yellow-50' : ''}" onclick="loadProject(${p.id})">
        <i class="fas ${getTypeIcon(p.project_type)} text-gray-400"></i>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-700 truncate">${escapeHtml(p.title)}</p>
          <p class="text-xs text-gray-500">${formatNumber(p.word_count || 0)} ${t('characters')}</p>
        </div>
        <button onclick="event.stopPropagation(); deleteProject(${p.id})" class="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1">
          <i class="fas fa-trash text-xs"></i>
        </button>
      </div>
    `).join('');
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
              <button onclick="savePlot()" class="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                <i class="fas fa-save mr-1"></i>${t('save')}
              </button>
            </div>
            <div id="plot-output" class="prose max-w-none bg-gray-50 p-4 rounded-lg">${savedPlot}</div>
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
              <button onclick="saveProject()" class="p-2 sm:px-3 sm:py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition" title="${t('save')}">
                <i class="fas fa-save"></i><span class="hidden sm:inline ml-1 text-sm">${t('save')}</span>
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
      await createProject(title, genre, null, type);
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
          <button onclick="closeModal(); aiTitleGenerate()" class="w-full py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm mb-2">
            <i class="fas fa-heading mr-2"></i>${t('titleGenerate')}
          </button>
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
      setGenerating(true);
      const result = await generate(prompt, 'writing', targetLength ? parseInt(targetLength) : null, fullContext);
      
      if (editor) {
        editor.value = context + (context ? '\n\n' : '') + result;
        updateCharCount();
      }
      
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setGenerating(false);
    }
  };

  window.showHistoryModal = async function() {
    await loadHistory();
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
          <h3 class="text-xl font-bold text-gray-800 mb-4">${t('history')}</h3>
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
        <div class="bg-white rounded-xl max-w-md w-full p-6" onclick="event.stopPropagation()">
          <h3 class="text-xl font-bold text-gray-800 mb-4">${t('export')}</h3>
          <div class="space-y-3">
            <button onclick="exportAs('txt')" class="w-full py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3">
              <i class="fas fa-file-alt text-gray-500"></i>
              <span>Text (.txt)</span>
            </button>
            <button onclick="exportAs('md')" class="w-full py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3">
              <i class="fab fa-markdown text-gray-500"></i>
              <span>Markdown (.md)</span>
            </button>
            <button onclick="copyContent('editor-content')" class="w-full py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3">
              <i class="fas fa-copy text-gray-500"></i>
              <span>${t('copy')}</span>
            </button>
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
    const editor = document.getElementById('editor-content');
    const content = editor.value;
    const targetLength = document.getElementById('target-length')?.value;
    
    if (!content.trim()) {
      showToast(t('enterPrompt'), 'warning');
      return;
    }
    
    try {
      const projectContext = getProjectContext();
      const fullContext = projectContext + content;
      const result = await generate('この文章の続きを自然に書いてください。', 'continuation', targetLength ? parseInt(targetLength) : null, fullContext);
      editor.value = content + '\n\n' + result;
      updateCharCount();
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.aiRewrite = async function() {
    const editor = document.getElementById('editor-content');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.substring(start, end);
    
    if (!selected.trim()) {
      showToast(t('selectText'), 'warning');
      return;
    }
    
    try {
      const result = await generate(selected, 'rewrite');
      editor.value = editor.value.substring(0, start) + result + editor.value.substring(end);
      updateCharCount();
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.aiExpand = async function() {
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
      const projectContext = getProjectContext();
      const result = await generate(selected, 'expand', targetLength ? parseInt(targetLength) : null, projectContext || null);
      editor.value = editor.value.substring(0, start) + result + editor.value.substring(end);
      updateCharCount();
      showToast(t('generate') + ' OK', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
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

  window.saveProject = async function() {
    try {
      await updateProject();
      showToast(t('saved'), 'success');
    } catch (e) {
      showToast(e.message, 'error');
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
        concept: concept
      };
      await loadProjects();
    } else {
      await api(`/projects/${state.currentProject.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: state.currentProject.title,
          genre: state.currentProject.genre,
          content: state.currentProject.content,
          concept: concept,
          plot_content: state.currentProject.plot_content || ''
        })
      });
      state.currentProject.concept = concept;
    }
    showToast(t('saved'), 'success');
  };

  // Save generated ideas
  window.saveIdeas = async function() {
    const ideas = document.getElementById('idea-output')?.innerHTML || '';
    
    if (!state.currentProject) {
      const concept = document.getElementById('concept-input')?.value || '';
      const data = await api('/projects', {
        method: 'POST',
        body: JSON.stringify({
          title: t('newProject'),
          project_type: 'idea',
          genre: document.getElementById('idea-genre')?.value || 'other',
          content: ideas,
          concept: concept
        })
      });
      state.currentProject = data.project;
      await loadProjects();
    } else {
      await api(`/projects/${state.currentProject.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: state.currentProject.title,
          genre: state.currentProject.genre,
          content: ideas,
          concept: state.currentProject.concept || '',
          plot_content: state.currentProject.plot_content || ''
        })
      });
      state.currentProject.content = ideas;
    }
    showToast(t('saved'), 'success');
  };

  // Save generated plot
  window.savePlot = async function() {
    const plot = document.getElementById('plot-output')?.innerHTML || '';
    
    if (!state.currentProject) {
      const data = await api('/projects', {
        method: 'POST',
        body: JSON.stringify({
          title: t('newProject'),
          project_type: 'plot',
          genre: document.getElementById('plot-genre')?.value || 'other',
          content: document.getElementById('plot-idea')?.value || '',
          plot_content: plot
        })
      });
      state.currentProject = data.project;
      await loadProjects();
    } else {
      await api(`/projects/${state.currentProject.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: state.currentProject.title,
          genre: state.currentProject.genre,
          content: state.currentProject.content || '',
          concept: state.currentProject.concept || '',
          plot_content: plot
        })
      });
      state.currentProject.plot_content = plot;
    }
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
        await loadProjects();
      }
      
      render();
    } catch (e) {
      console.error('Init error:', e);
      render();
    }
  }

  // Start app
  init();
})();
