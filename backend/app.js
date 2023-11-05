const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

// Load test environment variables when running tests
if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: ".env.test" });
} else {
  require("dotenv").config({ path: ".env" });
}

const app = express();

const corsOptions = {
  origin: [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "https://onlinestore-frontend-stg.onrender.com",
    "https://onlinestore-frontend-prod.onrender.com",
    process.env.FRONTEND_URL
  ],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/healthz", (req, res) => {
  res.send("ok");
});

const users = require("./routes/users");
app.use("/api/users", users);

const io = new Server({
  cors: {
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "https://onlinestore-frontend-stg.onrender.com",
      "https://onlinestore-frontend-prod.onrender.com",
      `http://localhost:${process.env.PORT || 5000}`
    ],
    credentials: true,
    optionsSuccessStatus: 200
  }
});

const registerChatHandlers = require("./chat/chatHandlers");
const socketVerifyToken = require("./middleware/socketVerifyToken");

io.use(socketVerifyToken);

io.on("connection", (socket) => {
  registerChatHandlers(io, socket);

  socket.on("disconnect", () => {
    if (socket.data.roomId) {
      io.broadcast.to(socket.data.roomId).emit("room-notification", {
        message: `${socket.data.user.firstname} ${socket.data.user.lastname} left the chat`
      });
    }
  });

  socket.on("connect_error", (error) => {
    console.log(error.message);
  });
});

module.exports = { app, io };
