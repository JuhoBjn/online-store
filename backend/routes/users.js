const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  user,
  allUsers,
  deleteUser
} = require("../controllers/users");

router.post("/signup", signup);

router.post("/login", login);

router.get("/AllUsers", allUsers);

router.get("/:id", user);

router.delete("/:id", deleteUser);

module.exports = router;
