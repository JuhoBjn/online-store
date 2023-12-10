const { httpServer } = require("./app");

const port = process.env.API_PORT || 5000;

httpServer.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
});
