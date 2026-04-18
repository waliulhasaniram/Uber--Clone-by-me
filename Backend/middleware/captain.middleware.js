const asyncHandeler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const { findCaptainById } = require("../services/captain.service");


const authCaptainMiddleware = asyncHandeler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized: Access token missing");
    }

    try {
        const decoded = jwt.verify(token, process.env.CAPTAIN_AUTH_SECRET);
        const captain = await findCaptainById(decoded._id).select("-password").exec();

        // Security Check: If captain doesn't exist or has no refresh token (logged out), reject
        if (!captain || !captain.refreshToken) {
            throw new ApiError(401, "Unauthorized: Invalid session or captain logged out");
        }

        req.captain = captain;
        return next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized: Invalid access token");
    }
})

module.exports = authCaptainMiddleware