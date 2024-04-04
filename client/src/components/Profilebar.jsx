import React from "react";
import { Button, Modal, Image, Container, Row } from 'react-bootstrap';
import Stars from "./Star";

const Profilebar = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container className="d-flex">
      <Button variant="white" className="rounded-circle w-25 p-0" onClick={() => setModalShow(true)}>
        <Image src="/images/logo.jpg" roundedCircle className="img-thumbnail border-0 p-0" alt="avatar" />
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="seting_avatar"
      >
        <Modal.Header closeButton>
          <Modal.Title id="seting_avatar">
            Set up your avatar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src="/images/logo.jpg" alt="photo" />
          <input type="file" className="form-control" id="customFile" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant="primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="justify-content-center flex-grow-1">
        <Row className="text-center mt-2">
          <p>User Name</p>
        </Row>

        <Row className="text-center mt-3">
          <p>Email address</p>
        </Row>

        <Row className="mt-3">
          <Stars starnumber={2.5} />
        </Row>
      </Row>
    </Container>
  );
};

export default Profilebar;