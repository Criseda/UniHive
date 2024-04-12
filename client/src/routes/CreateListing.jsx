import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../css/createlisting.css";
import { getLoggedInUser } from "../api/items";
import { createListing, createAuction, uploadItemImages } from "../api/items";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    images: [],
    listingType: "fixedPrice",
    price: "£", // Set the pound symbol as default
    date: "",
  });
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    // Format price input with pound symbol (£), commas, and allow positive numbers only
    const formattedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    const numberWithCommas = formattedValue.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    ); // Add commas to the numeric value
    setFormData({
      ...formData,
      [name]: "£" + numberWithCommas,
      rawPrice: formattedValue,
    }); // Store both the formatted and raw price
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);

    // Check if all files are images
    const allAreImages = images.every((image) =>
      image.type.startsWith("image/")
    );
    if (!allAreImages) {
      alert("One or more of the selected files are not images.");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
      return;
    }

    setFormData({ ...formData, images });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if item name is provided
    if (formData.itemName === "") {
      alert("Please provide an item name");
      return;
    }

    //check if description is provided
    if (formData.description === "") {
      alert("Please provide a description");
      return;
    }

    //check if images are provided
    if (formData.images.length === 0) {
      alert("Please provide at least one image");
      return;
    }

    //check if more than 10 images are provided
    if (formData.images.length > 10) {
      alert("Please upload no more than 10 images");
      return;
    }

    //check if price is provided
    if (!formData.rawPrice || formData.rawPrice === "0") {
      alert("Please provide a price.");
      return;
    }

    const currentDate = new Date(); // gets the current date
    const selectedDate = new Date(formData.date); // gets the selected date
    if (selectedDate < currentDate) {
      alert("Please select a future date");
      return;
    }
    // remove the pound symbol and commas from the price before submitting
    const price = formData.rawPrice;

    // Upload the images before creating the listing or auction
    const uploadFormData = new FormData();
    formData.images.forEach((image) => {
      uploadFormData.append(`items`, image);
    });
    const response = await uploadItemImages(uploadFormData);
    const imageUrls = response.imageUrls; // The URLs of the uploaded images

    //ADD CONDITIONAL TO ADD AUCTION OR LISTING
    if (formData.listingType === "fixedPrice") {
      createListing(
        user.id,
        formData.itemName,
        formData.description,
        price,
        imageUrls
      );
    }
    if (formData.listingType === "auction") {
      const dateObject = new Date(formData.date);
      const date = dateObject.toISOString();

      createAuction(
        user.id,
        formData.itemName,
        formData.description,
        price,
        date,
        imageUrls
      );
    }

    window.location.href = "/home";
  };

  //get the logged in user
  useEffect(() => {
    async function fetchData() {
      const user = await getLoggedInUser();
      setUser(user);
    }
    fetchData();
  }, []);

  return (
    <Container className="create-listing-container py-4">
      <h2>Create Listing</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="itemName" style={{ marginTop: "1rem" }}>
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            name="itemName"
            onChange={handleChange}
            value={formData.itemName}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" style={{ marginTop: "1rem" }}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            onChange={handleChange}
            value={formData.description}
            required
          />
        </Form.Group>

        <Form.Group controlId="images" style={{ marginTop: "1rem" }}>
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </Form.Group>

        <Form.Group controlId="listingType" style={{ marginTop: "1rem" }}>
          <Form.Label>Listing Type</Form.Label>
          <Form.Control
            as="select"
            name="listingType"
            value={formData.listingType}
            onChange={handleChange}
          >
            <option value="fixedPrice">Fixed Price</option>
            <option value="auction">Auction</option>
          </Form.Control>
        </Form.Group>

        {/* Simplified */}
        <Form.Group style={{ marginTop: "1rem" }}>
          {formData.listingType === "fixedPrice" && (
            <Form.Label>Price</Form.Label>
          )}

          {formData.listingType === "auction" && (
            <Form.Label>Starting Bid</Form.Label>
          )}
          <Form.Control
            name="price"
            value={formData.price}
            onChange={handlePriceChange}
            required
          />
        </Form.Group>
        {formData.listingType === "auction" && (
          <Form.Group controlId="date" style={{ marginTop: "1rem" }}>
            <Form.Label>Choose End Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>
        )}

        <Button
          size="lg"
          style={{ marginTop: "1rem" }}
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          List Item
        </Button>
      </Form>
    </Container>
  );
};

export default CreateListing;
