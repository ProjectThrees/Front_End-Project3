import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { favoriteListing, getListingById } from "../api/marketplaceApi";

export default function ListingDetailsPage() {
  const { listingId } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favoriteMessage, setFavoriteMessage] = useState("");

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

  async function handleFavorite() {
    try {
      await favoriteListing(listingId);
      setFavoriteMessage("Added to favorites.");
    } catch (err) {
      console.error(err);
      setFavoriteMessage("Could not add this item to favorites.");
    }
  }

  if (loading) {
    return <p>Loading listing...</p>;
  }

  if (error) {
    return (
      <section className="page-container">
        <p className="error-message">{error}</p>
        <Link to="/listings" className="button-link">Back to listings</Link>
      </section>
    );
  }

  if (!listing) {
    return (
      <section className="page-container">
        <h2>Listing not found</h2>
        <Link to="/listings" className="button-link">Back to listings</Link>
      </section>
    );
  }

  const sellerName =
    listing.seller?.name ||
    listing.sellerName ||
    listing.user?.name ||
    "Unknown seller";

  const sellerEmail =
    listing.seller?.email ||
    listing.sellerEmail ||
    listing.user?.email ||
    "";

  return (
    <section className="listing-details page-container">
      <div className="listing-details-image-wrap">
        {listing.imageUrl ? (
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="listing-details-image"
          />
        ) : (
          <div className="listing-details-image placeholder-image">
            No image available
          </div>
        )}
      </div>

      <div className="listing-details-content">
        <p className="listing-category">{listing.category || "General"}</p>
        <h1>{listing.title}</h1>
        <p className="listing-price">
          ${Number(listing.price || 0).toFixed(2)}
        </p>

        <div className="listing-meta">
          <p><strong>Condition:</strong> {listing.condition || "Not listed"}</p>
          <p><strong>Seller:</strong> {sellerName}</p>
          {sellerEmail && <p><strong>Email:</strong> {sellerEmail}</p>}
        </div>

        <h2>Description</h2>
        <p>{listing.description || "No description provided."}</p>

        <div className="listing-actions">
          <Link
            to={`/listings/${listing.id || listingId}/messages`}
            className="button-link"
          >
            Message Seller
          </Link>

          <button type="button" onClick={handleFavorite} className="button-link">
            Add to Favorites
          </button>
        </div>

        {favoriteMessage && <p className="status-message">{favoriteMessage}</p>}
      </div>
    </section>
  );
}
