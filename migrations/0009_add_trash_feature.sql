-- Add deleted_at column for trash/soft delete feature
ALTER TABLE projects ADD COLUMN deleted_at DATETIME DEFAULT NULL;

-- Create index for faster trash queries
CREATE INDEX IF NOT EXISTS idx_projects_deleted_at ON projects(deleted_at);
