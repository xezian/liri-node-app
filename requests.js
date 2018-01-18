// requirements
const request = require("request");
const weather = require("weather-js");
const keys = require("./keys.js");
const global = require("./global.js");
// object in which to export omdb function
const getMovieInfo = (name) => {
    let queryURL = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=" + keys.omdbKey;
    // request
    request(queryURL, function(error, response, body) {
        if (error) {
            console.log(error);
            return
        };
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // tomatoRating will be set either to N/A or the Rotten Tomatoes percentage if the object containing it exists
            let tomatoRating;
            // check first if the Response property of the object is marked "False", which happens for queries that aren't found in omdb
            if (JSON.parse(body).Response === "False") {
                global.logWrapper("No such movie was found!")
                return;
            }
            // check if "Ratings" in the JSON response is an empty object which happens for some movies with fewer data in omdb
            if (global.isEmptyObject(JSON.parse(body).Ratings) || JSON.parse(body).Ratings[1] === undefined) {
                tomatoRating = "N/A"
            } else {
                tomatoRating = JSON.parse(body).Ratings[1].Value;
            }
            // Parse the body of the site and recover each other value
            global.logWrapper("-------------------");
            global.logWrapper("Title: " + JSON.parse(body).Title);
            global.logWrapper("Release Year: " + JSON.parse(body).Year);
            global.logWrapper("IMDB Rating: " + JSON.parse(body).Rated);
            global.logWrapper("Rotten Tomatoes Rating: " + tomatoRating);
            global.logWrapper("Country: " + JSON.parse(body).Country);
            global.logWrapper("Language: " + JSON.parse(body).Language);
            global.logWrapper("Plot: " + JSON.parse(body).Plot);
            global.logWrapper("Actors: " + JSON.parse(body).Actors);
            global.logWrapper("-------------------");
        } 
    });
};
// tell-me-a-joke
const tellMeAJoke = () => {
    let options = {
        url: 'https://icanhazdadjoke.com/',
        headers: {
          'Accept': 'text/plain'
        }
    };
    // request
    request(options, function(error, response, body) {
        global.logWrapper(`Joke: ${body}`);
    });
};
const getWeatherData = (city) => {
    weather.find({search: city, degreeType: 'F'}, function(err, result) {
        if(err) console.log(err);
        let cityObj = result;
        if (typeof cityObj === "object") {
            if(global.isEmptyObject(cityObj)) {
                global.logWrapper(`----------------------`);
                global.logWrapper(`Liri: "No such city was found!"`);
                global.logWrapper(`----------------------`);
            };
        };
        for(let key in cityObj) {
            global.logWrapper(`----------------------`);
            global.logWrapper(`Where: ` + cityObj[key].location.name);
            global.logWrapper(`Temp: ` + cityObj[key].current.temperature);
            global.logWrapper(`Conditions: ` + cityObj[key].current.skytext);
            global.logWrapper(`Tomorrow: ` + cityObj[key].forecast[0].skytextday);
            global.logWrapper(`----------------------`);
        }
    });
};
module.exports = {
    getGameInfo: getGameInfo,
    getMovieInfo: getMovieInfo,
    tellMeAJoke: tellMeAJoke,
    getWeatherData: getWeatherData
}