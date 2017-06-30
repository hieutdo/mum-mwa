const fs = require('fs');

process.on('message', (filePath) => {
  const readable = fs.createReadStream(filePath);

  readable.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  readable.on('end', () => {
    process.send('completed');
  });
});
