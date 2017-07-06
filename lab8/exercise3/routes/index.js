const { ObjectID } = require('mongodb');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const col = db.collection('locations');
    const locations = await col.find({}).toArray();
    res.render('index', { title: 'Locations', locations });
  } catch (e) {
    next(e);
  }
});

router.get('/edit/:id', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const col = db.collection('locations');
    const { id } = req.params;
    const { saved } = req.query;
    const location = await col.findOne({ _id: ObjectID(id) });

    res.render('edit', {
      title: `Edit Location: ${location.name}`,
      location,
      errors: {},
      saved,
    });
  } catch (e) {
    next(e);
  }
});

router.get('/delete/:id', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const col = db.collection('locations');
    const { id } = req.params;
    await col.remove({ _id: ObjectID(id) });

    res.redirect('/');
  } catch (e) {
    next(e);
  }
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

router.post(['/create', '/edit/:id'], async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const col = db.collection('locations');
    const { body } = req;
    const isCreate = !body._id;

    req.assert('name', 'Name is required').notEmpty();
    req.assert('category', 'Category is required').notEmpty();
    req.assert('coord.0', 'Longitude must be a valid number').isFloat();
    req.assert('coord.1', 'Latitude must be a valid number').isFloat();

    const validationResult = await req.getValidationResult();

    if (validationResult.isEmpty()) {
      req.sanitize('coord.0').toFloat();
      req.sanitize('coord.1').toFloat();

      if (isCreate) {
        delete body._id;
        const result = await col.insertOne(body);
        res.redirect('/edit/' + result.insertedId + '?saved=success');
      } else {
        body._id = ObjectID(body._id);
        const result = await col.findOneAndUpdate({ _id: body._id }, body);
        res.redirect('/edit/' + result.value._id + '?saved=success');
      }
    } else {
      res.render('edit', {
        title: isCreate ? 'Create New Location' : `Edit Location: ${body.name}`,
        location: body,
        errors: validationResult.mapped(),
        saved: 'fail',
      });
    }
  } catch (e) {
    next(e);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const col = db.collection('locations');
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

    if (query.action === 'submit') {
      req.assert('category', 'Category is required').notEmpty();

      const validationResult = await req.getValidationResult();

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
              $maxDistance: query.maxDistance,
            },
          };
        }

        model.searchResults = await col.find(filter).toArray();
        res.render('search', model);
      } else {
        model.errors = validationResult.mapped();
        res.render('search', model);
      }
    } else {
      res.render('search', model);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
