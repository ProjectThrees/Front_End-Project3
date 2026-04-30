function formatTimestamp(value) {
    if (!value) return "Unknown time";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Unknown time";

    return date.toLocaleString();
}

export default function MessageBubble({ message, currentUserId }) {
    const isCurrentUser =
        String(message.senderId) === String(currentUserId);

    return (
        <div
            className={`message-row ${isCurrentUser ? "message-row-own" : ""}`}
        >
            <div className={`message-bubble ${isCurrentUser ? "message-own" : ""}`}>
                <div className="message-meta">
          <span className="message-sender">
            {message.senderName || "Unknown sender"}
          </span>
                    <span className="message-time">
            {formatTimestamp(message.sentAt || message.createdAt)}
          </span>
                </div>

                <p className="message-text">{message.content}</p>
            </div>
        </div>
    );
}