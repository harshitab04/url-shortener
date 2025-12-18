const express = require("express");
const shortid = require("shortid");
const validUrl = require("valid-url");
const Url = require("../models/Url");
const redis = require("../config/redis");

const router = express.Router();

// Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isWebUri(longUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  // Check Redis
  const cached = await redis.get(longUrl);
  if (cached) {
    return res.json({
      longUrl,
      shortUrl: `http://localhost:5000/api/${cached}`,
    });
  }

  // Check DB
  let url = await Url.findOne({ longUrl });
  if (url) {
    await redis.set(longUrl, url.shortCode);
    await redis.set(url.shortCode, longUrl);

    return res.json({
      longUrl,
      shortUrl: `http://localhost:5000/api/${url.shortCode}`,
    });
  }

  // Create new short code
  const shortCode = shortid.generate();
  url = new Url({ longUrl, shortCode });
  await url.save();

  await redis.set(longUrl, shortCode);
  await redis.set(shortCode, longUrl);

  res.json({
    longUrl,
    shortUrl: `http://localhost:5000/api/${shortCode}`,
  });
});

// Redirect
router.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  const cached = await redis.get(shortCode);
  if (cached) return res.redirect(cached);

  const url = await Url.findOne({ shortCode });
  if (!url) return res.status(404).json({ error: "URL not found" });

  await redis.set(shortCode, url.longUrl);
  res.redirect(url.longUrl);
});

module.exports = router;
