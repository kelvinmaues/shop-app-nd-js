const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csurf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");

// models
const User = require("./models/user");

const MONGO_DB_URI =
  "mongodb+srv://konoha_ninja:0CEsTnINuRC2JS8s@boruton-kan-sbr93.mongodb.net/shop?retryWrites=true&w=majority";

const errorController = require("./controllers/error");
const app = express();
const store = new MongoDBStore({
  uri: MONGO_DB_URI,
  collection: "sessions",
});
const csurfProtection = csurf();

// view engine
app.set("view engine", "ejs");
app.set("views", "views");

// routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// ==> MIDDLEWARES
// parser text data
app.use(bodyParser.urlencoded({ extended: false }));
// parser files
app.use(multer({ dest: "images" }).single("image"));
// static files
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csurfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Set routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

mongoose
  .connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3003);
  })
  .catch((err) => console.log(err));
