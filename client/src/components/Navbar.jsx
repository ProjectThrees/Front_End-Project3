import { NavLink } from "react-router-dom";

const navItems = [
    { to: "/listings", label: "Browse" },
    { to: "/listings/new", label: "Post Item" },
    { to: "/favorites", label: "Favorites" },
];

export default function Navbar({ onMenuOpen }) {
    return (
        <header className="navbar">
            <div className="navbar__inner">
                <div className="navbar__left">
                    {onMenuOpen && (
                        <button
                            className="menu-btn"
                            onClick={onMenuOpen}
                            aria-label="Open navigation menu"
                        >
                            <span className="menu-btn__bar" />
                            <span className="menu-btn__bar" />
                            <span className="menu-btn__bar" />
                        </button>
                    )}
                    <NavLink to="/" className="brand">
                        Student Marketplace
                    </NavLink>
                </div>

                <nav className="nav-links">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
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
