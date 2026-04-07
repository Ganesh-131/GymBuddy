const express = require("express");
const router = express.Router();
const axios = require("axios");
const Workout = require("../models/Workout");
const Session = require("../models/Session");

// BICEP CURL
router.get("/bicep", async (req, res) => {
  try {
    const target = req.query.target || 10;

    const response = await axios.get(
      `http://127.0.0.1:8000/bicep?target=${target}`
    );

    const { reps, mistakes, duration } = response.data;

    // 1️⃣ Save workout (simple history)
    const workout = new Workout({
      exercise: "bicep",
      reps,
      mistakes,
    });

    await workout.save();

    // 2️⃣ Save session (detailed)
    const session = new Session({
      exercise: "bicep",
      targetReps: target,
      completedReps: reps,
      mistakes,
      duration,
    });

    await session.save();

    res.json({
      message: "Workout completed",
      target,
      reps,
      mistakes,
      duration,
    });

  } catch (error) {
    console.log("AI ERROR:", error.message);
    res.status(500).send("AI error");
  }
});

module.exports = router;