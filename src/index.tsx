import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

type Bindings = {
  DB: D1Database
  GROK_API_KEY: string
}

type Variables = {
  user: { id: number; email: string; username: string } | null
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// CORS
app.use('/api/*', cors())

// Session middleware
app.use('/api/*', async (c, next) => {
  const sessionId = getCookie(c, 'session_id')
  if (sessionId) {
    try {
      const session = await c.env.DB.prepare(
        'SELECT s.*, u.id as user_id, u.email, u.username FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.id = ? AND s.expires_at > datetime("now")'
      ).bind(sessionId).first()
      
      if (session) {
        c.set('user', { id: session.user_id as number, email: session.email as string, username: session.username as string })
      }
    } catch (e) {
      // Session invalid
    }
  }
  await next()
})

// Helper: Generate session ID
function generateSessionId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Helper: Simple password hash (for demo - use proper bcrypt in production)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'ai-writer-salt-2024')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/register', async (c) => {
  try {
    const { email, password, username } = await c.req.json()
    
    if (!email || !password || !username) {
      return c.json({ error: 'メールアドレス、パスワード、ユーザー名は必須です' }, 400)
    }
    
    if (password.length < 6) {
      return c.json({ error: 'パスワードは6文字以上必要です' }, 400)
    }
    
    const existing = await c.env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first()
    if (existing) {
      return c.json({ error: 'このメールアドレスは既に登録されています' }, 400)
    }
    
    const passwordHash = await hashPassword(password)
    
    const result = await c.env.DB.prepare(
      'INSERT INTO users (email, password_hash, username) VALUES (?, ?, ?)'
    ).bind(email, passwordHash, username).run()
    
    const userId = result.meta.last_row_id
    
    // Create default preferences
    await c.env.DB.prepare(
      'INSERT INTO user_preferences (user_id) VALUES (?)'
    ).bind(userId).run()
    
    // Create session
    const sessionId = generateSessionId()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    
    await c.env.DB.prepare(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(sessionId, userId, expiresAt).run()
    
    setCookie(c, 'session_id', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    
    return c.json({ success: true, user: { id: userId, email, username } })
  } catch (e: any) {
    return c.json({ error: e.message || '登録に失敗しました' }, 500)
  }
})

// Login
app.post('/api/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    if (!email || !password) {
      return c.json({ error: 'メールアドレスとパスワードは必須です' }, 400)
    }
    
    const passwordHash = await hashPassword(password)
    
    const user = await c.env.DB.prepare(
      'SELECT id, email, username FROM users WHERE email = ? AND password_hash = ?'
    ).bind(email, passwordHash).first()
    
    if (!user) {
      return c.json({ error: 'メールアドレスまたはパスワードが正しくありません' }, 401)
    }
    
    // Create session
    const sessionId = generateSessionId()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    
    await c.env.DB.prepare(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(sessionId, user.id, expiresAt).run()
    
    setCookie(c, 'session_id', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    
    return c.json({ success: true, user: { id: user.id, email: user.email, username: user.username } })
  } catch (e: any) {
    return c.json({ error: e.message || 'ログインに失敗しました' }, 500)
  }
})

// Logout
app.post('/api/auth/logout', async (c) => {
  const sessionId = getCookie(c, 'session_id')
  if (sessionId) {
    await c.env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run()
    deleteCookie(c, 'session_id', { path: '/' })
  }
  return c.json({ success: true })
})

// Get current user
app.get('/api/auth/me', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ user: null })
  }
  
  const prefs = await c.env.DB.prepare(
    'SELECT * FROM user_preferences WHERE user_id = ?'
  ).bind(user.id).first()
  
  return c.json({ user, preferences: prefs })
})

// Delete account
app.delete('/api/auth/account', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: '認証が必要です' }, 401)
  }
  
  try {
    // Delete user (cascade will delete related data)
    await c.env.DB.prepare('DELETE FROM users WHERE id = ?').bind(user.id).run()
    deleteCookie(c, 'session_id', { path: '/' })
    
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ error: e.message || 'アカウント削除に失敗しました' }, 500)
  }
})

// Update preferences
app.put('/api/auth/preferences', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: '認証が必要です' }, 401)
  }
  
  const { default_model, default_genre, theme, auto_save } = await c.req.json()
  
  await c.env.DB.prepare(
    'UPDATE user_preferences SET default_model = ?, default_genre = ?, theme = ?, auto_save = ?, updated_at = datetime("now") WHERE user_id = ?'
  ).bind(default_model, default_genre, theme, auto_save ? 1 : 0, user.id).run()
  
  return c.json({ success: true })
})

// ==================== GROK API ROUTES ====================

const GROK_API_URL = 'https://api.x.ai/v1/chat/completions'

// Available models - Updated January 2025
app.get('/api/grok/models', async (c) => {
  return c.json({
    models: [
      { id: 'grok-4', name: 'Grok 4', description: '最も高性能な推論モデル（最新）' },
      { id: 'grok-4-fast', name: 'Grok 4 Fast', description: 'Grok 4の高速版' },
      { id: 'grok-4.1-fast', name: 'Grok 4.1 Fast', description: '最新の高速モデル' },
      { id: 'grok-3-latest', name: 'Grok 3', description: 'バランスの取れた高性能モデル' },
      { id: 'grok-3-fast-latest', name: 'Grok 3 Fast', description: 'Grok 3の高速版' },
      { id: 'grok-3-mini', name: 'Grok 3 Mini', description: '軽量で高速なモデル' },
      { id: 'grok-3-mini-fast', name: 'Grok 3 Mini Fast', description: '最も高速なモデル' },
      { id: 'grok-2-latest', name: 'Grok 2', description: 'コスト効率の良いモデル' }
    ]
  })
})

// Generate content with Grok
app.post('/api/grok/generate', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: '認証が必要です' }, 401)
  }
  
  try {
    const { prompt, model, generation_type, target_length, project_id, context } = await c.req.json()
    
    if (!prompt) {
      return c.json({ error: 'プロンプトは必須です' }, 400)
    }
    
    const selectedModel = model || 'grok-3-latest'
    
    // Build system prompt based on generation type
    let systemPrompt = 'あなたは優秀な日本語ライターです。'
    
    switch (generation_type) {
      case 'idea':
        systemPrompt = `あなたは創造的なアイデアを生み出す優秀なライターです。
ユーザーが指定したジャンルやテーマに基づいて、斬新で魅力的なアイデアを複数提案してください。
各アイデアには簡単な説明を添えてください。箇条書きで読みやすく整理してください。`
        break
      case 'plot':
        systemPrompt = `あなたは物語構成のプロフェッショナルです。
ユーザーが指定したテーマやアイデアに基づいて、魅力的なプロットを作成してください。
以下の要素を含めてください：
- 導入部（設定、主人公紹介）
- 展開部（問題の発生、葛藤）
- クライマックス（転換点）
- 結末（解決、余韻）
各パートの概要を分かりやすく説明してください。`
        break
      case 'writing':
      case 'continuation':
        systemPrompt = `あなたは優秀な日本語ライターです。
${target_length ? `約${target_length}文字を目標に` : ''}文章を執筆してください。
文体は自然で読みやすく、内容は魅力的であることを心がけてください。
${context ? `以下は既存の文章です。この続きを自然に書いてください。` : ''}`
        break
      case 'rewrite':
        systemPrompt = `あなたは優秀な編集者です。
与えられた文章をより良い表現に書き直してください。
- 文法の修正
- 表現の改善
- 読みやすさの向上
を心がけてください。文章の意図は変えないでください。`
        break
      case 'expand':
        systemPrompt = `あなたは優秀なライターです。
与えられた文章を${target_length ? `約${target_length}文字に` : 'より詳しく'}拡張してください。
- 詳細な描写の追加
- 感情表現の豊かさ
- 具体的な例の挿入
を心がけてください。`
        break
      case 'proofread':
        systemPrompt = `あなたは優秀な校正者です。
与えられた文章を校正し、以下の形式で返してください：

【修正後の文章】
（修正済みの文章全体）

【修正箇所】
- 修正1: 「誤」→「正」（理由）
- 修正2: ...

誤字脱字、文法ミス、句読点の誤用、表記揺れを見つけて修正してください。
意味や文体は変えないでください。`
        break
      case 'summarize':
        systemPrompt = `あなたは優秀な要約者です。
与えられた文章を簡潔に要約してください。
- 重要なポイントを漏らさない
- ${target_length ? `約${target_length}文字以内で` : '元の文章の1/3程度に'}まとめる
- 読みやすい文章にする
を心がけてください。`
        break
      case 'style_formal':
        systemPrompt = `あなたは文体変換の専門家です。
与えられた文章を丁寧な敬語・ビジネス文体に変換してください。
- 「です・ます調」を使用
- ビジネスシーンで使える丁寧な表現
- 元の意味は変えない
を心がけてください。`
        break
      case 'style_casual':
        systemPrompt = `あなたは文体変換の専門家です。
与えられた文章をカジュアルな口語体に変換してください。
- 親しみやすい表現
- 「だ・である調」や話し言葉
- 元の意味は変えない
を心がけてください。`
        break
      case 'style_literary':
        systemPrompt = `あなたは文体変換の専門家です。
与えられた文章を文学的で美しい表現に変換してください。
- 比喩や修辞技法の活用
- 情感豊かな描写
- 読み手の心に響く表現
を心がけてください。`
        break
      case 'title_generate':
        systemPrompt = `あなたはタイトル作成の専門家です。
与えられた文章の内容に最適なタイトルを5つ提案してください。
それぞれのタイトルには簡単な説明を添えてください。
キャッチーで印象に残るタイトルを心がけてください。`
        break
    }
    
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: context ? `【既存の文章】\n${context}\n\n【指示】\n${prompt}` : prompt }
    ]
    
    const response = await fetch(GROK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${c.env.GROK_API_KEY}`
      },
      body: JSON.stringify({
        model: selectedModel,
        messages,
        temperature: 0.7,
        max_tokens: target_length ? Math.min(target_length * 2, 4096) : 2048
      })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error('Grok API error:', error)
      return c.json({ error: 'AI生成に失敗しました: ' + error }, 500)
    }
    
    const data = await response.json() as any
    const generatedText = data.choices[0].message.content
    
    // Save to history
    await c.env.DB.prepare(
      'INSERT INTO ai_history (user_id, project_id, prompt, response, model, generation_type, target_length) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(user.id, project_id || null, prompt, generatedText, selectedModel, generation_type || 'writing', target_length || null).run()
    
    return c.json({ 
      success: true, 
      text: generatedText,
      model: selectedModel,
      usage: data.usage
    })
  } catch (e: any) {
    console.error('Generation error:', e)
    return c.json({ error: e.message || 'AI生成に失敗しました' }, 500)
  }
})

// ==================== PROJECT ROUTES ====================

// Get all projects
app.get('/api/projects', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: '認証が必要です' }, 401)
  }
  
  const { type } = c.req.query()
  
  let query = 'SELECT * FROM projects WHERE user_id = ?'
  const params: any[] = [user.id]
  
  if (type) {
    query += ' AND project_type = ?'
    params.push(type)
  }
  
  query += ' ORDER BY updated_at DESC'
  
  const projects = await c.env.DB.prepare(query).bind(...params).all()
  
  return c.json({ projects: projects.results })
})

// Get single project
app.get('/api/projects/:id', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: '認証が必要です' }, 401)
  }
  
  const id = c.req.param('id')
  const project = await c.env.DB.prepare(
    'SELECT * FROM projects WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first()
  
  if (!project) {
    return c.json({ error: 'プロジェクトが見つかりません' }, 404)
  }
  
  return c.json({ project })
})

// Create project
app.post('/api/projects', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: '認証が必要です' }, 401)
  }
  
  const { title, genre, custom_genre, project_type, content } = await c.req.json()
  
  if (!title || !genre || !project_type) {
    return c.json({ error: 'タイトル、ジャンル、プロジェクトタイプは必須です' }, 400)
  }
  
  const wordCount = (content || '').length
  
  const result = await c.env.DB.prepare(
    'INSERT INTO projects (user_id, title, genre, custom_genre, project_type, content, word_count) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(user.id, title, genre, custom_genre || null, project_type, content || '', wordCount).run()
  
  return c.json({ 
    success: true, 
    project: { 
      id: result.meta.last_row_id, 
      title, 
      genre, 
      custom_genre,
      project_type, 
      content: content || '',
      word_count: wordCount
    } 
  })
})

// Update project
app.put('/api/projects/:id', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: '認証が必要です' }, 401)
  }
  
  const id = c.req.param('id')
  const { title, genre, custom_genre, content } = await c.req.json()
  
  const existing = await c.env.DB.prepare(
    'SELECT id FROM projects WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first()
  
  if (!existing) {
    return c.json({ error: 'プロジェクトが見つかりません' }, 404)
  }
  
  const wordCount = (content || '').length
  
  await c.env.DB.prepare(
    'UPDATE projects SET title = ?, genre = ?, custom_genre = ?, content = ?, word_count = ?, updated_at = datetime("now") WHERE id = ?'
  ).bind(title, genre, custom_genre || null, content || '', wordCount, id).run()
  
  return c.json({ success: true, word_count: wordCount })
})

// Delete project
app.delete('/api/projects/:id', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: '認証が必要です' }, 401)
  }
  
  const id = c.req.param('id')
  
  await c.env.DB.prepare(
    'DELETE FROM projects WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run()
  
  return c.json({ success: true })
})

// ==================== HISTORY ROUTES ====================

// Get AI generation history
app.get('/api/history', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: '認証が必要です' }, 401)
  }
  
  const { limit, offset, type } = c.req.query()
  
  let query = 'SELECT h.*, p.title as project_title FROM ai_history h LEFT JOIN projects p ON h.project_id = p.id WHERE h.user_id = ?'
  const params: any[] = [user.id]
  
  if (type) {
    query += ' AND h.generation_type = ?'
    params.push(type)
  }
  
  query += ' ORDER BY h.created_at DESC LIMIT ? OFFSET ?'
  params.push(parseInt(limit || '50'), parseInt(offset || '0'))
  
  const history = await c.env.DB.prepare(query).bind(...params).all()
  
  return c.json({ history: history.results })
})

// Delete history item
app.delete('/api/history/:id', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: '認証が必要です' }, 401)
  }
  
  const id = c.req.param('id')
  
  await c.env.DB.prepare(
    'DELETE FROM ai_history WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run()
  
  return c.json({ success: true })
})

// ==================== STATIC & FRONTEND ====================

// Main HTML page
const mainPage = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Writer Pro - AIライティングツール</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .editor-area { min-height: 400px; }
    .char-counter { font-variant-numeric: tabular-nums; }
    .tab-active { border-bottom: 2px solid #667eea; color: #667eea; }
    .fade-in { animation: fadeIn 0.3s ease-in; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .loading { animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .toast { animation: slideIn 0.3s ease-out; }
    @keyframes slideIn { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    
    /* Mobile optimizations */
    @media (max-width: 768px) {
      .editor-area { min-height: 300px; }
      .sidebar { position: fixed; left: -100%; transition: left 0.3s; z-index: 50; }
      .sidebar.open { left: 0; }
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #555; }
    
    /* Dark mode */
    .dark { background-color: #1a1a2e; color: #e0e0e0; }
    .dark .bg-white { background-color: #16213e !important; }
    .dark .bg-gray-50 { background-color: #1a1a2e !important; }
    .dark .bg-gray-100 { background-color: #0f3460 !important; }
    .dark .text-gray-600 { color: #a0a0a0 !important; }
    .dark .text-gray-700 { color: #b0b0b0 !important; }
    .dark .text-gray-800 { color: #e0e0e0 !important; }
    .dark .text-gray-900 { color: #f0f0f0 !important; }
    .dark .border-gray-200 { border-color: #2a2a4a !important; }
    .dark .border-gray-300 { border-color: #3a3a5a !important; }
    .dark textarea, .dark input, .dark select { background-color: #0f3460; color: #e0e0e0; border-color: #2a2a4a; }
  </style>
</head>
<body class="bg-gray-50 min-h-screen">
  <div id="app"></div>
  <script src="/static/app.js"></script>
</body>
</html>`

app.get('/', (c) => {
  return c.html(mainPage)
})

// 404 handler for undefined API routes
app.all('/api/*', (c) => {
  return c.json({ error: 'Not Found' }, 404)
})

// Global error handler
app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({ error: 'Internal Server Error' }, 500)
})

export default app
