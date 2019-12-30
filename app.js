const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressHbs = require("express-handlebars");

const app = express();

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");
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
  res.status(404).render("404", { pageTitle: "Page not found" });
});
// app.use("/products", (req, res, next) => {
//   res.send("<h1>The product list!</h1>");
//   next();
// });

// SERVER LISTING ON PORT 3000
app.listen(3000);
