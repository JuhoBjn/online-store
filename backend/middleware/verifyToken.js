const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_KEY, { maxAge: "7d" });
    req.body.role_id = payload.role_id;
    next();
  } catch (error) {
    res.status(401).send({ message: "Authentication failed" });
  }
};

module.exports = verifyToken;
