const express = require("express");
const router = express.Router();

const { signup, login, updateUser } = require("../controllers/users");
const { checkToken } = require("../middleware/verifyToken");

router.post("/signup", signup);

router.post("/login", login);

//router.use(checkToken);

router.patch("/:userid", updateUser);

module.exports = router;
