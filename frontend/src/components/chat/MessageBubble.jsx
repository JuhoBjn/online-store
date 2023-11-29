import "./MessageBubble.css";
import formatTime from "./timeFormat";
import { Link } from "react-router-dom";

const MessageBubble = ({ message, isMine, isGroupChat }) => {
  const { message: textContent, sentAt, name, senderUserId } = message;

  return (
    <div className="chat-message-bubble-container">
      <div className="chat-message-bubble">
        <div
          className={`chat-message-bubble__elements ${
            isMine
              ? "chat-message-bubble__elements--mine"
              : "chat-message-bubble__elements--theirs"
          }`}
        >
          {isGroupChat && !isMine && (
            <div className="chat-message-bubble__name">
              <Link to={`/user/${senderUserId}`}>{name}</Link>{" "}
            </div>
          )}
          <div className="chat-message-bubble__content">{textContent}</div>
          <div className="chat-message-bubble__time">{formatTime(sentAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
