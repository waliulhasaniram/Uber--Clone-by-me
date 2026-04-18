const asyncHandeler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");


const generateCaptainAuthAndRefresToken = async (captainID) => {
    try {
        const captainToken = await captainService.findCaptainById(captainID).exec()
        if (!captainToken) {
            throw new ApiError(404, "Captain does not exist")
        }

        const accessToken = await captainToken.generateAuthToken()
        const refreshToken = await captainToken.generateCaptainRefreshToken()

        captainToken.refreshToken = refreshToken
        await captainToken.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, error?.message || "Internal server error while generating tokens")
    }
}

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

const captainLogin = asyncHandeler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainService.findCaptainByEmail(email).select('+password');
    if (!captain) {
        throw new ApiError(404, 'Captain not found');
    }

    const isPasswordValid = await captain.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const { accessToken, refreshToken } = await generateCaptainAuthAndRefresToken(captain._id);
    const loggedInCaptain = await captainService.findCaptainById(captain._id).select("-password").exec();

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'Lax'
    }

    return res.cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .status(200).json(
            new ApiResponse(200, loggedInCaptain, "successfully logged in")
        );  
});

const captainLogout = asyncHandeler(async (req, res) => {
    const captain = req.captain;
    if (captain._id) {
        await captainService.updateCaptainById(captain._id, { $unset: { refreshToken: 1 } }).exec();
    }
    captain.refreshToken = null;
    await captain.save({ validateBeforeSave: false });

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'Lax'
    }
    return res.clearCookie("accessToken", options).clearCookie("refreshToken", options).status(200).json(
        new ApiResponse(200, null, "Successfully logged out")
    );
});

const getCaptainProfile = asyncHandeler(async (req, res) => {
    const captain = req.captain;
    return res.status(200).json(
        new ApiResponse(200, captain, "Captain profile retrieved successfully")
    );
});


module.exports = {
    captainRegister,
    captainLogin,
    captainLogout,
    getCaptainProfile
}