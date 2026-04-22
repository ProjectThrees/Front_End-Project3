import { NavLink } from "react-router-dom";

const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/listings", label: "Browse Listings" },
    { to: "/listings/new", label: "Create Listing" },
    { to: "/messages", label: "Messages" },
    { to: "/favorites", label: "Favorites" }
];

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar__inner">
                <NavLink to="/" className="brand">
                    Student Marketplace
                </NavLink>

                <nav className="nav-links">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                isActive ? "nav-link nav-link--active" : "nav-link"
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}