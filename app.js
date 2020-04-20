const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const errorController = require("./controllers/error");
const db = require("./util/database");
const app = express();

// routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// db connection
db.execute("SELECT * FROM products")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", "views");
// parser
app.use(bodyParser.urlencoded({ extended: false }));
// static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// SERVER LISTING ON PORT 3000
app.listen(3000);
