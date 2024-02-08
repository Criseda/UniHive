const express = require("express");
const router = express.Router();
const pool = require("../db");

// define routes for users

// get all users
router.get("/", async (req, res) => {
	try {
		const allUsers = await pool.query("SELECT * FROM app_user");
		res.json(allUsers.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get a user
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await pool.query("SELECT * FROM app_user WHERE id = $1", [id]);
		res.json(user.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// create a user
router.post("/", async (req, res) => {
	try {
		const { username, name } = req.body;
		const [first_name, last_name] = name.split(" ");
		const newUser = await pool.query(
			"INSERT INTO app_user (username, first_name, last_name) VALUES ($1, $2, $3) RETURNING *",
			[username, first_name, last_name]
		);
		res.json(newUser.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// update a user

// delete a user
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deleteUser = await pool.query("DELETE FROM app_user WHERE id = $1", [
			id,
		]);
		res.json("User was deleted");
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
