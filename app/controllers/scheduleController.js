const fetch = require('node-fetch');

// Get array with schedules and program information from show based on id of channel
// @param id of the channel
// returns array with information about show on the channal
exports.getScheduleInformation = (channelId) => {
    return fetch('https://replatore.com', {
        method: 'POST',
        headers: {
            authentication: process.env.API_KEY_CHANNELS,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            query: `{schedules(filter:{o: "${channelId}", _operators :{s : {lt : 161021791300000}}} ){
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
