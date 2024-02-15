const express = require("express");
const router = express.Router();
const pool = require("../db");

// define routes for auctions here

// get all auctions
router.get("/", async (req, res) => {
  try {
    const allAuctions = await pool.query("SELECT * FROM auction");
    res.json(allAuctions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get an auction
// two inner joins to be able to return the first name and the last name of the seller
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const auction = await pool.query(
      "SELECT app_user.first_name, app_user.last_name, auction.* FROM auction INNER JOIN app_user ON auction.seller_id = app_user.id WHERE auction.id = $1",
      [id]
    );
    res.json(auction.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create an auction
router.post("/", async (req, res) => {
  try {
    const { seller_id, name, description, opening_bid, closing_date, image_path } =
      req.body;
    const newAuction = await pool.query(
      "INSERT INTO auction (seller_id, name, description, opening_bid, closing_date, image_path) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [seller_id, name, description, opening_bid, closing_date, image_path]
    );
    res.json(newAuction.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update an auction
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // seller should not be able to update the closing date or the opening bid once the auction has started
    const { name, description, image_path } = req.body;

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
    if (image_path) {
      sets.push(`image_path = $${params.length + 1}`);
      params.push(image_path);
    }

    // add the id to the params array
    params.push(id);

    // construct the query string
    const query = `UPDATE auction SET ${sets.join(", ")} WHERE id = $${
      params.length
    } RETURNING *`;

    // run the query
    const updateAuction = await pool.query(query, params);
    res.json(updateAuction.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete an auction
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAuction = await pool.query(
      "DELETE FROM auction WHERE id = $1",
      [id]
    );
    res.json("Auction was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
