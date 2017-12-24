var objectId = require("mongodb").ObjectID;
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://Flume:gHBDTN465268@ds135866.mlab.com:35866/labaratornaya6webpokidovrazuminin";

module.exports = function(app, db) {
	  // получение всех файлов
	app.get("/api/files", function(req, res) {
	  mongoClient.connect(url, function(err, db) {
	    db.collection("files").find({}).toArray(function(err, files) {
	      if (err) {
	        console.error(err);
	        return res.status(400).send();
	      }
	      res.send(files)
	      console.log(files);
	      db.close();
	    });
	  });
	});
	// получение одного файла по id
	app.get("/api/files/:id", function(req, res) {

	  var id = new objectId(req.params.id);
	  mongoClient.connect(url, function(err, db) {
	    db.collection("files").findOne({
	      _id: id
	    }, function(err, file) {

	      if (err) {
	        console.error(err);
	        return res.status(400).send();
	      }
	      res.send(file);
	      db.close();
	    });
	  });
	});
	// получение отправленных данных
	app.post("/api/files", jsonParser, function(req, res) {
	  if (!req.body) return res.sendStatus(400);

	  var fileName = req.body.body.fileName;
	  var fileData = req.body.body.fileData;
	  var file = {
	    fileName: fileName,
	    fileData: fileData
	  };

	  console.log(file);
	  mongoClient.connect(url, function(err, db) {
	    db.collection("files").insertOne(file, function(err, result) {

	      if (err) {
	        console.error(err);
	        return res.status(400).send();
	      }

	      res.send(file);
	      db.close();
	    });
	  });
	});
	// изменение файла
	app.put("/api/files", jsonParser, function(req, res) {

	  if (!req.body) return res.sendStatus(400);

	  console.log(req);

	  var id = new objectId(req.body.body.id);
	  var fileName = req.body.body.fileName;
	  var fileData = req.body.body.fileData;

	  console.log("id=" + id + " fileName=" + fileName + " fileData=" + fileData);

	  mongoClient.connect(url, function(err, db) {
	    db.collection("files").findOneAndUpdate({
	      _id: id
	    }, {
	      $set: {
	        fileData: fileData,
	        fileName: fileName
	      }
	    }, {
	      returnOriginal: false
	    }, function(err, result) {

	      if (err) {
	        console.error(err);
	        return res.status(400).send();
	      }
	      console.log(result);
	      var file = result.value;
	      console.log(file);
	      res.send(file);
	      db.close();
	    });
	  });
	});
};