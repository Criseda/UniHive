import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../css/createlisting.css";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    images: [],
    listingType: "fixedPrice",
    price: "£", // Set the pound symbol as default
  });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    // Format price input with pound symbol (£), commas, and allow positive numbers only
    const formattedValue = value.replace(/\D/g, ""); // Remove non numeric characters
    const numberWithCommas = formattedValue.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    ); // Add commas to the numeric value
    setFormData({ ...formData, [name]: "£" + numberWithCommas }); // Add £ symbol back to the formatted value
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setFormData({ ...formData, images });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
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
          {formData.listingType === "auction" && (
            <Form.Group controlId="date" style={{ marginTop: "1rem" }}>
              <Form.Label>Chose End Date</Form.Label>
              <Form.Control type="date" name="date" onChange={handleChange} />
            </Form.Group>
          )}
        </Form.Group>

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
