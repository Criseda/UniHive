import React, { useState, useEffect } from "react";
import { getItems } from "../api/items";

const Itemlist = () => {
  // Dummy data for demonstration purposes
  const items = [
    {
      id: 1,
      name: "Item 1",
      price: "19.99",
      imageUrl: "/images/logo.jpg",
    },
    {
      id: 2,
      name: "Item 2",
      price: "29.99",
      imageUrl: "/images/the_thinker.jpg",
    },
    { id: 3, name: "Item 3", price: "39.99", imageUrl: "/images/yay.jpg" },
    { id: 4, name: "Item 4", price: "39.99", imageUrl: "/images/yay.jpg" },
    {
      id: 5,
      name: "Item 5",
      price: "39.99",
      imageUrl: "/images/crazy_businesswoman.jpeg",
    },
    {
      id: 6,
      name: "Item 6",
      price: "39.99",
      imageUrl: "/images/default_pfp.jpg",
    },
    // Add more items as needed
  ];
  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getItems()
  //     .then((data) => {
  //       setItems(data);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div className="container mt-4">
      <div className="row">
        {items.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={item.imageUrl}
                className="card-img-top"
                alt={item.name}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">£{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itemlist;
