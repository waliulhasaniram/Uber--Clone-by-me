const dotenv = require('dotenv');
dotenv.config({ debug: true });
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect_database = await mongoose.connect(process.env.DATABASE_NAME)
        console.log('database is connented to host -> ', connect_database.connection.host)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDB;