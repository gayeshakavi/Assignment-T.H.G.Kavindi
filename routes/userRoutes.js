const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(409).send("Username already exists");

    const user = new User({ username, password });
    await user.save();
    res.send("User registered");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (user) res.send("Login success");
    else res.status(401).send("Login failed");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
