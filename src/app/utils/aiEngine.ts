// AI Recipe Recommendation Engine

import { Recipe } from './mockData';

export interface RecipeScore {
  recipe: Recipe;
  matchPercentage: number;
  finalScore: number;
  matchedIngredients: string[];
  missingIngredients: string[];
}

/**
 * Calculate ingredient match percentage
 * Match % = (Number of matched ingredients / Total recipe ingredients) × 100
 */
export function calculateMatchPercentage(
  recipeIngredients: string[],
  selectedIngredients: string[]
): { percentage: number; matched: string[]; missing: string[] } {
  const normalizedSelected = selectedIngredients.map(ing => ing.toLowerCase());
  const matched: string[] = [];
  const missing: string[] = [];

  recipeIngredients.forEach(ingredient => {
    const normalizedIngredient = ingredient.toLowerCase();
    if (normalizedSelected.some(selected => 
      normalizedIngredient.includes(selected) || selected.includes(normalizedIngredient)
    )) {
      matched.push(ingredient);
    } else {
      missing.push(ingredient);
    }
  });

  const percentage = (matched.length / recipeIngredients.length) * 100;
  return { percentage, matched, missing };
}

/**
 * Calculate final score with boosts
 * Final Score = Ingredient Match % + User Preference Boost + Diet Calendar Boost + Festival Boost
 */
export function calculateFinalScore(
  matchPercentage: number,
  recipe: Recipe,
  userPreference: 'veg' | 'non-veg',
  isDietDay: 'veg' | 'non-veg' | null,
  isFestivalDay: boolean
): number {
  let finalScore = matchPercentage;

  // User Preference Boost: +10 points if recipe matches user's preference
  if (recipe.type === userPreference) {
    finalScore += 10;
  }

  // Diet Calendar Boost: +15 points if recipe matches today's diet preference
  if (isDietDay && recipe.type === isDietDay) {
    finalScore += 15;
  }

  // Festival Boost: +15 points to veg recipes on festival days
  if (isFestivalDay && recipe.type === 'veg') {
    finalScore += 15;
  }

  return Math.min(finalScore, 100); // Cap at 100
}

/**
 * Main AI recommendation function
 */
export function getRecommendedRecipes(
  allRecipes: Recipe[],
  selectedIngredients: string[],
  userPreference: 'veg' | 'non-veg',
  isDietDay: 'veg' | 'non-veg' | null = null,
  isFestivalDay: boolean = false,
  filterType: 'all' | 'veg' | 'non-veg' = 'all'
): RecipeScore[] {
  // Filter recipes based on type
  const filteredRecipes = filterType === 'all' 
    ? allRecipes 
    : allRecipes.filter(recipe => recipe.type === filterType);

  // Calculate scores for each recipe
  const scoredRecipes: RecipeScore[] = filteredRecipes.map(recipe => {
    const { percentage, matched, missing } = calculateMatchPercentage(
      recipe.ingredients,
      selectedIngredients
    );

    const finalScore = calculateFinalScore(
      percentage,
      recipe,
      userPreference,
      isDietDay,
      isFestivalDay
    );

    return {
      recipe,
      matchPercentage: Math.round(percentage),
      finalScore: Math.round(finalScore),
      matchedIngredients: matched,
      missingIngredients: missing
    };
  });

  // Sort by final score (highest first)
  return scoredRecipes.sort((a, b) => b.finalScore - a.finalScore);
}

/**
 * Search recipes by name
 */
export function searchRecipesByName(
  recipes: Recipe[],
  searchQuery: string
): Recipe[] {
  const query = searchQuery.toLowerCase().trim();
  if (!query) return recipes;

  return recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(query)
  );
}

/**
 * Check if today is a festival day
 */
export function checkIfFestivalDay(festivals: { date: string }[]): boolean {
  const today = new Date();
  const todayString = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  return festivals.some(festival => festival.date === todayString);
}

/**
 * Get today's festival if any
 */
export function getTodaysFestival(festivals: { id: string; name: string; date: string; description: string }[]) {
  const today = new Date();
  const todayString = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  return festivals.find(festival => festival.date === todayString);
}
