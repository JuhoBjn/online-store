const express = require("express");

// Load test environment variables when running tests
if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: ".env.test" });
} else {
  require("dotenv").config({ path: ".env" });
}

const app = express();

app.use(express.json());

app.get("/healthz", (req, res) => {
  res.send("ok");
});

const users = require("./routes/users");
app.use("/api/users", users);

const passwordReset = require("./routes/password-reset");
app.use("/api/password-reset", passwordReset);

module.exports = app;
