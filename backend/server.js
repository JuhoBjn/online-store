const { httpServer } = require("./app");

const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
});
