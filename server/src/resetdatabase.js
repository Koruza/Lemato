var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = "Lemato";
// Put the initial mock objects here.
var initialData = {
  "users": {
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "fullName": "Someone",
      "bio": "brownie enthusiast",
      "username":"BrownieKing",
      "password":"chocolate",
      "cookbook":[new ObjectID("000000000000000000000001")],
      "feed": new ObjectID("000000000000000000000001")
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "fullName": "Someone Else",
      "bio": "brownie hater",
      "username":"BrownieMaster",
      "password":"fudge",
      "cookbook":[new ObjectID("000000000000000000000002")],
      "feed": new ObjectID("000000000000000000000002")
    }
  },
  "recipes":{
    "1":{
      "_id": new ObjectID("000000000000000000000001"),
      "author": new ObjectID("000000000000000000000002"),
      "name": "Brownie",
      "postDate": 1453668480000,
      "chefPoints": [new ObjectID("000000000000000000000001")],
      "ingredients": ["flour", "egg", "cocoa powder", "sugar","butter"],
      "pic":"../../img/brownie-egg.jpg",
      "instructions":[
        "1. Combine the butter and sugar",
        "2. Mix the flour and cocoa powder together in a seperate bowl",
        "3. Whisk the egg into the flour and cocoa powder mixture",
        "4. Add the butter and sugar to the mix",
        "5. Pour it into a 9x9 tray"
      ],
      "description": "Homestyle brownies",
      "allergies": ["dairy"],
      "meal": "dessert",
      "dietary": ["vegetarian"],
      "comments": [
        {
          "author": new ObjectID("000000000000000000000001"),
          "contents": "Omg have you tried the brownies I posted?!",
          "postDate": 1453690800000
        },
        {
          "author": new ObjectID("000000000000000000000002"),
          "contents": "Yes, I did. The idea of it blew my tastebuds away!!!",
          "postDate": 1453790800000
        }
      ]
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "author": new ObjectID("000000000000000000000001"),
      "name": "Brownie in an egg",
      "chefPoints": [new ObjectID("000000000000000000000002")],
      "ingredients": ["flour", "egg", "cocoa powder", "sugar","baking powder"],
      "pic":"None",
      "instructions": [
        "1. Mix dry ingredients together",
        "2. Mix wet ingredients together",
        "3. Combine the dry ingredients into the wet ones",
        "4. Pour the mixture into the empty eggshells"
      ],
      "description":"Brownies makes inside an egg shell!",
      "allergies": ["dairy"],
      "meal": "dessert",
      "dietary":["vegetarian"],
      "comments": [
        {
          "author": new ObjectID("000000000000000000000002"),
          "contents": "Omg have you tried the brownie in an egg?!",
          "postDate": 1453690800000
        },
        {
          "author": new ObjectID("000000000000000000000001"),
          "contents": "Yes, I did. The idea of it blew my mind!!!",
          "postDate": 1453790800000
        }
      ]
    }
  },
  "feeds": {
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "contents": [new ObjectID("000000000000000000000001")]
    }
  }
};

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
