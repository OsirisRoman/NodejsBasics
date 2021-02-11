const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.goToHome);
router.get('/product-list', shopController.getProductList);
router.get('/product-details', shopController.getProductDetails);
router.get('/cart', shopController.getUserCart);
router.get('/checkout', shopController.goToCheckout);

module.exports = router;
