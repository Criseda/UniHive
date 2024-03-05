const express = require("express");
const usersRouter = require("./users");
const reportsRouter = require("./reports");
const reviewsRouter = require("./reviews");
const auctionsRouter = require("./auctions");
const bidsRouter = require("./bids");
const listingsRouter = require("./listings");
const messagesRouter = require("./messages");
const listingImagesRouter = require("./listing_images");
const auctionImagesRouter = require("./auction_images");
const savedItemsRouter = require("./saved_items")

const router = express.Router();

router.use("/users", usersRouter);
router.use("/reports", reportsRouter);
router.use("/reviews", reviewsRouter);
router.use("/auctions", auctionsRouter);
router.use("/bids", bidsRouter);
router.use("/listings", listingsRouter);
router.use("/messages", messagesRouter);
router.use("/listing_images", listingImagesRouter);
router.use("/auction_images", auctionImagesRouter);
router.use("/saved_items", savedItemsRouter);

module.exports = router;
