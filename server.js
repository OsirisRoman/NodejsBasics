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
With this new addition we filter request with a 
common starting path for all routes that use it 
and are placed in a given file. In this example 
we filter the ones that comes to our /admin/ path.
*/
app.use('/admin', adminRoutes);
app.use(publicRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>You might be lost: 404 NOT FOUND</h1>');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
