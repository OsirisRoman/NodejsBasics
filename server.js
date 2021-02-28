const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/shop');
const errorControler = require('./controllers/error');
const sequelize = require('./utils/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(publicRoutes);

app.use(errorControler.get404);

const PORT = 3000;

//Here we define which user created which product
//Cascade will handle the required action if a user is
//removed, in this case, this will remove its created products
//One-To-Many relationship
User.hasMany(Product, {
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Product.belongsTo(User);
//One-To-One relationship
User.hasOne(Cart);
Cart.belongsTo(User);
//Many-To-Many relationship
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });
User.hasMany(Order);
Order.belongsTo(User);
//Many-To-Many relationship
Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

//This method creates the tables(in case these not
//exist yet) and relations(if defined) for all
//the models previously defined(These are defined
//and can be found in the models folder)
sequelize
  //The "force: true" property remove and recreate
  //the tables on the database after each server refreshing
  .sync({ force: true })
  //.sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Osiris', email: 'osiris@example.com' });
    }
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
