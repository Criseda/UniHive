import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../images/logo.png";
import { logoutRoute } from "../api/authentication";
import { getLoggedInUser } from "../api/items";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getLoggedInUser()
      .then((data) => {
        setUser(data.id);
      })
      .catch((error) => {
        setError(error);
      });
  });

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand as={Link} to="/about">
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
              <i className="bi bi-house"></i> Home
            </Nav.Link>
          </Nav>

          {/* Right-aligned icons */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/sell">
              <i className="bi bi-cash-coin"></i> Sell an Item
            </Nav.Link>
            <Nav.Link as={Link} to="/SavedItem">
              <i className="bi bi-heart"></i> Saved Items
            </Nav.Link>
            <Nav.Link as={Link} to="/messages">
              <i className="bi bi-envelope"></i> Messages
            </Nav.Link>

            {/* Dropdown */}
            <NavDropdown title="More" id="navbarDropdown">
              <NavDropdown.Item as={Link} to={`/profile/${user}`}>
                Account
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/currentbids">
                Current Bids
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link} // Use Link instead of anchor tag
                to={logoutRoute}
                onClick={() => {
                  sessionStorage.clear();
                  localStorage.clear();
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
