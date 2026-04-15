const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// CONNECT DB (LOCAL)
mongoose.connect("mongodb://127.0.0.1:27017/lms")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB Error:", err));

// TEST API
app.get("/", (req, res) => {
  res.send("API đang chạy OK 🚀");
});

// RUN SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});