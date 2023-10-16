const express = require("express");
const router = express.Router();

const { signup, login, updateUser } = require("../controllers/users");

router.post("/signup", signup);

router.post("/login", login);

router.patch("/updateuser", updateUser);

module.exports = router;
