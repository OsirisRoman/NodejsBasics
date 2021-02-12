const Product = require('../models/product');

const getProductList = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('shop/product-list', {
          prods: products,
          pageTitle: 'Shop',
          path: '/product-list',
        });
    });
}

const getUserCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
  });
}

const getUserOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders',
  });
}

const goToCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'User Cart',
    path: '/checkout',
  });
}

const goToHome = (req, res, next) => {
  res.render('shop/index', {
    pageTitle: 'User Landing Page',
    path: '/',
  });
}

const getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  Product.getById(productId, product => {console.log(product)});
  res.render('shop/product-details', {
    pageTitle: 'Product Details',
    path: '/product-details.ejs',
  });
}

module.exports = {
  getProductList,
  getUserCart,
  getUserOrders,
  goToCheckout,
  goToHome,
  getProductDetails,
}