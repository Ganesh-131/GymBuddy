const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },

  streak: {
    type: Number,
    default: 0,
  },

  lastWorkoutDate: Date
});

module.exports = mongoose.model("User", userSchema);