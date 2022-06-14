const mongoose = require("mongoose");
const { DB } = require("./constants");

const connectDB = async () => {
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
};

module.exports = connectDB;
