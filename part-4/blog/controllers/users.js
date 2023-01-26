const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user.js");

userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.status(200).json(users);
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (!(username && password)) {
    response.status(400).json({ error: "username or password missing" });
    return;
  }
  if (password.length < 3) {
    response.status(400).json({ error: "password too short" });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const userObj = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await userObj.save();
  response.status(201).json(savedUser);
});

module.exports = userRouter;
