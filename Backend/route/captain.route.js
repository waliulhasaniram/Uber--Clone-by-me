const express = require('express');
const router = express.Router()
const {body} = require('express-validator');
const captainController = require('../controller/captain.contoller');

router.post('/register', [
    body('fullname.firstName')
        .isString().withMessage('First name must be a string')
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastName')
        .optional()
        .isString().withMessage('Last name must be a string')
        .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please use a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicles.color').isString().withMessage('Vehicle color must be a string'),
    body('vehicles.plate').isString().withMessage('Vehicle plate must be a string'),
    body('vehicles.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be a positive integer'),
    body('vehicles.vehicleType').isString().withMessage('Vehicle type must be a string')
], captainController.captainRegister);
    

module.exports = router;