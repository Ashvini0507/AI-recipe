const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/mealPlanController');

router.get('/:userId', mealPlanController.getMealPlans);
router.post('/:userId', mealPlanController.setMealPlan);

module.exports = router;
