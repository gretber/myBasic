// Core
import React from "react";

// Material
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

//Helpers
import { addDays } from '../../../helpers/addDays';
import { subDays } from '../../../helpers/subDays';
import { lagInDays } from '../../../helpers/lagInDays';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formGroup: {
      flexDirection: "row",
      padding: "0 8px",
      marginTop: 16,
    },
    formControlLabel: {
      marginLeft: 8,
    },
  })
);

export const Varighed = ( { varighed, setVarighed, setEndDate, startDate, isWorkWeekends, setIsWorkWeekends, endDate }: any) => {
  const classes = useStyles();

  // Switch toggle change event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsWorkWeekends((prevState: boolean)=>!prevState);
  };

  // Text field handler
  const handlerCountChange = (event: any) => {
    if(event.target.value > 0){

      setVarighed((prevState: number)=>{

        if(prevState < event.target.value){

          setEndDate(addDays(endDate, 1))
          return lagInDays(startDate, addDays(endDate, 1), isWorkWeekends)
        } else {
          
          setEndDate(subDays(endDate, 1))
          return lagInDays(startDate, subDays(endDate, 1), isWorkWeekends)
        }
      })
    }
  }

  return (
    <FormControl component="fieldset">
      <FormGroup className={classes.formGroup}>
        <TextField
          id="duration"
          label="Varighed"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={varighed}
          onChange={handlerCountChange}
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">dage</InputAdornment>,
          }}
        />
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Switch
              checked={isWorkWeekends}
              onChange={handleChange}
              name="weekendArbejde"
              color="primary"
            />
          }
          label="Weekend Arbejde"
        />
      </FormGroup>
    </FormControl>
  );
};
