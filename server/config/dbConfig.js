const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 1. Set up the listener first
    // Use a function reference or an arrow function
    mongoose.connection.on('connected', () => {
      console.log("Database connected successfully");
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err}`);
    });

    // 2. Then attempt the connection
    await mongoose.connect(`${process.env.MONGO_URI}/jobdb`);
    
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;