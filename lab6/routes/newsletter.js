const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const express = require('express');
const router = express.Router();

const dataFile = path.join(__dirname, '..', 'data', 'subscribers.txt');

router.get('/', function (req, res) {
  res.render('newsletter', { errors: null, email: '', csrfToken: req.csrfToken() });
});

router.post('/', function (req, res, next) {
  req.assert('email', 'Email cannot be left empty.').notEmpty();
  req.assert('email', 'A valid email is required.').isEmail();

  const { email } = req.body;
  const errors = req.validationErrors();

  if (errors) {
    res.render('newsletter', { email, errors });
    return;
  }

  const stream = fs.createWriteStream(dataFile, { flags: 'a' });
  stream.write(email + '\r\n');
  stream.end();

  req.session.email = email;

  res.redirect('/thankyou');
});

module.exports = router;