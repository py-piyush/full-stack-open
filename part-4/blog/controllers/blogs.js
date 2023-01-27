const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/user.js");

const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).json({ error: "title or url is missing" });
  }
  const body = request.body;
  const token = request.token;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id)
    return response.status(401).json({ error: "token invalid" });

  const user = await User.findById(decodedToken.id);
  // console.log(user);
  const blog = new Blog({
    ...body,
    user: user._id,
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const result = await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const result = await Blog.findByIdAndUpdate(id, updatedBlog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.json(result);
});

module.exports = blogsRouter;
