import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MessageBubble from "./MessageBubble";
import "./Chat.css";

let socket = null;

const connectSocket = (token) => {
  console.log("connecting socket...");
  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: {
      token: token
    }
  });
  console.log("connected socket");
};

const disconnectSocket = () => {
  if (socket) {
    console.log("disconnecting socket");
    socket.disconnect();
  }
};

/**
 * Sends request to server to join direct chat room
 * @param {Object} friend - Friend object
 * @param {String} friend.id - Friend ID
 * @param {String} friend.firstname - Friend first name
 * @param {String} friend.lastname - Friend last name
 * @returns {Promise<void>} Promise that resolves when server responds
 */
const joinDirectChatRoom = async (friend) => {
  if (socket) {
    console.log("joining direct chat room");
    const res = await socket.emitWithAck("join-direct-chat", friend);
    console.log(res);
  }
};

/**
 * Sends request to server to get chat history
 * @param {Object} friend - Friend object
 */
const getChatHistory = (friend) => {
  if (friend && socket) {
    console.log("sending request for chat history");
    socket.emit("get-message-history", friend, (res) => {
      if (res) {
        console.log(res);
      }
    });
  } else {
    console.error("No friend or socket provided");
  }
};

/*
 * Chat component
 * @param {Object} props
 * @param {Object} props.user - User object
 * @param {String} props.user.token - User token
 * @param {String} props.user.firstname - User first name
 * @param {String} props.user.lastname - User last name
 * @param {Object} [props.friend] - Friend object
 * @param {String} props.friend.id - Friend ID
 * @param {String} props.friend.firstname - Friend first name
 * @param {String} props.friend.lastname - Friend last name
 * @param {String} [props.eventId] - Event ID
 * @param {Boolean} [props.isDisabled] - Whether or not to disable chat
 * @param {String} [props.disabledMessage] - Message to display when chat is disabled
 * @returns {JSX.Element} JSX Element for Chat component
 */
const Chat = ({
  user,
  friend = null,
  eventId = null,
  eventName = null,
  isDisabled = false,
  disabledMessage = ""
}) => {
  const [messages, setMessages] = useState([]);

  // Use effect to connect socket on mount and disconnect on unmount
  useEffect(() => {
    if (!user?.token) {
      console.error("No user token");
      return;
    }

    connectSocket(user.token);
    console.log("socket", socket);
    return () => {
      // Clean up socket on unmount
      disconnectSocket();
    };
  }, [user.token]);

  useEffect(() => {
    const joinRoomAndGetChatHistory = async () => {
      await joinDirectChatRoom(friend);
      getChatHistory(friend);
    };

    if (friend) {
      joinRoomAndGetChatHistory();
    }
  }, [friend]);

  const sendMessage = async (message) => {
    console.log("sending message", message);
    if (socket) {
      console.log("socket exists");
      const res = await socket.emitWithAck("send-message", {
        name: `${user.firstname} ${user.lastname}`,
        message: message
      });

      if (res?.status === "Bad request") {
        console.error("Bad request: ", res?.message);
        return;
      }
      console.log(res);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        console.log("message received", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("message-history", (messageHistory) => {
        console.log("message history received", messageHistory);
        setMessages(messageHistory);
      });

      return () => {
        socket.off("message");
        socket.off("message-history");
      };
    } else {
      console.error("No socket");
    }
  }, [user.token]);

  return (
    <div className="chat-container">
      <div className="chat-container__title">Chat</div>
      {eventId && eventName && (
        <div className="chat-container__event-info">
          <div>{eventName}</div>
        </div>
      )}
      {friend && (
        <div className="chat-container__friend-info">
          <div>
            {friend.firstname} {friend.lastname}
          </div>
        </div>
      )}
      <div className="chat-container__messages-container">
        {messages.map((message, index) => (
          <div key={index} className="chat-container__message-container">
            <MessageBubble
              message={message}
              isMine={message.senderUserId === user.id}
              isGroupChat={Boolean(eventId)}
            />
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const message = e.target.message.value;
          sendMessage(message);
          e.target.message.value = "";
        }}
      >
        {isDisabled && (
          <div className="chat-container__disabled-message">
            {disabledMessage}
          </div>
        )}
        <input
          type="text"
          name="message"
          disabled={isDisabled}
          className="chat-container__message-input"
        />
        <button
          type="submit"
          disabled={isDisabled}
          className="chat-container__send-button"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
