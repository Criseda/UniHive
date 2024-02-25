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
	req.session.csticket = csticket;

	// redirect to the authentication service
	const authParams = `?url=${ENCODED_DEVELOPER_URL}&csticket=${csticket}&version=3&command=validate`;
	const authServiceUrl = `${AUTHENTICATION_SERVICE_URL}${authParams}`;
	res.redirect(authServiceUrl);
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

router.get("/dashboard", (req, res) => {
	// Your dashboard code goes here
	const { username, fullname } = req.session;

	if (!username || !fullname) {
		return res.status(400).json({
			message: "Username or fullname not found in session",
		});
	}

	res.json({
		message: "You are authenticated",
		username: username,
		fullname: fullname,
	});
});

router.get("/logout", (req, res) => {
  req.session.destroy();
	res.redirect(AUTHENTICATION_LOGOUT_URL);
});

module.exports = router;
