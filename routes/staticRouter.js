const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const { restrictTo } = require('../middlewares/auth');

router.get("/", restrictTo(['Normal', 'Admin']), async(req, res) => {
  // if(!req.user) return res.redirect('/login');
  const allUrls = await URL.find({createdBy: req.user._id});
  return res.render('home', {
    urls: allUrls,
  });
})

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get('/admin/urls', restrictTo(["Admin"]),async(req, res) => {
  const allUrls = await URL.find({});
  return res.render('home', {
    urls: allUrls,
  });
} )

module.exports = router;