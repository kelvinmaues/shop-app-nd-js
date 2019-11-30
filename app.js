const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// const routes = require("./routes");
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/products", (req, res, next) => {
  res.send("<h1>The product list!</h1>");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("In another middleware!");
  // res.send("<h1>The 'Add the product page'</h1>");
  const form = `
    <form action="/product" method="POST">
      <input type="text" name="title">
      <button type="submit" >Add product</button>
    </form>
  `;
  res.send(form);
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use((req, res, next) => {
  res.send("<h1>Hello from Express.js!</h1>");
});

// SERVER LISTING ON PORT 3000
app.listen(3000);
