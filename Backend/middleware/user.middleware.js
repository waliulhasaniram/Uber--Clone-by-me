const { findUserById } = require("../services/user.services");
const asyncHandeler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");


const authMiddleware = asyncHandeler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized: Access token missing");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await findUserById(decoded._id).select("-password").exec();

        // Security Check: If user doesn't exist or has no refresh token (logged out), reject
        if (!user || !user.refreshToken) {
            throw new ApiError(401, "Unauthorized: Invalid session or user logged out");
        }

        req.user = user;
        return next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized: Invalid access token");
    }
})

module.exports = authMiddleware