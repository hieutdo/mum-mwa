const express = require('express');
const fetch = require('node-fetch');
const Rx = require('@reactivex/rxjs');
const router = express.Router();

const apiUrl = 'http://jsonplaceholder.typicode.com/users/';

/* GET users listing. */
router.get('/1', (req, res) => {
  const model = { title: 'Users - Promise' };

  fetch(apiUrl)
    .then((res) => res.json())
    .then((users) => {
      model.users = users;
      res.render('users', model);
    });
});

router.get('/2', (req, res) => {
  const model = { title: 'Users - Observables' };

  Rx.Observable.from(fetch(apiUrl))
    .flatMap((res) => res.json())
    .subscribe((users) => {
      model.users = users;
      res.render('users', model);
    });
});

module.exports = router;
