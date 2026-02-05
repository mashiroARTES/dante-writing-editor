-- Table to track used invite codes per user
CREATE TABLE IF NOT EXISTS used_invite_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  code TEXT NOT NULL,
  used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, code)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_used_invite_codes_user_id ON used_invite_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_used_invite_codes_code ON used_invite_codes(code);
