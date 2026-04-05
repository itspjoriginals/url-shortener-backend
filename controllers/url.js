const { nanoid } = require("nanoid");
const URL = require('../models/url');
const validUrl = require('valid-url');

const generateNewShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url)
      return res.status(400).json({ message: "URL required" });

    if (!validUrl.isUri(url))
      return res.status(400).json({ message: "Invalid URL" });

    const shortId = nanoid(8);

    await URL.create({
      shortId,
      redirectURL: url,
      visitHistory: [],
      createdBy: req.user._id,
    });

    return res.render("home", { id: shortId });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleRedirect = async (req, res) => {
  try {
    const { shortId } = req.params;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
            ip: req.ip,
            userAgent: req.headers["user-agent"],
          }
        }
      }
    );

    if (!entry)
      return res.status(404).json({ message: "URL not found" });

    return res.redirect(entry.redirectURL);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleGetAnalytics = async (req, res) => {
  try {
    const { shortId } = req.params;

    const result = await URL.findOne({ shortId });

    if (!result)
      return res.status(404).json({ message: "Not found" });

    return res.json({
      totalClicks: result.visitHistory.length,
      data: result.visitHistory,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  generateNewShortUrl,
  handleRedirect,
  handleGetAnalytics,
};