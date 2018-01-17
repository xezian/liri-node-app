const fs = require('fs');
// global functions that can be imported if needed
module.exports.isEmptyObject = (obj) => {
    return !Object.keys(obj).length;
};
// logWrapper function in which to wrap all global.logWrapper messages. Found idea here: https://stackoverflow.com/questions/32025766/listen-for-message-written-to-console-node-js
module.exports.logWrapper = (message) => {
    console.log(message);
    let cleanerMessage = message + "\n";
    fs.appendFile("log.txt", cleanerMessage, function(err) {
        // If the code experiences any errors it will log the error to the console.
        if (err) {
          return console.log(err);
        }
    });
}