const express = require("express");
const cors = require("cors");

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

const passwordReset = require("./routes/password-reset");
app.use("/api/password-reset", passwordReset);

module.exports = app;
