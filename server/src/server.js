// Implement your server in this file.
// We should be able to run your server with node src/server.js

var express = require('express');
var bodyParser = require('body-parser');
var database = require('./database');
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var readDocument = database.readDocument;

var commentSchema = require('./schemas/comment.json');
var validate = require('express-jsonschema').validate;
// Creates an Express server.
var app = express();


// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());
app.use(express.static('../client/build'));


/**
 * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
 */
function getUserIdFromToken(authorizationLine) {
    try {
        // Cut off "Bearer " from the header value.
        var token = authorizationLine.slice(7);
        // Convert the base64 string to a UTF-8 string.
        var regularString = new Buffer(token, 'base64').toString('utf8');
        // Convert the UTF-8 string into a JavaScript object.
        var tokenObj = JSON.parse(regularString);
        var id = tokenObj['id'];
        // Check that id is a number.
        if (typeof id === 'number') {
            return id;
        } else {
            // Not a number. Return -1, an invalid ID.
            return -1;
        }
    } catch (e) {
        // Return an invalid ID.
        return -1;
    }
}


/**
 * Get the feed data for a particular user.
 */
function getFeedData(user) {
    var userData = readDocument('users', user);
    var feedData = readDocument('feeds', userData.feed);
    // While map takes a callback, it is synchronous, not asynchronous.
    // It calls the callback immediately.
    feedData.contents = feedData.contents.map(getFeedItemSync);
    // Return FeedData with resolved references.
    return feedData;
}

/**
 * Resolves a feed item. Internal to the server, since it's synchronous.
 */
function getFeedItemSync(feedItemId) {
    var feedItem = readDocument('feedItems', feedItemId);
    // Resolve 'like' counter.
    // Assuming a StatusUpdate. If we had other types of FeedItems in the DB, we would
    // need to check the type and have logic for each type.
    feedItem.contents.author = readDocument('users', feedItem.contents.author);
    // Resolve comment author.
    feedItem.comments.forEach((comment) => {
        comment.author = readDocument('users', comment.author);
    });
    return feedItem;
}

//new Buffer(JSON.stringify({ id: 1 })).toString('base64');
app.get('/user/:userid/feed', function(req, res) {
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // userid is a string. We need it to be a number.
    // Parameters are always strings.
    var useridNumber = parseInt(userid, 10);
    if (fromUser === useridNumber) {
        // Send response.
        res.send(getFeedData(userid));
    } else {
        // 401: Unauthorized request.
        res.status(401).end();
    }
});

// Search for feed item
app.post('/search', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var user = readDocument('users', fromUser);
  if (typeof(req.body) === 'string') {
    // trim() removes whitespace before and after the query.
    // toLowerCase() makes the query lowercase.
    var queryText = req.body.trim().toLowerCase();
    // Search the user's feed.
    var feedItemIDs = readDocument('feeds', user.feed).contents;
    // "filter" is like "map" in that it is a magic method for
    // arrays. It takes an anonymous function, which it calls
    // with each item in the array. If that function returns 'true',
    // it will include the item in a return array. Otherwise, it will
    // not.
    // Here, we use filter to return only feedItems that contain the
    // query text.
    // Since the array contains feed item IDs, we later map the filtered
    // IDs to actual feed item objects.
    res.send(feedItemIDs.filter((feedItemID) => {
      var feedItem = readDocument('feedItems', feedItemID);
      return feedItem.contents.contents
      .toLowerCase()
      .indexOf(queryText) !== -1;
    }).map(getFeedItemSync));
  } else {
    // 400: Bad Request.
    res.status(400).end();
  }
});


/**
 * Translate JSON Schema Validation failures into error 400s.
 */
app.use(function(err, req, res, next) {
    if (err.name === 'JsonSchemaValidation') {
        // Set a bad request http response status
        res.status(400).end();
    } else {
        // It's some other sort of error; pass it to next error middleware handler
        next(err);
    }
});


//updateSettings
app.put('/settings/users/:userid', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userData = readDocument('users', userid);
	var newName = readDocument('users', userData.fullName);
  var newBio = readDocument('users', userData.bio);

  // userid is a string. We need it to be a number.
  // Parameters are always strings.
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
  writeDocument('users', newName);
  writeDocument('users', newBio);
      // Send response.
  res.send(getFeedData(userid));
} else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });


//updatePassword
app.put('/settings/users/:userid', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
	var userData = readDocument('users', userid);
	var newPassword = readDocument('users', userData.password);
  // userid is a string. We need it to be a number.
  // Parameters are always strings.
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
  writeDocument('users', newPassword);
      // Send response.
  res.send(getFeedData(userid));
} else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });


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
