
/**
 * Application configuration
 */

// -------- Config

const schedulerConfig2: any = {
    weekStartDay: 1,
    rowHeight: 30,
    showHeaderElemens: false,
    createEventOnDblClick: false,
    minRowHeight: 50,
    barMargin: 0,
    cls: {
    'b-scheduler-3': 1
    },
    eventRenderer: ({ eventRecord, resourceRecord,  renderData, tplData }: any) => {

            tplData.wrapperStyle='z-index: 6;'
              return `${eventRecord.name}`;
        },
    features: {
        nonWorkingTime : true,
        autoAdjustTimeAxis: false,
        showHeaderElemens: false,
        timeRanges : {
            showCurrentTimeLine : true,
            showHeaderElements  : false,
            enableResizing      : false
        },
        scheduleMenu : {
            items : {
                addEvent : false
            },
        },
        eventTooltip : {
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
};


export { schedulerConfig2 };
