'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

// router
//   .get('/', passport.authenticate('untappd', {
//     failureRedirect: '/signup',
//     scope: [
//       'https://www.googleapis.com/auth/userinfo.profile',
//       'https://www.googleapis.com/auth/userinfo.email'
//     ],
//     session: false
//   }))

//   .get('/callback', passport.authenticate('untappd', {
//     failureRedirect: '/signup',
//     session: false
//   }), auth.setTokenCookie);


router.get('/auth/untappd', passport.authenticate('untappd'));

router.get('/auth/untappd/callback',
  passport.authenticate('untappd', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
module.exports = router;