const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).json({ error: "title or url is missing" });
  }
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
