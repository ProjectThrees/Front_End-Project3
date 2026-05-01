import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchListings } from "../services/api";

const CONDITION_COLORS = {
    NEW: { bg: "#dcfce7", text: "#166534" },
    LIKE_NEW: { bg: "#d1fae5", text: "#065f46" },
    GOOD: { bg: "#dbeafe", text: "#1e40af" },
    FAIR: { bg: "#fef3c7", text: "#92400e" },
    POOR: { bg: "#fee2e2", text: "#991b1b" },
};

function ListingCard({ listing }) {
    const conditionLabel = listing.condition?.replace(/_/g, " ") || "Unknown";
    const conditionStyle = CONDITION_COLORS[listing.condition] || { bg: "#f3f4f6", text: "#374151" };

    return (
        <Link to={`/listings/${listing.id}`} className="listing-card">
            <div className="listing-card__image-wrap">
                {listing.imageUrl ? (
                    <img src={listing.imageUrl} alt={listing.title} className="listing-card__image" />
                ) : (
                    <div className="listing-card__image-placeholder">
                        <span>📦</span>
                    </div>
                )}
                <span
                    className="listing-card__condition"
                    style={{ background: conditionStyle.bg, color: conditionStyle.text }}
                >
                    {conditionLabel}
                </span>
            </div>
            <div className="listing-card__body">
                <p className="listing-card__category">{listing.category || "General"}</p>
                <h3 className="listing-card__title">{listing.title}</h3>
                <p className="listing-card__price">${Number(listing.price).toFixed(2)}</p>
            </div>
        </Link>
    );
}

export default function HomePage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchListings()
            .then((data) => setListings(Array.isArray(data) ? data : []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="home-page">
            {/* Hero Banner */}
            <section className="home-hero">
                <div className="home-hero__text">
                    <h1>Buy, sell, and connect<br />on your campus.</h1>
                    <p>The student marketplace for textbooks, electronics, furniture, and more.</p>
                    <div className="hero__actions">
                        <Link to="/listings/new" className="btn btn--primary">+ Post an Item</Link>
                        <Link to="/listings" className="btn btn--secondary">Browse All</Link>
                    </div>
                </div>
            </section>

            {/* Listings Feed */}
            <section className="home-feed">
                <div className="home-feed__header">
                    <h2>Recent Listings</h2>
                    <Link to="/listings" className="home-feed__see-all">See all →</Link>
                </div>

                {loading && (
                    <div className="state-box">
                        <div className="spinner" />
                        <p>Loading listings…</p>
                    </div>
                )}

                {!loading && listings.length === 0 && (
                    <div className="state-box">
                        <span style={{ fontSize: "3rem" }}>🛒</span>
                        <p>No listings yet. Be the first to post something!</p>
                        <Link to="/listings/new" className="btn btn--primary">Post an Item</Link>
                    </div>
                )}

                {!loading && listings.length > 0 && (
                    <div className="listings-grid">
                        {listings.slice(0, 12).map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
