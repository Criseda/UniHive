const express = require("express");
const router = express.Router();
const pool = require("../db");

// define routes for listing images here

// get all listing images
router.get("/", async (req, res) => {
	try {
		const allListingImages = await pool.query("SELECT * FROM listing_image");
		res.json(allListingImages.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// get a listing image
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const listingImage = await pool.query(
			"SELECT * FROM listing_image WHERE id = $1",
			[id]
		);
		res.json(listingImage.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// get all listing images for a listing
router.get("/listing/:listing_id", async (req, res) => {
	const { listing_id } = req.params;
	try {
		const listingImages = await pool.query(
			"SELECT * FROM listing_image WHERE listing_id = $1",
			[listing_id]
		);
		res.json(listingImages.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// create a listing image
router.post("/", async (req, res) => {
	try {
		const { listing_id, image_path } = req.body;
		const newListingImage = await pool.query(
			"INSERT INTO listing_image (listing_id, image_path) VALUES ($1, $2) RETURNING *",
			[listing_id, image_path]
		);
		res.json(newListingImage.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// update a listing image
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { image_path } = req.body;
		const updateListingImage = await pool.query(
			"UPDATE listing_image SET image_path = $1 WHERE id = $2 RETURNING *",
			[image_path, id]
		);
		res.json(updateListingImage.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// delete a listing image
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deleteListingImage = await pool.query(
			"DELETE FROM listing_image WHERE id = $1",
			[id]
		);
		res.json("Listing image was deleted");
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
