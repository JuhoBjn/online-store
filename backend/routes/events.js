const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const checkCaretaker = require("../middleware/checkCaretaker");

const {
  addEvent,
  deleteEvent,
  updateEvent,
  getEvent,
  getEvents,
  addAttendee,
  deleteAttendee,
  getEventAttendees
} = require("../controllers/events");
const { upload } = require("../s3/multer");

router.use(verifyToken);

router.post("/", checkCaretaker, upload.single("file"), addEvent);

router.delete("/:id", checkCaretaker, deleteEvent);

router.patch("/:id", checkCaretaker, updateEvent);

router.get("/:id", getEvent);

router.get("/", getEvents);

router.post("/:id/attendees", addAttendee);

router.delete("/:id/attendees/:userId", deleteAttendee);

router.get("/:id/attendees", getEventAttendees);

module.exports = router;
