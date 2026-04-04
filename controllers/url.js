const {nanoid} = require("nanoid");
const URL = require('../models/url');

const generateNewShortUrl = async(req, res) => {
  try {
    const body = req.body;
  if(!body.url) {
    return res.status(400).json({
      error: "url is required",
    });
  }

  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({
    id: shortID,
  })
  } catch (error) {
    console.error("Something wrong in controllers");
    return res.status(403).json({
      success: false,
      message: error.message
    })
  }
}

const handleGetAnalytics = async(req, res) => {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const handleRedirect = async(req, res) => {
  try {
    const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, {$push: {
        visitHistory: {
          timestamp: Date.now(),
        },
  }})
  res.redirect(entry.redirectURL);
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = {
  generateNewShortUrl,
  handleGetAnalytics,
  handleRedirect
};