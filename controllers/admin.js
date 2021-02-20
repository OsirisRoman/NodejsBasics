const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editMode: false,
  });
};

const postAddProduct = (req, res) => {
  const product = new Product(undefined, ...Object.values(req.body));
  (async () => {
    await product.save();
    res.redirect('/');
  })().catch(err => console.log(err.stack));
};

const getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  if (!productId) {
    /*This should be replaced by an 
      error handling in the future*/
    return res.redirect('/');
  }
  (async () => {
    const result = await Product.getById(productId);
    res.render('admin/add-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editMode: true,
      product: result,
    });
  })().catch(err => console.log(err.stack));
};

const postEditProduct = (req, res) => {
  const productId = req.params.productId;
  const product = new Product(productId, ...Object.values(req.body));
  (async () => {
    await product.save();
    res.redirect('/admin/product-list');
  })().catch(err => console.log(err.stack));
};

const postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  (async () => {
    await Product.deleteFromProductsList(productId);
    res.redirect('/admin/product-list');
  })().catch(err => console.log(err.stack));
};

const getProductList = (req, res, next) => {
  (async () => {
    const products = await Product.fetchAll();
    res.render('admin/product-list', {
      productList: products,
      pageTitle: 'Admin Products',
      path: '/admin/product-list',
    });
  })().catch(err => console.log(err.stack));
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getProductList,
};
