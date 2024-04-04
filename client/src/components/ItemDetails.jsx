import React, { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel.jsx";
import ItemInfo from "./ItemInfo.jsx";
import AuctionModal from "./AuctionModal.jsx";
import SaveItemButton from "./SaveItemButton.jsx";
import calculateBidIncrement from "./AuctionBidIncrement.js";
import { Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import io from "socket.io-client";

import {
  getListing,
  getAuction,
  getListingImages,
  getAuctionImages,
  getSavedListing,
  getSavedAuction,
  postSavedListing,
  postSavedAuction,
  postAuctionBid,
  createMessageRoom,
} from "../api/items";

const socket = io("http://localhost:5000");

const ItemDetails = () => {
  // get params from the url, assign to itemType and itemId
  let { id } = useParams();
  const params = id.split("id");
  const itemType = params[0];
  const itemId = params[1];

  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [item_images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userBid, setUserBid] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const isAuction = itemType === "auction";

  useEffect(() => {
    setIsLoading(true);

    const getItem =
      itemType === "listing"
        ? getListing
        : itemType === "auction"
        ? getAuction
        : null;
    const getImages =
      itemType === "listing"
        ? getListingImages
        : itemType === "auction"
        ? getAuctionImages
        : null;

    if (!getItem || !getImages) {
      setError(new Error("Invalid item type"));
      setIsLoading(false);
      return;
    }

    getItem(itemId)
      .then((data) => {
        setItem(data);
        setUserBid(
          (
            Number(data.highest_bid) + calculateBidIncrement(data.highest_bid)
          ).toFixed(2)
        );
        return getImages(itemId); // Return the promise from getImages
      })
      .then((data) => {
        setImages(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [itemType, itemId, refreshKey]);

  const refreshPage = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    // Handle the bid submission here
    
    postAuctionBid(itemId, userBid)
      .then((response) => {
        // Handle the response here
        console.log("Bid submitted successfully", response);
        refreshPage();
        setShowModal(false);
      })
      .catch((error) => {
        // Handle the error here
        console.error("Error submitting bid:", error);
        setShowModal(false);
      });
  };

  if (isLoading) {
    return null; // makes it less jarring when the page loads
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error.message}</div>
      </div>
    );
  }

  const joinRoom = (id) => {
    socket.emit("joinRoom", id);
  };

  //This creates the message room between the user and the seller
  const createMessage = async () => {
    const sellerId = item.seller_id;
    try {
      const response = await createMessageRoom(sellerId); //This will add the room to the database
      const roomId = response.id; // Extract the room ID from the response
      joinRoom(roomId); // Join the room with the given ID
    } catch (error) {
      console.error("Failed to create and join room:", error);
    }
  };

  //function to submit a bid
  const submitBid = () => {
    console.log("submit bid");
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="row g-0">
          <div className="col">
            <ImageCarousel
              images={[{ image_path: item.image_path }, ...item_images]}
            />
          </div>
          <div className="col col-5">
            <div className="card-body">
              <ItemInfo item={item} isAuction={isAuction} itemId={itemId} />
              <div className="input-group d-flex flex-column justify-content-between mt-auto">
                <div>
                  {/*Changed this conditional so that we can distinguish functions for auctions and listings*/}
                  {isAuction ? (
                    <Link
                      to={isLoading ? "#" : "/messages"}
                      className="text-decoration-none text-primary"
                      onClick={setShowModal(true)}
                    >
                      <Button variant="primary" className="mb-2 d-block w-100">
                        {isLoading ? "loading..." : "Submit Bid"}
                      </Button>
                    </Link>
                  ) : (
                    <Link
                    to={isLoading ? "#" : "/messages"}
                    className="text-decoration-none text-primary"
                    onClick={createMessage}
                    >
                      <Button
                        variant="primary"
                        className="mb-2 d-block w-100"
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading..." : "Make Offer"}
                      </Button>
                    </Link>
                  )}
                  <AuctionModal
                    showModal={showModal}
                    handleClose={() => setShowModal(false)}
                    handleBidSubmit={handleBidSubmit}
                    item={item}
                    userBid={userBid}
                    setUserBid={setUserBid}
                    calculateBidIncrement={calculateBidIncrement}
                  />

                  <SaveItemButton itemId={itemId} itemType={itemType} />
                  <Button
                    variant="outline-primary"
                    className="mb-2 d-block w-100 text-primary"
                    style={{ backgroundColor: "white" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#f2f2f2")
                    } // light gray
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "white")
                    }
                    onClick={() => handleSave(itemId)}
                    disabled={isSaving || isItemSaved}
                  >
                    <Link to="#" className="text-decoration-none text-primary">
                      {"\u2661"}{" "}
                      {isAuction
                        ? isItemSaved
                          ? "Auction Saved!"
                          : "Save this auction"
                        : isItemSaved
                        ? "Listing Saved!"
                        : "Save this listing"}
                    </Link>
                  </Button>
                </div>
                <div className="align-self-end">
                  <Button variant="danger" className="btn-sm">
                    <Link
                      to="#"
                      className="text-decoroom: ration-none text-white"
                    >
                      {isAuction ? "Report Auction" : "Report Listing"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
