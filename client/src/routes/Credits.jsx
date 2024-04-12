import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/policy.css";

const Credits = () => {
  return (
    <Container className="mt-4 py-4">
      <h1>Credits</h1>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <p className="first-paragraph">
            In order to make UniHive as great as possible, we used utilised some
            great assets from the great people/companies below
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
          <h2>Images / Illustrations</h2>
          <p>
            All media used for UniHive is either our own, or Royalty Free. All
            illustrations used in the site were from freepik.com. The image on
            our about page is by Paul Povoroznuk on Unsplash.com
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>CSS</h2>
          <p>
            We used the help of Bootstrap's stylesheet for a majority of our css
            classes
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Credits;
