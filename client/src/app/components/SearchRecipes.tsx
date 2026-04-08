import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecipeCard } from './RecipeCard';
import { RecipeDetail } from './RecipeDetail';
import { IngredientSelector } from './IngredientSelector';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { searchRecipesByName } from '../utils/aiEngine';

export const SearchRecipes: React.FC = () => {
  const { t } = useTranslation();
  const {
    recommendedRecipes,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    selectedIngredients,
    mealFilter,
    setMealFilter,
    selectedRecipeId,
    setSelectedRecipeId
  } = useApp();

  const [showIngredientSelector, setShowIngredientSelector] = useState(false);

  // Filter recipes by search query
  const displayedRecipes = searchQuery
    ? searchRecipesByName(
      recommendedRecipes.map(r => r.recipe),
      searchQuery
    )
    : recommendedRecipes.map(r => r.recipe);

  const handleRecipeClick = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
  };

  const handleCloseRecipeDetail = () => {
    setSelectedRecipeId(null);
  };

  return (
    <div className="space-y-10">
      <div className="mb-2">
        <h2 className="text-4xl font-black text-foreground tracking-tighter uppercase">{t('home.feed', 'Recipe Feed')}</h2>
        <p className="text-muted-foreground font-black text-[10px] uppercase tracking-[0.3em]">
          {t('home.recommended_for_you', 'Recommended for you based on diet')}
        </p>
      </div>

      {/* Ingredient Hero Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-white/50 to-white/30 backdrop-blur-3xl border border-black/5 p-8 sm:p-12 text-center mb-10 shadow-xl group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
          <Filter className="w-48 h-48 -rotate-12" />
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto">

          
          <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tighter uppercase mb-6 drop-shadow-sm leading-none">
            {t('home.hero_title', "What's in your kitchen?")}
          </h2>
          
          <p className="text-muted-foreground text-xs sm:text-sm font-bold uppercase tracking-widest mb-10 leading-relaxed opacity-70">
            {t('home.hero_subtitle', "Select your ingredients and let AI discover the perfect recipe for you.")}
          </p>

          <button
            onClick={() => setShowIngredientSelector(true)}
            className="group relative bg-primary hover:bg-primary/90 text-white rounded-[2rem] px-8 sm:px-12 h-20 sm:h-24 flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl shadow-primary/30 mx-auto w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <Filter className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-xl sm:text-2xl font-black uppercase tracking-widest">
              {t('home.select_ingredients', 'Select Ingredients')}
            </span>
            {selectedIngredients.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white text-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shadow-xl"
              >
                {selectedIngredients.length}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Secondary Search & Category Flow */}
      <div className="mb-12 space-y-8 bg-white/60 p-6 rounded-[2.5rem] border border-black/5 backdrop-blur-md">
        <div className="relative group max-w-2xl mx-auto w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder={t('home.search_placeholder', 'Or search directly...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 rounded-2xl border-black/10 bg-white/80 backdrop-blur-md focus-visible:ring-primary h-14 font-bold text-foreground placeholder:text-muted-foreground/40 border-2"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Tabs value={filterType} onValueChange={(v) => setFilterType(v as any)}>
            <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-black/5 p-1 h-14 border border-black/10">
              <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest">{t('home.all', 'All Items')}</TabsTrigger>
              <TabsTrigger value="veg" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest">{t('home.veg', 'Veg')}</TabsTrigger>
              <TabsTrigger value="non-veg" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest">{t('home.non_veg', 'Non-veg')}</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs value={mealFilter} onValueChange={(v) => setMealFilter(v as any)}>
            <TabsList className="flex w-full rounded-2xl bg-black/5 p-1 h-14 border border-black/10 overflow-x-auto no-scrollbar">
              <TabsTrigger value="all" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest min-w-[80px]">{t('home.any_meal', 'Any Meal')}</TabsTrigger>
              <TabsTrigger value="breakfast" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest min-w-[80px]">{t('home.breakfast', 'Breakfast')}</TabsTrigger>
              <TabsTrigger value="lunch" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest min-w-[80px]">{t('home.lunch', 'Lunch')}</TabsTrigger>
              <TabsTrigger value="dinner" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest min-w-[80px]">{t('home.dinner', 'Dinner')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {displayedRecipes.map((recipe) => {
            const recipeScore = recommendedRecipes.find(r => r.recipe.id === recipe.id);
            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                matchPercentage={recipeScore?.matchPercentage}
                onClick={() => handleRecipeClick(recipe.id)}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {displayedRecipes.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-black/10 rounded-3xl bg-black/[0.02]">
          <p className="font-bold">{t('home.no_recipes', 'No recipes found.')}</p>
        </div>
      )}


      {/* Ingredient Selector Modal */}
      <AnimatePresence>
        {showIngredientSelector && (
          <IngredientSelector
            onClose={() => setShowIngredientSelector(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
