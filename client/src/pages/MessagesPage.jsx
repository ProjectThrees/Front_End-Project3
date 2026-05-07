import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getListingById,
    getMessagesByListingId,
    sendMessageForListing,
} from "../api/marketplaceApi";
import MessageBubble from "../components/MessageBubble";

export default function MessagesPage() {
    const { listingId } = useParams();

    const [listing, setListing] = useState(null);
    const [messages, setMessages] = useState([]);
    const [draft, setDraft] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    const { user } = useAuth();
    const currentUserId = user.id;

    useEffect(() => {
        async function loadPage() {
            try {
                setLoading(true);
                setError("");

                const [listingData, messageData] = await Promise.all([
                    getListingById(listingId),
                    getMessagesByListingId(listingId),
                ]);

                setListing(listingData);
                setMessages(Array.isArray(messageData) ? messageData : []);
            } catch (err) {
                console.error(err);
                setError("Could not load this conversation.");
            } finally {
                setLoading(false);
            }
        }

        loadPage();
    }, [listingId]);

    async function handleSubmit(event) {
        event.preventDefault();

        const trimmed = draft.trim();
        if (!trimmed) return;

        try {
            setSending(true);
            setError("");

            const payload = {
                senderId: currentUserId,
                content: trimmed,
            };

            const createdMessage = await sendMessageForListing(listingId, payload);

            setMessages((previous) => [...previous, createdMessage]);
            setDraft("");
        } catch (err) {
            console.error(err);
            setError("Message could not be sent. Please try again.");
        } finally {
            setSending(false);
        }
    }

    if (loading) {
        return <section className="page-panel">Loading messages...</section>;
    }

    return (
        <section className="page-panel">
            <div className="page-heading">
                <div>
                    <h1>Messages</h1>
                    <p className="muted">
                        Conversation for{" "}
                        <strong>{listing?.title || `Listing #${listingId}`}</strong>
                    </p>
                </div>

                <Link className="button secondary" to={`/listings/${listingId}`}>
                    Back to Listing
                </Link>
            </div>

            {error && <div className="alert error">{error}</div>}

            <div className="messages-panel">
                <div className="messages-list">
                    {messages.length === 0 ? (
                        <div className="empty-state">
                            <h2>No messages yet</h2>
                            <p>Start the conversation with the buyer or seller below.</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <MessageBubble
                                key={message.id ?? `${message.senderId}-${message.sentAt}`}
                                message={message}
                                currentUserId={currentUserId}
                            />
                        ))
                    )}
                </div>

                <form className="message-form" onSubmit={handleSubmit}>
                    <label htmlFor="messageInput" className="form-label">
                        New Message
                    </label>

                    <textarea
                        id="messageInput"
                        className="textarea"
                        rows="4"
                        placeholder="Type your message here..."
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                    />

                    <div className="message-form-actions">
                        <button className="button primary" type="submit" disabled={sending}>
                            {sending ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
