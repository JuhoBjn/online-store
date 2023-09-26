const app = require("./app");

// Load test environment variables when running tests
if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: ".env.test" });
} else {
  require("dotenv").config({ path: ".env" });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
});
