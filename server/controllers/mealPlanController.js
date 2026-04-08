const supabase = require('../config/supabase');

/**
 * Get meal plans for a user
 */
exports.getMealPlans = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!supabase) {
            console.log('Serving mock meal plans (Server Fallback)');
            return res.json([]);
        }

        let query = supabase.from('meal_plans').select('*');
        const { data, error } = await query.eq('user_id', userId);

        if (error) {
            // Handle missing table gracefully
            if (error.code === '42P01' || error.message.includes('not find the table')) {
                console.warn('Meal plans table missing, returning empty array');
                return res.json([]);
            }
            throw error;
        }
        res.json(data || []);
    } catch (err) {
        console.error('Error fetching meal plans:', err.message);
        res.status(500).json({ error: 'Failed to fetch meal plans', details: err.message });
    }
};

/**
 * Add or update a meal plan for a specific date
 */
exports.setMealPlan = async (req, res) => {
    try {
        const { userId } = req.params;
        const { date, mealType } = req.body;

        if (!date || !mealType) {
            return res.status(400).json({ error: 'date and mealType are required' });
        }

        if (!supabase) {
            console.log('Mock meal plan set (Server Fallback)');
            return res.status(201).json({ id: Date.now(), user_id: userId, date, meal_type: mealType });
        }

        // Delete old entry for the date to prevent duplicates (acting as UPSERT for date)
        await supabase
            .from('meal_plans')
            .delete()
            .match({ user_id: userId, date: date });

        // Insert new entry
        const { data, error } = await supabase
            .from('meal_plans')
            .insert([{ user_id: userId, date, meal_type: mealType }])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        console.error('Error saving meal plan:', err.message);
        res.status(500).json({ error: 'Failed to save meal plan' });
    }
};
