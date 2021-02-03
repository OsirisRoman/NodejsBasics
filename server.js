const http = require('http');

//express is a well built function
const express = require('express');

//it returns another function after being executed
const app = express();

/*The previous resultant function is actually 
a valid request handler*/
const server = http.createServer(app);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
