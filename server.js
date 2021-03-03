const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/shop');
const errorControler = require('./controllers/error');
const Product = require('./models/product');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(publicRoutes);

app.use(errorControler.get404);

const PORT = 3000;

(async () => {
  await Product.createModel();
})().catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
