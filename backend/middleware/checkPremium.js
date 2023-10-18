const jwt = require("jsonwebtoken");

const checkPremium = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_KEY, { maxAge: "7d" });
    if (!payload.premium) {
      throw new Error("This functionality is reserved for premium users");
    }
  } catch (error) {
    return res.status(403).send({ message: error.message });
  }
  next();
};

module.exports = checkPremium;
