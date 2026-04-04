const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");

let latestReps = 0;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://gandalaganesh31_db_user:4BSADg37CAmc1LOc@cluster0.axs9vyu.mongodb.net/gymbuddy")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// LOGIN API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.send("Login successful");
    } else {
      res.send("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging in");
  }
});

// REGISTER API
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    res.send("User registered successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error registering user");
  }
});

const Workout = require("./models/Workout");

// SAVE WORKOUT API
app.post("/workout", async (req, res) => {
  const { exercise, reps } = req.body;

  try {
    const workout = new Workout({ exercise, reps });
    await workout.save();

    res.send("Workout saved");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving workout");
  }
});

app.get("/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching workouts");
  }
});



// RUN AI WORKOUT
const { spawn } = require("child_process");

app.get("/run-ai", (req, res) => {
  const python = spawn("python", ["../ai/pose.py"]);

  python.stdout.on("data", (data) => {
    const text = data.toString();
    console.log("AI:", text);

    const num = parseInt(text);
    if (!isNaN(num)) {
      latestReps = num;
    }
  });

  res.send("AI started");
});

app.get("/get-reps", (req, res) => {
  res.json({ reps: latestReps });
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});