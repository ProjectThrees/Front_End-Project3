import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../api/marketplaceApi";

export default function CreateListingPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            const payload = {
                ...formData,
                price: Number(formData.price),
            };

            const created = await createListing(payload);
            navigate(`/listings/${created.id}`);
        } catch (err) {
            console.error(err);
            setError("Could not create listing.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <section className="page-panel">
            <h1>Create Listing</h1>

            {error && <div className="alert error">{error}</div>}

            <form className="form-grid" onSubmit={handleSubmit}>
                <label className="form-field">
                    <span>Title</span>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className="form-field">
                    <span>Category</span>
                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </label>

                <label className="form-field">
                    <span>Price</span>
                    <input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className="form-field">
                    <span>Image URL</span>
                    <input
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                </label>

                <label className="form-field full-width">
                    <span>Description</span>
                    <textarea
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button className="button primary" type="submit" disabled={saving}>
                    {saving ? "Creating..." : "Create Listing"}
                </button>
            </form>
        </section>
    );
}