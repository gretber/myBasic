/**
 * Application configuration
 */
const schedulerConfig = {
    resourceImagePath: 'users/',
            //     "startDate": "01/03/2021",
            // "endDate": "01/04/2021",
    minHeight: '20em',
    startDate: new Date(2021, 2, 0),
    endDate: new Date(2021, 3, 0),

    viewPreset: 'weekAndDayLetter',

    timeRangesFeature: {
        narrowThreshold: 10
    },

    columns: [
        {
            type: 'resourceInfo',
            text: 'Staff',
            showImage: true,
            width: 230
        },
        // {
        //     text: 'Type',
        //     field: 'role',
        //     width: 130
        // }
    ]
};

export { schedulerConfig };
