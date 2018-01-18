// node args array
const nodeArgs = process.argv;
// module requirements
const fs = require("fs");
const inquirer = require("inquirer");
const moment = require("moment");
const global = require("./global.js");
const spot = require("./spotify.js");
const twit = require("./twitter.js");
const omdb = require("./omdb.js");
// listener I can pass to the do-what-it-says command to have it do stuff with the new arguments. 
const listen = () => {
    if (nodeArgs) {
        let now = moment();
        let nowFormatted = now.format(`YYYY-MM-DD HH:mm:ss`);
        global.logWrapper(`\\/\\/\\/\\/\\/^v^v^v^v^v^v^v^v^v^~^~^~^~^~^~^-^-^-^-~~~~~~~-^-^-^-^-^~^~^~^~^~^~^v^v^v^v^v^v^v\\/\\/\\/\\/\\`);
        global.logWrapper(`Liri: "Happy to help!"`);
        global.logWrapper("Request: " + nodeArgs[2]);
        global.logWrapper("When: " + nowFormatted);
    };
    switch (nodeArgs[2]) {
    // listener for the "do-what-it-says" node argument
    case "do-what-it-says":
        doWhatItSays();
        break;
    // listener for "my-tweets" node argument
    case "my-tweets":
        twit.twitty.getTenTweets();
        break;
    // listener for "get-tweets" node argument
    case "get-tweets":
        getTweets();
        break;
    // listener for "spotify-this-song" node argument
    case "spotify-this-song":
        spotifyThisSong();
        break;
    // listener for the "movie-this" node argument
    case "movie-this":
        movieThis();
        break;
    case "read-my-log":
        readMyLog();
        break;
    default:
        global.logWrapper(`Liri: "Sorry, ${nodeArgs[2]} is a request I do not recognize"`)
    };    
};
// functions to process node arguments
// do-what-it-says
const doWhatItSays = () => {
    let fileToRead;
    if (nodeArgs[3]) {
        fileToRead = nodeArgs[3];
    } else {
        fileToRead = "random.txt";
    };
    fs.readFile(fileToRead, "utf8", function(error, data) {
        if (error) {
            return global.logWrapper(error);
        }
        let dataArr = data.split(",");
        for (let i = 0; i < dataArr.length; i = i + 2) {
            process.argv.splice(2, process.argv.length, dataArr[i], dataArr[i + 1]);
            listen();
        }
    });
};
// get-tweets
const getTweets = () => {
    let twitName;
    if (nodeArgs[3]) {
        twitName = nodeArgs[3];
        twit.twitty.getTenTweets(twitName);
    } else {
        inquirer.prompt([
            {
                name: "twitter_handle",
                message: `Liri: "Ok, for what Twitter handle?"`,
            }
        ]).then(function(answer){
            twitName = answer.twitter_handle;
            global.logWrapper(twitName)
            twit.twitty.getTenTweets(twitName);
        });
    };
};
// spotify-this-song
const spotifyThisSong = () => {
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
                message: `Liri: "Ok, for which song?"`
            }
        ]).then(function(answer){
            if (answer.song_name.trim() === "") {
                songName = "The Sign, Ace of Base";
            } else {
                songName = answer.song_name;
            }
            spot.spotty.getSongInfo(songName);
        })
    };
};
// movie-this
const movieThis = () => {
    if (nodeArgs[3]) {
        movieName = nodeArgs[3];
        if (nodeArgs[4]) {
            for (let i = 4; i < nodeArgs.length; i++) {
                movieName = movieName + "+" + nodeArgs[i];
            };
        };
        omdb.omdby.getMovieInfo(movieName);
    } else {
        inquirer.prompt([
            {
                name: "movie_name",
                message: `Liri: "Ok, for which movie?"`
            }
        ]).then(function(answer){
            if (answer.movie_name.trim() === "") {
                movieName = "Mr.+Nobody";
            } else {
                movieName = answer.movie_name;
            }
            omdb.omdby.getMovieInfo(movieName);
        })
    }
};
// read-my-log
const readMyLog = () => {
    fs.readFile('log.txt', 'utf8', function(error, data){
        console.log(data);
        global.logWrapper(`Log has been READ`);
    });
};
// let's call something shall we?
listen();