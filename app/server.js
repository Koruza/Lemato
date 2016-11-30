import {readDocument, writeDocument, addDocument} from './database.js';

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
    // var time = new Date().getTime();
    var newRecipe = {
        "name": name,
        // "postDate": time,
        "chefPoints": [],
        "ingredients": ingredients,
        "pic": "None", // TODO
        "instructions": instructions,
        "description": description,
        "allergies": allergies,
        "meal": meal
    };

    newRecipe = addDocument('recipes', newRecipe);
    emulateServerReturn(newRecipe, cb);
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

export function updateSettings(user, newName, newBio, cb) {
	var userData = readDocument('users', user);
	userData.fullName = newName;
  userData.bio = newBio;
  writeDocument('users', userData);
	emulateServerReturn(userData, cb);
}

// export function updateSettings(userID, newName, newBio) {
//   var user = readDocument('users', userID);
//   user.fullName = newName;
//   user.bio = newBio;
//   writeDocument('users', user);
// }

export function updatePassword(user, newPassword, cb) {
	var userData = readDocument('users', user);
	userData.password = newPassword;
	emulateServerReturn(userData, cb);
}
