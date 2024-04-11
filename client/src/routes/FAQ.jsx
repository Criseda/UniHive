import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/policy.css";

const FAQ = () => {
  return (
    <Container className="mt-4 py-4">
      <h1>Frequently Asked Questions</h1>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <p className="first-paragraph">
            While UniHive is designed to be as simple and intuitive to use, this
            page serves to clear up some of the potential questions new users
            might have.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Q1. How does UniHive handle payment processing?</h2>
          <p>
            The purpose of UniHive is to connect buyers to sellers, therefore
            payment and delivery is completely up to the seller. As we're all
            university students, we recommend deciding on a meeting point near
            campus, and providing the payment in person, as this method is safe
            and easy.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Q2. What do I do if a buyer/seller never shows up?</h2>
          <p>
            We hope this never happens, but if it does, you should try to
            resolve the issue by using our chat functionality. If that doesn't
            work, you can always report the user and we'll perform a thorough
            investigation and take any necessary steps to avoid this happening
            again.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Q3. Is this website available for non UOM students?</h2>
          <p>
            UniHive is only available for current students of the University of
            Manchester. This helps us create a safe community.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQ;
