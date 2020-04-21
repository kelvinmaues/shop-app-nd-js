const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const app = express();
// models
const Product = require("./models/product");
const User = require("./models/user");
// routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.set("view engine", "ejs");
app.set("views", "views");
// parser
app.use(bodyParser.urlencoded({ extended: false }));
// static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// model associations to the database
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// DB connection to sync models to tables and its relations
sequelize
  .sync({ force: true })
  .then(() => {
    // SERVER LISTING ON PORT 3000
    app.listen(3000);
  })
  .catch((err) => console.log(err));
