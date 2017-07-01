const express = require('express');
const fetch = require('node-fetch');
const Rx = require('@reactivex/rxjs');
const router = express.Router();

const apiUrl = 'http://jsonplaceholder.typicode.com/users/';

/* GET users listing. */
router.get('/1', (req, res) => {
  const model = { title: 'Users - Promise' };

  fetch(apiUrl)
    .then((resp) => resp.json())
    .then((users) => {
      model.users = users;
      res.render('users', model);
    });
});

router.get('/2', (req, res) => {
  const model = { title: 'Users - Observables' };

  Rx.Observable.from(fetch(apiUrl))
    .flatMap((resp) => resp.json())
    .subscribe((users) => {
      model.users = users;
      res.render('users', model);
    });
});

router.get('/3', async function (req, res) {
  const model = { title: 'Users - Async/Await' };

  model.users = await fetch(apiUrl).then(resp => resp.json());
  res.render('users', model);
});

module.exports = router;
