import React from 'react';
import { motion } from 'motion/react';
import { Clock, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Recipe } from '../utils/mockData';
import { useApp } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RecipeCardProps {
  recipe: Recipe;
  matchPercentage?: number;
  onClick: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, matchPercentage, onClick }) => {
  const { t } = useTranslation();
  const { favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(recipe.id);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ 
        y: -12, 
        scale: 1.05,
        rotateX: -5,
        rotateY: 5,
        z: 30
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
      className="bg-white/70 backdrop-blur-2xl rounded-[3rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] cursor-pointer relative group border border-black/5 transition-all duration-500 hover:shadow-primary/20"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <ImageWithFallback
          src={recipe.image}
          alt={t(`recipes.${recipe.id}.title`, { defaultValue: recipe.title })}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Type Badge - Glassmorphism */}
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 ${recipe.type === 'veg'
            ? 'bg-accent/80 text-black'
            : 'bg-red-500/80 text-white'
          }`}>
          {recipe.type === 'veg' ? `✨ ${t('recipe.veg')}` : `🔴 ${t('recipe.non_veg')}`}
        </div>

        {/* Match Percentage */}
        {matchPercentage !== undefined && matchPercentage > 0 && (
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl text-[11px] font-black shadow-2xl border border-white/20 uppercase tracking-tighter">
            <span className="text-black">{matchPercentage}% {t('recipe.match')}</span>
          </div>
        )}

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.2, rotate: 10, z: 20 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
          className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-xl p-3 rounded-2xl shadow-2xl hover:bg-white/20 transition-all border border-white/20"
        >
          <Heart
            className={`w-6 h-6 transition-colors ${isFavorite ? 'fill-primary text-primary' : 'text-white/40'}`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-3 text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {t(`recipes.${recipe.id}.title`, { defaultValue: recipe.title })}
        </h3>

        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
          <div className="flex items-center gap-2 bg-black/5 px-3 py-2 rounded-xl border border-black/5">
            <Clock className="w-4 h-4 text-primary" />
            <span>{recipe.cookingTime} {t('recipe.minutes_short')}</span>
          </div>
          <div className="flex items-center gap-2 bg-primary/20 px-3 py-2 rounded-xl border border-primary/10">
            <span className="text-primary">🔥</span>
            <span className="text-primary">{recipe.nutrition.calories} {t('recipe.calories_short')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
