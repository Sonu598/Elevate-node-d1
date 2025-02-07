const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/usermodel");

userRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new UserModel({ username, password: hashedPassword });
  user.save();
  res
    .status(201)
    .json({ message: "User created" })
    .catch((err) => res.status(500).json({ message: err.message }));
});

userRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = UserModel.findOne({ username });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username }, process.env.secret);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});
