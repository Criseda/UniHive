const express = require("express");
const router = express.Router();
const pool = require("../db");

// define routes for listings(buy now stuff) here

// get all listings
// inner join with app_user to get the seller's name
router.get("/", async (req, res) => {
  try {
    const allListings = await pool.query(
      "SELECT app_user.first_name, app_user.last_name, listing.* FROM listing INNER JOIN profile ON listing.seller_id = profilE.id INNER JOIN app_user ON profile.user_id = app_user.id"
    );
    res.json(allListings.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a listing
// two inner joins to be able to return the first name and the last name of the seller
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await pool.query(
      "SELECT app_user.first_name, app_user.last_name, listing.* FROM listing INNER JOIN profile ON listing.seller_id = profile.id INNER JOIN app_user ON profile.user_id = app_user.id WHERE listing.id = $1",
      [id]
    );
    res.json(listing.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create a listing
router.post("/", async (req, res) => {
  try {
    const { seller_id, name, description, price } = req.body;
    const newListing = await pool.query(
      "INSERT INTO listing (seller_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [seller_id, name, description, price]
    );
    res.json(newListing.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a listing
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    // Initialize an array to hold the query parameters
    const params = [];

    // Initialize an array to hold the parts of the SET clause
    const sets = [];

    // for each property in the req.body, add the property to the set clause and the value to the params array
    if (name) {
      sets.push(`name = $${params.length + 1}`);
      params.push(name);
    }
    if (description) {
      sets.push(`description = $${params.length + 1}`);
      params.push(description);
    }
    if (price) {
      sets.push(`price = $${params.length + 1}`);
      params.push(price);
    }

    // create a query string
    const queryString = `UPDATE listing SET ${sets.join(", ")} WHERE id = $${
      params.length + 1
    } RETURNING *`;
    params.push(id);

    // execute the query
    const updatedListing = await pool.query(queryString, params);
    res.json(updatedListing.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a listing
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteListing = await pool.query(
      "DELETE FROM listing WHERE id = $1",
      [id]
    );
    res.json("Listing was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
