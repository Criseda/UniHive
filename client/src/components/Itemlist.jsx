import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getListings } from "../api/items";
import { getAuctions } from "../api/items";

const Itemlist = () => {
  const [data, setData] = useState([]); // store both items and auctions
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getListings(), getAuctions()]) // fetch both items and auctions
      .then(([items, auctions]) => {
        const mergedData = [...items, ...auctions]; // merge items and auctions
        mergedData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ); // sort by created_at
        setData(mergedData); // set data
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleCardClick = (key) => {
    navigate(`/item/${key}`);
  };

  if (isLoading) {
    return <div className="container text-center">Loading...</div>;
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
      <div className="row">
        {data.map((item) => {
          const key = (item.price ? "listing" : "auction") + "id" +item.id;
          return (
            <div
              key={key}
              className="col-md-4 mb-4"
              onClick={() => handleCardClick(key)}
            >
              <div className="card">
                <img
                  src={item.image_path}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    {item.price ? "price: " : "opening bid: "}£
                    {item.price || item.opening_bid}
                  </p>{" "}
                  {/* use price for items and opening_bid for auctions */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Itemlist;
