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

app.use((req, res, next) => {
  console.log("I'm the second middleware!");
  res.send('<h1>Hello from express</h1>');
});

app.use((req, res, next) => {
  console.log("I'm the third middleware!");
});

//const server = http.createServer(app);

const PORT = 3000;

/*Using the function app.listen express makes the 
creation and listening for us, and this reduce our }
code legibility.
*/
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

/*app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});*/
