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
         COALESCE(u.total_chars_limit, 3000) as total_chars_limit, 
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
    ).bind(email, passwordHash, username, 'free', 3000, 0, userLang).run()
    
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
    
    return c.json({ success: true, user: { id: userId, email, username, plan: 'free', total_chars_limit: 3000, total_chars_used: 0, language: userLang } })
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
       COALESCE(total_chars_limit, 3000) as total_chars_limit, 
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
    let currency = 'JPY'
    
    // Check if user language is Japanese
    const isJapanese = user.language === 'ja'
    
    if (plan === 'standard') {
      amount = isJapanese ? 1000 : 10  // ¥1,000 or $10
      currency = isJapanese ? 'JPY' : 'USD'
      charsToAdd = 500000
    } else if (plan === 'premium') {
      amount = isJapanese ? 10000 : 100  // ¥10,000 or $100
      currency = isJapanese ? 'JPY' : 'USD'
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
        currency,
        default_locale: user.language || 'ja',
        return_url: 'https://project-fb113820.pages.dev/payment/complete',
        cancel_url: 'https://project-fb113820.pages.dev/payment/cancel',
        metadata: {
          user_id: user.id.toString(),
          plan,
          chars_to_add: charsToAdd.toString()
        },
        payment_types: ['credit_card', 'konbini', 'paypay', 'linepay', 'merpay']
      })
    })
    
    if (!response.ok) {
      console.error('KOMOJU error:', response.status)
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

// Verify payment and apply characters
app.get('/api/payment/verify', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Authentication required' }, 401)
  }
  
  const sessionId = c.req.query('session_id')
  if (!sessionId) {
    return c.json({ error: 'Session ID required' }, 400)
  }
  
  try {
    // Check if this session was already processed
    const existingPayment = await c.env.DB.prepare(
      'SELECT id FROM payments WHERE komoju_payment_id = ?'
    ).bind(sessionId).first()
    
    if (existingPayment) {
      return c.json({ success: true, message: 'Payment already processed' })
    }
    
    // Get session from KOMOJU
    const response = await fetch(`https://komoju.com/api/v1/sessions/${sessionId}`, {
      headers: {
        'Authorization': 'Basic ' + btoa(c.env.KOMOJU_SECRET_KEY + ':')
      }
    })
    
    if (!response.ok) {
      return c.json({ error: 'Session not found' }, 404)
    }
    
    const session = await response.json() as any
    
    // Check if payment is completed
    if (session.status !== 'completed') {
      return c.json({ 
        success: false, 
        status: session.status,
        message: 'Payment not completed'
      })
    }
    
    // Verify user matches
    const metadata = session.metadata || {}
    if (metadata.user_id !== user.id.toString()) {
      return c.json({ error: 'User mismatch' }, 403)
    }
    
    const plan = metadata.plan
    const charsToAdd = parseInt(metadata.chars_to_add)
    
    if (charsToAdd) {
      // Update user's character limit
      await c.env.DB.prepare(
        'UPDATE users SET total_chars_limit = total_chars_limit + ?, plan = ? WHERE id = ?'
      ).bind(charsToAdd, plan, user.id).run()
      
      // Record payment
      await c.env.DB.prepare(
        'INSERT INTO payments (user_id, amount, currency, plan, chars_added, komoju_payment_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).bind(user.id, session.amount, session.currency, plan, charsToAdd, sessionId, 'completed').run()
    }
    
    return c.json({ 
      success: true, 
      chars_added: charsToAdd,
      plan: plan
    })
  } catch (e: any) {
    console.error('Payment verify error:', e)
    return c.json({ error: e.message }, 500)
  }
})

// KOMOJU webhook (backup method)
app.post('/api/payment/webhook', async (c) => {
  try {
    const body = await c.req.json()
    
    if (body.type === 'payment.captured') {
      const payment = body.data
      const metadata = payment.metadata || {}
      const userId = parseInt(metadata.user_id)
      const plan = metadata.plan
      const charsToAdd = parseInt(metadata.chars_to_add)
      
      // Check if already processed
      const existingPayment = await c.env.DB.prepare(
        'SELECT id FROM payments WHERE komoju_payment_id = ?'
      ).bind(payment.id).first()
      
      if (existingPayment) {
        return c.json({ success: true, message: 'Already processed' })
      }
      
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
    const { prompt, model, generation_type, target_length, project_id, context, target_language, genre, idea_count, detail_level, conditions } = await c.req.json()
    
    // Build effective prompt based on available information
    let effectivePrompt = prompt || ''
    
    // For idea generation, allow empty prompt if genre is provided
    if (generation_type === 'idea') {
      if (!effectivePrompt && !genre) {
        return c.json({ error: 'Please provide a theme/keyword or select a genre' }, 400)
      }
      // Build prompt from available info
      const parts = []
      if (genre) parts.push(`Genre: ${genre}`)
      if (effectivePrompt) parts.push(`Theme/Keywords: ${effectivePrompt}`)
      if (conditions) parts.push(`Conditions: ${conditions}`)
      parts.push(`Please generate ${idea_count || 5} creative ideas.`)
      effectivePrompt = parts.join('\n')
    }
    // For plot generation, allow empty prompt if genre is provided
    else if (generation_type === 'plot') {
      if (!effectivePrompt && !genre) {
        return c.json({ error: 'Please provide an idea/theme or select a genre' }, 400)
      }
      const parts = []
      if (genre) parts.push(`Genre: ${genre}`)
      if (effectivePrompt) parts.push(`Idea/Theme: ${effectivePrompt}`)
      if (detail_level) parts.push(`Detail level: ${detail_level}`)
      effectivePrompt = parts.join('\n')
    }
    // For other types, prompt is required
    else if (!effectivePrompt && generation_type !== 'writing') {
      return c.json({ error: 'Prompt is required' }, 400)
    }
    
    // For writing mode with no prompt, use genre to generate initial content
    if (generation_type === 'writing' && !effectivePrompt) {
      if (genre) {
        effectivePrompt = `Write an engaging opening for a ${genre} piece.`
      } else {
        return c.json({ error: 'Please provide a prompt or select a genre' }, 400)
      }
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
      { role: 'user', content: context ? `【Existing Text】\n${context}\n\n【Instruction】\n${effectivePrompt}` : effectivePrompt }
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
    
    // Save to history (use effectivePrompt to capture full context including genre)
    await c.env.DB.prepare(
      'INSERT INTO ai_history (user_id, project_id, prompt, response, model, generation_type, target_length, chars_generated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(user.id, project_id || null, effectivePrompt, generatedText, selectedModel, generation_type || 'writing', target_length || null, charsGenerated).run()
    
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

// Multilingual page content
const pageContent: { [key: string]: { [key: string]: any } } = {
  terms: {
    ja: {
      title: '利用規約',
      subtitle: 'Terms of Service',
      sections: [
        { title: '第1条（適用）', content: '本規約は、合同会社RATIO Lab.（以下「当社」）が提供するAI統合ライティングエディター「DANTE」（以下「本サービス」）の利用に関する条件を定めるものです。' },
        { title: '第2条（利用登録）', content: '利用者は、本規約に同意の上、当社所定の方法により利用登録を行うものとします。' },
        { title: '第3条（料金）', list: ['無料プラン：3,000文字まで（一度限り）', 'スタンダードプラン：1,000円で500,000文字', 'プレミアムプラン：10,000円で6,000,000文字'] },
        { title: '第4条（禁止事項）', content: '利用者は、以下の行為を行ってはなりません：', list: ['法令または公序良俗に違反する行為', '当社または第三者の権利を侵害する行為', '本サービスの運営を妨害する行為', '不正アクセスまたはその試み'] },
        { title: '第5条（免責事項）', content: '当社は、本サービスにより生成されたコンテンツの正確性、完全性、有用性について保証しません。' },
        { title: '第6条（準拠法・管轄）', content: '本規約の解釈および適用は日本法に準拠し、本サービスに関する紛争については、水戸地方裁判所土浦支部を第一審の専属的合意管轄裁判所とします。' }
      ],
      back: '← DANTEに戻る'
    },
    en: {
      title: 'Terms of Service',
      subtitle: '利用規約',
      sections: [
        { title: 'Article 1 (Application)', content: 'These Terms govern the use of the AI Integrated Writing Editor "DANTE" (the "Service") provided by RATIO Lab., LLC (the "Company").' },
        { title: 'Article 2 (Registration)', content: 'Users shall register by agreeing to these Terms and following the Company\'s prescribed methods.' },
        { title: 'Article 3 (Pricing)', list: ['Free Plan: Up to 3,000 characters (one-time)', 'Standard Plan: $10 for 500,000 characters', 'Premium Plan: $100 for 6,000,000 characters'] },
        { title: 'Article 4 (Prohibited Activities)', content: 'Users shall not engage in:', list: ['Activities violating laws or public order', 'Activities infringing rights of the Company or third parties', 'Activities interfering with Service operations', 'Unauthorized access or attempts thereof'] },
        { title: 'Article 5 (Disclaimer)', content: 'The Company does not guarantee the accuracy, completeness, or usefulness of content generated by this Service.' },
        { title: 'Article 6 (Governing Law & Jurisdiction)', content: 'These Terms shall be governed by Japanese law, and disputes shall be submitted to the exclusive jurisdiction of the Tsuchiura Branch of Mito District Court.' }
      ],
      back: '← Back to DANTE'
    },
    zh: {
      title: '服务条款',
      subtitle: 'Terms of Service',
      sections: [
        { title: '第1条（适用范围）', content: '本条款规定了使用RATIO Lab.合同会社（以下简称"本公司"）提供的AI综合写作编辑器"DANTE"（以下简称"本服务"）的条件。' },
        { title: '第2条（用户注册）', content: '用户需同意本条款，并按照本公司规定的方式进行注册。' },
        { title: '第3条（费用）', list: ['免费方案：最多3,000字符（仅限一次）', '标准方案：$10可获得500,000字符', '高级方案：$100可获得6,000,000字符'] },
        { title: '第4条（禁止事项）', content: '用户不得从事以下行为：', list: ['违反法律或公序良俗的行为', '侵犯本公司或第三方权利的行为', '妨碍本服务运营的行为', '非法访问或尝试非法访问'] },
        { title: '第5条（免责声明）', content: '本公司不保证本服务生成内容的准确性、完整性或有用性。' },
        { title: '第6条（准据法与管辖）', content: '本条款的解释和适用以日本法律为准，与本服务相关的争议由水户地方裁判所土浦支部作为第一审专属管辖法院。' }
      ],
      back: '← 返回DANTE'
    },
    ko: {
      title: '이용약관',
      subtitle: 'Terms of Service',
      sections: [
        { title: '제1조 (적용)', content: '본 약관은 합동회사 RATIO Lab.(이하 "회사")이 제공하는 AI 통합 글쓰기 에디터 "DANTE"(이하 "서비스")의 이용 조건을 규정합니다.' },
        { title: '제2조 (이용 등록)', content: '이용자는 본 약관에 동의하고 회사가 정한 방법에 따라 이용 등록을 해야 합니다.' },
        { title: '제3조 (요금)', list: ['무료 플랜: 3,000자까지 (1회 한정)', '스탠다드 플랜: $10으로 500,000자', '프리미엄 플랜: $100으로 6,000,000자'] },
        { title: '제4조 (금지 사항)', content: '이용자는 다음 행위를 해서는 안 됩니다:', list: ['법률 또는 공서양속에 위반하는 행위', '회사 또는 제3자의 권리를 침해하는 행위', '서비스 운영을 방해하는 행위', '무단 접근 또는 그 시도'] },
        { title: '제5조 (면책 조항)', content: '회사는 본 서비스로 생성된 콘텐츠의 정확성, 완전성, 유용성을 보증하지 않습니다.' },
        { title: '제6조 (준거법 및 관할)', content: '본 약관의 해석 및 적용은 일본법에 따르며, 본 서비스에 관한 분쟁은 미토 지방재판소 쓰치우라 지부를 제1심 전속적 합의 관할 법원으로 합니다.' }
      ],
      back: '← DANTE로 돌아가기'
    },
    it: {
      title: 'Termini di Servizio',
      subtitle: 'Terms of Service',
      sections: [
        { title: 'Articolo 1 (Applicazione)', content: 'I presenti Termini regolano l\'utilizzo dell\'Editor di Scrittura Integrato con IA "DANTE" (il "Servizio") fornito da RATIO Lab., LLC (la "Società").' },
        { title: 'Articolo 2 (Registrazione)', content: 'Gli utenti devono registrarsi accettando i presenti Termini e seguendo i metodi prescritti dalla Società.' },
        { title: 'Articolo 3 (Prezzi)', list: ['Piano Gratuito: fino a 3.000 caratteri (una tantum)', 'Piano Standard: $10 per 500.000 caratteri', 'Piano Premium: $100 per 6.000.000 caratteri'] },
        { title: 'Articolo 4 (Attività Vietate)', content: 'Gli utenti non devono:', list: ['Violare leggi o l\'ordine pubblico', 'Violare i diritti della Società o di terzi', 'Interferire con le operazioni del Servizio', 'Accesso non autorizzato o tentativi'] },
        { title: 'Articolo 5 (Esclusione di Responsabilità)', content: 'La Società non garantisce l\'accuratezza, completezza o utilità dei contenuti generati dal Servizio.' },
        { title: 'Articolo 6 (Legge Applicabile)', content: 'I presenti Termini sono regolati dalla legge giapponese e le controversie saranno sottoposte alla giurisdizione esclusiva della Filiale di Tsuchiura del Tribunale Distrettuale di Mito.' }
      ],
      back: '← Torna a DANTE'
    },
    hi: {
      title: 'सेवा की शर्तें',
      subtitle: 'Terms of Service',
      sections: [
        { title: 'अनुच्छेद 1 (लागू)', content: 'ये शर्तें RATIO Lab., LLC ("कंपनी") द्वारा प्रदान किए गए AI एकीकृत लेखन संपादक "DANTE" ("सेवा") के उपयोग को नियंत्रित करती हैं।' },
        { title: 'अनुच्छेद 2 (पंजीकरण)', content: 'उपयोगकर्ताओं को इन शर्तों से सहमत होकर और कंपनी के निर्धारित तरीकों का पालन करके पंजीकरण करना होगा।' },
        { title: 'अनुच्छेद 3 (मूल्य निर्धारण)', list: ['निःशुल्क योजना: 3,000 अक्षरों तक (एक बार)', 'स्टैंडर्ड योजना: $10 में 500,000 अक्षर', 'प्रीमियम योजना: $100 में 6,000,000 अक्षर'] },
        { title: 'अनुच्छेद 4 (निषिद्ध गतिविधियाँ)', content: 'उपयोगकर्ता निम्नलिखित नहीं करेंगे:', list: ['कानूनों या सार्वजनिक व्यवस्था का उल्लंघन', 'कंपनी या तीसरे पक्षों के अधिकारों का उल्लंघन', 'सेवा संचालन में हस्तक्षेप', 'अनधिकृत पहुंच या प्रयास'] },
        { title: 'अनुच्छेद 5 (अस्वीकरण)', content: 'कंपनी इस सेवा द्वारा उत्पन्न सामग्री की सटीकता, पूर्णता या उपयोगिता की गारंटी नहीं देती है।' },
        { title: 'अनुच्छेद 6 (शासी कानून)', content: 'ये शर्तें जापानी कानून द्वारा शासित होंगी, और विवादों को मिटो जिला न्यायालय की त्सुचिउरा शाखा के विशेष अधिकार क्षेत्र में प्रस्तुत किया जाएगा।' }
      ],
      back: '← DANTE पर वापस जाएं'
    },
    es: {
      title: 'Términos de Servicio',
      subtitle: 'Terms of Service',
      sections: [
        { title: 'Artículo 1 (Aplicación)', content: 'Estos Términos rigen el uso del Editor de Escritura Integrado con IA "DANTE" (el "Servicio") proporcionado por RATIO Lab., LLC (la "Empresa").' },
        { title: 'Artículo 2 (Registro)', content: 'Los usuarios deben registrarse aceptando estos Términos y siguiendo los métodos prescritos por la Empresa.' },
        { title: 'Artículo 3 (Precios)', list: ['Plan Gratuito: Hasta 3,000 caracteres (una vez)', 'Plan Estándar: $10 por 500,000 caracteres', 'Plan Premium: $100 por 6,000,000 caracteres'] },
        { title: 'Artículo 4 (Actividades Prohibidas)', content: 'Los usuarios no deben:', list: ['Violar leyes u orden público', 'Violar derechos de la Empresa o terceros', 'Interferir con operaciones del Servicio', 'Acceso no autorizado o intentos'] },
        { title: 'Artículo 5 (Exención de Responsabilidad)', content: 'La Empresa no garantiza la precisión, integridad o utilidad del contenido generado por este Servicio.' },
        { title: 'Artículo 6 (Ley Aplicable)', content: 'Estos Términos se regirán por la ley japonesa, y las disputas se someterán a la jurisdicción exclusiva de la Sucursal Tsuchiura del Tribunal de Distrito de Mito.' }
      ],
      back: '← Volver a DANTE'
    },
    fr: {
      title: 'Conditions d\'Utilisation',
      subtitle: 'Terms of Service',
      sections: [
        { title: 'Article 1 (Application)', content: 'Ces Conditions régissent l\'utilisation de l\'Éditeur d\'Écriture Intégré IA "DANTE" (le "Service") fourni par RATIO Lab., LLC (la "Société").' },
        { title: 'Article 2 (Inscription)', content: 'Les utilisateurs doivent s\'inscrire en acceptant ces Conditions et en suivant les méthodes prescrites par la Société.' },
        { title: 'Article 3 (Tarification)', list: ['Plan Gratuit: Jusqu\'à 3 000 caractères (une fois)', 'Plan Standard: 10$ pour 500 000 caractères', 'Plan Premium: 100$ pour 6 000 000 caractères'] },
        { title: 'Article 4 (Activités Interdites)', content: 'Les utilisateurs ne doivent pas:', list: ['Violer les lois ou l\'ordre public', 'Violer les droits de la Société ou de tiers', 'Interférer avec les opérations du Service', 'Accès non autorisé ou tentatives'] },
        { title: 'Article 5 (Clause de Non-Responsabilité)', content: 'La Société ne garantit pas l\'exactitude, l\'exhaustivité ou l\'utilité du contenu généré par ce Service.' },
        { title: 'Article 6 (Loi Applicable)', content: 'Ces Conditions seront régies par le droit japonais, et les litiges seront soumis à la juridiction exclusive de la Branche Tsuchiura du Tribunal de District de Mito.' }
      ],
      back: '← Retour à DANTE'
    },
    de: {
      title: 'Nutzungsbedingungen',
      subtitle: 'Terms of Service',
      sections: [
        { title: 'Artikel 1 (Anwendung)', content: 'Diese Bedingungen regeln die Nutzung des KI-integrierten Schreibeditors "DANTE" (der "Dienst"), bereitgestellt von RATIO Lab., LLC (das "Unternehmen").' },
        { title: 'Artikel 2 (Registrierung)', content: 'Benutzer müssen sich registrieren, indem sie diesen Bedingungen zustimmen und den vom Unternehmen vorgeschriebenen Methoden folgen.' },
        { title: 'Artikel 3 (Preise)', list: ['Kostenloser Plan: Bis zu 3.000 Zeichen (einmalig)', 'Standard-Plan: 10$ für 500.000 Zeichen', 'Premium-Plan: 100$ für 6.000.000 Zeichen'] },
        { title: 'Artikel 4 (Verbotene Aktivitäten)', content: 'Benutzer dürfen nicht:', list: ['Gesetze oder öffentliche Ordnung verletzen', 'Rechte des Unternehmens oder Dritter verletzen', 'Den Dienstbetrieb stören', 'Unbefugter Zugriff oder Versuche'] },
        { title: 'Artikel 5 (Haftungsausschluss)', content: 'Das Unternehmen garantiert nicht die Genauigkeit, Vollständigkeit oder Nützlichkeit der von diesem Dienst generierten Inhalte.' },
        { title: 'Artikel 6 (Anwendbares Recht)', content: 'Diese Bedingungen unterliegen japanischem Recht, und Streitigkeiten werden der ausschließlichen Zuständigkeit der Tsuchiura-Zweigstelle des Bezirksgerichts Mito unterworfen.' }
      ],
      back: '← Zurück zu DANTE'
    },
    pt: {
      title: 'Termos de Serviço',
      subtitle: 'Terms of Service',
      sections: [
        { title: 'Artigo 1 (Aplicação)', content: 'Estes Termos regem o uso do Editor de Escrita Integrado com IA "DANTE" (o "Serviço") fornecido pela RATIO Lab., LLC (a "Empresa").' },
        { title: 'Artigo 2 (Registro)', content: 'Os usuários devem se registrar concordando com estes Termos e seguindo os métodos prescritos pela Empresa.' },
        { title: 'Artigo 3 (Preços)', list: ['Plano Gratuito: Até 3.000 caracteres (uma vez)', 'Plano Padrão: $10 por 500.000 caracteres', 'Plano Premium: $100 por 6.000.000 caracteres'] },
        { title: 'Artigo 4 (Atividades Proibidas)', content: 'Os usuários não devem:', list: ['Violar leis ou ordem pública', 'Violar direitos da Empresa ou terceiros', 'Interferir nas operações do Serviço', 'Acesso não autorizado ou tentativas'] },
        { title: 'Artigo 5 (Isenção de Responsabilidade)', content: 'A Empresa não garante a precisão, integridade ou utilidade do conteúdo gerado por este Serviço.' },
        { title: 'Artigo 6 (Lei Aplicável)', content: 'Estes Termos serão regidos pela lei japonesa, e disputas serão submetidas à jurisdição exclusiva da Filial Tsuchiura do Tribunal Distrital de Mito.' }
      ],
      back: '← Voltar ao DANTE'
    },
    ru: {
      title: 'Условия использования',
      subtitle: 'Terms of Service',
      sections: [
        { title: 'Статья 1 (Применение)', content: 'Настоящие Условия регулируют использование интегрированного ИИ-редактора "DANTE" ("Сервис"), предоставляемого RATIO Lab., LLC ("Компания").' },
        { title: 'Статья 2 (Регистрация)', content: 'Пользователи должны зарегистрироваться, согласившись с настоящими Условиями и следуя предписанным Компанией методам.' },
        { title: 'Статья 3 (Цены)', list: ['Бесплатный план: До 3 000 символов (однократно)', 'Стандартный план: $10 за 500 000 символов', 'Премиум план: $100 за 6 000 000 символов'] },
        { title: 'Статья 4 (Запрещенные действия)', content: 'Пользователи не должны:', list: ['Нарушать законы или общественный порядок', 'Нарушать права Компании или третьих лиц', 'Мешать работе Сервиса', 'Несанкционированный доступ или попытки'] },
        { title: 'Статья 5 (Отказ от ответственности)', content: 'Компания не гарантирует точность, полноту или полезность контента, созданного данным Сервисом.' },
        { title: 'Статья 6 (Применимое право)', content: 'Настоящие Условия регулируются японским законодательством, и споры подлежат исключительной юрисдикции филиала Цутиура районного суда Мито.' }
      ],
      back: '← Вернуться к DANTE'
    },
    ar: {
      title: 'شروط الخدمة',
      subtitle: 'Terms of Service',
      sections: [
        { title: 'المادة 1 (التطبيق)', content: 'تحكم هذه الشروط استخدام محرر الكتابة المتكامل بالذكاء الاصطناعي "DANTE" ("الخدمة") المقدم من RATIO Lab., LLC ("الشركة").' },
        { title: 'المادة 2 (التسجيل)', content: 'يجب على المستخدمين التسجيل بالموافقة على هذه الشروط واتباع الطرق المحددة من الشركة.' },
        { title: 'المادة 3 (التسعير)', list: ['الخطة المجانية: حتى 3,000 حرف (مرة واحدة)', 'الخطة القياسية: 10$ مقابل 500,000 حرف', 'الخطة المميزة: 100$ مقابل 6,000,000 حرف'] },
        { title: 'المادة 4 (الأنشطة المحظورة)', content: 'لا يجوز للمستخدمين:', list: ['انتهاك القوانين أو النظام العام', 'انتهاك حقوق الشركة أو الأطراف الثالثة', 'التدخل في عمليات الخدمة', 'الوصول غير المصرح به أو المحاولات'] },
        { title: 'المادة 5 (إخلاء المسؤولية)', content: 'لا تضمن الشركة دقة أو اكتمال أو فائدة المحتوى الذي تولده هذه الخدمة.' },
        { title: 'المادة 6 (القانون الساري)', content: 'تخضع هذه الشروط للقانون الياباني، وتخضع النزاعات للاختصاص القضائي الحصري لفرع تسوتشيورا في محكمة ميتو المحلية.' }
      ],
      back: '← العودة إلى DANTE'
    }
  },
  privacy: {
    ja: {
      title: 'プライバシーポリシー',
      subtitle: 'Privacy Policy',
      sections: [
        { title: '1. 収集する情報', content: '当社は、以下の情報を収集します：', list: ['メールアドレス、ユーザー名（アカウント登録時）', '作成されたコンテンツ（プロジェクト、文章）', '利用履歴（AI生成履歴、使用文字数）', '決済情報（決済代行サービス経由）'] },
        { title: '2. 情報の利用目的', list: ['本サービスの提供・運営', 'ユーザーサポート', 'サービス改善', '料金請求・決済処理'] },
        { title: '3. 情報の第三者提供', content: '当社は、法令に基づく場合を除き、利用者の同意なく個人情報を第三者に提供しません。' },
        { title: '4. セキュリティ', content: '当社は、個人情報の漏洩、滅失、毀損を防止するため、適切なセキュリティ対策を講じます。' },
        { title: '5. Cookieの使用', content: '本サービスは、セッション管理のためにCookieを使用します。' },
        { title: '6. お問い合わせ', content: '個人情報に関するお問い合わせは、当社までご連絡ください。' }
      ],
      back: '← DANTEに戻る'
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'プライバシーポリシー',
      sections: [
        { title: '1. Information We Collect', content: 'We collect the following information:', list: ['Email address and username (at registration)', 'Created content (projects, writings)', 'Usage history (AI generation history, character usage)', 'Payment information (via payment processors)'] },
        { title: '2. Purpose of Use', list: ['Providing and operating the Service', 'User support', 'Service improvement', 'Billing and payment processing'] },
        { title: '3. Third-Party Disclosure', content: 'We do not provide personal information to third parties without user consent, except as required by law.' },
        { title: '4. Security', content: 'We implement appropriate security measures to prevent leakage, loss, or damage of personal information.' },
        { title: '5. Cookie Usage', content: 'This Service uses cookies for session management.' },
        { title: '6. Contact', content: 'For inquiries regarding personal information, please contact us.' }
      ],
      back: '← Back to DANTE'
    },
    zh: {
      title: '隐私政策',
      subtitle: 'Privacy Policy',
      sections: [
        { title: '1. 收集的信息', content: '我们收集以下信息：', list: ['电子邮件地址和用户名（注册时）', '创建的内容（项目、文章）', '使用记录（AI生成记录、使用字符数）', '支付信息（通过支付服务商）'] },
        { title: '2. 使用目的', list: ['提供和运营服务', '用户支持', '改进服务', '账单和支付处理'] },
        { title: '3. 第三方披露', content: '除法律要求外，未经用户同意，我们不会向第三方提供个人信息。' },
        { title: '4. 安全措施', content: '我们采取适当的安全措施，防止个人信息泄露、丢失或损坏。' },
        { title: '5. Cookie使用', content: '本服务使用Cookie进行会话管理。' },
        { title: '6. 联系方式', content: '如有关于个人信息的咨询，请与我们联系。' }
      ],
      back: '← 返回DANTE'
    },
    ko: {
      title: '개인정보처리방침',
      subtitle: 'Privacy Policy',
      sections: [
        { title: '1. 수집하는 정보', content: '당사는 다음 정보를 수집합니다:', list: ['이메일 주소 및 사용자명 (등록 시)', '작성된 콘텐츠 (프로젝트, 글)', '사용 기록 (AI 생성 기록, 사용 문자 수)', '결제 정보 (결제 대행 서비스 경유)'] },
        { title: '2. 이용 목적', list: ['서비스 제공 및 운영', '사용자 지원', '서비스 개선', '요금 청구 및 결제 처리'] },
        { title: '3. 제3자 제공', content: '당사는 법령에 따른 경우를 제외하고, 사용자 동의 없이 개인정보를 제3자에게 제공하지 않습니다.' },
        { title: '4. 보안', content: '당사는 개인정보의 누출, 분실, 훼손을 방지하기 위해 적절한 보안 대책을 강구합니다.' },
        { title: '5. 쿠키 사용', content: '본 서비스는 세션 관리를 위해 쿠키를 사용합니다.' },
        { title: '6. 문의', content: '개인정보에 관한 문의는 당사로 연락해 주세요.' }
      ],
      back: '← DANTE로 돌아가기'
    },
    it: {
      title: 'Informativa sulla Privacy',
      subtitle: 'Privacy Policy',
      sections: [
        { title: '1. Informazioni Raccolte', content: 'Raccogliamo le seguenti informazioni:', list: ['Email e nome utente (alla registrazione)', 'Contenuti creati (progetti, scritture)', 'Cronologia di utilizzo (generazioni AI, caratteri usati)', 'Informazioni di pagamento (tramite processori di pagamento)'] },
        { title: '2. Finalità di Utilizzo', list: ['Fornire e gestire il Servizio', 'Supporto utenti', 'Miglioramento del servizio', 'Fatturazione ed elaborazione pagamenti'] },
        { title: '3. Divulgazione a Terzi', content: 'Non forniamo informazioni personali a terzi senza il consenso dell\'utente, salvo quanto richiesto dalla legge.' },
        { title: '4. Sicurezza', content: 'Implementiamo misure di sicurezza appropriate per prevenire perdite, furti o danni alle informazioni personali.' },
        { title: '5. Utilizzo dei Cookie', content: 'Questo Servizio utilizza i cookie per la gestione delle sessioni.' },
        { title: '6. Contatti', content: 'Per domande riguardanti le informazioni personali, contattateci.' }
      ],
      back: '← Torna a DANTE'
    },
    hi: {
      title: 'गोपनीयता नीति',
      subtitle: 'Privacy Policy',
      sections: [
        { title: '1. एकत्रित जानकारी', content: 'हम निम्नलिखित जानकारी एकत्र करते हैं:', list: ['ईमेल पता और उपयोगकर्ता नाम (पंजीकरण पर)', 'बनाई गई सामग्री (प्रोजेक्ट, लेखन)', 'उपयोग इतिहास (AI जनरेशन इतिहास, अक्षर उपयोग)', 'भुगतान जानकारी (भुगतान प्रोसेसर के माध्यम से)'] },
        { title: '2. उपयोग का उद्देश्य', list: ['सेवा प्रदान करना और संचालित करना', 'उपयोगकर्ता सहायता', 'सेवा सुधार', 'बिलिंग और भुगतान प्रसंस्करण'] },
        { title: '3. तृतीय-पक्ष प्रकटीकरण', content: 'हम कानून द्वारा आवश्यक होने के अलावा, उपयोगकर्ता की सहमति के बिना व्यक्तिगत जानकारी तीसरे पक्ष को प्रदान नहीं करते हैं।' },
        { title: '4. सुरक्षा', content: 'हम व्यक्तिगत जानकारी के रिसाव, हानि या क्षति को रोकने के लिए उचित सुरक्षा उपाय लागू करते हैं।' },
        { title: '5. कुकी उपयोग', content: 'यह सेवा सत्र प्रबंधन के लिए कुकीज़ का उपयोग करती है।' },
        { title: '6. संपर्क', content: 'व्यक्तिगत जानकारी के बारे में पूछताछ के लिए, कृपया हमसे संपर्क करें।' }
      ],
      back: '← DANTE पर वापस जाएं'
    },
    es: {
      title: 'Política de Privacidad',
      subtitle: 'Privacy Policy',
      sections: [
        { title: '1. Información Recopilada', content: 'Recopilamos la siguiente información:', list: ['Correo electrónico y nombre de usuario (al registrarse)', 'Contenido creado (proyectos, escritos)', 'Historial de uso (historial de generación IA, caracteres usados)', 'Información de pago (a través de procesadores de pago)'] },
        { title: '2. Propósito de Uso', list: ['Proporcionar y operar el Servicio', 'Soporte al usuario', 'Mejora del servicio', 'Facturación y procesamiento de pagos'] },
        { title: '3. Divulgación a Terceros', content: 'No proporcionamos información personal a terceros sin el consentimiento del usuario, excepto según lo requiera la ley.' },
        { title: '4. Seguridad', content: 'Implementamos medidas de seguridad apropiadas para prevenir fugas, pérdidas o daños a la información personal.' },
        { title: '5. Uso de Cookies', content: 'Este Servicio utiliza cookies para la gestión de sesiones.' },
        { title: '6. Contacto', content: 'Para consultas sobre información personal, contáctenos.' }
      ],
      back: '← Volver a DANTE'
    },
    fr: {
      title: 'Politique de Confidentialité',
      subtitle: 'Privacy Policy',
      sections: [
        { title: '1. Informations Collectées', content: 'Nous collectons les informations suivantes:', list: ['Adresse e-mail et nom d\'utilisateur (lors de l\'inscription)', 'Contenu créé (projets, écrits)', 'Historique d\'utilisation (historique de génération IA, caractères utilisés)', 'Informations de paiement (via les processeurs de paiement)'] },
        { title: '2. Finalité d\'Utilisation', list: ['Fournir et exploiter le Service', 'Support utilisateur', 'Amélioration du service', 'Facturation et traitement des paiements'] },
        { title: '3. Divulgation à des Tiers', content: 'Nous ne fournissons pas d\'informations personnelles à des tiers sans le consentement de l\'utilisateur, sauf si la loi l\'exige.' },
        { title: '4. Sécurité', content: 'Nous mettons en œuvre des mesures de sécurité appropriées pour prévenir les fuites, pertes ou dommages aux informations personnelles.' },
        { title: '5. Utilisation des Cookies', content: 'Ce Service utilise des cookies pour la gestion des sessions.' },
        { title: '6. Contact', content: 'Pour toute question concernant les informations personnelles, contactez-nous.' }
      ],
      back: '← Retour à DANTE'
    },
    de: {
      title: 'Datenschutzrichtlinie',
      subtitle: 'Privacy Policy',
      sections: [
        { title: '1. Gesammelte Informationen', content: 'Wir sammeln folgende Informationen:', list: ['E-Mail-Adresse und Benutzername (bei der Registrierung)', 'Erstellte Inhalte (Projekte, Texte)', 'Nutzungsverlauf (KI-Generierungsverlauf, verwendete Zeichen)', 'Zahlungsinformationen (über Zahlungsdienstleister)'] },
        { title: '2. Verwendungszweck', list: ['Bereitstellung und Betrieb des Dienstes', 'Benutzerunterstützung', 'Serviceverbesserung', 'Abrechnung und Zahlungsabwicklung'] },
        { title: '3. Weitergabe an Dritte', content: 'Wir geben keine persönlichen Informationen an Dritte ohne Zustimmung des Benutzers weiter, es sei denn, dies ist gesetzlich vorgeschrieben.' },
        { title: '4. Sicherheit', content: 'Wir implementieren angemessene Sicherheitsmaßnahmen, um Verlust, Diebstahl oder Beschädigung persönlicher Informationen zu verhindern.' },
        { title: '5. Cookie-Verwendung', content: 'Dieser Dienst verwendet Cookies für die Sitzungsverwaltung.' },
        { title: '6. Kontakt', content: 'Bei Fragen zu persönlichen Informationen kontaktieren Sie uns bitte.' }
      ],
      back: '← Zurück zu DANTE'
    },
    pt: {
      title: 'Política de Privacidade',
      subtitle: 'Privacy Policy',
      sections: [
        { title: '1. Informações Coletadas', content: 'Coletamos as seguintes informações:', list: ['Endereço de e-mail e nome de usuário (no registro)', 'Conteúdo criado (projetos, escritos)', 'Histórico de uso (histórico de geração IA, caracteres usados)', 'Informações de pagamento (através de processadores de pagamento)'] },
        { title: '2. Finalidade de Uso', list: ['Fornecer e operar o Serviço', 'Suporte ao usuário', 'Melhoria do serviço', 'Faturamento e processamento de pagamentos'] },
        { title: '3. Divulgação a Terceiros', content: 'Não fornecemos informações pessoais a terceiros sem o consentimento do usuário, exceto conforme exigido por lei.' },
        { title: '4. Segurança', content: 'Implementamos medidas de segurança apropriadas para prevenir vazamentos, perdas ou danos às informações pessoais.' },
        { title: '5. Uso de Cookies', content: 'Este Serviço usa cookies para gerenciamento de sessões.' },
        { title: '6. Contato', content: 'Para dúvidas sobre informações pessoais, entre em contato conosco.' }
      ],
      back: '← Voltar ao DANTE'
    },
    ru: {
      title: 'Политика конфиденциальности',
      subtitle: 'Privacy Policy',
      sections: [
        { title: '1. Собираемая информация', content: 'Мы собираем следующую информацию:', list: ['Адрес электронной почты и имя пользователя (при регистрации)', 'Созданный контент (проекты, тексты)', 'История использования (история генерации ИИ, использованные символы)', 'Платежная информация (через платежные процессоры)'] },
        { title: '2. Цель использования', list: ['Предоставление и эксплуатация Сервиса', 'Поддержка пользователей', 'Улучшение сервиса', 'Выставление счетов и обработка платежей'] },
        { title: '3. Раскрытие третьим лицам', content: 'Мы не предоставляем личную информацию третьим лицам без согласия пользователя, за исключением случаев, предусмотренных законом.' },
        { title: '4. Безопасность', content: 'Мы применяем соответствующие меры безопасности для предотвращения утечки, потери или повреждения личной информации.' },
        { title: '5. Использование файлов cookie', content: 'Этот Сервис использует файлы cookie для управления сеансами.' },
        { title: '6. Контакты', content: 'По вопросам, касающимся личной информации, свяжитесь с нами.' }
      ],
      back: '← Вернуться к DANTE'
    },
    ar: {
      title: 'سياسة الخصوصية',
      subtitle: 'Privacy Policy',
      sections: [
        { title: '1. المعلومات المجمعة', content: 'نقوم بجمع المعلومات التالية:', list: ['عنوان البريد الإلكتروني واسم المستخدم (عند التسجيل)', 'المحتوى المُنشأ (المشاريع، الكتابات)', 'سجل الاستخدام (سجل توليد الذكاء الاصطناعي، الأحرف المستخدمة)', 'معلومات الدفع (عبر معالجي الدفع)'] },
        { title: '2. غرض الاستخدام', list: ['تقديم وتشغيل الخدمة', 'دعم المستخدم', 'تحسين الخدمة', 'الفوترة ومعالجة المدفوعات'] },
        { title: '3. الإفصاح للأطراف الثالثة', content: 'لا نقدم معلومات شخصية لأطراف ثالثة دون موافقة المستخدم، إلا وفقًا لما يقتضيه القانون.' },
        { title: '4. الأمان', content: 'نطبق تدابير أمنية مناسبة لمنع تسرب المعلومات الشخصية أو فقدانها أو إتلافها.' },
        { title: '5. استخدام ملفات تعريف الارتباط', content: 'تستخدم هذه الخدمة ملفات تعريف الارتباط لإدارة الجلسات.' },
        { title: '6. الاتصال', content: 'للاستفسارات المتعلقة بالمعلومات الشخصية، يرجى الاتصال بنا.' }
      ],
      back: '← العودة إلى DANTE'
    }
  },
  help: {
    ja: {
      title: 'DANTE 使い方ガイド',
      subtitle: 'AI統合ライティングエディター',
      gettingStarted: 'はじめに',
      gettingStartedText: 'DANTEは、AIと一緒に文章を書くための統合エディターです。小説、ブログ、ビジネス文書など、あらゆる執筆をサポートします。',
      features: '主な機能',
      feature1: 'ネタ考案',
      feature1Text: 'テーマやキーワードから斬新なアイデアを生成',
      feature2: 'プロット作成',
      feature2Text: '物語の構成を自動で提案',
      feature3: 'ライティング',
      feature3Text: '続きを書く、書き直す、拡張するなど',
      feature4: '翻訳',
      feature4Text: '多言語への翻訳機能',
      pricing: '料金プラン',
      free: '無料プラン',
      freeDesc: '3,000文字まで（一度限り）',
      standard: 'スタンダード',
      standardDesc: '500,000文字（書籍約5冊分）',
      premium: 'プレミアム',
      premiumDesc: '6,000,000文字（書籍約60冊分）',
      legal: '法的情報',
      termsLink: '利用規約',
      privacyLink: 'プライバシーポリシー',
      startButton: 'DANTEを使い始める',
      back: '← DANTEに戻る'
    },
    en: {
      title: 'DANTE User Guide',
      subtitle: 'AI Integrated Writing Editor',
      gettingStarted: 'Getting Started',
      gettingStartedText: 'DANTE is an integrated editor for writing with AI. It supports all kinds of writing including novels, blogs, and business documents.',
      features: 'Key Features',
      feature1: 'Brainstorming',
      feature1Text: 'Generate innovative ideas from themes and keywords',
      feature2: 'Plot Creation',
      feature2Text: 'Automatically suggest story structure',
      feature3: 'Writing',
      feature3Text: 'Continue, rewrite, expand, and more',
      feature4: 'Translation',
      feature4Text: 'Translate to multiple languages',
      pricing: 'Pricing Plans',
      free: 'Free Plan',
      freeDesc: 'Up to 3,000 characters (one-time)',
      standard: 'Standard',
      standardDesc: '500,000 characters (~5 books)',
      premium: 'Premium',
      premiumDesc: '6,000,000 characters (~60 books)',
      legal: 'Legal Information',
      termsLink: 'Terms of Service',
      privacyLink: 'Privacy Policy',
      startButton: 'Start Using DANTE',
      back: '← Back to DANTE'
    },
    zh: {
      title: 'DANTE 使用指南',
      subtitle: 'AI综合写作编辑器',
      gettingStarted: '入门',
      gettingStartedText: 'DANTE是一个与AI一起写作的综合编辑器。它支持小说、博客、商务文档等各类写作。',
      features: '主要功能',
      feature1: '创意生成',
      feature1Text: '从主题和关键词生成创新想法',
      feature2: '大纲创建',
      feature2Text: '自动建议故事结构',
      feature3: '写作',
      feature3Text: '续写、重写、扩展等',
      feature4: '翻译',
      feature4Text: '翻译成多种语言',
      pricing: '价格方案',
      free: '免费方案',
      freeDesc: '最多3,000字符（一次性）',
      standard: '标准版',
      standardDesc: '500,000字符（约5本书）',
      premium: '高级版',
      premiumDesc: '6,000,000字符（约60本书）',
      legal: '法律信息',
      termsLink: '服务条款',
      privacyLink: '隐私政策',
      startButton: '开始使用DANTE',
      back: '← 返回DANTE'
    },
    ko: {
      title: 'DANTE 사용 가이드',
      subtitle: 'AI 통합 글쓰기 에디터',
      gettingStarted: '시작하기',
      gettingStartedText: 'DANTE는 AI와 함께 글을 쓰는 통합 에디터입니다. 소설, 블로그, 비즈니스 문서 등 모든 종류의 글쓰기를 지원합니다.',
      features: '주요 기능',
      feature1: '아이디어 생성',
      feature1Text: '테마와 키워드에서 혁신적인 아이디어 생성',
      feature2: '플롯 생성',
      feature2Text: '스토리 구조를 자동으로 제안',
      feature3: '글쓰기',
      feature3Text: '이어쓰기, 다시쓰기, 확장 등',
      feature4: '번역',
      feature4Text: '다양한 언어로 번역',
      pricing: '요금제',
      free: '무료 플랜',
      freeDesc: '3,000자까지 (1회 한정)',
      standard: '스탠다드',
      standardDesc: '500,000자 (약 5권)',
      premium: '프리미엄',
      premiumDesc: '6,000,000자 (약 60권)',
      legal: '법적 정보',
      termsLink: '이용약관',
      privacyLink: '개인정보처리방침',
      startButton: 'DANTE 시작하기',
      back: '← DANTE로 돌아가기'
    },
    it: {
      title: 'Guida Utente DANTE',
      subtitle: 'Editor di Scrittura Integrato con IA',
      gettingStarted: 'Per Iniziare',
      gettingStartedText: 'DANTE è un editor integrato per scrivere con l\'IA. Supporta ogni tipo di scrittura inclusi romanzi, blog e documenti aziendali.',
      features: 'Funzionalità Principali',
      feature1: 'Brainstorming',
      feature1Text: 'Genera idee innovative da temi e parole chiave',
      feature2: 'Creazione Trama',
      feature2Text: 'Suggerisce automaticamente la struttura della storia',
      feature3: 'Scrittura',
      feature3Text: 'Continua, riscrivi, espandi e altro',
      feature4: 'Traduzione',
      feature4Text: 'Traduci in più lingue',
      pricing: 'Piani Tariffari',
      free: 'Piano Gratuito',
      freeDesc: 'Fino a 3.000 caratteri (una tantum)',
      standard: 'Standard',
      standardDesc: '500.000 caratteri (~5 libri)',
      premium: 'Premium',
      premiumDesc: '6.000.000 caratteri (~60 libri)',
      legal: 'Informazioni Legali',
      termsLink: 'Termini di Servizio',
      privacyLink: 'Informativa Privacy',
      startButton: 'Inizia a Usare DANTE',
      back: '← Torna a DANTE'
    },
    hi: {
      title: 'DANTE उपयोगकर्ता गाइड',
      subtitle: 'AI एकीकृत लेखन संपादक',
      gettingStarted: 'शुरू करना',
      gettingStartedText: 'DANTE AI के साथ लिखने के लिए एक एकीकृत संपादक है। यह उपन्यास, ब्लॉग और व्यावसायिक दस्तावेजों सहित सभी प्रकार के लेखन का समर्थन करता है।',
      features: 'मुख्य विशेषताएं',
      feature1: 'विचार मंथन',
      feature1Text: 'थीम और कीवर्ड से नवीन विचार उत्पन्न करें',
      feature2: 'कथानक निर्माण',
      feature2Text: 'कहानी संरचना स्वचालित रूप से सुझाएं',
      feature3: 'लेखन',
      feature3Text: 'जारी रखें, पुनर्लेखन, विस्तार और अधिक',
      feature4: 'अनुवाद',
      feature4Text: 'कई भाषाओं में अनुवाद करें',
      pricing: 'मूल्य योजनाएं',
      free: 'निःशुल्क योजना',
      freeDesc: '3,000 अक्षरों तक (एक बार)',
      standard: 'स्टैंडर्ड',
      standardDesc: '500,000 अक्षर (~5 किताबें)',
      premium: 'प्रीमियम',
      premiumDesc: '6,000,000 अक्षर (~60 किताबें)',
      legal: 'कानूनी जानकारी',
      termsLink: 'सेवा की शर्तें',
      privacyLink: 'गोपनीयता नीति',
      startButton: 'DANTE का उपयोग शुरू करें',
      back: '← DANTE पर वापस जाएं'
    },
    es: {
      title: 'Guía de Usuario de DANTE',
      subtitle: 'Editor de Escritura Integrado con IA',
      gettingStarted: 'Primeros Pasos',
      gettingStartedText: 'DANTE es un editor integrado para escribir con IA. Soporta todo tipo de escritura, incluyendo novelas, blogs y documentos empresariales.',
      features: 'Características Principales',
      feature1: 'Lluvia de Ideas',
      feature1Text: 'Genera ideas innovadoras a partir de temas y palabras clave',
      feature2: 'Creación de Trama',
      feature2Text: 'Sugiere automáticamente estructuras de historias',
      feature3: 'Escritura',
      feature3Text: 'Continuar, reescribir, expandir y más',
      feature4: 'Traducción',
      feature4Text: 'Traduce a múltiples idiomas',
      pricing: 'Planes de Precios',
      free: 'Plan Gratuito',
      freeDesc: 'Hasta 3,000 caracteres (una vez)',
      standard: 'Estándar',
      standardDesc: '500,000 caracteres (~5 libros)',
      premium: 'Premium',
      premiumDesc: '6,000,000 caracteres (~60 libros)',
      legal: 'Información Legal',
      termsLink: 'Términos de Servicio',
      privacyLink: 'Política de Privacidad',
      startButton: 'Comenzar con DANTE',
      back: '← Volver a DANTE'
    },
    fr: {
      title: 'Guide Utilisateur DANTE',
      subtitle: 'Éditeur d\'Écriture Intégré IA',
      gettingStarted: 'Pour Commencer',
      gettingStartedText: 'DANTE est un éditeur intégré pour écrire avec l\'IA. Il prend en charge tous types d\'écriture, y compris les romans, blogs et documents professionnels.',
      features: 'Fonctionnalités Principales',
      feature1: 'Brainstorming',
      feature1Text: 'Générez des idées innovantes à partir de thèmes et mots-clés',
      feature2: 'Création de Scénario',
      feature2Text: 'Suggère automatiquement des structures narratives',
      feature3: 'Écriture',
      feature3Text: 'Continuer, réécrire, développer et plus',
      feature4: 'Traduction',
      feature4Text: 'Traduisez en plusieurs langues',
      pricing: 'Plans Tarifaires',
      free: 'Plan Gratuit',
      freeDesc: 'Jusqu\'à 3 000 caractères (une fois)',
      standard: 'Standard',
      standardDesc: '500 000 caractères (~5 livres)',
      premium: 'Premium',
      premiumDesc: '6 000 000 caractères (~60 livres)',
      legal: 'Informations Légales',
      termsLink: 'Conditions d\'Utilisation',
      privacyLink: 'Politique de Confidentialité',
      startButton: 'Commencer avec DANTE',
      back: '← Retour à DANTE'
    },
    de: {
      title: 'DANTE Benutzerhandbuch',
      subtitle: 'KI-integrierter Schreibeditor',
      gettingStarted: 'Erste Schritte',
      gettingStartedText: 'DANTE ist ein integrierter Editor zum Schreiben mit KI. Er unterstützt alle Arten von Schreibarbeiten, einschließlich Romane, Blogs und Geschäftsdokumente.',
      features: 'Hauptfunktionen',
      feature1: 'Brainstorming',
      feature1Text: 'Generieren Sie innovative Ideen aus Themen und Schlüsselwörtern',
      feature2: 'Plot-Erstellung',
      feature2Text: 'Schlägt automatisch Geschichtsstrukturen vor',
      feature3: 'Schreiben',
      feature3Text: 'Fortsetzen, umschreiben, erweitern und mehr',
      feature4: 'Übersetzung',
      feature4Text: 'Übersetzen Sie in mehrere Sprachen',
      pricing: 'Preispläne',
      free: 'Kostenloser Plan',
      freeDesc: 'Bis zu 3.000 Zeichen (einmalig)',
      standard: 'Standard',
      standardDesc: '500.000 Zeichen (~5 Bücher)',
      premium: 'Premium',
      premiumDesc: '6.000.000 Zeichen (~60 Bücher)',
      legal: 'Rechtliche Informationen',
      termsLink: 'Nutzungsbedingungen',
      privacyLink: 'Datenschutzrichtlinie',
      startButton: 'Mit DANTE beginnen',
      back: '← Zurück zu DANTE'
    },
    pt: {
      title: 'Guia do Usuário DANTE',
      subtitle: 'Editor de Escrita Integrado com IA',
      gettingStarted: 'Primeiros Passos',
      gettingStartedText: 'DANTE é um editor integrado para escrever com IA. Suporta todos os tipos de escrita, incluindo romances, blogs e documentos empresariais.',
      features: 'Principais Recursos',
      feature1: 'Brainstorming',
      feature1Text: 'Gere ideias inovadoras a partir de temas e palavras-chave',
      feature2: 'Criação de Enredo',
      feature2Text: 'Sugere automaticamente estruturas de histórias',
      feature3: 'Escrita',
      feature3Text: 'Continuar, reescrever, expandir e mais',
      feature4: 'Tradução',
      feature4Text: 'Traduza para vários idiomas',
      pricing: 'Planos de Preços',
      free: 'Plano Gratuito',
      freeDesc: 'Até 3.000 caracteres (uma vez)',
      standard: 'Padrão',
      standardDesc: '500.000 caracteres (~5 livros)',
      premium: 'Premium',
      premiumDesc: '6.000.000 caracteres (~60 livros)',
      legal: 'Informações Legais',
      termsLink: 'Termos de Serviço',
      privacyLink: 'Política de Privacidade',
      startButton: 'Começar com DANTE',
      back: '← Voltar ao DANTE'
    },
    ru: {
      title: 'Руководство пользователя DANTE',
      subtitle: 'ИИ-интегрированный текстовый редактор',
      gettingStarted: 'Начало работы',
      gettingStartedText: 'DANTE — это интегрированный редактор для написания текстов с ИИ. Он поддерживает все виды письма, включая романы, блоги и деловые документы.',
      features: 'Основные функции',
      feature1: 'Мозговой штурм',
      feature1Text: 'Генерируйте инновационные идеи из тем и ключевых слов',
      feature2: 'Создание сюжета',
      feature2Text: 'Автоматически предлагает структуры историй',
      feature3: 'Написание',
      feature3Text: 'Продолжение, переписывание, расширение и многое другое',
      feature4: 'Перевод',
      feature4Text: 'Переводите на несколько языков',
      pricing: 'Тарифные планы',
      free: 'Бесплатный план',
      freeDesc: 'До 3 000 символов (однократно)',
      standard: 'Стандарт',
      standardDesc: '500 000 символов (~5 книг)',
      premium: 'Премиум',
      premiumDesc: '6 000 000 символов (~60 книг)',
      legal: 'Юридическая информация',
      termsLink: 'Условия использования',
      privacyLink: 'Политика конфиденциальности',
      startButton: 'Начать с DANTE',
      back: '← Вернуться к DANTE'
    },
    ar: {
      title: 'دليل مستخدم DANTE',
      subtitle: 'محرر كتابة متكامل بالذكاء الاصطناعي',
      gettingStarted: 'البدء',
      gettingStartedText: 'DANTE هو محرر متكامل للكتابة مع الذكاء الاصطناعي. يدعم جميع أنواع الكتابة، بما في ذلك الروايات والمدونات ووثائق الأعمال.',
      features: 'الميزات الرئيسية',
      feature1: 'العصف الذهني',
      feature1Text: 'توليد أفكار مبتكرة من المواضيع والكلمات المفتاحية',
      feature2: 'إنشاء الحبكة',
      feature2Text: 'اقتراح هياكل القصة تلقائيًا',
      feature3: 'الكتابة',
      feature3Text: 'الاستمرار، إعادة الكتابة، التوسيع والمزيد',
      feature4: 'الترجمة',
      feature4Text: 'الترجمة إلى لغات متعددة',
      pricing: 'خطط الأسعار',
      free: 'الخطة المجانية',
      freeDesc: 'حتى 3,000 حرف (مرة واحدة)',
      standard: 'قياسي',
      standardDesc: '500,000 حرف (~5 كتب)',
      premium: 'مميز',
      premiumDesc: '6,000,000 حرف (~60 كتاب)',
      legal: 'المعلومات القانونية',
      termsLink: 'شروط الخدمة',
      privacyLink: 'سياسة الخصوصية',
      startButton: 'ابدأ مع DANTE',
      back: '← العودة إلى DANTE'
    }
  }
};

// Generate Terms page HTML
function generateTermsPage(lang: string): string {
  const content = pageContent.terms[lang] || pageContent.terms.en;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title} - DANTE</title>
  <link rel="icon" type="image/png" href="/static/logo.png">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
    <div class="text-center mb-8">
      <img src="/static/logo.png" alt="DANTE" class="w-20 h-20 mx-auto mb-4">
      <h1 class="text-3xl font-bold text-gray-800">${content.title}</h1>
      <p class="text-gray-600">${content.subtitle}</p>
    </div>
    <div class="prose max-w-none">
      ${content.sections.map((s: any) => `
        <h2 class="text-xl font-bold mt-6 mb-3">${s.title}</h2>
        ${s.content ? `<p>${s.content}</p>` : ''}
        ${s.list ? `<ul class="list-disc pl-6">${s.list.map((item: string) => `<li>${item}</li>`).join('')}</ul>` : ''}
      `).join('')}
      <div class="mt-8 pt-4 border-t">
        <p class="text-sm text-gray-600">RATIO Lab., LLC<br>2026-01-17</p>
      </div>
    </div>
    <div class="mt-8 text-center">
      <a href="/" class="text-blue-600 hover:underline">${content.back}</a>
    </div>
  </div>
</body>
</html>`;
}

// Generate Privacy page HTML
function generatePrivacyPage(lang: string): string {
  const content = pageContent.privacy[lang] || pageContent.privacy.en;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title} - DANTE</title>
  <link rel="icon" type="image/png" href="/static/logo.png">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
    <div class="text-center mb-8">
      <img src="/static/logo.png" alt="DANTE" class="w-20 h-20 mx-auto mb-4">
      <h1 class="text-3xl font-bold text-gray-800">${content.title}</h1>
      <p class="text-gray-600">${content.subtitle}</p>
    </div>
    <div class="prose max-w-none">
      ${content.sections.map((s: any) => `
        <h2 class="text-xl font-bold mt-6 mb-3">${s.title}</h2>
        ${s.content ? `<p>${s.content}</p>` : ''}
        ${s.list ? `<ul class="list-disc pl-6">${s.list.map((item: string) => `<li>${item}</li>`).join('')}</ul>` : ''}
      `).join('')}
      <div class="mt-8 pt-4 border-t">
        <p class="text-sm text-gray-600">RATIO Lab., LLC<br>2026-01-17</p>
      </div>
    </div>
    <div class="mt-8 text-center">
      <a href="/" class="text-blue-600 hover:underline">${content.back}</a>
    </div>
  </div>
</body>
</html>`;
}

// Generate Help page HTML
function generateHelpPage(lang: string): string {
  const c = pageContent.help[lang] || pageContent.help.en;
  const isJapanese = lang === 'ja';
  const standardPrice = isJapanese ? '¥1,000' : '$10';
  const premiumPrice = isJapanese ? '¥10,000' : '$100';
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${c.title} - DANTE</title>
  <link rel="icon" type="image/png" href="/static/logo.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <img src="/static/logo.png" alt="DANTE" class="w-24 h-24 mx-auto mb-4">
      <h1 class="text-3xl font-bold text-gray-800">${c.title}</h1>
      <p class="text-gray-600">${c.subtitle}</p>
    </div>
    <div class="space-y-6">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2"><i class="fas fa-rocket text-yellow-600"></i>${c.gettingStarted}</h2>
        <p class="text-gray-700">${c.gettingStartedText}</p>
      </div>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2"><i class="fas fa-magic text-purple-600"></i>${c.features}</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 rounded-lg"><h3 class="font-bold text-gray-800"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>${c.feature1}</h3><p class="text-sm text-gray-600">${c.feature1Text}</p></div>
          <div class="p-4 bg-gray-50 rounded-lg"><h3 class="font-bold text-gray-800"><i class="fas fa-sitemap text-blue-500 mr-2"></i>${c.feature2}</h3><p class="text-sm text-gray-600">${c.feature2Text}</p></div>
          <div class="p-4 bg-gray-50 rounded-lg"><h3 class="font-bold text-gray-800"><i class="fas fa-pen text-green-500 mr-2"></i>${c.feature3}</h3><p class="text-sm text-gray-600">${c.feature3Text}</p></div>
          <div class="p-4 bg-gray-50 rounded-lg"><h3 class="font-bold text-gray-800"><i class="fas fa-language text-red-500 mr-2"></i>${c.feature4}</h3><p class="text-sm text-gray-600">${c.feature4Text}</p></div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2"><i class="fas fa-crown text-yellow-600"></i>${c.pricing}</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="p-4 border rounded-lg"><h3 class="font-bold text-gray-800">${c.free}</h3><p class="text-2xl font-bold text-gray-900">${isJapanese ? '¥0' : '$0'}</p><p class="text-sm text-gray-600">${c.freeDesc}</p></div>
          <div class="p-4 border-2 border-yellow-500 rounded-lg bg-yellow-50"><h3 class="font-bold text-gray-800">${c.standard}</h3><p class="text-2xl font-bold text-gray-900">${standardPrice}</p><p class="text-sm text-gray-600">${c.standardDesc}</p></div>
          <div class="p-4 border-2 border-purple-500 rounded-lg bg-purple-50"><h3 class="font-bold text-gray-800">${c.premium}</h3><p class="text-2xl font-bold text-gray-900">${premiumPrice}</p><p class="text-sm text-gray-600">${c.premiumDesc}</p></div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2"><i class="fas fa-balance-scale text-gray-600"></i>${c.legal}</h2>
        <div class="flex gap-4"><a href="/terms?lang=${lang}" class="text-blue-600 hover:underline">${c.termsLink}</a><a href="/privacy?lang=${lang}" class="text-blue-600 hover:underline">${c.privacyLink}</a></div>
        <p class="text-sm text-gray-600 mt-4">RATIO Lab., LLC</p>
      </div>
    </div>
    <div class="mt-8 text-center"><a href="/" class="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"><i class="fas fa-pen mr-2"></i>${c.startButton}</a></div>
  </div>
</body>
</html>`;
}

app.get('/', (c) => {
  return c.html(mainPage)
})

app.get('/terms', (c) => {
  const lang = c.req.query('lang') || 'ja'
  return c.html(generateTermsPage(lang))
})

app.get('/privacy', (c) => {
  const lang = c.req.query('lang') || 'ja'
  return c.html(generatePrivacyPage(lang))
})

app.get('/help', (c) => {
  const lang = c.req.query('lang') || 'ja'
  return c.html(generateHelpPage(lang))
})

app.get('/guide', (c) => {
  const lang = c.req.query('lang') || 'ja'
  return c.html(generateHelpPage(lang))
})

// Payment complete/cancel pages
app.get('/payment/complete', (c) => {
  return c.html(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>決済確認中</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center">
<div id="status" class="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
  <i class="fas fa-spinner fa-spin text-yellow-500 text-6xl mb-4"></i>
  <h1 class="text-2xl font-bold mb-4">決済を確認中...</h1>
  <p class="text-gray-600 mb-6">しばらくお待ちください</p>
</div>
<script>
(async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  const statusDiv = document.getElementById('status');
  
  if (!sessionId) {
    statusDiv.innerHTML = \`
      <i class="fas fa-exclamation-circle text-red-500 text-6xl mb-4"></i>
      <h1 class="text-2xl font-bold mb-4">エラー</h1>
      <p class="text-gray-600 mb-6">決済セッションが見つかりません</p>
      <a href="/" class="px-6 py-3 bg-gray-600 text-white rounded-lg inline-block">エディターに戻る</a>
    \`;
    return;
  }
  
  try {
    const response = await fetch('/api/payment/verify?session_id=' + sessionId, {
      credentials: 'include'
    });
    const data = await response.json();
    
    if (data.success && data.chars_added) {
      statusDiv.innerHTML = \`
        <i class="fas fa-check-circle text-green-500 text-6xl mb-4"></i>
        <h1 class="text-2xl font-bold mb-4">決済が完了しました</h1>
        <p class="text-gray-600 mb-4">ご購入ありがとうございます！</p>
        <p class="text-lg text-green-600 font-bold mb-6">\${data.chars_added.toLocaleString()} 文字が追加されました</p>
        <a href="/" class="px-6 py-3 bg-yellow-600 text-white rounded-lg inline-block">エディターに戻る</a>
      \`;
    } else if (data.success && data.message === 'Payment already processed') {
      statusDiv.innerHTML = \`
        <i class="fas fa-check-circle text-green-500 text-6xl mb-4"></i>
        <h1 class="text-2xl font-bold mb-4">決済は処理済みです</h1>
        <p class="text-gray-600 mb-6">この決済は既に処理されています</p>
        <a href="/" class="px-6 py-3 bg-yellow-600 text-white rounded-lg inline-block">エディターに戻る</a>
      \`;
    } else if (data.status && data.status !== 'completed') {
      statusDiv.innerHTML = \`
        <i class="fas fa-exclamation-triangle text-yellow-500 text-6xl mb-4"></i>
        <h1 class="text-2xl font-bold mb-4">決済が完了していません</h1>
        <p class="text-gray-600 mb-6">決済が完了していないか、キャンセルされました</p>
        <a href="/" class="px-6 py-3 bg-gray-600 text-white rounded-lg inline-block">エディターに戻る</a>
      \`;
    } else {
      statusDiv.innerHTML = \`
        <i class="fas fa-exclamation-circle text-red-500 text-6xl mb-4"></i>
        <h1 class="text-2xl font-bold mb-4">エラーが発生しました</h1>
        <p class="text-gray-600 mb-6">\${data.error || '決済の確認中にエラーが発生しました'}</p>
        <a href="/" class="px-6 py-3 bg-gray-600 text-white rounded-lg inline-block">エディターに戻る</a>
      \`;
    }
  } catch (e) {
    statusDiv.innerHTML = \`
      <i class="fas fa-exclamation-circle text-red-500 text-6xl mb-4"></i>
      <h1 class="text-2xl font-bold mb-4">エラーが発生しました</h1>
      <p class="text-gray-600 mb-6">決済の確認中にエラーが発生しました</p>
      <a href="/" class="px-6 py-3 bg-gray-600 text-white rounded-lg inline-block">エディターに戻る</a>
    \`;
  }
})();
</script>
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
