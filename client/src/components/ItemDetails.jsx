import React, { useState, useEffect } from "react";
import Countdown from "./AuctionCountdown";
import AuctionBidCount from "./AuctionBidCount";
import { Carousel, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import {
  getListing,
  getAuction,
  getListingImages,
  getAuctionImages,
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

        getImages(itemId)
          .then((data) => {
            setImages(data);
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [itemType, itemId]);

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
            {/* carousel of images, all container inside the listing_image table */}
            <Carousel>
              {[{ image_path: item.image_path }, ...item_images].map(
                (image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 img-fluid rounded-start rounded-end"
                      src={image.image_path}
                      alt="Item"
                      style={{ objectFit: "contain" , maxHeight: "400px", minHeight: "400px"}}
                    />
                  </Carousel.Item>
                )
              )}
            </Carousel>
          </div>

          {/* card which contains buttons, info, etc */}
          <div className="col col-5">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              {isAuction ? (
                <p className="card-text fs-4">
                  £{item.highest_bid} <br />
                  <small className="text-muted fs-6">or Best Offer</small>
                </p>
              ) : (
                <p className="card-text fs-4">
                  £{item.price} <br />
                  <small className="text-muted fs-6">or Best Offer</small>
                </p>
              )}
              <p className="card-text">
                <small className="text-muted">
                  {isAuction ? (
                    <>
                      <Link
                        to="#"
                        style={{ textDecoration: "underline", color: "black" }}
                        // className="text-decoration-none"
                        onMouseEnter={(e) => (e.target.style.color = "grey")}
                        onMouseLeave={(e) => (e.target.style.color = "black")}
                      >
                        <AuctionBidCount auctionId={itemId} />
                      </Link>
                      <span className="mx-2">&bull;</span>
                      <Countdown
                        closingDate={item.closing_date}
                        isAuction={isAuction}
                      />
                    </>
                  ) : (
                    `Ends in ${new Date(item.created_at).toLocaleDateString(
                      "en-us",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}`
                  )}
                </small>
              </p>
              <p className="card-text">{item.description}</p>
              <div className="input-group d-flex flex-column justify-content-between mt-auto">
                <div>
                  <Button variant="primary" className="mb-2 d-block w-100">
                    <Link to="#" className="text-decoration-none text-white">
                      {isAuction ? "Submit Bid" : "Make Offer"}
                    </Link>
                  </Button>
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
                  >
                    <Link to="#" className="text-decoration-none text-primary">
                      {"\u2661"}{" "}
                      {isAuction ? "Watch this auction" : "Watch this listing"}
                    </Link>
                  </Button>
                </div>
                <div className="align-self-end">
                  <Button variant="danger" className="btn-sm">
                    <Link to="#" className="text-decoration-none text-white">
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
