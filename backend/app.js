const express = require("express");

// Load test environment variables when running tests
if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: ".env.test" });
} else {
  require("dotenv").config({ path: ".env" });
}

const app = express();

app.get("/healthz", (req, res) => {
  res.send("ok");
});

module.exports = app;
