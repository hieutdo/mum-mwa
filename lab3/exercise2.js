const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer();

server.on('request', (req, res) => {
  const pictureFilePath = path.join(__dirname, 'high-resolution-wallpapers-25.jpg');
  const src = fs.createReadStream(pictureFilePath);

  res.writeHead('200', { 'Content-Type': 'image/jpg' });

  src.pipe(res);
});

server.listen(8080, () => {
  console.log('server listening on port 8080');
});