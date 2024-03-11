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

//check if a user exists (by id)
router.get("/check/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query("SELECT * FROM app_user WHERE id = $1", [
      id,
    ]);
    if (user.rows.length > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

// create a user
router.post("/", async (req, res) => {
  try {
    //no banned because it is a new user
    const { id, name, rating, bio, avatar_path } = req.body;
    const [first_name, last_name] = name.split(" ");
    const newUser = await pool.query(
      "INSERT INTO app_user (id, first_name, last_name, rating, bio, avatar_path) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id, first_name, last_name, rating, bio, avatar_path]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rating, bio, avatar_path, banned } = req.body;

    // Initialize an array to hold the query parameters
    const params = [];

    // Initialize an array to hold the parts of the SET clause
    const sets = [];

    // for each property in the req.body, add the property to the set clause and the value to the params array
    if (name !== undefined) {
      const [first_name, last_name] = name.split(" ");
      sets.push(`first_name = $${params.length + 1}`);
      params.push(first_name);
      sets.push(`last_name = $${params.length + 1}`);
      params.push(last_name);
    }
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
    if (banned !== undefined) {
      sets.push(`banned = $${params.length + 1}`);
      params.push(banned);
    }

    // add the id to the params array
    params.push(id);

    // build the query string
    const query = `UPDATE app_user SET ${sets.join(", ")} WHERE id = $${
      params.length
    } RETURNING *`;

    // run the query
    const updatedUser = await pool.query(query, params);
    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

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
