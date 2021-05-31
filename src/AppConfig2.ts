
/**
 * Application configuration
 */

const schedulerConfig2: any = {
      weekStartDay: 1,
      
    features: {
        nonWorkingTime : true,
        autoAdjustTimeAxis: false,
        timeRanges : {
                showCurrentTimeLine : true,
                showHeaderElements  : true,
                enableResizing      : false
            },
         eventTooltip : {
            align : 'l-r', 
            template : ({eventRecord}:any) => {
            return `<div  class="b-sch-event-tooltip eventToolTip">
                    <span>${eventRecord.data.tons} tons</span>
                    </div>`;
            },
        },    
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
