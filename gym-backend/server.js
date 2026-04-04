const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/workout", require("./routes/workoutRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});