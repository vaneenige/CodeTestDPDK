const fetch = require('node-fetch');

// Get array with schedule from show based on id information back
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
            query: `{schedules(filter:{o: "${programId}", _operators :{s : {lt : 161021791300000}}} ){
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
