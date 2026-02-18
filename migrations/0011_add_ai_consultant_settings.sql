-- AI Consultant Settings table for user customization
CREATE TABLE IF NOT EXISTS ai_consultant_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  ai_name TEXT DEFAULT 'マシロさん',
  ai_icon_url TEXT DEFAULT '/static/mashiro_icon.png',
  ai_personality TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Index for efficient user lookup
CREATE INDEX IF NOT EXISTS idx_ai_consultant_settings_user_id ON ai_consultant_settings(user_id);
