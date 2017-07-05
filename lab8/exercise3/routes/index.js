const { ObjectID } = require('mongodb');
const express = require('express');
const router = express.Router();
const db = require('../db');

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

router.get('/edit/:id', function (req, res, next) {
  const { id } = req.params;
  const { saved } = req.query;

  db.getCollection('locations').then((collection) => {
    collection.findOne({ _id: ObjectID(id) }, (err, location) => {
      if (err) {
        return next(err);
      }
      res.render('edit', {
        title: `Edit Location: ${location.name}`,
        location,
        errors: {},
        saved,
      });
    });
  });
});

router.get('/create', function (req, res, next) {
  res.render('edit', {
    title: 'Create New Location',
    location: {
      name: '',
      category: '',
      coord: [],
    },
    errors: {},
    saved: null,
  });
});

router.post(['/create', '/edit/:id'], function (req, res, next) {
  const { body } = req;
  const isCreate = !body._id;

  req.assert('name', 'Name is required').notEmpty();
  req.assert('category', 'Category is required').notEmpty();
  req.assert('coord.0', 'Longitude must be a valid number').isFloat();
  req.assert('coord.1', 'Latitude must be a valid number').isFloat();

  req.getValidationResult().then((validationResult) => {
    if (validationResult.isEmpty()) {

      req.sanitize('coord.0').toFloat();
      req.sanitize('coord.1').toFloat();

      db.getCollection('locations').then((collection) => {
        if (isCreate) {
          delete body._id;
          collection.insertOne(body).then((result) => {
            res.redirect('/edit/' + result.insertedId + '?saved=success');
          });
        } else {
          body._id = ObjectID(body._id);
          collection.findOneAndUpdate({ _id: body._id }, body).then((result) => {
            res.redirect('/edit/' + result.value._id + '?saved=success');
          });
        }
      });
    } else {
      res.render('edit', {
        title: isCreate ? 'Create New Location' : `Edit Location: ${body.name}`,
        location: body,
        errors: validationResult.mapped(),
        saved: 'fail',
      });
    }
  });
});

module.exports = router;
