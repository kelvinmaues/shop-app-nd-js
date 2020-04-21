const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "l1ghts1d3", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
