import React from "react";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        {/* Logo on the left */}
        <a class="navbar-brand" href="/about">
          <img
            src="logo.jpg"
            alt="UniHive Logo"
            height="50"
            class="d-inline-block align-top"
          />
        </a>

        {/* Navbar toggle button for small screens */}
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div class="collapse navbar-collapse" id="navbarResponsive">
          {/* Left-aligned links */}
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/home">
                <i class="bi-heart"></i> Home
              </a>
            </li>
          </ul>

          {/* <Right-aligned icons */}
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="bi-heart"></i> Saved Items
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="bi-envelope"></i> Messages
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="bi-cash"></i> Current Bids
              </a>
            </li>

            {/* Dropdown for additional menu items if needed */}
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                More
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Settings
                </a>
                <a class="dropdown-item" href="#">
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
