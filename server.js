const express = require('express');

const app = express();

/*
Incoming requests do not do full path validation, 
therefore if the '/' path is at the begining it 
will match with every request, in order to avoid 
this, it is necessary to place it at the bottom 
og the rest of middlewares.
*/
app.use('/', (req, res, next) => {
  console.log('I always execute because not request full path checking!');
  next();
});

app.use('/add-product', (req, res, next) => {
  console.log("I'm on the add product page!");
  res.send('<h1>Hello from ADD PRODUCT page</h1>');
});

app.use('/', (req, res, next) => {
  console.log("I'm on the home page!");
  res.send('<h1>Hello from HOME page</h1>');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
