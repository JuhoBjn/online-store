const express = require("express");
const router = express.Router();
const verifyTokenid = require("../middleware/verifyTokenid");

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

router.use(verifyTokenid);

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.post("/updateUser", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
