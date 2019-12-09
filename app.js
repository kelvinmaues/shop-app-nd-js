const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.set("view engine", "pug");
app.set("views", "views");

// parser
app.use(bodyParser.urlencoded({ extended: false }));
// static files
app.use(express.static(path.join(__dirname, "public")));

// routes
const admin = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use("/admin", admin.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404");
});
// app.use("/products", (req, res, next) => {
//   res.send("<h1>The product list!</h1>");
//   next();
// });

// SERVER LISTING ON PORT 3000
app.listen(3000);
