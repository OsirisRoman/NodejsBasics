const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/add-product',
    });
}

exports.postAddProduct = (req, res) => {
    products.push({ title: req.body.productname });
    res.redirect('/');
}

exports.getAllProducts = (req, res, next) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
}