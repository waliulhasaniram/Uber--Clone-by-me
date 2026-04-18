const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        min: [6, 'Password must be at least 6 characters long'],
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
        vehicleType: {
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
    },
    refreshToken: {
        type: String
    },
}, { timestamps: true });

captainSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(parseInt(process.env.saltRounds) || 12);
    this.password = await bcrypt.hash(this.password, salt);
});

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.methods.generateAuthToken = async function() {
    return jwt.sign({_id: this._id.toString(), email: this.email}, process.env.CAPTAIN_AUTH_SECRET, 
    {expiresIn: process.env.CAPTAIN_AUTH_SECRET_EXPIRY});
}

captainSchema.methods.generateCaptainRefreshToken = async function (){
    return jwt.sign({_id: this._id.toString(), email: this.email}, process.env.REFRESH_TOKEN_SECRET, 
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

const captain = mongoose.model('Captain', captainSchema);

module.exports = captain;