const Product = require('../models/product');
const Cart = require('../models/cart');

const getProductList = (req, res, next) => {
  (async () => {
    const products = await Product.fetchAll();
    res.render('shop/product-list', {
      productList: products,
      pageTitle: 'Shop',
      path: '/product-list',
    });
  })().catch(err => console.log(err.stack));
};

const getUserCart = (req, res, next) => {
  Cart.getProducts(cart => {
    const userCart = { products: [], totalToPay: 0 };
    (async () => {
      const products = await Product.fetchAll();
      cart.products.forEach(cartProduct => {
        const foundProduct = products.find(
          product => product.id === Number(cartProduct.id)
        );
        userCart.products.push({
          ...foundProduct,
          quantity: cartProduct.quantity,
        });
      });
      userCart.totalToPay = cart.totalToPay;

      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: userCart.products,
        totalToPay: userCart.totalToPay,
      });
    })().catch(err => console.log(err.stack));
  });
};

const postDeleteProductFromCart = (req, res, next) => {
  const productId = req.body.productId;
  (async () => {
    const products = await Product.fetchAll();
    priceOfProductToRemove = products.find(product => product.id === productId)
      .price;
    Cart.deleteProduct(productId, priceOfProductToRemove);
    res.redirect('/cart');
  })().catch(err => console.log(err.stack));
};

const postUserCart = (req, res, next) => {
  const productId = req.body.productId;
  (async () => {
    const product = await Product.getById(productId);
    Cart.addProduct(productId, product.price);
    res.redirect('cart');
  })().catch(err => console.log(err.stack));
};

const getUserOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders',
  });
};

const goToCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'User Cart',
    path: '/checkout',
  });
};

const goToHome = (req, res, next) => {
  res.render('shop/index', {
    pageTitle: 'User Landing Page',
    path: '/',
  });
};

const getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  (async () => {
    const product = await Product.getById(productId);
    res.render('shop/product-details', {
      product: product,
      pageTitle: product.name,
      path: '/product-list',
    });
  })().catch(err => console.log(err.stack));
};

module.exports = {
  getProductList,
  getUserCart,
  postUserCart,
  postDeleteProductFromCart,
  getUserOrders,
  goToCheckout,
  goToHome,
  getProductDetails,
};
