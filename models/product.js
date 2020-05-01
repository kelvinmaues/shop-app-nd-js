const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class Product {
  constructor(title, price, description, imageUrl, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
  }

  // Save method to add or insert one product to this collection
  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectID(productId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }

  updateProductById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .updateOne(
        { _id: new mongodb.ObjectID(productId) },
        {
          $set: this,
        }
      )
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectID(productId) })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
