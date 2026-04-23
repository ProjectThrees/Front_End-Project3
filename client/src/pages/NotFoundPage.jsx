import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <section className="page-section">
            <h1>404 - Page Not Found</h1>
            <p>The page you requested does not exist.</p>
            <Link to="/" className="btn btn--primary">
                Return Home
            </Link>
        </section>
    );
}