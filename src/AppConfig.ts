
/**
 * 
 * Application configuration
 */
 
// Date
import moment from 'moment';

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
            
            let projectNo = '', customerName = '', name2 = '', tons = '', factoryItemName = '', area = '';
            if(eventRecord.data.projectNo !== 'null')
             projectNo = eventRecord.data.projectNo + ' ';

            if(eventRecord.data.name2 !== 'null')
            name2 = eventRecord.data.name2 + ' ';

            if(eventRecord.data.customerName !== 'null')
            customerName = eventRecord.data.customerName + ' ';

            if(eventRecord.data.tons !== 'null')
            tons = eventRecord.data.tons + ' ton ';

            if(eventRecord.data.factoryItemName !== 'null')
            factoryItemName = eventRecord.data.factoryItemName + ' ';

            if(eventRecord.data.area !== 'null')
            area = eventRecord.data.area;

            return `<div  class="b-sch-event-tooltip eventToolTip">
                    <span>${projectNo}${customerName}${name2}${tons}${factoryItemName}${area} 
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
                   copyEvent: 
                   {
                    text: 'Duplicate',
                    icon: 'b-fa-copy',
                     onItem: () => console.log('clicked copy')
                   }
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
