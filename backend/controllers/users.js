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

const sendFriendRequest = async (req, res) => {
  const schema = Joi.object({
    senderUserId: Joi.string().uuid().required(),
    receiverUserId: Joi.string().uuid().required()
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { senderUserId, receiverUserId } = req.params;

  // Check that the sender matches the authenticated user.
  if (senderUserId !== req.user.id) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  // Check that the sender and receiver are not the same user.
  if (senderUserId === receiverUserId) {
    return res
      .status(400)
      .send({ message: "Sender and receiver cannot be the same user" });
  }

  // Check that both users exist.
  let senderUser;
  try {
    senderUser = await userModels.findById(senderUserId);
    if (!senderUser) {
      throw new Error("No user exists with given senderUserId");
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  let receiverUser;
  try {
    receiverUser = await userModels.findById(receiverUserId);
    if (!receiverUser) {
      throw new Error("No user exists with given receiverUserId");
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  // Check that the users are not already friends.
  try {
    const areFriends = await userModels.friendshipExists(
      senderUserId,
      receiverUserId
    );
    if (areFriends) {
      return res.status(400).send({ message: "Already friends" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }

  // Check that the users do not have a pending friend request.
  try {
    const arePendingFriends = await userModels.pendingFriendRequestExists(
      senderUserId,
      receiverUserId
    );
    if (arePendingFriends) {
      return res
        .status(400)
        .send({ message: "Pending friend request already exists" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }

  // Create the friend request.
  try {
    await userModels.addFriendRequest(senderUserId, receiverUserId);
    res.send({ message: "Friend request sent" });
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }
};

// const cancelFriendRequest = async (req, res) => {};

// const getFriendRequests = async (req, res) => {};

// const acceptOrDenyFriendRequest = async (req, res) => {};

// const getFriends = async (req, res) => {};

// const unFriend = async (req, res) => {};

module.exports = {
  signup,
  login,
  sendFriendRequest
  // cancelFriendRequest,
  // getFriendRequests,
  // acceptOrDenyFriendRequest,
  // getFriends,
  // unFriend
};
