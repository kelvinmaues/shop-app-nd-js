// models
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description,
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

// exports.getEditProduct = (req, res, next) => {
//   const { edit } = req.query;
//   const { productId } = req.params;

//   if (!edit) {
//     return res.redirect("/");
//   }
//   req.user
//     .getProducts({ where: { id: productId } })
//     .then((products) => {
//       const product = products[0];
//       if (!product) {
//         return res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: edit,
//         product,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postEditProduct = (req, res, next) => {
//   const { productId, title, price, imageUrl, description } = req.body;
//   Product.findByPk(productId)
//     .then((product) => {
//       product.title = title;
//       product.price = price;
//       product.description = description;
//       product.imageUrl = imageUrl;
//       return product.save();
//     })
//     .then(() => res.redirect("/admin/products"))
//     .catch((err) => console.log(err));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const { productId } = req.body;
//   Product.findByPk(productId)
//     .then((product) => {
//       return product.destroy();
//     })
//     .then(() => {
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };

// exports.getProducts = (req, res, next) => {
//   req.user
//     .getProducts()
//     .then((products) => {
//       res.render("admin/products", {
//         prods: products,
//         pageTitle: "Admin Products",
//         path: "/admin/products",
//       });
//     })
//     .catch((err) => console.log(err));
// };
