import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AuctionModal = ({ showModal, handleClose, handleBidSubmit, item, userBid, setUserBid, calculateBidIncrement }) => {
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Make a Bid</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleBidSubmit}>
          <Form.Group className="text-center">
            <Form.Label>Your Bid</Form.Label>
            <div className="d-flex justify-content-center align-items-center">
              <span style={{ marginRight: "5px" }}>£</span>
              <Form.Control
                style={{ width: "150px" }}
                type="number"
                min={(
                  Number(item.highest_bid) +
                  calculateBidIncrement(Number(item.highest_bid))
                ).toFixed(2)}
                step={calculateBidIncrement(
                  Number(item.highest_bid)
                ).toFixed(2)}
                value={Number(userBid).toFixed(2)}
                onChange={(e) =>
                  setUserBid(Number(e.target.value))
                }
                required
              />
            </div>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="d-block mx-auto"
            style={{ marginTop: "50px" }}
          >
            Submit Bid
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuctionModal;