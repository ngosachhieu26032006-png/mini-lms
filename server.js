const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// CONNECT LOCAL DB
mongoose.connect("mongodb://127.0.0.1:27017/lms")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB Error:", err));

// MODEL QUIZ
const Quiz = mongoose.model("Quiz", {
  question: String,
  options: [String],
  correct: Number
});

// API TEST
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// ADD QUIZ
app.post("/quiz", async (req, res) => {
  const quiz = await Quiz.create(req.body);
  res.json(quiz);
});

// GET QUIZ
app.get("/quiz", async (req, res) => {
  const data = await Quiz.find();
  res.json(data);
});

// RUN SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});