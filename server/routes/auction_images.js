const express = require("express");
const router = express.Router();
const pool = require("../db");

// define routes for auction images here

// get all auction images
router.get("/", async (req, res) => {
  try {
    const allAuctionImages = await pool.query("SELECT * FROM auction_image");
    res.json(allAuctionImages.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get an auction image
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const auctionImage = await pool.query(
      "SELECT * FROM auction_image WHERE id = $1",
      [id]
    );
    res.json(auctionImage.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all auction images for an auction
router.get("/auction/:auction_id", async (req, res) => {
  const { auction_id } = req.params;
  try {
    const auctionImages = await pool.query(
      "SELECT * FROM auction_image WHERE auction_id = $1",
      [auction_id]
    );
    res.json(auctionImages.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get the first auction image for a auction
router.get("/auction/:auction_id/first", async (req, res) => {
  const { auction_id } = req.params;
  try {
    const auctionImage = await pool.query(
      "SELECT * FROM auction_image WHERE auction_id = $1 ORDER BY id ASC LIMIT 1",
      [auction_id]
    );
    res.json(auctionImage.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create a auction image
router.post("/", async (req, res) => {
  try {
    const { auction_id, image_path } = req.body;
    const newAuctionImage = await pool.query(
      "INSERT INTO auction_image (auction_id, image_path) VALUES ($1, $2) RETURNING *",
      [auction_id, image_path]
    );
    res.json(newAuctionImage.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a auction image
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { image_path } = req.body;
    const updateAuctionImage = await pool.query(
      "UPDATE auction_image SET image_path = $1 WHERE id = $2 RETURNING *",
      [image_path, id]
    );
    res.json(updateAuctionImage.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a auction image
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAuctionImage = await pool.query(
      "DELETE FROM auction_image WHERE id = $1",
      [id]
    );
    res.json("auction image was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
