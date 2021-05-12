import { SchedulerConfig } from '@bryntum/scheduler/scheduler.umd.js';
/**
 * Application configuration
 */

const schedulerConfig: any = {
    resourceImagePath: './',
    minHeight: '20em',
    startDate: new Date(2020, 12, 0),
    endDate: new Date(2021, 3, 0),

    viewPreset: 'weekAndDayLetter',

    // timeRangesFeature: {
    //     narrowThreshold: 10
    // },

    columns: [
        {
            type: 'resourceInfo',
            text: 'Team',
            showEventCount: true,
            showImage: true,
            width: 230,
        },
        // {
        //     text: 'Type',
        //     field: 'role',
        //     width: 130
        // }
    ],

    resourceStore: {
        filters: [
            function(item: any) {
                const team = item.data.resourceId
                const events = item.$project.initialConfig.eventsData
                const arr = events.filter( (item: any) =>  item.resourceId === team)
                if(arr.length>0){
                    return item
                }
            }
        ],

    },

    // eventStore: {
    //     filters: [
    //         function(item: any) {
    //             console.log(item)
    //             return item
    //         }
    //     ],
    // },


    //*********** Custome edit event ***********//
    features : {
        eventEdit  : {
            editorConfig : {
                 style  : {
                    width: "500px"
                },
                title: 'Edit Brik',
                bbar : {
                    items : {
                        deleteButton : null,
                        saveButton: {
                            weight : 2,
                            color: 'b-orange'
                        },
                        cancelButton: {
                            weight : 1
                        }
                    }
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
                    name   : 'project',
                    label  : 'Project',
                    items: [],
                    placeholder: '',
                },

                nameField: {
                    weight : 3,
                    type   : 'text',
                    label  : 'Arbejdsplads'
                },

                kalkuleBesk: {
                    weight : 4,
                    type   : 'text',
                    name   : 'kalkule-besk',
                    label  : 'Kalkule Besk'
                },

                KundeNavn: {
                    weight : 5,
                    type   : 'combo',
                    name   : 'kunde-navn',
                    label  : 'Kunde Navn'
                },

                resourceField : {
                    weight : 6,
                    label : 'Team'
                },

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
                    min    : 0,
                    style  : {
                        maxWidth   : "40%",
                        marginLeft : "12px"
                    },
                },

                weekendWork: {
                    weight : 10,
                    type   : 'slideToggle',
                    name   : 'weekend-arbejde',
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
                        maxWidth : "42.5%"
                    },
                },

                clip: {
                    weight : 12,
                    type   : 'slideToggle',
                    name   : 'clip',
                    label  : 'Clip',
                    color  : 'b-orange',
                    style  : {
                        maxWidth   : "50%",
                    },
                },

                jobType: {
                    weight : 13,
                    type   : 'combo',
                    name   : 'job-type',
                    label  : 'Job Type',
                    items: [],
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


                endTimeField: null,

            }
        }
    },

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
