import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BrowseListingsPage from "./pages/BrowseListingsPage";
import CreateListingPage from "./pages/CreateListingPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import MessagesPage from "./pages/MessagesPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="listings" element={<BrowseListingsPage />} />
                <Route path="listings/new" element={<CreateListingPage />} />
                <Route path="listings/:listingId" element={<ListingDetailsPage />} />
                <Route path="listings/:listingId" element={<ListingMessagesPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
