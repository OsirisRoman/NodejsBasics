const express = require('express');
//const path = require('path');

//const rootDir = require('../utils/path');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('shop.js: ', adminData.products);
  res.render('shop');
});

module.exports = router;
