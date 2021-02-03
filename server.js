const http = require('http');

const routes = require('./routes');
console.log('exported text: ', routes.text);
const server = http.createServer(routes.handler);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
