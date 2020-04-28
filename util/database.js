const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const URL_DB =
  "mongodb+srv://konoha_ninja:0CEsTnINuRC2JS8s@boruton-kan-sbr93.mongodb.net/test?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(URL_DB)
    .then((client) => {
      console.log("Connected to the cluster");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;