// Implement your server in this file.
// We should be able to run your server with node src/server.js

var express = require('express');
var bodyParser = require('body-parser');
var database = require('./database');
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var readDocument = database.readDocument;

var commentSchema = require('./schemas/comment.json');
var RecipeSchema = require('./schemas/recipe.json');
var validate = require('express-jsonschema').validate;
// Creates an Express server.
var app = express();


// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());
app.use(express.static('../client/build'));


function postNewRecipe(userId, name, ingredients, pic, instructions, description, allergies,
  meal, dietary) {
  var time = new Date().getTime();
  var newRecipe = {
    "userId": userId,
    "name": name,
    "postDate": time,
    "chefPoints": [],
    "ingredients": ingredients,
    "pic": pic,
    "instructions": instructions,
    "description": description,
    "allergies": allergies,
    "meal": meal,
    "dietary": dietary
  }

  newRecipe = addDocument('recipes', newRecipe);
  return newRecipe;
}

// `POST /feeditem { userId: user, location: location, contents: contents }`
app.post('/recipe',
  validate({ body: RecipeSchema }), function(req, res) {
  // If this function runs, `req.body` passed JSON validation!
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Check if requester is authorized to post this status update.
  // (The requester must be the author of the update.)
  if (fromUser === body.userId) {
    var newRecipe = postNewRecipe(body.userId, body.name, body.ingredients, body.pic,
      body.instructions, body.description, body.allergies, body.meal, body.dietary);
      // When POST creates a new resource, we should tell the client about it
      // in the 'Location' header and use status code 201.
      res.status(201);
      res.set('Location', '/recipePage/' + newRecipe._id);
      // Send the update!
      res.send(newRecipe);
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });

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


// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
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


// Starts the server on port 3000!
app.listen(3000, function() {
    console.log('Lemato app listening on port 3000!');
});
