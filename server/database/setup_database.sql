-- Consolidated Setup Script for AI Recipe Recommendation App
-- Run this in the Supabase SQL Editor (https://app.supabase.com)

-- 1. Create Recipes Table
CREATE TABLE IF NOT EXISTS public.recipes (
  id TEXT PRIMARY KEY,
  image_url TEXT,
  cooking_time INTEGER,
  calories INTEGER,
  protein INTEGER,
  carbs INTEGER,
  fat INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Recipe Translations Table (Language Support)
CREATE TABLE IF NOT EXISTS public.recipe_translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id TEXT REFERENCES public.recipes(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  instructions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(recipe_id, language_code)
);

-- 3. Create Profiles Table (Synced with Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  name TEXT,
  email TEXT,
  preference TEXT DEFAULT 'veg',
  language_code TEXT DEFAULT 'en',
  updated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure columns exist if table already exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='email') THEN
    ALTER TABLE public.profiles ADD COLUMN email TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='preference') THEN
    ALTER TABLE public.profiles ADD COLUMN preference TEXT DEFAULT 'veg';
  END IF;
END $$;

-- 4. Create Meal Plans Table
CREATE TABLE IF NOT EXISTS public.meal_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  meal_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, date)
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

-- 6. Setup Policies
-- Public view for recipes
CREATE POLICY "Anyone can view recipes" ON public.recipes FOR SELECT USING (true);
CREATE POLICY "Anyone can view recipe translations" ON public.recipe_translations FOR SELECT USING (true);

-- Users manage their own profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (true); -- Optional: replace with role check

-- Users manage their own meal plans
CREATE POLICY "Users can view their own meal plans" ON public.meal_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own meal plans" ON public.meal_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own meal plans" ON public.meal_plans FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own meal plans" ON public.meal_plans FOR DELETE USING (auth.uid() = user_id);

-- 7. Automatic Profile Creation Trigger
-- This ensures when a user signs up, a profile record is created for them automatically.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, preference, language_code)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.email,
    COALESCE(new.raw_user_meta_data->>'preference', 'veg'),
    COALESCE(new.raw_user_meta_data->>'language', 'en')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
