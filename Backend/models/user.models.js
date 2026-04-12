const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            min: [3, 'First name must be at least 3 characters long']
        },
        lastName: {
            type: String,
            min: [3, 'Last name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
        min: [5, 'Email must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    refreshToken: {
        type: String
    },
    socketId: {
        type: String
    }
}, { timestamps: true });

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({_id: this._id.toString(), email: this.email}, process.env.ACCESS_TOKEN_SECRET, 
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken = async function (){
    return jwt.sign({_id: this._id.toString(), email: this.email}, process.env.REFRESH_TOKEN_SECRET, 
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(parseInt(process.env.saltRounds) || 12);
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;