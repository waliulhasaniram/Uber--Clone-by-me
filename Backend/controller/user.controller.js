const { createNewUser, findUserById, findUserByEmail } = require("../services/user.services");
const userModel = require("../models/user.models");
const { validationResult } = require('express-validator'); 

const generateAccessAndRefresToken = async(userID)=>{
    try {
        const userToken = await findUserById(userID).exec()
        const accessToken = await userToken.generateAccessToken()
        const refreshToken = await userToken.generateRefreshToken()

        userToken.refreshToken = refreshToken
        await userToken.save({validateBeforeSave:false})
        return {accessToken, refreshToken}

    } catch (error) {
        throw new Error("can't generate access and refresh token")
    }
}

const userRegister = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { firstName, lastName, email, password } = req.body;

        const user = await createNewUser({ firstName, lastName, email, password });

        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
}

const userLogin = async(req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await findUserByEmail(email).select('+password');
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const { accessToken, refreshToken } = await generateAccessAndRefresToken(user._id);
        const loggedInUser = await findUserById(user._id).select("-password").exec(); 

            const options = {
                httpOnly : true,
                secure: true
            }

            res.cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .status(200).json({ statusCode: 200, data: { userExists: loggedInUser, accessToken, refreshToken }, message: "successfully logged in" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    userRegister,
    userLogin
}