const express = require("express");
const router = express.Router();

const { signup, login, updateUser } = require("../controllers/users");

router.post("/signup", signup);

router.post("/login", login);

router.post("/updateUser", updateUser);

module.exports = router;
