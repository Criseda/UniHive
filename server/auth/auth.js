// auth.js
const express = require("express");
const router = express.Router();
const ticketGenerator = require("./ticketGenerator");
const axios = require("axios");

const AUTHENTICATION_SERVICE_URL =
  "http://studentnet.cs.manchester.ac.uk/authenticate/";
const AUTHENTICATION_LOGOUT_URL =
  "http://studentnet.cs.manchester.ac.uk/systemlogout.php";
const ENCODED_DEVELOPER_URL = "http://localhost:5000/auth/";

router.get("/login", (req, res) => {
  // generate a ticket
  const csticket = ticketGenerator();
  // store the ticket in the session
  
  console.log("redirecting to logon!\n");

  if (req.session.authenticated) {
    console.log("ur logged in already??\n");
  }

  req.session.csticket = csticket;
  req.session.authenticated = false;

  // redirect to the authentication service
  const authParams = `?url=${ENCODED_DEVELOPER_URL}&csticket=${csticket}&version=3&command=validate`;
  const authServiceUrl = `${AUTHENTICATION_SERVICE_URL}${authParams}`;
  res.redirect(authServiceUrl);
  /*
  req.session.csticket = csticket;
  req.session.authenticated = false;
  res.json({
    csticket: csticket,
  });*/
});

router.get("/", async (req, res) => {
  const { csticket, username, fullname } = req.query; //get params from successful authentication
  
  if (csticket !== req.session.csticket) {
    return res.status(403).json({
      message: "Invalid csticket. Your session is invalid or has expired.",
    });
  }

  const encodedUrl = encodeURIComponent(
    `?url=${ENCODED_DEVELOPER_URL}&csticket=${req.session.csticket}&version=3&command=confirm&username=${username}&fullname=${fullname}`
  );
  const validateUrl = `${AUTHENTICATION_SERVICE_URL}${encodedUrl}`;

  try {
    const response = await axios.get(validateUrl);

    // if the api returns a successful response, store the username and fullname in the session
    if (response.status === 200) {
      req.session.username = username;
      req.session.fullname = fullname;
      req.session.authenticated = true;

      console.log("u logged in: ", req.session);

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
  const { username, fullname, authenticated } = req.session;

  if (!username || !fullname) {
    return res.status(400).json({
      message: "Username or fullname not found in session",
    });
  }

  //do a check for if this user is in the database already or not
  //if not, add them to the database.
  try {
    const response = await axios.get(
      `http://localhost:5000/api/users/check/${username}`
    );
    const exists = response.data.exists;

    console.log("/dashboard: ", req.session);

    if (exists) {
      // User exists in the database
      //   res.json({
      //     message: "You exist in the database, authenticated",
      //     username: username,
      //     fullname: fullname,
      //     authenticated: authenticated,
      //   });
      res.redirect("http://localhost:5000/home");
    } else {
      // User does not exist in the database
      const response = await axios.post(`http://localhost:5000/api/users`, {
        username: username,
        name: fullname,
        avatar_path: "images/default_pfp.jpg",
      });
      //   res.json({
      //     message: "You have been added to the database, authenticated",
      //     username: username,
      //     fullname: fullname,
      //     authenticated: authenticated,
      //   });
      res.redirect("http://localhost:5000/home");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error checking username in the database",
    });
  }
});

router.get("/logout", (req, res) => {
  console.log("/logout: ", req.session);
  req.session.destroy();
  res.redirect(AUTHENTICATION_LOGOUT_URL);
});

router.get("/session", (req, res) => {
  console.log("/session: ", req.session);
  res.json({
    username: req.session.username,
    fullname: req.session.fullname,
    authenticated: req.session.authenticated,
  });
});

module.exports = router;
