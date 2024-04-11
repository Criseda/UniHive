import React, { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel.jsx";
import ItemInfo from "./ItemInfo.jsx";
import AuctionModal from "./AuctionModal.jsx";
import SaveItemButton from "./SaveItemButton.jsx";
import calculateBidIncrement from "./AuctionBidIncrement.js";
import { Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { createMessage } from "../api/messages"

import {
  getListing,
  getAuction,
  getListingImages,
  getAuctionImages,
  postAuctionBid,
  getLoggedInUser,
  deleteAuction,
  deleteListing
} from "../api/items";

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
  const [currentUser, setcurrentUser] = useState(null);

  const isAuction = itemType === "auction";

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const user = await getLoggedInUser();
      setcurrentUser(user);
    };

    fetchLoggedInUser();
  }, []);

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
                {currentUser != null && currentUser.id !== item.seller_id && (
                  <>
                    <div>
                      {isAuction ? (
                        <Link
                          to="#"
                          className="text-decoration-none text-primary"
                          onClick={() => setShowModal(true)}
                        >
                          <Button
                            variant="primary"
                            className="mb-2 d-block w-100"
                          >
                            {isLoading ? "loading..." : "Submit Bid"}
                          </Button>
                        </Link>
                      ) : (
                        <Link
                          to={isLoading ? "#" : "/messages"}
                          className="text-decoration-none text-primary"
                          onClick={() => createMessage(item.seller_id)}
                          disabled={isLoading}
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
                    </div>
                    <div className="align-self-end">
                      <Button variant="danger" className="btn-sm">
                        <Link
                          to={true ? "/home" : "#"}
                          className="text-decoration-none text-white"
                          onClick={currentUser.super_user ? (isAuction ? deleteAuction(itemId) : deleteListing(itemId)) : null}
                          disabled={isLoading}
                        >
                          {currentUser.super_user || true ? "Delete Listing" : (isAuction ? "Report Auction" : "Report Listing")}
                        </Link>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
