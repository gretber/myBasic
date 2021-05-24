
/**
 * Application configuration
 */

const schedulerConfig2: any = {

    // appendTo          : 'container',
    // flex              : '1 1 50%',
    // partner: "schedulerConfig",

    // timeRangesFeature: {
    //     narrowThreshold: 10
    // },
    assignments: {
        rows: [
            {
                Id         : "JJO",
                TaskId     : 11,
                ResourceId : 1,
                Units      : 100
            },
        ],
    },
    columns: [
        {
            type: 'resourceInfo',
            text: 'Fabrik',
            showEventCount: true,
            showImage: false,
            width: 230,
        },
    ],

    resources : [
        { id : 11, name : 'Angelo' },
    ],

    events : [
        {
            id           : 11,
            resourceId   : 11,
            name         : 'Implement Feature X',
            startDate    : new Date(2020, 12, 20),
            duration     : 2,
            durationUnit : 'h'
        },
    ]

};


export { schedulerConfig2 };
