import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "Lemato";

// Put your mock objects here, as in Workshop 4
var initialData = {
  "users": {
        "1": {
            "_id": 1,
            "fullName": "Someone",
            "feed": 1,
            "username":"BrownieKing",
            "password":"chocolate",
            "cookbook":"Brownie in an egg"
        },
        "2": {
            "_id": 2,
            "fullName": "Someone Else",
            "feed": 2,
            "username":"BrownieMaster",
            "password":"fudge",
            "cookbook":"Brownie"
        }
    },
    "recipes":{
        "1":{
          "name": "Brownie",
          "chefPoints": 12,
          "ingredients":[ 
            "Flour", "Egg", "Cocoa Powder", "Sugar","Butter"
           ],
           "pic":"None",
           "instructions":[
              "1. Combine the butter and sugar", 
              "2. Mix the flour and cocoa powder together in a seperate bowl", 
              "3. Whisk the egg into the flour and cocoa powder mixture", 
              "4. Add the butter and sugar to the mix", 
              "5. Pour it into a 9x9 tray"
           ],
           "description": "Homestyle brownies",
           "allergies": ["dairy","gluten"]
        },
        "2":{
          "name": "Brownie in an egg",
          "chefPoints": 30,
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
           "allergies": ["dairy", "gluten"]
          }
      },
      "feed":{
        "1": {
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
          
          }
        }
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
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
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
