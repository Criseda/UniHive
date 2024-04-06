import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../images/alt_logo.png";
import { logoutRoute } from "../api/authentication";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
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
            <Nav.Link href="/home">
              <i className="bi bi-house"></i> Home
            </Nav.Link>
          </Nav>

          {/* Right-aligned icons */}
          <Nav className="ms-auto">
            <Nav.Link href="/SavedItem">
              <i className="bi bi-heart"></i> Saved Items
            </Nav.Link>
            <Nav.Link href="/messages">
              <i className="bi bi-envelope"></i> Messages
            </Nav.Link>
            <Nav.Link href="/CurrentBids">
              <i className="bi bi-cash"></i> Current Bids
            </Nav.Link>

            {/* Dropdown for additional menu items if needed */}
            <NavDropdown title="More" id="navbarDropdown">
              <NavDropdown.Item href="/profile">Account</NavDropdown.Item>
              <NavDropdown.Item
                href={logoutRoute}
                onClick={() => {
                  sessionStorage.clear();
                  localStorage.clear();
                }}
              >
                Logout
              </NavDropdown.Item>
              {/* Add more dropdown items as needed */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
