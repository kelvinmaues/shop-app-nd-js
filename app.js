const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parser
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found!</h1>");
});
// app.use("/products", (req, res, next) => {
//   res.send("<h1>The product list!</h1>");
//   next();
// });

// SERVER LISTING ON PORT 3000
app.listen(3000);
