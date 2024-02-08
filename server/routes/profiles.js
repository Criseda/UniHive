const express = require("express");
const router = express.Router();
const pool = require("../db");

// define routes for profiles here

// get all profiles
// returns { id, user_id, rating, bio, avatar_path, user(first_name), user(last_name) }
router.get("/", async (req, res) => {
	try {
		const allProfiles = await pool.query(
			"SELECT profile.*, app_user.first_name, app_user.last_name FROM profile INNER JOIN app_user ON profile.user_id = app_user.id"
		);
		res.json(allProfiles.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get a profile
// returns{ id, user_id, rating, bio, avatar_path, user(first_name), user(last_name) }
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const profile = await pool.query(
			"SELECT profile.*, app_user.first_name, app_user.last_name FROM profile INNER JOIN app_user ON profile.user_id = app_user.id WHERE profile.id = $1",
			[id]
		);
		res.json(profile.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// create a profile
router.post("/", async (req, res) => {
	try {
		const { user_id, rating, bio, avatar_path } = req.body;
		const newProfile = await pool.query(
			"INSERT INTO profile (user_id, rating, bio, avatar_path) VALUES ($1, $2, $3, $4) RETURNING *",
			[user_id, rating, bio, avatar_path]
		);
		res.json(newProfile.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// update a profile
// made it so that you can update rating, bio, and avatar_path individually
// that is why the extra if statements are there
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rating, bio, avatar_path } = req.body;

		// Initialize an array to hold the query parameters
		const params = [];

		// Initialize an array to hold the parts of the SET clause
		const sets = [];

		// For each property in req.body, add a part to the SET clause
		// and a parameter to the params array
		if (rating !== undefined) {
			sets.push(`rating = $${params.length + 1}`);
			params.push(rating);
		}
		if (bio !== undefined) {
			sets.push(`bio = $${params.length + 1}`);
			params.push(bio);
		}
		if (avatar_path !== undefined) {
			sets.push(`avatar_path = $${params.length + 1}`);
			params.push(avatar_path);
		}

		// Add the id to the params array
		params.push(id);

		// Build the SQL query
		const query = `UPDATE profile SET ${sets.join(", ")} WHERE id = $${
			params.length
		} RETURNING *`;

		// Run the query
		const updateProfile = await pool.query(query, params);

		res.json(updateProfile.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// delete a profile
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deleteProfile = await pool.query(
			"DELETE FROM profile WHERE id = $1",
			[id]
		);
		res.json("Profile was deleted");
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
