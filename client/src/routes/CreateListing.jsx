import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../css/createlisting.css";
import Nav from "../components/Navbar";
import {createListing} from "../api/items";

const 

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    images: [],
    listingType: "fixedPrice",
    price: "£", // Set the pound symbol as default
    startingBid: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format price input with pound symbol (£), commas, and allow positive numbers only
    if (name === "price") {
      const formattedValue = value.replace(/^£|,/g, ""); // Remove £ symbol and existing commas
      const numberWithCommas = formattedValue.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      ); // Add commas to the numeric value
      setFormData({ ...formData, [name]: "£" + numberWithCommas }); // Add £ symbol back to the formatted value
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setFormData({ ...formData, images });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    createListing(
    console.log(formData);
  };

  return (
    <Container className="create-listing-container py-4">
      <h2>Create Listing</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="itemName" style={{ marginTop: "1rem" }}>
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" style={{ marginTop: "1rem" }}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
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

        {formData.listingType === "fixedPrice" && (
          <Form.Group controlId="price" style={{ marginTop: "1rem" }}>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        {formData.listingType === "auction" && (
          <Form.Group controlId="startingBid" style={{ marginTop: "1rem" }}>
            <Form.Label>Starting Bid</Form.Label>
            <Form.Control
              type="number"
              name="startingBid"
              value={formData.startingBid}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        <Button
          size="lg"
          style={{ marginTop: "1rem" }}
          variant="primary"
          type="submit"
        >
          List Item
        </Button>
      </Form>
    </Container>
  );
};

export default CreateListing;
