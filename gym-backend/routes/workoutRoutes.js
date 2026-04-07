const express = require("express");
const router = express.Router();

const Workout = require("../models/Workout");
const Session = require("../models/Session");


// ---------------- SAVE WORKOUT ----------------
router.post("/", async (req, res) => {
  const { exercise, reps, mistakes } = req.body;

  try {
    const workout = new Workout({
      exercise,
      reps,
      mistakes,
    });

    await workout.save();

    res.send("Workout saved");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving workout");
  }
});


// ---------------- GET ALL WORKOUTS ----------------
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching workouts");
  }
});


// ---------------- GET ALL SESSIONS ---------------- ⭐
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Session.find().sort({ date: -1 });
    res.json(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching sessions");
  }
});


module.exports = router;