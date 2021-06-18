
/**
 * 
 * Application configuration
 */
 
// Date
import moment from 'moment';

import copyIcon from './copy-two.png';

// Config
export let eventRecordData:any = {};

  const features = {

        
        nonWorkingTime : {
        highlightWeekends: true,
        nonWorkingDays: 
                    {
                        0: false,
                        1: false,
                        6: true
                    },
        },
        showHeaderElements: false,
        autoAdjustTimeAxis: false,
        timeRanges : {
                showCurrentTimeLine : true,
                showHeaderElements  : false,
                enableResizing      : true,
         

            },
        eventTooltip : {
            template : ({eventRecord}:any) => {
                
             return `<div  class="b-sch-event-tooltip eventToolTip">
                    <span>${eventRecord.details} 
                  </span>
                    </div>`;
            },
        },
        timeAxisHeaderMenu: {
            disabled: true,
        },
        eventMenu: {
            disabled: false,
            items: {
                editEvent: false,
            }
      
        },
         scheduleMenu : {
           disabled: true,
        },
         eventEdit: {
                    },

         eventResize: {
            disabled: false,
        },

        eventDrag : {
            disabled: false,
        },

        eventDragSelect: true,
        eventDragCreate: false,
    };

export const configFeatures : any = {...features};

// View presets 
const myDayAndWeekPreset = {
        
        base    : 'dayAndWeek',
        id      : 'myDayAndWeekPreset',
        timeResolution : {              
        unit      : 'day',       
        increment : 1,
    },
        
        headers : [
        {
            unit      : "week",
            increment : 1,
            renderer  : (startDate:Date, endDate:Date, headerConfig:any, cellIdx:number) => {
                
                const momentStartDate = moment(startDate);
                const momentEndDate = moment(endDate);
                momentEndDate.subtract(1, 'days');
                moment.updateLocale('da', {
                    months :['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
                    weekdays: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag' ]
                });
                
                const displayDate = `${momentStartDate.locale('da').format('YYYY, MMMM')}  (uge ${momentEndDate.isoWeek()})`;
                           
               return displayDate
                
            }
        },
        {
            unit      : "day",
            increment : 1,
            renderer  : (startDate:Date, endDate:Date, headerConfig:any, cellIdx:number) => {
                
                const momentDate = moment(startDate);
                 moment.updateLocale('da', {
                    weekdays: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
                    weekdaysMin: ['Søn.', 'Ma.', 'Ti.', 'On.', 'To.', 'Fr.', 'Lø.' ]
                });
                
                const displayDate = momentDate.locale('da').format('DD, dd');
                return displayDate;
                }    
        }

        ],
  };

const myDayAndMonthPreset = {

    
    id: 'myDayAndMonthPreset',
    timeResolution : {              
        unit      : 'day',       
        increment : 1,
    },
    headers: [
        {
         unit: "month",
         increment : 1,
         renderer  : (startDate:Date, endDate:Date, headerConfig:any, cellIdx:number) => {
            const momentDate = moment(startDate);
                moment.updateLocale('da', {
                    months :['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
                    weekdays: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag' ]
                });

                const displayDate = `${momentDate.locale('da').format('YYYY, MMMM')}`;
                return displayDate;
         }
        },
        {  unit      : "week",
            increment : 1, 
            renderer  : (startDate:Date, endDate:Date, headerConfig:any, cellIdx:number) => {
                const momentDate = moment(endDate);
                momentDate.subtract(1, 'days');
                 moment.updateLocale('da', {
                    weekdays: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
                    weekdaysMin: ['Søn.', 'Ma.', 'Ti.', 'On.', 'To.', 'Fr.', 'Lø.' ]
                });
                const displayDate = `uge ${momentDate.isoWeek()}`;
                return displayDate;
            }},
        {
            unit      : "day",
            increment : 1, 
            renderer  : (startDate:Date, endDate:Date, headerConfig:any, cellIdx:number) => {
                const momentDate = moment(startDate);
                 moment.updateLocale('da', {
                    weekdays: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
                    weekdaysMin: ['Søn.', 'Ma.', 'Ti.', 'On.', 'To.', 'Fr.', 'Lø.' ]
                });
                
                const displayDate = momentDate.locale('da').format('DD, dd');
                return displayDate;
            }
        },
        
    ]
  }

const my24WeeksPreset = {

        id      : 'my24WeeksPreset',
        suppresFit: true,
        timeResolution : {              
        unit      : 'day',       
        increment : 1,
        },
        headers: [

                {
                    unit      : "month",
                    increment : 1, 

                    renderer  : (startDate:Date, endDate:Date, headerConfig:any, cellIdx:number) => {
                    const momentDate = moment(startDate);
                    moment.updateLocale('da', {
                    weekdays: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
                    weekdaysMin: ['Søn.', 'Ma.', 'Ti.', 'On.', 'To.', 'Fr.', 'Lø.' ]
                });
                
                    const displayDate = `${momentDate.locale('da').format('YYYY, MMMM')}`;
                     return displayDate;
            }
             },
                { 
                    unit      : "week",
                    increment : 1, 

                    renderer  : (startDate:Date, endDate:Date, headerConfig:any, cellIdx:number) => {
                    const momentDate = moment(startDate);
                    moment.updateLocale('da', {
                    weekdays: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
                    weekdaysMin: ['Søn.', 'Ma.', 'Ti.', 'On.', 'To.', 'Fr.', 'Lø.' ]
                });
                    
                 const displayDate = `uge ${momentDate.isoWeek()}`;
                return displayDate;
            }
                },
       ]
        
}


//   Config

const schedulerConfig: any = {

    resourceImagePath: './',
    minHeight: '20em',
    createEventOnDblClick: false,
    rowHeight: 30,
    weekStartDay: 1,
    presets: [myDayAndMonthPreset, myDayAndWeekPreset, my24WeeksPreset],
    viewPreset: 'my24WeeksPreset',
    eventRenderer: ({ eventRecord, resourceRecord,  renderData, tplData }: any) => {

          // Add your styling here

          if(eventRecord.data.weekendWork)
          {
            renderData.iconCls += "b-fa b-fa-calendar-check";
            renderData.wrapperStyle='z-index: 6;'
          }
          if(eventRecord.data.status === '2')
          {
              renderData.wrapperCls += "eventWrapper";
          }

          return `${eventRecord.name}`;
        },

      columns: [
        {
            type: 'resourceInfo',
            text: 'Team',
            showEventCount: false,
            showImage: false,
            width: 230,
            height: 200,
            enableCellContextMenu: false,
            enableHeaderContextMenu: false,
            sortable : false,
            draggable: false,
            editor: false

        },
    ],
      listeners: {
                eventContextMenu: (e: any) => {
                eventRecordData = e.eventRecord.originalData;
               },
                eventDblClick: (e: any) => {
                eventRecordData = e.eventRecord.originalData;
                }
            },
    features,
};
export { schedulerConfig };
