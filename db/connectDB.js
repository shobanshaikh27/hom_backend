const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url)
}
console.log("MongoDB connected");

module.exports = connectDB

