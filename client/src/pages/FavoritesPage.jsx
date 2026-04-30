import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../api/marketplaceApi";
import ListingCard from "../components/ListingCard";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadFavorites() {
            try {
                setLoading(true);
                setError("");

                const data = await getFavorites();
                setFavorites(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
                setError("Could not load favorites.");
            } finally {
                setLoading(false);
            }
        }

        loadFavorites();
    }, []);

    async function handleRemove(listingId) {
        try {
            setRemovingId(listingId);
            setError("");

            await removeFavorite(listingId);

            setFavorites((previous) =>
                previous.filter((listing) => String(listing.id) !== String(listingId))
            );
        } catch (err) {
            console.error(err);
            setError("Could not remove this favorite.");
        } finally {
            setRemovingId(null);
        }
    }

    if (loading) {
        return <section className="page-panel">Loading favorites...</section>;
    }

    return (
        <section className="page-panel">
            <div className="page-heading">
                <div>
                    <h1>My Favorites</h1>
                    <p className="muted">
                        Saved listings you may want to revisit later.
                    </p>
                </div>
            </div>

            {error && <div className="alert error">{error}</div>}

            {favorites.length === 0 ? (
                <div className="empty-state">
                    <h2>No favorites saved</h2>
                    <p>You have not added any listings to your favorites yet.</p>
                </div>
            ) : (
                <div className="listing-grid">
                    {favorites.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            listing={listing}
                            showRemoveButton
                            onRemove={handleRemove}
                            removing={removingId === listing.id}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}