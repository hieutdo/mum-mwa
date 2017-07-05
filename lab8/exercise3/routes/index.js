const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
  db.getCollection('locations').then((collection) => {
    collection.find({}).toArray((err, locations) => {
      if (err) {
        return next(err);
      }
      res.render('index', { title: 'Locations', locations });
    });
  });
});

module.exports = router;
