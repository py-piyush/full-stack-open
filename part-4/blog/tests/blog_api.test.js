const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

beforeAll(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("test1password", 10);
  const user = new User({
    username: "test1",
    name: "test1 name",
    blogs: [],
    passwordHash,
  });
  await user.save();
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const users = await User.find({});
  const user = users[0];

  for (let blog of blogs) {
    const obj = new Blog({
      ...blog,
      user: user._id,
    });
    await obj.save();
  }
});
describe("when there are blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("correct number of blogs is returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length);
  });

  test("unique identifier is id", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0]._id).not.toBeDefined();
  });
});

describe("adding a new blog", () => {
  let headers;
  beforeEach(async () => {
    const user = {
      username: "test1",
      password: "test1password",
    };
    const loggedUser = await api.post("/api/login").send(user);

    headers = {
      Authorization: `bearer ${loggedUser.body.token}`,
    };
  });
  test("returns valid response once successfully added", async () => {
    const blogObj = {
      title: "Express.js Fundamentals",
      author: "Zulaikha Geer",
      url: "https://medium.com/edureka/expressjs-tutorial-795ad6e65ab3",
      likes: 0,
    };
    await api
      .post("/api/blogs")
      .send(blogObj)
      .set(headers)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length + 1);

    const titles = response.body.map((b) => b.title);
    expect(titles).toContain("Express.js Fundamentals");
  }, 100000);

  test("likes defaults to 0", async () => {
    const blogObj = {
      title: "Express.js Fundamentals",
      author: "Zulaikha Geer",
      url: "https://medium.com/edureka/expressjs-tutorial-795ad6e65ab3",
    };
    const response = await api
      .post("/api/blogs")
      .send(blogObj)
      .set(headers)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toBe(0);
  });

  test("return bad request if title/url is missing", async () => {
    const blogObj = {
      author: "James Williams",
      likes: 500,
    };
    const response = await api
      .post("/api/blogs")
      .send(blogObj)
      .set(headers)
      .expect(400);
    expect(response.body.error).toBe("title or url is missing");

    const allBlogs = await api.get("/api/blogs");
    expect(allBlogs.body).toHaveLength(blogs.length);
  });
});

describe("deleting a blog", () => {
  let headers;
  beforeEach(async () => {
    const user = {
      username: "test1",
      password: "test1password",
    };
    const loggedUser = await api.post("/api/login").send(user);

    headers = {
      Authorization: `bearer ${loggedUser.body.token}`,
    };
  });
  test("succeeds with status code 204 if id is valid", async () => {
    const blogToDelete = blogs[0];
    // console.log(blogToDelete);
    await api.delete(`/api/blogs/${blogToDelete._id}`).set(headers).expect(204);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length - 1);
    const titles = response.body.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("updating a blog", () => {
  test("succeeds if id is valid", async () => {
    const blogToUpdate = blogs[0];
    const updated = { likes: 10 };
    await api.put(`/api/blogs/${blogToUpdate._id}`).send(updated);
    const result = await api.get("/api/blogs");
    expect(result.body).toHaveLength(blogs.length);
    const updatedBlog = result.body.find((b) => b.id === blogToUpdate._id);
    expect(updatedBlog.likes).toBe(10);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
