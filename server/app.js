// this is the entry point for the server
// this file is run by node
// run prettier with 2 space formatting on this file
const express = require("express");
const session = require("express-session");
const routes = require("./routes");
const authRoutes = require("./auth/auth.js");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET, // change this to a random string in a .env file
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
		// try set cookies to secure in production
	})
);

// use the routes in the routes file
app.use("/api", routes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
	console.log("server is listening on port 5000");
});

//run the server with the command: nodemon app
