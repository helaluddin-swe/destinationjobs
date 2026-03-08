const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log("Database connected successfully to 'jobdb'");
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err}`);
    });

    // Just pass the URI directly since the DB name is now inside it
    await mongoose.connect(process.env.MONGO_URI);
    
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;