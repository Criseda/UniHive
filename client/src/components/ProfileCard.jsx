import React, { useState, useEffect } from "react";
import { Card, Image, Row, Col } from "react-bootstrap";
import { getUser } from "../api/items";
import Stars from "./Star";

const ProfileCard = ({ seller_id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (seller_id) {
      getUser(seller_id)
        .then((data) => {
          setName(data.first_name + " " + data.last_name);
          setRating(data.rating !== null ? data.rating : 0);
          setAvatar(data.avatar_path);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [seller_id]);

  return (
    <Card>
      <Card.Body>
        <Row className="">
          <Col
            xs="auto"
            className="d-flex align-items-center justify-content-center"
          >
            <Image
              src={avatar ? avatar : "/images/logo.jpg"}
              alt="Profile Picture"
              roundedCircle
              style={{ width: "50px", height: "50px" }}
              className="p-0"
            />
          </Col>
          <Col xs="auto">
            <a className="text-dark mb-0 pt-1 d-block" href={`/profile/${seller_id}`}>{name}</a>
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
            <Stars rating={rating} size={"sm"} mobileSize={"xs"} />
          </Col>
          {/* ratings amount/ number goes here */}
          <Col xs="auto" className="px-1 py-1">
            <p className="text-muted small">(0)</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
