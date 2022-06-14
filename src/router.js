const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secret = process.env.JWT_SECRET;

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== mockUser.username || password !== mockUser.password) {
    return res
      .status(400)
      .json({ error: `yo your username and/or password are not correct` });
  }

  const token = jwt.sign({ username }, secret);

  res.json({ token });
});

router.get("/profile", (req, res) => {
  const [bearer, token] = req.headers.authorization.split(" ");
  const profile = mockUser.profile;
  console.log(token);

  try {
    const payload = jwt.verify(token, secret);
    res.json({ profile });
  } catch (e) {
    res.status(400).json({ error: `yo you made a bad request` });
  }
});

module.exports = router;
