const User = require('../models/user.models');
const mongoose = require('mongoose');

module.exports.createNewUser = async ({firstName, lastName, email, password}) => {
    if (!firstName || !email || !password) {
        throw new Error('First name, email, and password are required');
    }
    const existingUser = await User.findOne({email});
    if (existingUser) {
        throw new Error('User already exists');
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