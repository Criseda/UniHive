import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/privacypolicy">Privacy Policy</a>
              </li>
              <li>
                <a href="/codeofethics">Code of Ethics</a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="footer-col">
            <h5>Connect</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
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
