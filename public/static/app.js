// AI Writer Pro - Frontend Application
(function() {
  'use strict';

  // ==================== STATE ====================
  const state = {
    user: null,
    preferences: null,
    currentProject: null,
    projects: [],
    history: [],
    models: [],
    selectedModel: 'grok-3-latest',
    currentTab: 'editor',
    currentMode: 'writing', // 'idea', 'plot', 'writing'
    isGenerating: false,
    theme: 'light',
    sidebarOpen: false,
    autoSaveTimer: null
  };

  // ==================== GENRES ====================
  const GENRES = [
    { id: 'novel', name: '小説', icon: 'fa-book' },
    { id: 'essay', name: 'エッセイ', icon: 'fa-feather' },
    { id: 'blog', name: 'ブログ', icon: 'fa-blog' },
    { id: 'business', name: 'ビジネス文書', icon: 'fa-briefcase' },
    { id: 'academic', name: '学術・論文', icon: 'fa-graduation-cap' },
    { id: 'script', name: '脚本・シナリオ', icon: 'fa-film' },
    { id: 'poetry', name: '詩・俳句', icon: 'fa-heart' },
    { id: 'news', name: 'ニュース記事', icon: 'fa-newspaper' },
    { id: 'review', name: 'レビュー', icon: 'fa-star' },
    { id: 'sns', name: 'SNS投稿', icon: 'fa-hashtag' },
    { id: 'email', name: 'メール', icon: 'fa-envelope' },
    { id: 'copywriting', name: 'コピーライティング', icon: 'fa-bullhorn' },
    { id: 'technical', name: '技術文書', icon: 'fa-code' },
    { id: 'fantasy', name: 'ファンタジー', icon: 'fa-dragon' },
    { id: 'mystery', name: 'ミステリー', icon: 'fa-search' },
    { id: 'romance', name: '恋愛', icon: 'fa-heart' },
    { id: 'horror', name: 'ホラー', icon: 'fa-ghost' },
    { id: 'sf', name: 'SF', icon: 'fa-rocket' },
    { id: 'other', name: 'その他', icon: 'fa-ellipsis-h' }
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
      throw new Error(data.error || 'APIエラーが発生しました');
    }
    
    return data;
  }

  // ==================== HELPER FUNCTIONS ====================
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
      if (state.preferences) {
        state.selectedModel = state.preferences.default_model || 'grok-3-latest';
        state.theme = state.preferences.theme || 'light';
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
    return data;
  }

  async function register(email, password, username) {
    const data = await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username })
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
    if (!confirm('本当にアカウントを削除しますか？この操作は取り消せません。')) return;
    if (!confirm('すべてのデータが削除されます。よろしいですか？')) return;
    
    await api('/auth/account', { method: 'DELETE' });
    state.user = null;
    state.projects = [];
    showToast('アカウントを削除しました', 'success');
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
    if (!confirm('このプロジェクトを削除しますか？')) return;
    
    await api(`/projects/${id}`, { method: 'DELETE' });
    if (state.currentProject?.id === id) {
      state.currentProject = null;
    }
    await loadProjects();
    render();
    showToast('プロジェクトを削除しました', 'success');
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

  async function generate(prompt, type, targetLength = null, context = null) {
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
          context
        })
      });
      
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
    if (state.user) {
      api('/auth/preferences', {
        method: 'PUT',
        body: JSON.stringify({
          ...state.preferences,
          theme: state.theme
        })
      });
    }
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
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      
      // 読了時間計算（日本語は400-600文字/分、ここでは500文字/分で計算）
      const readingTimeMin = Math.ceil(charsNoSpace / 500);
      const readingTimeText = readingTimeMin < 1 ? '1分未満' : `約${readingTimeMin}分`;
      
      // 原稿用紙換算（400字詰め）
      const manuscriptPages = (charsNoSpace / 400).toFixed(1);
      
      counter.innerHTML = `
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span><span class="font-semibold text-purple-600">${chars.toLocaleString()}</span> 文字</span>
          <span class="text-gray-400">|</span>
          <span>${charsNoSpace.toLocaleString()} 文字（空白除く）</span>
          <span class="text-gray-400">|</span>
          <span>${lines.toLocaleString()} 行</span>
          <span class="text-gray-400">|</span>
          <span><i class="fas fa-clock text-gray-400 mr-1"></i>${readingTimeText}</span>
          <span class="text-gray-400">|</span>
          <span><i class="fas fa-file-alt text-gray-400 mr-1"></i>${manuscriptPages}枚（400字）</span>
        </div>
      `;
    }
  }

  function updateGenerateButton() {
    const btn = document.getElementById('generate-btn');
    if (btn) {
      btn.disabled = state.isGenerating;
      btn.innerHTML = state.isGenerating 
        ? '<i class="fas fa-spinner fa-spin mr-2"></i>生成中...'
        : '<i class="fas fa-magic mr-2"></i>AI生成';
    }
  }

  // ==================== AUTO SAVE ====================
  function setupAutoSave() {
    const editor = document.getElementById('editor-content');
    if (!editor || !state.currentProject) return;
    
    editor.addEventListener('input', () => {
      updateCharCount();
      
      if (state.autoSaveTimer) {
        clearTimeout(state.autoSaveTimer);
      }
      
      state.autoSaveTimer = setTimeout(async () => {
        if (state.preferences?.auto_save !== false) {
          await updateProject();
          showToast('自動保存しました', 'info');
        }
      }, 3000);
    });
  }

  // ==================== RENDER FUNCTIONS ====================
  
  function renderAuthPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 fade-in">
          <div class="text-center mb-8">
            <i class="fas fa-pen-fancy text-5xl text-purple-600 mb-4"></i>
            <h1 class="text-3xl font-bold text-gray-800">AI Writer Pro</h1>
            <p class="text-gray-600 mt-2">AIライティングツール</p>
          </div>
          
          <div id="auth-tabs" class="flex border-b mb-6">
            <button onclick="showLoginTab()" id="login-tab" class="flex-1 py-3 tab-active font-medium">ログイン</button>
            <button onclick="showRegisterTab()" id="register-tab" class="flex-1 py-3 text-gray-500 font-medium">新規登録</button>
          </div>
          
          <div id="login-form">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                <input type="email" id="login-email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="example@email.com">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
                <input type="password" id="login-password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="••••••••">
              </div>
              <button onclick="handleLogin()" class="w-full gradient-bg text-white py-3 rounded-lg font-medium hover:opacity-90 transition">
                <i class="fas fa-sign-in-alt mr-2"></i>ログイン
              </button>
            </div>
          </div>
          
          <div id="register-form" class="hidden">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">ユーザー名</label>
                <input type="text" id="register-username" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="ニックネーム">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                <input type="email" id="register-email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="example@email.com">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
                <input type="password" id="register-password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="6文字以上">
              </div>
              <button onclick="handleRegister()" class="w-full gradient-bg text-white py-3 rounded-lg font-medium hover:opacity-90 transition">
                <i class="fas fa-user-plus mr-2"></i>登録
              </button>
            </div>
          </div>
          
          <div class="mt-6 text-center text-sm text-gray-500">
            <p>Grok AIを搭載した次世代ライティングツール</p>
          </div>
        </div>
      </div>
    `;
  }

  function renderMainApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <aside id="sidebar" class="sidebar w-64 bg-white border-r border-gray-200 flex flex-col h-full">
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center gap-3">
              <i class="fas fa-pen-fancy text-2xl text-purple-600"></i>
              <span class="font-bold text-xl text-gray-800">AI Writer Pro</span>
            </div>
          </div>
          
          <!-- User Info -->
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                ${state.user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-800 truncate">${state.user?.username || 'ユーザー'}</p>
                <p class="text-sm text-gray-500 truncate">${state.user?.email || ''}</p>
              </div>
            </div>
          </div>
          
          <!-- Mode Selection -->
          <div class="p-4 border-b border-gray-200">
            <p class="text-xs font-medium text-gray-500 uppercase mb-3">作業モード</p>
            <div class="space-y-2">
              <button onclick="setMode('idea')" class="mode-btn w-full text-left px-4 py-2 rounded-lg hover:bg-purple-50 transition flex items-center gap-3 ${state.currentMode === 'idea' ? 'bg-purple-100 text-purple-700' : 'text-gray-700'}">
                <i class="fas fa-lightbulb"></i>
                <span>ネタ考案</span>
              </button>
              <button onclick="setMode('plot')" class="mode-btn w-full text-left px-4 py-2 rounded-lg hover:bg-purple-50 transition flex items-center gap-3 ${state.currentMode === 'plot' ? 'bg-purple-100 text-purple-700' : 'text-gray-700'}">
                <i class="fas fa-sitemap"></i>
                <span>プロット作成</span>
              </button>
              <button onclick="setMode('writing')" class="mode-btn w-full text-left px-4 py-2 rounded-lg hover:bg-purple-50 transition flex items-center gap-3 ${state.currentMode === 'writing' ? 'bg-purple-100 text-purple-700' : 'text-gray-700'}">
                <i class="fas fa-edit"></i>
                <span>ライティング</span>
              </button>
            </div>
          </div>
          
          <!-- Projects List -->
          <div class="flex-1 overflow-y-auto p-4">
            <div class="flex items-center justify-between mb-3">
              <p class="text-xs font-medium text-gray-500 uppercase">プロジェクト</p>
              <button onclick="showNewProjectModal()" class="text-purple-600 hover:text-purple-800">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div id="projects-list" class="space-y-2">
              ${renderProjectsList()}
            </div>
          </div>
          
          <!-- Bottom Actions -->
          <div class="p-4 border-t border-gray-200 space-y-2">
            <button onclick="showHistoryModal()" class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-3 text-gray-700">
              <i class="fas fa-history"></i>
              <span>生成履歴</span>
            </button>
            <button onclick="showSettingsModal()" class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-3 text-gray-700">
              <i class="fas fa-cog"></i>
              <span>設定</span>
            </button>
            <button onclick="logout()" class="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 transition flex items-center gap-3 text-red-600">
              <i class="fas fa-sign-out-alt"></i>
              <span>ログアウト</span>
            </button>
          </div>
        </aside>
        
        <!-- Sidebar Overlay (Mobile) -->
        <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden md:hidden" onclick="toggleSidebar()"></div>
        
        <!-- Main Content -->
        <main class="flex-1 flex flex-col overflow-hidden">
          <!-- Top Bar -->
          <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <button onclick="toggleSidebar()" class="md:hidden text-gray-600 hover:text-gray-800">
                <i class="fas fa-bars text-xl"></i>
              </button>
              <div class="flex items-center gap-2">
                <i class="fas ${getModeIcon()} text-purple-600"></i>
                <span class="font-medium text-gray-800">${getModeName()}</span>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <!-- Model Selection -->
              <select id="model-select" onchange="changeModel(this.value)" class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500">
                ${state.models.map(m => `
                  <option value="${m.id}" ${state.selectedModel === m.id ? 'selected' : ''}>${m.name}</option>
                `).join('')}
              </select>
              
              <!-- Theme Toggle -->
              <button onclick="toggleTheme()" class="p-2 text-gray-600 hover:text-gray-800 transition">
                <i class="fas ${state.theme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
              </button>
            </div>
          </header>
          
          <!-- Content Area -->
          <div class="flex-1 overflow-y-auto p-4 md:p-6">
            ${renderCurrentMode()}
          </div>
        </main>
      </div>
      
      <!-- Modals Container -->
      <div id="modals"></div>
    `;
    
    setupAutoSave();
    updateCharCount();
  }

  function renderProjectsList() {
    if (state.projects.length === 0) {
      return '<p class="text-sm text-gray-500 text-center py-4">プロジェクトがありません</p>';
    }
    
    return state.projects.map(p => `
      <div class="group flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer ${state.currentProject?.id === p.id ? 'bg-purple-50' : ''}" onclick="loadProject(${p.id})">
        <i class="fas ${getTypeIcon(p.project_type)} text-gray-400"></i>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-700 truncate">${p.title}</p>
          <p class="text-xs text-gray-500">${p.word_count?.toLocaleString() || 0} 文字</p>
        </div>
        <button onclick="event.stopPropagation(); deleteProject(${p.id})" class="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1">
          <i class="fas fa-trash-alt text-xs"></i>
        </button>
      </div>
    `).join('');
  }

  function getTypeIcon(type) {
    const icons = { idea: 'fa-lightbulb', plot: 'fa-sitemap', writing: 'fa-edit' };
    return icons[type] || 'fa-file';
  }

  function getModeIcon() {
    const icons = { idea: 'fa-lightbulb', plot: 'fa-sitemap', writing: 'fa-edit' };
    return icons[state.currentMode] || 'fa-edit';
  }

  function getModeName() {
    const names = { idea: 'ネタ考案', plot: 'プロット作成', writing: 'ライティング' };
    return names[state.currentMode] || 'ライティング';
  }

  function renderCurrentMode() {
    switch (state.currentMode) {
      case 'idea':
        return renderIdeaMode();
      case 'plot':
        return renderPlotMode();
      default:
        return renderWritingMode();
    }
  }

  function renderGenreSelect(selectedGenre = 'novel', customGenre = '') {
    return `
      <div class="space-y-3">
        <label class="block text-sm font-medium text-gray-700">ジャンル</label>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          ${GENRES.map(g => `
            <button type="button" onclick="selectGenre('${g.id}')" class="genre-btn p-3 border rounded-lg text-center hover:border-purple-500 hover:bg-purple-50 transition ${selectedGenre === g.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}" data-genre="${g.id}">
              <i class="fas ${g.icon} text-lg mb-1 ${selectedGenre === g.id ? 'text-purple-600' : 'text-gray-500'}"></i>
              <p class="text-xs ${selectedGenre === g.id ? 'text-purple-700' : 'text-gray-600'}">${g.name}</p>
            </button>
          `).join('')}
        </div>
        <div id="custom-genre-input" class="${selectedGenre === 'other' ? '' : 'hidden'}">
          <input type="text" id="custom-genre" value="${customGenre}" placeholder="カスタムジャンルを入力" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
        </div>
        <input type="hidden" id="selected-genre" value="${selectedGenre}">
      </div>
    `;
  }

  function renderIdeaMode() {
    return `
      <div class="max-w-4xl mx-auto space-y-6 fade-in">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <i class="fas fa-lightbulb text-yellow-500"></i>
            ネタ・アイデア考案
          </h2>
          
          ${renderGenreSelect(state.currentProject?.genre || 'novel', state.currentProject?.custom_genre || '')}
          
          <div class="mt-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">テーマ・キーワード</label>
              <input type="text" id="idea-theme" placeholder="例：恋愛、友情、冒険、日常..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">追加の条件（任意）</label>
              <textarea id="idea-conditions" rows="3" placeholder="例：主人公は高校生、舞台は未来の東京..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"></textarea>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">アイデア数</label>
                <select id="idea-count" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option value="3">3つ</option>
                  <option value="5" selected>5つ</option>
                  <option value="10">10つ</option>
                </select>
              </div>
            </div>
            
            <button id="generate-btn" onclick="generateIdeas()" class="w-full gradient-bg text-white py-3 rounded-lg font-medium hover:opacity-90 transition">
              <i class="fas fa-magic mr-2"></i>アイデアを生成
            </button>
          </div>
        </div>
        
        <div id="idea-results" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${state.currentProject?.content ? '' : 'hidden'}">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gray-800">生成されたアイデア</h3>
            <button onclick="copyContent('idea-output')" class="text-purple-600 hover:text-purple-800 text-sm">
              <i class="fas fa-copy mr-1"></i>コピー
            </button>
          </div>
          <div id="idea-output" class="prose max-w-none whitespace-pre-wrap text-gray-700">${state.currentProject?.content || ''}</div>
        </div>
      </div>
    `;
  }

  function renderPlotMode() {
    return `
      <div class="max-w-4xl mx-auto space-y-6 fade-in">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <i class="fas fa-sitemap text-blue-500"></i>
            プロット作成
          </h2>
          
          ${renderGenreSelect(state.currentProject?.genre || 'novel', state.currentProject?.custom_genre || '')}
          
          <div class="mt-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">物語の概要・アイデア</label>
              <textarea id="plot-idea" rows="4" placeholder="作りたい物語のアイデアや概要を入力..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">${state.currentProject?.content?.split('\n\n---\n\n')[0] || ''}</textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">プロットの詳細度</label>
              <select id="plot-detail" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                <option value="simple">シンプル（概要のみ）</option>
                <option value="standard" selected>標準（起承転結）</option>
                <option value="detailed">詳細（各章の概要含む）</option>
              </select>
            </div>
            
            <button id="generate-btn" onclick="generatePlot()" class="w-full gradient-bg text-white py-3 rounded-lg font-medium hover:opacity-90 transition">
              <i class="fas fa-magic mr-2"></i>プロットを生成
            </button>
          </div>
        </div>
        
        <div id="plot-results" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gray-800">プロット</h3>
            <div class="flex gap-2">
              <button onclick="copyContent('plot-output')" class="text-purple-600 hover:text-purple-800 text-sm">
                <i class="fas fa-copy mr-1"></i>コピー
              </button>
              <button onclick="startWritingFromPlot()" class="text-green-600 hover:text-green-800 text-sm">
                <i class="fas fa-pen mr-1"></i>執筆開始
              </button>
            </div>
          </div>
          <div id="plot-output" class="prose max-w-none whitespace-pre-wrap text-gray-700">${state.currentProject?.content?.split('\n\n---\n\n')[1] || ''}</div>
        </div>
      </div>
    `;
  }

  function renderWritingMode() {
    const project = state.currentProject;
    return `
      <div class="h-full flex flex-col fade-in">
        <!-- Project Header -->
        <div class="bg-white rounded-t-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
          <div class="flex items-center gap-4 flex-1">
            <input type="text" id="project-title" value="${project?.title || '無題のプロジェクト'}" placeholder="タイトルを入力" class="text-lg font-bold text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0 flex-1">
            <div class="flex items-center gap-2 text-sm">
              ${project ? `
                <span class="px-2 py-1 bg-gray-100 rounded text-gray-600">
                  ${GENRES.find(g => g.id === project.genre)?.name || project.genre}
                </span>
              ` : ''}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="saveProject()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
              <i class="fas fa-save mr-1"></i>保存
            </button>
            <button onclick="showExportModal()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
              <i class="fas fa-download mr-1"></i>エクスポート
            </button>
          </div>
        </div>
        
        <!-- Editor Area -->
        <div class="flex-1 flex gap-4 mt-4">
          <!-- Main Editor -->
          <div class="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200">
            <textarea id="editor-content" class="flex-1 p-6 resize-none border-none focus:outline-none focus:ring-0 text-gray-800 leading-relaxed editor-area" placeholder="ここに文章を書きます...">${project?.content || ''}</textarea>
            
            <!-- Character Counter -->
            <div class="border-t border-gray-200 px-6 py-3 bg-gray-50 rounded-b-xl">
              <div id="char-count" class="text-sm text-gray-600 char-counter">
                <span class="font-semibold">0</span> 文字
              </div>
            </div>
          </div>
          
          <!-- AI Assistant Panel -->
          <div class="w-80 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col hidden lg:flex">
            <div class="p-4 border-b border-gray-200">
              <h3 class="font-bold text-gray-800 flex items-center gap-2">
                <i class="fas fa-robot text-purple-600"></i>
                AI アシスタント
              </h3>
            </div>
            
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
              <!-- Writing Actions -->
              <div>
                <p class="text-xs text-gray-500 uppercase font-medium mb-2">執筆サポート</p>
                <div class="space-y-2">
                  <button onclick="aiContinue()" class="w-full text-left px-3 py-2 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-sm">
                    <i class="fas fa-arrow-right text-purple-600 mr-2"></i>続きを書く
                  </button>
                  <button onclick="aiRewrite()" class="w-full text-left px-3 py-2 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-sm">
                    <i class="fas fa-sync-alt text-blue-600 mr-2"></i>書き直す
                  </button>
                  <button onclick="aiExpand()" class="w-full text-left px-3 py-2 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-sm">
                    <i class="fas fa-expand-alt text-green-600 mr-2"></i>拡張する
                  </button>
                </div>
              </div>
              
              <!-- Editing Tools -->
              <div class="border-t border-gray-200 pt-4">
                <p class="text-xs text-gray-500 uppercase font-medium mb-2">編集ツール</p>
                <div class="space-y-2">
                  <button onclick="aiProofread()" class="w-full text-left px-3 py-2 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-sm">
                    <i class="fas fa-spell-check text-red-600 mr-2"></i>校正する
                  </button>
                  <button onclick="aiSummarize()" class="w-full text-left px-3 py-2 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-sm">
                    <i class="fas fa-compress-alt text-orange-600 mr-2"></i>要約する
                  </button>
                  <button onclick="aiGenerateTitle()" class="w-full text-left px-3 py-2 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-sm">
                    <i class="fas fa-heading text-indigo-600 mr-2"></i>タイトル案
                  </button>
                </div>
              </div>
              
              <!-- Style Conversion -->
              <div class="border-t border-gray-200 pt-4">
                <p class="text-xs text-gray-500 uppercase font-medium mb-2">文体変換</p>
                <div class="grid grid-cols-3 gap-2">
                  <button onclick="aiStyleConvert('formal')" class="px-2 py-2 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-xs text-center">
                    <i class="fas fa-user-tie text-gray-600 block mb-1"></i>敬語
                  </button>
                  <button onclick="aiStyleConvert('casual')" class="px-2 py-2 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-xs text-center">
                    <i class="fas fa-smile text-gray-600 block mb-1"></i>カジュアル
                  </button>
                  <button onclick="aiStyleConvert('literary')" class="px-2 py-2 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-xs text-center">
                    <i class="fas fa-feather-alt text-gray-600 block mb-1"></i>文学的
                  </button>
                </div>
              </div>
              
              <!-- Custom Generation -->
              <div class="border-t border-gray-200 pt-4">
                <p class="text-xs text-gray-500 uppercase font-medium mb-2">カスタム生成</p>
                <textarea id="custom-prompt" rows="2" placeholder="AIへの指示を入力..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"></textarea>
                
                <div class="mt-2">
                  <label class="block text-xs text-gray-500 mb-1">目標文字数（任意）</label>
                  <input type="number" id="target-length" placeholder="例: 500" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm">
                </div>
                
                <button id="generate-btn" onclick="customGenerate()" class="w-full mt-3 gradient-bg text-white py-2 rounded-lg font-medium hover:opacity-90 transition text-sm">
                  <i class="fas fa-magic mr-2"></i>AI生成
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mobile AI Button -->
        <button onclick="showMobileAIPanel()" class="lg:hidden fixed bottom-6 right-6 w-14 h-14 gradient-bg text-white rounded-full shadow-lg flex items-center justify-center">
          <i class="fas fa-robot text-xl"></i>
        </button>
      </div>
    `;
  }

  // ==================== MODAL FUNCTIONS ====================

  function showNewProjectModal() {
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
          <h2 class="text-xl font-bold text-gray-800 mb-6">新規プロジェクト</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
              <input type="text" id="new-project-title" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="プロジェクト名">
            </div>
            
            ${renderGenreSelect()}
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">プロジェクトタイプ</label>
              <div class="grid grid-cols-3 gap-2">
                <button type="button" onclick="selectProjectType('idea')" class="project-type-btn p-3 border rounded-lg text-center hover:border-purple-500 hover:bg-purple-50 transition border-purple-500 bg-purple-50" data-type="idea">
                  <i class="fas fa-lightbulb text-lg mb-1 text-purple-600"></i>
                  <p class="text-xs text-purple-700">ネタ考案</p>
                </button>
                <button type="button" onclick="selectProjectType('plot')" class="project-type-btn p-3 border rounded-lg text-center hover:border-purple-500 hover:bg-purple-50 transition border-gray-200" data-type="plot">
                  <i class="fas fa-sitemap text-lg mb-1 text-gray-500"></i>
                  <p class="text-xs text-gray-600">プロット</p>
                </button>
                <button type="button" onclick="selectProjectType('writing')" class="project-type-btn p-3 border rounded-lg text-center hover:border-purple-500 hover:bg-purple-50 transition border-gray-200" data-type="writing">
                  <i class="fas fa-edit text-lg mb-1 text-gray-500"></i>
                  <p class="text-xs text-gray-600">ライティング</p>
                </button>
              </div>
              <input type="hidden" id="selected-project-type" value="idea">
            </div>
          </div>
          
          <div class="mt-6 flex gap-3">
            <button onclick="closeModal()" class="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              キャンセル
            </button>
            <button onclick="createNewProject()" class="flex-1 px-4 py-3 gradient-bg text-white rounded-lg hover:opacity-90 transition">
              作成
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function showHistoryModal() {
    loadHistory().then(() => {
      const modals = document.getElementById('modals');
      modals.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
          <div class="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-800">AI生成履歴</h2>
              <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div class="space-y-4">
              ${state.history.length === 0 ? '<p class="text-center text-gray-500 py-8">履歴がありません</p>' : 
                state.history.map(h => `
                  <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                      <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">${getTypeName(h.generation_type)}</span>
                      <span class="text-xs text-gray-500">${new Date(h.created_at).toLocaleString('ja-JP')}</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2"><strong>プロンプト:</strong> ${h.prompt.substring(0, 100)}${h.prompt.length > 100 ? '...' : ''}</p>
                    <p class="text-sm text-gray-700">${h.response.substring(0, 200)}${h.response.length > 200 ? '...' : ''}</p>
                    <div class="mt-2 flex gap-2">
                      <button onclick="copyHistoryItem(${h.id})" class="text-xs text-purple-600 hover:text-purple-800">
                        <i class="fas fa-copy mr-1"></i>コピー
                      </button>
                      <button onclick="insertHistoryItem(${h.id})" class="text-xs text-green-600 hover:text-green-800">
                        <i class="fas fa-plus mr-1"></i>挿入
                      </button>
                    </div>
                  </div>
                `).join('')}
            </div>
          </div>
        </div>
      `;
    });
  }

  function getTypeName(type) {
    const names = {
      idea: 'アイデア',
      plot: 'プロット',
      writing: '執筆',
      continuation: '続き',
      rewrite: '書き直し',
      expand: '拡張',
      proofread: '校正',
      summarize: '要約',
      style_formal: '敬語変換',
      style_casual: 'カジュアル変換',
      style_literary: '文学的変換',
      title_generate: 'タイトル生成'
    };
    return names[type] || type;
  }

  function showSettingsModal() {
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl w-full max-w-lg p-6" onclick="event.stopPropagation()">
          <h2 class="text-xl font-bold text-gray-800 mb-6">設定</h2>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">デフォルトモデル</label>
              <select id="settings-model" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                ${state.models.map(m => `
                  <option value="${m.id}" ${state.preferences?.default_model === m.id ? 'selected' : ''}>${m.name}</option>
                `).join('')}
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">テーマ</label>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="theme" value="light" ${state.theme === 'light' ? 'checked' : ''} class="text-purple-600">
                  <span>ライト</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="theme" value="dark" ${state.theme === 'dark' ? 'checked' : ''} class="text-purple-600">
                  <span>ダーク</span>
                </label>
              </div>
            </div>
            
            <div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="settings-autosave" ${state.preferences?.auto_save !== false ? 'checked' : ''} class="text-purple-600 rounded">
                <span class="text-sm text-gray-700">自動保存を有効にする</span>
              </label>
            </div>
            
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-sm font-medium text-red-600 mb-4">危険な操作</h3>
              <button onclick="deleteAccount()" class="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm">
                <i class="fas fa-trash-alt mr-2"></i>アカウントを削除
              </button>
            </div>
          </div>
          
          <div class="mt-6 flex gap-3">
            <button onclick="closeModal()" class="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              キャンセル
            </button>
            <button onclick="saveSettings()" class="flex-1 px-4 py-3 gradient-bg text-white rounded-lg hover:opacity-90 transition">
              保存
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function showMobileAIPanel() {
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50" onclick="closeModal(event)">
        <div class="bg-white rounded-t-xl w-full p-6 max-h-[80vh] overflow-y-auto" onclick="event.stopPropagation()">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gray-800 flex items-center gap-2">
              <i class="fas fa-robot text-purple-600"></i>
              AI アシスタント
            </h3>
            <button onclick="closeModal()" class="text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="space-y-3">
            <!-- 執筆サポート -->
            <p class="text-xs text-gray-500 uppercase font-medium">執筆サポート</p>
            <div class="grid grid-cols-3 gap-2">
              <button onclick="aiContinue(); closeModal();" class="px-3 py-3 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center">
                <i class="fas fa-arrow-right text-purple-600 block mb-1"></i>
                <span class="text-xs">続きを書く</span>
              </button>
              <button onclick="aiRewrite(); closeModal();" class="px-3 py-3 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center">
                <i class="fas fa-sync-alt text-blue-600 block mb-1"></i>
                <span class="text-xs">書き直す</span>
              </button>
              <button onclick="aiExpand(); closeModal();" class="px-3 py-3 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center">
                <i class="fas fa-expand-alt text-green-600 block mb-1"></i>
                <span class="text-xs">拡張する</span>
              </button>
            </div>
            
            <!-- 編集ツール -->
            <p class="text-xs text-gray-500 uppercase font-medium mt-4">編集ツール</p>
            <div class="grid grid-cols-3 gap-2">
              <button onclick="closeModal(); aiProofread();" class="px-3 py-3 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center">
                <i class="fas fa-spell-check text-red-600 block mb-1"></i>
                <span class="text-xs">校正する</span>
              </button>
              <button onclick="closeModal(); aiSummarize();" class="px-3 py-3 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center">
                <i class="fas fa-compress-alt text-orange-600 block mb-1"></i>
                <span class="text-xs">要約する</span>
              </button>
              <button onclick="closeModal(); aiGenerateTitle();" class="px-3 py-3 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center">
                <i class="fas fa-heading text-indigo-600 block mb-1"></i>
                <span class="text-xs">タイトル案</span>
              </button>
            </div>
            
            <!-- 文体変換 -->
            <p class="text-xs text-gray-500 uppercase font-medium mt-4">文体変換</p>
            <div class="grid grid-cols-3 gap-2">
              <button onclick="closeModal(); aiStyleConvert('formal');" class="px-3 py-3 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center">
                <i class="fas fa-user-tie text-gray-600 block mb-1"></i>
                <span class="text-xs">敬語</span>
              </button>
              <button onclick="closeModal(); aiStyleConvert('casual');" class="px-3 py-3 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center">
                <i class="fas fa-smile text-gray-600 block mb-1"></i>
                <span class="text-xs">カジュアル</span>
              </button>
              <button onclick="closeModal(); aiStyleConvert('literary');" class="px-3 py-3 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center">
                <i class="fas fa-feather-alt text-gray-600 block mb-1"></i>
                <span class="text-xs">文学的</span>
              </button>
            </div>
            
            <div class="border-t border-gray-200 pt-4 mt-4">
              <textarea id="mobile-custom-prompt" rows="2" placeholder="AIへの指示を入力..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"></textarea>
              <input type="number" id="mobile-target-length" placeholder="目標文字数（任意）" class="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
              <button onclick="mobileCustomGenerate()" class="w-full mt-3 gradient-bg text-white py-3 rounded-lg font-medium">
                <i class="fas fa-magic mr-2"></i>AI生成
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function showExportModal() {
    const modals = document.getElementById('modals');
    modals.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">
        <div class="bg-white rounded-xl w-full max-w-md p-6" onclick="event.stopPropagation()">
          <h2 class="text-xl font-bold text-gray-800 mb-6">エクスポート</h2>
          
          <div class="space-y-3">
            <button onclick="exportAs('txt')" class="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition flex items-center gap-3">
              <i class="fas fa-file-alt text-gray-500"></i>
              <div>
                <p class="font-medium">テキストファイル (.txt)</p>
                <p class="text-xs text-gray-500">プレーンテキスト形式</p>
              </div>
            </button>
            
            <button onclick="exportAs('md')" class="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition flex items-center gap-3">
              <i class="fab fa-markdown text-gray-500"></i>
              <div>
                <p class="font-medium">マークダウン (.md)</p>
                <p class="text-xs text-gray-500">タイトル付きマークダウン形式</p>
              </div>
            </button>
            
            <button onclick="copyContent('editor-content')" class="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition flex items-center gap-3">
              <i class="fas fa-copy text-gray-500"></i>
              <div>
                <p class="font-medium">クリップボードにコピー</p>
                <p class="text-xs text-gray-500">そのまま貼り付け可能</p>
              </div>
            </button>
          </div>
          
          <button onclick="closeModal()" class="w-full mt-6 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            閉じる
          </button>
        </div>
      </div>
    `;
  }

  // ==================== GLOBAL FUNCTIONS ====================
  
  window.showLoginTab = function() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-tab').classList.add('tab-active');
    document.getElementById('register-tab').classList.remove('tab-active');
    document.getElementById('register-tab').classList.add('text-gray-500');
    document.getElementById('login-tab').classList.remove('text-gray-500');
  };

  window.showRegisterTab = function() {
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-tab').classList.add('tab-active');
    document.getElementById('login-tab').classList.remove('tab-active');
    document.getElementById('login-tab').classList.add('text-gray-500');
    document.getElementById('register-tab').classList.remove('text-gray-500');
  };

  window.handleLogin = async function() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
      await login(email, password);
      showToast('ログインしました', 'success');
      await init();
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.handleRegister = async function() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    try {
      await register(email, password, username);
      showToast('登録しました', 'success');
      await init();
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.logout = logout;
  window.deleteAccount = deleteAccount;
  window.toggleTheme = toggleTheme;
  window.loadProject = loadProject;
  window.deleteProject = deleteProject;

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

  window.selectGenre = function(genre) {
    document.querySelectorAll('.genre-btn').forEach(btn => {
      btn.classList.remove('border-purple-500', 'bg-purple-50');
      btn.classList.add('border-gray-200');
      btn.querySelector('i').classList.remove('text-purple-600');
      btn.querySelector('i').classList.add('text-gray-500');
      btn.querySelector('p').classList.remove('text-purple-700');
      btn.querySelector('p').classList.add('text-gray-600');
    });
    
    const selected = document.querySelector(`.genre-btn[data-genre="${genre}"]`);
    if (selected) {
      selected.classList.add('border-purple-500', 'bg-purple-50');
      selected.classList.remove('border-gray-200');
      selected.querySelector('i').classList.add('text-purple-600');
      selected.querySelector('i').classList.remove('text-gray-500');
      selected.querySelector('p').classList.add('text-purple-700');
      selected.querySelector('p').classList.remove('text-gray-600');
    }
    
    document.getElementById('selected-genre').value = genre;
    
    const customInput = document.getElementById('custom-genre-input');
    if (genre === 'other') {
      customInput.classList.remove('hidden');
    } else {
      customInput.classList.add('hidden');
    }
  };

  window.selectProjectType = function(type) {
    document.querySelectorAll('.project-type-btn').forEach(btn => {
      btn.classList.remove('border-purple-500', 'bg-purple-50');
      btn.classList.add('border-gray-200');
      btn.querySelector('i').classList.remove('text-purple-600');
      btn.querySelector('i').classList.add('text-gray-500');
      btn.querySelector('p').classList.remove('text-purple-700');
      btn.querySelector('p').classList.add('text-gray-600');
    });
    
    const selected = document.querySelector(`.project-type-btn[data-type="${type}"]`);
    if (selected) {
      selected.classList.add('border-purple-500', 'bg-purple-50');
      selected.classList.remove('border-gray-200');
      selected.querySelector('i').classList.add('text-purple-600');
      selected.querySelector('i').classList.remove('text-gray-500');
      selected.querySelector('p').classList.add('text-purple-700');
      selected.querySelector('p').classList.remove('text-gray-600');
    }
    
    document.getElementById('selected-project-type').value = type;
  };

  window.showNewProjectModal = showNewProjectModal;
  window.showHistoryModal = showHistoryModal;
  window.showSettingsModal = showSettingsModal;
  window.showMobileAIPanel = showMobileAIPanel;
  window.showExportModal = showExportModal;

  window.closeModal = function(event) {
    if (!event || event.target === event.currentTarget) {
      document.getElementById('modals').innerHTML = '';
    }
  };

  window.createNewProject = async function() {
    const title = document.getElementById('new-project-title').value || '無題のプロジェクト';
    const genre = document.getElementById('selected-genre').value;
    const customGenre = document.getElementById('custom-genre')?.value || '';
    const type = document.getElementById('selected-project-type').value;
    
    try {
      await createProject(title, genre, customGenre, type);
      state.currentMode = type;
      closeModal();
      render();
      showToast('プロジェクトを作成しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.saveProject = async function() {
    try {
      await updateProject();
      showToast('保存しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.changeModel = function(model) {
    state.selectedModel = model;
  };

  window.generateIdeas = async function() {
    const theme = document.getElementById('idea-theme').value;
    const conditions = document.getElementById('idea-conditions').value;
    const count = document.getElementById('idea-count').value;
    const genre = document.getElementById('selected-genre').value;
    const customGenre = document.getElementById('custom-genre')?.value || '';
    
    if (!theme) {
      showToast('テーマを入力してください', 'warning');
      return;
    }
    
    const genreName = genre === 'other' ? customGenre : GENRES.find(g => g.id === genre)?.name || genre;
    
    const prompt = `ジャンル: ${genreName}
テーマ・キーワード: ${theme}
${conditions ? `追加条件: ${conditions}` : ''}

上記の条件で、${count}個の斬新で魅力的なアイデアを提案してください。`;
    
    try {
      const result = await generate(prompt, 'idea');
      document.getElementById('idea-output').textContent = result;
      document.getElementById('idea-results').classList.remove('hidden');
      
      if (!state.currentProject) {
        await createProject(`アイデア: ${theme}`, genre, customGenre, 'idea', result);
      } else {
        state.currentProject.content = result;
        await updateProject();
      }
      
      showToast('アイデアを生成しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.generatePlot = async function() {
    const idea = document.getElementById('plot-idea').value;
    const detail = document.getElementById('plot-detail').value;
    const genre = document.getElementById('selected-genre').value;
    const customGenre = document.getElementById('custom-genre')?.value || '';
    
    if (!idea) {
      showToast('物語の概要を入力してください', 'warning');
      return;
    }
    
    const genreName = genre === 'other' ? customGenre : GENRES.find(g => g.id === genre)?.name || genre;
    
    let detailInstruction = '';
    switch (detail) {
      case 'simple':
        detailInstruction = '簡潔な概要のみで、全体の流れがわかるようにしてください。';
        break;
      case 'standard':
        detailInstruction = '起承転結の形式で、各パートの概要を説明してください。';
        break;
      case 'detailed':
        detailInstruction = '各章の概要を含む詳細なプロットを作成してください。登場人物の心理描写のポイントも含めてください。';
        break;
    }
    
    const prompt = `ジャンル: ${genreName}
物語のアイデア・概要:
${idea}

${detailInstruction}`;
    
    try {
      const result = await generate(prompt, 'plot');
      document.getElementById('plot-output').textContent = result;
      
      if (!state.currentProject) {
        await createProject(`プロット: ${idea.substring(0, 20)}...`, genre, customGenre, 'plot', idea + '\n\n---\n\n' + result);
      } else {
        state.currentProject.content = idea + '\n\n---\n\n' + result;
        await updateProject();
      }
      
      showToast('プロットを生成しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.startWritingFromPlot = function() {
    if (state.currentProject) {
      const plot = document.getElementById('plot-output').textContent;
      state.currentMode = 'writing';
      createProject(state.currentProject.title.replace('プロット:', '').trim(), state.currentProject.genre, state.currentProject.custom_genre, 'writing', `【プロット】\n${plot}\n\n【本文】\n`).then(() => {
        render();
      });
    }
  };

  window.aiContinue = async function() {
    const editor = document.getElementById('editor-content');
    const content = editor.value;
    
    if (!content) {
      showToast('続きを書くための文章がありません', 'warning');
      return;
    }
    
    const targetLength = document.getElementById('target-length')?.value;
    
    try {
      const result = await generate('この文章の続きを自然に書いてください。', 'continuation', targetLength ? parseInt(targetLength) : null, content);
      editor.value = content + result;
      updateCharCount();
      showToast('続きを生成しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.aiRewrite = async function() {
    const editor = document.getElementById('editor-content');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.substring(start, end);
    
    if (!selected) {
      showToast('書き直す部分を選択してください', 'warning');
      return;
    }
    
    try {
      const result = await generate(`以下の文章をより良い表現に書き直してください:\n\n${selected}`, 'rewrite');
      editor.value = editor.value.substring(0, start) + result + editor.value.substring(end);
      updateCharCount();
      showToast('書き直しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.aiExpand = async function() {
    const editor = document.getElementById('editor-content');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.substring(start, end);
    
    if (!selected) {
      showToast('拡張する部分を選択してください', 'warning');
      return;
    }
    
    const targetLength = document.getElementById('target-length')?.value;
    
    try {
      const result = await generate(`以下の文章をより詳しく拡張してください:\n\n${selected}`, 'expand', targetLength ? parseInt(targetLength) : null);
      editor.value = editor.value.substring(0, start) + result + editor.value.substring(end);
      updateCharCount();
      showToast('拡張しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  // 校正機能
  window.aiProofread = async function() {
    const editor = document.getElementById('editor-content');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = start !== end ? editor.value.substring(start, end) : editor.value;
    
    if (!selected.trim()) {
      showToast('校正する文章がありません', 'warning');
      return;
    }
    
    try {
      const result = await generate('以下の文章を校正してください:\n\n' + selected, 'proofread');
      
      // Show result in modal
      const modals = document.getElementById('modals');
      modals.innerHTML = '<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">' +
        '<div class="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">' +
          '<div class="flex items-center justify-between mb-4">' +
            '<h2 class="text-xl font-bold text-gray-800"><i class="fas fa-spell-check text-red-600 mr-2"></i>校正結果</h2>' +
            '<button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">' +
              '<i class="fas fa-times text-xl"></i>' +
            '</button>' +
          '</div>' +
          '<div class="prose max-w-none whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-lg">' + escapeHtml(result) + '</div>' +
          '<div class="mt-4 flex gap-3">' +
            '<button onclick="closeModal()" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">閉じる</button>' +
            '<button onclick="applyProofreadResult()" class="flex-1 px-4 py-2 gradient-bg text-white rounded-lg hover:opacity-90">修正を適用</button>' +
          '</div>' +
        '</div>' +
      '</div>';
      
      // Store result for applying
      window._proofreadResult = result;
      window._proofreadSelection = { start, end, hadSelection: start !== end };
      
      showToast('校正が完了しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.applyProofreadResult = function() {
    const editor = document.getElementById('editor-content');
    const result = window._proofreadResult || '';
    const selection = window._proofreadSelection;
    
    // Extract corrected text (between 【修正後の文章】 and 【修正箇所】)
    let correctedText = result;
    const correctedMatch = result.match(/【修正後の文章】\n?([\s\S]*?)(?=\n*【修正箇所】|$)/);
    if (correctedMatch) {
      correctedText = correctedMatch[1].trim();
    }
    
    if (selection?.hadSelection) {
      editor.value = editor.value.substring(0, selection.start) + correctedText + editor.value.substring(selection.end);
    } else {
      editor.value = correctedText;
    }
    
    updateCharCount();
    closeModal();
    showToast('修正を適用しました', 'success');
  };

  // 要約機能
  window.aiSummarize = async function() {
    const editor = document.getElementById('editor-content');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = start !== end ? editor.value.substring(start, end) : editor.value;
    
    if (!selected.trim()) {
      showToast('要約する文章がありません', 'warning');
      return;
    }
    
    const targetLength = document.getElementById('target-length')?.value;
    
    try {
      const result = await generate('以下の文章を要約してください:\n\n' + selected, 'summarize', targetLength ? parseInt(targetLength) : null);
      
      // Store result for copy
      window._summarizeResult = result;
      
      // Show result in modal
      const modals = document.getElementById('modals');
      modals.innerHTML = '<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">' +
        '<div class="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">' +
          '<div class="flex items-center justify-between mb-4">' +
            '<h2 class="text-xl font-bold text-gray-800"><i class="fas fa-compress-alt text-orange-600 mr-2"></i>要約結果</h2>' +
            '<button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">' +
              '<i class="fas fa-times text-xl"></i>' +
            '</button>' +
          '</div>' +
          '<div class="mb-2 text-sm text-gray-500">元の文字数: ' + selected.length.toLocaleString() + '文字 → 要約: ' + result.length.toLocaleString() + '文字</div>' +
          '<div class="prose max-w-none whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-lg">' + escapeHtml(result) + '</div>' +
          '<div class="mt-4 flex gap-3">' +
            '<button onclick="copySummarizeResult()" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"><i class="fas fa-copy mr-1"></i>コピー</button>' +
            '<button onclick="closeModal()" class="flex-1 px-4 py-2 gradient-bg text-white rounded-lg hover:opacity-90">閉じる</button>' +
          '</div>' +
        '</div>' +
      '</div>';
      
      showToast('要約が完了しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.copySummarizeResult = function() {
    if (window._summarizeResult) {
      navigator.clipboard.writeText(window._summarizeResult).then(() => {
        showToast('コピーしました', 'success');
      });
    }
  };

  // タイトル生成機能
  window.aiGenerateTitle = async function() {
    const editor = document.getElementById('editor-content');
    const content = editor.value;
    
    if (!content.trim()) {
      showToast('タイトルを生成する文章がありません', 'warning');
      return;
    }
    
    try {
      const result = await generate('以下の文章に最適なタイトルを提案してください:\n\n' + content.substring(0, 2000), 'title_generate');
      
      // Show result in modal
      const modals = document.getElementById('modals');
      modals.innerHTML = '<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">' +
        '<div class="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">' +
          '<div class="flex items-center justify-between mb-4">' +
            '<h2 class="text-xl font-bold text-gray-800"><i class="fas fa-heading text-indigo-600 mr-2"></i>タイトル案</h2>' +
            '<button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">' +
              '<i class="fas fa-times text-xl"></i>' +
            '</button>' +
          '</div>' +
          '<div class="prose max-w-none whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-lg">' + escapeHtml(result) + '</div>' +
          '<div class="mt-4">' +
            '<button onclick="closeModal()" class="w-full px-4 py-2 gradient-bg text-white rounded-lg hover:opacity-90">閉じる</button>' +
          '</div>' +
        '</div>' +
      '</div>';
      
      showToast('タイトル案を生成しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  // 文体変換機能
  window.aiStyleConvert = async function(style) {
    const editor = document.getElementById('editor-content');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = start !== end ? editor.value.substring(start, end) : editor.value;
    
    if (!selected.trim()) {
      showToast('変換する文章がありません', 'warning');
      return;
    }
    
    const styleNames = {
      formal: '敬語・ビジネス文体',
      casual: 'カジュアル・口語体',
      literary: '文学的な表現'
    };
    
    try {
      const result = await generate('以下の文章を変換してください:\n\n' + selected, 'style_' + style);
      
      // Show result in modal
      const modals = document.getElementById('modals');
      modals.innerHTML = '<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeModal(event)">' +
        '<div class="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">' +
          '<div class="flex items-center justify-between mb-4">' +
            '<h2 class="text-xl font-bold text-gray-800"><i class="fas fa-exchange-alt text-purple-600 mr-2"></i>' + styleNames[style] + 'に変換</h2>' +
            '<button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">' +
              '<i class="fas fa-times text-xl"></i>' +
            '</button>' +
          '</div>' +
          '<div class="prose max-w-none whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-lg">' + escapeHtml(result) + '</div>' +
          '<div class="mt-4 flex gap-3">' +
            '<button onclick="closeModal()" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">閉じる</button>' +
            '<button onclick="applyStyleConvert()" class="flex-1 px-4 py-2 gradient-bg text-white rounded-lg hover:opacity-90">変換を適用</button>' +
          '</div>' +
        '</div>' +
      '</div>';
      
      // Store result for applying
      window._styleConvertResult = result;
      window._styleConvertSelection = { start, end, hadSelection: start !== end };
      
      showToast('文体変換が完了しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.applyStyleConvert = function() {
    const editor = document.getElementById('editor-content');
    const result = window._styleConvertResult || '';
    const selection = window._styleConvertSelection;
    
    if (selection?.hadSelection) {
      editor.value = editor.value.substring(0, selection.start) + result + editor.value.substring(selection.end);
    } else {
      editor.value = result;
    }
    
    updateCharCount();
    closeModal();
    showToast('変換を適用しました', 'success');
  };

  window.customGenerate = async function() {
    const prompt = document.getElementById('custom-prompt').value;
    const targetLength = document.getElementById('target-length')?.value;
    const editor = document.getElementById('editor-content');
    
    if (!prompt) {
      showToast('指示を入力してください', 'warning');
      return;
    }
    
    try {
      const result = await generate(prompt, 'writing', targetLength ? parseInt(targetLength) : null, editor.value);
      
      // Insert at cursor or append
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      
      if (start !== end) {
        editor.value = editor.value.substring(0, start) + result + editor.value.substring(end);
      } else {
        editor.value = editor.value + '\n\n' + result;
      }
      
      updateCharCount();
      document.getElementById('custom-prompt').value = '';
      showToast('生成しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.mobileCustomGenerate = async function() {
    const prompt = document.getElementById('mobile-custom-prompt').value;
    const targetLength = document.getElementById('mobile-target-length')?.value;
    
    if (!prompt) {
      showToast('指示を入力してください', 'warning');
      return;
    }
    
    document.getElementById('custom-prompt').value = prompt;
    document.getElementById('target-length').value = targetLength || '';
    
    closeModal();
    await customGenerate();
  };

  window.copyContent = function(elementId) {
    const element = document.getElementById(elementId);
    const text = element.tagName === 'TEXTAREA' || element.tagName === 'INPUT' ? element.value : element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
      showToast('コピーしました', 'success');
    });
  };

  window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text.replace(/\\n/g, '\n')).then(() => {
      showToast('コピーしました', 'success');
    });
  };

  window.insertToEditor = function(text) {
    const editor = document.getElementById('editor-content');
    if (editor) {
      editor.value += '\n\n' + text.replace(/\\n/g, '\n');
      updateCharCount();
      showToast('挿入しました', 'success');
    }
    closeModal();
  };

  window.copyHistoryItem = function(id) {
    const item = state.history.find(h => h.id === id);
    if (item) {
      navigator.clipboard.writeText(item.response).then(() => {
        showToast('コピーしました', 'success');
      });
    }
  };

  window.insertHistoryItem = function(id) {
    const item = state.history.find(h => h.id === id);
    if (item) {
      const editor = document.getElementById('editor-content');
      if (editor) {
        editor.value += '\n\n' + item.response;
        updateCharCount();
        showToast('挿入しました', 'success');
      }
      closeModal();
    }
  };

  window.saveSettings = async function() {
    const model = document.getElementById('settings-model').value;
    const theme = document.querySelector('input[name="theme"]:checked').value;
    const autoSave = document.getElementById('settings-autosave').checked;
    
    try {
      await api('/auth/preferences', {
        method: 'PUT',
        body: JSON.stringify({
          default_model: model,
          default_genre: state.preferences?.default_genre || 'novel',
          theme: theme,
          auto_save: autoSave
        })
      });
      
      state.selectedModel = model;
      state.theme = theme;
      state.preferences = { ...state.preferences, default_model: model, theme, auto_save: autoSave };
      applyTheme();
      closeModal();
      showToast('設定を保存しました', 'success');
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  window.exportAs = function(format) {
    const editor = document.getElementById('editor-content');
    const title = document.getElementById('project-title')?.value || 'document';
    let content = editor.value;
    let filename = `${title}.${format}`;
    let mimeType = 'text/plain';
    
    if (format === 'md') {
      content = `# ${title}\n\n${content}`;
      mimeType = 'text/markdown';
    }
    
    const blob = new Blob([content], { type: mimeType + ';charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    closeModal();
    showToast(`${filename} をダウンロードしました`, 'success');
  };

  // ==================== RENDER ====================
  
  function render() {
    if (state.user) {
      renderMainApp();
    } else {
      renderAuthPage();
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
