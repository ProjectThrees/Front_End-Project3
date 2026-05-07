import api from "../services/api";

export async function getListings() {
  const response = await api.get("/listings");
  return response.data;
}

export async function getMessagesByListingId(listingId) {
  const res = await api.get(`/listings/${listingId}/messages`);
  return res.data;
}

export async function sendMessageForListing(listingId, payload) {
  const res = await api.post(`/listings/${listingId}/messages`, payload);
  return res.data;
}
