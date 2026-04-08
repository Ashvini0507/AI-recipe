const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getAllProfiles);
router.get('/:userId', userController.getProfile);
router.patch('/:userId/language', userController.updateLanguage);
router.post('/forgot-password', userController.forgotPassword);

module.exports = router;
