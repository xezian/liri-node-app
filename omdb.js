// requirements
const request = require("request");
const keys = require("./keys.js");
const global = require("./global.js");
// object in which to export function
const omdby = {
    getMovieInfo: (name) => {
        let queryURL = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=" + keys.omdbKey;
        // request
        request(queryURL, function(error, response, body) {
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
    }
};
module.exports = {
    omdby: omdby,
}