const express = require("express");
const path = require("path");

const router = express.Router();

const rootDir = require("../util/path");

const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  const { title } = req.body;
  products.push({ title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
