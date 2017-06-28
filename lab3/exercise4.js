const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const readable = fs.createReadStream(path.join(__dirname, 'high-resolution-wallpapers-25.jpg'));
const writableGz = fs.createWriteStream(path.join(__dirname, 'compressed.jpg.gz'));

// first, zip it
readable.pipe(zlib.createGzip()).pipe(writableGz).on('finish', () => {
  const readableGz = fs.createReadStream(path.join(__dirname, 'compressed.jpg.gz'));
  const writable = fs.createWriteStream(path.join(__dirname, 'compressed.jpg'));

  // then unzip it
  readableGz.pipe(zlib.createGunzip()).pipe(writable).on('error', (error) => {
    console.log(error);
  });
});