const BASE_URL = `http://${
  process.env.REACT_APP_IP_ADDRESS || "localhost"
}:5000/api/`;

export async function getListings() {
  const res = await fetch(`${BASE_URL}/listings/`);
  return await res.json();
}

export async function getListing(id) {
  const res = await fetch(`${BASE_URL}/listings/${id}`);
  return await res.json();
}

export async function getListingImages(id) {
  const res = await fetch(`${BASE_URL}/listing_images/listing/${id}`);
  return await res.json();
}

export async function getAuctions() {
  const res = await fetch(`${BASE_URL}/auctions/`);
  return await res.json();
}

export async function getAuction(id) {
  const res = await fetch(`${BASE_URL}/auctions/${id}`);
  return await res.json();
}

export async function getAuctionImages(id) {
  const res = await fetch(`${BASE_URL}/auction_images/auction/${id}`);
  return await res.json();
}

export async function getAuctionBids(auctionId) {
  const res = await fetch(`${BASE_URL}/bids/auction/${auctionId}`);
  return await res.json();
}

export async function getAuctionBidCount(auctionId) {
  const res = await fetch(`${BASE_URL}/bids/auction/${auctionId}/count`);
  return await res.json();
}

// add the rest of the functions here

export async function getSavedAuction(userId) {
  const res = await fetch(`${BASE_URL}/saved_items/auction/${userId}`)
  return await res.json();
}

export async function getSavedListing(userId){
  const res = await fetch(`${BASE_URL}/saved_items/listing/${userId}`);
  return await res.json();
}
