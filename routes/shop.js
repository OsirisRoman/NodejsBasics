const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log("I'm on the home page!");
  res.send('<h1>Hello from HOME Routed page</h1>');
});

module.exports = router;
