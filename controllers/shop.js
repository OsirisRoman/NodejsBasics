const Product = require('../models/product');

const getProductList = (req, res, next) => {
  Product.findAll()
    .then(products => {
      products.forEach(product => {
        product.price = product.price / 100;
        product.imageUrl = product.imageurl;
        delete product.imageurl;
      });
      res.render('shop/product-list', {
        productList: products,
        pageTitle: 'Shop',
        path: '/product-list',
      });
    })
    .catch(err => console.log(err));
};

const getUserCart = (req, res, next) => {
  //First of all it is necessary to retrieve the
  //cart that belongs to the logged user
  req.user
    .getCart()
    .then(cart => {
      //Given that cart and products are associated
      //We can use the getProducts sequelize method
      //to retrieve all products that belong to
      //that cart
      return cart.getProducts();
    })
    .then(cartProducts => {
      //Finally we pass the products list
      //to the cart view, it is necessary to
      //mention that given that the cart table
      //do not have a totalToPay column yet
      //we are just passing a hard codded number
      //to make the view work as expected
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts,
        totalToPay: 0,
      });
    })
    .catch(err => console.log(err));
};

const postDeleteProductFromCart = (req, res, next) => {
  const productId = req.body.productId;
  //TWO options to remove a product from the cart
  /* 
  //Create a variable to store the user cart
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      //get the user cart and store it in the previous
      //declared variable
      fetchedCart = cart;
      //find the product we want to remove from the 
      //products table...
      return Product.findByPk(productId);
    })
    .then(product => {
      //remove the product from the cart (remove association)
      return fetchedCart.removeProduct(product);
    })
    .then(result => {
      //redirect to the cart view
      res.redirect('/cart');
    })
    .catch(err => console.log(err)); */

  //Get users cart
  req.user
    .getCart()
    .then(cart => {
      //get the product for that cart we want to delete
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      //Check if the product we want to delete exists...
      //This method was implemented by the course
      //in my opinion it is not the best
      const product = products[0];
      //remove the product from the cartitem table
      return product.cartitem.destroy();
    })
    .then(result => {
      //redirect to cart view
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

const postUserCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      //Get the Cart-Product association if it already exist in the cart
      return cart.getProducts({ where: { id: productId } });
    })
    .then(cartProduct => {
      //If the product is already in the cart it
      //just require we adjust its quantity
      if (cartProduct.length > 0) {
        product = cartProduct[0];
        //The Cart-Product association will have a cartitem property
        //storing the cartitem entry from the cartitem table
        //we just need to get its quantity property to generate the
        //new quantity
        newQuantity = product.cartitem.quantity + 1;
        //now it is just necessary to return the found product
        return product;
      }
      //If the product is not in the cart, then we need to get the
      //product from the product table
      return Product.findByPk(productId);
    })
    .then(product => {
      //Finally we add the product with its respective quantity
      //It is necessary to remmember that addProduct sequelize
      //method will update the Cart-Product association if it
      //already exist
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect('cart');
    })
    .catch(err => console.log(err));
};

const postUserOrders = (req, res, next) => {
  let cartProducts;
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      //We get store the user cart in the fetchedCart variable
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      //We get and store the products that the user added to the cart
      // in the cartProducts variable
      cartProducts = products;
      return req.user.createOrder();
    })
    .then(order => {
      //Finally we add the cartProducts to the user Order
      return order.addProducts(
        //In order to add the products it is necessary to
        //add a product property that will tell the order
        //the quantity of each product to be added to the order
        cartProducts.map(product => {
          product.orderitem = { quantity: product.cartitem.quantity };
          return product;
        })
      );
    })
    .then(() => {
      //Now it is necessaryt just to remove the cartProducts from the user cart
      return fetchedCart.removeProducts(cartProducts);
    })
    .then(() => {
      //Finally redirect the user to the orders view
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

const getUserOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then(orders => {
      if (!orders) {
        orders = [];
      }
      res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
        orders,
        totalToPay: 0,
      });
    })
    .catch(err => console.log(err));
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
  Product.findByPk(productId)
    .then(product => {
      res.render('shop/product-details', {
        product: product,
        pageTitle: product.name,
        path: '/product-list',
      });
    })
    .catch(err => console.log(err));
};

module.exports = {
  getProductList,
  getUserCart,
  postUserCart,
  postDeleteProductFromCart,
  postUserOrders,
  getUserOrders,
  goToCheckout,
  goToHome,
  getProductDetails,
};
