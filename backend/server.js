const { app, io } = require("./app");

const port = process.env.API_PORT || 5000;
const socketIoPort = process.env.SOCKET_IO_PORT || 5005;

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
  io.listen(socketIoPort);
});
