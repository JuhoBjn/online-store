const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const checkCaretaker = require("../middleware/checkCaretaker");

const { addEvent, deleteEvent } = require("../controllers/events");
const { upload } = require("../s3/multer");

router.use(verifyToken);

router.post("/", checkCaretaker, upload.single("file"), addEvent);

router.delete("/:id", checkCaretaker, deleteEvent);

module.exports = router;
