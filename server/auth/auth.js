// auth.js
require("dotenv").config();
const express = require("express");
const router = express.Router();
const ticketGenerator = require("./ticketGenerator");
const axios = require("axios");
const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const { cookieJWTAuth } = require("../middleware/cookieJWTAuth");

const AUTHENTICATION_SERVICE_URL =
  "http://studentnet.cs.manchester.ac.uk/authenticate/";
const AUTHENTICATION_LOGOUT_URL =
  "http://studentnet.cs.manchester.ac.uk/systemlogout.php";
const BACKEND_REDIRECT_URL = `http://${process.env.IP_ADDRESS || "localhost"}:5000/auth/`;
const FRONTEND_URL = `http://${process.env.IP_ADDRESS || "localhost"}:3000/AuthHandler`;

router.get("/login", (req, res) => {
  // generate a ticket
  const csticket = ticketGenerator();
  // store the ticket in the session
  req.session.csticket = csticket;
  req.session.authenticated = false;

  // redirect to the authentication service
  const authParams = `?url=${BACKEND_REDIRECT_URL}&csticket=${csticket}&version=3&command=validate`;
  const authServiceUrl = `${AUTHENTICATION_SERVICE_URL}${authParams}`;
  res.redirect(authServiceUrl);
});

//this is for backend to check if credentials are valid from there
router.get("/", async (req, res) => { // /?username={}&&fullname={},csticket*()
  const { csticket, username, fullname } = req.query; //get params from successful authentication

  if (csticket !== req.session.csticket) {
    return res.status(403).json({
      message: "Invalid csticket. Your session is invalid or has expired.",
    });
  }
//encode the url and send it to the authentication service (to check if the user is valid or not)
  const encodedUrl = encodeURIComponent(
    `?url=${BACKEND_REDIRECT_URL}&csticket=${req.session.csticket}&version=3&command=confirm&username=${username}&fullname=${fullname}`
  );
  const validateUrl = `${AUTHENTICATION_SERVICE_URL}${encodedUrl}`;
// if the api returns a successful response, store the username and fullname in the session
  try {
    const response = await axios.get(validateUrl);

    // if the api returns a successful response, store the username and fullname in the session
    if (response.status === 200) {
      req.session.username = username;
      req.session.fullname = fullname;
      req.session.authenticated = true;

      res.redirect("/auth/dashboard");
    } else {
      res.status(400).json({
        message: "Invalid username or fullname",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error validating credentials",
    });
  }
});

router.get("/dashboard", async (req, res) => {
  // Your dashboard code goes here
  const { username, fullname } = req.session;

  if (!username || !fullname) {
    return res.status(400).json({
      message: "Username or fullname not found in session",
    });
  }

  //do a check for if this user is in the database already or not
  //if not, add them to the database.
  try {
    const response = await axios.get(
      `http://${process.env.IP_ADDRESS || "localhost"}:5000/api/users/check/${username}`
    );
    const exists = response.data.exists;

    if (!exists) {
      // User does not exist in the database
      // Your code here
      const response = await axios.post(`http://${process.env.IP_ADDRESS || "localhost"}:5000/api/users`, {
        id: username,
        name: fullname,
        avatar_path: "images/default_pfp.jpg",
      });
    }
    // CREATE A JWT
    const token = jwt.sign({ username, fullname }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      // httpOnly: true,
    });
    
    res.redirect(
        `${FRONTEND_URL}`
      );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error checking username in the database",
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect(AUTHENTICATION_LOGOUT_URL);
});

router.post("/checkAuth", cookieJWTAuth, (req, res) => {
  res.json({ authenticated: true });
});

module.exports = router;
