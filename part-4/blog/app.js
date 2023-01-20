const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs.js");
const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;
