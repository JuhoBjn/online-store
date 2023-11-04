const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: genUuid } = require("uuid");
const userModels = require("../models/users");
const verifyToken = require("../middleware/verifyToken");

const getUser = async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().uuid().required()
  });
  const providedCredentials = {
    id: req.params.id
  };
  try {
    const { error } = schema.validate(providedCredentials);
    if (error) throw error;
  } catch (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const response = await userModels.findById(providedCredentials.id);
  if (response) {
    res.status(200).json({
      id: response.id,
      first_name: response.first_name,
      last_name: response.last_name,
      email: response.email,
      postal_code: response.postal_code,
      city: response.city,
      country: response.country,
      phone: response.phone,
      premium: response.premium
    });
  } else {
    res.status(404).json({ message: "No user found with given id" });
  }
};

const getAllUsers = async (req, res) => {
  console.log(req.params);
  const response = await userModels.findAll();
  if (response) {
    res.status(200).json({
      id: response.id,
      first_name: response.first_name,
      last_name: response.last_name,
      email: response.email,
      postal_code: response.postal_code,
      city: response.city,
      country: response.country,
      phone: response.phone,
      premium: response.premium
    });
  } else {
    res.status(404).json({ message: "No users found" });
  }
};

const deleteUser = async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().uuid().required()
  });
  const providedCredentials = {
    id: req.params.id
  };
  const authenticatedUserId = req.user.id;;
  console.log(req.body)
  try {
    const { error } = schema.validate(providedCredentials);
    if (error) throw error;
  } catch (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const userToDelete = await userModels.findById(providedCredentials.id);

  if (!userToDelete) {
    return res.status(404).json({ message: "User not found" });
  }

  if (userToDelete.id === authenticatedUserId) {
    await userModels.delete(userToDelete.id);
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(403).json({
      message: "Unauthorized: You do not have permission to delete this user"
    });
  }
};

const signup = async (req, res) => {
  // Password must be at least 8 characters long,
  // contain at least one upper case letter, one lower case letter and one number.
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}$"))
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
    return res.status(400).send({ message: error.details[0].message });
  }

  // Make sure no duplicate users are created.
  try {
    const user = await userModels.findByEmail(providedCredentials.email);
    if (user) throw new Error("A user with this email already exists");
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  const newUser = {
    id: genUuid(),
    email: providedCredentials.email,
    password: bcrypt.hashSync(providedCredentials.password, 12)
  };

  try {
    const createdUser = await userModels.create(newUser);
    if (!createdUser) throw new Error("Failed to create new user");

    const tokenPayload = {
      id: createdUser.id,
      role_id: createdUser.role_id,
      premium: createdUser.premium
    };

    jwt.sign(
      tokenPayload,
      process.env.JWT_KEY,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        createdUser.token = token;
        // role_id is returned only as part of the JSON Web Token.
        delete createdUser.role_id;
        res.status(201).send(createdUser);
      }
    );
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        // Password must be at least 8 characters long,
        // contain at least one upper case letter, one lower case letter and one number.
        new RegExp("^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}$")
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
    return res.status(400).send({ message: error.details[0].message });
  }

  // Check that a user with the email exists.
  let user;
  try {
    user = await userModels.findByEmail(providedCredentials.email);
    if (!user) {
      throw new Error("No user exists for given email");
    }
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }

  const passwordsMatch = await bcrypt.compare(
    providedCredentials.password,
    user.password
  );

  if (!passwordsMatch) {
    return res.status(401).send({
      message:
        "Invalid credentials. Please check email and password and try again."
    });
  }

  const authenticatedUser = {
    id: user.id,
    role: user.role,
    firstname: user.first_name,
    lastname: user.last_name,
    email: user.email,
    postalcode: user.postal_code,
    city: user.city,
    country: user.country,
    phone: user.phone,
    premium: user.premium
  };

  const tokenPayload = {
    id: user.id,
    role_id: user.role_id,
    premium: user.premium
  };

  try {
    jwt.sign(
      tokenPayload,
      process.env.JWT_KEY,
      { expiresIn: "7d" },
      (error, token) => {
        if (error) throw error;
        authenticatedUser.token = token;
        res.send(authenticatedUser);
      }
    );
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { signup, login, getUser, getAllUsers, deleteUser };
