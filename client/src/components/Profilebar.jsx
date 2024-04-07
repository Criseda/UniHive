import React, { useEffect, useState } from "react";
import { Button, Modal, Image, Container, Col, Alert } from "react-bootstrap";
import { getUser } from "../api/items";
import Stars from "./Star";

const Profilebar = ({ user_id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [rating, setRating] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [banned, setBanned] = useState(null);

  useEffect(() => {
    getUser(user_id)
      .then((data) => {
        const date = new Date(data.created_at);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString(undefined, options);

        setCreatedAt(formattedDate);
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
  }, [user_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (banned) {
    return <Alert variant="danger">This user has been banned.</Alert>;
  }

  if (error) {
    return <Alert variant="danger">{error.toString()}</Alert>;
  }

  return (
    <>
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
          <h2 className="m-0">{name}</h2>
          <p className="m-0 text-muted small font-weight-normal">
            Member since: {createdAt}
          </p>
          <div className="pt-2">
            <Stars starnumber={rating} mobileSize={"lg"} size={"2x"} />
          </div>
          <h3 className="pt-4">Bio:</h3>
          <p>{bio ? bio : "This user has not set up a bio yet."}</p>
        </Col>
      </Container>
      <h4 className="pt-3 text-center h4 font-weight-bold">Posted items</h4>
    </>
  );
};

export default Profilebar;
