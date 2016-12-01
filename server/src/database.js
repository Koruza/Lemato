// Your startup's initial mock objects go here
var initialData = {
  "users": {
        "1": {
            "_id": 1,
            "fullName": "Someone",
            "bio": "brownie enthusiast",
            "username":"BrownieKing",
            "password":"chocolate",
            "cookbook":[1],
            "feed": 1
        },
        "2": {
            "_id": 2,
            "fullName": "Someone Else",
            "bio": "brownie hater",
            "username":"BrownieMaster",
            "password":"fudge",
            "cookbook":[2],
            "feed": 2
        }
    },
    "recipes":{
        "1":{
          "_id": 1,
          "name": "Brownie",
          "postDate": 1453668480000,
          "chefPoints": [1],
          "ingredients":[
            "Flour", "Egg", "Cocoa Powder", "Sugar","Butter"
           ],
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
           "dietary":["vegetarian"]
        },
        "2":{
          "_id": 2,
          "name": "Brownie in an egg",
          "chefPoints": [2],
          "ingredients":[
            "Flour", "Egg", "Cocoa Powder", "Sugar","Baking Powder"],
           "pic":"None",
           "instructions":[
             "1. Mix dry ingredients together",
             "2. Mix wet ingredients together",
             "3. Combine the dry ingredients into the wet ones",
             "4. Pour the mixture into the empty eggshells"
           ],
           "description":"Brownies makes inside an egg shell!",
           "allergies": ["dairy"],
           "meal": "dessert",
           "dietary":["vegetarian"]
          }
      },
      "feedItems":{
        "1": {
          "_id": 1,
          "contents": {
                  "_id":1,
                  "author": 1,
                  "postDate": 1453668480000,
                  "contents": "Browniesss."
              },
          "comments":
            [
              {
                "author": 2,
                "contents": "Omg have you tried the brownie in an egg?!",
                "postDate": 1453690800000
              },
              {
                "author": 1,
                "contents": "Yes, I did. The idea of it blew my mind!!!",
                "postDate": 1453790800000
              }
            ]
          },

        "2": {
          "_id": 2,
          "contents": {
                  "_id":2,
                  "author": 2,
                  "postDate": 1453668780000,
                  "contents": "Browniesss in eggshellsssssssss."
              },
          "comments":
            [
              {
                "author": 1,
                "contents": "Omg have you tried the brownies I posted?!",
                "postDate": 1453690800000
              },
              {
                "author": 2,
                "contents": "Yes, I did. The idea of it blew my tastebuds away!!!",
                "postDate": 1453790800000
              }
            ]
        }
      },
      "feeds": {
        "1": {
          "_id": 1,
          "contents": [1]
        }
      }
};


var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
