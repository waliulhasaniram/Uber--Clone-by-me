const { createNewUser, findUserById, findUserByEmail, updateUserById } = require("../services/user.services");
const { validationResult } = require('express-validator');
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandeler = require("../utils/asyncHandler");

const generateAccessAndRefresToken = async (userID) => {
    try {
        const userToken = await findUserById(userID).exec()
        if (!userToken) {
            throw new ApiError(404, "User does not exist")
        }

        const accessToken = await userToken.generateAccessToken()
        const refreshToken = await userToken.generateRefreshToken()

        userToken.refreshToken = refreshToken
        await userToken.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, error?.message || "Internal server error while generating tokens")
    }
}

const userRegister = asyncHandeler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation failed", errors.array());
    }
    const { firstName, lastName, email, password } = req.body;

    const user = await createNewUser({ firstName, lastName, email, password });

    return res.status(201).json(
        new ApiResponse(201, user, "User registered successfully")
    );
})

const userLogin = asyncHandeler(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation failed", errors.array());
    }
    const { email, password } = req.body;
    const user = await findUserByEmail(email).select('+password');
    if (!user) {
        throw new ApiError(401, 'Invalid credentials');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(401, 'Invalid credentials');
    }
    const { accessToken, refreshToken } = await generateAccessAndRefresToken(user._id);
    const loggedInUser = await findUserById(user._id).select("-password").exec();

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'Lax'
    }

    return res.cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .status(200).json(
            new ApiResponse(200, { userExists: loggedInUser }, "successfully logged in")
        );
})

const userLogout = asyncHandeler(async (req, res, next) => {
    const user = req.user;
    
    // Ensure the refresh token is actually removed from the database
    if (user?._id) {
        await updateUserById(user._id, { $unset: { refreshToken: 1 } });
    }

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'Lax'
    }

    return res.clearCookie("accessToken", options).clearCookie("refreshToken", options).status(200).json(
        new ApiResponse(200, null, "Successfully logged out")
    );
})

const getUserProfile = asyncHandeler(async (req, res, next) => {
    const user = req.user;
    return res.status(200).json(
        new ApiResponse(200, user, "User profile retrieved successfully")
    );
})

module.exports = {
    userRegister,
    userLogin,
    userLogout,
    getUserProfile
}