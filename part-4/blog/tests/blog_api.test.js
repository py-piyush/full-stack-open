const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

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

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of blogs) {
    const obj = new Blog(blog);
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
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length + 1);

    const titles = response.body.map((b) => b.title);
    expect(titles).toContain("Express.js Fundamentals");
  }, 100000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
