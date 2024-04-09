import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../images/alt_logo.png";
import { loginRoute } from "../api/authentication";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand href="/about">
          <img
            src={Logo}
            alt="UniHive Logo"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Navbar toggle button for small screens */}
        <Navbar.Toggle aria-controls="navbarResponsive" />

        {/* Navbar content */}
        <Navbar.Collapse id="navbarResponsive">
          {/* Left-aligned links */}
          <Nav className="me-auto">
            <Nav.Link href="/home">About Us</Nav.Link>
          </Nav>

          {/* Right-aligned icons */}
          <Nav className="ms-auto">
            <Nav.Link href="/privacypolicy">
              <i className="bi bi-lock"></i> Privacy Policy
            </Nav.Link>
            <Nav.Link href="/codeofethics">
              <i className="bi bi-envelope-heart"></i> Code of Ethics
            </Nav.Link>
            <Nav.Link href={loginRoute}>
              <i
                className="bi bi-box-arrow-in-right"
                style={{ color: "white" }}
              >
                {" "}
                Login
              </i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
