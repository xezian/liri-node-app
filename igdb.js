const igdb = require('igdb-api-node').default;
const keys = require("./keys.js");
const global = require("./global.js");
const client = igdb(keys.igdbKey);
getGameInfo = (game) => {
    client.games({
        fields: ["name","summary"],
        search: game,
        limit: 5, // Limit to 5 results
        offset: 0, // Index offset for results  
    }).then(response => {
        global.logWrapper(`Name: ${response.body[0].name}`);
        global.logWrapper(`Summary: ${response.body[0].summary}`);
    }).catch(error => {
        console.log(`No such video game was found!`);
    });
};
module.exports = {
    getGameInfo: getGameInfo,
};