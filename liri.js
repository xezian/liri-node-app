const nodeArgs = process.argv;
const fs = require("fs");
const twitter = require("twitter");
const spotify = require("node-spotify-api");
const request = require("request");
const twitKeys = require("./keys.js");

let client = new twitter({
    consumer_key: twitKeys.consumer_key,
    consumer_secret: twitKeys.consumer_secret,
    access_token_key: twitKeys.access_token_key,
    access_token_secret: twitKeys.access_token_secret
});

const getTenTweets = (name) => {
    var params = {screen_name: name};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            let justTheTweets = [];
            for (let key in tweets) {
                if (tweets[key].text) {
                    if (justTheTweets.length < 10) {
                        justTheTweets.push(tweets[key].text);
                    } 
                }
            }
            console.log(justTheTweets, tweets);
        }
    });
};

if (nodeArgs[2] === "my-tweets") {
    console.log(nodeArgs[3]);
    let twitName;
    if (nodeArgs[3] === undefined) {
        twitName = "ghostlyrando";
    } else {
        twitName = nodeArgs[3];
    }
    getTenTweets(twitName);
}