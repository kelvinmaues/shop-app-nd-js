const fs = require("fs");
const path = require("path");
const utilPath = require("../util/path");
const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    // products.push(this);
    const p = path.join(utilPath, "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(utilPath, "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      return cb(JSON.parse(fileContent));
    });
  }
};
