-- Add concept and plot_content columns to projects table for linking idea/plot/writing
ALTER TABLE projects ADD COLUMN concept TEXT DEFAULT '';
ALTER TABLE projects ADD COLUMN plot_content TEXT DEFAULT '';
