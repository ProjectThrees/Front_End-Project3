import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export async function healthCheck() {
    const response = await api.get("/health");
    return response.data;
}

// Listings
export async function fetchListings() {
    const response = await api.get("/listings");
    return response.data;
}

export async function fetchListingById(id) {
    const response = await api.get(`/listings/${id}`);
    return response.data;
}

export async function createListing(data) {
    const response = await api.post("/listings", data);
    return response.data;
}

export default api;