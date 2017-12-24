var express = require("express");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
var app = express();
var jsonParser = bodyParser.json();
var url = "mongodb://Flume:gHBDTN465268@ds135866.mlab.com:35866/labaratornaya6webpokidovrazuminin";
var port = 8000;

app.use(express.static(__dirname + "/client"));

mongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})