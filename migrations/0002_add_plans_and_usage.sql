-- Add plan and usage tracking to users
ALTER TABLE users ADD COLUMN plan TEXT DEFAULT 'free' CHECK(plan IN ('free', 'standard', 'premium'));
ALTER TABLE users ADD COLUMN total_chars_limit INTEGER DEFAULT 30000;
ALTER TABLE users ADD COLUMN total_chars_used INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN language TEXT DEFAULT 'ja';

-- Payment history table
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'JPY',
  plan TEXT NOT NULL,
  chars_added INTEGER NOT NULL,
  komoju_payment_id TEXT,
  status TEXT DEFAULT 'completed' CHECK(status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create index for payments
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

-- Update ai_history to track chars generated
ALTER TABLE ai_history ADD COLUMN chars_generated INTEGER DEFAULT 0;
