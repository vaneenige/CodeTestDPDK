const showController = require('./controllers/showController');
const scheduleController = require('./controllers/scheduleController');
require('dotenv').config();

//  TODO move functions to other files + code cleanup + finish discription

shows = ['NPO 1 HD', 'RTL 4 HD'];

showController.getShowInformation(shows).then((showObjects) => {
    // Loops through all the found spots
    showObjects.forEach((showObject) => {
        // Log Title
        scheduleController.getScheduleInformation(showObject.epgId).then((shedulesInformation) => {
            console.log(`======= ${showObject.title} =======`);
            // Loop through all the programs on schedule
            shedulesInformation.forEach((scheduleInfo) => {
                // Display information Here
                console.log('==BEGIN programma Informatie==');
                console.log(`${formatDate(scheduleInfo.s)} - ${formatDate(scheduleInfo.e)}\n${scheduleInfo.t} (${getDesriptionTags(scheduleInfo.p.categories)})\n${scheduleInfo.p.description}`);
                console.log('==EIND programma Informatie==');
            });
        });
    });
});

// return description tags
function getDesriptionTags(descriptionArray) {
    return descriptionArray.map((e) => {
        return e.title;
    });
}

// Reformats unix time
function formatDate(dateTime) {
    dateTime = new Date(dateTime);
    return `${dateTime.toLocaleString('nl-nl', {weekday: 'long'})} ${dateTime.getDate()} ${dateTime.toLocaleString('nl-nl', {month: 'long'})} ${dateTime.getFullYear()} ${dateTime.toLocaleTimeString('nl-nl', {hour12: false})}`;
}
