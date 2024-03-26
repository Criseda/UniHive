import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  getSavedListing,
  getSavedAuction,
  postSavedListing,
  postSavedAuction,
} from "../api/items";

const SaveItemButton = ({ itemId, itemType }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isItemSaved, setItemSaved] = useState(null);

  useEffect(() => {
    const getSavedItem =
      itemType === "listing"
        ? getSavedListing
        : itemType === "auction"
        ? getSavedAuction
        : null;

    getSavedItem(itemId)
      .then((data) => {
        if (Array.isArray(data) && data.length === 0) {
          setItemSaved(false);
        } else {
          setItemSaved(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [itemId, itemType]);

  const handleSave = async () => {
    setIsSaving(true);
    if (!localStorage.getItem("token")) {
      alert("Please log in to save this item.");
      return;
    }
    await (itemType === "listing"
      ? postSavedListing(itemId)
      : postSavedAuction(itemId));
    setIsSaving(false);
    alert("Item saved!");
    setItemSaved(true);
  };

  return (
    <Button
      variant="outline-primary"
      className="mb-2 d-block w-100 text-primary"
      style={{ backgroundColor: "white" }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#f2f2f2")} // light gray
      onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
      onClick={handleSave}
      disabled={isSaving || isItemSaved}
    >
      <Link to="#" className="text-decoration-none text-primary">
        {"\u2661"}{" "}
        {itemType === "auction"
          ? isItemSaved
            ? "Auction Saved!"
            : "Save this auction"
          : isItemSaved
          ? "Listing Saved!"
          : "Save this listing"}
      </Link>
    </Button>
  );
};

export default SaveItemButton;
