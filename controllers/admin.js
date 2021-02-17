const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editMode: false,
    });
}

const postAddProduct = (req, res) => {
    const product = new Product(undefined, ...Object.values(req.body));
    product.save();
    res.redirect('/');
}

const getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.getById(productId, product => {
      if(!product){
        /*This should be replaced by an 
        error handling in the future*/
        return res.redirect('/');
      }
      res.render('admin/add-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editMode: true,
        product: product,
      });
    })
}

const postEditProduct = (req, res) => {
  const productId = req.params.productId;
  const product = new Product(productId, ...Object.values(req.body));
  product.save(); 
  res.redirect('/admin/product-list');
}

const postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  Product.deleteFromProductsList(productId);
  res.redirect('/admin/product-list');
}

const getProductList = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('admin/product-list', {
          productList: products,
          pageTitle: 'Admin Products',
          path: '/admin/product-list',
        });
    });
}

module.exports = {
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct,
    getProductList
}