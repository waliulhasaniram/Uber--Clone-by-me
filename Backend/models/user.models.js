const mongoose = require('mongoose');

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
    socketId: {
        type: String
    }
}, { timestamps: true });