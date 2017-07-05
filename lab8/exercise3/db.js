const util = require('util');
const { MongoClient } = require('mongodb');

const dbUrl = 'mongodb://localhost:27017/mwa';
let dbInstance = null;

const connect = util.promisify(MongoClient.connect);

exports.get = () => new Promise((resolve, reject) => {
  if (dbInstance) {
    resolve(dbInstance);
  } else {
    connect(dbUrl).then(resolve).catch(reject);
  }
});

exports.getCollection = (collectionName) => exports.get().then((db) => db.collection(collectionName));

exports.close = () => new Promise((resolve, reject) => {
  if (dbInstance) {
    dbInstance.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      dbInstance = null;
      resolve();
    });
  } else {
    reject(new Error('dbInstance is not initialized.'));
  }
});
