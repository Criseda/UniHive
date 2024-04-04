import React, { useState } from "react";
import { Button, Modal, Image, Container, Row, Col } from "react-bootstrap";
import Stars from "./Star";

const Profilebar = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Container className="d-flex pt-4">
      <Button
        variant="white"
        className="rounded-circle w-25 p-2"
        onClick={() => setModalShow(true)}
      >
        <Image
          src="/images/logo.jpg"
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
          <Image src="/images/logo.jpg" alt="photo" />
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
        <h1>User Name</h1>
        <Stars starnumber={2.5}/>
        <h3 className="pt-4">Description:</h3>
        <p>I lfjah asdf ioromem lopsum eteclakdsfnjafsnldjkkljansdflkjansdflkajsndflkjasndflkajsndflkajsdfnlkjasndflkajsndflkajsndf</p>
      </Col>
    </Container>
  );
};

export default Profilebar;
