-- Migration to support advanced profile settings in the AI Recipe App

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'Community Member',
ADD COLUMN IF NOT EXISTS subscription TEXT DEFAULT 'Free',
ADD COLUMN IF NOT EXISTS preference TEXT DEFAULT 'veg',
ADD COLUMN IF NOT EXISTS measurement_unit TEXT DEFAULT 'metric',
ADD COLUMN IF NOT EXISTS notifications BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'light',
ADD COLUMN IF NOT EXISTS home_connect BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS calorie_goal INTEGER DEFAULT 2000;

-- Comments for clarity
COMMENT ON COLUMN public.profiles.role IS 'User community role/status';
COMMENT ON COLUMN public.profiles.subscription IS 'Current subscription plan: Free or Premium';
COMMENT ON COLUMN public.profiles.preference IS 'Dietary preference: veg or non-veg';
COMMENT ON COLUMN public.profiles.measurement_unit IS 'Preferred measurement system: metric or imperial';
COMMENT ON COLUMN public.profiles.notifications IS 'Opt-in for push notifications and meal reminders';
COMMENT ON COLUMN public.profiles.theme IS 'UI theme preference: light or dark';
COMMENT ON COLUMN public.profiles.home_connect IS 'Toggle for smart home appliance integration';
COMMENT ON COLUMN public.profiles.calorie_goal IS 'Daily calorie consumption goal';
