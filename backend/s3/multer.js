const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new S3Client({
  region: "auto", // determine the region based on the S3 endpoint.
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
});

const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET_NAME,
  key: (req, file, cb) => {
    cb(null, `${Date.now().toString()}-${file.originalname}`);
  },
  contentType: multerS3.AUTO_CONTENT_TYPE
});

const upload = multer({
  storage: s3Storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MiB
  }
});

module.exports = upload;
