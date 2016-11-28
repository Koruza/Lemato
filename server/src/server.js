// Implement your server in this file.
// We should be able to run your server with node src/server.js

var express = require('express');
var bodyParser = require('body-parser');
var database = require('./database');
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var readDocument = database.readDocument;

// Creates an Express server.
var app = express();

// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());
app.use(express.static('../client/build'));


// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
});


// Starts the server on port 3000!
app.listen(3000, function() {
    console.log('Lemato app listening on port 3000!');
});
