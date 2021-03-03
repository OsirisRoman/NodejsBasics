const Cart = require('./cart');

const pool = require('../utils/database');

const execQuery = async (query, params) => {
  const client = await pool.connect();
  if (params) {
    try {
      const res = await client.query(query, params);
      return res.rows;
    } catch (err) {
      console.log(err.stack);
    } finally {
      client.release();
    }
  } else {
    try {
      const res = await client.query(query);
      return res.rows;
    } catch (err) {
      console.log(err.stack);
    } finally {
      client.release();
    }
  }
};

module.exports = class Product {
  constructor(id, name, imageUrl, description, price) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static async createModel() {
    const createTable = `
                          CREATE TABLE IF NOT EXISTS products (
                              id serial primary key,
                              name varchar,
                              price numeric(5,2),
                              description varchar,
                              imageurl varchar
                          )
                        `;
    await execQuery(createTable);
  }

  async save() {
    const myProduct = [this.name, this.price, this.description, this.imageUrl];
    let arrResult = [];
    if (this.id) {
      const findById = 'select id from products where id = $1';
      arrResult = await execQuery(findById, [this.id]);
      myProduct.push(this.id);
    }
    if (arrResult.length > 0) {
      const updateById =
        'update products set name = $1, price = $2, description = $3, imageUrl = $4 where id = $5';
      await execQuery(updateById, myProduct);
    } else {
      const insertIntoProducts =
        'insert into products (name, price, description, imageUrl) values ($1, $2, $3, $4)';
      await execQuery(insertIntoProducts, myProduct);
    }
  }

  static async deleteFromProductsList(productId) {
    const findById = 'select * from products where id = $1';
    let arrResult = await execQuery(findById, [productId]);
    Cart.deleteProduct(productId, arrResult[0].price);

    const deleteById = 'delete from products where id = $1';
    await execQuery(deleteById, [productId]);
  }

  static async fetchAll() {
    const findById = 'select * from products';
    const products = await execQuery(findById);
    products.forEach(product => {
      product.imageUrl = product.imageurl;
      delete product.imageurl;
    });
    return products;
  }

  static async getById(productId) {
    const findById = 'select * from products where id = $1';
    const product = await execQuery(findById, [productId]);
    product[0].imageUrl = product[0].imageurl;
    delete product[0].imageurl;
    return product[0];
  }
};
