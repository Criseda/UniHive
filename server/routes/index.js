const express = require('express');
const usersRouter = require('./users');
// const profilesRouter = require('./profiles');
// const auctionsRouter = require('./auctions');

const router = express.Router();

router.use('/users', usersRouter);
// router.use('/profiles', profilesRouter);
// router.use('/auctions', auctionsRouter);

module.exports = router;
