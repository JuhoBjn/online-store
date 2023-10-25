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
    return res.status(400).send(error.details[0].message);
  }

  // Make sure no duplicate users are created.
  try {
    const user = await userModels.findByEmail(providedCredentials.email);
    if (user) throw new Error("A user with this email already exists");
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
    return res.status(500).send(error.message);
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
    return res.status(400).send(error.details[0].message);
  }

  // Check that a user with the email exists.
  let user;
  try {
    user = await userModels.findByEmail(providedCredentials.email);
    if (!user) {
      throw new Error("No user exists for given email");
    }
  } catch (error) {
    return res.status(401).send(error.message);
  }

  const passwordsMatch = await bcrypt.compare(
    providedCredentials.password,
    user.password
  );

  if (!passwordsMatch) {
    return res
      .status(401)
      .send(
        "Invalid credentials. Please check email and password and try again."
      );
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
    return res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const paramSchema = Joi.object({
    userid: Joi.string().required()
  });

  const bodySchema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    postal_code: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    phone: Joi.string(),
    premium: Joi.boolean()
  });

  try {
    const { error: paramError } = paramSchema.validate(req.params);
    const { error: bodyError } = bodySchema.validate(req.body);
    if (paramError) throw paramError;
    if (bodyError) throw bodyError;
  } catch (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const providedUserDetails = {
    id: req.params.userid,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    postal_code: req.body.postal_code,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    premium: req.body.premium
  };

  try {
    let user = await userModels.findById(providedUserDetails.id);
    if (!user) {
      return res.status(404).json({ message: "No user exists for given id" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }

  // remove undefined values from providedUserDetails, so that
  // userModels.update() doesn't try to set null values in the database.
  Object.keys(providedUserDetails).forEach((key) => {
    if (providedUserDetails[key] === undefined) {
      delete providedUserDetails[key];
    }
  });

  try {
    const updatedUser = await userModels.update(
      providedUserDetails.id,
      providedUserDetails
    );
    if (!updatedUser) throw new Error("Failed to update user");
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login, updateUser };
