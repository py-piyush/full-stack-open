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

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const result = await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

module.exports = blogsRouter;
