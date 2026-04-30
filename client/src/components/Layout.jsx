import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="app-shell">
            <header className="site-header">
                <div className="container nav-bar">
                    <Link to="/" className="brand">
                        Student Marketplace
                    </Link>

                    <nav className="nav-links">
                        <NavLink to="/" end>
                            Home
                        </NavLink>
                        <NavLink to="/listings">Browse</NavLink>
                        <NavLink to="/listings/new">Create Listing</NavLink>
                        <NavLink to="/favorites">Favorites</NavLink>
                    </nav>
                </div>
            </header>

            <main className="container page-content">
                <Outlet />
            </main>
        </div>
    );
}