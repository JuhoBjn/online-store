const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getUser,
  getAllUsers,
  deleteUser
} = require("../controllers/users");

router.post("/signup", signup);

router.post("/login", login);

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.delete("/:id", deleteUser);

module.exports = router;
