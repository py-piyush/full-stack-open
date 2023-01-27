const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = request.user;
  if (!user)
    return response.status(401).json({ error: "token missing or invalid" });
  // console.log(user);
  if (!body.title || !body.url) {
    response.status(400).json({ error: "title or url is missing" });
  }
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
  const blog = await Blog.findById(id);

  const user = request.user;

  if (blog.user.toString() === user._id.toString()) {
    await blog.remove();
    response.status(204).end();
  } else {
    return response.status(401).json({ error: "Unauthorized to delete" });
  }
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
