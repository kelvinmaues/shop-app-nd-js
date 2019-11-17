const http = require("http");
const express = require("express");

const app = express();
// const routes = require("./routes");

const server = http.createServer(app);
// SERVER LISTING ON PORT 3000
server.listen(3000);
