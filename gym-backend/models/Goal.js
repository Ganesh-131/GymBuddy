const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  weeklyTarget: Number, // total reps per week
  completed: {
    type: Number,
    default: 0,
  },

  weekStart: Date,
});

module.exports = mongoose.model("Goal", goalSchema);