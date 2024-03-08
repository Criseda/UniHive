import React, { useState, useEffect } from "react";
import { getSavedAuction } from "../api/items";
import { getSavedListing } from "../api/items";
import { useNavigate } from "react-router-dom";


const SavedItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const id = 1; // replace with the user id from the context


useEffect(() => {
  setIsLoading(true);
  Promise.all([getSavedListing(id), getSavedAuction(id)])
  .then(([listings, auctions]) => {
    const mergedItems = [...listings, ...auctions];
    mergedItems.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );//sort by created_at
    setItems(mergedItems); //Set items
  })
  .catch((error) => {
    setError(error);
  })
  .finally(() => {
    setIsLoading(false);
  });
}, []);

const handleCardClick = (key) => {
  navigate(`/item/${key}`)
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
};


  return (
        <div className="row" style={{ width: '50vw', marginLeft: '30vw'}}>
          {items.map((item) => (
            <div key={item.id} className="col-md-10 mt-4">
              <div className="card">
                <img
                  src={item.image_path}
                  alt={item.name}
                />
                <div className="card-body col-md-5">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">£{item.price || item.highest_bid}</p>
                </div>

                <button type="button" class="btn btn-outline-success">Talk with Seller</button>

                
              </div>
            </div>
          ))}
        </div> 
  );
};



export default SavedItemList;
