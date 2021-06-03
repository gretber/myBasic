
/**
 * Application configuration
 */



// View presets 



// -------- Config

const schedulerConfig2: any = {
      weekStartDay: 1,
        rowHeight: 50,
       showHeaderElemens: false,
     
    features: {
        nonWorkingTime : true,
        autoAdjustTimeAxis: false,
        showHeaderElemens: false,
        timeRanges : {
                showCurrentTimeLine : true,
                showHeaderElements  : false,
                enableResizing      : false
            },
         eventTooltip : {
            // align : 'l-t', 
            template : ({eventRecord}:any) => {
            return `<div  class="b-sch-event-tooltip eventToolTip">
                    <span>${eventRecord.data.tons} tons</span>
                    </div>`;
            },
        },    
         timeAxisHeaderMenu: {
            disabled: true,
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
