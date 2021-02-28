const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editMode: false,
  });
};

const postAddProduct = (req, res) => {
  const body = req.body;
  body.price = Math.trunc(body.price * 100);
  body.imageurl = body.imageUrl;
  delete body.imageUrl;
  //createProduct is a method created by
  //sequelize after made the respective
  //associations between Users and Products
  //tables to avoid pass the userId as a
  //parameter. It is necessary to remmember
  //that user is not just a javascript object
  //with user data, instead it is a Sequelize
  //object with some methods like the one used
  //here associated to it.
  req.user
    .createProduct(body)
    .then(result => {
      res.redirect('/admin/product-list');
    })
    .catch(err => {
      console.log(err);
    });
};

const getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  if (!productId) {
    /*This should be replaced by an 
      error handling in the future*/
    return res.redirect('/');
  }
  //Get products created by the logged user
  //filter the one with the required id
  //I decided to not use this option because
  //It suppose the the product list is showing
  //just the products created by that user,
  //then it is not necessary to find all products
  //created by that user to check if the product exist
  //req.user
  //.getProducts({ where: { id: productId } })
  Product.findByPk(productId)
    .then(product => {
      //const product = products[0];
      product.price = product.price / 100;
      product.imageUrl = product.imageurl;
      delete product.imageurl;
      res.render('admin/add-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editMode: true,
        product: product,
      });
    })
    .catch(err => console.log(err));
};

const postEditProduct = (req, res) => {
  const updatedProduct = req.body;
  updatedProduct.price = Math.trunc(updatedProduct.price * 100);
  updatedProduct.imageurl = updatedProduct.imageUrl;
  delete updatedProduct.imageUrl;
  Product.update(updatedProduct, {
    where: { id: Number(req.params.productId) },
  })
    .then(() => {
      res.redirect('/admin/product-list');
    })
    .catch(err => console.log(err));
};

const postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  Product.destroy({ where: { id: Number(productId) } })
    .then(() => {
      res.redirect('/admin/product-list');
    })
    .catch(err => console.log(err));
};

const getProductList = (req, res, next) => {
  //In this example we just retrieve all products
  //created by a given user. In real life it will depend
  req.user
    .getProducts()
    //Product.findAll()
    .then(products => {
      products.forEach(product => {
        product.price = product.price / 100;
        product.imageUrl = product.imageurl;
        delete product.imageurl;
      });
      res.render('admin/product-list', {
        productList: products,
        pageTitle: 'Admin Products',
        path: '/admin/product-list',
      });
    })
    .catch(err => console.log(err));
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getProductList,
};
