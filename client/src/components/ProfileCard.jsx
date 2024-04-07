import React, { useState, useEffect } from "react";
import { Card, Image, Row, Col, Alert } from "react-bootstrap";
import { getUser, getReviewCount } from "../api/items";
import Stars from "./Star";

const ProfileCard = ({ seller_id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (seller_id) {
      getUser(seller_id)
        .then((data) => {
          setName(data.first_name + " " + data.last_name);
          setRating(data.rating !== null ? data.rating : 0);
          setAvatar(data.avatar_path);
          // get the amount of reviews a user has
          getReviewCount(seller_id).then((data) => {
            setReviewCount(data.count);
          });
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [seller_id]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card>
      <Card.Body>
        <Row className="">
          <Col
            xs="auto"
            className="d-flex align-items-center justify-content-center"
          >
            <a href={`/profile/${seller_id}`}>
              <Image
                src={avatar ? avatar : "/images/logo.jpg"}
                alt="Profile Picture"
                roundedCircle
                style={{ width: "50px", height: "50px" }}
                className="p-0"
              />
            </a>
          </Col>
          <Col xs="auto">
            <a
              className="text-dark mb-0 pt-1 d-block"
              href={`/profile/${seller_id}`}
            >
              {name}
            </a>
            <a
              className={`small text-decoration-underline m-0 ${
                isHovered ? "text-muted" : "text-dark"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              // if clicked, send user to message page and create a room with them
              href="#messageurlthing"
            >
              Message seller
            </a>
          </Col>
          <Col xs="auto" className="p-0 pt-2">
            <Stars starnumber={rating} size={"sm"} mobileSize={"sm"} />
          </Col>
          {/* ratings amount/ number goes here */}
          <Col xs="auto" className="px-1 py-1">
            <p className="text-muted small">({reviewCount})</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
