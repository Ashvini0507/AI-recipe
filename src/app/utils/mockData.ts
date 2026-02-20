// Mock data for recipes and ingredients

export interface Recipe {
  id: string;
  title: string;
  image: string;
  cookingTime: number; // in minutes
  type: 'veg' | 'non-veg';
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Ingredient {
  id: string;
  name: string;
  category: 'vegetables' | 'fruits' | 'spices' | 'dairy' | 'meat' | 'grains';
  image: string;
}

export const allIngredients: Ingredient[] = [
  // Vegetables
  { id: 'ing-1', name: 'Tomato', category: 'vegetables', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=200' },
  { id: 'ing-2', name: 'Onion', category: 'vegetables', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200' },
  { id: 'ing-3', name: 'Potato', category: 'vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200' },
  { id: 'ing-4', name: 'Carrot', category: 'vegetables', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200' },
  { id: 'ing-5', name: 'Spinach', category: 'vegetables', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200' },
  { id: 'ing-6', name: 'Bell Pepper', category: 'vegetables', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200' },
  { id: 'ing-7', name: 'Broccoli', category: 'vegetables', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200' },
  { id: 'ing-8', name: 'Cauliflower', category: 'vegetables', image: 'https://images.unsplash.com/photo-1568584711372-59a1d488e07b?w=200' },
  
  // Fruits
  { id: 'ing-9', name: 'Lemon', category: 'fruits', image: 'https://images.unsplash.com/photo-1587486937-e5fe73e6b1e2?w=200' },
  { id: 'ing-10', name: 'Mango', category: 'fruits', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200' },
  
  // Spices
  { id: 'ing-11', name: 'Turmeric', category: 'spices', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=200' },
  { id: 'ing-12', name: 'Cumin', category: 'spices', image: 'https://images.unsplash.com/photo-1599909278854-31a4930d5b7a?w=200' },
  { id: 'ing-13', name: 'Coriander', category: 'spices', image: 'https://images.unsplash.com/photo-1641893110097-59e1bb8e59cf?w=200' },
  { id: 'ing-14', name: 'Garam Masala', category: 'spices', image: 'https://images.unsplash.com/photo-1596040033229-a0b58d1c6a11?w=200' },
  { id: 'ing-15', name: 'Red Chili', category: 'spices', image: 'https://images.unsplash.com/photo-1583032015769-ccc96f2c5c9d?w=200' },
  { id: 'ing-16', name: 'Garlic', category: 'spices', image: 'https://images.unsplash.com/photo-1588087334006-0c4b8c928b38?w=200' },
  { id: 'ing-17', name: 'Ginger', category: 'spices', image: 'https://images.unsplash.com/photo-1599909278854-31a4930d5b7a?w=200' },
  
  // Dairy
  { id: 'ing-18', name: 'Milk', category: 'dairy', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200' },
  { id: 'ing-19', name: 'Yogurt', category: 'dairy', image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04e7?w=200' },
  { id: 'ing-20', name: 'Paneer', category: 'dairy', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200' },
  { id: 'ing-21', name: 'Butter', category: 'dairy', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200' },
  { id: 'ing-22', name: 'Cheese', category: 'dairy', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200' },
  
  // Meat
  { id: 'ing-23', name: 'Chicken', category: 'meat', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200' },
  { id: 'ing-24', name: 'Beef', category: 'meat', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=200' },
  { id: 'ing-25', name: 'Fish', category: 'meat', image: 'https://images.unsplash.com/photo-1559737558-2f5a2c7d50b6?w=200' },
  { id: 'ing-26', name: 'Mutton', category: 'meat', image: 'https://images.unsplash.com/photo-1588347818036-8fc8be7ed193?w=200' },
  
  // Grains
  { id: 'ing-27', name: 'Rice', category: 'grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200' },
  { id: 'ing-28', name: 'Wheat Flour', category: 'grains', image: 'https://images.unsplash.com/photo-1574323505679-811c38c27d1b?w=200' },
  { id: 'ing-29', name: 'Lentils', category: 'grains', image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=200' },
  { id: 'ing-30', name: 'Pasta', category: 'grains', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200' },
];

export const allRecipes: Recipe[] = [
  {
    id: 'rec-1',
    title: 'Palak Paneer',
    image: 'https://images.unsplash.com/photo-1742281257687-092746ad6021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2ZWdldGFyaWFuJTIwY3VycnklMjBmb29kfGVufDF8fHx8MTc3MTU3Njg4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 35,
    type: 'veg',
    ingredients: ['Spinach', 'Paneer', 'Onion', 'Tomato', 'Ginger', 'Garlic', 'Cumin', 'Garam Masala', 'Butter'],
    instructions: [
      'Blanch spinach leaves in boiling water for 2 minutes',
      'Puree the blanched spinach with ginger and garlic',
      'Heat butter in a pan and sauté onions until golden',
      'Add tomatoes and cook until soft',
      'Add cumin and garam masala, cook for 1 minute',
      'Add spinach puree and simmer for 10 minutes',
      'Add paneer cubes and cook for 5 minutes',
      'Serve hot with rice or roti'
    ],
    nutrition: { calories: 320, protein: 18, carbs: 15, fat: 22 }
  },
  {
    id: 'rec-2',
    title: 'Grilled Chicken',
    image: 'https://images.unsplash.com/photo-1682423187670-4817da9a1b23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMG1lYWx8ZW58MXx8fHwxNzcxNDk3NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 45,
    type: 'non-veg',
    ingredients: ['Chicken', 'Yogurt', 'Lemon', 'Garlic', 'Ginger', 'Red Chili', 'Turmeric', 'Cumin'],
    instructions: [
      'Mix yogurt with all spices, ginger, garlic, and lemon juice',
      'Marinate chicken pieces for at least 2 hours',
      'Preheat grill to medium-high heat',
      'Grill chicken for 15-20 minutes, turning occasionally',
      'Ensure internal temperature reaches 165°F',
      'Let rest for 5 minutes before serving',
      'Serve with salad and dip'
    ],
    nutrition: { calories: 280, protein: 38, carbs: 5, fat: 12 }
  },
  {
    id: 'rec-3',
    title: 'Creamy Pasta Alfredo',
    image: 'https://images.unsplash.com/photo-1609166639722-47053ca112ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW4lMjBmb29kfGVufDF8fHx8MTc3MTU0MTEwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 25,
    type: 'veg',
    ingredients: ['Pasta', 'Butter', 'Cheese', 'Milk', 'Garlic', 'Bell Pepper'],
    instructions: [
      'Cook pasta according to package directions',
      'In a pan, melt butter and sauté minced garlic',
      'Add milk and bring to a simmer',
      'Add grated cheese and stir until melted',
      'Toss cooked pasta in the sauce',
      'Add sautéed bell peppers',
      'Season with salt and pepper',
      'Garnish with parsley and serve hot'
    ],
    nutrition: { calories: 450, protein: 15, carbs: 52, fat: 20 }
  },
  {
    id: 'rec-4',
    title: 'Fresh Garden Salad',
    image: 'https://images.unsplash.com/photo-1620019989479-d52fcedd99fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwYm93bHxlbnwxfHx8fDE3NzE1NjkwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 10,
    type: 'veg',
    ingredients: ['Tomato', 'Carrot', 'Bell Pepper', 'Onion', 'Lemon'],
    instructions: [
      'Chop all vegetables into bite-size pieces',
      'Mix vegetables in a large bowl',
      'Squeeze fresh lemon juice over the salad',
      'Add salt and pepper to taste',
      'Toss well to combine',
      'Serve immediately'
    ],
    nutrition: { calories: 85, protein: 3, carbs: 18, fat: 1 }
  },
  {
    id: 'rec-5',
    title: 'Chicken Biryani',
    image: 'https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzcxNDgwODk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 60,
    type: 'non-veg',
    ingredients: ['Chicken', 'Rice', 'Onion', 'Tomato', 'Yogurt', 'Ginger', 'Garlic', 'Garam Masala', 'Turmeric', 'Cumin'],
    instructions: [
      'Marinate chicken with yogurt and spices for 30 minutes',
      'Cook rice until 70% done, drain and set aside',
      'Fry sliced onions until golden brown',
      'In a pot, layer marinated chicken, then rice, then fried onions',
      'Cover and cook on low heat for 25 minutes',
      'Let it rest for 5 minutes',
      'Mix gently and serve hot with raita'
    ],
    nutrition: { calories: 520, protein: 32, carbs: 58, fat: 18 }
  },
  {
    id: 'rec-6',
    title: 'Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1588988949118-c86ba9c9c225?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1hcmdoZXJpdGElMjBmb29kfGVufDF8fHx8MTc3MTUyMzEyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 30,
    type: 'veg',
    ingredients: ['Wheat Flour', 'Tomato', 'Cheese', 'Garlic', 'Butter'],
    instructions: [
      'Prepare pizza dough and let it rise for 1 hour',
      'Roll out dough into a circle',
      'Spread tomato sauce evenly',
      'Add mozzarella cheese generously',
      'Drizzle with garlic butter',
      'Bake at 450°F for 12-15 minutes',
      'Slice and serve hot'
    ],
    nutrition: { calories: 380, protein: 16, carbs: 45, fat: 16 }
  },
  {
    id: 'rec-7',
    title: 'Tom Yum Soup',
    image: 'https://images.unsplash.com/photo-1714271201329-878f05aa0991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwc291cCUyMG5vb2RsZXN8ZW58MXx8fHwxNzcxNTc2ODg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 20,
    type: 'non-veg',
    ingredients: ['Fish', 'Tomato', 'Lemon', 'Ginger', 'Garlic', 'Red Chili'],
    instructions: [
      'Boil water with ginger and garlic',
      'Add fish pieces and cook for 5 minutes',
      'Add tomatoes and red chili',
      'Simmer for 10 minutes',
      'Add lemon juice before serving',
      'Garnish with coriander',
      'Serve hot'
    ],
    nutrition: { calories: 180, protein: 22, carbs: 8, fat: 6 }
  },
  {
    id: 'rec-8',
    title: 'Grilled Steak',
    image: 'https://images.unsplash.com/photo-1733106732782-f9592fdfdbb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGJlZWYlMjBkaW5uZXJ8ZW58MXx8fHwxNzcxNDkxMDIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 25,
    type: 'non-veg',
    ingredients: ['Beef', 'Garlic', 'Butter', 'Red Chili'],
    instructions: [
      'Season beef with salt, pepper, and garlic',
      'Let it rest at room temperature for 30 minutes',
      'Preheat grill to high heat',
      'Grill steak for 4-5 minutes per side for medium-rare',
      'Add butter on top while resting',
      'Let rest for 5 minutes',
      'Slice and serve with vegetables'
    ],
    nutrition: { calories: 420, protein: 42, carbs: 2, fat: 26 }
  },
  {
    id: 'rec-9',
    title: 'Sushi Rolls',
    image: 'https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NzE1MDIxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 40,
    type: 'non-veg',
    ingredients: ['Rice', 'Fish', 'Carrot', 'Cucumber'],
    instructions: [
      'Cook sushi rice and season with vinegar',
      'Slice fish and vegetables into thin strips',
      'Place nori sheet on bamboo mat',
      'Spread rice evenly on nori',
      'Add fish and vegetables in the center',
      'Roll tightly using the mat',
      'Slice into pieces and serve with soy sauce'
    ],
    nutrition: { calories: 290, protein: 14, carbs: 48, fat: 4 }
  },
  {
    id: 'rec-10',
    title: 'Classic Burger',
    image: 'https://images.unsplash.com/photo-1599909278854-31a4930d5b7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBzYW5kd2ljaCUyMG1lYWx8ZW58MXx8fHwxNzcxNDgyMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 20,
    type: 'non-veg',
    ingredients: ['Beef', 'Wheat Flour', 'Cheese', 'Tomato', 'Onion', 'Garlic'],
    instructions: [
      'Form beef into patties and season well',
      'Grill patties for 4 minutes per side',
      'Toast burger buns lightly',
      'Add cheese on patty in last minute of cooking',
      'Assemble: bun, patty, tomato, onion',
      'Add your favorite sauce',
      'Serve with fries'
    ],
    nutrition: { calories: 580, protein: 32, carbs: 42, fat: 30 }
  },
  {
    id: 'rec-11',
    title: 'Dal Tadka',
    image: 'https://images.unsplash.com/photo-1767114915989-c6ab3c8fc42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWwlMjBsZW50aWwlMjBpbmRpYW58ZW58MXx8fHwxNzcxNTc2ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 30,
    type: 'veg',
    ingredients: ['Lentils', 'Tomato', 'Onion', 'Ginger', 'Garlic', 'Cumin', 'Turmeric', 'Red Chili', 'Butter'],
    instructions: [
      'Pressure cook lentils with turmeric until soft',
      'Heat butter in a pan',
      'Add cumin seeds and let them splutter',
      'Add chopped onions, ginger, and garlic',
      'Add tomatoes and cook until soft',
      'Add red chili and other spices',
      'Pour this tempering over cooked lentils',
      'Simmer for 5 minutes and serve hot with rice'
    ],
    nutrition: { calories: 240, protein: 14, carbs: 36, fat: 6 }
  },
  {
    id: 'rec-12',
    title: 'Paneer Tikka',
    image: 'https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjB0aWtrYSUyMGluZGlhbnxlbnwxfHx8fDE3NzE1MTczMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 30,
    type: 'veg',
    ingredients: ['Paneer', 'Yogurt', 'Bell Pepper', 'Onion', 'Ginger', 'Garlic', 'Garam Masala', 'Red Chili', 'Lemon'],
    instructions: [
      'Cut paneer and vegetables into cubes',
      'Mix yogurt with all spices, ginger, garlic, and lemon juice',
      'Marinate paneer and vegetables for 1 hour',
      'Thread onto skewers alternating paneer and vegetables',
      'Grill or bake at 400°F for 15-20 minutes',
      'Turn occasionally for even cooking',
      'Serve hot with mint chutney'
    ],
    nutrition: { calories: 290, protein: 16, carbs: 12, fat: 20 }
  }
];

export interface Festival {
  id: string;
  name: string;
  date: string; // format: MM-DD
  description: string;
}

export const festivals: Festival[] = [
  { id: 'fest-1', name: 'Navratri', date: '10-15', description: 'Nine nights of devotion' },
  { id: 'fest-2', name: 'Ramadan', date: '03-23', description: 'Month of fasting' },
  { id: 'fest-3', name: 'Diwali', date: '11-01', description: 'Festival of lights' },
  { id: 'fest-4', name: 'Holi', date: '03-25', description: 'Festival of colors' },
  { id: 'fest-5', name: 'Janmashtami', date: '08-26', description: 'Birth of Krishna' },
  { id: 'fest-6', name: 'Pongal', date: '01-15', description: 'Harvest festival' },
];
