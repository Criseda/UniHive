import React, { useEffect } from "react";

const AUTH_SERVICE_URL = "http://studentnet.cs.manchester.ac.uk/authenticate";
const REDIRECT_URL = "http://localhost:3000/AuthHandler";
const BACKEND_URL = "http://localhost:5000/auth/validate";

const AuthHandler = () => {
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const csticket = urlParams.get("csticket");
		const username = urlParams.get("username");
		const fullname = urlParams.get("fullname");

		//validate the GET Params (because they can get tampered with)

		//send a request to backend (localhost:5000/auth/validate with the GET params as query params)
		//if the backend returns a 200, store the username and fullname in the session
		//if the backend returns a 400, show an error message
		//if the backend returns a 500, show an error message

		fetch(
			`${BACKEND_URL}?csticket=${csticket}&username=${username}&fullname=${fullname}`
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.valid) {
					//store the username and fullname in the session
					// window.location.href = "/home";
					return (
						<div>
							<h1>Success!</h1>
						</div>
					);
				} else {
					//show an error message
					// window.location.href = "/error";
					return(
						<div>
							<h1>Error!</h1>
						</div>
					
					);
				}
			})
			.catch((error) => {
				console.error(error);
				//show an error message
				// window.location.href = "/error";
				return(
					<div>
						<h1>Error!</h1>
					</div>
				
				);
			});
	}, []);
};

export default AuthHandler;
