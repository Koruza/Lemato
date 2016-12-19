// Implement your server in this file.
// We should be able to run your server with node src/server.js

var express = require('express');
var bodyParser = require('body-parser');
var database = require('./database');
var commentSchema = require('./schemas/comment.json');
var RecipeSchema = require('./schemas/recipe.json');
var validate = require('express-jsonschema').validate;
// Creates an Express server.
var app = express();

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/Lemato';
var ResetDatabase = require('./resetdatabase');
var getUserData = require('../src/server');

MongoClient.connect(url, function(err, db) {

app.use('/mongo_express', mongo_express(mongo_express_config));


// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());
app.use(express.static('../client/build'));

//???
app.put('/feeditem/:feeditemid/content', function(req, res) {
    var fromUser = new ObjectID(getUserIdFromToken(req.get('Authorization')));
    var feedItemId = new ObjectID(req.params.feeditemid);
    db.collection('feedItems').updateOne({
      _id: feedItemId,
      "contents.author": fromUser
    }, { $set: { "contents.contents": req.body } }, function(err, result) {
      if (err) {
        return sendDatabaseError(res, err);
      } else if (result.modifiedCount === 0) {
        // Could not find the specified feed item.
        return res.status(400).end();
      }
      getFeedItem(feedItemId, function(err, feedItem) {
        if (err) {
          return sendDatabaseError(res, err);
        }
        res.send(feedItem);
      });
    });
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

// Post a comment
app.post('/feeditem/:feeditemid/comments', validate({ body: commentSchema }), function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var comment = req.body;
  var author = req.body.author;
  comment.likeCounter = [];
  var feedItemId = new ObjectID(req.params.feeditemid);
  if (fromUser === author) {
    // Only update the feed item if the author matches the currently authenticated
    // user.
    db.collection('feedItems').updateOne({
      _id: feedItemId
    }, { $push: { comments: comment} }, function(err, result) {
      if (err) {
        return sendDatabaseError(res, err);
      } else if (result.modifiedCount === 0) {
        // Could not find the specified feed item. Perhaps it does not exist, or
        // is not authored by the user.
        // 400: Bad request.
        return res.status(400).end();
      }
      // Update succeeded! Return the resolved feed item.
      getFeedItem(feedItemId, function(err, feedItem) {
        if (err) {
          return sendDatabaseError(res, err);
        }
        res.send(feedItem);
      });
    });
  } else {
    // Unauthorized.
    res.status(401).end();
  }
});

// post new recipe
function postNewRecipe(author, name, ingredients, pic, instructions, description, allergies,
  meal, dietary, cb) {
  var time = new Date().getTime();
  var newRecipe = {
    "author": author,
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

  db.collection('recipes').insertOne(newRecipe, function(err, result) {
    if (err) {
      return cb(err);
    }
    newRecipe._id = result.insertedId;
    cb(null, newRecipe);
  })
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
  if (fromUser === body.author) {
    postNewRecipe(new ObjectID(fromUser), body.name, body.ingredients, body.pic,
      body.instructions, body.description, body.allergies, body.meal, body.dietary,
      function(err, newRecipe) {
        if (err) {
          return sendDatabaseError(res, err);
        } else {
          // When POST creates a new resource, we should tell the client about it
          // in the 'Location' header and use status code 201.
          res.status(201);
          res.set('Location', '/recipePage/' + newRecipe._id);
          // Send the update!
          res.send(newRecipe);
        }
      });
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
        if (typeof id === 'string') {
            return id;
        } else {
            // Not a number. Return -1, an invalid ID.
            return "";
        }
    } catch (e) {
        // Return an invalid ID.
        return -1;
    }
}


// /**
//  * Get the feed data for a particular user.
//  */
// function getFeedData(user) {
//     var userData = readDocument('users', user);
//     var feedData = readDocument('feeds', userData.feed);
//     // While map takes a callback, it is synchronous, not asynchronous.
//     // It calls the callback immediately.
//     feedData.contents = feedData.contents.map(getFeedItemSync);
//     // Return FeedData with resolved references.
//     return feedData;
// }
//
// /**
//  * Resolves a feed item. Internal to the server, since it's synchronous.
//  */
// function getFeedItemSync(feedItemId) {
//     var feedItem = readDocument('feedItems', feedItemId);
//     // Resolve 'like' counter.
//     // Assuming a StatusUpdate. If we had other types of FeedItems in the DB, we would
//     // need to check the type and have logic for each type.
//     feedItem.contents.author = readDocument('users', feedItem.contents.author);
//     // Resolve comment author.
//     feedItem.comments.forEach((comment) => {
//         comment.author = readDocument('users', comment.author);
//     });
//     return feedItem;
// }

/**
 * Get the feed data for a particular user.
 * @param user The ObjectID of the user document.
 */
function getFeedData(user, callback) {
  db.collection('users').findOne({
    _id: user
  }, function(err, userData) {
    if (err) {
      return callback(err);
    } else if (userData === null) {
      // User not found.
      return callback(null, null);
    }

    db.collection('feeds').findOne({
      _id: userData.feed
    }, function(err, feedData) {
      if (err) {
        return callback(err);
      } else if (feedData === null) {
        // Feed not found.
        return callback(null, null);
      }
      var resolvedContents = [];
      function processNextFeedItem(i) {
        // Asynchronously resolve a feed item.
        getFeedItem(feedData.contents[i], function(err, feedItem) {
          if (err) {
            // Pass an error to the callback.
            callback(err);
          } else {
            // Success!
            resolvedContents.push(feedItem);
            if (resolvedContents.length === feedData.contents.length) {
              // I am the final feed item; all others are resolved.
              // Pass the resolved feed document back to the callback.
              feedData.contents = resolvedContents;
              callback(null, feedData);
            } else {
              // Process the next feed item.
              processNextFeedItem(i + 1);
            }
          }
        });
      }

      // Special case: Feed is empty.
      if (feedData.contents.length === 0) {
        callback(null, feedData);
      } else {
        processNextFeedItem(0);
      }
    });
  });
}

/**
 * Resolves a list of user objects. Returns an object that maps user IDs to
 * user objects.
 */
function resolveUserObjects(userList, callback) {
  // Special case: userList is empty.
  // It would be invalid to query the database with a logical OR
  // query with an empty array.
  if (userList.length === 0) {
    callback(null, {});
  } else {
    // Build up a MongoDB "OR" query to resolve all of the user objects
    // in the userList.
    var query = {
      $or: userList.map((id) => { return {_id: id } })
    };
    // Resolve 'like' counter
    db.collection('users').find(query).toArray(function(err, users) {
      if (err) {
        return callback(err);
      }
      // Build a map from ID to user object.
      // (so userMap["4"] will give the user with ID 4)
      var userMap = {};
      users.forEach((user) => {
        userMap[user._id] = user;
      });
      callback(null, userMap);
    });
  }
}

/**
 * Resolves a feed item. Internal to the server, since it's synchronous.
 */
// function getFeedItem(recipeItemId) {
//     var recipeItem = readDocument('recipes', recipeItemId);
//     // feedItem.comments.forEach((comment) => {
//     //     comment.author = readDocument('users', comment.author);
//     // });
//     return recipeItem;
// }

/**
 * Resolves a feed item. Internal to the server, since it's synchronous.
 * @param feedItemId The feed item's ID. Must be an ObjectID.
 * @param callback Called when the operation finishes. First argument is an error object,
 *   which is null if the operation succeeds, and the second argument is the
 *   resolved feed item.
 */
function getFeedItem(recipeItemId, callback) {
  // Get the feed item with the given ID.
  db.collection('recipes').findOne({
    _id: recipeItemId
  }, function(err, feedItem) {
    if (err) {
      // An error occurred.
      return callback(err);
    } else if (feedItem === null) {
      // Feed item not found!
      return callback(null, null);
    }

    // Build a list of all of the user objects we need to resolve.
    // Start off with the author of the feedItem.
    var userList = [feedItem.recipe.author];
    // Add all of the authors of the comments.
    feedItem.comments.forEach((comment) => userList.push(comment.author));
    // Resolve all of the user objects!
    resolveUserObjects(userList, function(err, userMap) {
      if (err) {
        return callback(err);
      }
      // Use the userMap to look up the author's user object
      feedItem.contents.author = userMap[feedItem.contents.author];
      // Look up each comment's author's user object.
      feedItem.comments.forEach((comment) => {
        comment.author = userMap[comment.author];
      });
      // Return the resolved feedItem!
      callback(null, feedItem);
    });
  });
}

// //new Buffer(JSON.stringify({ id: 1 })).toString('base64');
// app.get('/user/:userid/feed', function(req, res) {
//   var userid = req.params.userid;
//   var fromUser = getUserIdFromToken(req.get('Authorization'));
//   if (fromUser === userid) {
//         // Send response.
//         res.send(getFeedData(userid));
//     } else {
//         // 401: Unauthorized request.
//         res.status(401).end();
//     }
// });

/**
 * Get the feed data for a particular user.
 */
app.get('/user/:userid/feed', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === userid) {
    // Convert userid into an ObjectID before passing it to database queries.
    getFeedData(new ObjectID(userid), function(err, feedData) {
      if (err) {
        // A database error happened.
        // Internal Error: 500.
        res.status(500).send("Database error: " + err);
      } else if (feedData === null) {
        // Couldn't find the feed in the database.
        res.status(400).send("Could not look up feed for user " + userid);
      } else {
        // Send data.
        res.send(feedData);
      }
    });
  } else {
    // 403: Unauthorized request.
    res.status(403).end();
  }
});

// Post a comment
app.post('/feeditem/:feeditemid/comments', validate({ body: commentSchema }), function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var comment = req.body;
  var author = req.body.author;
  var feedItemId = new ObjectID(req.params.feeditemid);
  if (fromUser === author) {
    // Only update the feed item if the author matches the currently authenticated
    // user.
    db.collection('feedItems').updateOne({
      _id: feedItemId
    }, { $push: { comments: comment} }, function(err, result) {
      if (err) {
        return sendDatabaseError(res, err);
      } else if (result.modifiedCount === 0) {
        // Could not find the specified feed item. Perhaps it does not exist, or
        // is not authored by the user.
        // 400: Bad request.
        return res.status(400).end();
      }
      // Update succeeded! Return the resolved feed item.
      getFeedItem(feedItemId, function(err, feedItem) {
        if (err) {
          return sendDatabaseError(res, err);
        }
        res.send(feedItem);
      });
    });
  } else {
    // Unauthorized.
    res.status(401).end();
  }
});


// // Search for recipe item
// app.post('/results', function(req, res) {
//   if (typeof(req.body) === 'string') {
//     var queryText = req.body.trim().toLowerCase();
//     var recipeCollection = getCollection("recipes");
//
//     var results = []; //parse through recipes to find matches
//     var i = 1;
//     while(recipeCollection[i] != undefined) {
//       if(recipeCollection[i].name.toLowerCase().indexOf(queryText) !== -1) { //if name contains the queryText
//         results.push(i);
//       }
//       i++;
//     }
//     res.send(results);
//   } else {
//     res.status(400).end();
//   }
// });

//`POST /search queryText`
app.post('/results', function(req, res) {
// var fromUser = new ObjectID(getUserId?FromToken(req.get('Authorization')));
if (req.body !== '') {
  // trim() removes whitespace before and after the query.
  // toLowerCase() makes the query lowercase.
  var meal = req.body.meal;
  var ing = req.body.ingredient;
  var allergies = req.body.allergies;
  var diet = req.body.dietary;
// console.log(req.body);
  // var queryText = req.body.trim().toLowerCase();
  // console.log(queryText);
  // Get the recipes.
  var resultRecipes = new Array();
  var cursor = db.collection('recipes').find( );
   cursor.each(function(err, doc) {
      // assert.equal(err, null);
      if (doc != null) {
        //  console.dir(doc);
        //  console.log(doc);
         var ingredients = doc.ingredients;
         for(var i=0; i< ing.length; i++){
           for (var j =0; j<ingredients.length; j++){
             if (ing[i] !== null){
               if (ing[i] === ingredients[j] && doc.meal === meal){
                  if (resultRecipes.indexOf(doc.name) > -1){
                     break;
                  }
                  else{
                    resultRecipes.push(doc._id);
                    console.log(resultRecipes);
                 }
                  //  console.log(resultRecipes);
                 }
               }
             }
           }
      }else{
        res.send(resultRecipes);
      }
   });
  //  console.log(resultRecipes);


  //       // Resolve all of the feed items.
  //       var resolvedItems = [];
  //       var errored = false;
  //       function onResolve(err, feedItem) {
  //         if (errored) {
  //           return;
  //         } else if (err) {
  //           errored = true;
  //           sendDatabaseError(res, err);
  //         } else {
  //           resolvedItems.push(feedItem);
  //           if (resolvedItems.length === items.length) {
  //             // Send resolved items to the client!
  //             res.send(resolvedItems);
  //           }
  //         }
  //       }
  //
        // Resolve all of the matched feed items in parallel.
        // for (var i = 0; i < items.length; i++) {
        //   // Would be more efficient if we had a separate helper that
        //   // resolved feed items from their objects and not their IDs.
        //   // Not a big deal in our small applications, though.
        //   getFeedItem(items[i]._id, onResolve);
        // }
  //
  //       // Special case: No results.
  //       if (items.length === 0) {
  //         res.send([]);
  //       }
  //     });
  //   });
  // }
// );
} else {
  // 400: Bad Request.
  res.status(400).end();
}
});

// Go to Recipe Page
app.get('/recipePage/:recipeid', function(req, res) {
  var recipeid = new ObjectID(req.params.recipeid);
  db.collection('recipes').findOne({ _id: recipeid}, function (err, recipeData) {
    if (err) {
      return sendDatabaseError(res, err);
    }

    res.send(recipeData);
  });
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

//getUserData
/*app.get('/settings/users/:userid', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // userid is a string. We need it to be a number.
  // Parameters are always strings.
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
  var userData = readDocument('users', userid);
  }
  res.send(userData);
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
  var newName = req.body.name;
  var newBio = req.body.bio;
  console.log(newName);
  console.log(newBio);
  userData.fullName = newName;
  console.log(userData.fullName);
  userData.bio = newBio;
  writeDocument('users', userData);
  console.log(userData.fullName);
      // Send response.
  res.send(userData);
} else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});


//updatePassword
app.put('/settings/users/:userid', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // userid is a string. We need it to be a number.
  // Parameters are always strings.
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
  var userData = readDocument('users', userid);
  var newPassword = req.body.password;
  console.log(newPassword);
  userData.password = newPassword
  writeDocument('users', userData);
  console.log(userData.password);
      // Send response.
  res.send(userData);
} else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});*/

//getUserData
app.get('/settings/users/:userid', function(req, res) {
  var userid = req.params.userid;
  var user = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === userid) {
  db.collection('users').findOne({
  _id: userid
  }, function(err){
    if(err){
      return sendDatabaseError(res, err);
    } else if  (user === null) {
      return sendDatabaseError(res, err);
    }
      res.send(user);
    });
}else{
// Unauthorized.
res.status(401).end();
}
});


//updateSettings
app.put('/settings/users/:userid', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === userid) {
  db.collection('users').updateOne({_id: userid},
  {
    $push: {
      newName:req.body.name,
      newBio:req.body.bio
  },
  function(err){
    if(err){
      return sendDatabaseError(res, err);
    }
    getUserData(userid, function(err, user){
      if(err){
        return sendDatabaseError(res, err);
      }
      res.send(user);
    });
    }
  }
);
}else{
// Unauthorized.
res.status(401).end();
}
});


//updatePassword
app.put('/settings/users/:userid', function(req, res) {
var userid = req.params.userid;
var fromUser = getUserIdFromToken(req.get('Authorization'));
if (fromUser === userid) {
db.collection('users').updateOne({_id: userid},
{
  $push: {
    newPassword:req.body.password
},
function(err){
  if(err){
    return sendDatabaseError(res, err);
  }
  getUserData(userid, function(err, user){
    if(err){
      return sendDatabaseError(res, err);
    }
    res.send(user);
  });
  }
}
);
}else{
// Unauthorized.
res.status(401).end();
}
});

/**
* Helper function: Sends back HTTP response with error code 500 due to
* a database error.
*/
function sendDatabaseError(res, err) {
  res.status(500).send("A database error occurred: " + err);
}



// Reset the database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  ResetDatabase(db, function() {
    res.send();
  });
});

// Starts the server on port 3000!
app.listen(3000, function() {
    console.log('Lemato app listening on port 3000!');
});
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var readDocument = database.readDocument;
var getCollection = database.getCollection;

});
