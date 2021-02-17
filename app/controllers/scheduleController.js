const fetch = require('node-fetch');

// Get array with show information back
// @param id of the show
// returns array with information about show on the channal
exports.getScheduleInformation = (programId) => {
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
                    categories
                }}}`,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            return data.data.schedules;
        })
        .catch((error) => console.log(error));
};
