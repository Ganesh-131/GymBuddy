const express = require("express");
const router = express.Router();
const axios = require("axios");
const Workout = require("../models/Workout");

// BICEP CURL (with target reps)
router.get("/bicep", async (req, res) => {
  try {
    // get target from query (default = 10)
    const target = req.query.target || 10;

    // call Flask AI
    const response = await axios.get(
      `http://127.0.0.1:8000/bicep?target=${target}`
    );

    const reps = response.data.reps;

    // save to DB
    const workout = new Workout({
      exercise: "bicep",
      reps,
    });

    await workout.save();

    res.json({
      message: "Workout completed",
      target,
      reps,
    });
  } catch (error) {
    console.log("AI ERROR:", error.message);
    res.status(500).send("AI error");
  }
});

module.exports = router;