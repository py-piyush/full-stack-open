const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const Blog = require("./models/blog.js");
const blogsRouter = require("./controllers/blogs.js");
const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use(blogsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
