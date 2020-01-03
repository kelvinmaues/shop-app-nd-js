const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// const expressHbs = require("express-handlebars");
const errorController = require("./controllers/error");
const app = express();

// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts",
//     defaultLayout: "main-layout",
//     extname: "hbs"
//   })
// );

app.set("view engine", "ejs");
app.set("views", "views");

// parser
app.use(bodyParser.urlencoded({ extended: false }));
// static files
app.use(express.static(path.join(__dirname, "public")));

// routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// SERVER LISTING ON PORT 3000
app.listen(3000);
