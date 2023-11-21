const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {
  signup,
  login,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  sendFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
  acceptOrDenyFriendRequest,
  getFriends,
  unFriend
} = require("../controllers/users");

router.post("/signup", signup);

router.post("/login", login);

router.use(verifyToken);

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post(
  "/:senderUserId/friend-requests/:receiverUserId",
  sendFriendRequest
);

router.get("/:userid/friend-requests/sent", getSentFriendRequests);

router.get("/:userid/friend-requests/received", getReceivedFriendRequests);

router.put(
  "/:userid/friend-requests/:friendRequestId",
  acceptOrDenyFriendRequest
);

router.get("/:userid/friends", getFriends);

router.delete("/:userid/friends/:friendId", unFriend);

module.exports = router;
