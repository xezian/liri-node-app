// requirements
const request = require("request");
const keys = require("./keys.js");
// object in which to export function
const omdby = {
    getMovieInfo: (name) => {
        let queryURL = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=" + keys.omdbKey;
        // request
        request(queryURL, function(error, response, body) {
            // If the request is successful
            if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            console.log("-------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Rated);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("-------------------");
            } 
        });
    }
}
module.exports = {
    omdby: omdby,
}