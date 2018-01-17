// requirements
const Twitter = require("twitter");
const keys = require("./keys.js");
const global = require("./global.js");
// twitter constructor with api keys plugged in from keys.js
let client = new Twitter(keys.twitterKeys);
// function to retrieve the tweets
const twitty = {
    getTenTweets: (name) => {
        // tweet_mode: "extended" gets the full length tweets
        let params = {screen_name: name, tweet_mode: "extended"};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                // array in which to collect those tweets
                let justTheTweets = [];
                for (let key in tweets) {
                    if (tweets[key].full_text) {
                        if (justTheTweets.length < 20) {
                            justTheTweets.push(tweets[key].full_text);
                        } 
                    }
                }
                // this joins the tweets in a way that looks OK in the console
                global.logWrapper("OK!\n\n --> " + justTheTweets.join("\n\n --> ") + "\n");
            }
        });
    },
};
// export the function
module.exports = {
    twitty: twitty
};