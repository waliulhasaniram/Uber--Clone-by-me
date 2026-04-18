const captainModel = require("../models/captain.model");
const ApiError = require("../utils/ApiError");

module.exports.createNewCaptain = async ({firstName, lastName, email, password, color, plate, capacity, vehicleType}) => {
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new ApiError(400, 'All fields are required');
    }

    const captain = await captainModel.create({
        fullname: {
            firstName,
            lastName
        },
        email,
        password,
        vehicles: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;
};

module.exports.findCaptainByEmail = (email) => {
    return captainModel.findOne({email});
};

module.exports.findCaptainById = (id) => {
    return captainModel.findById(id);
};

module.exports.updateCaptainById = (id, updateData) => {
    return captainModel.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports.deleteCaptainById = (id) => {
    return captainModel.findByIdAndDelete(id);
};
