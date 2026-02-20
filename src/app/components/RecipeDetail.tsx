import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Clock, Play, CheckCircle, ShoppingBag, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { VoiceCooking } from './VoiceCooking';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

interface RecipeDetailProps {
  recipeId: string;
  onClose: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipeId, onClose }) => {
  const {
    recipes,
    selectedIngredients,
    markAsCooked,
    addCalorieLog,
    addToShoppingList,
    recommendedRecipes
  } = useApp();

  const [showVoiceCooking, setShowVoiceCooking] = useState(false);

  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return null;

  // Get match info
  const recipeScore = recommendedRecipes.find(r => r.recipe.id === recipeId);
  const matchedIngredients = recipeScore?.matchedIngredients || [];
  const missingIngredients = recipeScore?.missingIngredients || [];

  const handleMarkAsCooked = () => {
    markAsCooked(recipe.id);
    addCalorieLog(recipe.id, recipe.title, recipe.nutrition.calories);
    toast.success(`${recipe.title} marked as cooked! Calories added to today's log.`);
  };

  const handleAddToShoppingList = () => {
    addToShoppingList(missingIngredients);
    toast.success(`${missingIngredients.length} ingredients added to shopping list!`);
  };

  if (showVoiceCooking) {
    return (
      <VoiceCooking
        recipe={recipe}
        onClose={() => setShowVoiceCooking(false)}
        onBack={() => setShowVoiceCooking(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-3xl overflow-hidden"
        >
          {/* Image Header */}
          <div className="relative h-64 sm:h-80">
            <ImageWithFallback
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <X className="w-6 h-6" />
            </button>
            <div className={`absolute top-4 left-4 px-4 py-2 rounded-full ${
              recipe.type === 'veg' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}>
              {recipe.type === 'veg' ? '🟢 Vegetarian' : '🔴 Non-Veg'}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Title and Info */}
            <div>
              <h1 className="text-3xl mb-3 text-gray-800">{recipe.title}</h1>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{recipe.cookingTime} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">🔥</span>
                  <span>{recipe.nutrition.calories} calories</span>
                </div>
              </div>
            </div>

            {/* Nutrition */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <h3 className="text-sm text-gray-600 mb-3">Nutrition Per Serving</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl mb-1">{recipe.nutrition.calories}</p>
                  <p className="text-xs text-gray-600">Calories</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl mb-1">{recipe.nutrition.protein}g</p>
                  <p className="text-xs text-gray-600">Protein</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl mb-1">{recipe.nutrition.carbs}g</p>
                  <p className="text-xs text-gray-600">Carbs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl mb-1">{recipe.nutrition.fat}g</p>
                  <p className="text-xs text-gray-600">Fat</p>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-xl mb-3 text-gray-800">Ingredients</h3>
              <div className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => {
                  const isMatched = matchedIngredients.includes(ingredient);
                  const isMissing = missingIngredients.includes(ingredient);
                  
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        isMatched ? 'bg-green-50' : isMissing ? 'bg-red-50' : 'bg-gray-50'
                      }`}
                    >
                      {isMatched && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {isMissing && <X className="w-5 h-5 text-red-600" />}
                      <span className={isMatched ? 'text-green-700' : isMissing ? 'text-red-700' : ''}>
                        {ingredient}
                      </span>
                    </div>
                  );
                })}
              </div>

              {missingIngredients.length > 0 && (
                <Button
                  onClick={handleAddToShoppingList}
                  variant="outline"
                  className="w-full mt-4 rounded-xl gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add {missingIngredients.length} Missing Ingredient{missingIngredients.length !== 1 ? 's' : ''} to Shopping List
                </Button>
              )}
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-xl mb-3 text-gray-800">Instructions</h3>
              <div className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button
                onClick={() => setShowVoiceCooking(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl gap-2"
              >
                <Volume2 className="w-5 h-5" />
                Voice Guide
              </Button>
              <Button
                onClick={handleMarkAsCooked}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Mark Cooked
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
