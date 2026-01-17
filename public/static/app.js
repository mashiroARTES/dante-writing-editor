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
      export: 'エクスポート',
      history: '履歴',
      model: 'モデル',
      theme: 'テーマ',
      light: 'ライト',
      dark: 'ダーク',
      autoSave: '自動保存',
      language: '言語',
      genre: 'ジャンル',
      title: 'タイトル',
      customPrompt: 'カスタムプロンプト',
      targetLength: '目標文字数',
      plan: 'プラン',
      free: '無料',
      standard: 'スタンダード',
      premium: 'プレミアム',
      upgrade: 'アップグレード',
      usage: '使用状況',
      remaining: '残り',
      limitExceeded: '文字数制限に達しました',
      pleaseUpgrade: 'プランをアップグレードしてください',
      payment: '決済',
      buyNow: '購入する',
      confirmDelete: '本当に削除しますか？',
      confirmDeleteAccount: 'すべてのデータが削除されます。よろしいですか？',
      noProjects: 'プロジェクトがありません',
      selectText: '文章を選択してください',
      enterPrompt: 'プロンプトを入力してください',
      translationTarget: '翻訳先言語',
      agreeTerms: '利用規約とプライバシーポリシーに同意する',
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
      customPrompt: 'Custom Prompt',
      targetLength: 'Target Length',
      plan: 'Plan',
      free: 'Free',
      standard: 'Standard',
      premium: 'Premium',
      upgrade: 'Upgrade',
      usage: 'Usage',
      remaining: 'Remaining',
      limitExceeded: 'Character limit exceeded',
      pleaseUpgrade: 'Please upgrade your plan',
      payment: 'Payment',
      buyNow: 'Buy Now',
      confirmDelete: 'Are you sure you want to delete?',
      confirmDeleteAccount: 'All data will be deleted. Continue?',
      noProjects: 'No projects',
      selectText: 'Please select text',
      enterPrompt: 'Please enter a prompt',
      translationTarget: 'Target Language',
      agreeTerms: 'I agree to the Terms of Service and Privacy Policy',
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
      customPrompt: '自定义提示',
      targetLength: '目标长度',
      plan: '方案',
      free: '免费',
      standard: '标准',
      premium: '高级',
      upgrade: '升级',
      usage: '使用情况',
      remaining: '剩余',
      limitExceeded: '已达到字符限制',
      pleaseUpgrade: '请升级您的方案',
      payment: '支付',
      buyNow: '立即购买',
      confirmDelete: '确定要删除吗？',
      confirmDeleteAccount: '所有数据将被删除，确定吗？',
      noProjects: '暂无项目',
      selectText: '请选择文本',
      enterPrompt: '请输入提示',
      translationTarget: '目标语言',
      agreeTerms: '我同意服务条款和隐私政策',
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
      customPrompt: '사용자 지정 프롬프트',
      targetLength: '목표 길이',
      plan: '플랜',
      free: '무료',
      standard: '스탠다드',
      premium: '프리미엄',
      upgrade: '업그레이드',
      usage: '사용량',
      remaining: '남은',
      limitExceeded: '글자 수 제한 초과',
      pleaseUpgrade: '플랜을 업그레이드해 주세요',
      payment: '결제',
      buyNow: '구매하기',
      confirmDelete: '정말 삭제하시겠습니까?',
      confirmDeleteAccount: '모든 데이터가 삭제됩니다. 계속하시겠습니까?',
      noProjects: '프로젝트 없음',
      selectText: '텍스트를 선택해 주세요',
      enterPrompt: '프롬프트를 입력해 주세요',
      translationTarget: '번역 대상 언어',
      agreeTerms: '이용약관 및 개인정보처리방침에 동의합니다',
      novel: '소설', essay: '에세이', blog: '블로그', business: '비즈니스',
      academic: '학술', script: '시나리오', poetry: '시',
      news: '뉴스', review: '리뷰', sns: 'SNS', emailGenre: '이메일',
      copywriting: '카피라이팅', technical: '기술', fantasy: '판타지',
      mystery: '미스터리', romance: '로맨스', horror: '호러', sf: 'SF', other: '기타'
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
    autoSaveTimer: null
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
    { id: 'pt', name: 'Português' },
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
    if (!state.currentProject) return;
    
    const content = document.getElementById('editor-content')?.value || '';
    const title = document.getElementById('project-title')?.value || state.currentProject.title;
    
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
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span><span class="font-semibold text-yellow-600">${formatNumber(chars)}</span> ${t('characters')}</span>
          <span class="text-gray-400">|</span>
          <span>${formatNumber(charsNoSpace)} ${t('charactersNoSpace')}</span>
          <span class="text-gray-400">|</span>
          <span>${formatNumber(lines)} ${t('lines')}</span>
          <span class="text-gray-400">|</span>
          <span><i class="fas fa-clock text-gray-400 mr-1"></i>${readingTimeText}</span>
          <span class="text-gray-400">|</span>
          <span><i class="fas fa-file-alt text-gray-400 mr-1"></i>${manuscriptPages} ${t('pages')}</span>
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
      const limit = state.user.total_chars_limit || 30000;
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
    
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl max-w-lg w-full p-6" onclick="event.stopPropagation()">
          <div class="text-center mb-6">
            <img src="/static/logo.png" alt="DANTE" class="w-16 h-16 mx-auto mb-4">
            <h3 class="text-xl font-bold text-gray-800">${t('limitExceeded')}</h3>
            <p class="text-gray-600 mt-2">${t('pleaseUpgrade')}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="border-2 border-yellow-500 rounded-lg p-4 bg-yellow-50 cursor-pointer hover:bg-yellow-100 transition" onclick="purchasePlan('standard')">
              <h4 class="font-bold text-lg">${t('standard')}</h4>
              <p class="text-2xl font-bold text-yellow-600">¥1,000</p>
              <p class="text-sm text-gray-600">500,000 ${t('characters')}</p>
              <p class="text-xs text-gray-500">≈ 5 books</p>
            </div>
            <div class="border-2 border-purple-500 rounded-lg p-4 bg-purple-50 cursor-pointer hover:bg-purple-100 transition" onclick="purchasePlan('premium')">
              <h4 class="font-bold text-lg">${t('premium')}</h4>
              <p class="text-2xl font-bold text-purple-600">¥10,000</p>
              <p class="text-sm text-gray-600">6,000,000 ${t('characters')}</p>
              <p class="text-xs text-gray-500">≈ 60 books</p>
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
                  <a href="/terms" target="_blank" class="text-blue-600 hover:underline">${t('terms')}</a>
                  <a href="/privacy" target="_blank" class="text-blue-600 hover:underline">${t('privacy')}</a>
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
            <a href="/help" class="hover:underline">${t('help')}</a>
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
            <a href="/help" class="block w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
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
              <div class="flex gap-2">
                <button onclick="setMode('idea')" class="px-4 py-2 rounded-lg transition ${state.currentMode === 'idea' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'}">
                  <i class="fas fa-lightbulb mr-2"></i>${t('idea')}
                </button>
                <button onclick="setMode('plot')" class="px-4 py-2 rounded-lg transition ${state.currentMode === 'plot' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'}">
                  <i class="fas fa-sitemap mr-2"></i>${t('plot')}
                </button>
                <button onclick="setMode('writing')" class="px-4 py-2 rounded-lg transition ${state.currentMode === 'writing' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'}">
                  <i class="fas fa-pen mr-2"></i>${t('writing')}
                </button>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <select id="model-select" class="text-sm border border-gray-300 rounded-lg px-3 py-2" onchange="changeModel(this.value)">
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

  function renderCurrentMode() {
    switch (state.currentMode) {
      case 'idea': return renderIdeaMode();
      case 'plot': return renderPlotMode();
      default: return renderWritingMode();
    }
  }

  function renderIdeaMode() {
    return `
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>${t('idea')}</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">${t('genre')}</label>
              <select id="idea-genre" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                ${GENRES.map(g => `<option value="${g.id}"><i class="fas ${g.icon}"></i> ${t(g.id)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">テーマ・キーワード</label>
              <input type="text" id="idea-theme" placeholder="例: 時間旅行、禁断の恋" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">条件・制約</label>
              <input type="text" id="idea-conditions" placeholder="例: 主人公は高校生、舞台は現代日本" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">アイデア数</label>
              <select id="idea-count" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="3">3つ</option>
                <option value="5" selected>5つ</option>
                <option value="10">10つ</option>
              </select>
            </div>
            <button onclick="generateIdeas()" id="generate-btn" class="w-full py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-semibold">
              <i class="fas fa-magic mr-2"></i>${t('generate')}
            </button>
          </div>
          
          <div id="idea-results" class="mt-6 hidden">
            <h3 class="font-semibold text-gray-700 mb-3">生成されたアイデア</h3>
            <div id="idea-output" class="prose max-w-none bg-gray-50 p-4 rounded-lg"></div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPlotMode() {
    return `
      <div class="max-w-4xl mx-auto">
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
              <label class="block text-sm font-medium text-gray-700 mb-1">アイデア・テーマ</label>
              <textarea id="plot-idea" rows="3" placeholder="プロットを作成したいアイデアや概要を入力" class="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">詳細度</label>
              <select id="plot-detail" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="simple">シンプル（概要のみ）</option>
                <option value="standard" selected>標準</option>
                <option value="detailed">詳細（各章の説明付き）</option>
              </select>
            </div>
            <button onclick="generatePlot()" id="generate-btn" class="w-full py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-semibold">
              <i class="fas fa-magic mr-2"></i>${t('generate')}
            </button>
          </div>
          
          <div id="plot-results" class="mt-6 hidden">
            <h3 class="font-semibold text-gray-700 mb-3">生成されたプロット</h3>
            <div id="plot-output" class="prose max-w-none bg-gray-50 p-4 rounded-lg"></div>
          </div>
        </div>
      </div>
    `;
  }

  function renderWritingMode() {
    const project = state.currentProject;
    
    return `
      <div class="h-full flex gap-4">
        <!-- Editor -->
        <div class="flex-1 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
          <div class="p-4 border-b border-gray-200 flex items-center justify-between">
            <input type="text" id="project-title" value="${escapeHtml(project?.title || '')}" placeholder="${t('title')}" class="text-lg font-semibold text-gray-800 border-none focus:outline-none flex-1">
            <div class="flex items-center gap-2">
              <button onclick="saveProject()" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                <i class="fas fa-save mr-2"></i>${t('save')}
              </button>
              <button onclick="showExportModal()" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                <i class="fas fa-download mr-2"></i>${t('export')}
              </button>
              <button onclick="showHistoryModal()" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                <i class="fas fa-history mr-2"></i>${t('history')}
              </button>
            </div>
          </div>
          
          <textarea id="editor-content" class="flex-1 p-6 resize-none border-none focus:outline-none focus:ring-0 text-gray-800 leading-relaxed editor-area" placeholder="ここに文章を書きます...">${project?.content || ''}</textarea>
          
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
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50" onclick="closeModal(event)">
        <div class="bg-white rounded-t-xl w-full p-6 max-h-[70vh] overflow-y-auto" onclick="event.stopPropagation()">
          <h3 class="text-lg font-bold text-gray-800 mb-4">AI Assistant</h3>
          <div class="grid grid-cols-2 gap-2 mb-4">
            <button onclick="closeModal(); aiContinue()" class="py-3 bg-gray-50 rounded-lg"><i class="fas fa-arrow-right text-green-500 mr-2"></i>${t('continue')}</button>
            <button onclick="closeModal(); aiRewrite()" class="py-3 bg-gray-50 rounded-lg"><i class="fas fa-sync text-blue-500 mr-2"></i>${t('rewrite')}</button>
            <button onclick="closeModal(); aiExpand()" class="py-3 bg-gray-50 rounded-lg"><i class="fas fa-expand-arrows-alt text-purple-500 mr-2"></i>${t('expand')}</button>
            <button onclick="closeModal(); aiProofread()" class="py-3 bg-gray-50 rounded-lg"><i class="fas fa-spell-check text-orange-500 mr-2"></i>${t('proofread')}</button>
            <button onclick="closeModal(); aiSummarize()" class="py-3 bg-gray-50 rounded-lg"><i class="fas fa-compress-alt text-teal-500 mr-2"></i>${t('summarize')}</button>
            <button onclick="closeModal(); showTranslateModal()" class="py-3 bg-gray-50 rounded-lg"><i class="fas fa-language text-red-500 mr-2"></i>${t('translate')}</button>
          </div>
          <button onclick="closeModal()" class="w-full py-3 border border-gray-300 rounded-lg">${t('close')}</button>
        </div>
      </div>
    `;
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
    
    const genreName = t(genre);
    const prompt = `ジャンル: ${genreName}\nテーマ・キーワード: ${theme || '自由'}\n条件: ${conditions || 'なし'}\n\n${count}つの斬新で魅力的なアイデアを提案してください。`;
    
    try {
      const result = await generate(prompt, 'idea');
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
    
    if (!idea.trim()) {
      showToast(t('enterPrompt'), 'warning');
      return;
    }
    
    const detailText = { simple: 'シンプルな概要', standard: '標準的な詳細度', detailed: '各章の詳細な説明付き' };
    const prompt = `ジャンル: ${t(genre)}\nアイデア: ${idea}\n詳細度: ${detailText[detail]}\n\n魅力的なプロットを作成してください。`;
    
    try {
      const result = await generate(prompt, 'plot');
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
      const result = await generate('この文章の続きを自然に書いてください。', 'continuation', targetLength ? parseInt(targetLength) : null, content);
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
      const result = await generate(selected, 'expand', targetLength ? parseInt(targetLength) : null);
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
      const context = editor.value;
      const result = await generate(prompt, 'writing', targetLength ? parseInt(targetLength) : null, context || null);
      
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
