const BASE_URL = `http://${process.env.REACT_APP_IP_ADDRESS || "localhost"}:5000/api/`;

//named wrong, not gonna change for now to prevent conflicts
export function getItems() {
  return fetch(`${BASE_URL}/listings/`).then((res) => res.json());
  //TODO: CREATE A BACKEND ROUTE /ITEMS THAT COMBINES LISTINGS AND AUCTIONS
}

export function getItem(id) {
  return fetch(`${BASE_URL}/listings/${id}`).then((res) => res.json());
}

export async function getListingImages(id) {
  const res = await fetch(`${BASE_URL}/listing_images/listing/${id}`);
  return await res.json();
}

export async function getAuctionImages(id) {
  const res = await fetch(`${BASE_URL}/auction_images/auction/${id}`);
  return await res.json();
}

// routes for itemlist.jsx
export async function getListings() {
  const res = await fetch(`${BASE_URL}/listings/`);
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

export async function getListing(id) {
  const res = await fetch(`${BASE_URL}/listings/${id}`);
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
