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

const login = async (req, res) => {
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

  // Check that a user with the email exists.
  let users;
  try {
    users = await userModels.findByEmail(providedCredentials.email);
    if (users.length === 0) {
      throw new Error("No user exists for given email");
    }
  } catch (error) {
    return res.status(401).send(error.message);
  }

  const passwordsMatch = await bcrypt.compare(
    providedCredentials.password,
    users[0].password
  );

  if (!passwordsMatch) {
    return res
      .status(401)
      .send(
        "Invalid credentials. Please check email and password and try again."
      );
  }

  const authenticatedUser = {
    id: users[0].id,
    role: users[0].role,
    firstname: users[0].first_name,
    lastname: users[0].last_name,
    email: users[0].email,
    postalcode: users[0].postal_code,
    city: users[0].city,
    country: users[0].country,
    phone: users[0].phone,
    premium: users[0].premium
  };

  try {
    jwt.sign(authenticatedUser, process.env.JWT_KEY, (error, token) => {
      if (error) throw error;
      authenticatedUser.token = token;
      res.send(authenticatedUser);
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { signup, login };