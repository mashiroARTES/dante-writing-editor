-- SQLite doesn't support ALTER CHECK constraint directly
-- We need to recreate the table without the restrictive CHECK constraint

-- Create a new table without the restrictive CHECK constraint
CREATE TABLE IF NOT EXISTS ai_history_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  project_id INTEGER,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  model TEXT NOT NULL,
  generation_type TEXT NOT NULL,
  target_length INTEGER,
  chars_generated INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- Copy existing data
INSERT INTO ai_history_new (id, user_id, project_id, prompt, response, model, generation_type, target_length, chars_generated, created_at)
SELECT id, user_id, project_id, prompt, response, model, generation_type, target_length, COALESCE(chars_generated, 0), created_at
FROM ai_history;

-- Drop old table
DROP TABLE ai_history;

-- Rename new table
ALTER TABLE ai_history_new RENAME TO ai_history;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_ai_history_user_id ON ai_history(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_history_project_id ON ai_history(project_id);
