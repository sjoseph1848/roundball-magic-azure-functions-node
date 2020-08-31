const axios = require('axios');
const newsKey = process.env["NEWSKEY"];

module.exports = async function (context, req) {
    const todaysNews = await axios({
        "method": "GET",
        "url": `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${newsKey}`,
    })

    context.res = {
        status: 200,
        body: todaysNews.data.articles
    }
};