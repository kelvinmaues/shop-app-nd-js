const express = require("express");

const app = express();
// const routes = require("./routes");

app.use("/products", (req, res, next) => {
  res.send("<h1>The product list!</h1>");
});

app.use((req, res, next) => {
  res.send("<h1>Hello from Express.js!</h1>");
});

// SERVER LISTING ON PORT 3000
app.listen(3000);
