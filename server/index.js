const express = require('express');
const cors = require('cors');
require('dotenv').config();

const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Language detection middleware
app.use((req, res, next) => {
    const lang = req.headers['accept-language'] || 'en';
    req.language = lang.split(',')[0].split('-')[0]; // Simple detection (e.g., 'en', 'hi', 'ta')
    next();
});

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/meal-plans', mealPlanRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('AI Recipe Recommendation API is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
