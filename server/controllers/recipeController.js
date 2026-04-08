const supabase = require('../config/supabase');

/**
 * Get all recipes with translations for the specified language
 */
exports.getAllRecipes = async (req, res) => {
    try {
        const { lang = 'en' } = req.query;

        if (!supabase) {
            console.log('Serving mock recipes (Server Fallback)');
            // Minimal mock recipes to match frontend expectations
            const mockRecipes = [
                {
                    id: 'rec-1',
                    title: lang === 'hi' ? 'पालक पनीर' : 'Palak Paneer',
                    image: 'https://images.unsplash.com/photo-1742281257687-092746ad6021?w=1080',
                    cookingTime: 35,
                    type: 'veg',
                    mealType: ['lunch', 'dinner'],
                    nutrition: { calories: 320, protein: 18, carbs: 15, fat: 22 },
                    ingredients: ["Spinach", "Paneer", "Onion", "Tomato", "Garlic", "Ginger", "Turmeric", "Cumin", "Coriander", "Red Chili", "Garam Masala"],
                    instructions: ["Blanch spinach", "Puree spinach", "Sauté onions", "Add spices", "Simmer", "Add paneer"]
                }
            ];
            return res.json(mockRecipes);
        }

        // Fetch recipes joining with their translations
        const { data, error } = await supabase
            .from('recipes')
            .select(`
                id,
                image_url,
                cooking_time,
                calories,
                protein,
                carbs,
                fat,
                recipe_translations!inner (
                    title,
                    description,
                    instructions
                )
            `)
            .eq('recipe_translations.language_code', lang);

        if (error) throw error;

        // ... rest of the logic

        // Flatten the structure for the frontend
        const recipes = data.map(item => ({
            id: item.id,
            image: item.image_url,
            cookingTime: item.cooking_time,
            nutrition: {
                calories: item.calories,
                protein: item.protein,
                carbs: item.carbs,
                fat: item.fat
            },
            title: item.recipe_translations[0].title,
            description: item.recipe_translations[0].description,
            instructions: item.recipe_translations[0].instructions
        }));

        res.json(recipes);
    } catch (err) {
        console.error('Error fetching recipes:', err.message);
        res.status(500).json({ error: 'Failed to fetch recipes', details: err.message });
    }
};

/**
 * Get a single recipe by ID with translations
 */
exports.getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const { lang = 'en' } = req.query;

        const { data, error } = await supabase
            .from('recipes')
            .select(`
                id,
                image_url,
                cooking_time,
                calories,
                protein,
                carbs,
                fat,
                recipe_translations!inner (
                    title,
                    description,
                    instructions
                )
            `)
            .eq('id', id)
            .eq('recipe_translations.language_code', lang)
            .single();

        if (error) throw error;

        const recipe = {
            id: data.id,
            image: data.image_url,
            cookingTime: data.cooking_time,
            nutrition: {
                calories: data.calories,
                protein: data.protein,
                carbs: data.carbs,
                fat: data.fat
            },
            title: data.recipe_translations[0].title,
            description: data.recipe_translations[0].description,
            instructions: data.recipe_translations[0].instructions
        };

        res.json(recipe);
    } catch (err) {
        console.error('Error fetching recipe:', err.message);
        res.status(500).json({ error: 'Failed to fetch recipe', details: err.message });
    }
};

/**
 * Add a new recipe with translations
 */
exports.addRecipe = async (req, res) => {
    try {
        const { 
            title, 
            image_url, 
            cooking_time, 
            recipe_type, 
            calories, 
            protein, 
            carbs, 
            fat, 
            description, 
            instructions,
            language_code = 'en'
        } = req.body;

        if (!supabase) {
            return res.status(503).json({ error: 'Database connection not available' });
        }

        // 1. Insert into recipes table
        const { data: recipeData, error: recipeError } = await supabase
            .from('recipes')
            .insert([{
                image_url,
                cooking_time: parseInt(cooking_time),
                                calories: parseInt(calories),
                protein: parseInt(protein || 0),
                carbs: parseInt(carbs || 0),
                fat: parseInt(fat || 0)
            }])
            .select()
            .single();

        if (recipeError) throw recipeError;

        // 2. Insert into recipe_translations table
        const { error: transError } = await supabase
            .from('recipe_translations')
            .insert([{
                recipe_id: recipeData.id,
                language_code,
                title,
                description,
                instructions: Array.isArray(instructions) ? instructions : [instructions]
            }]);

        if (transError) throw transError;

        res.status(201).json({ 
            message: 'Recipe added successfully', 
            recipeId: recipeData.id 
        });
    } catch (err) {
        console.error('Error adding recipe:', err.message);
        res.status(500).json({ error: 'Failed to add recipe: ' + err.message });
    }
};
