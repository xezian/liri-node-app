const nodeArgs = process.argv;
const fs = require("fs");
const inquirer = require("inquirer");
const request = require("request");
const spot = require("./spotify.js");
const twit = require("./twitter.js");
// listener for the "my-tweets" node argument
if (nodeArgs[2] === "my-tweets") {
    twit.twitty.getTenTweets("ghostlyrando");
};
// listener for the "get-tweets" node argument, which prompts for a Twitter handle and gets that user's tweets
if (nodeArgs[2] == "get-tweets") {
    let twitName;
    inquirer.prompt([
        {
            name: "twitter_handle",
            message: "Ok, for what Twitter handle?",
        }
    ]).then(function(answer){
        twitName = answer.twitter_handle;
        twit.twitty.getTenTweets(twitName);
    });
};
//listener for "spotify-this-song" node argument
if (nodeArgs[2] == "spotify-this-song") {
    let songName;
    if (nodeArgs[3]) {
        songName = nodeArgs[3];
        for (let i = 4; i < nodeArgs.length; i++) {
            songName = songName + " " + nodeArgs[i];
        };
        spot.spotty.getSongInfo(songName);
    } else {
        inquirer.prompt([
            {
                name: "song_name",
                message: "Ok, for which song?"
            }
        ]).then(function(answer){
            if (answer.song_name.trim() === "") {
                songName = "The Sign, Ace of Base";
            } else {
                songName = answer.song_name;
            }
            spot.spotty.getSongInfo(songName);
        })
    }
}