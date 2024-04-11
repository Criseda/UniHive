import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getAuctionsByBidder, getLoggedInUser } from "../api/items";

const CurrentBidsList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getLoggedInUser()
      .then((data) => {
        console.log(data);
        return getAuctionsByBidder(0, data.id)
      })
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
          const key = "auctionid" + item.id;
          return (
            <Col key={item.id} className="mt-4">
              <Card>
                <div
                  style={{
                    height: "500px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #ccc", // Grey border
                  }}
                >
                  <img
                    src={item.image_path}
                    alt={item.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain", // Preserve aspect ratio, may leave blank space
                    }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>Your Bid: £{item.bid_amount}</Card.Title>
                  <Card.Text>{item.name}</Card.Text>
                  <Button
                    variant="outline-success w-100 mb-1"
                    onClick={() => handleCardClick(key)}
                    key={item.id}
                  >
                    View Listing
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

export default CurrentBidsList;
