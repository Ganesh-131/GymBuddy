const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  exercise: String,
  reps: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Workout", workoutSchema);