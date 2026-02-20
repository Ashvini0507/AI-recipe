import React from 'react';
import { motion } from 'motion/react';
import { Clock, Heart } from 'lucide-react';
import { Recipe } from '../utils/mockData';
import { useApp } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RecipeCardProps {
  recipe: Recipe;
  matchPercentage?: number;
  onClick: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, matchPercentage, onClick }) => {
  const { favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(recipe.id);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer relative"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        
        {/* Type Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs ${
          recipe.type === 'veg' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {recipe.type === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
        </div>

        {/* Match Percentage */}
        {matchPercentage !== undefined && matchPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm">
            <span className="text-green-600">{matchPercentage}% Match</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
          className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg mb-2 text-gray-800 line-clamp-1">{recipe.title}</h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookingTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-orange-500">🔥</span>
            <span>{recipe.nutrition.calories} cal</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
