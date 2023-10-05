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

module.exports = {
  resetPasswordEmail,
};