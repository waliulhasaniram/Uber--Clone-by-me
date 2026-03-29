const User = require('../models/user.models');

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

module.exports.findUserByEmail = async (email) => {
    return await User.findOne({email});
};

module.exports.findUserById = async (id) => {
    return await User.findById(id);
};