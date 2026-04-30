import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

export function setAuthToken(token) {
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
}

export async function getListingById(listingId) {
    const { data } = await api.get(`/listings/${listingId}`);
    return data;
}

export async function getMessagesByListingId(listingId) {
    const { data } = await api.get(`/listings/${listingId}/messages`);
    return data;
}

export async function sendMessageForListing(listingId, payload) {
    const { data } = await api.post(`/listings/${listingId}/messages`, payload);
    return data;
}

export async function getFavorites() {
    const { data } = await api.get("/favorites");
    return data;
}

export async function removeFavorite(listingId) {
    const { data } = await api.delete(`/favorites/${listingId}`);
    return data;
}

export async function getListings() {
    const { data } = await api.get("/listings");
    return data;
}

export async function createListing(payload) {
    const { data } = await api.post("/listings", payload);
    return data;
}

export default api;