import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

type Bindings = {
  DB: D1Database
  GROK_API_KEY: string
  KOMOJU_SECRET_KEY: string
}

type Variables = {
  user: { id: number; email: string; username: string; plan: string; total_chars_limit: number; total_chars_used: number; language: string } | null
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
        `SELECT s.*, u.id as user_id, u.email, u.username, 
         COALESCE(u.plan, 'free') as plan, 
         COALESCE(u.total_chars_limit, 30000) as total_chars_limit, 
         COALESCE(u.total_chars_used, 0) as total_chars_used,
         COALESCE(u.language, 'ja') as language
         FROM sessions s JOIN users u ON s.user_id = u.id 
         WHERE s.id = ? AND s.expires_at > datetime("now")`
      ).bind(sessionId).first()
      
      if (session) {
        c.set('user', { 
          id: session.user_id as number, 
          email: session.email as string, 
          username: session.username as string,
          plan: session.plan as string,
          total_chars_limit: session.total_chars_limit as number,
          total_chars_used: session.total_chars_used as number,
          language: session.language as string
        })
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

// Helper: Simple password hash
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'dante-writer-salt-2024')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/register', async (c) => {
  try {
    const { email, password, username, language } = await c.req.json()
    
    if (!email || !password || !username) {
      return c.json({ error: 'Required fields missing' }, 400)
    }
    
    if (password.length < 6) {
      return c.json({ error: 'Password must be at least 6 characters' }, 400)
    }
    
    const existing = await c.env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first()
    if (existing) {
      return c.json({ error: 'Email already registered' }, 400)
    }
    
    const passwordHash = await hashPassword(password)
    const userLang = language || 'ja'
    
    const result = await c.env.DB.prepare(
      'INSERT INTO users (email, password_hash, username, plan, total_chars_limit, total_chars_used, language) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(email, passwordHash, username, 'free', 30000, 0, userLang).run()
    
    const userId = result.meta.last_row_id
    
    // Create default preferences
    await c.env.DB.prepare(
      'INSERT INTO user_preferences (user_id, default_model) VALUES (?, ?)'
    ).bind(userId, 'grok-4-1-fast-non-reasoning').run()
    
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
    
    return c.json({ success: true, user: { id: userId, email, username, plan: 'free', total_chars_limit: 30000, total_chars_used: 0, language: userLang } })
  } catch (e: any) {
    return c.json({ error: e.message || 'Registration failed' }, 500)
  }
})

// Login
app.post('/api/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400)
    }
    
    const passwordHash = await hashPassword(password)
    
    const user = await c.env.DB.prepare(
      `SELECT id, email, username, COALESCE(plan, 'free') as plan, 
       COALESCE(total_chars_limit, 30000) as total_chars_limit, 
       COALESCE(total_chars_used, 0) as total_chars_used,
       COALESCE(language, 'ja') as language
       FROM users WHERE email = ? AND password_hash = ?`
    ).bind(email, passwordHash).first()
    
    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 401)
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
    
    return c.json({ success: true, user })
  } catch (e: any) {
    return c.json({ error: e.message || 'Login failed' }, 500)
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
    return c.json({ error: 'Authentication required' }, 401)
  }
  
  try {
    await c.env.DB.prepare('DELETE FROM users WHERE id = ?').bind(user.id).run()
    deleteCookie(c, 'session_id', { path: '/' })
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ error: e.message || 'Failed to delete account' }, 500)
  }
})

// Update preferences
app.put('/api/auth/preferences', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Authentication required' }, 401)
  }
  
  const { default_model, default_genre, theme, auto_save, language } = await c.req.json()
  
  await c.env.DB.prepare(
    'UPDATE user_preferences SET default_model = ?, default_genre = ?, theme = ?, auto_save = ?, updated_at = datetime("now") WHERE user_id = ?'
  ).bind(default_model, default_genre, theme, auto_save ? 1 : 0, user.id).run()
  
  if (language) {
    await c.env.DB.prepare('UPDATE users SET language = ? WHERE id = ?').bind(language, user.id).run()
  }
  
  return c.json({ success: true })
})

// Get usage stats
app.get('/api/auth/usage', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Authentication required' }, 401)
  }
  
  return c.json({
    plan: user.plan,
    total_chars_limit: user.total_chars_limit,
    total_chars_used: user.total_chars_used,
    remaining: user.total_chars_limit - user.total_chars_used
  })
})

// Apply invite code
app.post('/api/auth/invite-code', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Authentication required' }, 401)
  }
  
  const { code } = await c.req.json()
  
  // Valid invite codes
  const VALID_CODES: { [key: string]: { plan: string; chars: number } } = {
    'ARTES2WRITERS+': { plan: 'unlimited', chars: 999999999 }
  }
  
  const codeData = VALID_CODES[code]
  if (!codeData) {
    return c.json({ error: 'Invalid invite code' }, 400)
  }
  
  // Update user's plan
  await c.env.DB.prepare(
    'UPDATE users SET plan = ?, total_chars_limit = ? WHERE id = ?'
  ).bind(codeData.plan, codeData.chars, user.id).run()
  
  return c.json({ 
    success: true, 
    plan: codeData.plan,
    total_chars_limit: codeData.chars
  })
})

// ==================== PAYMENT ROUTES (KOMOJU) ====================

// Create payment session
app.post('/api/payment/create', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Authentication required' }, 401)
  }
  
  try {
    const { plan } = await c.req.json()
    
    let amount = 0
    let charsToAdd = 0
    
    if (plan === 'standard') {
      amount = 1000
      charsToAdd = 500000
    } else if (plan === 'premium') {
      amount = 10000
      charsToAdd = 6000000
    } else {
      return c.json({ error: 'Invalid plan' }, 400)
    }
    
    // Create KOMOJU session
    const response = await fetch('https://komoju.com/api/v1/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(c.env.KOMOJU_SECRET_KEY + ':')
      },
      body: JSON.stringify({
        amount,
        currency: 'JPY',
        default_locale: user.language || 'ja',
        return_url: 'https://project-fb113820.pages.dev/payment/complete',
        cancel_url: 'https://project-fb113820.pages.dev/payment/cancel',
        metadata: {
          user_id: user.id.toString(),
          plan,
          chars_to_add: charsToAdd.toString()
        },
        payment_types: ['credit_card', 'konbini', 'pay_pay', 'line_pay', 'merpay']
      })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error('KOMOJU error:', error)
      return c.json({ error: 'Payment creation failed' }, 500)
    }
    
    const data = await response.json() as any
    
    return c.json({ 
      success: true, 
      session_url: data.session_url,
      session_id: data.id
    })
  } catch (e: any) {
    console.error('Payment error:', e)
    return c.json({ error: e.message || 'Payment creation failed' }, 500)
  }
})

// KOMOJU webhook
app.post('/api/payment/webhook', async (c) => {
  try {
    const body = await c.req.json()
    
    if (body.type === 'payment.captured') {
      const payment = body.data
      const metadata = payment.metadata || {}
      const userId = parseInt(metadata.user_id)
      const plan = metadata.plan
      const charsToAdd = parseInt(metadata.chars_to_add)
      
      if (userId && charsToAdd) {
        // Update user's character limit
        await c.env.DB.prepare(
          'UPDATE users SET total_chars_limit = total_chars_limit + ?, plan = ? WHERE id = ?'
        ).bind(charsToAdd, plan, userId).run()
        
        // Record payment
        await c.env.DB.prepare(
          'INSERT INTO payments (user_id, amount, plan, chars_added, komoju_payment_id, status) VALUES (?, ?, ?, ?, ?, ?)'
        ).bind(userId, payment.amount, plan, charsToAdd, payment.id, 'completed').run()
      }
    }
    
    return c.json({ success: true })
  } catch (e: any) {
    console.error('Webhook error:', e)
    return c.json({ error: e.message }, 500)
  }
})

// ==================== GROK API ROUTES ====================

const GROK_API_URL = 'https://api.x.ai/v1/chat/completions'

// Available models
app.get('/api/grok/models', async (c) => {
  return c.json({
    models: [
      { id: 'grok-4-1-fast-non-reasoning', name: 'Grok 4.1 Fast', description: 'Fast, recommended model' },
      { id: 'grok-4-1-fast-reasoning', name: 'Grok 4.1 Fast Reasoning', description: 'Fast reasoning model' }
    ]
  })
})

// Generate content with Grok
app.post('/api/grok/generate', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Authentication required' }, 401)
  }
  
  // Check usage limit
  if (user.total_chars_used >= user.total_chars_limit) {
    return c.json({ 
      error: 'limit_exceeded',
      message: 'Character limit exceeded. Please upgrade your plan.',
      usage: {
        used: user.total_chars_used,
        limit: user.total_chars_limit
      }
    }, 403)
  }
  
  try {
    const { prompt, model, generation_type, target_length, project_id, context, target_language } = await c.req.json()
    
    if (!prompt) {
      return c.json({ error: 'Prompt is required' }, 400)
    }
    
    // Valid models list
    const validModels = ['grok-4-1-fast-non-reasoning', 'grok-4-1-fast-reasoning']
    const defaultModel = 'grok-4-1-fast-non-reasoning'
    const selectedModel = (model && validModels.includes(model)) ? model : defaultModel
    
    // Build system prompt based on generation type
    let systemPrompt = 'You are an excellent writer.'
    
    switch (generation_type) {
      case 'idea':
        systemPrompt = `You are a creative writer who generates innovative ideas.
Based on the specified genre or theme, propose multiple fresh and attractive ideas.
Add a brief explanation to each idea. Format as a bullet list for readability.`
        break
      case 'plot':
        systemPrompt = `You are a professional story planner.
Based on the specified theme or idea, create an attractive plot.
Include these elements:
- Introduction (setting, protagonist introduction)
- Development (problem occurrence, conflict)
- Climax (turning point)
- Resolution (resolution, afterglow)
Explain each part clearly.`
        break
      case 'writing':
      case 'continuation':
        systemPrompt = `You are an excellent writer.
${target_length ? `Write approximately ${target_length} characters.` : ''}
Write naturally readable and attractive content.
${context ? `The following is existing text. Continue it naturally.` : ''}`
        break
      case 'rewrite':
        systemPrompt = `You are an excellent editor.
Rewrite the given text with better expressions.
Focus on:
- Grammar correction
- Expression improvement
- Readability enhancement
Do not change the meaning.`
        break
      case 'expand':
        systemPrompt = `You are an excellent writer.
Expand the given text ${target_length ? `to approximately ${target_length} characters` : 'with more detail'}.
Focus on:
- Detailed descriptions
- Rich emotional expressions
- Concrete examples`
        break
      case 'proofread':
        systemPrompt = `You are an excellent proofreader.
Proofread the given text and return in this format:

【Corrected Text】
(Full corrected text)

【Corrections Made】
- Correction 1: "error" → "correct" (reason)
- Correction 2: ...

Find and fix typos, grammar mistakes, punctuation errors, and inconsistencies.
Do not change meaning or style.`
        break
      case 'summarize':
        systemPrompt = `You are an excellent summarizer.
Summarize the given text concisely.
Focus on:
- Not missing important points
- ${target_length ? `Keeping it within ${target_length} characters` : 'About 1/3 of original length'}
- Making it readable`
        break
      case 'translate':
        systemPrompt = `You are a professional translator.
Translate the given text to ${target_language || 'English'}.
- Preserve the original meaning and nuance
- Use natural expressions in the target language
- Maintain the original tone and style`
        break
      case 'style_formal':
        systemPrompt = `You are a style conversion expert.
Convert the given text to formal/polite style.
- Use polite expressions suitable for business
- Do not change the original meaning`
        break
      case 'style_casual':
        systemPrompt = `You are a style conversion expert.
Convert the given text to casual/friendly style.
- Use approachable expressions
- Do not change the original meaning`
        break
      case 'style_literary':
        systemPrompt = `You are a style conversion expert.
Convert the given text to literary/beautiful expressions.
- Use metaphors and rhetorical techniques
- Create emotionally rich descriptions`
        break
      case 'title_generate':
        systemPrompt = `You are a title creation expert.
Propose 5 optimal titles for the given content.
Add a brief explanation to each title.
Create catchy and memorable titles.`
        break
    }
    
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: context ? `【Existing Text】\n${context}\n\n【Instruction】\n${prompt}` : prompt }
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
      return c.json({ error: 'AI generation failed: ' + error }, 500)
    }
    
    const data = await response.json() as any
    const generatedText = data.choices[0].message.content
    const charsGenerated = generatedText.length
    
    // Update user's usage
    await c.env.DB.prepare(
      'UPDATE users SET total_chars_used = total_chars_used + ? WHERE id = ?'
    ).bind(charsGenerated, user.id).run()
    
    // Save to history
    await c.env.DB.prepare(
      'INSERT INTO ai_history (user_id, project_id, prompt, response, model, generation_type, target_length, chars_generated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(user.id, project_id || null, prompt, generatedText, selectedModel, generation_type || 'writing', target_length || null, charsGenerated).run()
    
    return c.json({ 
      success: true, 
      text: generatedText,
      model: selectedModel,
      usage: data.usage,
      chars_generated: charsGenerated,
      user_usage: {
        used: user.total_chars_used + charsGenerated,
        limit: user.total_chars_limit
      }
    })
  } catch (e: any) {
    console.error('Generation error:', e)
    return c.json({ error: e.message || 'AI generation failed' }, 500)
  }
})

// ==================== PROJECT ROUTES ====================

// Get all projects
app.get('/api/projects', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Authentication required' }, 401)
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
    return c.json({ error: 'Authentication required' }, 401)
  }
  
  const id = c.req.param('id')
  const project = await c.env.DB.prepare(
    'SELECT * FROM projects WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first()
  
  if (!project) {
    return c.json({ error: 'Project not found' }, 404)
  }
  
  return c.json({ project })
})

// Create project
app.post('/api/projects', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Authentication required' }, 401)
  }
  
  const { title, genre, custom_genre, project_type, content } = await c.req.json()
  
  if (!title || !genre || !project_type) {
    return c.json({ error: 'Title, genre, and project type are required' }, 400)
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
    return c.json({ error: 'Authentication required' }, 401)
  }
  
  const id = c.req.param('id')
  const { title, genre, custom_genre, content } = await c.req.json()
  
  const existing = await c.env.DB.prepare(
    'SELECT id FROM projects WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first()
  
  if (!existing) {
    return c.json({ error: 'Project not found' }, 404)
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
    return c.json({ error: 'Authentication required' }, 401)
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
    return c.json({ error: 'Authentication required' }, 401)
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
    return c.json({ error: 'Authentication required' }, 401)
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
  <title>DANTE - AI統合ライティングエディター</title>
  <link rel="icon" type="image/png" href="/static/logo.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    .gradient-bg { background: linear-gradient(135deg, #8B4513 0%, #D4AF37 50%, #8B4513 100%); }
    .dante-gold { color: #D4AF37; }
    .dante-brown { color: #8B4513; }
    .dante-bg { background-color: #1a1a2e; }
    .editor-area { min-height: 400px; }
    .char-counter { font-variant-numeric: tabular-nums; }
    .tab-active { border-bottom: 2px solid #D4AF37; color: #D4AF37; }
    .fade-in { animation: fadeIn 0.3s ease-in; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .loading { animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .toast { animation: slideIn 0.3s ease-out; }
    @keyframes slideIn { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    
    @media (max-width: 768px) {
      .editor-area { min-height: 300px; }
      .sidebar { position: fixed; left: -100%; transition: left 0.3s; z-index: 50; }
      .sidebar.open { left: 0; }
    }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #8B4513; }
    
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

// Terms of Service page
const termsPage = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>利用規約 - DANTE</title>
  <link rel="icon" type="image/png" href="/static/logo.png">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
    <div class="text-center mb-8">
      <img src="/static/logo.png" alt="DANTE" class="w-20 h-20 mx-auto mb-4">
      <h1 class="text-3xl font-bold text-gray-800">利用規約</h1>
      <p class="text-gray-600">Terms of Service</p>
    </div>
    
    <div class="prose max-w-none">
      <h2 class="text-xl font-bold mt-6 mb-3">第1条（適用）</h2>
      <p>本規約は、合同会社RATIO Lab.（以下「当社」）が提供するAI統合ライティングエディター「DANTE」（以下「本サービス」）の利用に関する条件を定めるものです。</p>
      
      <h2 class="text-xl font-bold mt-6 mb-3">第2条（利用登録）</h2>
      <p>利用者は、本規約に同意の上、当社所定の方法により利用登録を行うものとします。</p>
      
      <h2 class="text-xl font-bold mt-6 mb-3">第3条（料金）</h2>
      <ul class="list-disc pl-6">
        <li>無料プラン：30,000文字まで（一度限り）</li>
        <li>スタンダードプラン：1,000円で500,000文字</li>
        <li>プレミアムプラン：10,000円で6,000,000文字</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-3">第4条（禁止事項）</h2>
      <p>利用者は、以下の行為を行ってはなりません：</p>
      <ul class="list-disc pl-6">
        <li>法令または公序良俗に違反する行為</li>
        <li>当社または第三者の権利を侵害する行為</li>
        <li>本サービスの運営を妨害する行為</li>
        <li>不正アクセスまたはその試み</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-3">第5条（免責事項）</h2>
      <p>当社は、本サービスにより生成されたコンテンツの正確性、完全性、有用性について保証しません。</p>
      
      <h2 class="text-xl font-bold mt-6 mb-3">第6条（準拠法・管轄）</h2>
      <p>本規約の解釈および適用は日本法に準拠し、本サービスに関する紛争については、水戸地方裁判所土浦支部を第一審の専属的合意管轄裁判所とします。</p>
      
      <div class="mt-8 pt-4 border-t">
        <p class="text-sm text-gray-600">
          運営：合同会社RATIO Lab. / RATIO Lab., LLC<br>
          制定日：2026年1月17日
        </p>
      </div>
    </div>
    
    <div class="mt-8 text-center">
      <a href="/" class="text-blue-600 hover:underline">← DANTEに戻る</a>
    </div>
  </div>
</body>
</html>`

// Privacy Policy page
const privacyPage = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>プライバシーポリシー - DANTE</title>
  <link rel="icon" type="image/png" href="/static/logo.png">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
    <div class="text-center mb-8">
      <img src="/static/logo.png" alt="DANTE" class="w-20 h-20 mx-auto mb-4">
      <h1 class="text-3xl font-bold text-gray-800">プライバシーポリシー</h1>
      <p class="text-gray-600">Privacy Policy</p>
    </div>
    
    <div class="prose max-w-none">
      <h2 class="text-xl font-bold mt-6 mb-3">1. 収集する情報</h2>
      <p>当社は、以下の情報を収集します：</p>
      <ul class="list-disc pl-6">
        <li>メールアドレス、ユーザー名（アカウント登録時）</li>
        <li>作成されたコンテンツ（プロジェクト、文章）</li>
        <li>利用履歴（AI生成履歴、使用文字数）</li>
        <li>決済情報（決済代行サービス経由）</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-3">2. 情報の利用目的</h2>
      <ul class="list-disc pl-6">
        <li>本サービスの提供・運営</li>
        <li>ユーザーサポート</li>
        <li>サービス改善</li>
        <li>料金請求・決済処理</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-3">3. 情報の第三者提供</h2>
      <p>当社は、法令に基づく場合を除き、利用者の同意なく個人情報を第三者に提供しません。</p>
      
      <h2 class="text-xl font-bold mt-6 mb-3">4. セキュリティ</h2>
      <p>当社は、個人情報の漏洩、滅失、毀損を防止するため、適切なセキュリティ対策を講じます。</p>
      
      <h2 class="text-xl font-bold mt-6 mb-3">5. Cookieの使用</h2>
      <p>本サービスは、セッション管理のためにCookieを使用します。</p>
      
      <h2 class="text-xl font-bold mt-6 mb-3">6. お問い合わせ</h2>
      <p>個人情報に関するお問い合わせは、当社までご連絡ください。</p>
      
      <div class="mt-8 pt-4 border-t">
        <p class="text-sm text-gray-600">
          運営：合同会社RATIO Lab. / RATIO Lab., LLC<br>
          制定日：2026年1月17日
        </p>
      </div>
    </div>
    
    <div class="mt-8 text-center">
      <a href="/" class="text-blue-600 hover:underline">← DANTEに戻る</a>
    </div>
  </div>
</body>
</html>`

// Help/Guide page
const helpPage = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>使い方ガイド - DANTE</title>
  <link rel="icon" type="image/png" href="/static/logo.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <img src="/static/logo.png" alt="DANTE" class="w-24 h-24 mx-auto mb-4">
      <h1 class="text-3xl font-bold text-gray-800">DANTE 使い方ガイド</h1>
      <p class="text-gray-600">AI統合ライティングエディター</p>
    </div>
    
    <div class="space-y-6">
      <!-- Getting Started -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
          <i class="fas fa-rocket text-yellow-600"></i>
          はじめに
        </h2>
        <p class="text-gray-700">DANTEは、AIと一緒に文章を書くための統合エディターです。小説、ブログ、ビジネス文書など、あらゆる執筆をサポートします。</p>
      </div>
      
      <!-- Features -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
          <i class="fas fa-magic text-purple-600"></i>
          主な機能
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 rounded-lg">
            <h3 class="font-bold text-gray-800"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>ネタ考案</h3>
            <p class="text-sm text-gray-600">テーマやキーワードから斬新なアイデアを生成</p>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <h3 class="font-bold text-gray-800"><i class="fas fa-sitemap text-blue-500 mr-2"></i>プロット作成</h3>
            <p class="text-sm text-gray-600">物語の構成を自動で提案</p>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <h3 class="font-bold text-gray-800"><i class="fas fa-pen text-green-500 mr-2"></i>ライティング</h3>
            <p class="text-sm text-gray-600">続きを書く、書き直す、拡張するなど</p>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <h3 class="font-bold text-gray-800"><i class="fas fa-language text-red-500 mr-2"></i>翻訳</h3>
            <p class="text-sm text-gray-600">多言語への翻訳機能</p>
          </div>
        </div>
      </div>
      
      <!-- Plans -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
          <i class="fas fa-crown text-yellow-600"></i>
          料金プラン
        </h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="p-4 border rounded-lg">
            <h3 class="font-bold text-gray-800">無料プラン</h3>
            <p class="text-2xl font-bold text-gray-900">¥0</p>
            <p class="text-sm text-gray-600">30,000文字まで（一度限り）</p>
          </div>
          <div class="p-4 border-2 border-yellow-500 rounded-lg bg-yellow-50">
            <h3 class="font-bold text-gray-800">スタンダード</h3>
            <p class="text-2xl font-bold text-gray-900">¥1,000</p>
            <p class="text-sm text-gray-600">500,000文字（書籍約5冊分）</p>
          </div>
          <div class="p-4 border-2 border-purple-500 rounded-lg bg-purple-50">
            <h3 class="font-bold text-gray-800">プレミアム</h3>
            <p class="text-2xl font-bold text-gray-900">¥10,000</p>
            <p class="text-sm text-gray-600">6,000,000文字（書籍約60冊分）</p>
          </div>
        </div>
      </div>
      
      <!-- Legal -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
          <i class="fas fa-balance-scale text-gray-600"></i>
          法的情報
        </h2>
        <div class="flex gap-4">
          <a href="/terms" class="text-blue-600 hover:underline">利用規約</a>
          <a href="/privacy" class="text-blue-600 hover:underline">プライバシーポリシー</a>
        </div>
        <p class="text-sm text-gray-600 mt-4">運営：合同会社RATIO Lab. / RATIO Lab., LLC</p>
      </div>
    </div>
    
    <div class="mt-8 text-center">
      <a href="/" class="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
        <i class="fas fa-pen mr-2"></i>DANTEを使い始める
      </a>
    </div>
  </div>
</body>
</html>`

app.get('/', (c) => {
  return c.html(mainPage)
})

app.get('/terms', (c) => {
  return c.html(termsPage)
})

app.get('/privacy', (c) => {
  return c.html(privacyPage)
})

app.get('/help', (c) => {
  return c.html(helpPage)
})

app.get('/guide', (c) => {
  return c.html(helpPage)
})

// Payment complete/cancel pages
app.get('/payment/complete', (c) => {
  return c.html(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>決済完了</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center">
<div class="bg-white p-8 rounded-lg shadow-lg text-center">
<i class="fas fa-check-circle text-green-500 text-6xl mb-4"></i>
<h1 class="text-2xl font-bold mb-4">決済が完了しました</h1>
<p class="text-gray-600 mb-6">ご購入ありがとうございます。文字数が追加されました。</p>
<a href="/" class="px-6 py-3 bg-yellow-600 text-white rounded-lg">エディターに戻る</a>
</div>
</body></html>`)
})

app.get('/payment/cancel', (c) => {
  return c.html(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>決済キャンセル</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center">
<div class="bg-white p-8 rounded-lg shadow-lg text-center">
<i class="fas fa-times-circle text-red-500 text-6xl mb-4"></i>
<h1 class="text-2xl font-bold mb-4">決済がキャンセルされました</h1>
<p class="text-gray-600 mb-6">決済処理がキャンセルされました。</p>
<a href="/" class="px-6 py-3 bg-gray-600 text-white rounded-lg">エディターに戻る</a>
</div>
</body></html>`)
})

// Serve logo as favicon
app.get('/favicon.ico', async (c) => {
  return c.redirect('/static/logo.png')
})

// 404 handler for undefined API routes
app.all('/api/*', (c) => {
  return c.json({ error: 'Not Found' }, 404)
})

// 404 handler for other undefined routes
app.all('*', (c) => {
  return c.text('Not Found', 404)
})

// Global error handler
app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({ error: 'Internal Server Error' }, 500)
})

export default app
