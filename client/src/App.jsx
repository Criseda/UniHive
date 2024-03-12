import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Item from "./routes/Item";
import Messages from "./routes/Messages";
import SavedItems from "./routes/SavedItems";
import AuthHandler from "./routes/AuthHandler";

// ProtectedRoute is a component that will check if a user is authenticated
const ProtectedRoute = ({ element }) => {
	const [authenticated, setAuthenticated] = useState(null);

	// this useEffect will run everytime a user tries to access a protected route
	// it will check if the user is authenticated with the backend API
	// frontend will give the JWT it received back to the backend to check if it's valid
	// if it is, the backend will respond with a 200 status code and all is well
	useEffect(() => {
		// Check user authentication
		const checkAuthentication = async () => {
			try {
				// Make GET request to check authentication
				const token = localStorage.getItem("token");
				if (token) {
					const response = await fetch(`http://${process.env.REACT_APP_IP_ADDRESS || "localhost"}:5000/auth/checkAuth`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ token }),
					});
					const data = await response.json();
					// Set authenticated based on response
					setAuthenticated(data.authenticated);
				} else {
					setAuthenticated(false);
				}
			} catch (error) {
				console.error("Error checking authentication:", error);
			}
		};

		checkAuthentication();
	}, []);

	if (authenticated === null) {
		return null;
	}

	return authenticated ? element : <Navigate to="/login" />; // if authenticated, render the element, else redirect to login
};

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Navigate to="/home" />} />
				<Route path="/home" element={<ProtectedRoute element={<Home />} />} />
				<Route path="/login" element={<Login />} />
				<Route
					path="/item/:id"
					element={<ProtectedRoute element={<Item />} />}
				/>
				<Route
					path="/messages"
					element={<ProtectedRoute element={<Messages />} />}
				/>
				<Route
					path="/saveditem"
					element={<ProtectedRoute element={<SavedItems />} />}
				/>
				<Route path="/authHandler" element={<AuthHandler />} />{" "}
			</Routes>
		</Router>
	);
};

export default App;
