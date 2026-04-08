import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Recipe, allIngredients, Ingredient, festivals } from '../utils/mockData';
import { allRecipes } from "../utils/allRecipes";
import { getRecommendedRecipes, RecipeScore, checkIfFestivalDay, getTodaysFestival } from '../utils/aiEngine';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  preference: 'veg' | 'non-veg';
  language: string;
  calorieGoal: number; // daily calorie goal
  role?: string;
  subscription?: 'Free' | 'Premium';
  measurementUnit?: 'metric' | 'imperial';
  notifications?: boolean;
  theme?: 'light' | 'dark';
  homeConnect?: boolean;
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
  changeLanguage: (language: string) => Promise<void>;
  updateUserSettings: (settings: Partial<User>) => Promise<void>;
  forgotPassword: (email: string) => Promise<{ message: string }>;

  // Navigation
  currentTab: 'home' | 'calendar' | 'favorites' | 'shopping' | 'profile' | 'stats';
  setCurrentTab: (tab: 'home' | 'calendar' | 'favorites' | 'shopping' | 'profile' | 'stats') => void;

  // Recipes
  recipes: Recipe[];
  selectedIngredients: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
  recommendedRecipes: RecipeScore[];
  filterType: 'all' | 'veg' | 'non-veg';
  setFilterType: (type: 'all' | 'veg' | 'non-veg') => void;
  mealFilter: 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack';
  setMealFilter: (type: 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack') => void;
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

  // Global Detail State
  selectedRecipeId: string | null;
  setSelectedRecipeId: (id: string | null) => void;
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
  const { i18n } = useTranslation();

  // Navigation State
  const [currentTab, setCurrentTab] = useState<'home' | 'calendar' | 'favorites' | 'shopping' | 'profile' | 'stats'>('home');

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
  const [mealFilter, setMealFilter] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const [recipes, setRecipes] = useState<Recipe[]>(allRecipes);

  // Fetch localized recipes from backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const lang = i18n.language || 'en';
        const response = await fetch(`http://localhost:5000/api/recipes?lang=${lang}`);
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        if (data && data.length > 0) {
          setRecipes(data);
        } else {
          console.warn('Backend returned no recipes, using local fallback');
          setRecipes(allRecipes);
        }
      } catch (err) {
        console.error('Error fetching localized recipes:', err);
        // Fallback to mock data if backend fails, but they might be in English
        setRecipes(allRecipes);
      }
    };

    fetchRecipes();
  }, [i18n.language]);

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
      // Fetch user's diet calendar when logged in
      fetch(`http://localhost:5000/api/meal-plans/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const formatted = data.map((d: any) => ({
              date: d.date,
              type: d.meal_type
            }));
            setDietCalendar(formatted);
          }
        })
        .catch(err => console.error('Failed to fetch diet calendar:', err));
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
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      const authenticatedUser: User = {
        ...data.user,
        calorieGoal: 2000,
        subscription: 'Free',
        measurementUnit: 'metric',
        notifications: true,
        theme: 'light',
        homeConnect: false
      };

      setUser(authenticatedUser);
      setIsAuthenticated(true);
      
      // Sync language preference if available
      if (authenticatedUser.language && authenticatedUser.language !== i18n.language) {
        i18n.changeLanguage(authenticatedUser.language);
      }
      
      console.log('User logged in successfully:', authenticatedUser.name);
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    preference: 'veg' | 'non-veg',
    language: string
  ) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, preference, language })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      }

      console.log('User signed up successfully');
    } catch (err) {
      console.error('Signup error:', err)
      throw err;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send reset email');
      }

      return await response.json();
    } catch (err) {
      console.error('Forgot password error:', err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const changeLanguage = async (language: string) => {
    if (user) {
      const updatedUser = { ...user, language };
      setUser(updatedUser);

      // Sync with backend if authenticated
      try {
        await fetch(`http://localhost:5000/api/user/${user.id}/language`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ languageCode: language })
        });
      } catch (err) {
        console.error('Failed to sync language with backend:', err);
      }
    }
  };

  const updateUserSettings = async (settings: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...settings };
      setUser(updatedUser);

      // Sync with optional backend
      try {
        await fetch(`http://localhost:5000/api/user/${user.id}/settings`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(settings)
        });
      } catch (err) {
        console.error('Failed to sync settings with backend:', err);
      }
    }
  };

  // Recipe recommendations
  const getTodaysDiet = (): 'veg' | 'non-veg' | null => {
    const today = new Date().toISOString().split('T')[0];
    const entry = dietCalendar.find(e => e.date === today);
    return entry ? entry.type : null;
  };

  const recommendedRecipes = getRecommendedRecipes(
    recipes.length > 0 ? recipes : allRecipes,
    selectedIngredients,
    user?.preference || 'veg',
    getTodaysDiet(),
    isFestivalDay,
    filterType,
    mealFilter
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
  const setDietDay = async (date: string, type: 'veg' | 'non-veg') => {
    // Optimistic UI update
    setDietCalendar(prev => {
      const filtered = prev.filter(e => e.date !== date);
      return [...filtered, { date, type }];
    });

    // Save to backend
    if (user) {
      try {
        await fetch(`http://localhost:5000/api/meal-plans/${user.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date, mealType: type })
        });
      } catch (err) {
        console.error('Failed to save meal plan:', err);
      }
    }
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
    currentTab,
    setCurrentTab,
    login,
    signup,
    logout,
    recipes,
    selectedIngredients,
    setSelectedIngredients,
    recommendedRecipes,
    filterType,
    setFilterType,
    mealFilter,
    setMealFilter,
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
    changeLanguage,
    updateUserSettings,
    forgotPassword,
    isFestivalDay,
    todaysFestival: (todaysFestival as any) || null,
    ingredients: allIngredients,
    selectedRecipeId,
    setSelectedRecipeId
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
