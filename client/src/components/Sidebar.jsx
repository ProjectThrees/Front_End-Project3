import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const SIDEBAR_ITEMS = [
    { to: "/listings/new", label: "Create Listing", icon: "➕" },
    { to: "/listings", label: "View Listings", icon: "🛍️" },
    { to: "/favorites", label: "Favorites", icon: "❤️" },
    { to: "/messages", label: "Messages", icon: "💬" },
];

export default function Sidebar({ isOpen, onClose }) {
    // Close sidebar on Escape key
    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`sidebar-overlay ${isOpen ? "sidebar-overlay--visible" : ""}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`} aria-label="Navigation menu">
                <div className="sidebar__header">
                    <span className="sidebar__brand">Student Marketplace</span>
                    <button className="sidebar__close" onClick={onClose} aria-label="Close menu">✕</button>
                </div>

                <nav className="sidebar__nav">
                    {SIDEBAR_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                            }
                            onClick={onClose}
                        >
                            <span className="sidebar__link-icon">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}
