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
  next();
});

/*The express middlewares will need three parameters: 
The request, the response and the function next that 
tells the server to execute the following middleware*/
app.use((req, res, next) => {
  console.log("I'm the second middleware!");
});

/*The next middleware will not be executed because 
the previous one didn't execute the next function. */
app.use((req, res, next) => {
  console.log("I'm the third middleware!");
});

/*The previous "app" resultant function is actually 
a valid request handler*/
const server = http.createServer(app);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
