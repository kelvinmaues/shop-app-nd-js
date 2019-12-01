const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  console.log("In another middleware!");
  // res.send("<h1>The 'Add the product page'</h1>");
  const form = `
    <form action="/admin/product" method="POST">
      <input type="text" name="title">
      <button type="submit" >Add product</button>
    </form>
  `;
  res.send(form);
});

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
