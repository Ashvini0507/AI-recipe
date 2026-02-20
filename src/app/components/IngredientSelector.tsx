import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface IngredientSelectorProps {
  onClose: () => void;
}

export const IngredientSelector: React.FC<IngredientSelectorProps> = ({ onClose }) => {
  const { ingredients, selectedIngredients, setSelectedIngredients } = useApp();
  const [localSelection, setLocalSelection] = useState<string[]>(selectedIngredients);
  const [activeCategory, setActiveCategory] = useState<string>('vegetables');

  const categories = [
    { id: 'vegetables', label: '🥬 Vegetables' },
    { id: 'fruits', label: '🍎 Fruits' },
    { id: 'spices', label: '🌶️ Spices' },
    { id: 'dairy', label: '🥛 Dairy' },
    { id: 'meat', label: '🍖 Meat' },
    { id: 'grains', label: '🌾 Grains' },
  ];

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

  const handleClear = () => {
    setLocalSelection([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-gray-800">Select Ingredients</h2>
            <p className="text-sm text-gray-600 mt-1">
              {localSelection.length} ingredient{localSelection.length !== 1 ? 's' : ''} selected
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="p-6 border-b overflow-x-auto">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="inline-flex gap-2">
              {categories.map(cat => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="rounded-lg whitespace-nowrap"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Ingredient Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ingredients
              .filter(ing => ing.category === activeCategory)
              .map(ingredient => {
                const isSelected = localSelection.includes(ingredient.name);
                return (
                  <motion.button
                    key={ingredient.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleIngredient(ingredient.name)}
                    className={`relative p-4 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    )}

                    {/* Image */}
                    <div className="aspect-square mb-2 rounded-xl overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={ingredient.image}
                        alt={ingredient.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name */}
                    <p className="text-sm text-gray-800 text-center">{ingredient.name}</p>
                  </motion.button>
                );
              })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex gap-3">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex-1 rounded-xl"
          >
            Clear All
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl"
          >
            Apply ({localSelection.length})
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
