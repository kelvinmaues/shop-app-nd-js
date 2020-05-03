// models
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     .then((product) => {
//       res.render("shop/product-detail", {
//         product: product,
//         pageTitle: product.title,
//         path: "/products",
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       console.log("cart", cart);
//       res.render("shop/cart", {
//         path: "/cart",
//         pageTitle: "Your Cart",
//         products: cart,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId)
//     .then((product) => {
//       return req.user.addToCart(product);
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((err) => console.log(err));
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const { productId } = req.body;
//   req.user
//     .deleteItemFromCart(productId)
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((err) => console.log(err));
// };

// exports.postOrder = (req, res, next) => {
//   req.user
//     .addOrder()
//     .then(() => {
//       res.redirect("/orders");
//     })
//     .catch((err) => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders()
//     .then((orders) => {
//       res.render("shop/orders", {
//         path: "/orders",
//         pageTitle: "Your Orders",
//         orders,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };
