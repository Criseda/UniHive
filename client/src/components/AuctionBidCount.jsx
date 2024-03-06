import React, { useState, useEffect } from "react";
import { getAuctionBidCount } from "../api/items";

const AuctionBidCount = ({ auctionId }) => {
  const [bidCount, setBidCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAuctionBidCount(auctionId)
      .then((data) => {
        setBidCount(data.count);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [auctionId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <>{bidCount} bids</>;
};

export default AuctionBidCount;
