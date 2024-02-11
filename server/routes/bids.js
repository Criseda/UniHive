const express = require("express");
const router = express.Router();
const pool = require("../db");

// define routes for bids(on listings) here

// get all bids
router.get("/", async (req, res) => {
  try {
    const allBids = await pool.query("SELECT * FROM bid");
    res.json(allBids.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a bid
// inner join with app_user to get the bidder's name
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bid = await pool.query(
      "SELECT app_user.first_name, app_user.last_name, bid.* FROM bid INNER JOIN app_user ON bid.bidder_id = app_user.id WHERE bid.id = $1",
      [id]
    );
    res.json(bid.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create a bid
router.post("/", async (req, res) => {
  try {
    const { bidder_id, auction_id, amount } = req.body;
    const newBid = await pool.query(
      "INSERT INTO bid (bidder_id, auction_id, amount) VALUES ($1, $2, $3) RETURNING *",
      [bidder_id, auction_id, amount]
    );
    res.json(newBid.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// there is no need to update a bid or delete a bid

module.exports = router;
