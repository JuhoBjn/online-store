const express = require("express");
const router = express.Router();

const signup = require("../controllers/users");

router.post("/signup", signup);

router.post("/login", (req, res) => {
  res.send("The login endpoint");
});

module.exports = router;
