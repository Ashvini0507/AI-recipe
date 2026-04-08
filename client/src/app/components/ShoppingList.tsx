import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, Check, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';

export const ShoppingList: React.FC = () => {
  const { t } = useTranslation();
  const { shoppingList, addToShoppingList, togglePurchased, clearShoppingList } = useApp();
  const [newItemText, setNewItemText] = React.useState('');

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim()) {
      addToShoppingList([newItemText.trim()]);
      setNewItemText('');
    }
  };

  const unpurchased = shoppingList.filter(item => !item.purchased);
  const purchased = shoppingList.filter(item => item.purchased);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="bg-[#FCFBF7] rounded-[4rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="bg-primary/20 border border-primary/30 p-5 rounded-[2rem] shadow-2xl transition-transform hover:scale-110">
              <ShoppingBag className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-5xl font-black text-[#122D28] tracking-tighter uppercase leading-none">{t('shopping_list.title')}</h2>
              <p className="text-[12px] font-black text-[#122D28]/40 uppercase tracking-[0.4em] mt-3">
                {t('shopping_list.items_to_buy', { count: unpurchased.length })}
              </p>
            </div>
          </div>
          {shoppingList.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearShoppingList}
              className="rounded-[1.5rem] h-14 px-8 border-black/5 bg-black/5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 font-black text-[12px] uppercase tracking-widest transition-all"
            >
              <Trash2 className="w-5 h-5 mr-3" />
              {t('shopping_list.clear_all')}
            </Button>
          )}
        </div>

        {/* Custom Item Input */}
        <form onSubmit={handleAddCustomItem} className="mb-12 flex gap-5">
          <Input
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder={t('shopping_list.add_custom_item', { defaultValue: 'Add a custom item...' })}
            className="flex-1 rounded-[2rem] bg-black/5 border-black/5 h-16 px-8 text-[#122D28] placeholder:text-[#122D28]/30 font-bold focus:ring-primary focus:border-primary shadow-inner"
          />
          <Button
            type="submit"
            disabled={!newItemText.trim()}
            className="bg-primary hover:bg-primary/90 text-white rounded-[2rem] w-16 h-16 p-0 shadow-xl shadow-primary/20 disabled:opacity-20 transition-all active:scale-95"
          >
            <Plus className="w-8 h-8" />
          </Button>
        </form>

        {shoppingList.length === 0 ? (
          <div className="text-center py-24 bg-black/[0.02] rounded-[4rem] border border-black/5 shadow-inner">
            <div className="inline-block bg-white p-12 rounded-[3.5rem] mb-10 border border-black/5 shadow-2xl">
              <ShoppingBag className="w-20 h-20 text-primary/20" />
            </div>
            <p className="text-[#122D28] font-black uppercase tracking-widest text-lg mb-4">{t('shopping_list.empty_state')}</p>
            <p className="text-[12px] text-[#122D28]/40 font-black uppercase tracking-widest">
              {t('shopping_list.empty_subtitle')}
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Unpurchased Items */}
            {unpurchased.length > 0 && (
              <div>
                <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#122D28]/30 mb-6 px-4">{t('shopping_list.to_buy')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <AnimatePresence mode="popLayout">
                    {unpurchased.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        className="flex items-center gap-6 p-8 bg-white border border-black/5 rounded-[2.5rem] group transition-all hover:border-primary/20 hover:shadow-xl shadow-sm"
                      >
                        <Checkbox
                          checked={item.purchased}
                          onCheckedChange={() => togglePurchased(item.id)}
                          id={item.id}
                          className="w-8 h-8 border-black/10 data-[state=checked]:bg-primary data-[state=checked]:border-transparent rounded-xl"
                        />
                        <label
                          htmlFor={item.id}
                          className="flex-1 cursor-pointer text-[#122D28] font-black text-lg tracking-tight uppercase"
                        >
                          {t(`ingredients_names.${item.ingredient}`, { defaultValue: item.ingredient })}
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
                <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#122D28]/30 mb-6 px-4">{t('shopping_list.purchased')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <AnimatePresence mode="popLayout">
                    {purchased.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-6 p-7 bg-black/[0.02] border border-black/5 rounded-[2rem] group transition-all opacity-60 grayscale-[0.5]"
                      >
                        <Checkbox
                          checked={item.purchased}
                          onCheckedChange={() => togglePurchased(item.id)}
                          id={item.id}
                          className="w-7 h-7 border-black/20 data-[state=checked]:bg-[#122D28]/20 data-[state=checked]:border-transparent rounded-lg"
                        />
                        <label
                          htmlFor={item.id}
                          className="flex-1 cursor-pointer text-[#122D28]/40 font-black line-through decoration-2 text-md uppercase tracking-wide"
                        >
                          {t(`ingredients_names.${item.ingredient}`, { defaultValue: item.ingredient })}
                        </label>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
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
