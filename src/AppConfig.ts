
/**
 * 
 * Application configuration
 */
 
// Date
import moment from 'moment';

// Config
export let eventRecordData:any = {};
console.log(eventRecordData);



  const features = {
        eventDragCreate: false,
        nonWorkingTime : true,
        autoAdjustTimeAxis: false,
        timeRanges : {
                showCurrentTimeLine : true,
                showHeaderElements  : true,
                enableResizing      : false
            },
        eventTooltip : {
            // align : 'l-t',
            template : ({eventRecord}:any) => {
            return `<div  class="b-sch-event-tooltip eventToolTip">
                    <span>${eventRecord.data.name}</span>
                    <span>${eventRecord.data.tons} tons</span>
                    </div>`;
            },
        },
            eventEdit: {
                editorConfig: {
                    style: {
                        width: "500px"
                    },
                            bbar: {
                                items: {
                                    cancelButton: {
                                    weight : 1
                                },

                            deleteButton : {
                                weight : 2,
                                color: 'b-red',
                            },

                            copyButton : {
                                weight : 3,
                                color: 'b-amber',
                                text: "copy",
                                name: 'copy',
                                onClick: () => {},
                            listeners : {
                                    beforeShow : ({ source : tip }:any) => {
                                        tip.html = new Promise(resolve => {
                                            setTimeout(() => resolve('Async content!'), 2000);
                                        });
                                        // AjaxHelper.get('someurl').then(response => tip.html = 'Done!');
                                    }
                                }
                            },

                            saveButton: {
                                weight : 4,
                                color: 'b-green',
                                onClick: (event: any)=>{console.log(event)}
                            },
                                        
                                    }

                                    
                                },
                                items : {
                // Merged with provided config of the resource field
                region: {
                    weight : 1,
                    type   : 'combo',
                    name   : 'region',
                    label  : 'Region',
                    items: [],
                    placeholder: '',
                },

                project: {
                    weight : 2,
                    type   : 'combo',
                    name   : 'projec',
                    label  : 'Project',
                    items: [],
                    placeholder: '',
                    clearable: true,
                },

                arbejdsplads: {
                    weight : 3,
                    type   : 'text',
                    name  : 'arbejdsplads',
                    label  : 'Arbejdsplads',
                },

                kalkuleBesk: {
                    weight : 4,
                    type   : 'text',
                    name   : 'kalkuleBesk',
                    label  : 'Kalkule Besk'
                },

                kundeNavn: {
                    weight : 5,
                    type   : 'combo',
                    name   : 'kundeNavn',
                    label  : 'Kunde Navn',
                    items: [],
                    placeholder: '',
                },

                resourceField : null,

                startDateField: {
                    weight : 7,
                    label: 'Start date',
                    style  : {
                        maxWidth: "50%"
                    },
                },
                startTimeField: null,

                endDateField: {
                    weight : 8,
                    label: 'End date',
                    style  : {
                        maxWidth: "50%"
                    },
                },

                varighed: {
                    weight : 9,
                    type   : 'numberField',
                    name   : 'varighed',
                    label  : 'Varighed',
                    min    : 1,
                    style  : {
                        maxWidth   : "40%",
                        marginLeft : "12px"
                    },
                },

                weekendWork: {
                    weight : 10,
                    type   : 'slideToggle',
                    name   : 'weekendWork',
                    label  : 'Weekend Arbejde',
                    color  : 'b-orange',
                    style  : {
                        maxWidth   : "50%",
                        marginLeft : "16px"
                    },
                },

                status: {
                    weight : 11,
                    type   : 'combo',
                    name   : 'status',
                    label  : 'Status',
                    items  : ['Budgetteret', 'Planlagt', 'Udført Sag', 'Slettet'],
                    placeholder : '',
                    style : {
                        maxWidth : "50%"
                    },
                },

                clip: {
                    weight : 12,
                    type   : 'slideToggle',
                    name   : 'clip',
                    label  : 'Clip',
                    color  : 'b-orange',
                    style  : {
                        maxWidth   : "40%",
                    },
                },

                jobType: {
                    weight : 13,
                    type   : 'combo',
                    name   : 'jobType',
                    label  : 'Job Type',
                    items: ["Fræs", "Striber", "Opretning"],
                    placeholder: '',
                },

                team: {
                    weight : 14,
                    type   : 'combo',
                    name   : 'team',
                    label  : 'Hold',
                    items: [],
                    placeholder: '',
                },

                leader: {
                    weight : 15,
                    type   : 'combo',
                    name   : 'leader',
                    label  : 'Enterprise leder',
                    items: [],
                    placeholder: '',
                },

                factory: {
                    weight : 16,
                    type   : 'combo',
                    name   : 'factory',
                    label  : 'Fabrik',
                    items: [],
                    placeholder: '',
                },

                fabrikVare: {
                    weight : 17,
                    type   : 'combo',
                    name   : 'factoryItemName',
                    label  : 'Fabrik Vare',
                    items: [],
                    placeholder: '',
                },

                area: {
                    weight : 18,
                    type   : 'numberField',
                    name   : 'area',
                    label  : 'Area',
                    min    : 0,
                    style  : {
                        maxWidth   : "40%",
                        marginLeft : "24px"
                    },
                },

                tons: {
                    weight : 19,
                    type   : 'numberField',
                    name   : 'tons',
                    label  : 'Tons',
                    min    : 0,
                    style  : {
                        maxWidth   : "40%",
                        marginRight : "24px"
                    },
                },

                nameField: null,
                endTimeField: null,

            }
                             
                         }
                     }
                 }
                 ;

export const configFeatures = {...features};

const schedulerConfig: any = {
    resourceImagePath: './',
    minHeight: '20em',
    startDate: new Date(2020, 11, 31),
    endDate: new Date(2021, 0, 31),

    weekStartDay: 1,
    viewPreset: {
        
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
                
                const momentDate = moment(endDate);
                moment.updateLocale('da', {
                    months :['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
                    weekdays: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag']
                });

                const displayDate = `${momentDate.locale('da').format('YYYY, MMMM')}  (uge ${momentDate.week()})`;

              
               
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
                    weekdaysMin: ['Ma.', 'Ti.', 'On.', 'To.', 'Fr.', 'Lø.', 'Søn.']
                });
                
                const displayDate = momentDate.locale('da').format('DD, dd');
                return displayDate;
                }
                
            
        }

        ],
  },
      columns: [
        {
            type: 'resourceInfo',
            text: 'Team',
            showEventCount: true,
            showImage: false,
            width: 230,
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
        features

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
