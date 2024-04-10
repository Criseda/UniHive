import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/policy.css";

const CodeOfEthics = () => {
  return (
    <Container className="mt-4 py-4">
      <h1>Code of Ethics</h1>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <p className="first-paragraph">
            At UniHive, we uphold the highest standards of ethics and integrity.
            This Code of Ethics outlines our commitment to integrity, honesty,
            and responsibility in all aspects of our business operations.
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
          <h2>Integrity</h2>
          <p>
            We conduct our business with honesty, transparency, and
            accountability. We adhere to ethical principles and strive to
            maintain the trust and confidence of our users, partners, and
            stakeholders.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Respect</h2>
          <p>
            We respect the rights, dignity, and diversity of individuals. We
            treat everyone with fairness, courtesy, and professionalism,
            fostering an inclusive and supportive environment for all.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Responsibility</h2>
          <p>
            We take responsibility for our actions and decisions, striving to
            contribute positively to society and the environment. We comply with
            applicable laws, regulations, and ethical standards, ensuring the
            safety and well-being of our community.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Accountability</h2>
          <p>
            We hold ourselves accountable for upholding this Code of Ethics and
            fulfilling our commitments to our users, partners, and stakeholders.
            We welcome feedback and strive to continuously improve our ethical
            practices and business conduct.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Compliance</h2>
          <p>
            We comply with all applicable laws, regulations, and industry
            standards governing our business operations. We conduct regular
            reviews and audits to ensure compliance and mitigate risks.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default CodeOfEthics;
