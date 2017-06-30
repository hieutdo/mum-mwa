const http = require('http');
const url = require('url');
const fs = require('fs');
const { fork } = require('child_process');

const port = 8080;
const server = http.createServer();

server.on('request', (req, res) => {
  const { query } = url.parse(req.url, true);
  const { url: filePath } = query;

  if (filePath && fs.existsSync(filePath)) {
    res.writeHead('200', { 'Content-Type': 'text/plain' });

    const childProcess = fork('./worker.js', [], { silent: true });
    childProcess.send(filePath);
    childProcess.stdout.on('data', (data) => {
      res.write(data);
    });
    childProcess.on('message', () => {
      res.end();
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<html><body><h1>404 - Not Found</h1></body></html>');
  }
});

server.listen(port, () => {
  console.log(`server listening on ${port}`);
});
