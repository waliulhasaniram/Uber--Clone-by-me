const { findUserById } = require("../services/user.services");
const asyncHandeler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");


const authMiddleware = asyncHandeler(async (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }else {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await findUserById(decoded._id).select("-password").exec();
        if (!req.user) {
            throw new ApiError(401, "Unauthorized");
        }
    }
    
    return next()
})

module.exports = authMiddleware