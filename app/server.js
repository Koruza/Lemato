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
      "ingredient1": emi,
      "ingeredient2": poop,
      "ingredient3": kawo,
      "alergies": "nuts, ..",
      "dieraryRestrcition": "..."
    }
  */
  //  document.getElementByID("formy").submit();
  console.log(searchObject); 
}
