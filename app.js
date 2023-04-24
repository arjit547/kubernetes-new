const http = require('http');

const server = http.createServer((req, res) => {
  res.end('MOOGLELABS-Seasia-124567drfher');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
