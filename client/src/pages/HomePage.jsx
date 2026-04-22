import { Link } from "react-router-dom";
import marketplaceLogo from "../assets/logo.svg";

export default function HomePage() {
    return (
        <section className="hero">
            <div className="hero__content">
                <img
                    src={marketplaceLogo}
                    alt="Student Marketplace logo"
                    className="hero__logo"
                />

                <span className="badge">Frontend Initialized</span>

                <h1>Buy, sell, and connect on your campus.</h1>

                <p>
                    This landing page confirms the React frontend is set up and ready for
                    future marketplace features like listings, favorites, and messaging.
                </p>

                <div className="hero__actions">
                    <Link to="/listings" className="btn btn--primary">
                        Browse Listings
                    </Link>
                    <Link to="/listings/new" className="btn btn--secondary">
                        Create Listing
                    </Link>
                </div>
            </div>

            <div className="card-grid">
                <article className="card">
                    <h2>Routing Ready</h2>
                    <p>
                        React Router is configured with routes for all major upcoming pages.
                    </p>
                </article>

                <article className="card">
                    <h2>API Ready</h2>
                    <p>
                        Axios is configured through a reusable service using environment
                        variables.
                    </p>
                </article>

                <article className="card">
                    <h2>Organized Structure</h2>
                    <p>
                        The project is split into pages, components, services, styles, and
                        assets for easy growth.
                    </p>
                </article>
            </div>
        </section>
    );
}