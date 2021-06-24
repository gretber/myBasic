/**
 * Grid with unplanned tasks. This is just a react wrapper.
 */
// libraries
import React, { Component, useEffect } from 'react';

// our stuff
import UnplannedGrid from '../../lib/UnplannedGrid';
// import UnplannedGrid from '../lib/UnplannedGrid.js';
import Task from '../../lib/Task.js';

class UnplannedGridComponent extends Component {

    componentDidMount() {
        this.unplannedGrid = new UnplannedGrid({
            appendTo   : 'unplannedContainer',
            eventStore : this.props.eventStore,
            data: this.props.data,
            listeners: {
                cellMouseOver: () => {this.props.setAutoReschedule(false)}
            },
            store      : {
                modelClass : Task,
                // readUrl    : 'data/unplanned.json',
                autoLoad   : true
            },
            tbar: ['']
        });
    }
    


    render() {
        if(this.unplannedGrid && this.props.data )
        this.unplannedGrid.data = this.props.data;
        return (<div id="unplannedContainer"></div>);
    }
};


// const UnplannedGridComponent = (props) => {

//     let unplannedGrid;
//     useEffect( () => {
//         unplannedGrid = new UnplannedGrid({
//             appendTo   : 'unplannedContainer',
//             eventStore : props.eventStore,
//             data: props.data,
//             store      : {
//                 modelClass : Task,
//                 // readUrl    : 'data/unplanned.json',
//                 autoLoad   : true
//             }
//         });
//     }, []);
    


    
//         return (<div id="unplannedContainer">{unplannedGrid}</div>);
    
// };


export default UnplannedGridComponent;