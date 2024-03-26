const express = require("express");
const router = express.Router();
const pool = require("../db");
const { cookieJWTAuth } = require("../middleware/cookieJWTAuth");

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
//not sure if this route is needed / used
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

// get all bids for a specific auction
router.get("/auction/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const auctionBids = await pool.query(
      "SELECT app_user.first_name, app_user.last_name, bid.* FROM bid INNER JOIN app_user ON bid.bidder_id = app_user.id WHERE auction_id = $1",
      [id]
    );
    res.json(auctionBids.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get the number of bids for a specific auction
router.get("/auction/:id/count", async (req, res) => {
  const { id } = req.params;
  try {
    const auctionBidsCount = await pool.query(
      "SELECT COUNT(*) FROM bid WHERE auction_id = $1",
      [id]
    );
    res.json(auctionBidsCount.rows[0]);
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

// create a bid for a specific auction, with the id in the url and the bidder_id from JWT
router.post("/auction/:id", cookieJWTAuth, async (req, res) => {
  const { id } = req.params;
  const bidder_id = req.username;
  const amount = req.body.amount;
  try {
    const newBid = await pool.query(
      "INSERT INTO bid (bidder_id, auction_id, amount) VALUES ($1, $2, $3) RETURNING *",
      [bidder_id, id, amount]
    );
    res.json(newBid.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// there is no need to update a bid or delete a bid

module.exports = router;
