const express = require("express");
const router = express.Router();

const {
  signup,
  login
  //   sendFriendRequest
  //   cancelFriendRequest,
  //   getFriendRequests,
  //   acceptOrDenyFriendRequest,
  //   getFriends,
  //   unFriend
} = require("../controllers/users");

router.post("/signup", signup);

router.post("/login", login);

// router.post(
//   "/:senderUserId/friend-requests/:receiverUserId",
//   sendFriendRequest
// );

// router.delete(
//   "/:senderUserId/friend-requests/:receiverUserId",
//   cancelFriendRequest
// );

// router.get("/:userid/friend-requests", getFriendRequests); // get all pending friend requests

// router.put(
//   "/:userid/friend-requests/:friendRequestId",
//   acceptOrDenyFriendRequest
// );

// router.get("/:userid/friends", getFriends);

// router.delete("/:userid/friends/:friendId", unFriend);

module.exports = router;
