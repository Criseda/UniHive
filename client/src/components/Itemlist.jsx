import { useNavigate } from "react-router-dom";
import { getListings } from "../api/items";
import { getAuctions } from "../api/items";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getItems } from "../api/items";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Itemlist = () => {
  const [data, setData] = useState([]); // store both items and auctions
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getListings(), getAuctions()]) // fetch both items and auctions
      .then(([items, auctions]) => {
        const mergedData = [...items, ...auctions]; // merge items and auctions
        mergedData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ); // sort by created_at
        setData(mergedData); // set data
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleCardClick = (key) => {
    navigate(`/item/${key}`);
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
  }

  return (
    <Container className="mt-4">
      <Row>
        {data.map((item) => {
          const key = (item.price ? "listing" : "auction") + "id" + item.id;
          return (
            <Col
              onClick={() => handleCardClick(key)}
              key={item.id}
              md={4}
              className="mb-4"
            >
              <Card>
                <Card.Img
                  src={item.image_path}
                  alt={item.name}
                  style={{ width: "100%", maxHeight: "275px" }}
                />
                <Card.Body>
                  <Card.Title className="mb-0">
                    £{item.price || item.highest_bid}
                  </Card.Title>
                  <Card.Text className="mt-1">{item.name}</Card.Text>
                  <Button variant="outline-success" className="mt-auto w-100">
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

export default Itemlist;
