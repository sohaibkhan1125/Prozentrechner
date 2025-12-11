-- Quick Setup: Copy and paste this entire script into Supabase SQL Editor

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.website_prozent (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.website_prozent ENABLE ROW LEVEL SECURITY;

-- 3. Create policy for public read access
CREATE POLICY "Allow public read access" ON public.website_prozent
  FOR SELECT
  USING (true);

-- 4. Create policy for public write access (allows admin panel to save content)
CREATE POLICY "Allow authenticated write access" ON public.website_prozent
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- VERIFICATION: Run this to check if table was created successfully
SELECT * FROM public.website_prozent;
