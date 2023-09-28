const express = require("express");

const app = express();

app.use(express.json());

app.get("/healthz", (req, res) => {
  res.send("ok");
});

const users = require("./routes/users");
app.use("/api/users", users);

module.exports = app;
