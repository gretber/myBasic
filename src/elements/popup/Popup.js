/**
 * Popup Component
 */
import React, { useState } from 'react';
import './Popup.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';

// Elements
import { Region } from '../EditBrikForm/Region';
import { Project } from '../EditBrikForm/Project';
import { Arbejdsplads } from '../EditBrikForm/Arbejdsplads';
import { KalkuleBesk } from '../EditBrikForm/KalkuleBesk';
import { KundeNavn } from '../EditBrikForm/KundeNavn';
import { DatePeriod } from '../EditBrikForm/DatePeriod';
import { Varighed } from '../EditBrikForm/Varighed';
import { Status } from '../EditBrikForm/Status';
import { JobType } from '../EditBrikForm/JobType';
import { Hold } from '../EditBrikForm/Hold';
import { EnterpriseLeder } from '../EditBrikForm/EnterpriseLeder';
import { Fabrik } from '../EditBrikForm/Fabrik';
import { FabrikVare } from '../EditBrikForm/FabrikVare';
import { Ejendomme } from '../EditBrikForm/Ejendomme';


const Popup = (props) => {

    const [ state, setState ] = useState({
        name      : '',
        eventType : 'Meeting',
        location  : '',
        ...props.eventRecord.data
    })

    const dataChangedHandler = ({ target }) => {
        setState(prevState => {
            return {
                ...prevState,
                [target.name] : target.value
            }
        })
    }

    const saveClickHandler = () => {
        const eventRecord = props.eventRecord;

        eventRecord.set({ state });

        if (!eventRecord.eventStore) {
            props.eventStore.add(eventRecord);
        }

        props.closePopup();
    } // saveClickHandler

    const startDateChangeHandler = (startDate) => {
        setState(prevState => {
            return {
                ...prevState,
                startDate : startDate
            }
        })
    }

    const endDateChangeHandler = (endDate) => {
        setState(prevState => {
            return {
                ...prevState,
                endDate : endDate
            }
        })
    }

        return (
            <div className='popup-mask'>
                <div className='popup'>
                    <header>Edit Brik&nbsp;</header>
                    <article>
                        <Region />
                        <Project />
                        <Arbejdsplads />
                        <KalkuleBesk />
                        <KundeNavn />
                        
                         {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                             <KeyboardDateTimePicker
                                name="startDate"
                                label="Start"
                                ampm={false}
                                format="yyyy-MM-dd HH:mm"
                                style={{ width : '49%', marginRight : 5 }}
                                value={this.state.startDate}
                                onChange={this.startDateChangeHandler}
                            ></KeyboardDateTimePicker>
                            <KeyboardDateTimePicker
                                name="endDate"
                                label="End"
                                ampm={false}
                                format="yyyy-MM-dd HH:mm"
                                style={{ width : '49%', marginLeft : 5 }}
                                value={this.state.endDate}
                                onChange={this.endDateChangeHandler}
                            ></KeyboardDateTimePicker>
                        </MuiPickersUtilsProvider> */}


                        <Varighed />
                        <Status />
                        <JobType />
                        <Hold />
                        <EnterpriseLeder />
                        <Fabrik />
                        <FabrikVare />
                        <Ejendomme />
                    </article>
                    <footer>
                        <Button variant="contained" color="secondary" onClick={props.closePopup}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={saveClickHandler}>Save</Button>
                    </footer>
                </div>
            </div>
        );
}

// class Popup extends React.Component {

//     /**
//      * Constructor (initializes state and binds handlers)
//      * @param {Object} props
//      */
//     constructor(props) {
//         super();

//         // create state with defaults overridden by eventRecord data
//         this.state = {
//             name      : '',
//             eventType : 'Meeting',
//             location  : '',
//             ...props.eventRecord.data
//         };

//         // shortcuts to handlers
//         this.dataChangedHandler = this.dataChangedHandler.bind(this);
//         this.saveClickHandler = this.saveClickHandler.bind(this);
//         this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
//         this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
//             console.log("POPUP STATE", this.state)
//     }

//     /**
//      * Sets the changed value to state
//      * @param {HTMLElement} target The input that changed
//      */
//     dataChangedHandler({ target }) {
//         this.setState(prevState => {
//             return {
//                 ...prevState,
//                 [target.name] : target.value
//             }
//         })
//     }

//     /**
//      * Updates state with startDate
//      * @param {Date} startDate
//      */
//     startDateChangeHandler(startDate) {
//         this.setState(prevState => {
//             return {
//                 ...prevState,
//                 startDate : startDate
//             }
//         })
//     }

//     /**
//      * Updates state with endDate
//      * @param {Date} endDate
//      */
//     endDateChangeHandler(endDate) {
//         this.setState(prevState => {
//             return {
//                 ...prevState,
//                 endDate : endDate
//             }
//         })
//     }
    
//     /**
//      * Saves the modified form data to the record being edited
//      */
//     saveClickHandler() {
//         const eventRecord = this.props.eventRecord;

//         eventRecord.set({ ...this.state });

//         if (!eventRecord.eventStore) {
//             this.props.eventStore.add(eventRecord);
//         }

//         this.props.closePopup();
//     } // saveClickHandler

//     /**
//      * @return The markup to render
//      */
//     render() {

//         const resourceItems = this.props.resourceStore.map(resource => (
//             <MenuItem key={resource.id} value={resource.id}>{resource.name}</MenuItem>
//         ));

//         console.log(resourceItems)

//         return (
//             <div className='popup-mask'>
//                 <div className='popup'>
//                     <header>Edit Brik&nbsp;</header>
//                     <article>
//                         <Region />
//                         <Project />
//                         <Arbejdsplads />
//                         <KalkuleBesk />
//                         <KundeNavn />
//                         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                             <KeyboardDateTimePicker
//                                 name="startDate"
//                                 label="Start"
//                                 ampm={false}
//                                 format="yyyy-MM-dd HH:mm"
//                                 style={{ width : '49%', marginRight : 5 }}
//                                 value={this.state.startDate}
//                                 onChange={this.startDateChangeHandler}
//                             ></KeyboardDateTimePicker>
//                             <KeyboardDateTimePicker
//                                 name="endDate"
//                                 label="End"
//                                 ampm={false}
//                                 format="yyyy-MM-dd HH:mm"
//                                 style={{ width : '49%', marginLeft : 5 }}
//                                 value={this.state.endDate}
//                                 onChange={this.endDateChangeHandler}
//                             ></KeyboardDateTimePicker>
//                         </MuiPickersUtilsProvider>
//                         <Varighed />
//                         <Status />
//                         <JobType />
//                         <Hold />
//                         <EnterpriseLeder />
//                         <Fabrik />
//                         <FabrikVare />
//                         <Ejendomme />
//                     </article>
//                     <footer>
//                         <Button variant="contained" color="secondary" onClick={this.props.closePopup}>Cancel</Button>
//                         <Button variant="contained" color="primary" onClick={this.saveClickHandler}>Save</Button>
//                     </footer>
//                 </div>
//             </div>
//         );
//     }
// }

export default Popup;

