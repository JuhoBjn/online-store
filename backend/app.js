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
    "http://localhost:5173",
    "https://onlinestore-frontend-stg.onrender.com",
    "https://onlinestore-frontend-prod.onrender.com"
  ],
  optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/healthz", (req, res) => {
  res.send("ok");
});

const users = require("./routes/users");
app.use("/api/users", users);

module.exports = app;
