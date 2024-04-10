const express = require("express");
const router = express.Router();
const pool = require("../db");

// define routes for profile reviews here

// get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await pool.query("SELECT * FROM review");
    res.json(reviews.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a review
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await pool.query("SELECT * FROM review WHERE id = $1", [id]);
    res.json(review.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get number of reviews that a certain user has
router.get("/count/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reviewCount = await pool.query(
      "SELECT COUNT(*) FROM review WHERE reviewed_id = $1",
      [id]
    );
    res.json(reviewCount.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// create a review
router.post("/", async (req, res) => {
  try {
    const { reviewer_id, reviewed_id, rating, review } = req.body;
    const newReview = await pool.query(
      "INSERT INTO review (reviewer_id, reviewed_id, rating, review) VALUES($1, $2, $3, $4) RETURNING *",
      [reviewer_id, reviewed_id, rating, review]
    );
    res.json(newReview.rows[0]);
  } catch (error) {
    console.error(error.message);
  }

  // once a review is created, update the average rating of the user
  try {
    const { reviewed_id } = req.body;
    const averageRating = await pool.query(
      "SELECT AVG(rating) FROM review WHERE reviewed_id = $1",
      [reviewed_id]
    );
    const updateRating = await pool.query(
      "UPDATE app_user SET rating = $1 WHERE id = $2",
      [averageRating.rows[0].avg, reviewed_id]
    );
  } catch (error) {
    console.error(error.message);
  }
});

// delete a review
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteReview = await pool.query("DELETE FROM review WHERE id = $1", [
      id,
    ]);
    res.json("Review was deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
