const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.getAllRecipes);
router.post('/', recipeController.addRecipe);
router.get('/:id', recipeController.getRecipeById);

module.exports = router;
