-- Database schema for AI Recipe Recommendation App (Supabase / PostgreSQL)

-- 1. Profiles Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  language_code TEXT DEFAULT 'en',
  preference TEXT,
  calorie_goal INTEGER DEFAULT 2000,
  updated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);


-- 2. Recipes Table
CREATE TABLE public.recipes (
  id TEXT PRIMARY KEY,
  image_url TEXT,
  cooking_time INTEGER,
  recipe_type TEXT,
  calories INTEGER,
  protein INTEGER,
  carbs INTEGER,
  fat INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for recipes (public read)
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view recipes" ON public.recipes
  FOR SELECT USING (true);


-- 3. Recipe Translations Table
CREATE TABLE public.recipe_translations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  recipe_id TEXT REFERENCES public.recipes(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  instructions JSONB, -- Array of strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(recipe_id, language_code)
);

-- Enable RLS for recipe_translations (public read)
ALTER TABLE public.recipe_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view recipe translations" ON public.recipe_translations
  FOR SELECT USING (true);


-- 4. Meal Plans Table
CREATE TABLE public.meal_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  meal_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, date) -- A user has one meal plan entry per date
);

-- Enable RLS for meal_plans
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own meal plans" ON public.meal_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own meal plans" ON public.meal_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meal plans" ON public.meal_plans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meal plans" ON public.meal_plans
  FOR DELETE USING (auth.uid() = user_id);
