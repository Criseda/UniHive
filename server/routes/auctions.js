const express = require("express");
const router = express.Router();
const pool = require("../db");

// define routes for auctions here

// get all auctions, and their highest bid
router.get("/:page", async (req, res) => {
  const { page } = req.params;
  try {
    const allAuctions = await pool.query(`
      SELECT auction.*, MAX(bid.amount) AS highest_bid
      FROM auction
      INNER JOIN bid ON auction.id = bid.auction_id
      GROUP BY auction.id
    `);

    res.json(allAuctions.rows.slice((page * 30), (page * 30) + 30));
  } catch (err) {
    console.error(err.message);
  }
});

// get all auctions made by a specific user, and their highest bid
router.get("/user/:page/:id", async (req, res) => {
  const { page, id } = req.params;
  try {
    const userAuctions = await pool.query(
      `SELECT auction.*, MAX(bid.amount) AS highest_bid
       FROM auction
       INNER JOIN bid ON auction.id = bid.auction_id
       WHERE auction.seller_id = $1
       GROUP BY auction.id`,
      [id]
    );
    res.json(userAuctions.rows.slice((page * 30), (page * 30) + 30));
  } catch (err) {
    console.error(err.message);
  }
});

// get all listings for a search query
router.get("/search/:page/:query", async (req, res) => {
  const { page, query } = req.params;
  try {
    const allAuctions = await pool.query(
      "SELECT * FROM auction WHERE name LIKE $1",
      ['%' + query + '%']
    );
    res.json(allAuctions.rows.slice((page * 30), (page * 30) + 30));
  } catch (err) {
    console.error(err.message);
  }
});

// get an auction
// two inner joins to be able to return the first name and the last name of the seller
// and the highest bid for the auction
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const auction = await pool.query(
      `SELECT app_user.first_name, app_user.last_name, auction.*, MAX(bid.amount) AS highest_bid
       FROM auction 
       INNER JOIN app_user ON auction.seller_id = app_user.id 
       INNER JOIN bid ON auction.id = bid.auction_id
       WHERE auction.id = $1
       GROUP BY auction.id, app_user.first_name, app_user.last_name`,
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
    const {
      seller_id,
      name,
      description,
      opening_bid,
      closing_date,
      image_path,
    } = req.body;
    const newAuction = await pool.query(
      "INSERT INTO auction (seller_id, name, description, closing_date, image_path) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [seller_id, name, description, closing_date, image_path]
    );

    //Create an starting bid for the auction
    const auctionStartingBid = await pool.query(
      "INSERT INTO bid (bidder_id, auction_id, amount) VALUES ($1, $2, $3) RETURNING *",
      [seller_id, newAuction.rows[0].id, opening_bid]
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
