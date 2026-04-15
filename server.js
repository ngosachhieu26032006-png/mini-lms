const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/lms");

// ===== MODELS =====
const User = mongoose.model("User", {
  username: String,
  password: String,
  role: String
});

const Course = mongoose.model("Course", {
  title: String,
  description: String
});

const Lesson = mongoose.model("Lesson", {
  courseId: String,
  title: String,
  videoUrl: String
});

const Quiz = mongoose.model("Quiz", {
  question: String,
  options: [String],
  answer: Number
});

// ===== AUTH =====
app.post("/register", async (req, res) => {
  await User.create(req.body);
  res.send("Registered");
});

app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.send("Wrong");
  res.json({ token: "ok" });
});

// ===== COURSE =====
app.post("/courses", async (req, res) => {
  const c = await Course.create(req.body);
  res.json(c);
});

app.get("/courses", async (req, res) => {
  const data = await Course.find();
  res.json(data);
});

// ===== LESSON =====
app.post("/lessons", async (req, res) => {
  const l = await Lesson.create(req.body);
  res.json(l);
});

app.get("/lessons/:id", async (req, res) => {
  const data = await Lesson.find({ courseId: req.params.id });
  res.json(data);
});

// ===== QUIZ =====
app.post("/quiz", async (req, res) => {
  const q = await Quiz.create(req.body);
  res.json(q);
});

app.get("/quiz", async (req, res) => {
  const data = await Quiz.find();
  res.json(data);
});

// ===== RUN =====
app.listen(3000, () => console.log("Server running"));