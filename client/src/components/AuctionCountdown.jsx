import React, { useState, useEffect } from "react";

const Countdown = ({ closingDate }) => {
	const [countdown, setCountdown] = useState("Calculating time...");

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = new Date();
			const closingDateObj = new Date(closingDate);
			const diff = closingDateObj - now;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((diff / (1000 * 60)) % 60);
			const seconds = Math.floor((diff / 1000) % 60);

			if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
				setCountdown("Auction has ended");
				clearInterval(intervalId);
			} else {
				let timeLeft = "Ends in ";
				if (days > 0) timeLeft += `${days}d `;
				if (hours > 0) timeLeft += `${hours}h `;
				if (minutes > 0) timeLeft += `${minutes}m `;
				if (seconds > 0) timeLeft += `${seconds}s`;
				setCountdown(timeLeft);
			}
		}, 1000);

		return () => clearInterval(intervalId); // Clean up on component unmount
	}, [closingDate]);

	return <>{countdown}</>;
};

export default Countdown;
