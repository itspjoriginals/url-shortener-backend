const express = require('express');
const router = express.Router();
const {generateNewShortUrl, handleGetAnalytics, handleRedirect} = require('../controllers/url');

router.post("/", generateNewShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get('/:shortId',handleRedirect );

module.exports = router;