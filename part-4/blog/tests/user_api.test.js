const supertest = require("supertest");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");

const users = [
  {
    username: "test1",
    name: "test1 name",
    password: "test1password",
  },
  {
    username: "test2",
    name: "test2 name",
    password: "test2password",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  for (let user of users) {
    const { username, name, password } = user;
    const passwordHash = await bcrypt.hash(password, 10);
    const obj = new User({ username, name, passwordHash });
    await obj.save();
  }
});

describe("when there are users in db", () => {
  test("creation succeeds with fresh username", async () => {
    const newUser = {
      username: "test3",
      name: "test3 name",
      password: "test3password",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await api.get("/api/users");
    expect(usersAtEnd.body).toHaveLength(users.length + 1);

    const usernames = usersAtEnd.body.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with correct status code when username is missing", async () => {
    const newUser = {
      name: "name",
      password: "password",
    };
    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toBe("username or password missing");

    const usersAtEnd = await api.get("/api/users");
    expect(usersAtEnd.body).toHaveLength(users.length);
  });
  test("creation fails with correct status code when password is missing", async () => {
    const newUser = {
      username: "test",
      name: "name",
    };
    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toBe("username or password missing");

    const usersAtEnd = await api.get("/api/users");
    expect(usersAtEnd.body).toHaveLength(users.length);
  });
  test("creation fails with correct status code when password is too short", async () => {
    const newUser = {
      username: "test",
      name: "name",
      password: "12",
    };
    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toBe("password too short");

    const usersAtEnd = await api.get("/api/users");
    expect(usersAtEnd.body).toHaveLength(users.length);
  });

  test("creation fails with correct status code when username is too short", async () => {
    const newUser = {
      username: "2",
      name: "name",
      password: "12345",
    };
    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain("username too short");

    const usersAtEnd = await api.get("/api/users");
    expect(usersAtEnd.body).toHaveLength(users.length);
  });
  test("creation fails with correct status code when username is already taken", async () => {
    const newUser = {
      username: "test1",
      name: "name",
      password: "12345",
    };
    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await api.get("/api/users");
    expect(usersAtEnd.body).toHaveLength(users.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
