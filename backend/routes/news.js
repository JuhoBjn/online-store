const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const checkCaretaker = require("../middleware/checkCaretaker");

const {
  addNewsArticle,
  deleteNews,
  updateNews,
  getNewsArticles,
  getSingleNewsArticle
} = require("../controllers/news");
const { upload } = require("../s3/multer");

router.use(verifyToken);

router.post("/", checkCaretaker, upload.single("file"), addNewsArticle);

router.delete("/:id", checkCaretaker, deleteNews);

router.patch("/:id", checkCaretaker, updateNews);

router.get("/:id", getSingleNewsArticle);

router.get("/", getNewsArticles);

module.exports = router;
