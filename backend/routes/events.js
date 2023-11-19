const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const checkCaretaker = require("../middleware/checkCaretaker");

const {
  addEvent,
  deleteEvent,
  updateEvent,
  getEvent,
  getEvents
} = require("../controllers/events");
const { upload } = require("../s3/multer");

router.use(verifyToken);

router.post("/", checkCaretaker, upload.single("file"), addEvent);

router.delete("/:id", checkCaretaker, deleteEvent);

router.patch("/:id", checkCaretaker, updateEvent);

router.get("/:id", getEvent);

router.get("/", getEvents);

module.exports = router;
