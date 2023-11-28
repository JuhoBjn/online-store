import "./MessageBubble.css";
import formatTime from "./timeFormat";

const MessageBubble = ({ message, isMine, isGroupChat }) => {
  const { message: textContent, sentAt, name } = message;

  return (
    <div className="chat-message-bubble-container">
      <div
        className={`chat-message-bubble ${
          isMine ? "chat-message-bubble--mine" : "chat-message-bubble--theirs"
        }`}
      >
        <div>
          {isGroupChat && !isMine && (
            <div className="chat-message-bubble__name">{name}</div>
          )}
          <div className="chat-message-bubble__content">
            <div className="chat-message-bubble__text">{textContent}</div>
          </div>
          <div className="chat-message-bubble__time">{formatTime(sentAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
