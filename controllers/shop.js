const Product = require('../models/product');
const Cart = require('../models/cart');

const getProductList = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('shop/product-list', {
          productList: products,
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

const postUserCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.getById(productId, product => {
    Cart.addProduct(productId, product.price);
  })
  res.redirect('cart');
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
  Product.getById(productId, product => {
    res.render('shop/product-details', {
      product: product,
      pageTitle: product.name,
      path: '/product-list',
    });
  });
}

module.exports = {
  getProductList,
  getUserCart,
  postUserCart,
  getUserOrders,
  goToCheckout,
  goToHome,
  getProductDetails,
}