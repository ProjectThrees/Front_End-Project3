import { useParams } from "react-router-dom";

export default function ListingDetailsPage() {
    const { listingId } = useParams();

    return (
        <section className="page-section">
            <h1>Listing Details</h1>
            <p>
                Placeholder page for item details. Dynamic route is working for listing:
                <strong> {listingId}</strong>
            </p>
        </section>
    );
}