import React from "react";
import { Link } from "react-router-dom";
import AuctionBidCount from "./AuctionBidCount";
import Countdown from "./AuctionCountdown";

const ItemInfo = ({ item, isAuction, itemId }) => {
  return (
    <>
      <h5 className="card-title">{item.name}</h5>
      <p className="card-text fs-4">
        £{isAuction ? item.highest_bid : item.price} <br />
        <small className="text-muted fs-6">or Best Offer</small>
      </p>
      <div className="card-text">
        <small className="text-muted">
          {isAuction ? (
            <>
              <Link
                to="#"
                style={{
                  textDecoration: "underline",
                  color: "black",
                }}
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
            `Listed on ${new Date(item.created_at).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}`
          )}
        </small>
      </div>
      <p className="card-text">{item.description}</p>
    </>
  );
};

export default ItemInfo;
