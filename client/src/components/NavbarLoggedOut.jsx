import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router
import Logo from "../images/logo.png";
import { loginRoute } from "../api/authentication";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand as={Link} to="/about">
          {" "}
          {/* Use Link instead of anchor tag */}
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
            <Nav.Link as={Link} to="/home">
              About Us
            </Nav.Link>{" "}
            {/* Use Link instead of anchor tag */}
          </Nav>

          {/* Right-aligned icons */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/privacypolicy">
              {" "}
              {/* Use Link instead of anchor tag */}
              <i className="bi bi-lock"></i> Privacy Policy
            </Nav.Link>
            <Nav.Link as={Link} to="/codeofethics">
              {" "}
              {/* Use Link instead of anchor tag */}
              <i className="bi bi-envelope-heart"></i> Code of Ethics
            </Nav.Link>
            <Nav.Link as={Link} to={loginRoute}>
              {" "}
              {/* Use Link instead of anchor tag */}
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
