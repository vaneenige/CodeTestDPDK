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
                console.log('==BEGIN==');
                console.log(
                    `${new Date(scheduleInfo.s).toLocaleString('nl-NL')} - ${new Date(scheduleInfo.e).toLocaleString(
                        'nl-NL',
                    )}\n${scheduleInfo.t}\n${scheduleInfo.p.description}`,
                );
                console.log('==EIND==');
            });
        });
    });
});
