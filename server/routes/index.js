const express = require('express');
const usersRouter = require('./users');
const reportsRouter = require('./reports');
const profilesRouter = require('./profiles');
const reviewsRouter = require('./reviews');
const auctionsRouter = require('./auctions');
const bidsRouter = require('./bids');
const listingsRouter = require('./listings');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/reports', reportsRouter);
router.use('/profiles', profilesRouter);
router.use('/reviews', reviewsRouter);
router.use('/auctions', auctionsRouter);
router.use('/bids', bidsRouter);
router.use('/listings', listingsRouter);

module.exports = router;
