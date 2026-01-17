-- Update free plan character limit from 30,000 to 3,000
-- Only update users who are on free plan and have not purchased additional characters

-- Update the default limit for free plan users who haven't used any purchased characters
UPDATE users 
SET total_chars_limit = 3000 
WHERE plan = 'free' 
  AND total_chars_limit = 30000;

-- Note: Users who already have unlimited plan or have purchased characters will not be affected
