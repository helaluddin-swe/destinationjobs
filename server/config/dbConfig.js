const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb+srv://destinationjob:destinationjob@cluster0.gn8kjzf.mongodb.net/?appName=Cluster0'

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // stop server if DB connection fails
  }
};

module.exports = connectDB;