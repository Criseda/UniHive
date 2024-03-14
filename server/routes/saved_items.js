// Initilize express router
const express = require("express");
const router = express.Router();
const pool = require("../db");
const { cookieJWTAuth } = require("../middleware/cookieJWTAuth");

//define routes for saved items here

//Get saved_auctions from auctions table depending on user id (to render saved items)
router.post("/get/auctions/user/", cookieJWTAuth, async (req, res) => {
  try {
    
    const user_id = req.username;
    const savedAuctions = await pool.query(
      "SELECT * FROM saved_auctions WHERE user_id = $1",
      [user_id]
    );
    const auctionIds = savedAuctions.rows.map(
      (savedAuction) => savedAuction.auction_id
    );
    //const auctions = await pool.query("SELECT * FROM auction WHERE id = ANY($1)", [auctionIds]);
    const auctionDetails = await pool.query(
      `
            SELECT auction.*, MAX(bid.amount) AS highest_bid
            FROM auction
            INNER JOIN bid ON auction.id = bid.auction_id
            WHERE auction.id = ANY($1)
            GROUP BY auction.id
        `,
      [auctionIds]
    );
    res.json(auctionDetails.rows); //return saved auctions with auction details
  } catch (error) {
    console.error(error.message);
  }
});

//Get saved_listings from listing table depending on user id (to render saved items)
router.post("/get/listings/user/", cookieJWTAuth, async (req, res) => {
  try {
    
    const user_id = req.username;
    const savedListings = await pool.query(
      "SELECT * FROM saved_listings WHERE user_id = $1",
      [user_id]
    );
    const listingIds = savedListings.rows.map(
      (savedListing) => savedListing.listing_id
    );
    const listings = await pool.query(
      "SELECT * FROM listing WHERE id = ANY($1)",
      [listingIds]
    );
    res.json(listings.rows); //return saved items with listing details
  } catch (error) {
    console.error(error.message);
  }
});


//Get saved_listing from listing table depending on listing id
router.post("/get/listing/:listing_id", cookieJWTAuth, async (req, res) => {
  try {
    const { listing_id } = req.params; //get listing_id from the url
    const id = listing_id; //store it as another constant
    const user_id = req.username; //get username from the response of cookieJWTAuth middleware
    const savedListings = await pool.query( 
      "SELECT * FROM saved_listings WHERE listing_id = $1 AND user_id = $2",
      [id, user_id]
    );
    console.log(savedListings.rows);
    res.json(savedListings.rows); //return saved items with listing details
  } catch (error) {
    console.error(error.message);
  }
});


//POST create a saved_listing
router.post("/listing/:id", cookieJWTAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const listing_id = id; //store it as another constant
    const user_id = req.username; //get username from the response of cookieJWTAuth middleware
    console.log(user_id);
    console.log(id);
    const newSavedListing = await pool.query(
      "INSERT INTO saved_listings (user_id, listing_id) VALUES($1, $2) RETURNING *",
      [user_id, listing_id]
    );
    res.json(newSavedListing.rows[0]); //return new saved item
  } catch (error) {
    console.error(error.message);
  }
});

//Get saved_auction from auction table depending on auction id
router.post("/get/auction/:auction_id", cookieJWTAuth, async (req, res) => {
  try {
    const { auction_id } = req.params;
    const id = auction_id;
    const user_id = req.username;
    console.log(user_id);
    console.log(id);
    const savedAuctions = await pool.query(
      "SELECT * FROM saved_auctions WHERE auction_id = $1 AND user_id = $2",
      [id, user_id]
    );
    console.log(savedAuctions.rows);
    res.json(savedAuctions.rows); //return saved auctions with auction details
  } catch (error) {
    console.error(error.message);
  }
});


//Delete a saved_listing
router.delete("/delete/listings/:id", cookieJWTAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.username;
    const deleteSavedListing = await pool.query(
      "DELETE FROM saved_listings WHERE listing_id = $1 AND user_id = $2",
      [id, user_id]
    );
    res.json("Saved listing was deleted"); //return message
  } catch (error) {
    console.error(error.message);
  }
});

//delete a saved_auction
router.delete("/delete/auctions/:id", cookieJWTAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.username;
    const deleteSavedAuction = await pool.query(
      "DELETE FROM saved_auctions WHERE auction_id = $1 AND user_id = $2",
      [id, user_id]
    );
    res.json("Saved auction was deleted"); //return message
  } catch (error) {
    console.error(error.message);
  }
});



//POST create a saved_auction
router.post("/auction/:id", cookieJWTAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const auction_id = id; //get auction_id from the url and store it as another constant
    const user_id = req.username; //get username from the response of cookieJWTAuth middleware
    console.log(user_id);
    console.log(auction_id);
    const newSavedAuction = await pool.query(
      "INSERT INTO saved_auctions (user_id, auction_id) VALUES($1, $2) RETURNING *",
      [user_id, auction_id]
    );
    res.json(newSavedAuction.rows[0]); //return new saved item
  } catch (error) {
    console.error(error.message);
  }
});

//routes for debugging purpouses 

//get all saved listings 
router.get("/listings", async (req, res) => {
  try {
    const allSavedListings = await pool.query("SELECT * FROM saved_listings");
    res.json(allSavedListings.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get all saved auctions
router.get("/auctions", async (req, res) => {
  try {
    const allSavedAuctions = await pool.query("SELECT * FROM saved_auctions");
    res.json(allSavedAuctions.rows);
  } catch (error) {
    console.error(error.message);
  }
});



/* 
//Delete a saved_auction
router.delete("/auction/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSavedAuction = await pool.query(
      "DELETE FROM saved_auctions WHERE id = $1",
      [id]
    );
    res.json("Saved auction was deleted"); //return message
  } catch (error) {
    console.error(error.message);
  }
});

//Delete a saved_listing
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSavedListing = await pool.query(
      "DELETE FROM saved_listings WHERE id = $1",
      [id]
    );
    res.json("Saved listing was deleted"); //return message
  } catch (error) {
    console.error(error.message);
  }
});







//Delete all saved_items depending on user id
router.delete("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const deleteSavedListings = await pool.query(
      "DELETE FROM saved_listings WHERE user_id = $1",
      [user_id]
    );
    const deleteSavedAuctions = await pool.query(
      "DELETE FROM saved_auctions WHERE user_id = $1",
      [user_id]
    );
    res.json("All saved items were deleted"); //return message
  } catch (error) {
    console.error(error.message);
  }
});

*/

module.exports = router;
