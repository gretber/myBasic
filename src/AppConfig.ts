
/**
 * 
 * Application configuration
 */
 
// Date
import moment from 'moment';

// Config
export let eventRecordData:any = {};
// console.log(eventRecordData);



  const features = {

        eventDragCreate: false,
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
            // align : 'l-t',
            template : ({eventRecord}:any) => {
            return `<div  class="b-sch-event-tooltip eventToolTip">
                    <span>${eventRecord.data.details}</span>
                  
                    </div>`;
            },
        },
        timeAxisHeaderMenu: {
            disabled: true,
        },
        eventMenu: {
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
            items : {
                addEvent : false
            },
        },
            eventEdit: {
                    }
                 }
                 ;

export const configFeatures = {...features};

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
                moment.updateLocale('da', {
                    months :['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
                    weekdays: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag' ]
                });
                
                // console.log('week endDate: ', endDate);
                // console.log('week')
                // console.log(momentEndDate.week());
                const displayDate = `${momentStartDate.locale('da').format('YYYY, MMMM')}  (uge ${momentEndDate.isoWeek()})`;
                // console.log(displayDate);
               console.log('startDate', startDate)
               
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
                 moment.updateLocale('da', {
                    weekdays: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
                    weekdaysMin: ['Søn.', 'Ma.', 'Ti.', 'On.', 'To.', 'Fr.', 'Lø.' ]
                });
                console.log('startDate', startDate)
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

                    // console.log('uge', momentDate.isoWeek())
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
   
    nonWorkingDays: 
    {
        0: true,
        1: false,
        6: false
    },
    
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
        },
    ],
      listeners: {
                // catchAll: (e:any) => {console.log(e);}
                eventClick: (e:any) => {console.log(e);},
                eventContextMenu: (e: any) => {
                eventRecordData = e.eventRecord.originalData;
               },
                
                eventDblClick: (e: any) => {
                    eventRecordData = e.eventRecord.originalData;
                }
            },

    //*********** Custome edit event ***********//
        features,

    // listeners : {
    //     beforeEventEditShow({ editor, eventRecord }: any) {
    //         // const equipmentCombo = editor.widgetMap.equipment;    
    //         // const volumeField = editor.widgetMap.volume;
    //         const region = editor.widgetMap.region

    //         console.log('region', region)

    //         // // update data in combo list
    //         // equipmentCombo.items = this.equipmentStore.getRange();
    //         // // update field visibility state
    //         // volumeField.hidden = !eventRecord.hasVolume;
    //     }
    // }
    
   

};


export { schedulerConfig };


