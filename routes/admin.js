const express = require('express');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  /*Now we need to send the request to our new full path */
  res.send(
    "<form action='/admin/product' method='POST'><label for='productname'>Product Name</label><input type='text' id='productname' name='productname' /><button type='submit'>Add</button></form>"
  );
});

// /admin/product => POST
router.post('/product', (req, res) => {
  console.log('body: ', req.body);
  res.redirect('/');
});

module.exports = router;
