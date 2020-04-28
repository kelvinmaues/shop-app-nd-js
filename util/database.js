const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const URL_DB =
  "mongodb+srv://konoha_ninja:0CEsTnINuRC2JS8s@boruton-kan-sbr93.mongodb.net/test?retryWrites=true&w=majority";

const mongoConnect = (callback) => {
  MongoClient.connect(URL_DB)
    .then((client) => {
      console.log("Connected to the cluster");
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
