const dns = require('dns');

dns.resolve4('mum.edu', (err, addresses) => {
  if (err) {
    throw err;
  }
  console.log(addresses);
});