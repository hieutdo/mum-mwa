const express = require('express');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');

const port = 3000;
const dbHost = 'localhost';
const dbPort = 27017;
const dbName = 'mwa';
const colName = 'homework7';
const secret = 'asaadsaad';

const app = express();

app.get('/secret', (req, res) => {

  MongoClient.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, (err, db) => {
    if (err) throw err;

    db.collection(colName).findOne({}, (err, doc) => {
      if (err) throw err;

      const { message } = doc;
      const decipher = crypto.createDecipher('aes256', secret);
      let decrypted = decipher.update(message, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      db.close();

      res.end(decrypted);
    });
  });

});

app.listen(port, () => {
  console.log('Server listening on port', port);
});
