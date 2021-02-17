const fetch = require('node-fetch');

// Function that returns id and name of the shows you want
// @param names is array with name of the show to search on
// Returns arrays with id's and name
exports.getShowInformation = (names) => {
    return fetch('https://replatore.com', {
        method: 'POST',
        headers: {
            authentication: process.env.API_KEY_CHANNELS,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({query: getQueryChannels(names)}),
    })
        .then((response) => response.json())
        .then((data) => {
            return data.data.channels;
        })
        .catch((error) => console.log(error));
};

// This functions retuns the filter used for graphql
// Based on the amount it changes the query
// @param names is array with id
// Returns filter for graqhql query
function getQueryChannels(names, filternames = '') {
    // Build query for different show names to get mutiple id's
    names.forEach((name) => {
        filternames = filternames + `{title: "${name}"},`;
    });

    return `{channels(filter: {OR: [${filternames}]}){epgId, title}}`;
}
