import api from "../services/api";

export async function getListings() {
  const response = await api.get("/listings");
  return response.data;
}

export async function getListingById(listingId) {
  const response = await api.get(`/listings/${listingId}`);
  return response.data;
}

export async function favoriteListing(listingId) {
  const response = await api.post(`/listings/${listingId}/favorite`);
  return response.data;
}
