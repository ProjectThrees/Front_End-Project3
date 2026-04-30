import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getListingById } from "../api/marketplaceApi";

export default function ListingDetailsPage() {
    const { listingId } = useParams();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadListing() {
            try {
                setLoading(true);
                setError("");
                const data = await getListingById(listingId);
                setListing(data);
            } catch (err) {
                console.error(err);
                setError("Could not load listing details.");
            } finally {
                setLoading(false);
            }
        }

        loadListing();
    }, [listingId]);

    if (loading) {
        return <section className="page-panel">Loading listing...</section>;
    }

    if (error) {
        return (
            <section className="page-panel">
                <div className="alert error">{error}</div>
            </section>
        );
    }

    if (!listing) {
        return (
            <section className="page-panel">
                <div className="empty-state">
                    <h2>Listing not found</h2>
                </div>
            </section>
        );
    }

    return (
        <section className="page-panel">
            <div className="listing-details">
                <img
                    className="listing-details-image"
                    src={
                        listing.imageUrl ||
                        "https://placehold.co/800x500?text=No+Image"
                    }
                    alt={listing.title}
                />

                <div className="listing-details-body">
                    <h1>{listing.title}</h1>
                    <p className="price">${Number(listing.price || 0).toFixed(2)}</p>
                    <p className="muted">{listing.category || "General"}</p>
                    <p>{listing.description}</p>

                    <div className="listing-card-actions">
                        <Link
                            className="button primary"
                            to={`/listings/${listing.id}/messages`}
                        >
                            Contact Buyer/Seller
                        </Link>

                        <Link className="button secondary" to="/favorites">
                            Go to Favorites
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}