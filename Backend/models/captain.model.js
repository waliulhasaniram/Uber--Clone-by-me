const mongoose = require('mongoose');

const captainSchema = new mongoose.Schema({
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
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicles: {
        color: {
            type: String,
            required: true,
            min: [3, 'Vehicle color must be at least 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            min: [3, 'Vehicle plate must be at least 3 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Vehicle capacity must be at least 1']
        },
        vehiclesType: {
            type: String,
            required: true,
            min: [3, 'Vehicle type must be at least 3 characters long']
        }
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }
}, { timestamps: true });

const captain = mongoose.model('Captain', captainSchema);

module.exports = captain;