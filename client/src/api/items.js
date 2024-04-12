const BASE_URL = `http://${
  process.env.REACT_APP_SERVER_HOST || "localhost"
}:5000/api`;

//GET item requests

export async function getListings(page) {
  const res = await fetch(`${BASE_URL}/listings/page/${page}`);
  return await res.json();
}

export async function getListingsByUser(page, user_id) {
  const res = await fetch(`${BASE_URL}/listings/user/page/${page}/${user_id}`);
  return await res.json();
}

export async function getListingsBySearchQuery(page, query) {
  const res = await fetch(`${BASE_URL}/listings/search/page/${page}/${query}`);
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

export async function getAuctions(page) {
  const res = await fetch(`${BASE_URL}/auctions/page/${page}`);
  return await res.json();
}

export async function getAuctionsByUser(page, user_id) {
  const res = await fetch(`${BASE_URL}/auctions/user/page/${page}/${user_id}`);
  return await res.json();
}

export async function getAuctionsBySearchQuery(page, query) {
  const res = await fetch(`${BASE_URL}/auctions/search/page/${page}/${query}`);
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
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/get/auctions/user/`, {
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

// delete listing
export async function deleteListing(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/listings/${id}`, {
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

// delete auction
export async function deleteAuction(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/auctions/${id}`, {
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

//messages requests

// This will take in user2 (the person to message) and feed in this information to the backend
// this will not only create a room if one does not exist.
// if one does exist, it will return it as usual, so it can be used as a get request as well
// can be used as a 2 in 1 function
export async function createMessageRoom(user2) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/messages/room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      user2_id: user2,
    }),
  });
  return await res.json();
}

export async function getMessageRoomsOfUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/messages/room/user`, {
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

export async function getMessageRoom(id) {
  const res = await fetch(`${BASE_URL}/messages/room/${id}`);
  return await res.json();
}

export async function getAllMessageRooms() {
  const res = await fetch(`${BASE_URL}/messages/room`);
  return await res.json();
}

export async function getMessagesOfRoom(id) {
  try {
    const res = await fetch(`${BASE_URL}/messages/room/messages/${id}`);
    const messages = await res.json();
    //sort messages by id in descending order
    messages.sort((a, b) => a.id - b.id);
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

//send a new message
export async function createMessage(
  sender_id,
  room_id,
  message,
  time,
  imageUrl
) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const body = {
    token: token,
    sender_id: sender_id,
    room_id: room_id,
    message: message,
    time: time,
  };

  if (imageUrl) {
    body.image_path = imageUrl;
  }

  const res = await fetch(`${BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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

// Auction POST requests

export async function postAuctionBid(auctionId, bidAmount) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/bids/auction/${auctionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      amount: bidAmount,
    }),
  });
  return await res.json();
}

// app_user requests
// get logged in user

export async function getLoggedInUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/users/me`, {
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
//create an auction
export async function createAuction(
  seller_id,
  name,
  description,
  opening_bid,
  closing_date,
  imagePaths
) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/auctions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      seller_id: seller_id,
      name: name,
      description: description,
      opening_bid: opening_bid,
      closing_date: closing_date,
      image_path: imagePaths[0],
    }),
  });

  const auction = await res.json();

  // Create an auction image for each additional image
  for (let i = 1; i < imagePaths.length; i++) {
    await fetch(`${BASE_URL}/auction_images/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        auction_id: auction.id,
        image_path: imagePaths[i],
      }),
    });
  }

  return auction;
}
// createa a listing
export async function createListing(
  seller_id,
  name,
  description,
  price,
  imagePaths
) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/listings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      seller_id: seller_id,
      name: name,
      description: description,
      price: price,
      image_path: imagePaths[0],
    }),
  });

  const listing = await res.json();

  // Create a listing image for each additional image
  for (let i = 1; i < imagePaths.length; i++) {
    await fetch(`${BASE_URL}/listing_images/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        listing_id: listing.id,
        image_path: imagePaths[i],
      }),
    });
  }

  return listing;
}

// get specific user
export async function getUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  return await res.json();
}

// GET reviews requests

// get the number of reviews for a user
export async function getReviewCount(user_id) {
  const res = await fetch(`${BASE_URL}/reviews/count/${user_id}`);
  return await res.json();
}

// avatar upload route

export async function uploadAvatar(formData) {
  const res = await fetch(`${BASE_URL}/image_upload/avatar`, {
    method: "POST",
    body: formData,
  });
  return await res.json();
}

// message image upload route
export async function uploadMessageImage(formData) {
  const res = await fetch(`${BASE_URL}/messages/upload`, {
    method: "POST",
    body: formData,
  });
  return await res.json();
}

//item image upload route
export async function uploadItemImages(formData) {
  const res = await fetch(`${BASE_URL}/image_upload/itemImages`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Server responded with status ${res.status}`);
  }

  return await res.json();
}

// update user bio route

export async function updateUserBio(user_id, newBio) {
  const res = await fetch(`${BASE_URL}/users/${user_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bio: newBio }),
  });
  return await res.json();
}

// delete user
export async function deleteUser(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/users/${id}`, {
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
