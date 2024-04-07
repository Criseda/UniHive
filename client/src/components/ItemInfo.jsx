import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuctionBidCount from "./AuctionBidCount";
import Countdown from "./AuctionCountdown";
import ProfileCard from "./ProfileCard";

const ItemInfo = ({ item, isAuction, itemId }) => {
  return (
    <>
      <h5 className="card-title">{item.name}</h5>
      <div className="card-text">
        <ProfileCard seller_id={item.seller_id}/>
      </div>
      <div className="card-text">
        <p className="m-0 fs-3">£{isAuction ? item.highest_bid : item.price}</p>
        <p className="text-muted fs-6 mt-0 mb-2">or Best Offer</p>
      </div>
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
