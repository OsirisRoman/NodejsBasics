const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.send(
    "<form action='/product' method='POST'><label for='productname'>Product Name</label><input type='text' id='productname' name='productname' /><button type='submit'>Add</button></form>"
  );
});

router.post('/product', (req, res) => {
  console.log('body: ', req.body);
  res.redirect('/');
});

module.exports = router;
