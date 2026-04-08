// Mock data for recipes and ingredients

export interface RecipeIngredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  cookingTime: number; // total time
  prepTime: number;
  bakingTime: number;
  restingTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  type: 'veg' | 'non-veg';
  mealType?: string[];
  ingredients: string[]; // for backwards compatibility and search
  ingredientsWithQuantities: RecipeIngredient[];
  instructions: string[];
  utensils: string[];
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
  { id: 'ing-1', name: 'Tomato', category: 'vegetables', image: 'https://tse1.mm.bing.net/th/id/OIP.cvziDnZ7HIp9xl6pfFgD7QHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'ing-2', name: 'Onion', category: 'vegetables', image: 'https://wallpaperaccess.com/full/1912934.jpg' },
  { id: 'ing-3', name: 'Potato', category: 'vegetables', image: 'https://media.istockphoto.com/photos/three-potatoes-picture-id157430678?k=6&m=157430678&s=612x612&w=0&h=3A77PeFuUUqoC4EVZaydkd6tSakZSWO61T21bMn4KLQ=' },
  { id: 'ing-4', name: 'Carrot', category: 'vegetables', image: 'https://tse3.mm.bing.net/th/id/OIP.wf5c-InE-s85aOy0bsX_awHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'ing-5', name: 'Spinach', category: 'vegetables', image: 'https://archziner.com/wp-content/uploads/2022/04/spinach-leaves-in-a-bunch-against-hair-loss.jpeg' },
  { id: 'ing-6', name: 'Bell Pepper', category: 'vegetables', image: 'https://tse1.mm.bing.net/th/id/OIP.PWBhssC0B9DPcLMpJxGYywHaLH?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'ing-7', name: 'Broccoli', category: 'vegetables', image: 'https://tse3.mm.bing.net/th/id/OIP.KSsLTsX2XD2f8PueU1YrEQHaHF?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'ing-8', name: 'Cauliflower', category: 'vegetables', image: 'https://tse4.mm.bing.net/th/id/OIP.7VKEPwN7lkOh_8ExXkBjBAHaHa?w=612&h=612&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'ing-31', name: 'Cucumber', category: 'vegetables', image: 'https://as1.ftcdn.net/v2/jpg/05/26/96/64/1000_F_526966424_IKdZwaLifU2gdVYsx2DeEUT3fh8qdad2.jpg' },
  { id: 'ing-32', name: 'Mushroom', category: 'vegetables', image: 'https://kidseatincolor.com/wp-content/uploads/2022/02/Mushrooms-e1648679114641.jpeg' },

  // Fruits
  { id: 'ing-9', name: 'Lemon', category: 'fruits', image: 'https://t4.ftcdn.net/jpg/02/55/39/77/360_F_255397744_rwNCund3WjKsrsv6yKKpK8tzmJ8sYRnF.jpg' },
  { id: 'ing-10', name: 'Mango', category: 'fruits', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200' },
  { id: 'ing-33', name: 'Orange', category: 'fruits', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=200' },
  { id: 'ing-34', name: 'Strawberry', category: 'fruits', image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=200' },

  // Spices
  { id: 'ing-11', name: 'Turmeric', category: 'spices', image: 'https://tse4.mm.bing.net/th/id/OIP.VJCKeYQytoyoVBiuHtd8KgHaE8?w=2048&h=1366&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'ing-12', name: 'Cumin', category: 'spices', image: 'https://static.vecteezy.com/system/resources/previews/021/068/210/large_2x/cumin-seeds-pile-of-cumin-seeds-or-caraway-isolated-on-white-background-photo.jpg' },
  { id: 'ing-13', name: 'Coriander', category: 'spices', image: 'https://5.imimg.com/data5/UJ/XR/NK/SELLER-50068616/fresh-coriander-leaves-500x500.jpg' },
  { id: 'ing-14', name: 'Garam Masala', category: 'spices', image: 'https://tse2.mm.bing.net/th/id/OIP.PbpM7Fg1-qIjALHVegvcYgAAAA?w=474&h=228&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'ing-15', name: 'Red Chili', category: 'spices', image: 'https://tse4.mm.bing.net/th/id/OIP.SssDyziok5ts9l4HkpP1TAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'ing-16', name: 'Garlic', category: 'spices', image: 'https://tse1.mm.bing.net/th/id/OIP.PUi1V-q3QZZLZFc40f9h3AHaE9?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'ing-17', name: 'Ginger', category: 'spices', image: 'https://cdn.britannica.com/72/140372-050-094484AF/ginger-root.jpg' },
  { id: 'ing-35', name: 'Star Anise', category: 'spices', image: 'https://vistapointe.net/images/star-anise-9.jpg' },
  { id: 'ing-36', name: 'Cardamom', category: 'spices', image: 'https://tse1.mm.bing.net/th/id/OIP.u3DPiQts-PIMBqODQ7-yeQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3' },

  // Dairy
  { id: 'ing-18', name: 'Milk', category: 'dairy', image: 'https://parade.com/.image/w_3840,q_auto:good,c_fill,ar_1:1/MjA2MTU2NzU1MTcxMDI2MzMx/what-milk-cravings-mean.jpg' },
  { id: 'ing-19', name: 'Yogurt', category: 'dairy', image: 'https://static.vecteezy.com/system/resources/previews/030/661/107/non_2x/yogurt-with-white-background-high-quality-ultra-hd-free-photo.jpg' },
  { id: 'ing-20', name: 'Paneer', category: 'dairy', image: 'https://2.bp.blogspot.com/-vVezhTxvrS0/V21QtDuZ3sI/AAAAAAAAOug/uJgFe0jG39INs1hINhFnCoSEhBAD4ujDQCLcB/s1600/tofu%2Bbowl.jpg' },
  { id: 'ing-21', name: 'Butter', category: 'dairy', image: 'https://www.southernliving.com/thmb/JOV1II4ho49bEI50Drk4RDtDK1Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/How_To_Soften_Butter_013-2000-61e8b4e1ad9c431887472483ae714dbb.jpg' },
  { id: 'ing-22', name: 'Cheese', category: 'dairy', image: 'https://static.vecteezy.com/system/resources/thumbnails/024/057/271/small_2x/delicious-piece-of-cheddar-cheese-without-packaging-on-white-background-emmental-cheese-wedge-swiss-italian-dairy-fresh-organic-product-for-cheese-festival-food-or-world-cheese-day-by-ai-generated-free-photo.jpg' },

  // Meat
  { id: 'ing-23', name: 'Chicken', category: 'meat', image: 'https://img.freepik.com/premium-photo/raw-chicken_970137-83258.jpg' },
  { id: 'ing-24', name: 'Beef', category: 'meat', image: 'https://carnivorestyle.com/wp-content/uploads/2022/11/The-Best-Raw-Beef-Dish-Featured-Image.webp' },
  { id: 'ing-25', name: 'Fish', category: 'meat', image: 'https://static.vecteezy.com/system/resources/previews/024/189/392/non_2x/various-raw-fish-in-a-row-white-background-seafood-assortment-menu-ai-generated-photo.jpeg' },
  { id: 'ing-26', name: 'Mutton', category: 'meat', image: 'https://thekitchencommunity.org/wp-content/uploads/2022/10/mutton-meat.jpeg' },
  { id: 'ing-37', name: 'Egg', category: 'meat', image: 'https://www.nutritionfact.in/wp-content/uploads/2022/06/egg.jpg' },
  { id: 'ing-38', name: 'Lamb', category: 'meat', image: 'https://herfeast.com/wp-content/uploads/2025/03/foodmacro_Herb-Crusted_Rack_of_Lamb_Amateur_photo_from_Reddit_t_49d87330-e601-42c3-90e1-3315d9d41c7f.png' },

  // Grains
  { id: 'ing-27', name: 'Rice', category: 'grains', image: 'https://static.vecteezy.com/system/resources/previews/001/899/049/non_2x/close-up-of-milled-rice-in-bowls-free-photo.jpg' },
  { id: 'ing-28', name: 'Wheat Flour', category: 'grains', image: 'https://www.aahaimpex.in/wp-content/uploads/2018/06/Wheat-Flour.png' },
  { id: 'ing-29', name: 'Lentils', category: 'grains', image: 'https://tse4.mm.bing.net/th/id/OIP.uFR_qst0sBurT4H10OdXfwHaHa?w=1000&h=1001&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'ing-30', name: 'Pasta', category: 'grains', image: 'https://www.shutterstock.com/image-photo/penne-rigate-pasta-isolated-on-260nw-1697165272.jpg' },
  { id: 'ing-39', name: 'Oats', category: 'grains', image: 'https://thumbs.dreamstime.com/b/rolled-oats-oat-flakes-bowl-concrete-background-closeup-view-healthy-eating-lifestyle-dieting-weight-loss-food-145529955.jpg' },
  { id: 'ing-40', name: 'Quinoa', category: 'grains', image: 'https://www.thespruceeats.com/thmb/rG32XsEzg6210Nb30loYltMJgwg=/1500x998/filters:fill(auto,1)/GettyImages-564075471-5b2f214c2f5a4944858ac1b2b51ed162.jpg' },
  { id: 'ing-41', name: 'Curry Leaves', category: 'spices', image: 'https://www.spiceandlife.com/wp-content/uploads/2022/07/Curry-Leaves.jpg' },
  { id: 'ing-42', name: 'Mustard Seeds', category: 'spices', image: 'https://sehattak.com/wp-content/uploads/2023/10/a-1.jpg' },
  { id: 'ing-43', name: 'Coconut', category: 'fruits', image: 'https://cdn.pixabay.com/photo/2017/08/24/06/29/coconut-2675546_1280.jpg' },
  { id: 'ing-44', name: 'Tamarind', category: 'spices', image: 'https://www.mashed.com/img/gallery/what-is-tamarind-and-what-does-it-taste-like/intro-1628801924.jpg' },
];

export const allRecipes: Recipe[] = [
  {
    id: 'rec-1',
    title: 'Palak Paneer',
    image: 'https://images.unsplash.com/photo-1742281257687-092746ad6021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2ZWdldGFyaWFuJTIwY3VycnklMjBmb29kfGVufDF8fHx8MTc3MTU3Njg4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 35,
    prepTime: 15,
    bakingTime: 20,
    restingTime: 0,
    difficulty: 'Easy',
    servings: 4,
    type: 'veg',
        mealType: ['lunch', 'dinner'],
    ingredients: ['Spinach', 'Paneer', 'Onion', 'Tomato', 'Ginger', 'Garlic', 'Cumin', 'Garam Masala', 'Butter'],
    ingredientsWithQuantities: [
      { name: 'Spinach', amount: 500, unit: 'g' },
      { name: 'Paneer', amount: 250, unit: 'g' },
      { name: 'Onion', amount: 1, unit: 'large' },
      { name: 'Tomato', amount: 2, unit: '' },
      { name: 'Ginger', amount: 1, unit: 'inch' },
      { name: 'Garlic', amount: 4, unit: 'cloves' },
      { name: 'Cumin', amount: 1, unit: 'tsp' },
      { name: 'Garam Masala', amount: 1, unit: 'tsp' },
      { name: 'Butter', amount: 2, unit: 'tbsp' }
    ],
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
    utensils: ['Large pot', 'Blender', 'Frying pan', 'Spatula'],
    nutrition: { calories: 320, protein: 18, carbs: 15, fat: 22 }
  },
  {
    id: 'rec-2',
    title: 'Grilled Chicken',
    image: 'https://images.unsplash.com/photo-1682423187670-4817da9a1b23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMG1lYWx8ZW58MXx8fHwxNzcxNDk3NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 45,
    prepTime: 15,
    bakingTime: 25,
    restingTime: 5,
    difficulty: 'Medium',
    servings: 2,
    type: 'non-veg',
        mealType: ['lunch', 'dinner'],
    ingredients: ['Chicken', 'Yogurt', 'Lemon', 'Garlic', 'Ginger', 'Red Chili', 'Turmeric', 'Cumin'],
    ingredientsWithQuantities: [
      { name: 'Chicken', amount: 500, unit: 'g' },
      { name: 'Yogurt', amount: 1, unit: 'cup' },
      { name: 'Lemon', amount: 1, unit: '' },
      { name: 'Garlic', amount: 1, unit: 'tbsp' },
      { name: 'Ginger', amount: 1, unit: 'tbsp' },
      { name: 'Red Chili', amount: 1, unit: 'tsp' },
      { name: 'Turmeric', amount: 0.5, unit: 'tsp' },
      { name: 'Cumin', amount: 1, unit: 'tsp' }
    ],
    instructions: [
      'Mix yogurt with all spices, ginger, garlic, and lemon juice',
      'Marinate chicken pieces for at least 2 hours',
      'Preheat grill to medium-high heat',
      'Grill chicken for 15-20 minutes, turning occasionally',
      'Ensure internal temperature reaches 165°F',
      'Let rest for 5 minutes before serving',
      'Serve with salad and dip'
    ],
    utensils: ['Grill pan', 'Mixing bowl', 'Tongs'],
    nutrition: { calories: 280, protein: 38, carbs: 5, fat: 12 }
  },
  {
    id: 'rec-3',
    title: 'Creamy Pasta Alfredo',
    image: 'https://images.unsplash.com/photo-1609166639722-47053ca112ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW4lMjBmb29kfGVufDF8fHx8MTc3MTU0MTEwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 25,
    prepTime: 10,
    bakingTime: 15,
    restingTime: 0,
    difficulty: 'Easy',
    servings: 2,
    type: 'veg',
        mealType: ['dinner'],
    ingredients: ['Pasta', 'Butter', 'Cheese', 'Milk', 'Garlic', 'Bell Pepper'],
    ingredientsWithQuantities: [
      { name: 'Pasta', amount: 200, unit: 'g' },
      { name: 'Butter', amount: 50, unit: 'g' },
      { name: 'Cheese', amount: 100, unit: 'g' },
      { name: 'Milk', amount: 200, unit: 'ml' },
      { name: 'Garlic', amount: 2, unit: 'cloves' },
      { name: 'Bell Pepper', amount: 1, unit: '' }
    ],
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
    utensils: ['Large pot', 'Sauté pan', 'Cheese grater'],
    nutrition: { calories: 450, protein: 15, carbs: 52, fat: 20 }
  },
  {
    id: 'rec-4',
    title: 'Fresh Garden Salad',
    image: 'https://images.unsplash.com/photo-1620019989479-d52fcedd99fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwYm93bHxlbnwxfHx8fDE3NzE1NjkwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 10,
    prepTime: 10,
    bakingTime: 0,
    restingTime: 0,
    difficulty: 'Easy',
    servings: 1,
    type: 'veg',
        mealType: ['lunch', 'snack'],
    ingredients: ['Tomato', 'Carrot', 'Bell Pepper', 'Onion', 'Lemon'],
    ingredientsWithQuantities: [
      { name: 'Tomato', amount: 2, unit: '' },
      { name: 'Carrot', amount: 1, unit: '' },
      { name: 'Bell Pepper', amount: 1, unit: '' },
      { name: 'Onion', amount: 0.5, unit: '' },
      { name: 'Lemon', amount: 0.5, unit: '' }
    ],
    instructions: [
      'Chop all vegetables into bite-size pieces',
      'Mix vegetables in a large bowl',
      'Squeeze fresh lemon juice over the salad',
      'Add salt and pepper to taste',
      'Toss well to combine',
      'Serve immediately'
    ],
    utensils: ['Knife', 'Cutting board', 'Large bowl'],
    nutrition: { calories: 85, protein: 3, carbs: 18, fat: 1 }
  },
  {
    id: 'rec-5',
    title: 'Chicken Biryani',
    image: 'https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzcxNDgwODk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 60,
    prepTime: 20,
    bakingTime: 35,
    restingTime: 5,
    difficulty: 'Hard',
    servings: 4,
    type: 'non-veg',
        mealType: ['lunch', 'dinner'],
    ingredients: ['Chicken', 'Rice', 'Onion', 'Tomato', 'Yogurt', 'Ginger', 'Garlic', 'Garam Masala', 'Turmeric', 'Cumin'],
    ingredientsWithQuantities: [
      { name: 'Chicken', amount: 800, unit: 'g' },
      { name: 'Rice', amount: 500, unit: 'g' },
      { name: 'Onion', amount: 3, unit: 'large' },
      { name: 'Tomato', amount: 2, unit: '' },
      { name: 'Yogurt', amount: 1, unit: 'cup' },
      { name: 'Ginger', amount: 2, unit: 'inch' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Garam Masala', amount: 2, unit: 'tsp' },
      { name: 'Turmeric', amount: 1, unit: 'tsp' },
      { name: 'Cumin', amount: 1, unit: 'tsp' }
    ],
    instructions: [
      'Marinate chicken with yogurt and spices for 30 minutes',
      'Cook rice until 70% done, drain and set aside',
      'Fry sliced onions until golden brown',
      'In a pot, layer marinated chicken, then rice, then fried onions',
      'Cover and cook on low heat for 25 minutes',
      'Let it rest for 5 minutes',
      'Mix gently and serve hot with raita'
    ],
    utensils: ['Heavy base pot', 'Rice cooker', 'Deep fryer'],
    nutrition: { calories: 520, protein: 32, carbs: 58, fat: 18 }
  },
  {
    id: 'rec-6',
    title: 'Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1588988949118-c86ba9c9c225?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1hcmdoZXJpdGElMjBmb29kfGVufDF8fHx8MTc3MTUyMzEyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 30,
    prepTime: 15,
    bakingTime: 15,
    restingTime: 60,
    difficulty: 'Medium',
    servings: 2,
    type: 'veg',
        mealType: ['dinner', 'snack'],
    ingredients: ['Wheat Flour', 'Tomato', 'Cheese', 'Garlic', 'Butter'],
    ingredientsWithQuantities: [
      { name: 'Wheat Flour', amount: 300, unit: 'g' },
      { name: 'Tomato', amount: 2, unit: '' },
      { name: 'Cheese', amount: 150, unit: 'g' },
      { name: 'Garlic', amount: 1, unit: 'tsp' },
      { name: 'Butter', amount: 1, unit: 'tbsp' }
    ],
    instructions: [
      'Prepare pizza dough and let it rise for 1 hour',
      'Roll out dough into a circle',
      'Spread tomato sauce evenly',
      'Add mozzarella cheese generously',
      'Drizzle with garlic butter',
      'Bake at 450°F for 12-15 minutes',
      'Slice and serve hot'
    ],
    utensils: ['Oven', 'Pizza cutter', 'Rolling pin'],
    nutrition: { calories: 380, protein: 16, carbs: 45, fat: 16 }
  },
  {
    id: 'rec-7',
    title: 'Tom Yum Soup',
    image: 'https://images.unsplash.com/photo-1714271201329-878f05aa0991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwc291cCUyMG5vb2RsZXN8ZW58MXx8fHwxNzcxNTc2ODg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 20,
    prepTime: 5,
    bakingTime: 15,
    restingTime: 0,
    difficulty: 'Easy',
    servings: 2,
    type: 'non-veg',
        mealType: ['dinner'],
    ingredients: ['Fish', 'Tomato', 'Lemon', 'Ginger', 'Garlic', 'Red Chili'],
    ingredientsWithQuantities: [
      { name: 'Fish', amount: 300, unit: 'g' },
      { name: 'Tomato', amount: 2, unit: '' },
      { name: 'Lemon', amount: 1, unit: '' },
      { name: 'Ginger', amount: 1, unit: 'inch' },
      { name: 'Garlic', amount: 2, unit: 'cloves' },
      { name: 'Red Chili', amount: 2, unit: '' }
    ],
    instructions: [
      'Boil water with ginger and garlic',
      'Add fish pieces and cook for 5 minutes',
      'Add tomatoes and red chili',
      'Simmer for 10 minutes',
      'Add lemon juice before serving',
      'Garnish with coriander',
      'Serve hot'
    ],
    utensils: ['Soup pot', 'Ladle'],
    nutrition: { calories: 180, protein: 22, carbs: 8, fat: 6 }
  },
  {
    id: 'rec-8',
    title: 'Grilled Steak',
    image: 'https://images.unsplash.com/photo-1733106732782-f9592fdfdbb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGJlZWYlMjBkaW5uZXJ8ZW58MXx8fHwxNzcxNDkxMDIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 25,
    prepTime: 5,
    bakingTime: 10,
    restingTime: 35,
    difficulty: 'Medium',
    servings: 1,
    type: 'non-veg',
        mealType: ['dinner'],
    ingredients: ['Beef', 'Garlic', 'Butter', 'Red Chili'],
    ingredientsWithQuantities: [
      { name: 'Beef', amount: 250, unit: 'g' },
      { name: 'Garlic', amount: 1, unit: 'clove' },
      { name: 'Butter', amount: 2, unit: 'tbsp' },
      { name: 'Red Chili', amount: 0.5, unit: 'tsp' }
    ],
    instructions: [
      'Season beef with salt, pepper, and garlic',
      'Let it rest at room temperature for 30 minutes',
      'Preheat grill to high heat',
      'Grill steak for 4-5 minutes per side for medium-rare',
      'Add butter on top while resting',
      'Let rest for 5 minutes',
      'Slice and serve with vegetables'
    ],
    utensils: ['Grill', 'Cast iron skillet', 'Tongs'],
    nutrition: { calories: 420, protein: 42, carbs: 2, fat: 26 }
  },
  {
    id: 'rec-9',
    title: 'Sushi Rolls',
    image: 'https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NzE1MDIxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 40,
    prepTime: 15,
    bakingTime: 25,
    restingTime: 0,
    difficulty: 'Hard',
    servings: 2,
    type: 'non-veg',
        mealType: ['lunch', 'dinner'],
    ingredients: ['Rice', 'Fish', 'Carrot', 'Cucumber'],
    ingredientsWithQuantities: [
      { name: 'Rice', amount: 200, unit: 'g' },
      { name: 'Fish', amount: 150, unit: 'g' },
      { name: 'Carrot', amount: 0.5, unit: '' },
      { name: 'Cucumber', amount: 0.5, unit: '' }
    ],
    instructions: [
      'Cook sushi rice and season with vinegar',
      'Slice fish and vegetables into thin strips',
      'Place nori sheet on bamboo mat',
      'Spread rice evenly on nori',
      'Add fish and vegetables in the center',
      'Roll tightly using the mat',
      'Slice into pieces and serve with soy sauce'
    ],
    utensils: ['Bamboo mat', 'Sharp knife', 'Rice cooker'],
    nutrition: { calories: 290, protein: 14, carbs: 48, fat: 4 }
  },
  {
    id: 'rec-10',
    title: 'Classic Burger',
    image: 'https://images.unsplash.com/photo-1599909278854-31a4930d5b7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBzYW5kd2ljaCUyMG1lYWx8ZW58MXx8fHwxNzcxNDgyMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 20,
    prepTime: 10,
    bakingTime: 10,
    restingTime: 0,
    difficulty: 'Easy',
    servings: 1,
    type: 'non-veg',
        mealType: ['lunch', 'dinner'],
    ingredients: ['Beef', 'Wheat Flour', 'Cheese', 'Tomato', 'Onion', 'Garlic'],
    ingredientsWithQuantities: [
      { name: 'Beef', amount: 200, unit: 'g' },
      { name: 'Buns', amount: 1, unit: '' },
      { name: 'Cheese', amount: 1, unit: 'slice' },
      { name: 'Tomato', amount: 1, unit: 'slice' },
      { name: 'Onion', amount: 1, unit: 'slice' },
      { name: 'Garlic', amount: 0.5, unit: 'tsp' }
    ],
    instructions: [
      'Form beef into patties and season well',
      'Grill patties for 4 minutes per side',
      'Toast burger buns lightly',
      'Add cheese on patty in last minute of cooking',
      'Assemble: bun, patty, tomato, onion',
      'Add your favorite sauce',
      'Serve with fries'
    ],
    utensils: ['Griddle', 'Spatula'],
    nutrition: { calories: 580, protein: 32, carbs: 42, fat: 30 }
  },
  {
    id: 'rec-11',
    title: 'Dal Tadka',
    image: 'https://images.unsplash.com/photo-1767114915989-c6ab3c8fc42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWwlMjBsZW50aWwlMjBpbmRpYW58ZW58MXx8fHwxNzcxNTc2ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 30,
    prepTime: 10,
    bakingTime: 20,
    restingTime: 0,
    difficulty: 'Easy',
    servings: 4,
    type: 'veg',
        mealType: ['lunch', 'dinner'],
    ingredients: ['Lentils', 'Tomato', 'Onion', 'Ginger', 'Garlic', 'Cumin', 'Turmeric', 'Red Chili', 'Butter'],
    ingredientsWithQuantities: [
      { name: 'Lentils', amount: 200, unit: 'g' },
      { name: 'Tomato', amount: 1, unit: '' },
      { name: 'Onion', amount: 1, unit: '' },
      { name: 'Ginger', amount: 1, unit: 'inch' },
      { name: 'Garlic', amount: 3, unit: 'cloves' },
      { name: 'Cumin', amount: 1, unit: 'tsp' },
      { name: 'Turmeric', amount: 0.5, unit: 'tsp' },
      { name: 'Red Chili', amount: 0.5, unit: 'tsp' },
      { name: 'Butter', amount: 1, unit: 'tbsp' }
    ],
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
    utensils: ['Pressure cooker', 'Tadka pan'],
    nutrition: { calories: 240, protein: 14, carbs: 36, fat: 6 }
  },
  {
    id: 'rec-12',
    title: 'Paneer Tikka',
    image: 'https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjB0aWtrYSUyMGluZGlhbnxlbnwxfHx8fDE3NzE1MTczMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cookingTime: 30,
    prepTime: 70,
    bakingTime: 20,
    restingTime: 0,
    difficulty: 'Medium',
    servings: 2,
    type: 'veg',
        mealType: ['snack', 'dinner'],
    ingredients: ['Paneer', 'Yogurt', 'Bell Pepper', 'Onion', 'Ginger', 'Garlic', 'Garam Masala', 'Red Chili', 'Lemon'],
    ingredientsWithQuantities: [
      { name: 'Paneer', amount: 300, unit: 'g' },
      { name: 'Yogurt', amount: 0.5, unit: 'cup' },
      { name: 'Bell Pepper', amount: 1, unit: '' },
      { name: 'Onion', amount: 1, unit: '' },
      { name: 'Ginger', amount: 1, unit: 'tsp' },
      { name: 'Garlic', amount: 1, unit: 'tsp' },
      { name: 'Garam Masala', amount: 1, unit: 'tsp' },
      { name: 'Red Chili', amount: 1, unit: 'tsp' },
      { name: 'Lemon', amount: 0.5, unit: '' }
    ],
    instructions: [
      'Cut paneer and vegetables into cubes',
      'Mix yogurt with all spices, ginger, garlic, and lemon juice',
      'Marinate paneer and vegetables for 1 hour',
      'Thread onto skewers alternating paneer and vegetables',
      'Grill or bake at 400°F for 15-20 minutes',
      'Turn occasionally for even cooking',
      'Serve hot with mint chutney'
    ],
    utensils: ['Skewers', 'Baking tray', 'Mixing bowl'],
    nutrition: { calories: 290, protein: 16, carbs: 12, fat: 20 }
  },
  {
    id: 'rec-13',
    title: 'Idli & Sambar',
    image: 'https://images.unsplash.com/photo-1589301773857-d04c4b38ad85?w=500&auto=format&fit=crop',
    cookingTime: 40,
    prepTime: 480,
    bakingTime: 25,
    restingTime: 0,
    difficulty: 'Medium',
    servings: 4,
    type: 'veg',
        mealType: ['breakfast'],
    ingredients: ['Rice', 'Lentils', 'Tomato', 'Onion', 'Curry Leaves', 'Mustard Seeds', 'Tamarind'],
    ingredientsWithQuantities: [
      { name: 'Rice', amount: 2, unit: 'cups' },
      { name: 'Lentils', amount: 1, unit: 'cup' },
      { name: 'Tomato', amount: 1, unit: '' },
      { name: 'Onion', amount: 1, unit: '' },
      { name: 'Curry Leaves', amount: 1, unit: 'sprig' },
      { name: 'Mustard Seeds', amount: 1, unit: 'tsp' },
      { name: 'Tamarind', amount: 30, unit: 'g' }
    ],
    instructions: [
      'Soak rice and lentils separately for 4-6 hours',
      'Grind into a smooth batter and ferment overnight',
      'Steam batter in idli molds for 10-12 minutes',
      'Cook lentils with vegetables and tamarind pulp for sambar',
      'Prepare tempering with mustard seeds and curry leaves',
      'Add tempering to sambar',
      'Serve hot idlis with sambar and coconut chutney'
    ],
    utensils: ['Idli steamer', 'Wet grinder', 'Pot'],
    nutrition: { calories: 250, protein: 8, carbs: 45, fat: 4 }
  },
  {
    id: 'rec-14',
    title: 'Bisi Bele Bath',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop',
    cookingTime: 50,
    prepTime: 15,
    bakingTime: 35,
    restingTime: 0,
    difficulty: 'Medium',
    servings: 2,
    type: 'veg',
        mealType: ['lunch'],
    ingredients: ['Rice', 'Lentils', 'Carrot', 'Potato', 'Bell Pepper', 'Curry Leaves', 'Coconut', 'Tamarind'],
    ingredientsWithQuantities: [
      { name: 'Rice', amount: 1, unit: 'cup' },
      { name: 'Lentils', amount: 0.5, unit: 'cup' },
      { name: 'Carrot', amount: 1, unit: '' },
      { name: 'Potato', amount: 1, unit: '' },
      { name: 'Bell Pepper', amount: 1, unit: '' },
      { name: 'Curry Leaves', amount: 1, unit: 'sprig' },
      { name: 'Coconut', amount: 2, unit: 'tbsp' },
      { name: 'Tamarind', amount: 15, unit: 'g' }
    ],
    instructions: [
      'Cook rice and lentils together until soft',
      'Sauté vegetables with bisi bele bath spice powder',
      'Add tamarind pulp and salt',
      'Mix cooked rice and lentils with vegetables',
      'Add grated coconut and simmer for 5 minutes',
      'Top with ghee and serve hot with papadum'
    ],
    utensils: ['Pressure cooker', 'Sauté pan'],
    nutrition: { calories: 420, protein: 12, carbs: 65, fat: 14 }
  },
  {
    id: 'rec-15',
    title: 'Chicken Chettinad',
    image: 'https://images.unsplash.com/photo-1603894584711-744317138382?w=500&auto=format&fit=crop',
    cookingTime: 55,
    prepTime: 20,
    bakingTime: 35,
    restingTime: 0,
    difficulty: 'Hard',
    servings: 3,
    type: 'non-veg',
        mealType: ['lunch', 'dinner'],
    ingredients: ['Chicken', 'Onion', 'Tomato', 'Ginger', 'Garlic', 'Star Anise', 'Curry Leaves', 'Coconut'],
    ingredientsWithQuantities: [
      { name: 'Chicken', amount: 600, unit: 'g' },
      { name: 'Onion', amount: 2, unit: '' },
      { name: 'Tomato', amount: 1, unit: '' },
      { name: 'Ginger', amount: 1, unit: 'tsp' },
      { name: 'Garlic', amount: 1, unit: 'tsp' },
      { name: 'Star Anise', amount: 2, unit: '' },
      { name: 'Curry Leaves', amount: 1, unit: 'sprig' },
      { name: 'Coconut', amount: 0.5, unit: 'cup' }
    ],
    instructions: [
      'Roast dry spices and coconut, then grind into a paste',
      'Heat oil and sauté onions, curry leaves, and ginger-garlic paste',
      'Add tomatoes and cook until soft',
      'Add chicken pieces and the prepared spice paste',
      'Cook until chicken is tender and gravy thickens',
      'Garnish with fresh coriander',
      'Serve hot with paratha or rice'
    ],
    utensils: ['Spice grinder', 'Deep pot'],
    nutrition: { calories: 480, protein: 35, carbs: 12, fat: 32 }
  },
  {
    id: 'rec-16',
    title: 'Ven Pongal',
    image: '/images/ven-pongal.jpg',
    cookingTime: 30,
    prepTime: 10,
    bakingTime: 20,
    restingTime: 0,
    difficulty: 'Easy',
    servings: 4,
    type: 'veg',
        mealType: ['breakfast'],
    ingredients: ['Rice', 'Lentils', 'Butter', 'Ginger', 'Cumin', 'Curry Leaves', 'Mustard Seeds'],
    ingredientsWithQuantities: [
      { name: 'Rice', amount: 1, unit: 'cup' },
      { name: 'Lentils', amount: 0.5, unit: 'cup' },
      { name: 'Butter', amount: 3, unit: 'tbsp' },
      { name: 'Ginger', amount: 1, unit: 'inch' },
      { name: 'Cumin', amount: 1, unit: 'tsp' },
      { name: 'Curry Leaves', amount: 1, unit: 'sprig' },
      { name: 'Mustard Seeds', amount: 0.5, unit: 'tsp' }
    ],
    instructions: [
      'Dry roast the moong dal (lentils) until golden',
      'Wash and cook rice and dal together in a pressure cooker with 4 cups water',
      'Cook for 3-4 whistles until very soft and mushy',
      'Heat butter in a tadka pan, add mustard seeds and cumin',
      'Add curry leaves and finely chopped ginger, sauté briefly',
      'Add cashews and fry until golden',
      'Pour the tempering over the pongal and mix well',
      'Season with salt and pepper generously',
      'Serve piping hot with coconut chutney and sambar'
    ],
    utensils: ['Pressure cooker', 'Tadka pan', 'Ladle'],
    nutrition: { calories: 310, protein: 10, carbs: 48, fat: 10 }
  },
  {
    id: 'rec-17',
    title: 'Crispy Dosa & Coconut Chutney',
    image: 'https://source.unsplash.com/600x400/?dosa,indian-breakfast',
    cookingTime: 30,
    prepTime: 480,
    bakingTime: 5,
    restingTime: 0,
    difficulty: 'Medium',
    servings: 4,
    type: 'veg',
        mealType: ['breakfast', 'dinner'],
    ingredients: ['Rice', 'Lentils', 'Coconut', 'Curry Leaves', 'Mustard Seeds', 'Ginger'],
    ingredientsWithQuantities: [
      { name: 'Rice', amount: 3, unit: 'cups' },
      { name: 'Lentils', amount: 1, unit: 'cup' },
      { name: 'Coconut', amount: 1, unit: 'cup' },
      { name: 'Curry Leaves', amount: 2, unit: 'sprigs' },
      { name: 'Mustard Seeds', amount: 1, unit: 'tsp' },
      { name: 'Ginger', amount: 0.5, unit: 'inch' }
    ],
    instructions: [
      'Soak rice and lentils separately for 6-8 hours',
      'Grind both into a smooth, slightly thick batter and mix together',
      'Add salt and ferment overnight in a warm place',
      'For chutney: blend coconut, green chili, and ginger into a paste',
      'Prepare tempering with mustard seeds and curry leaves, add to chutney',
      'Heat a flat tawa (griddle) until very hot',
      'Pour a ladle of batter and spread in a circular motion for a thin crepe',
      'Drizzle oil on edges and cook until golden and crispy',
      'Serve hot with coconut chutney and sambar'
    ],
    utensils: ['Wet grinder or blender', 'Flat tawa/griddle', 'Ladle', 'Spatula'],
    nutrition: { calories: 220, protein: 7, carbs: 40, fat: 5 }
  },
  {
    id: 'rec-18',
    title: 'Rava Upma',
    image: 'https://source.unsplash.com/600x400/?upma,semolina,indian-food',
    cookingTime: 20,
    prepTime: 5,
    bakingTime: 15,
    restingTime: 0,
    difficulty: 'Easy',
    servings: 2,
    type: 'veg',
        mealType: ['breakfast'],
    ingredients: ['Onion', 'Tomato', 'Carrot', 'Spinach', 'Mustard Seeds', 'Curry Leaves', 'Ginger', 'Butter', 'Cumin'],
    ingredientsWithQuantities: [
      { name: 'Onion', amount: 1, unit: 'medium' },
      { name: 'Tomato', amount: 1, unit: '' },
      { name: 'Carrot', amount: 1, unit: 'small' },
      { name: 'Spinach', amount: 50, unit: 'g' },
      { name: 'Mustard Seeds', amount: 1, unit: 'tsp' },
      { name: 'Curry Leaves', amount: 1, unit: 'sprig' },
      { name: 'Ginger', amount: 0.5, unit: 'inch' },
      { name: 'Butter', amount: 2, unit: 'tbsp' },
      { name: 'Cumin', amount: 0.5, unit: 'tsp' }
    ],
    instructions: [
      'Dry roast sooji (semolina/rava) on low heat until fragrant and golden, set aside',
      'Heat butter in a heavy pan, splutter mustard seeds and cumin',
      'Add curry leaves, green chili, and ginger, sauté for 30 seconds',
      'Add chopped onion and fry until golden',
      'Add chopped tomatoes and diced vegetables, cook until soft',
      'Add 2 cups of boiling water and salt, bring to a boil',
      'Add roasted rava slowly while stirring continuously to avoid lumps',
      'Cover and cook on low heat for 5 minutes until water is absorbed',
      'Serve hot with coconut chutney and lemon wedge'
    ],
    utensils: ['Heavy-bottomed pan', 'Wooden spoon', 'Lid'],
    nutrition: { calories: 265, protein: 6, carbs: 44, fat: 8 }
  },
  {
    id: 'rec-19',
    title: 'Medu Vada',
    image: 'https://source.unsplash.com/600x400/?medu-vada,vada,south-indian',
    cookingTime: 30,
    prepTime: 240,
    bakingTime: 20,
    restingTime: 0,
    difficulty: 'Medium',
    servings: 4,
    type: 'veg',
        mealType: ['breakfast', 'snack'],
    ingredients: ['Lentils', 'Onion', 'Ginger', 'Cumin', 'Curry Leaves', 'Red Chili'],
    ingredientsWithQuantities: [
      { name: 'Lentils', amount: 2, unit: 'cups' },
      { name: 'Onion', amount: 1, unit: 'medium' },
      { name: 'Ginger', amount: 1, unit: 'inch' },
      { name: 'Cumin', amount: 1, unit: 'tsp' },
      { name: 'Curry Leaves', amount: 2, unit: 'sprigs' },
      { name: 'Red Chili', amount: 2, unit: '' }
    ],
    instructions: [
      'Soak urad dal (black lentils) for 3-4 hours, drain well',
      'Grind into a thick, fluffy batter with minimal water (do not add too much water)',
      'Add finely chopped onion, ginger, curry leaves, cumin, and salt',
      'Mix batter vigorously with hand to incorporate air (makes vadas light)',
      'Heat oil in a deep pan to 180°C for deep frying',
      'Wet your hands, shape batter into a donut shape with a hole in the center',
      'Gently slide into hot oil and fry until golden brown, flipping once',
      'Drain on paper towels',
      'Serve hot with coconut chutney and sambar for dipping'
    ],
    utensils: ['Wet grinder or blender', 'Deep frying kadai', 'Slotted spoon', 'Paper towels'],
    nutrition: { calories: 195, protein: 9, carbs: 28, fat: 6 }
  },
  {
    id: 'rec-20',
    title: 'Puttu & Kadala Curry',
    image: 'https://source.unsplash.com/600x400/?puttu,kerala-breakfast,steamed',
    cookingTime: 35,
    prepTime: 15,
    bakingTime: 20,
    restingTime: 0,
    difficulty: 'Medium',
    servings: 3,
    type: 'veg',
        mealType: ['breakfast'],
    ingredients: ['Rice', 'Coconut', 'Lentils', 'Onion', 'Tomato', 'Turmeric', 'Mustard Seeds', 'Curry Leaves', 'Coriander'],
    ingredientsWithQuantities: [
      { name: 'Rice', amount: 2, unit: 'cups' },
      { name: 'Coconut', amount: 1, unit: 'cup' },
      { name: 'Lentils', amount: 1.5, unit: 'cups' },
      { name: 'Onion', amount: 1, unit: 'large' },
      { name: 'Tomato', amount: 2, unit: '' },
      { name: 'Turmeric', amount: 0.5, unit: 'tsp' },
      { name: 'Mustard Seeds', amount: 1, unit: 'tsp' },
      { name: 'Curry Leaves', amount: 2, unit: 'sprigs' },
      { name: 'Coriander', amount: 1, unit: 'tsp' }
    ],
    instructions: [
      'Soak black chickpeas (black chana) overnight, cook in pressure cooker until soft',
      'Mix rice flour with grated coconut and a pinch of salt until it resembles breadcrumbs',
      'Steam the rice-coconut mixture in a puttu maker or idli mold in layers with coconut',
      'For curry: heat oil, splutter mustard seeds and curry leaves',
      'Sauté onions until golden, add ginger-garlic paste',
      'Add tomatoes, turmeric, coriander, and chili powder, cook until thick',
      'Add cooked chickpeas and coconut milk, simmer for 10 minutes',
      'Garnish with fresh coriander leaves',
      'Serve steamed puttu alongside the rich kadala curry'
    ],
    utensils: ['Pressure cooker', 'Puttu maker/steamer', 'Deep pan'],
    nutrition: { calories: 355, protein: 13, carbs: 60, fat: 9 }
  },
  {
    id: 'rec-21',
    title: 'Chettinad Fish Curry',
    image: 'https://images.unsplash.com/photo-1626778486950-51a8ba71686c?w=500&auto=format&fit=crop',
    cookingTime: 40,
    prepTime: 20,
    bakingTime: 0,
    restingTime: 30,
    difficulty: 'Hard',
    servings: 4,
    type: 'non-veg',
        mealType: ['lunch'],
    ingredients: ['Fish', 'Tomato', 'Onion', 'Tamarind', 'Garlic', 'Curry Leaves', 'Mustard Seeds', 'Coconut'],
    ingredientsWithQuantities: [
      { name: 'Fish', amount: 500, unit: 'g' },
      { name: 'Onion', amount: 2, unit: 'medium' },
      { name: 'Tomato', amount: 2, unit: 'medium' },
      { name: 'Tamarind', amount: 30, unit: 'g' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Mustard Seeds', amount: 1, unit: 'tsp' },
      { name: 'Curry Leaves', amount: 2, unit: 'sprigs' },
      { name: 'Coconut', amount: 0.5, unit: 'cup' }
    ],
    instructions: [
      'Extract tamarind juice by soaking tamarind in warm water',
      'Dry roast coriander seeds, dry red chilies, fennel, and coconut, then grind to a smooth paste',
      'Heat sesame oil in a clay pot or pan, splutter mustard seeds and fenugreek',
      'Add curry leaves, crushed garlic, and chopped onions, sauté until golden',
      'Add tomatoes and cook until mushy',
      'Pour in tamarind extract, ground masala paste, turmeric, and salt to taste',
      'Bring to a boil and let it simmer until the raw smell leaves and oil separates',
      'Gently slide in washed fish pieces',
      'Cook covered on low flame for 5-7 minutes until fish is cooked',
      'Serve hot with steamed rice or idli'
    ],
    utensils: ['Clay pot or deep pan', 'Mixer grinder', 'Ladle'],
    nutrition: { calories: 350, protein: 28, carbs: 12, fat: 22 }
  },
  {
    id: 'rec-22',
    title: 'Ambur Mutton Biryani',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop',
    cookingTime: 60,
    prepTime: 30,
    bakingTime: 0,
    restingTime: 20,
    difficulty: 'Hard',
    servings: 5,
    type: 'non-veg',
        mealType: ['lunch'],
    ingredients: ['Mutton', 'Rice', 'Tomato', 'Onion', 'Garlic', 'Ginger', 'Yogurt', 'Red Chili'],
    ingredientsWithQuantities: [
      { name: 'Mutton', amount: 500, unit: 'g' },
      { name: 'Seeraga Samba Rice', amount: 2.5, unit: 'cups' },
      { name: 'Onion', amount: 4, unit: 'medium' },
      { name: 'Tomato', amount: 3, unit: 'medium' },
      { name: 'Ginger', amount: 2, unit: 'tbsp' },
      { name: 'Garlic', amount: 2, unit: 'tbsp' },
      { name: 'Yogurt', amount: 0.5, unit: 'cup' },
      { name: 'Red Chili Paste', amount: 2, unit: 'tbsp' }
    ],
    instructions: [
      'Soak Seeraga Samba rice for 30 minutes',
      'Pressure cook mutton with a little ginger-garlic paste, salt, and water until tender',
      'In a thick bottom pan, heat oil and ghee, add whole spices (cloves, cinnamon, cardamom)',
      'Sauté thinly sliced onions until golden brown',
      'Add freshly ground ginger-garlic paste and sauté until raw smell goes',
      'Add red chili paste (made from soaked dry red chilies) and mix well',
      'Add chopped tomatoes, yogurt, mint, coriander leaves, and cook until oil separates',
      'Add cooked mutton pieces along with its stock (measure stock and add water to make 1:1.5 ratio to rice)',
      'Bring to a boil, add drained rice and check for salt',
      'Cover and cook on low heat for 15 minutes (Dum cooking)',
      'Let it rest for 20 minutes before gently fluffing and serving with onion raita'
    ],
    utensils: ['Heavy bottom wide pan with tight lid', 'Pressure cooker'],
    nutrition: { calories: 650, protein: 35, carbs: 65, fat: 28 }
  },
  {
    id: 'rec-23',
    title: 'Nattu Kozhi Kulambu',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop',
    cookingTime: 50,
    prepTime: 15,
    bakingTime: 0,
    restingTime: 0,
    difficulty: 'Medium',
    servings: 4,
    type: 'non-veg',
        mealType: ['lunch'],
    ingredients: ['Chicken', 'Onion', 'Tomato', 'Ginger', 'Garlic', 'Coconut', 'Curry Leaves', 'Turmeric'],
    ingredientsWithQuantities: [
      { name: 'Country Chicken (Bone-in)', amount: 750, unit: 'g' },
      { name: 'Small Onions (Shallots)', amount: 1.5, unit: 'cups' },
      { name: 'Tomato', amount: 2, unit: 'medium' },
      { name: 'Ginger', amount: 1, unit: 'inch' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Coconut', amount: 0.5, unit: 'cup' },
      { name: 'Curry Leaves', amount: 2, unit: 'sprigs' },
      { name: 'Turmeric', amount: 1, unit: 'tsp' }
    ],
    instructions: [
      'Dry roast coriander seeds, cumin, pepper, and red chilies, then powder them',
      'Grind shredded coconut and a few shallots into a smooth paste',
      'Heat sesame oil in a pressure cooker or heavy pan, splutter mustard seeds and curry leaves',
      'Sauté the peeled whole shallots (small onions) until translucent',
      'Add crushed ginger and garlic, sauté for two minutes',
      'Add chopped tomatoes and cook until mushy',
      'Add the country chicken pieces, turmeric powder, and salt, roasting them for 5-8 minutes',
      'Add the freshly ground spice powder and mix nicely',
      'Pour enough water and pressure cook for 4-5 whistles (country chicken takes longer to cook)',
      'Once pressure settles, open, add coconut paste, simmer for 5 minutes until gravy thickens slightly',
      'Serve hot with white rice, dosa, or idli'
    ],
    utensils: ['Pressure cooker', 'Mixer grinder', 'Ladle'],
    nutrition: { calories: 420, protein: 40, carbs: 14, fat: 24 }
  },
  {
    id: 'rec-24',
    title: 'Pallipalayam Chicken',
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=500&auto=format&fit=crop',
    cookingTime: 35,
    prepTime: 15,
    bakingTime: 0,
    restingTime: 0,
    difficulty: 'Easy',
    servings: 3,
    type: 'non-veg',
        mealType: ['lunch', 'dinner'],
    ingredients: ['Chicken', 'Onion', 'Red Chili', 'Garlic', 'Coconut', 'Turmeric', 'Curry Leaves'],
    ingredientsWithQuantities: [
      { name: 'Chicken (Bite-sized)', amount: 500, unit: 'g' },
      { name: 'Shallots (Small Onions)', amount: 1, unit: 'cup' },
      { name: 'Dry Red Chilies (Deseeded)', amount: 15, unit: '' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Coconut (Bite-sized pieces)', amount: 0.25, unit: 'cup' },
      { name: 'Turmeric', amount: 0.5, unit: 'tsp' },
      { name: 'Curry Leaves', amount: 2, unit: 'sprigs' }
    ],
    instructions: [
      'Grate or crush the garlic cloves roughly',
      'Heat oil in a heavy bottom pan, add mustard seeds and let them splutter',
      'Add roughly chopped shallots and sauté until translucent',
      'Add the crushed garlic, curry leaves, and deseeded dry red chilies, sauté well',
      'Do not add chili powder or coriander powder; the heat comes purely from the whole red chilies',
      'Add the chicken pieces and turmeric powder, fry on medium heat until chicken changes color',
      'Add salt and cook covered on low heat. The chicken will release its own water to cook',
      'Once chicken is almost tender, add fresh coconut pieces (not grated, but thinly sliced pieces)',
      'Roast uncovered for another 5-10 minutes until chicken gets a beautiful roasted coat and is completely dry',
      'Serve as an accompaniment to rice and rasam'
    ],
    utensils: ['Heavy bottom wok (Kadai)', 'Spatula'],
    nutrition: { calories: 380, protein: 35, carbs: 10, fat: 22 }
  },
  {
    id: 'rec-25',
    title: 'Vatha Kuzhambu',
    image: 'https://images.unsplash.com/photo-1605333182602-0e8c614b7e88?w=500&auto=format&fit=crop',
    cookingTime: 30,
    prepTime: 10,
    bakingTime: 0,
    restingTime: 0,
    difficulty: 'Medium',
    servings: 4,
    type: 'veg',
        mealType: ['lunch'],
    ingredients: ['Tamarind', 'Onion', 'Garlic', 'Mustard Seeds', 'Curry Leaves', 'Tomato'],
    ingredientsWithQuantities: [
      { name: 'Tamarind', amount: 40, unit: 'g' },
      { name: 'Sundakkai Vathal (Dried Turkey Berry)', amount: 2, unit: 'tbsp' },
      { name: 'Shallots', amount: 15, unit: 'whole' },
      { name: 'Garlic', amount: 10, unit: 'cloves' },
      { name: 'Sambar Powder', amount: 2, unit: 'tbsp' },
      { name: 'Jaggery', amount: 1, unit: 'tsp' },
      { name: 'Sesame Oil', amount: 3, unit: 'tbsp' }
    ],
    instructions: [
      'Soak tamarind in hot water and extract 2 cups of juice',
      'Heat 1 tbsp sesame oil in a pan, fry the dried berries (vathal) until dark and crisp, set aside',
      'In the same pan, add remaining oil, temper with mustard seeds, fenugreek seeds, and curry leaves',
      'Add peeled whole garlic cloves and shallots, sauté until golden',
      'Add a chopped tomato (optional) and sauté until mushy',
      'Lower the heat, add sambar powder and turmeric, mix quickly without burning',
      'Pour in the tamarind extract, add salt, and bring to a rolling boil',
      'Let it boil until the raw smell of tamarind goes and the gravy thickens',
      'Add the fried vathal and jaggery to balance the tanginess',
      'Simmer until oil floats on top',
      'Serve with steamed rice and poriyal'
    ],
    utensils: ['Pan', 'Ladle'],
    nutrition: { calories: 210, protein: 4, carbs: 25, fat: 12 }
  },
  {
    id: 'rec-26',
    title: 'Thayir Sadam (Curd Rice)',
    image: 'https://images.unsplash.com/photo-1574315042848-111ec71f92e2?w=500&auto=format&fit=crop',
    cookingTime: 15,
    prepTime: 20,
    bakingTime: 0,
    restingTime: 30,
    difficulty: 'Easy',
    servings: 2,
    type: 'veg',
        mealType: ['lunch'],
    ingredients: ['Rice', 'Yogurt', 'Milk', 'Mustard Seeds', 'Curry Leaves', 'Ginger', 'Carrot'],
    ingredientsWithQuantities: [
      { name: 'Rice', amount: 1, unit: 'cup' },
      { name: 'Yogurt (Curd)', amount: 1.5, unit: 'cups' },
      { name: 'Milk', amount: 0.5, unit: 'cup' },
      { name: 'Mustard Seeds', amount: 1, unit: 'tsp' },
      { name: 'Urad Dal (Split Black Gram)', amount: 1, unit: 'tsp' },
      { name: 'Ginger', amount: 1, unit: 'tsp' },
      { name: 'Green Chilies', amount: 1, unit: '' },
      { name: 'Pomegranate Seeds or Grated Carrot', amount: 2, unit: 'tbsp' }
    ],
    instructions: [
      'Pressure cook rice until very soft and mushy (add slightly more water than usual)',
      'While the rice is still hot, mash it well with a ladle or potato masher',
      'Let the mashed rice cool down to room temperature',
      'Add yogurt, milk, and salt to the cooled rice, mix thoroughly until creamy',
      'For tempering: heat a little oil in a small pan, splutter mustard seeds and urad dal until dal turns golden',
      'Add finely chopped ginger, green chilies, and curry leaves, sauté for a few seconds',
      'Pour the tempering over the curd rice and mix gently',
      'Garnish with pomegranate arils, fresh coriander, or grated carrot',
      'Serve chilled with mango pickle and papadum'
    ],
    utensils: ['Pressure cooker', 'Tadka pan', 'Potato masher'],
    nutrition: { calories: 290, protein: 10, carbs: 54, fat: 5 }
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
