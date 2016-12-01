import {readDocument, writeDocument, addDocument} from './database.js';
// new Buffer(JSON.stringify({ id: 1 })).toString('base64');
var token = 'eyJpZCI6MX0=';
/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

export function postNewRecipe(name, ingredients, instructions, description, allergies,
  meal, cb) {
    var time = new Date().getTime();
    var newRecipe = {
        "name": name,
        "postDate": time,
        "chefPoints": [],
        "ingredients": ingredients,
        "pic": "None", // TODO
        "instructions": instructions,
        "description": description,
        "allergies": allergies,
        "meal": meal,
        "dietary": [] // TODO
    }

    newRecipe = addDocument('recipes', newRecipe);
    emulateServerReturn(newRecipe, cb);
    console.log(newRecipe);
    // cb(newRecipe);
}

/**
 * Properly configure+send an XMLHttpRequest with error handling,
 * authorization token, and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(verb, resource);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    // The below comment tells ESLint that FacebookError is a global.
    // Otherwise, ESLint would complain about it! (See what happens in Atom if
    // you remove the comment...)
    /* global FacebookError */
    // Response received from server. It could be a failure, though!
    xhr.addEventListener('load', function() {
        var statusCode = xhr.status;
        var statusText = xhr.statusText;
        if (statusCode >= 200 && statusCode < 300) {
            // Success: Status code is in the [200, 300) range.
            // Call the callback with the final XHR object.
            cb(xhr);
        } else {
            // Client or server error.
            // The server may have included some response text with details concerning
            // the error.
            var responseText = xhr.responseText;
            FacebookError('Could not ' + verb + " " + resource + ": Received " +
                statusCode + " " + statusText + ": " + responseText);
        }
    });
    // Time out the request if it takes longer than 10,000
    // milliseconds (10 seconds)
    xhr.timeout = 10000;
    // Network failure: Could not connect to server.
    xhr.addEventListener('error', function() {
        FacebookError('Could not ' + verb + " " + resource +
            ": Could not connect to the server.");
    });
    // Network failure: request took too long to complete.
    xhr.addEventListener('timeout', function() {
        FacebookError('Could not ' + verb + " " + resource +
            ": Request timed out.");
    });
    switch (typeof(body)) {
        case 'undefined':
            // No body to send.
            xhr.send();
            break;
        case 'string':
            // Tell the server we are sending text.
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            xhr.send(body);
            break;
        case 'object':
            // Tell the server we are sending JSON.
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            // Convert body into a JSON string.
            xhr.send(JSON.stringify(body));
            break;
        default:
            throw new Error('Unknown body type: ' + typeof(body));
    }
}

function getFeedItemSync(feedItemId) {
    var feedItem = readDocument('feedItems', feedItemId);
    feedItem._id = feedItemId
    feedItem.contents.author = readDocument('users', feedItem.contents.author);
    feedItem.comments.forEach((comment) => {comment.author = readDocument('users', comment.author)});
    feedItem.recipe = readDocument('recipes', feedItem.contents._id)
    return feedItem;
}

export function getFeedData(user, cb) {
    var userData = readDocument('users', user);
    var feedData = readDocument('feeds', userData.feed);
    emulateServerReturn(feedData, cb);
    feedData.contents = feedData.contents.map(getFeedItemSync);
    emulateServerReturn(feedData, cb);
}

export function postComment(feedItemId, author, contents, cb) {
  var feedItem = readDocument('feedItems', feedItemId);
  feedItem.comments.push({
  "author": author,
  "contents": contents,
  "postDate": new Date().getTime(),
  "likeCounter": []
  });
  writeDocument('feedItems', feedItem);
  emulateServerReturn(getFeedItemSync(feedItemId), cb);
}

export function likeFeedItem(feedItemId, userId, cb) {
  var feedItem = readDocument('feedItems', feedItemId);
  feedItem.likeCounter.push(userId);
  writeDocument('feedItems', feedItem);
  emulateServerReturn(feedItem.likeCounter.map((userId) =>
  readDocument('users', userId)), cb);
}

export function unlikeFeedItem(feedItemId, userId, cb) {
  var feedItem = readDocument('feedItems', feedItemId);
  var userIndex = feedItem.likeCounter.indexOf(userId);
  if (userIndex !== -1) {
  feedItem.likeCounter.splice(userIndex, 1);
  writeDocument('feedItems', feedItem);
  }
  emulateServerReturn(feedItem.likeCounter.map((userId) =>
  readDocument('users', userId)), cb);
}

export function likeRecipe(recipeId, userId, cb) {
  var recipeItem = readDocument('recipes', recipeId);
  recipeItem.chefPoints.push(userId);
  writeDocument('recipes', recipeItem);
  emulateServerReturn(recipeItem.chefPoints.map((userId) => readDocument('recipes', recipeId)), cb);
}

export function dislikeRecipe(recipeId, userId, cb) {
  var recipeItem = readDocument('recipes', recipeId);
  var recipeIndex = recipeItem.chefPoints.indexOf(userId);
  if(recipeIndex !== -1) {
    recipeItem.chefPoints.splice(recipeIndex, 1);
    writeDocument('recipes', recipeItem);
  }
  emulateServerReturn(recipeItem.chefPoints.map((userId) => readDocument('recipes', recipeId)), cb);
}

export function getRecipePageSync(recipeID) {
	var recipe = readDocument('recipes', recipeID);
	return recipe;
}

export function getRecipePageData(user, cb) {
  // TODO Anh or whoever in charge of Recipe page, update this code from workshop
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  // Get the Feed object for the user.
  var feedData = readDocument('feeds', userData.feed);
  // Map the Feed's FeedItem references to actual FeedItem objects.
  // Note: While map takes a callback function as an argument, it is
  // synchronous, not asynchronous. It calls the callback immediately.
  feedData.contents = feedData.contents.map(getFeedItemSync);
  // Return FeedData with resolved references.
  // emulateServerReturn will emulate an asynchronous server operation, which
  // invokes (calls) the "cb" function some time in the future.
  emulateServerReturn(feedData, cb);
}

/**
  * Emulates a REST call to get the cookbook data for a particular user.
  * @param user The ID of the user whose cookbook we are requesting.
  * @param cb A Function object, which we will invoke when the Cookbook's data is available.
  */
export function getCookbookData(user, cb) {
	var userData = readDocument('users', user);
	userData.cookbook = userData.cookbook.map(getRecipePageSync);
	emulateServerReturn(userData, cb);
}

/*export function updateSettings(user, newName, newBio, cb) {
	var userData = readDocument('users', user);
	userData.fullName = newName;
  userData.bio = newBio;
  writeDocument('users', userData);
	emulateServerReturn(userData, cb);
}


export function updatePassword(user, newPassword, cb) {
	var userData = readDocument('users', user);
	userData.password = newPassword;
	emulateServerReturn(userData, cb);
}*/

export function updateSettings(user, newName, newBio, cb) {
  sendXHR('PUT', '/settings' + '/users/' + user, undefined, (xhr) => {
      // Call the callback with the data.
      cb(JSON.parse(xhr.responseText));
    });
}


export function updatePassword(user, newPassword, cb) {
  sendXHR('PUT', '/settings' + '/users/' + user, undefined, (xhr) => {
      // Call the callback with the data.
      cb(JSON.parse(xhr.responseText));
    });
}


/**
* Searches for feed items with the given text.
*/
export function searchForFeedItems(userID, queryText, cb) {
  // userID is not needed; it's included in the JSON web token.
  sendXHR('POST', '/search', queryText, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
