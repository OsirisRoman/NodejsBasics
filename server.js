const http = require('http');

//express is a well built function
const express = require('express');

//it returns another function after being executed
const app = express();

/*Express is based on handling middlewares.
Middlewares are functions which are executed after 
catching any incoming request of any type.
*/
/*"app.use" tells express to execute certain middleware 
after detect an incoming request*/
app.use((req, res, next) => {
  console.log("I'm a middleware!");
});

/*The previous "app" resultant function is actually 
a valid request handler*/
const server = http.createServer(app);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
