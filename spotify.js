// requirements
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
// spotify constructor with api keys plugged in from keys.js
const client = new Spotify({
    id: keys.spotifyKeys.spotId,
    secret: keys.spotifyKeys.secret
});
const spotty = {
    getSongInfo: (song) => {
        client
            .search({ type: 'track', query: song })
            .then(function(response) { 
                let artistName = response.tracks.items[0].artists[0].name;
                let songName = response.tracks.items[0].name;
                let previewLink = response.tracks.items[0].preview_url;
                let albumName = response.tracks.items[0].album.name;
                console.log("------------------");
                console.log("Song Name: " + songName);
                console.log("Artist: " + artistName);
                console.log("Preview Link: " + previewLink);
                console.log("Album: " + albumName);
                console.log("------------------")
            })
            .catch(function(err) {
            console.log(err);
        });
    }
}
module.exports = {
    spotty: spotty
}