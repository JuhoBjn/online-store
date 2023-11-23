const getS3Url = (key) => {
  if (!key) {
    return null;
  }
  return `${process.env.S3_BASE_URL}/${key}`;
};

module.exports = {
  getS3Url
};
