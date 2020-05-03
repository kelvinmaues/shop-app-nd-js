const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const app = express();
// models
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

app.use((req, res, next) => {
  User.findById("5eaeffeb57cda8298736577b")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// Set routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://konoha_ninja:0CEsTnINuRC2JS8s@boruton-kan-sbr93.mongodb.net/shop?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Kelvin Maues",
          email: "kelvin@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3003);
  })
  .catch((err) => console.log(err));
