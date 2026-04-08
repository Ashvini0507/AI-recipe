import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sparkles, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';

interface IngredientSelectorProps {
  onClose: () => void;
}

export const IngredientSelector: React.FC<IngredientSelectorProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { ingredients = [], selectedIngredients = [], setSelectedIngredients } = useApp();
  const [localSelection, setLocalSelection] = useState<string[]>(selectedIngredients);
  const [activeCategory, setActiveCategory] = useState<string>('vegetables');
  const [ingSearch, setIngSearch] = useState('');

  const categories = [
    { id: 'vegetables', label: t('ingredients.categories.vegetables') },
    { id: 'fruits', label: t('ingredients.categories.fruits') },
    { id: 'spices', label: t('ingredients.categories.spices') },
    { id: 'dairy', label: t('ingredients.categories.dairy') },
    { id: 'meat', label: t('ingredients.categories.meat') },
    { id: 'grains', label: t('ingredients.categories.grains') },
  ];

  const filteredIngredients = useMemo(() => {
    return (ingredients || []).filter(ing => {
      const matchCat = ing.category === activeCategory;
      const matchSearch = ing.name.toLowerCase().includes(ingSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [ingredients, activeCategory, ingSearch]);

  const toggleIngredient = (ingredientName: string) => {
    setLocalSelection(prev =>
      prev.includes(ingredientName)
        ? prev.filter(i => i !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const handleApply = () => {
    setSelectedIngredients(localSelection);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      {/* Modal Card */}
      <motion.div
        initial={{ y: '20px', opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: '20px', opacity: 0, scale: 0.95 }}
        className="bg-[#FCFBF7] rounded-[3rem] sm:rounded-[4rem] w-full max-w-6xl max-h-[92vh] overflow-hidden flex flex-col border border-black/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] z-10"
      >
        {/* Header */}
        <div className="p-4 border-b border-black/5 flex items-center justify-between bg-white/50 backdrop-blur-lg">
          <div className="flex items-center gap-6">
            <div className="bg-primary/20 p-3 rounded-[1.5rem] border border-primary/30 shadow-xl">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#122D28] tracking-tighter uppercase">{t('ingredients.title')}</h2>
              <p className="text-[10px] font-black text-[#122D28]/40 uppercase tracking-[0.3em] mt-1">
                {localSelection.length} selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-black/5 hover:bg-black/10 border border-black/5 rounded-xl transition-all group"
          >
            <X className="w-5 h-5 text-[#122D28]/60 group-hover:text-[#122D28]" />
          </button>
        </div>

        {/* Toolbar: Tabs & Search */}
        <div className="px-4 py-2 border-b border-black/5 flex flex-col sm:flex-row gap-3 items-center justify-between bg-white/30">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
            <TabsList className="inline-flex gap-1 bg-black/[0.03] p-1 rounded-xl border border-black/5 overflow-x-auto no-scrollbar w-full sm:w-auto">
              {categories.map(cat => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#122D28]/30" />
            <input 
              value={ingSearch}
              onChange={(e) => setIngSearch(e.target.value)}
              placeholder="Search..."
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-black/[0.03] border border-black/5 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
        </div>

        {/* Ingredient Grid — compact chips */}
        <div className="p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-transparent max-h-[55vh]">
          {filteredIngredients.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {filteredIngredients.map(ingredient => {
                const isSelected = localSelection.includes(ingredient.name);
                return (
                  <motion.button
                    key={ingredient.id}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => toggleIngredient(ingredient.name)}
                    className={`relative flex flex-col items-center gap-1 p-1.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10 shadow-md shadow-primary/10'
                        : 'border-black/5 bg-white hover:border-primary/20 shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 bg-primary text-white rounded-full p-0.5 z-10">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black/[0.03] border border-black/5 flex-shrink-0 shadow-sm">
                      <ImageWithFallback
                        src={ingredient.image}
                        alt={ingredient.name}
                        className="w-full h-full object-cover p-1"
                      />
                    </div>
                    <p className={`text-[9px] font-black text-center uppercase tracking-wide leading-tight w-full ${
                      isSelected ? 'text-primary' : 'text-[#122D28]/60'
                    }`}>
                      {t(`ingredients_names.${ingredient.name}`, { defaultValue: ingredient.name })}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-30 py-8">
              <Sparkles className="w-10 h-10 mb-2" />
              <p className="font-black uppercase tracking-widest text-xs">No items found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-black/5 flex gap-3 bg-white/80 backdrop-blur-md">
          <Button
            variant="outline"
            onClick={() => setLocalSelection([])}
            className="flex-1 rounded-xl h-11 border-black/5 bg-black/5 text-[#122D28]/40 hover:text-destructive hover:bg-destructive/5 font-black text-[10px] uppercase tracking-widest transition-all"
          >
            Clear All
          </Button>
          <Button
            onClick={handleApply}
            className="flex-[2] bg-primary hover:bg-primary/90 text-white rounded-xl h-11 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            Apply Selection ({localSelection.length})
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
