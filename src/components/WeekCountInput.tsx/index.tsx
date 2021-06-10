// Material
import { Button, makeStyles, TextField } from "@material-ui/core";

// Moment
import moment from "moment";

// Hooks
import { useState } from "react";

// API
import { updateTimeLine } from "../../bus/briks/api/updateTimeLine";

 const useStyles = makeStyles({
   root: {
    width: 80,
    marginRight: 5,
    marginLeft: 5,
   },

   wrapper : {
      // border: 'solid 1px rgba(0, 0, 0, 0.23)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
   }
 });
 

//  Types

type viewPresetType = 'Uge' | 'To uger' | 'Måned' | '24 uger' | 'Other'

 export const WeekCountInput = ({config}:{config: any}) => {

    const [weeksCount, setWeeksCount] = useState(1);


    const classes = useStyles();

    const handleCountChange = (event: any) => {
      
      if(event.target.value < 1)
      setWeeksCount(1);
      else 
      setWeeksCount(Number(event.target.value)); 

    }
    
    const submitButtonHandler = (event: any) => {
      if(weeksCount > 0){
      const newState = Object.assign({}, config);
      const newStartDate = moment(newState.startDate);
      let viewPreset: string = '';

      newState.startDate = newStartDate.toDate();
      newState.endDate = newStartDate.add(weeksCount, 'weeks').toDate();
      if(weeksCount === 1)
      {
          newState.weekStartDay = 1;
          viewPreset = "Uge";

      }
      else if(weeksCount === 2) {
        newState.weekStartDay = 1;
        viewPreset = "To uger";
      }
      else if(weeksCount === 4)
      {
        newState.weekStartDay = 1;
        viewPreset = "Måned";
      }
      else if(weeksCount > 2 && weeksCount !== 24)
      {
        viewPreset = `${weeksCount} uger`;
      }
      else if(weeksCount === 24)
      {
        viewPreset = '24 uger';
      }
      console.log('S D', newState.startDate);
      console.log('E D: ',newState.endDate )
      console.log('in input',{weeksCount});
        updateTimeLine(newState.startDate, newState.endDate, viewPreset);
       
      }
    
    }

  return (
    <div className={classes.wrapper}>
      <TextField className ={classes.root}
          id="outlined-number"
          label="Weeks"
          type="number"
          onChange={handleCountChange}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={weeksCount}
        />
        <Button variant='outlined' onClick = {submitButtonHandler}>Submit</Button>
        </div>
        )
 }