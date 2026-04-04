const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// SAVE WORKOUT
router.post("/", async (req, res) => {
  const { exercise, reps } = req.body;

  try {
    const workout = new Workout({ exercise, reps });
    await workout.save();

    res.send("Workout saved");
  } catch (error) {
    res.status(500).send("Error saving workout");
  }
});

// GET WORKOUTS
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).send("Error fetching workouts");
  }
});

module.exports = router;