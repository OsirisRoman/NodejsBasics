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
  Cart.getProducts(cart => {
    Product.fetchAll(products => {
      const userCart = {products: [], totalToPay: 0};
      cart.products.forEach(cartProduct => {
        const foundProduct = products.find(product => product.id === cartProduct.id);
        userCart.products.push({...foundProduct, quantity: cartProduct.quantity});
      })
      userCart.totalToPay = cart.totalToPay;
      
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: userCart.products,
        totalToPay: userCart.totalToPay,
      });

    })
  })
}

const postDeleteProductFromCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetchAll(products => {
      const userCartProducts = []
      priceOfProductToRemove = products.find(product => product.id === productId).price;
      Cart.deleteProduct(productId, priceOfProductToRemove);
      res.redirect('/cart');
    })
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
  postDeleteProductFromCart,
  getUserOrders,
  goToCheckout,
  goToHome,
  getProductDetails,
}