// Initilize express router
const express = require("express");
const router = express.Router();
const pool = require("../db");

//define routes for saved items here


//Get all saved_listings and saved_auctions depending on user id

router.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const savedListings = await pool.query("SELECT * FROM saved_listings WHERE user_id = $1", [id]);
        const savedAuctions = await pool.query("SELECT * FROM saved_auctions WHERE user_id = $1", [id]);
        res.json({savedListings: savedListings.rows, savedAuctions: savedAuctions.rows}); //return saved items
    } catch (error) {
        console.error(error.message);
    }
});

//Get saved_auctions from listing table depending on user id
router.get("/auction/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const savedAuctions = await pool.query("SELECT * FROM saved_auctions WHERE user_id = $1", [id]);
        const auctionIds = savedAuctions.rows.map(savedAuction => savedAuction.auction_id);
        //const auctions = await pool.query("SELECT * FROM auction WHERE id = ANY($1)", [auctionIds]);
        const auctionDetails = await pool.query(`
            SELECT auction.*, MAX(bid.amount) AS highest_bid
            FROM auction
            INNER JOIN bid ON auction.id = bid.auction_id
            WHERE auction.id = ANY($1)
            GROUP BY auction.id
        `, [auctionIds]);
        res.json(auctionDetails.rows); //return saved auctions with auction details
    } catch (error) {
        console.error(error.message);
    }
});


//Get saved_listing from listing table depending on user id
router.get("/listing/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const savedListings = await pool.query("SELECT * FROM saved_listings WHERE user_id = $1", [id]);
        const listingIds = savedListings.rows.map(savedListing => savedListing.listing_id);
        const listings = await pool.query("SELECT * FROM listing WHERE id = ANY($1)", [listingIds]);
        res.json(listings.rows); //return saved items with listing details
    } catch (error) {
        console.error(error.message);
    }
});

//create a saved_listing
router.post("/listing", async (req, res) => {
    try {
        const { user_id, listing_id } = req.body; //get data from the request body
        const newSavedListing = await pool.query(
            "INSERT INTO saved_listings (user_id, listing_id) VALUES($1, $2) RETURNING *",
            [user_id, listing_id]
        );
        res.json(newSavedListing.rows[0]); //return new saved item
    } catch (error) {
        console.error(error.message);
    }
});

//create a saved_auction
router.post("/auction", async (req, res) => {
    try {
        const { user_id, auction_id } = req.body; //get data from the request body
        const newSavedAuction = await pool.query(
            "INSERT INTO saved_auctions (user_id, auction_id) VALUES($1, $2) RETURNING *",
            [user_id, auction_id]
        );
        res.json(newSavedAuction.rows[0]); //return new saved item
    } catch (error) {
        console.error(error.message);
    }
});

//Delete a saved_auction
router.delete("/auction/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSavedAuction = await pool.query("DELETE FROM saved_auctions WHERE id = $1", [id]);
        res.json("Saved auction was deleted"); //return message
    } catch (error) {
        console.error(error.message);
    }
});

//Delete a saved_listing
router.delete("/listing/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSavedListing = await pool.query("DELETE FROM saved_listings WHERE id = $1", [id]);
        res.json("Saved listing was deleted"); //return message
    } catch (error) {
        console.error(error.message);
    }
});

//Delete all saved_items depending on user id
router.delete("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSavedListings = await pool.query("DELETE FROM saved_listings WHERE user_id = $1", [id]);
        const deleteSavedAuctions = await pool.query("DELETE FROM saved_auctions WHERE user_id = $1", [id]);
        res.json("All saved items were deleted"); //return message
    } catch (error) {
        console.error(error.message);
    }
});


//Get all saved_items (dont think this will be used)
router.get("/", async (req, res) => {
    try {
        const savedItems = await pool.query(`
            SELECT saved_listings.*, saved_auctions.*
            FROM saved_listings
            INNER JOIN saved_auctions ON saved_listings.user_id = saved_auctions.user_id
        `);
        res.json(savedItems.rows); //return saved items
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;
