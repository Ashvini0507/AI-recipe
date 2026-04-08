import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecipeCard } from './RecipeCard';
import { RecipeDetail } from './RecipeDetail';

export const Favorites: React.FC = () => {
  const { t } = useTranslation();
  const { favorites, recipes } = useApp();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-32" style={{ perspective: "2000px" }}>
      <div className="flex items-center gap-5 mb-10">
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl shadow-xl">
          <Heart className="w-8 h-8 text-primary" fill="currentColor" />
        </div>
        <div>
          <h2 className="text-4xl font-black text-foreground tracking-tighter uppercase">{t('favorites.title', 'My Recipes')}</h2>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">
            {t('favorites.recipe_count', { count: favoriteRecipes.length })} SAVED RECIPES
          </p>
        </div>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-24 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-inner relative overflow-hidden">
          <div className="inline-block bg-white/5 p-10 rounded-[2.5rem] mb-8 border border-white/10 shadow-2xl">
            <Heart className="w-20 h-20 text-white/20" />
          </div>
          <h3 className="text-white/40 font-black uppercase tracking-widest text-lg mb-3">
            {t('favorites.empty', 'No favorites yet')}
          </h3>
          <p className="text-sm text-white/30 max-w-[280px] mx-auto leading-relaxed">
            {t('favorites.empty_subtitle', 'Save recipes you love to build your personal cookbook.')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {favoriteRecipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <RecipeCard
                  recipe={recipe}
                  onClick={() => setSelectedRecipeId(recipe.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {selectedRecipeId && (
        <RecipeDetail
          recipeId={selectedRecipeId}
          onClose={() => setSelectedRecipeId(null)}
        />
      )}
    </div>
  );
};
