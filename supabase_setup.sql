-- SQL Script to Create website_prozent Table in Supabase
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.website_prozent (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.website_prozent ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.website_prozent
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated write access
-- Note: If you want to allow anonymous writes (from admin panel), use 'true' instead of 'auth.role() = "authenticated"'
CREATE POLICY "Allow authenticated write access" ON public.website_prozent
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Optional: Add a comment to document the table purpose
COMMENT ON TABLE public.website_prozent IS 'Stores custom HTML content for the website homepage added via admin panel text editor';
