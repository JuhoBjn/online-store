const express = require("express");
const router = express.Router();

const {
  resetPasswordEmail
} = require("../controllers/password-reset");

router.post("/send-reset-email", resetPasswordEmail);

module.exports = router;
