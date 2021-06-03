// import React from 'react';
// import './Popup.scss';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDateTimePicker
// } from '@material-ui/pickers';

// export const Popup = ({closePopup, eventRecord, eventStore, resourceStore}) => {



// const dataChangedHandler = ({ target }) => {
//       setState(prevState => {
//             return {
//                 ...prevState,
//                 [target.name] : target.value
//             }
//         })


       
//     }

//  const startDateChangeHandler = (startDate) =>  {
//         setState(prevState => {
//             return {
//                 ...prevState,
//                 startDate : startDate
//             }
//         })
//     }

// const  endDateChangeHandler = (endDate) => {
//         setState(prevState => {
//             return {
//                 ...prevState,
//                 endDate : endDate
//             }
//         })
//     }

//  const saveClickHandler = () => {
//         const eventRecord = this.props.eventRecord;

//         eventRecord.set({ ...this.state });

//         if (!eventRecord.eventStore) {
//             this.props.eventStore.add(eventRecord);
//         }

//         this.props.closePopup();
//     } // saveClickHandler


//      const resourceItems = this.props.resourceStore.map(resource => (
//             <MenuItem key={resource.id} value={resource.id}>{resource.name}</MenuItem>
//         ));

//   return {
//             <div className='popup-mask'>
//                 <div className='popup'>
//                     <header>Event edit&nbsp;</header>
//                     <article>
//                         <TextField
//                             name="name"
//                             label="Event name"
//                             onChange={dataChangedHandler}
//                             value={this.state.name}
//                             fullWidth
//                             style={{ marginBottom : 10 }}
//                         />
//                         <FormControl style={{ marginBottom : 10, width : '100%' }}>
//                             <InputLabel>Staff</InputLabel>
//                             <Select
//                                 name="resourceId"
//                                 onChange={dataChangedHandler}
//                                 value={this.state.resourceId}
//                             >
//                                 {resourceItems}
//                             </Select>
//                         </FormControl>
//                         <TextField
//                             name="location"
//                             label="Event location"
//                             onChange={dataChangedHandler}
//                             value={this.state.location}
//                             // fullWidth
//                             style={{ marginBottom : 10, width : '49%', marginRight : 5 }}
//                         />
//                         <FormControl style={{ marginBottom : 10, width : '49%', marginLeft : 5 }}>
//                             <InputLabel>Event type</InputLabel>
//                             <Select
//                                 name="eventType"
//                                 onChange={dataChangedHandler}
//                                 value={this.state.eventType}
//                             >
//                                 <MenuItem value="Meeting">Meeting</MenuItem>
//                                 <MenuItem value="Appointment">Appointment</MenuItem>
//                             </Select>
//                         </FormControl>
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
//                     </article>
//                     <footer>
//                         <Button variant="contained" color="secondary" onClick={this.props.closePopup}>Cancel</Button>
//                         <Button variant="contained" color="primary" onClick={this.saveClickHandler}>Save</Button>
//                     </footer>
//                 </div>
//             </div>
//       };
// }

export {};