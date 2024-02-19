import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo on the left */}
        <a className="navbar-brand" href="/about">
          <img
            src="/images/logo.jpg"
            alt="UniHive Logo"
            height="50"
            className="d-inline-block align-top"
          />
        </a>

        {/* Navbar toggle button for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarResponsive">
          {/* Left-aligned links */}
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/home">
                <i className="bi-heart"></i> Home
              </a>
            </li>
          </ul>

          {/* Right-aligned icons */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi-heart"></i> Saved Items
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi-envelope"></i> Messages
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi-cash"></i> Current Bids
              </a>
            </li>

            {/* Dropdown for additional menu items if needed */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                More
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Settings
                </a>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
                {/* Add more dropdown items as needed */}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
