import { useState } from "react";
import { io } from "socket.io-client";

/*
 * @param {object} props
 * @param {object} props.user
 * @param {object} props.user.id
 * @param {object} props.user.token
 * @param {object} props.user.firstname
 * @param {object} props.user.lastname
 * @param {object} [props.friend]
 * @param {object} props.friend.id
 * @param {object} props.friend.firstname
 * @param {object} props.friend.lastname
 * @param {string} [props.chatId]
 * @returns {JSX.Element}
 */
const Chat = ({ user, friend = null, chatId = null }) => {
  const [messages, setMessages] = useState([]);

  if (!user?.token) return <div>No user token</div>;
  if (!friend && !chatId) return <div>No friend or chatId</div>;

  const socketUrl = import.meta.env.VITE_SOCKET_URL;
  const socket = io(socketUrl, {
    auth: {
      token: user.token
    }
  });

  socket.on("connect", async () => {
    console.log("connected");

    if (friend) {
      const res = await socket.emitWithAck("join-direct-chat", friend);
      console.log(res);

      await socket.emitWithAck("get-message-history", friend);
    }
  });

  socket.on("message-history", (messageHistory) => {
    console.log("message-history", messageHistory);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");

    socket.off("connect");
    socket.off("disconnect");

    socket.disconnect();
  });

  socket.on("message", (message) => {
    console.log("message", message);
  });

  const sendMessage = async (message) => {
    console.log("send-message", message);
    const res = await socket.emit("send-message", {
      name: `${user.firstname} ${user.lastname}`,
      message: message
    });
    console.log(res);
  };

  return (
    <>
      <div>Chat</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const message = e.target.message.value;
          sendMessage(message);
        }}
      >
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Chat;
