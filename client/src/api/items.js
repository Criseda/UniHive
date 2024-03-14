const BASE_URL = `http://${
  process.env.REACT_APP_IP_ADDRESS || "localhost"
}:5000/api/`;

//GET requests

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
//JWT Requests to get all savedauctions and saved listings

//get all saved auctions
export async function getSavedAuctions() {
  const token = localStorage.getItem("token");
  if(!token) {
    return null;
  }
  const res = await fetch (`${BASE_URL}/saved_items/get/auctions/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}
//get all saved listings
export async function getSavedListings() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/get/listings/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
  
}

//Delete saved listing
export async function deleteSavedListing(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/delete/listings/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

//Delete saved auctions
export async function deleteSavedAuction(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/delete/auctions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}



//JWT Requests

export async function getSavedListing(listingID) {
  const token = localStorage.getItem("token"); //
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/get/listing/${listingID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

export async function postSavedListing(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/listing/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

export async function getSavedAuction(auctionID) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/get/auction/${auctionID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

export async function postSavedAuction(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/auction/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}
