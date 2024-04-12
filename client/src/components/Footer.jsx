import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="pt-5">
        <Row>
          <Col md={4}>
            <h5>UniHive</h5>
            <ul>
              <li>
                <Link to="/about">About Us</Link>{" "}
                {/* Use Link instead of anchor tag */}
              </li>
              <li>
                <Link to="/privacypolicy">Privacy Policy</Link>{" "}
                {/* Use Link instead of anchor tag */}
              </li>
              <li>
                <Link to="/codeofethics">Code of Ethics</Link>{" "}
                {/* Use Link instead of anchor tag */}
              </li>
            </ul>
          </Col>
          <Col md={4} className="footer-col">
            <h5>Connect</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/credits">Credits</Link>{" "}
                {/* Use Link instead of anchor tag */}
              </li>
              <li>
                <Link to="/faq">FAQ</Link>{" "}
                {/* Use Link instead of anchor tag */}
              </li>
            </ul>
          </Col>
          <Col md={4} className="footer-col">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.facebook.com">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="footer-col text-center">
            <p>
              &copy; {new Date().getFullYear()} UniHive. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
