import React, { useState, useEffect } from "react";
import { getItems } from "../api/items";

const Save_item_list = () => {
  // Dummy data for demonstration purposes
  const items = [
   { id: 1, name: "Item 1", price: "19.99", imageUrl: "/images/yay.jpg" },
   { id: 2, name: "Item 2", price: "29.99", imageUrl: "/images/the_thinker.jpg" },
   { id: 3, name: "Item 3", price: "39.99", imageUrl: "/images/yay.jpg" },
   { id: 4, name: "Item 4", price: "39.99", imageUrl: "/images/yay.jpg" },
  //   // { id: 5, name: "Item 5", price: "$39.99", imageUrl: "/images/crazy_businesswoman.jpeg" },
  //   // { id: 6, name: "Item 6", price: "$39.99", imageUrl: "/images/default_pfp.jpg" },
  //   // Add more items as needed
  ];
 



  return (
        <div className="row" style={{ width: '50vw', marginLeft: '30vw'}}>
          {items.map((item) => (
            <div key={item.id} className="col-md-10 mt-4">
              <div className="card">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                />
                <div className="card-body col-md-5">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">£{item.price}</p>
                </div>

                <button type="button" class="btn btn-outline-success">Talk with Seller</button>

                
              </div>
            </div>
          ))}
        </div> 
  );
};

export default Save_item_list;