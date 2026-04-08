import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ShoppingBag, BarChart3, LogOut, UtensilsCrossed, Search as SearchIcon, Search, Menu, X, Heart, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecipeDetail } from './RecipeDetail';
import { CalorieTracker } from './CalorieTracker';
import { ShoppingList } from './ShoppingList';
import { Statistics } from './Statistics';
import { DietCalendar } from './DietCalendar';
import { SearchRecipes } from './SearchRecipes';
import { Favorites } from './Favorites';
import { Profile } from './Profile';
import { BottomNavigation } from './BottomNavigation';
import { LanguageSelector } from './LanguageSelector';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { useTranslation } from 'react-i18next';


type View = 'home' | 'ingredients' | 'calendar' | 'shopping' | 'stats';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const {
    user,
    logout,
    recommendedRecipes,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    selectedIngredients,
    isFestivalDay,
    todaysFestival,
    currentTab,
    setCurrentTab,
    selectedRecipeId,
    setSelectedRecipeId
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderNavButton = (id: string, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => {
        setCurrentTab(id as any);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-500 ${
        currentTab === id
          ? 'bg-primary text-white shadow-[0_10px_25px_rgba(255,107,107,0.2)] scale-105 border border-white/20'
          : 'text-muted-foreground hover:bg-black/5 hover:text-foreground'
      }`}
    >
      <div className={currentTab === id ? 'animate-pulse' : ''}>{icon}</div>
      <span className="text-xs font-bold tracking-tight">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-transparent pb-20 md:pb-0 font-sans relative">
      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl m-2 md:m-4 rounded-3rem border border-black/5 overflow-hidden shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="bg-primary/10 p-2.5 rounded-2xl shadow-inner border border-primary/20"
              >
                <UtensilsCrossed className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-[#FF8E53] bg-clip-text text-transparent">
                  {t('home.title', 'Smart Recipe Hub')}
                </h1>
                <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase opacity-70">
                  {t('header.greeting', { name: user?.name, defaultValue: `Welcome, ${user?.name || 'Chef'}` })}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <div className="mr-3 pr-3 border-r border-border">
                <LanguageSelector />
              </div>
              <div className="flex bg-black/5 backdrop-blur-xl p-1 rounded-xl border border-black/5 gap-1">
                {renderNavButton('home', <SearchIcon className="w-4 h-4" />, t('header.recipes', 'Recipes'))}
                {renderNavButton('calendar', <Calendar className="w-4 h-4" />, t('header.calendar', 'Calendar'))}
                {renderNavButton('shopping', <ShoppingBag className="w-4 h-4" />, t('header.shopping', 'Shopping'))}
                {renderNavButton('favorites', <Heart className="w-4 h-4" />, t('nav.favorites', 'My Recipes'))}
                {renderNavButton('stats', <BarChart3 className="w-4 h-4" />, t('header.stats', 'Stats'))}
                {renderNavButton('profile', <User className="w-4 h-4" />, t('nav.profile', 'Profile'))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="ml-2 text-destructive hover:text-white hover:bg-destructive rounded-xl transition-all"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSelector />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl border border-border bg-card"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Expansion */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-4 space-y-1 pb-4">
                  {renderNavButton('home', <Search className="w-5 h-5" />, t('header.recipes', 'Recipes'))}
                  {renderNavButton('calendar', <Calendar className="w-5 h-5" />, t('header.calendar', 'Calendar'))}
                  {renderNavButton('shopping', <ShoppingBag className="w-5 h-5" />, t('header.shopping', 'Shopping'))}
                  {renderNavButton('favorites', <Heart className="w-5 h-5" />, t('nav.favorites', 'My Recipes'))}
                  {renderNavButton('stats', <BarChart3 className="w-5 h-5" />, t('header.stats', 'Stats'))}
                  {renderNavButton('profile', <User className="w-5 h-5" />, t('nav.profile', 'Profile'))}
                  <Button
                    variant="ghost"
                    size="default"
                    onClick={logout}
                    className="w-full justify-start text-destructive hover:bg-destructive/10 rounded-xl"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    {t('header.logout', 'Log Out')}
                  </Button>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Festival Banner */}
      {isFestivalDay && todaysFestival && currentTab === 'home' && (
        <Alert className="max-w-7xl mx-auto m-6 bg-black/40 backdrop-blur-2xl border-primary/20 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <AlertDescription className="flex items-center gap-4 relative z-10 py-2">
            <span className="text-3xl animate-bounce">✨</span>
            <div className="flex flex-col">
              <span className="text-foreground font-black uppercase tracking-tighter text-lg">{todaysFestival.name}</span>
              <span className="text-muted-foreground text-xs font-bold">{todaysFestival.description}. {t('festival.veg_first', 'Focusing on Vegetarian delights today.')}</span>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content with Transition */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="pb-24 md:pb-8"
            >
              <div className="space-y-8">
                <SearchRecipes />
              </div>
            </motion.div>
          )}

          {currentTab === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="pb-24 md:pb-8"
            >
              <DietCalendar />
            </motion.div>
          )}

          {currentTab === 'favorites' && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="pb-24 md:pb-8"
            >
              <Favorites />
            </motion.div>
          )}

          {currentTab === 'shopping' && (
            <motion.div
              key="shopping"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="pb-24 md:pb-8"
            >
              <ShoppingList />
            </motion.div>
          )}

          {currentTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="pb-24 md:pb-8"
            >
              <Statistics />
            </motion.div>
          )}

          {currentTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="pb-24 md:pb-8"
            >
              <Profile />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />

      {/* Recipe Detail Modal */}
      {selectedRecipeId && (
        <RecipeDetail
          recipeId={selectedRecipeId}
          onClose={() => setSelectedRecipeId(null)}
        />
      )}
    </div>
  );
};
