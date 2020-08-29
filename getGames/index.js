const axios = require('axios');
const apNBAKEY = process.env["APINBAKEY"];


module.exports = async function (context, req) {
    let today = new Date();

    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    const todaysGames = await axios({
        "method": "GET",
        "url": `https://api-nba-v1.p.rapidapi.com/games/date/${today}`,
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": apNBAKEY,
            "useQueryString": true
        }
    })

    let games = todaysGames.data.api.games;
    let actualPlay = games.filter((game) => game.startTimeUTC.length > 10)

    context.res = {
        status: 200,
        body: actualPlay
    }
};