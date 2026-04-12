const User = require('../models/user.models');
const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');

module.exports.createNewUser = async ({firstName, lastName, email, password}) => {
    if (!firstName || !email || !password) {
        throw new ApiError(400, 'First name, email, and password are required');
    }
    const existingUser = await User.findOne({email});
    if (existingUser) {
        throw new ApiError(409, 'User with this email already exists');
    }
    const user = await User.create({
        fullname: {
            firstName,
            lastName
        },
        email,
        password
    });
    return user;
}

module.exports.findUserByEmail = (email) => {
    return User.findOne({email});
};

module.exports.findUserById = (id) => {
    return User.findById(id);
};

module.exports.updateUserById = (id, updateData) => {
    return User.findByIdAndUpdate(id, updateData, { new: true });
};