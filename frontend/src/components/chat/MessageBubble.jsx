const MessageBubble = ({ message, isMine, isGroupChat }) => {
  const { message: textContent, sentAt, name } = message;

  return (
    <div
      className={`chat-message-bubble ${
        isMine ? "chat-message-bubble--mine" : "chat-message-bubble--theirs"
      }`}
    >
      <div className="chat-message-bubble__content">
        {isGroupChat && !isMine && (
          <div className="chat-message-bubble__name">{name}</div>
        )}

        <div className="chat-message-bubble__text">{textContent}</div>
        <div className="chat-message-bubble__time">{sentAt}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
