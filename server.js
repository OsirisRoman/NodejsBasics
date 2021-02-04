const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/shop');

/*When handling POST resquest the body comes encoded 
Then, we decode the body using the body-parser module 
and we do it at the beginning of all middlewares in 
order to let us use the parsed value in other tasks.
If we don't decode the body then the body attribute 
added by express will be undefined
*/
app.use(bodyParser.urlencoded({ extended: true }));

/*
In the same way as before, the order of the routes matter.
The requests directed to '/' must be used cautiously.
*/
app.use(adminRoutes);
app.use(publicRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>You might be lost: 404 NOT FOUND</h1>');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
