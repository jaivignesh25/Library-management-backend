const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

/* 🔴 JSON PARSER — MUST BE FIRST */
app.use(express.json());

/* 🔴 SIMPLE TEST ROUTE */
app.post("/test", (req, res) => {
  res.json({ body: req.body });
});

/* BOOK ROUTES */
app.use("/api/books", require("./routes/bookRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
