const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");

const s3 = new S3Client({
  region: "auto", // determine the region based on the S3 endpoint.
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MiB
  }
});

module.exports = { upload, s3 };
