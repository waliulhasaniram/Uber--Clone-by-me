const asyncHandeler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");


const captainRegister = asyncHandeler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { fullname, email, password, vehicles } = req.body;
    const { firstName, lastName } = fullname;
    const { color, plate, capacity, vehicleType } = vehicles;
    
    const existingCaptain = await captainService.findCaptainByEmail(email);
    if (existingCaptain) {
        throw new ApiError(409, 'Captain with this email already exists');
    }

    const newCaptain = await captainService.createNewCaptain({
        firstName,
        lastName,
        email,
        password,
        color,
        plate,
        capacity,
        vehicleType
    });

    const token = await newCaptain.generateAuthToken();

    res.status(201).json(new ApiResponse(201, {
        captain: newCaptain,
        token
    }, 'Captain registered successfully'));
});

module.exports = {
    captainRegister
}