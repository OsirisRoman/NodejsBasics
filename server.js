const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/*When handling POST resquest the body comes encoded 
Then, we decode the body using the body-parser module 
and we do it at the beginning of all middlewares in 
order to let us use the parsed value in other tasks.
If we don't decode the body then the body attribute 
added by express will be undefined
*/
app.use(bodyParser.urlencoded());

app.use('/', (req, res, next) => {
  console.log('I always execute because not request full path checking!');
  next();
});

app.use('/add-product', (req, res, next) => {
  res.send(
    "<form action='/product' method='POST'><label for='productname'>Product Name</label><input type='text' id='productname' name='productname' /><button type='submit'>Add</button></form>"
  );
});

app.use('/product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  console.log("I'm on the home page!");
  res.send('<h1>Hello from HOME page</h1>');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
