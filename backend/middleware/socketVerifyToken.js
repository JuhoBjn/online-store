const jwt = require("jsonwebtoken");

const socketVerifyToken = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    const payload = jwt.verify(token, process.env.JWT_KEY, { maxAge: "7d" });
    socket.data.user = payload;
    next();
  } catch (error) {
    next(new Error("Authentication failed"));
  }
};

module.exports = socketVerifyToken;
