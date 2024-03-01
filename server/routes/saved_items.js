
const express = require("express");
const router = express.Router();
const pool = require("../db");

//define routes for saved items here

//Get all saved items depending on user id
router.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const savedItems = await pool.query("SELECT * FROM saved_items WHERE user_id = $1", [id]);
        res.json(savedItems.rows); //return saved items
    } catch (error) {
        console.error(error.message);
    }
});

//Get a saved item by its ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const savedItem = await pool.query("SELECT * FROM saved_items WHERE id = $1", [id]);
        res.json(savedItem.rows[0]); //return saved item
    } catch (error) {
        console.error(error.message);
    }
});

//Create a saved item
router.post("/", async (req, res) => {
    try {
        const { user_id, auction_id, listing_id } = req.body;
        const newSavedItem = await pool.query(
            "INSERT INTO saved_items (user_id, auction_id, listing_id) VALUES($1, $2, $3) RETURNING *",
            [user_id, auction_id, listing_id]
        );
        res.json(newSavedItem.rows[0]); //return new saved item
    } catch (error) {
        console.error(error.message);
    }
});


//Delete a saved item
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSavedItem = await pool.query("DELETE FROM saved_items WHERE id = $1", [id]);
        res.json("Saved item was deleted"); //return message
    } catch (error) {
        console.error(error.message);
    }
});

//Delete all saved items depending on user id
router.delete("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSavedItems = await pool.query("DELETE FROM saved_items WHERE user_id = $1", [id]);
        res.json("All saved items were deleted"); //return message
    } catch (error) {
        console.error(error.message);
    }
});

//get all saved items
router.get("/", async (req, res) => {
    try {
        const allSavedItems = await pool.query("SELECT * FROM saved_items");
        res.json(allSavedItems.rows);
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;
