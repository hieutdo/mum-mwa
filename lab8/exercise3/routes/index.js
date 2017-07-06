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

router.get('/create', function (req, res) {
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

router.get('/search', function (req, res, next) {
  const { query } = req;
  const model = {
    title: 'Search',
    query,
    errors: {},
    searchResults: [],
  };

  if (!model.query.maxDistance) {
    model.query.maxDistance = 500;
  }

  if (query.action) {
    req.assert('category', 'Category is required').notEmpty();

    req.getValidationResult().then((validationResult) => {
      db.getCollection('locations').then((collection) => {
        if (validationResult.isEmpty()) {
          req.sanitize('maxDistance').toFloat();
          req.sanitize('coord.0').toFloat();
          req.sanitize('coord.1').toFloat();

          const filter = {
            category: query.category,
          };

          if (query.name) {
            filter.$text = {
              $search: query.name,
            };
          }

          if (query.coord) {
            filter.coord = {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: query.coord,
                },
                $maxDistance: query.maxDistance
              },
            };
          }

          collection.find(filter).toArray((err, results) => {
            if (err) {
              return next(err);
            }
            model.searchResults = results;
            res.render('search', model);
          });
        } else {
          model.errors = validationResult.mapped();
          res.render('search', model);
        }
      });
    });
  } else {
    res.render('search', model);
  }
});

module.exports = router;
