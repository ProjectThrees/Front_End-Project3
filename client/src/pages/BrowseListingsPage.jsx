import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListings } from "../api/marketplaceApi";

export default function BrowseListingsPage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadListings() {
            try {
                setLoading(true);
                setError("");
                const data = await getListings();
                setListings(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
                setError("Could not load listings.");
            } finally {
                setLoading(false);
            }
        }

        loadListings();
    }, []);

    if (loading) {
        return <section className="page-panel">Loading listings...</section>;
    }

    return (
        <section className="page-panel">
            <div className="page-heading">
                <h1>Browse Listings</h1>
            </div>

            {error && <div className="alert error">{error}</div>}

            {listings.length === 0 ? (
                <div className="empty-state">
                    <h2>No listings found</h2>
                    <p>Check back later for new items.</p>
                </div>
            ) : (
                <div className="listing-grid">
                    {listings.map((listing) => (
                        <article className="listing-card" key={listing.id}>
                            <img
                                className="listing-card-image"
                                src={
                                    listing.imageUrl ||
                                    "https://placehold.co/600x400?text=No+Image"
                                }
                                alt={listing.title}
                            />
                            <div className="listing-card-body">
                                <h3>{listing.title}</h3>
                                <p className="price">${Number(listing.price || 0).toFixed(2)}</p>
                                <p className="listing-description">
                                    {listing.description || "No description provided."}
                                </p>
                                <Link className="button secondary" to={`/listings/${listing.id}`}>
                                    View Details
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}