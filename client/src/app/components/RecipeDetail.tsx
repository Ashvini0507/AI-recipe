
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { X, Clock, Play, CheckCircle, ShoppingBag, Volume2, Minus, Plus, BarChart3 } from 'lucide-react';
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
  const { t } = useTranslation();
  const {
    recipes,
    selectedIngredients,
    markAsCooked,
    addCalorieLog,
    addToShoppingList,
    recommendedRecipes
  } = useApp();

  const [showVoiceCooking, setShowVoiceCooking] = useState(false);
  const [servings, setServings] = useState<number>(0);

  const recipe = recipes.find(r => r.id === recipeId);

  // Initialize servings from recipe when it's loaded
  React.useEffect(() => {
    if (recipe && servings === 0) {
      setServings(recipe.servings);
    }
  }, [recipe, servings]);
  if (!recipe) return null;

  // resolve translation for the recipe name (defaults to english title)
  const translatedTitle = t(`recipes.${recipe.id}.title`, { defaultValue: recipe.title });

  // Get match info
  const recipeScore = recommendedRecipes.find(r => r.recipe.id === recipeId);
  const matchedIngredients = recipeScore?.matchedIngredients || [];
  const missingIngredients = recipeScore?.missingIngredients || [];

  const handleMarkAsCooked = () => {
    markAsCooked(recipe.id);
    addCalorieLog(recipe.id, translatedTitle, recipe.nutrition.calories);
    toast.success(`${t('recipe.cooked_success', { title: translatedTitle })} ${t('recipe.calories_added')}`);
  };

  const handleAddToShoppingList = () => {
    addToShoppingList(missingIngredients);
    toast.success(t('recipe.added_to_shopping_list', { count: missingIngredients.length }));
  };

  if (showVoiceCooking) {
    return (
      <VoiceCooking
        recipe={recipe}
        servings={servings}
        onClose={() => setShowVoiceCooking(false)}
        onBack={() => setShowVoiceCooking(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto backdrop-blur-2xl" style={{ perspective: "2000px" }}>
      <div className="min-h-screen flex items-end sm:items-center justify-center p-0 sm:p-8">
        <motion.div
          initial={{ y: '100%', opacity: 0, rotateX: 20, z: -200 }}
          animate={{ y: 0, opacity: 1, rotateX: 0, z: 0 }}
          exit={{ y: '100%', opacity: 0, rotateX: 20, z: -200 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="bg-white/95 backdrop-blur-3xl rounded-t-[4rem] sm:rounded-[4rem] w-full max-w-4xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-black/5 relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Image Header */}
          <div className="relative h-72 sm:h-96">
            <ImageWithFallback
              src={recipe.image}
              alt={translatedTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-6 right-6 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-xl hover:scale-110 active:scale-95 transition-all text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className={`absolute top-6 left-6 px-5 py-2.5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl backdrop-blur-md border border-white/20 ${
              recipe.type === 'veg' ? 'bg-accent/40 text-accent' : 'bg-red-500/40 text-red-100'
              }`}>
              {recipe.type === 'veg' ? `✨ ${t('recipe.veg')}` : `🥩 ${t('recipe.non_veg')}`}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Title and Info */}
            <div className="relative">
              <h1 className="text-4xl font-black mb-4 text-foreground tracking-tighter leading-tight">{translatedTitle}</h1>
              <div className="flex items-center gap-6 text-muted-foreground overflow-x-auto pb-1 no-scrollbar">
                <div className="flex items-center gap-2.5 bg-muted px-4 py-2 rounded-xl border border-border shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest">{t('recipe.cooking_time', { minutes: recipe.cookingTime })}</span>
                </div>
                <div className="flex items-center gap-2.5 bg-muted px-4 py-2 rounded-xl border border-border shrink-0">
                  <span className="text-base">🔥</span>
                  <span className="text-xs font-bold uppercase tracking-widest">{t('recipe.calories', { count: recipe.nutrition.calories })}</span>
                </div>
              </div>
            </div>

            {/* Nutrition */}
            <div className="bg-black/5 border border-black/5 rounded-[2.5rem] p-8 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <BarChart3 className="w-24 h-24 text-primary" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-6 px-2">{t('recipe.nutrition_title')}</h3>
              <div className="grid grid-cols-4 gap-4 relative z-10">
                <div className="text-center p-4 bg-white/50 rounded-2xl border border-black/5">
                  <p className="text-3xl font-black text-primary tracking-tighter mb-1">{recipe.nutrition.calories}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">{t('recipe.calories_label')}</p>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-2xl border border-black/5">
                  <p className="text-3xl font-black text-foreground tracking-tighter mb-1">{recipe.nutrition.protein}{t('recipe.grams')}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">{t('recipe.protein_label')}</p>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-2xl border border-black/5">
                  <p className="text-3xl font-black text-foreground tracking-tighter mb-1">{recipe.nutrition.carbs}{t('recipe.grams')}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">{t('recipe.carbs_label')}</p>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-2xl border border-black/5">
                  <p className="text-3xl font-black text-foreground tracking-tighter mb-1">{recipe.nutrition.fat}{t('recipe.grams')}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">{t('recipe.fat_label')}</p>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-black/5 backdrop-blur-3xl rounded-[3rem] p-10 border border-black/5 shadow-inner relative overflow-hidden">
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full opacity-30" />
              <div className="flex items-center justify-between mb-10 relative z-10">
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">{t('recipe.ingredients_title')}</h3>
                <div className="flex items-center gap-4 bg-white/50 p-2 rounded-2xl border border-black/5 shadow-inner">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-xl transition-all border border-black/5"
                  >
                    <Minus className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <span className="text-[10px] font-black uppercase tracking-widest min-w-[60px] text-center text-muted-foreground">
                    {servings} {t('recipe.servings', { count: servings })}
                  </span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-xl transition-all border border-black/5"
                  >
                    <Plus className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {recipe.ingredientsWithQuantities && recipe.ingredientsWithQuantities.length > 0 ? (
                  recipe.ingredientsWithQuantities.map((ingredient, index) => {
                    const isMatched = matchedIngredients.includes(ingredient.name);
                    const isMissing = missingIngredients.includes(ingredient.name);
                    
                    // Scale amount
                    const scaledAmount = (ingredient.amount / recipe.servings) * servings;
                    // Round to 1 decimal place if needed
                    const displayAmount = Math.round(scaledAmount * 10) / 10;

                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 rounded-2xl border ${
                          isMatched ? 'bg-accent/10 border-accent/20' : 
                          isMissing ? 'bg-red-500/10 border-red-500/20' : 
                          'bg-card border-border'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {isMatched && <CheckCircle className="w-5 h-5 text-accent" />}
                          {isMissing && <X className="w-5 h-5 text-red-400" />}
                          {!isMatched && !isMissing && <div className="w-5 h-5 rounded-full border border-border" />}
                          <span className={`font-bold text-sm ${isMatched ? 'text-accent' : isMissing ? 'text-red-400' : 'text-foreground'}`}>
                            {t(`ingredients_names.${ingredient.name}`, { defaultValue: ingredient.name })}
                          </span>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
                          {displayAmount} {ingredient.unit}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  recipe.ingredients.map((ingredient, index) => {
                    const isMatched = matchedIngredients.includes(ingredient);
                    const isMissing = missingIngredients.includes(ingredient);

                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-2xl border ${
                          isMatched ? 'bg-green-500/10 border-green-500/20' : 
                          isMissing ? 'bg-red-500/10 border-red-500/20' : 
                          'bg-card border-border'
                        }`}
                      >
                        {isMatched && <CheckCircle className="w-5 h-5 text-accent" />}
                        {isMissing && <X className="w-5 h-5 text-red-400" />}
                        {!isMatched && !isMissing && <div className="w-5 h-5 rounded-full border border-border" />}
                        <span className={`font-bold text-sm ${isMatched ? 'text-accent' : isMissing ? 'text-red-400' : 'text-foreground'}`}>
                          {t(`ingredients_names.${ingredient}`, { defaultValue: ingredient })}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {missingIngredients.length > 0 && (
                <Button
                  onClick={handleAddToShoppingList}
                  variant="outline"
                  className="w-full mt-6 rounded-2xl h-12 border-primary/20 text-primary hover:bg-primary/10 font-bold text-xs uppercase tracking-widest gap-3"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {t('recipe.missing_ingredients', { count: missingIngredients.length })}
                </Button>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-black/5 backdrop-blur-3xl rounded-[3rem] p-10 border border-black/5 shadow-inner">
              <h3 className="text-2xl font-black mb-10 text-foreground uppercase tracking-tighter">{t('recipe.instructions_title')}</h3>
              <div className="space-y-8">
                {(() => {
                  const translatedInstructions = t(`recipes.${recipe.id}.instructions`, { returnObjects: true });
                  const instructions = Array.isArray(translatedInstructions) ? translatedInstructions : recipe.instructions;
 
                  return instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary text-white border-2 border-white/20 rounded-2xl flex items-center justify-center font-black transition-all group-hover:scale-110 shadow-xl shadow-primary/20">
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground font-bold text-sm leading-relaxed pt-2 group-hover:text-foreground transition-colors">{instruction}</p>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <Button
                onClick={() => setShowVoiceCooking(true)}
                className="bg-accent hover:bg-accent/90 text-black rounded-2xl h-14 font-black uppercase tracking-widest text-xs gap-3 shadow-xl shadow-accent/10"
              >
                <Volume2 className="w-5 h-5" />
                {t('recipe.voice_guide')}
              </Button>
              <Button
                onClick={handleMarkAsCooked}
                className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 font-black uppercase tracking-widest text-xs gap-3 shadow-xl shadow-primary/10"
              >
                <CheckCircle className="w-5 h-5" />
                {t('recipe.mark_cooked')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
