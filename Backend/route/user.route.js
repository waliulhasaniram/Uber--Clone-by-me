const express = require('express');
const router = express.Router()
const {body} = require('express-validator');
const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/user.middleware');
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per window for auth routes
    message: 'Too many login/registration attempts, please try again after 15 minutes',
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,
});

router.post('/register', [
    authLimiter,
    body('firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('lastName').optional().isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please use a valid email address').isLength({ min: 5 }).withMessage('Email must be at least 5 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.userRegister);

router.post('/login', [
    authLimiter,
    body('email').isEmail().withMessage('Please use a valid email address'),
    body('password').exists().withMessage('Password is required')
], userController.userLogin);

router.post('/logout', authMiddleware, userController.userLogout);
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router