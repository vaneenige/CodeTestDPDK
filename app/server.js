const fetch = require('node-fetch');
require('dotenv').config();

displaySheduleShows(['NPO 1 HD', 'RTL 4 HD']);

// @param names to show information about array
// outputs information in console
function displaySheduleShows(names) {
    getIdshows(names).then((showObjects) => {
        // Loops through all the found spots
        showObjects.forEach((showObject) => {
            // Log Title
            getScheduleWithInformation(showObject.epgId).then((shedulesInformation) => {
                console.log(`======= ${showObject.title} =======`);
                // Loop through all the programs on schedule
                shedulesInformation.forEach((scheduleInfo) => {
                    // Display information Here
                    console.log(scheduleInfo);
                });
            });
        });
    });
}

function getScheduleWithInformation(programId) {
    return fetch('https://replatore.com', {
        method: 'POST',
        headers: {
            authentication: process.env.API_KEY_CHANNELS,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            query: `{schedules(filter:{o: "${programId}"}, limit:10){
                t 
                s 
                e 
                p{ 
                    title 
                    description 
                }}}`,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            return data.data.schedules;
        })
        .catch((error) => console.log(error));
}

// Function that returns id of the shows you want
// @param names is array with all the names
// Returns arrays with id's
function getIdshows(names) {
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
}

// Reason for this fucntions is so we can add more names if we want to the filter
function getQueryChannels(names, filternames = '') {
    if (names.length == 1) {
        return `{channel(filter: {title : "${names[0]}"}){epgId, title}}`;
    } else {
        // Build query for different show names to get mutiple id's
        names.forEach((name) => {
            filternames = filternames + `{title: "${name}"},`;
        });

        return `{channels(filter: {OR: [${filternames}]}){epgId, title}}`;
    }
}
