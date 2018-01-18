// requirements
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const global = require("./global.js");
// spotify constructor with api keys plugged in from keys.js
const client = new Spotify({
    id: keys.spotifyKeys.spotId,
    secret: keys.spotifyKeys.secret
});
getSongInfo = (song) => {
    client
        .search({ type: 'track', query: song })
        .then(function(response) { 
            if (global.isEmptyObject(response.tracks.items)) {
                global.logWrapper("------------------");
                global.logWrapper("No such song was found!");
                global.logWrapper("------------------");
                return;
            };
            let artistName = response.tracks.items[0].artists[0].name;
            let songName = response.tracks.items[0].name;
            let previewLink = response.tracks.items[0].preview_url;
            let albumName = response.tracks.items[0].album.name;
            global.logWrapper("------------------");
            global.logWrapper("Song Name: " + songName);
            global.logWrapper("Artist: " + artistName);
            global.logWrapper("Preview Link: " + previewLink);
            global.logWrapper("Album: " + albumName);
            global.logWrapper("------------------")
        })
        .catch(function(err) {
        global.logWrapper(err);
    });
};
module.exports = {
    getSongInfo: getSongInfo,
}