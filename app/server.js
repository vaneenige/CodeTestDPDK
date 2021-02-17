const fetch = require('node-fetch');
require('dotenv').config();

getIdshows(['NPO 1 HD', 'RTL 4 HD']);

// Function that returns id of the shows you want
// @param names is array with all the names
// Returns arrays with id's
function getIdshows(names) {
    getQueryChannels(names);
    fetch('https://replatore.com', {
        method: 'POST',
        headers: {
            authentication: process.env.API_KEY_CHANNELS,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({query: getQueryChannels(names)}),
    })
        .then((response) => response.json())
        .then((data) => console.log(data.data.))
        .catch((error) => console.log(error));
}

// Reason for this fucntions is so we can add more names if we want to the information
function getQueryChannels(names, filternames = '') {
    if (names.length == 1) {
        return `{channel(filter: {title : "${names[0]}"}){epgId}}`;
    } else {
        names.forEach((name) => {
            filternames = filternames + `{title: "${name}"},`;
        });

        return `{channels(filter: {OR: [${filternames}]}){epgId}}`;
    }
}
