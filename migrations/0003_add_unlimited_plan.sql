-- SQLite doesn't support ALTER TABLE to modify constraints
-- We need to recreate the column or accept any value
-- Since SQLite CHECK constraints are not strictly enforced in older versions,
-- we'll add a new migration that creates a new table and migrates data

-- Create a temporary table without the CHECK constraint
CREATE TABLE IF NOT EXISTS users_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  username TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  plan TEXT DEFAULT 'free',
  total_chars_limit INTEGER DEFAULT 30000,
  total_chars_used INTEGER DEFAULT 0,
  language TEXT DEFAULT 'ja'
);

-- Copy data from old table
INSERT INTO users_new (id, email, password_hash, username, created_at, updated_at, plan, total_chars_limit, total_chars_used, language)
SELECT id, email, password_hash, username, created_at, updated_at, 
       COALESCE(plan, 'free'), 
       COALESCE(total_chars_limit, 30000), 
       COALESCE(total_chars_used, 0),
       COALESCE(language, 'ja')
FROM users;

-- Drop old table
DROP TABLE users;

-- Rename new table
ALTER TABLE users_new RENAME TO users;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
