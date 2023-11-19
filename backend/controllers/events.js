// const Joi = require("joi");

const addEvent = async (req, res) => {
  // const schema = Joi.object({
  //   name: Joi.string().required(),
  //   description: Joi.string().required(),
  //   starts_at: Joi.date().required(),
  //   ends_at: Joi.date().required()
  // });
  // const validation = schema.validate(req.body);
  // if (validation.error) {
  //   return res.status(400).json({ error: validation.error.details[0].message });
  // }
  // console.log(req.file);
  console.log("http://localhost:9000/goldenage-uploads/" + req.file.key);
};

// const deleteEvent = async (req, res) => {};

// const updateEvent = async (req, res) => {};

// const getEvent = async (req, res) => {};

// const getEvents = async (req, res) => {};

module.exports = { addEvent };
