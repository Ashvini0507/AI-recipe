const fs = require('fs');
const path = require('path');

const allRecipesPath = path.join(__dirname, 'src', 'app', 'utils', 'allRecipes.ts');
const mockDataPath = path.join(__dirname, 'src', 'app', 'utils', 'mockData.ts');

const mealTypes = {
  'rec-1': "['lunch', 'dinner']",
  'rec-2': "['lunch', 'dinner']",
  'rec-3': "['dinner']",
  'rec-4': "['lunch', 'snack']",
  'rec-5': "['lunch', 'dinner']",
  'rec-6': "['dinner', 'snack']",
  'rec-7': "['dinner']",
  'rec-8': "['dinner']",
  'rec-9': "['lunch', 'dinner']",
  'rec-10': "['lunch', 'dinner']",
  'rec-11': "['lunch', 'dinner']",
  'rec-12': "['snack', 'dinner']",
  'rec-13': "['breakfast']",
  'rec-14': "['lunch']",
  'rec-15': "['lunch', 'dinner']",
  'rec-16': "['breakfast']",
  'rec-17': "['breakfast', 'dinner']",
  'rec-18': "['breakfast']",
  'rec-19': "['breakfast', 'snack']",
  'rec-20': "['breakfast']",
  'rec-21': "['lunch']",
  'rec-22': "['lunch']",
  'rec-23': "['lunch']",
  'rec-24': "['lunch', 'dinner']",
  'rec-25': "['lunch']",
  'rec-26': "['lunch']",
  'rec-27': "['breakfast', 'dinner']",
  'rec-28': "['breakfast', 'dinner', 'snack']",
  'rec-29': "['breakfast', 'dinner']",
  'rec-30': "['dinner']",
  'rec-31': "['dinner']",
  'rec-32': "['dinner']"
};

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [id, types] of Object.entries(mealTypes)) {
    // regex to find id: 'rec-X', ... type: 'veg' | 'non-veg',
    // and insert mealType: [...] after type:
    const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?type:\\s*'(?:veg|non-veg)',)`, 'g');
    content = content.replace(regex, `$1\n        mealType: ${types},`);
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

updateFile(allRecipesPath);
updateFile(mockDataPath);
