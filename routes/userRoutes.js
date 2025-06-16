const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User registered");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) res.send("Login success");
  else res.send("Login failed");
});

module.exports = router;
