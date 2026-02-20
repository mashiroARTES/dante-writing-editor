-- Add google_id column for Google OAuth integration
-- Users can sign in with Google and optionally link their existing account

ALTER TABLE users ADD COLUMN google_id TEXT;

-- Create unique index for Google ID lookups (enforces uniqueness)
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id) WHERE google_id IS NOT NULL;
