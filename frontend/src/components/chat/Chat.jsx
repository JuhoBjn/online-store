import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import MessageBubble from "./MessageBubble";
import "./Chat.css";

let socket = null;

const connectSocket = (token) => {
  console.log("connecting socket...");
  socket = io(import.meta.env.VITE_BACKEND_API || "http://localhost:5000", {
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
 * Sends request to server to join event chat room
 * @param {String} eventId - Event ID
 * @returns {Promise<void>} Promise that resolves when server responds
 */
const joinEventChatRoom = async (eventId) => {
  if (socket) {
    console.log("joining event chat room");
    const res = await socket.emitWithAck("join-event-chat", {
      eventId: eventId
    });
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

/**
 * Sends request to server to get event chat history
 * @param {String} eventId - Event ID
 */
const getEventChatHistory = (eventId) => {
  if (eventId && socket) {
    console.log("sending request for event chat history");
    socket.emit("get-event-message-history", { eventId: eventId }, (res) => {
      if (res) {
        console.log(res);
      }
    });
  } else {
    console.error("No event ID or socket provided");
  }
};

/*
 * Chat component
 * @param {Object} props
 * @param {Object} props.user - User object
 * @param {String} props.user.token - User token
 * @param {String} props.user.firstname - User first name
 * @param {String} props.user.lastname - User last name
 * @param {String} props.user.id - User ID
 * @param {Object} [props.friend] - Friend object
 * @param {String} props.friend.id - Friend ID
 * @param {String} props.friend.firstname - Friend first name
 * @param {String} props.friend.lastname - Friend last name
 * @param {String} [props.eventId] - Event ID
 * @param {String} [props.eventName] - Event name
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
      return;
    }

    connectSocket(user?.token);
    console.log("socket", socket);
    return () => {
      // Clean up socket on unmount
      disconnectSocket();
    };
  }, [user?.token]);

  useEffect(() => {
    setMessages([]); // Clear old messages when friend changes
    socket.connect(); // Need to reconnect socket after disconnecting as Chat component is not unmounted
    const joinRoomAndGetChatHistory = async () => {
      await joinDirectChatRoom(friend);
      getChatHistory(friend);
    };

    if (friend) {
      joinRoomAndGetChatHistory();
    }
  }, [friend]);

  useEffect(() => {
    setMessages([]); // Clear old messages when event ID changes
    socket.connect(); // Need to reconnect socket after disconnecting as Chat component is not unmounted
    const joinRoomAndGetChatHistory = async () => {
      await joinEventChatRoom(eventId);
      getEventChatHistory(eventId);
    };

    if (eventId) {
      joinRoomAndGetChatHistory();
    }
  }, [eventId]);

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
  }, [user?.token]);

  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-container__chat-info">
        <h1 className="chat-container__chat-info__title">Chat</h1>
        {eventId && eventName && (
          <div className="chat-container__chat-info__event-info">
            <p>{eventName}</p>
          </div>
        )}
        {friend && (
          <div className="chat-container__chat-info__friend-info">
            <p>
              {friend.firstname} {friend.lastname}
            </p>
          </div>
        )}
      </div>
      <div className="chat-container__messages-container">
        {messages.map((message, index) => (
          <div key={index} className="chat-container__message-container">
            <MessageBubble
              message={message}
              isMine={message.senderUserId === user.id}
              isGroupChat={Boolean(eventId)}
              ref={index === messages.length - 1 ? endOfMessagesRef : null}
            />
          </div>
        ))}
      </div>
      <div className="chat-container__bottom-area">
        {isDisabled ? (
          <p className="chat-container__bottom-area__disabled-message">
            {disabledMessage}
          </p>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const message = e.target.message.value;
            sendMessage(message);
            e.target.message.value = "";
          }}
        >
          <input
            data-testid="message-box"
            name="message"
            placeholder="Send a message"
            disabled={isDisabled}
            className="chat-container__bottom-area__message-input"
            required
          />
          <button
            data-testid="send-button"
            type="submit"
            disabled={isDisabled}
            className="chat-container__bottom-area__send-button"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
