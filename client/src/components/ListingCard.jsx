import { Link } from "react-router-dom";

export default function ListingCard({
                                        listing,
                                        showRemoveButton = false,
                                        onRemove,
                                        removing = false,
                                    }) {
    return (
        <article className="listing-card">
            <img
                className="listing-card-image"
                src={
                    listing.imageUrl ||
                    "https://placehold.co/600x400?text=No+Image"
                }
                alt={listing.title}
            />

            <div className="listing-card-body">
                <div className="listing-card-top">
                    <h3>{listing.title}</h3>
                    <p className="price">${Number(listing.price || 0).toFixed(2)}</p>
                </div>

                <p className="muted">
                    {listing.category || "General"}
                </p>

                <p className="listing-description">
                    {listing.description || "No description provided."}
                </p>

                <div className="listing-card-actions">
                    <Link className="button secondary" to={`/listings/${listing.id}`}>
                        View Details
                    </Link>

                    {showRemoveButton && (
                        <button
                            className="button danger"
                            onClick={() => onRemove?.(listing.id)}
                            disabled={removing}
                        >
                            {removing ? "Removing..." : "Remove Favorite"}
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}