-- Mashiro chat history table
CREATE TABLE IF NOT EXISTS mashiro_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  chars_consumed INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Index for efficient user history retrieval
CREATE INDEX IF NOT EXISTS idx_mashiro_history_user_id ON mashiro_history(user_id);
CREATE INDEX IF NOT EXISTS idx_mashiro_history_created_at ON mashiro_history(created_at);
