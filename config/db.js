const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifedTopology: true
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;