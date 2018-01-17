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
                    console.log("No such movie was found!")
                    return;
                }
                // check if "Ratings" in the JSON response is an empty object which happens for some movies with fewer data in omdb
                if (global.isEmptyObject(JSON.parse(body).Ratings) || JSON.parse(body).Ratings[1] === undefined) {
                    tomatoRating = "N/A"
                } else {
                    tomatoRating = JSON.parse(body).Ratings[1].Value;
                }
                // Parse the body of the site and recover each other value
                console.log("-------------------");
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).Rated);
                console.log("Rotten Tomatoes Rating: " + tomatoRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("-------------------");
            } 
        });
    }
};
module.exports = {
    omdby: omdby,
}