import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, Image, Container, Col, Alert } from "react-bootstrap";
import { getUser } from "../api/items";
import Stars from "./Star";

const Profilebar = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [rating, setRating] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [banned, setBanned] = useState(null);

  useEffect(() => {
    getUser(id)
      .then((data) => {
        //remove this after testing
        console.log(data);
        // ---
        setUser(data.id);
        setCreatedAt(data.created_at);
        setName(data.first_name + " " + data.last_name);
        setBio(data.bio);
        setRating(data.rating !== null ? data.rating : 0);
        setAvatar(data.avatar_path);
        setBanned(data.banned);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error.toString()}</Alert>;
  }

  return (
    <Container className="d-flex pt-4">
      <Button
        variant="white"
        className="rounded-circle w-25 p-2"
        onClick={() => setModalShow(true)}
      >
        <Image
          src={avatar ? avatar : "/images/logo.jpg"}
          roundedCircle
          className="img-thumbnail border-0 p-0"
          alt="avatar"
        />
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="seting_avatar"
      >
        <Modal.Header closeButton>
          <Modal.Title id="seting_avatar">Set up your avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={avatar} alt="photo" />
          <input type="file" className="form-control" id="customFile" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>

      <Col className="d-flex flex-column align-items-start p-2 text-break text-wrap">
        <h2>{name}</h2>
        <Stars starnumber={rating} />
        <h3 className="pt-4">Bio:</h3>
        <p>
          {bio ? bio : "This user has not set up a bio yet."}
        </p>
      </Col>
    </Container>
  );
};

export default Profilebar;
