const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: genUuid } = require("uuid");

const userModels = require("../models/users");

const signup = async (req, res) => {
  // Password must be at least 8 characters long,
  // contain at least one upper case letter, one lower case letter and one number.
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        new RegExp("^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z].{8,}$")
      )
      .required()
  });

  const providedCredentials = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const { error } = schema.validate(providedCredentials);
    if (error) throw error;
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Make sure no duplicate users are created.
  try {
    const users = await userModels.findByEmail(providedCredentials.email);
    if (users.length > 0)
      throw new Error("A user with this email already exists");
  } catch (error) {
    return res.status(400).send(error.message);
  }

  const newUser = {
    id: genUuid(),
    email: providedCredentials.email,
    password: bcrypt.hashSync(providedCredentials.password, 12)
  };

  try {
    const createdUser = await userModels.create(newUser);
    if (createdUser.length === 0) throw new Error("Failed to create new user");
    jwt.sign(createdUser[0], process.env.JWT_KEY, (err, token) => {
      if (err) throw err;
      createdUser[0].token = token;
      res.status(201).send(createdUser[0]);
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = signup;
