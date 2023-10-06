const Joi = require("joi");
const users = require("../models/users");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendPasswordResetEmail } = require("../services/passwordResetEmail");

const resetPasswordEmail = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  const { email } = req.body;

  const user = await users.findByEmail(email);
  if (user === null) {
    // user does not exist
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "User with that email does not exist" });
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_KEY,
    { expiresIn: "30m" } // token expires in 30 minutes
  );

  try {
    await sendPasswordResetEmail(user, token); // send email
  } catch (err) {
    console.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Internal server error" });
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "Reset password email sent" });
};

const setNewPassword = async (req, res) => {
  const schema = Joi.object({
    password: Joi.string()
      .min(8)
      .max(72)
      .pattern(
        // Password must be at least 8 characters long,
        // contain at least one upper case letter, one lower case letter and one number.
        new RegExp("^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z].{8,}$")
      )
      .required(),
    token: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: error.details[0].message });
  }

  const { password, token } = req.body;

  let decodedToken; // declare variable outside try-catch block

  try {
    // verify token
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
    if (!decodedToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ error: "Unauthorized" });
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ error: "Token expired" });
    }
    return res.status(StatusCodes.UNAUTHORIZED).send({ error: "Unauthorized" });
  }

  // get user id from decoded token
  const { id: userId } = decodedToken;

  try {
    // check if user exists
    const foundUser = await users.findById(userId);
    if (!foundUser) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ error: "Unauthorized" });
    }

    // bcrypt new password
    const password_hash = await bcrypt.hash(password, 12);

    // update password
    await users.update(userId, {
      password: password_hash
    });

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Internal server error" });
  }
};

module.exports = {
  resetPasswordEmail,
  setNewPassword
};
