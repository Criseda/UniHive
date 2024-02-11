const express = require("express");
const router = express.Router();
const pool = require("../db");

// define routes for user reports here

// get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await pool.query("SELECT * FROM report");
    res.json(reports.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a report
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const report = await pool.query("SELECT * FROM report WHERE id = $1", [
      id,
    ]);
    res.json(report.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// create a report
router.post("/", async (req, res) => {
    try {
        const { reporter_id, reported_id, reason } = req.body;
        const newReport = await pool.query(
            "INSERT INTO report (reporter_id, reported_id, reason) VALUES($1, $2, $3) RETURNING *",
            [reporter_id, reported_id, reason]
        );
        res.json(newReport.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// delete a report
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteReport = await pool.query("DELETE FROM report WHERE id = $1", [id]);
        res.json("Report was deleted!");
    } catch (error) {
        console.error(error.message);
    }
});


module.exports = router;
