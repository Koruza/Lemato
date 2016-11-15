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

export function pullData(searchObject){
  /*
    searchObject will look like this:
    {
      "ingredient1": ing1,
      "ingeredient2": ing2,
      "ingredient3": ing3,
      "alergies": "nuts, ..",
      "dieraryRestrcition": "..."
    }
  */
  //  document.getElementByID("formy").submit();
  console.log(searchObject);
  // emulateServerReturn(searchObject,cb);
}

export function postNewRecipe(user, location, contents, cb) {
    var time = new Date().getTime();
    var newStatusUpdate = {
        "likeCounter": [],
        "type": "statusUpdate",
        "contents": {
            "author": user,
            "postDate": time,
            "location": location,
            "contents": contents
        },
        // List of comments on the post
        "comments": []
    };
    newStatusUpdate = addDocument('feedItems', newStatusUpdate);
    var userData = readDocument('users', user);
    var feedData = readDocument('feeds', userData.feed);
    feedData.contents.unshift(newStatusUpdate._id);
    writeDocument('feeds', feedData);
    emulateServerReturn(newStatusUpdate, cb);
}

function getFeedItemSync(feedItemId) {
    var feedItem = readDocument('feedItems', feedItemId);
    feedItem.likeCounter =
        feedItem.likeCounter.map((id) => readDocument('users', id));
    feedItem.contents.author =
        readDocument('users', feedItem.contents.author);
    feedItem.comments.forEach((comment) => {
        comment.author = readDocument('users', comment.author);
    });
    return feedItem;
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

function getRecipePageSync(recipeID) {
	var recipe = readDocument('recipes', recipeID);
	return recipe;//placeholder
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
