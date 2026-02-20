import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipe, allRecipes, allIngredients, Ingredient, festivals } from '../utils/mockData';
import { getRecommendedRecipes, RecipeScore, checkIfFestivalDay, getTodaysFestival } from '../utils/aiEngine';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  preference: 'veg' | 'non-veg';
  language: string;
  calorieGoal: number; // daily calorie goal
}

// Diet calendar entry
export interface DietCalendarEntry {
  date: string; // format: YYYY-MM-DD
  type: 'veg' | 'non-veg';
}

// Calorie log entry
export interface CalorieLog {
  date: string; // format: YYYY-MM-DD
  recipeId: string;
  recipeTitle: string;
  calories: number;
}

// Shopping list item
export interface ShoppingItem {
  id: string;
  ingredient: string;
  purchased: boolean;
}

// App state interface
interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, preference: 'veg' | 'non-veg', language: string) => Promise<void>;
  logout: () => void;
  
  // Recipes
  recipes: Recipe[];
  selectedIngredients: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
  recommendedRecipes: RecipeScore[];
  filterType: 'all' | 'veg' | 'non-veg';
  setFilterType: (type: 'all' | 'veg' | 'non-veg') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Favorites
  favorites: string[]; // recipe IDs
  toggleFavorite: (recipeId: string) => void;
  
  // History
  cookedRecipes: string[]; // recipe IDs
  markAsCooked: (recipeId: string) => void;
  
  // Diet Calendar
  dietCalendar: DietCalendarEntry[];
  setDietDay: (date: string, type: 'veg' | 'non-veg') => void;
  getTodaysDiet: () => 'veg' | 'non-veg' | null;
  
  // Calorie Tracking
  calorieLogs: CalorieLog[];
  addCalorieLog: (recipeId: string, recipeTitle: string, calories: number) => void;
  getTodaysCalories: () => number;
  getMonthlyStats: () => MonthlyStats;
  
  // Shopping List
  shoppingList: ShoppingItem[];
  addToShoppingList: (ingredients: string[]) => void;
  togglePurchased: (itemId: string) => void;
  clearShoppingList: () => void;
  
  // Festival
  isFestivalDay: boolean;
  todaysFestival: { id: string; name: string; date: string; description: string } | null;
  
  // Ingredients
  ingredients: Ingredient[];
}

export interface MonthlyStats {
  totalVegDays: number;
  totalNonVegDays: number;
  totalCalories: number;
  averageDailyCalories: number;
  dailyCalories: { date: string; calories: number }[];
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load from localStorage
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('user') !== null;
  });
  
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [cookedRecipes, setCookedRecipes] = useState<string[]>(() => {
    const saved = localStorage.getItem('cookedRecipes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [dietCalendar, setDietCalendar] = useState<DietCalendarEntry[]>(() => {
    const saved = localStorage.getItem('dietCalendar');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [calorieLogs, setCalorieLogs] = useState<CalorieLog[]>(() => {
    const saved = localStorage.getItem('calorieLogs');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('shoppingList');
    return saved ? JSON.parse(saved) : [];
  });

  // Festival detection
  const isFestivalDay = checkIfFestivalDay(festivals);
  const todaysFestival = getTodaysFestival(festivals);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  useEffect(() => {
    localStorage.setItem('cookedRecipes', JSON.stringify(cookedRecipes));
  }, [cookedRecipes]);
  
  useEffect(() => {
    localStorage.setItem('dietCalendar', JSON.stringify(dietCalendar));
  }, [dietCalendar]);
  
  useEffect(() => {
    localStorage.setItem('calorieLogs', JSON.stringify(calorieLogs));
  }, [calorieLogs]);
  
  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Auth functions
  const login = async (email: string, password: string) => {
    // Mock authentication
    const mockUser: User = {
      id: '1',
      name: 'Food Lover',
      email: email,
      preference: 'veg',
      language: 'English',
      calorieGoal: 2000
    };
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    preference: 'veg' | 'non-veg',
    language: string
  ) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      preference,
      language,
      calorieGoal: 2000
    };
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Recipe recommendations
  const getTodaysDiet = (): 'veg' | 'non-veg' | null => {
    const today = new Date().toISOString().split('T')[0];
    const entry = dietCalendar.find(e => e.date === today);
    return entry ? entry.type : null;
  };

  const recommendedRecipes = getRecommendedRecipes(
    allRecipes,
    selectedIngredients,
    user?.preference || 'veg',
    getTodaysDiet(),
    isFestivalDay,
    filterType
  );

  // Favorites
  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => 
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  // History
  const markAsCooked = (recipeId: string) => {
    if (!cookedRecipes.includes(recipeId)) {
      setCookedRecipes(prev => [...prev, recipeId]);
    }
  };

  // Diet Calendar
  const setDietDay = (date: string, type: 'veg' | 'non-veg') => {
    setDietCalendar(prev => {
      const filtered = prev.filter(e => e.date !== date);
      return [...filtered, { date, type }];
    });
  };

  // Calorie Tracking
  const addCalorieLog = (recipeId: string, recipeTitle: string, calories: number) => {
    const today = new Date().toISOString().split('T')[0];
    const newLog: CalorieLog = {
      date: today,
      recipeId,
      recipeTitle,
      calories
    };
    setCalorieLogs(prev => [...prev, newLog]);
  };

  const getTodaysCalories = (): number => {
    const today = new Date().toISOString().split('T')[0];
    return calorieLogs
      .filter(log => log.date === today)
      .reduce((sum, log) => sum + log.calories, 0);
  };

  const getMonthlyStats = (): MonthlyStats => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Filter this month's data
    const thisMonthDiet = dietCalendar.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    });

    const thisMonthCalories = calorieLogs.filter(log => {
      const logDate = new Date(log.date);
      return logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear;
    });

    const totalVegDays = thisMonthDiet.filter(e => e.type === 'veg').length;
    const totalNonVegDays = thisMonthDiet.filter(e => e.type === 'non-veg').length;
    const totalCalories = thisMonthCalories.reduce((sum, log) => sum + log.calories, 0);

    // Calculate daily calories
    const dailyCaloriesMap: { [date: string]: number } = {};
    thisMonthCalories.forEach(log => {
      if (!dailyCaloriesMap[log.date]) {
        dailyCaloriesMap[log.date] = 0;
      }
      dailyCaloriesMap[log.date] += log.calories;
    });

    const dailyCalories = Object.entries(dailyCaloriesMap).map(([date, calories]) => ({
      date,
      calories
    }));

    const averageDailyCalories = dailyCalories.length > 0
      ? totalCalories / dailyCalories.length
      : 0;

    return {
      totalVegDays,
      totalNonVegDays,
      totalCalories,
      averageDailyCalories,
      dailyCalories
    };
  };

  // Shopping List
  const addToShoppingList = (ingredients: string[]) => {
    const newItems: ShoppingItem[] = ingredients.map(ing => ({
      id: `${Date.now()}-${Math.random()}`,
      ingredient: ing,
      purchased: false
    }));
    setShoppingList(prev => [...prev, ...newItems]);
  };

  const togglePurchased = (itemId: string) => {
    setShoppingList(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const clearShoppingList = () => {
    setShoppingList([]);
  };

  const value: AppState = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    recipes: allRecipes,
    selectedIngredients,
    setSelectedIngredients,
    recommendedRecipes,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    favorites,
    toggleFavorite,
    cookedRecipes,
    markAsCooked,
    dietCalendar,
    setDietDay,
    getTodaysDiet,
    calorieLogs,
    addCalorieLog,
    getTodaysCalories,
    getMonthlyStats,
    shoppingList,
    addToShoppingList,
    togglePurchased,
    clearShoppingList,
    isFestivalDay,
    todaysFestival,
    ingredients: allIngredients
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
