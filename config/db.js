const mongoose = require('mongoose');

// Your MongoDB connection URL
const dbURL = process.env.DB_URL;
// abhishektiwari9720
// qgybWqwiaGjRmno2
// Establish a MongoDB connection
const connectToDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToDB;
