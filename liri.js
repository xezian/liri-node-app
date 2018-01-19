"use strict";
// node args array
const nodeArgs = process.argv;
// node package requirements
const fs = require("fs");
const inquirer = require("inquirer");
const moment = require("moment");
const request = require("request");
// filepath module requirements
const global = require("./global.js");
const spot = require("./spotify.js");
const twit = require("./twitter.js");
const igdb = require("./igdb.js");
const requests = require("./requests.js");
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
    // switch for all the nodeArgs we can handle
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
    // listener for the "tell-me-a-joke" node argument
    case "tell-me-a-joke":
        requests.tellMeAJoke();
        break;
    // listener for the "weather-this-city" nodeargument
    case "weather-this-city":
        weatherThisCity();
        break;
    // listener for the "video-game-this" node argument
    case "video-game-this":
        videoGameThis();
        break;
    // listener for the "dictionary-this" node argument
    case "dictionary-this":
        dictionaryThis();
        break;
    // listener for the "thesaurus-this" node argument
    case "thesaurus-this":
        thesaurusThis();
        break;
    // listener for the "read-my-log" node argument
    case "read-my-log":
        readMyLog();
        break;
    default:
        global.logWrapper(`Liri: "Sorry, ${nodeArgs[2]} is a request I do not recognize"`)
    };    
};
// functions to process these darn here node arguments
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
        twit.getTenTweets(twitName);
    } else {
        inquirer.prompt([
            {
                name: "twitter_handle",
                message: `Liri: "Ok, for what Twitter handle?"`,
            }
        ]).then(function(answer){
            twitName = answer.twitter_handle;
            global.logWrapper(twitName)
            twit.getTenTweets(twitName);
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
        spot.getSongInfo(songName);
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
            spot.getSongInfo(songName);
        })
    };
};
// movie-this
const movieThis = () => {
    let movieName;
    if (nodeArgs[3]) {
        movieName = nodeArgs[3];
        if (nodeArgs[4]) {
            for (let i = 4; i < nodeArgs.length; i++) {
                movieName = movieName + "+" + nodeArgs[i];
            };
        };
        requests.getMovieInfo(movieName);
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
            requests.getMovieInfo(movieName);
        })
    }
};
// video-game-this
const videoGameThis = () => {
    let gameName;
    if (nodeArgs[3]) {
        gameName = nodeArgs[3];
        if (nodeArgs[4]) {
            for (let i = 4; i < nodeArgs.length; i++) {
                gameName = gameName + "+" + nodeArgs[i];
            };
        };
        igdb.getGameInfo(gameName);
    } else {
        inquirer.prompt([
            {
                name: "game_name",
                message: `Liri: "Ok, for which game?"`
            }
        ]).then(function(answer){
            if (answer.game_name.trim() === "") {
                gameName = "Commander+Keen";
            } else {
                gameName = answer.game_name;
            }
            igdb.getGameInfo(gameName);
        })
    }
};
// weather-this-city
const weatherThisCity = () => {
    let cityName;
    if (nodeArgs[3]) {
        cityName = nodeArgs[3];
        requests.getWeatherData(cityName);
    } else {
        inquirer.prompt([
            {
                name: "city_name",
                message: `Liri: "Ok, for which city?"`
            }
        ]).then(function(answer){
            if (answer.city_name.trim() === "") {
                cityName = "Tucson,AZ";
            } else {
                cityName = answer.city_name;
            }
            requests.getWeatherData(cityName);
        })
    };
};
// dictionary-this
const dictionaryThis = () => {
    let wordToFind;
    if (nodeArgs[3]) {
        wordToFind = nodeArgs[3];
        requests.merriamWeb.getDefinition(wordToFind);
    } else {
        inquirer.prompt([
            {
                name: "word_name",
                message: `Liri: "Ok, for which word?"`
            }
        ]).then(function(answer){
            if (answer.word_name.trim() === "") {
                wordToFind = "";
            } else {
                wordToFind = answer.word_name;
            }
            requests.merriamWeb.getDefinition(wordToFind);
        })
    }
};
// thesaurus-this
const thesaurusThis = () => {
    let wordToFind;
    if (nodeArgs[3]) {
        wordToFind = nodeArgs[3];
        requests.merriamWeb.getSynonyms(wordToFind);
    } else {
        inquirer.prompt([
            {
                name: "word_name",
                message: `Liri: "Ok, for which word?"`
            }
        ]).then(function(answer){
            if (answer.word_name.trim() === "") {
                wordToFind = "";
            } else {
                wordToFind = answer.word_name;
            }
            requests.merriamWeb.getSynonyms(wordToFind);
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
// let's call something, shall we?
listen();