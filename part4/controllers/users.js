const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({ error: "Username must be unique" });
  }
  if (!username || username.length < 3 || !password || password.length < 3) {
    response.status(400).json({
      error: "Username and password must be at least 3 characters long",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    author: 1,
    title: 1,
  });
  response.json(users);
});
module.exports = usersRouter;
