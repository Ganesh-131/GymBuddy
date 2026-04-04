const express = require("express");
const router = express.Router();
const User = require("../models/User");

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.send("Login successful");
    } else {
      res.send("Invalid email or password");
    }
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    res.send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

module.exports = router;