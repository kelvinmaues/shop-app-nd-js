const express = require("express");
const path = require("path");

const router = express.Router();

const rootDir = require("../util/path");
const admin = require("./admin");

router.get("/", (req, res, next) => {
  console.log(admin.products);
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
