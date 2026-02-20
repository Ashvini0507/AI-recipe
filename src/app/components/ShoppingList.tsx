import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

export const ShoppingList: React.FC = () => {
  const { shoppingList, togglePurchased, clearShoppingList } = useApp();

  const unpurchased = shoppingList.filter(item => !item.purchased);
  const purchased = shoppingList.filter(item => item.purchased);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 p-3 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl text-gray-800">Shopping List</h2>
              <p className="text-sm text-gray-600">
                {unpurchased.length} item{unpurchased.length !== 1 ? 's' : ''} to buy
              </p>
            </div>
          </div>
          {shoppingList.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearShoppingList}
              className="rounded-xl gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          )}
        </div>

        {shoppingList.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block bg-gray-100 p-6 rounded-full mb-4">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-600">Your shopping list is empty</p>
            <p className="text-sm text-gray-500 mt-2">
              Add missing ingredients from recipe details
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Unpurchased Items */}
            {unpurchased.length > 0 && (
              <div>
                <h3 className="text-sm text-gray-600 mb-3">To Buy</h3>
                <div className="space-y-2">
                  <AnimatePresence>
                    {unpurchased.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl"
                      >
                        <Checkbox
                          checked={item.purchased}
                          onCheckedChange={() => togglePurchased(item.id)}
                          id={item.id}
                        />
                        <label
                          htmlFor={item.id}
                          className="flex-1 cursor-pointer text-gray-800"
                        >
                          {item.ingredient}
                        </label>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Purchased Items */}
            {purchased.length > 0 && (
              <div>
                <h3 className="text-sm text-gray-600 mb-3">Purchased</h3>
                <div className="space-y-2">
                  <AnimatePresence>
                    {purchased.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-3 p-4 bg-green-50 rounded-xl"
                      >
                        <Checkbox
                          checked={item.purchased}
                          onCheckedChange={() => togglePurchased(item.id)}
                          id={item.id}
                        />
                        <label
                          htmlFor={item.id}
                          className="flex-1 cursor-pointer text-gray-600 line-through"
                        >
                          {item.ingredient}
                        </label>
                        <Check className="w-5 h-5 text-green-600" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
