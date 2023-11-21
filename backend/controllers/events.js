const Joi = require("joi");
const { s3 } = require("../s3/multer");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const events = require("../models/events");
const users = require("../models/users");
const { getS3Url } = require("../s3/util");

const addEvent = async (req, res) => {
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
    name: Joi.string().max(255).required(),
    description: Joi.string().max(4096).required(),
    starts_at: Joi.date().required(),
    ends_at: Joi.date().required()
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
    const eventId = await events.createEvent(
      {
        name: req.body.json.name,
        description: req.body.json.description,
        starts_at: new Date(req.body.json.starts_at),
        ends_at: new Date(req.body.json.ends_at)
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

    return res.status(200).json({ id: eventId });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to create event" });
  }
};

const deleteEvent = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required()
  });

  const validation = schema.validate(req.params);
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message });
  }

  const eventId = req.params.id;

  try {
    // if event has an image, delete the image from S3
    const event = await events.getEvent(eventId);
    if (event?.picture_id) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: event.image_object_key
        })
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to delete event image" });
  }

  try {
    // delete the event from the database
    await events.deleteEvent(eventId);
    return res.status(204).json({ message: "Event deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to delete event" });
  }
};

const updateEvent = async (req, res) => {
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
    name: Joi.string().max(255),
    description: Joi.string().max(4096),
    starts_at: Joi.date(),
    ends_at: Joi.date()
  });

  const eventValidation = eventSchema.validate(req.body.json);
  if (eventValidation.error) {
    return res
      .status(400)
      .json({ error: eventValidation.error.details[0].message });
  }

  const eventId = req.params.id;

  let existingEvent = null;
  // check if event exists
  try {
    existingEvent = await events.getEvent(eventId);
    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal error" });
  }

  // build the event object to update
  const eventData = {
    name: req.body.json?.name ?? existingEvent.name,
    description: req.body.json?.description ?? existingEvent.description,
    starts_at: req.body.json?.starts_at
      ? new Date(req.body.json?.starts_at)
      : existingEvent.starts_at,
    ends_at: req.body.json?.ends_at
      ? new Date(req.body.json?.ends_at)
      : existingEvent.ends_at
  };

  try {
    // update the event in the database
    await events.updateEvent(eventId, eventData);
    return res.status(204).json({ message: "Event updated" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to update event" });
  }
};

const getEvent = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required()
  });

  const validation = schema.validate(req.params);
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message });
  }

  const eventId = req.params.id;

  try {
    let event = await events.getEvent(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    event = { ...event, image_url: getS3Url(event.image_object_key) };

    return res.status(200).json(event);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to get event" });
  }
};

const getEvents = async (req, res) => {
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
    let eventsList = await events.getEvents(limit, offset);
    eventsList = eventsList.map((event) => ({
      ...event,
      image_url: getS3Url(event.image_object_key)
    }));

    return res.status(200).json(eventsList);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to get events" });
  }
};

const addAttendee = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    userId: Joi.string().uuid().required()
  });

  const validation = schema.validate({ ...req.params, ...req.body });
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message });
  }

  const eventId = req.params.id;
  const userId = req.body.userId;

  try {
    await events.addAttendee(eventId, userId);
    return res.status(204).json({ message: "Attendee added" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to add attendee" });
  }
};

const deleteAttendee = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    userId: Joi.string().uuid().required()
  });

  const validation = schema.validate(req.params);
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message });
  }

  const eventId = req.params.id;
  const userId = req.params.userId;

  // check if user matches the user in the token
  if (req.user.id !== userId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // check if event exists
  try {
    const event = await events.getEvent(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal error" });
  }

  // check if user exists
  try {
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal error" });
  }

  try {
    await events.deleteAttendee(eventId, userId);
    return res.status(204).json({ message: "Attendee deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to delete attendee" });
  }
};

const getEventAttendees = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required()
  });

  const validation = schema.validate(req.params);
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message });
  }

  const eventId = req.params.id;

  try {
    const attendees = await events.getEventAttendees(eventId);
    return res.status(200).json(attendees);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to get event attendees" });
  }
};

module.exports = {
  addEvent,
  deleteEvent,
  updateEvent,
  getEvent,
  getEvents,
  addAttendee,
  deleteAttendee,
  getEventAttendees
};
