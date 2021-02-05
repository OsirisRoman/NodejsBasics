const express = require('express');
/*A nodejs library that let us construct 
the full path of our files*/
const path = require('path');

const rootDir = require('../utils/path');
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  /* The res.sendFile() Function is a Nodejs function that 
  allow us to send any kind of files as a response 
  to a given incoming request.
  the path.join() Function is the path library tool 
  that allow us to build the full path for the file 
  that we want to send. This full path is built 
  depending on the operative system where we are 
  running our server. It is necessary to remember 
  that linux and windows build the path differently 
  Windows build the path using '\' while Linux use '/'.
  __dirname is a global variable that stores the 
  absolute path in our operative system to this folder
  */
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/product => POST
router.post('/add-product', (req, res) => {
  console.log('body: ', req.body);
  res.redirect('/');
});

module.exports = router;
