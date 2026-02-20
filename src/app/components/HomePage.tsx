import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Calendar, ShoppingBag, BarChart3, LogOut, UtensilsCrossed, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecipeCard } from './RecipeCard';
import { RecipeDetail } from './RecipeDetail';
import { IngredientSelector } from './IngredientSelector';
import { DietCalendar } from './DietCalendar';
import { ShoppingList } from './ShoppingList';
import { Statistics } from './Statistics';
import { CalorieTracker } from './CalorieTracker';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { searchRecipesByName } from '../utils/aiEngine';

type View = 'home' | 'ingredients' | 'calendar' | 'shopping' | 'stats';

export const HomePage: React.FC = () => {
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
    todaysFestival
  } = useApp();

  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [showIngredientSelector, setShowIngredientSelector] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const renderNavButton = (view: View, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
        currentView === view
          ? 'bg-green-100 text-green-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-100 to-red-100 p-2 rounded-xl">
                <UtensilsCrossed className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl text-gray-800">Smart Recipe AI</h1>
                <p className="text-sm text-gray-600">Hi, {user?.name}!</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {renderNavButton('home', <Search className="w-5 h-5" />, 'Recipes')}
              {renderNavButton('calendar', <Calendar className="w-5 h-5" />, 'Calendar')}
              {renderNavButton('shopping', <ShoppingBag className="w-5 h-5" />, 'Shopping')}
              {renderNavButton('stats', <BarChart3 className="w-5 h-5" />, 'Stats')}
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2 pb-4">
              {renderNavButton('home', <Search className="w-5 h-5" />, 'Recipes')}
              {renderNavButton('calendar', <Calendar className="w-5 h-5" />, 'Calendar')}
              {renderNavButton('shopping', <ShoppingBag className="w-5 h-5" />, 'Shopping')}
              {renderNavButton('stats', <BarChart3 className="w-5 h-5" />, 'Stats')}
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Festival Banner */}
      {isFestivalDay && todaysFestival && currentView === 'home' && (
        <Alert className="max-w-7xl mx-auto m-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <AlertDescription className="flex items-center gap-2">
            <span className="text-2xl">🎉</span>
            <span>
              <strong>{todaysFestival.name}</strong> - {todaysFestival.description}. Showing vegetarian recipes first!
            </span>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentView === 'home' && (
          <>
            {/* Calorie Tracker */}
            <CalorieTracker />

            {/* Search and Filter */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                <Button
                  onClick={() => setShowIngredientSelector(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl gap-2"
                >
                  <Filter className="w-5 h-5" />
                  <span className="hidden sm:inline">Ingredients</span>
                  {selectedIngredients.length > 0 && (
                    <span className="bg-white text-green-600 px-2 py-0.5 rounded-full text-xs">
                      {selectedIngredients.length}
                    </span>
                  )}
                </Button>
              </div>

              {/* Tabs */}
              <Tabs value={filterType} onValueChange={(v) => setFilterType(v as any)}>
                <TabsList className="grid w-full grid-cols-3 rounded-xl">
                  <TabsTrigger value="all" className="rounded-lg">⭐ All</TabsTrigger>
                  <TabsTrigger value="veg" className="rounded-lg">🟢 Veg</TabsTrigger>
                  <TabsTrigger value="non-veg" className="rounded-lg">🔴 Non-Veg</TabsTrigger>
                </TabsList>
              </Tabs>
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
              <div className="text-center py-12 text-gray-500">
                <p>No recipes found. Try adjusting your filters or search.</p>
              </div>
            )}
          </>
        )}

        {currentView === 'calendar' && <DietCalendar />}
        {currentView === 'shopping' && <ShoppingList />}
        {currentView === 'stats' && <Statistics />}
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipeId && (
        <RecipeDetail
          recipeId={selectedRecipeId}
          onClose={handleCloseRecipeDetail}
        />
      )}

      {/* Ingredient Selector Modal */}
      {showIngredientSelector && (
        <IngredientSelector
          onClose={() => setShowIngredientSelector(false)}
        />
      )}
    </div>
  );
};
