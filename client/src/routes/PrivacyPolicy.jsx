import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/policy.css";

const PrivacyPolicy = () => {
  return (
    <Container className="mt-4 py-4">
      <h1>Privacy Policy</h1>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <p className="first-paragraph">
            At UniHive, we take your privacy seriously. This Privacy Policy
            outlines the types of personal information we collect, how we use
            it, and how we protect your information.
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
          <h2>Information We Collect</h2>
          <p>
            We collect personal information such as your name, email address,
            and contact details when you register an account on UniHive. We may
            also collect information about your usage of our website, such as IP
            addresses, browser type, and pages visited.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to provide and improve our
            services, personalize your experience, communicate with you, and
            ensure the security of our platform. We may also use your
            information for marketing purposes, such as sending promotional
            emails.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. However, we may share your information with trusted service
            providers who assist us in operating our website and providing our
            services.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Security</h2>
          <p>
            We implement security measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the Internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and the revised policy will become
            effective immediately upon posting. We encourage you to review this
            Privacy Policy periodically for any changes.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about our Privacy Policy or
            the handling of your personal information, please contact us at
            privacy@unihive.com.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
