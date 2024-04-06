import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getSavedAuctions, getSavedListings } from "../api/items";
import { deleteSavedListing, deleteSavedAuction } from "../api/items";

const SavedItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getSavedListings(), getSavedAuctions()])
      .then(([listings, auctions]) => {
        const mergedItems = [...listings, ...auctions];
        mergedItems.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ); //sort by created_at
        setItems(mergedItems); //Set items
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //Removes the item from the saved items list (unfinished)
  const handleRemove = (item) => {
    if ("price" in item) {
      deleteSavedListing(item.id).then(() => {
        window.alert("Listing no longer saved");
        window.location.reload();
      });
    } else if ("highest_bid" in item) {
      deleteSavedAuction(item.id).then(() => {
        window.alert("Listing no longer saved");
        window.location.reload();
      });
    } else {
      console.log("Error: Item not found");
    }
  };

  if (isLoading) {
    return <Container className="text-center">Loading...</Container>;
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Row>
          <Col>
            <div className="alert alert-danger">Error: {error.message}</div>
          </Col>
        </Row>
      </Container>
    );
  }

  const handleCardClick = (key) => {
    navigate(`/item/${key}`);
  };

  return (
    <Container className="mt-4">
      <Row xs={1} md={2}>
        {items.map((item) => {
          const key = (item.price ? "listing" : "auction") + "id" + item.id;
          return (
            <Col key={item.id} className="mt-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={item.image_path}
                  alt={item.name}
                  style={{ maxHeight: "500px" }}
                />
                <Card.Body>
                  <Card.Title>£{item.price || item.highest_bid}</Card.Title>
                  <Card.Text>{item.name}</Card.Text>
                  <Button
                    variant="outline-success w-100 mb-1"
                    onClick={() => handleCardClick(key)}
                    key={item.id}
                  >
                    View Listing
                  </Button>
                  <Button
                    variant="outline-danger w-100"
                    onClick={() => handleRemove(item)}
                  >
                    Remove saved Item
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default SavedItemList;
