// requirements
const Twitter = require("twitter");
const keys = require("./keys.js");
const global = require("./global.js");
// twitter constructor with api keys plugged in from keys.js
let client = new Twitter(keys.twitterKeys);
// function to retrieve the tweets
getTenTweets = (name) => {
    // tweet_mode: "extended" gets the full length tweets (doesn't seem to work for retweets)
    let params = {screen_name: name, tweet_mode: "extended", count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            if (global.isEmptyObject(tweets)) {
                global.logWrapper(`Not a Tweet was found!`);
                return;
            }
            for (let key in tweets) {
                if (tweets[key].full_text) {
                    global.logWrapper(`--> ` + tweets[key].full_text + `\n`);
                }
            }
        } else {
            global.logWrapper(`No such Tweeter was found!`);
            console.log(error);
        }
    });
};
// export the function
module.exports = {
    getTenTweets: getTenTweets,
};