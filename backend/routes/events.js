const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const checkCaretaker = require("../middleware/checkCaretaker");

const { addEvent } = require("../controllers/events");
const { upload } = require("../s3/multer");

router.use(verifyToken);

router.post("/", checkCaretaker, upload.single("file"), addEvent);

module.exports = router;
