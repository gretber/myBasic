
/**
 * Application configuration
 */

const schedulerConfig2: any = {

    features: {
        eventResize: {
            disabled: true,
        },

        eventEdit : {
            disabled: true,
        },

        eventMenu: {
            disabled: true,
        },

        eventDrag : {
            disabled: true,
        },

        eventDragSelect: false,
        eventDragCreate: false,
    },

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
            showEventCount: false,
            showImage: false,
            width: 230,
        },
    ],

};


export { schedulerConfig2 };
