const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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
Users usually cannot acces to the files placed in the 
project. Nevertheless, there is always a public folder 
which contains static files that needs to be served in 
responses. Then the properly way to serve these files 
is using a middleware that check if there is a request 
of an static file and look for this file in the 
specified defined public folder.
*/
app.use(express.static(path.join(__dirname, 'public')));

/*
With this new addition we filter request with a 
common starting path for all routes that use it 
and are placed in a given file. In this example 
we filter the ones that comes to our /admin/ path.
*/
app.use('/admin', adminRoutes);
app.use(publicRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404NotFound.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
