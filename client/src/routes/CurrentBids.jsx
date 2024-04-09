import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import SavedItemList from "../components/SavedItemList";

const CurrentBids = () => {
  return (
    <div>
      <Search />
      <h1>Current Bids</h1>
      <SavedItemList />
    </div>
  );
};

export default CurrentBids;
