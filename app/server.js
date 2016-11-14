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

export function update(feedItemId, userId, cb) {
  var user = readDocument('Users', user.fullName);
  user.fullName.push(userId);
  writeDocument('users', userId);
  // Return a resolved version of fullName
  emulateServerReturn(user.fullName.map((userId) =>
                        readDocument('users', userId)), cb);
}
