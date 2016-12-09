// Implement your server in this file.
// We should be able to run your server with node src/server.js

var express = require('express');
var bodyParser = require('body-parser');
var database = require('./database');
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var readDocument = database.readDocument;
var getCollection = database.getCollection;

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

//???
app.put('/feeditem/:feeditemid/content', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var feedItemId = req.params.feeditemid;
  var feedItem = readDocument('feedItems', feedItemId);
  // Check that the requester is the author of this feed item.
  if (fromUser === feedItem.contents.author) {
    // Check that the body is a string, and not something like a JSON object.
    // We can't use JSON validation here, since the body is simply text!
    if (typeof(req.body) !== 'string') {
    // 400: Bad request.
    res.status(400).end();
    return;
    }
    // Update text content of update.
    feedItem.contents.contents = req.body;
    writeDocument('feedItems', feedItem);
    res.send(getFeedItemSync(feedItemId));
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

// Like a feed item.
app.put('/feeditem/:feeditemid/likelist/:userid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var feedItemId = parseInt(req.params.feeditemid, 10);
  var userId = parseInt(req.params.userid, 10);
  if (fromUser === userId) {
    var feedItem = readDocument('feedItems', feedItemId);
    // Add to likeCounter if not already present.
    if (feedItem.likeCounter.indexOf(userId) === -1) {
      feedItem.likeCounter.push(userId);
      writeDocument('feedItems', feedItem);
    }
    // Return a resolved version of the likeCounter
    res.send(feedItem.likeCounter.map((userId) =>
    readDocument('users', userId)));
  } else {
  // 401: Unauthorized.
  res.status(401).end();
  }
});

app.delete('/feeditem/:feeditemid/likelist/:userid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var feedItemId = parseInt(req.params.feeditemid, 10);
  var userId = parseInt(req.params.userid, 10);
  if (fromUser === userId) {
    var feedItem = readDocument('feedItems', feedItemId);
    var likeIndex = feedItem.likeCounter.indexOf(userId);
    // Remove from likeCounter if present
    if (likeIndex !== -1) {
      feedItem.likeCounter.splice(likeIndex, 1);
      writeDocument('feedItems', feedItem);
    }
    // Return a resolved version of the likeCounter
    // Note that this request succeeds even if the
    // user already unliked the request!
    res.send(feedItem.likeCounter.map((userId) =>
    readDocument('users', userId)));
  } else {
  // 401: Unauthorized.
  res.status(401).end();
  }
});

// `put /feeditem/:feedItemId/comments { userId: user, contents: contents }`
app.put('/feeditem/:feedItemId/comments', validate({
    body: commentSchema
}), function(req, res) {
    // If this function runs, `req.body` passed JSON validation!
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // Check if requester is authorized to post this status update.
    // (The requester must be the author of the update.)
    if (fromUser === body.author) {
        var comment = postComment(req.params.feedItemId, body.userId, body.contents);
        // When POST creates a new resource, we should tell the client about it
        // in the 'Location' header and use status code 201.
        res.status(201);
        // Send the update!
        res.send(comment);
    } else {
        // 401: Unauthorized.
        res.status(401).end();
    }
});

// post new recipe
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

// `POST /recipe {userId: userId, name: name, ingredients: ingredients, pic: pic,
// instructions: instructions, description: description, allergies: allergies,
//  meal: meal, dietary: dietary} `
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
      console.log("halloooo" + newRecipe._id);
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

function postComment(feedItemId, user, contents) {
    var time = new Date().getTime();
    var feedItem = readDocument('feedItems',feedItemId)
    feedItem.comments.push({
            "author": user,
            "postDate": time,
            "contents": contents,
            "likeCounter": []
    });
    // Add the status update to the database.
    // Returns the status update w/ an ID assigned.
    writeDocument('feedItems', feedItem);
    // Return the newly-posted object.
    return getFeedItemSync(feedItemId);
}


// Search for feed item
app.post('/results', function(req, res) {
  if (typeof(req.body) === 'string') {
    var queryText = req.body.trim().toLowerCase();
    // Search the user's feed.
    var recipe= getCollection("recipes");
    console.log(recipe);
    res.send(recipe.filter((recipeNames) => {
      var name = readDocument('name', recipeNames);
      console.log(name);
      return name
      .toLowerCase()
      .indexOf(queryText) !== -1;
    }).map(getFeedItemSync));
    // res.send("Bai");
  } else {
    res.status(400).end();
  }
});

// Go to Recipe Page
app.get('/recipePage/:recipeid', function(req, res) {
  var recipeid = parseInt(req.params.recipeid, 10);
  var recipeData = readDocument('recipes', recipeid);
  res.send(recipeData);
});

//
// // Search for feed item
// app.post('/results', function(req, res) {
//   /**
//   * Post data: {
//     receipe: "recipe search term",
//     ing: "ingredient search term"
//   }
//   var recipe_search_term = req.get("recipe")
//   var ing_search_term = req.get("ing")
//   */
//   var recipe = readDocument('recipes', recipe);
//   if (typeof(req.body) === 'string') {
//     var queryText = req.body.trim().toLowerCase();
//     // Search the user's feed.
//     var ing = readDocument('ingredients', recipe);
//     // "filter" is like "map" in that it is a magic method for
//     // arrays. It takes an anonymous function, which it calls
//     // with each item in the array. If that function returns 'true',
//     // it will include the item in a return array. Otherwise, it will
//     // not.
//     // Here, we use filter to return only feedItems that contain the
//     // query text.
//     // Since the array contains feed item IDs, we later map the filtered
//     // IDs to actual feed item objects.
//     res.send(feedItemIDs.filter((feedItemID) => {
//       var feedItem = readDocument('feedItems', feedItemID);
//       return feedItem.contents.contents
//       .toLowerCase()
//       .indexOf(queryText) !== -1;
//     }).map(getFeedItemSync));
//   } else {
//     // 400: Bad Request.
//     res.status(400).end();
//   }
// });
//

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

app.get('/search', function(req,res){
  res.send();
});


//updateSettings
app.put('/settings/users/:userid', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));



  // userid is a string. We need it to be a number.
  // Parameters are always strings.
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
  var userData = readDocument('users', userid);
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
