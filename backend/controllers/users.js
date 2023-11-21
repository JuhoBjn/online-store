const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: genUuid } = require("uuid");
const userModels = require("../models/users");
const eventsModels = require("../models/events");

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
    bio: user.bio,
    email: user.email,
    email_hash: user.email_hash,
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

const getUser = async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().uuid().required()
  });

  const paramUserId = req.params.id;

  const { error } = schema.validate({ id: paramUserId });
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  // Fetch and return full profile if the requester is requesting their own profile.
  // Return only brief info if the user is requesting for someone else's profile.
  let response;
  if (paramUserId === req.user.id) {
    response = await userModels.findById(paramUserId);
  } else {
    const user = await userModels.findById(paramUserId);
    const isFriend = await userModels.friendshipExists(
      req.user.id,
      paramUserId
    );
    response = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      emailhash: user.email_hash,
      bio: user.bio,
      city: user.city,
      isFriend: isFriend
    };
  }

  if (response) {
    res.status(200).json(response);
  } else {
    res.status(404).json({ message: "No user found with given id" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await userModels.findAll();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().uuid().required()
  });
  const providedCredentials = {
    id: req.params.id
  };
  const authenticatedUserId = req.user.id;
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

const updateUser = async (req, res) => {
  const paramSchema = Joi.object({
    id: Joi.string().uuid().required()
  });

  const bodySchema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    bio: Joi.string(),
    email: Joi.string().email(),
    postal_code: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    phone: Joi.string(),
    premium: Joi.boolean()
  });

  try {
    const { error } = paramSchema.validate(req.params);
    if (error) throw error;
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const { error } = bodySchema.validate(req.body);
    if (error) throw error;
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Can only update own details.
  if (req.user.id !== req.params.id) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  const providedUserDetails = {
    id: req.params.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    bio: req.body.bio,
    email: req.body.email,
    postal_code: req.body.postal_code,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    premium: req.body.premium // TODO: Upgrading to premium should be moved to a separate endpoint with "payment" validation in the future.
  };

  const filteredUser = {};
  for (const key in providedUserDetails) {
    if (
      providedUserDetails[key] !== null &&
      providedUserDetails[key] !== undefined
    ) {
      filteredUser[key] = providedUserDetails[key];
    }
  }

  // if nothing to update (nothing except id in filteredUser) return 400
  // (this deals with: empty body will throw mysql error)
  if (Object.keys(filteredUser).length === 1) {
    return res.status(400).send({ message: "Nothing to update" });
  }

  try {
    const updatedUser = await userModels.update(filteredUser);
    if (!updatedUser) throw new Error("Failed to update user");
    return res.status(200).send(updatedUser);
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
    return res.status(403).send({ message: "Unauthorized" });
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
    return res.status(404).send({ message: error.message });
  }

  let receiverUser;
  try {
    receiverUser = await userModels.findById(receiverUserId);
    if (!receiverUser) {
      throw new Error("No user exists with given receiverUserId");
    }
  } catch (error) {
    return res.status(404).send({ message: error.message });
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

const getSentFriendRequests = async (req, res) => {
  const schema = Joi.object({
    userid: Joi.string().uuid().required()
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { userid } = req.params;

  // Check that the userid matches the authenticated user.
  if (userid !== req.user.id) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  // Check that the user exists.
  let user;
  try {
    user = await userModels.findById(userid);
    if (!user) {
      res.status(404).send({ message: "No user exists with given userid" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }

  // Get all pending friend requests.
  try {
    const friendRequests = await userModels.getSentFriendRequests(userid);
    res.send(friendRequests);
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }
};

const getReceivedFriendRequests = async (req, res) => {
  const schema = Joi.object({
    userid: Joi.string().uuid().required()
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { userid } = req.params;

  // Check that the userid matches the authenticated user.
  if (userid !== req.user.id) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  // Check that the user exists.
  let user;
  try {
    user = await userModels.findById(userid);
    if (!user) {
      res.status(404).send({ message: "No user exists with given userid" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }

  // Get all pending friend requests.
  try {
    const friendRequests = await userModels.getReceivedFriendRequests(userid);
    res.send(friendRequests);
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }
};

const acceptOrDenyFriendRequest = async (req, res) => {
  const paramSchema = Joi.object({
    userid: Joi.string().uuid().required(),
    friendRequestId: Joi.number().required()
  });

  const bodySchema = Joi.object({
    status: Joi.string().valid("accepted", "denied").required()
  });

  const { error: paramError } = paramSchema.validate(req.params);
  if (paramError) {
    return res.status(400).send({ message: paramError.details[0].message });
  }

  const { error: bodyError } = bodySchema.validate(req.body);
  if (bodyError) {
    return res.status(400).send({ message: bodyError.details[0].message });
  }

  const { userid, friendRequestId } = req.params;
  const { status } = req.body;

  // Check that the receiver is the authenticated user.
  if (userid !== req.user.id) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  // Check that the user exists.
  let user;
  try {
    user = await userModels.findById(userid);
    if (!user) {
      res.status(404).send({ message: "No user exists with given userid" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }

  // Check that the friend request exists.
  let friendRequest;
  try {
    friendRequest = await userModels.findFriendRequestById(friendRequestId);
    if (!friendRequest) {
      return res.status(404).send({
        message: "No friend request exists with given friendRequestId"
      });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }

  // Check that the friend request is pending.
  if (!friendRequest.is_request_pending) {
    return res.status(400).send({ message: "Friend request is not pending" });
  }

  // Check that the friend request is for the user that should accept or deny it.
  if (friendRequest.requested_friend_user_id !== userid) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  // Accept or deny the friend request.
  if (status === "accepted") {
    try {
      await userModels.acceptFriendRequest(
        friendRequestId,
        friendRequest.requester_user_id,
        friendRequest.requested_friend_user_id
      );
      return res.status(201).send({
        message: "Friend request accepted and friendship created"
      });
    } catch (error) {
      return res.status(500).send({ message: "Internal error" });
    }
  } else if (status === "denied") {
    try {
      await userModels.updateFriendRequest(friendRequestId, {
        is_rejected: true
      });
      return res.status(200).send({ message: "Friend request denied" });
    } catch (error) {
      return res.status(500).send({ message: "Internal error" });
    }
  }
};

const getFriends = async (req, res) => {
  const schema = Joi.object({
    userid: Joi.string().uuid().required()
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { userid } = req.params;

  // Check that the userid matches the authenticated user.
  if (userid !== req.user.id) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  // Check that the user exists.
  let user;
  try {
    user = await userModels.findById(userid);
    if (!user) {
      return res
        .status(404)
        .send({ message: "No user exists with given userid" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }

  // Get all friends.
  try {
    const friends = await userModels.findFriendsByUserId(userid);
    res.status(200).send(friends);
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }
};

const unFriend = async (req, res) => {
  const schema = Joi.object({
    userid: Joi.string().uuid().required(),
    friendId: Joi.string().uuid().required()
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { userid, friendId } = req.params;

  // Check that the userid matches the authenticated user.
  if (userid !== req.user.id) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  // Check that the user exists.
  let user;
  try {
    user = await userModels.findById(userid);
    if (!user) {
      return res
        .status(404)
        .send({ message: "No user exists with given userid" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }

  // Check that the friend user exists.
  let friend;
  try {
    friend = await userModels.findById(friendId);
    if (!friend) {
      return res
        .status(404)
        .send({ message: "No user exists with given friendId" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }

  // Check that the users are friends.
  try {
    const areFriends = await userModels.friendshipExists(userid, friendId);
    if (!areFriends) {
      return res.status(404).send({ message: "Users are not friends" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }

  // Unfriend the users.
  try {
    await userModels.unFriend(userid, friendId);
    res.status(200).send({ message: "Unfriended" });
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }
};

const getEvents = async (req, res) => {
  const schema = Joi.object({
    userid: Joi.string().uuid().required()
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { userid } = req.params;

  // Check that the userid matches the authenticated user.
  if (userid !== req.user.id) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  // Check that the user exists.
  let user;
  try {
    user = await userModels.findById(userid);
    if (!user) {
      return res
        .status(404)
        .send({ message: "No user exists with given userid" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }

  // Get all events.
  try {
    const events = await eventsModels.findEventsByUserId(userid);
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
};

module.exports = {
  signup,
  login,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  sendFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
  acceptOrDenyFriendRequest,
  getFriends,
  unFriend,
  getEvents
};
