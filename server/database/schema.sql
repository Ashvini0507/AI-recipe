-- =========================================================================
-- Supabase PostgreSQL Database Schema for AI Recipe Recommendation App
-- =========================================================================

-- 1. Profiles Table
-- Stores user data and links to Supabase Auth (`auth.users`)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  name TEXT,
  language_code TEXT DEFAULT 'en',
  updated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view and update their own profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);


-- 2. Recipes Table
-- Stores the core, non-translated fields for recipes
CREATE TABLE IF NOT EXISTS public.recipes (
  id TEXT PRIMARY KEY, -- e.g. "rec-1"
  image_url TEXT,
  cooking_time INTEGER, -- minutes
  recipe_type TEXT, -- e.g. "veg", "non-veg"
  calories INTEGER,
  protein INTEGER,
  carbs INTEGER,
  fat INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for recipes
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view recipes (public read)
CREATE POLICY "Anyone can view recipes" ON public.recipes FOR SELECT USING (true);


-- 3. Recipe Translations Table
-- Stores language-specific translatable fields. Each recipe has 1 record per language.
CREATE TABLE IF NOT EXISTS public.recipe_translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id TEXT REFERENCES public.recipes(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL, -- e.g. "en", "hi", "ta"
  title TEXT NOT NULL,
  description TEXT,
  instructions JSONB, -- Stored as an array of strings e.g. '["Step 1", "Step 2"]'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(recipe_id, language_code) -- Only one language version per recipe
);

-- Enable RLS for recipe_translations
ALTER TABLE public.recipe_translations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read translated fields
CREATE POLICY "Anyone can view recipe translations" ON public.recipe_translations FOR SELECT USING (true);


-- 4. Meal Plans Table
-- Stores user meal plans scheduled by date
CREATE TABLE IF NOT EXISTS public.meal_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  meal_type TEXT NOT NULL, -- e.g. "breakfast", "lunch", "dinner", "snack"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, date) -- Enforce max 1 plan per date per user (acts as upsert constraint)
);

-- Enable RLS for meal_plans
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

-- Allow users full CRUD over their own meal plans
CREATE POLICY "Users can view their own meal plans" ON public.meal_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own meal plans" ON public.meal_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own meal plans" ON public.meal_plans FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own meal plans" ON public.meal_plans FOR DELETE USING (auth.uid() = user_id);
