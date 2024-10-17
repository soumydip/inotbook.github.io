const mongoose = require('mongoose');

const mongooseURI = "mongodb://localhost:27017/inotebook";

const connectToURI = () => {
  mongoose.connect(mongooseURI)
    .then(() => {
      console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
    });
};

module.exports = connectToURI;
