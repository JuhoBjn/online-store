const Joi = require("joi");
const { s3 } = require("../s3/multer");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const news = require("../models/news");
const { getS3Url } = require("../s3/util");

const addNewsArticle = async (req, res) => {
  if (req.is("multipart/form-data") && req.body.json) {
    // parse the stringified JSON in the json field into an object
    try {
      req.body.json = JSON.parse(req.body.json);
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  } else if (req.is("application/json")) {
    // make non multipart/form-data requests look like multipart/form-data
    // so that we can use the same code to parse the request body
    req.body = { json: req.body };
  }

  const schema = Joi.object({
    headline: Joi.string().max(255).required(),
    body: Joi.string().max(4096).required(),
    link: Joi.string().uri().required()
  });

  const validation = schema.validate(req.body.json);
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message });
  }

  let fileKey = null;
  if (req.file) {
    fileKey = `${Date.now().toString()}-${req.file.originalname}`;

    try {
      // upload the file to S3
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: fileKey,
          Body: req.file.buffer,
          ContentType: req.file.mimetype
        })
      );
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Failed to upload file" });
    }
  }
  try {
    const newsId = await news.createNewsArticle(
      {
        headline: req.body.json.headline,
        body: req.body.json.body,
        link: req.body.json.link
      },
      fileKey
        ? {
            objectKey: fileKey,
            originalName: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
          }
        : null
    );

    return res.status(200).json({ id: newsId });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to create news article" });
  }
};

const deleteNews = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required()
  });

  const validation = schema.validate(req.params);
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message });
  }

  const newsId = req.params.id;

  try {
    // if article has an image, delete the image from S3
    const newsObject = await news.getNewsArticle(newsId);
    if (newsObject?.picture_id) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: newsObject.image_object_key
        })
      );
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Failed to delete news article image" });
  }

  try {
    // delete the news article from the database
    await news.deleteNewsArticle(newsId);
    return res.status(204).json({ message: "News deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to delete news article" });
  }
};

const updateNews = async (req, res) => {
  const paramSchema = Joi.object({
    id: Joi.number().integer().required()
  });

  const paramValidation = paramSchema.validate(req.params);
  if (paramValidation.error) {
    return res
      .status(400)
      .json({ error: paramValidation.error.details[0].message });
  }

  if (req.is("multipart/form-data") && req.body.json) {
    // parse the stringified JSON in the json field into an object
    try {
      req.body.json = JSON.parse(req.body.json);
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  } else if (req.is("application/json")) {
    // make non multipart/form-data requests look like multipart/form-data
    // so that we can use the same code to parse the request body
    req.body = { json: req.body };
  }

  const eventSchema = Joi.object({
    headline: Joi.string().max(255),
    body: Joi.string().max(4096),
    link: Joi.string().uri()
  });

  const eventValidation = eventSchema.validate(req.body.json);
  if (eventValidation.error) {
    return res
      .status(400)
      .json({ error: eventValidation.error.details[0].message });
  }

  const newsId = req.params.id;

  let existingNews = null;
  // check if news exists
  try {
    existingNews = await news.getNewsArticle(newsId);
    if (!existingNews) {
      return res.status(404).json({ error: "News not found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal error" });
  }

  // build the news object to update
  const newsData = {
    headline: req.body.json?.headline ?? existingNews.headline,
    body: req.body.json?.body ?? existingNews.body,
    link: req.body.json?.link ?? existingNews.link
  };

  try {
    // update the news article in the database
    await news.updateNews(newsId, newsData);
    return res.status(204).json({ message: "News updated" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to update news article" });
  }
};

const getSingleNewsArticle = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required()
  });

  const validation = schema.validate(req.params);
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message });
  }

  const newsId = req.params.id;

  try {
    let newsObject = await news.getNewsArticle(newsId);
    if (!newsObject) {
      return res.status(404).json({ error: "News not found" });
    }

    newsObject = { ...newsObject, image_url: getS3Url(news.image_object_key) };

    return res.status(200).json(newsObject);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to get news article" });
  }
};

const getNewsArticles = async (req, res) => {
  const schema = Joi.object({
    limit: Joi.number().integer().min(1).max(1000),
    page: Joi.number().integer().min(1)
  });

  const validation = schema.validate(req.query);
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message });
  }

  const limit = parseInt(req.query?.limit ?? 100); // default to 100
  const page = parseInt(req.query?.page ?? 1); // default to 1
  const offset = (page - 1) * limit;

  try {
    let newsObjects = await news.getNewsArticles(limit, offset);
    newsObjects = newsObjects.map((news) => ({
      ...news,
      image_url: getS3Url(news.image_object_key)
    }));

    return res.status(200).json(newsObjects);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to get news" });
  }
};

module.exports = {
  addNewsArticle,
  deleteNews,
  updateNews,
  getSingleNewsArticle,
  getNewsArticles
};
