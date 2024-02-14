const express = require("express");
const usersRouter = require("./users");
const reportsRouter = require("./reports");
const reviewsRouter = require("./reviews");
const auctionsRouter = require("./auctions");
const bidsRouter = require("./bids");
const listingsRouter = require("./listings");
const messaagesRouter = require("./messages");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/reports", reportsRouter);
router.use("/reviews", reviewsRouter);
router.use("/auctions", auctionsRouter);
router.use("/bids", bidsRouter);
router.use("/listings", listingsRouter);
router.use("/messages", messaagesRouter);

module.exports = router;
