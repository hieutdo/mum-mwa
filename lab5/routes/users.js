const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

/* GET users listing. */
router.get('/1', function (req, res, next) {
  const model = { title: 'Users - Promise' };

  fetch('http://jsonplaceholder.typicode.com/users/')
    .then((res) => res.json())
    .then((users) => {
      model.users = users;
      res.render('users', model);
    });
});

module.exports = router;
