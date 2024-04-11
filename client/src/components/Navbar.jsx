import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../images/logo.png";
import { logoutRoute } from "../api/authentication";
import { getLoggedInUser } from "../api/items";

const MyNavbar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getLoggedInUser()
      .then((data) => {
        setUser(data.id);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

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
            <Nav.Link href="/home">
              <i className="bi bi-house"></i> Home
            </Nav.Link>
          </Nav>

          {/* Right-aligned icons */}
          <Nav className="ms-auto">
            <Nav.Link href="/sell">
              <i className="bi bi-cash-coin"></i> Sell an Item
            </Nav.Link>
            <Nav.Link href="/SavedItem">
              <i className="bi bi-heart"></i> Saved Items
            </Nav.Link>
            <Nav.Link href="/messages">
              <i className="bi bi-envelope"></i> Messages
            </Nav.Link>

            {/* Dropdown for additional menu items if needed */}
            <NavDropdown title="More" id="navbarDropdown">
              {loading ? (
                <NavDropdown.Item href={`#`}>Loading</NavDropdown.Item>
              ) : (
                <NavDropdown.Item href={`/profile/${user}`}>
                  Account
                </NavDropdown.Item>
              )}
              <NavDropdown.Item href="/currentbids">
                Current Bids
              </NavDropdown.Item>
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
