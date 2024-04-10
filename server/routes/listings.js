const express = require("express");
const router = express.Router();
const pool = require("../db");

// define routes for listings(buy now stuff) here

// get all listings
// inner join with app_user to get the seller's name
router.get("/:page", async (req, res) => {
  const { page } = req.params;
  try {
    const allListings = await pool.query(
      "SELECT * FROM listing"
    );
    res.json(allListings.rows.slice((page * 30), (page * 30) + 30));
  } catch (err) {
    console.error(err.message);
  }
});

// get all listings for a specific user
router.get("/user/:page/:id", async (req, res) => {
  const { page, id } = req.params;
  try {
    const allListings = await pool.query(
      "SELECT * FROM listing WHERE seller_id = $1",
      [id]
    );
    res.json(allListings.rows.slice((page * 30), (page * 30) + 30));
  } catch (err) {
    console.error(err.message);
  }
});

// get all listings for a search query
router.get("/search/:page/:query", async (req, res) => {
  const { page, query } = req.params;
  try {
    const allListings = await pool.query(
      "SELECT * FROM listing WHERE LOWER(name) LIKE LOWER($1)",
      ['%' + query + '%']
    );
    res.json(allListings.rows.slice((page * 30), (page * 30) + 30));
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
      "SELECT app_user.first_name, app_user.last_name, listing.* FROM listing INNER JOIN app_user ON listing.seller_id = app_user.id WHERE listing.id = $1",
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
    const { seller_id, name, description, price, image_path } = req.body;
    const newListing = await pool.query(
      "INSERT INTO listing (seller_id, name, description, price, image_path) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [seller_id, name, description, price, image_path]
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
    const { name, description, price, image_path } = req.body;

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
    if (image_path) {
      sets.push(`image_path = $${params.length + 1}`);
      params.push(image_path);
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
