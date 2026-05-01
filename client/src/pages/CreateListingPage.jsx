import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createListing } from "../services/api";

const CATEGORIES = ["Textbooks", "Electronics", "Furniture", "Clothing", "Sports", "Music", "Art", "Other"];
const CONDITIONS = [
    { value: "NEW", label: "New" },
    { value: "LIKE_NEW", label: "Like New" },
    { value: "GOOD", label: "Good" },
    { value: "FAIR", label: "Fair" },
    { value: "POOR", label: "Poor" },
];

const INITIAL = { title: "", description: "", price: "", category: "", condition: "" };

export default function CreateListingPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState(INITIAL);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null); // null | "submitting" | "success" | "error"
    const [serverError, setServerError] = useState("");

    function validate() {
        const e = {};
        if (!form.title.trim()) e.title = "Title is required.";
        else if (form.title.trim().length < 3) e.title = "Title must be at least 3 characters.";

        if (!form.description.trim()) e.description = "Description is required.";

        if (!form.price) e.price = "Price is required.";
        else if (isNaN(Number(form.price)) || Number(form.price) < 0)
            e.price = "Price must be a non-negative number.";

        if (!form.category) e.category = "Please select a category.";
        if (!form.condition) e.condition = "Please select a condition.";

        return e;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        setStatus("submitting");
        setServerError("");
        try {
            const payload = {
                ...form,
                price: parseFloat(form.price),
            };
            await createListing(payload);
            setStatus("success");
        } catch (err) {
            console.error(err);
            setServerError(err?.response?.data?.message || "Something went wrong. Please try again.");
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <section className="page-section create-success">
                <div className="success-icon">✅</div>
                <h1>Listing Created!</h1>
                <p>Your item has been posted to the marketplace.</p>
                <div className="hero__actions">
                    <Link to="/listings" className="btn btn--primary">
                        Browse Listings
                    </Link>
                    <button
                        className="btn btn--secondary"
                        onClick={() => { setForm(INITIAL); setStatus(null); }}
                    >
                        Post Another
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="page-section create-listing-page">
            <h1>Create a Listing</h1>
            <p className="create-listing-page__subtitle">
                Fill in the details below to post your item to the Student Marketplace.
            </p>

            {status === "error" && (
                <div className="form-error-banner" role="alert">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="listing-form">
                {/* Title */}
                <div className={`form-group ${errors.title ? "form-group--error" : ""}`}>
                    <label htmlFor="title">Title *</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="e.g. Calculus Textbook 5th Edition"
                        value={form.title}
                        onChange={handleChange}
                        maxLength={100}
                    />
                    {errors.title && <span className="field-error">{errors.title}</span>}
                </div>

                {/* Description */}
                <div className={`form-group ${errors.description ? "form-group--error" : ""}`}>
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Describe your item, its condition, what's included, etc."
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        maxLength={1000}
                    />
                    {errors.description && <span className="field-error">{errors.description}</span>}
                </div>

                {/* Price */}
                <div className={`form-group ${errors.price ? "form-group--error" : ""}`}>
                    <label htmlFor="price">Price ($) *</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                    />
                    {errors.price && <span className="field-error">{errors.price}</span>}
                </div>

                {/* Category */}
                <div className={`form-group ${errors.category ? "form-group--error" : ""}`}>
                    <label htmlFor="category">Category *</label>
                    <select id="category" name="category" value={form.category} onChange={handleChange}>
                        <option value="">Select a category…</option>
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    {errors.category && <span className="field-error">{errors.category}</span>}
                </div>

                {/* Condition */}
                <div className={`form-group ${errors.condition ? "form-group--error" : ""}`}>
                    <label>Condition *</label>
                    <div className="condition-pills">
                        {CONDITIONS.map(({ value, label }) => (
                            <label key={value} className={`condition-pill ${form.condition === value ? "condition-pill--active" : ""}`}>
                                <input
                                    type="radio"
                                    name="condition"
                                    value={value}
                                    checked={form.condition === value}
                                    onChange={handleChange}
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                    {errors.condition && <span className="field-error">{errors.condition}</span>}
                </div>

                <div className="form-actions">
                    <Link to="/listings" className="btn btn--secondary">Cancel</Link>
                    <button
                        type="submit"
                        className="btn btn--primary"
                        disabled={status === "submitting"}
                    >
                        {status === "submitting" ? "Posting…" : "Post Listing"}
                    </button>
                </div>
            </form>
        </section>
    );
}
