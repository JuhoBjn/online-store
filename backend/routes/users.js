const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {
  signup,
  login,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser
} = require("../controllers/users");

router.post("/signup", signup);

router.post("/login", login);

router.use(verifyToken);

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.post("/updateUser", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
