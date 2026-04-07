const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  exercise: String,

  targetReps: Number,
  completedReps: Number,

  mistakes: Number,

  postureFeedback: [
    {
      message: String,
      time: Number,
    },
  ],

  duration: Number, // seconds

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Session", sessionSchema);