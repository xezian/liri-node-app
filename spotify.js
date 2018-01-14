const Spotify = require("node-spotify-api");
const keys = require("./keys.js")
const client = new Spotify({
    id: keys.spotifyKeys.spotId,
    secret: keys.spotifyKeys.secret
});
const spotty = {
    getSongInfo: () => {
        client.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
        console.log(data); 
        });
    }
}
module.exports = {
    spotty: spotty
}