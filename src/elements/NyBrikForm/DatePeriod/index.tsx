// Core
import "date-fns";
import React, { useEffect } from "react";

// Material
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// Helpers
import { lagInDays } from '../../../helpers/lagInDays';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    datePicker: {
      width: "45%",
    },
  })
);

export const DatePeriod = ({ startDate, setStartDate, endDate, setEndDate, setVarighed, isWorkWeekends }: any) => {
  const classes = useStyles();

  // Start date handler
  const handleStartDateChange = (date: any) => {
    // Start date cannot be higher than the end date
    if(endDate.getTime() < date.getTime()){

      setStartDate(date);
      setEndDate(date)
      setVarighed(lagInDays(date, date, isWorkWeekends))

    } else {
      setStartDate(date);
      setVarighed(lagInDays(date, endDate, isWorkWeekends))
    }
  };

  // End date handler
  const handleEndDateChange = (date: any) => {
    // End date cannot be less than the start
    if(date.getTime() <= startDate.getTime()){

      setEndDate(date)
      setStartDate(date)
      setVarighed(lagInDays(date, date, isWorkWeekends))

    } else {
      setEndDate(date);
      setVarighed(lagInDays(startDate, date, isWorkWeekends))
    }
  };

  // When varighed toggler changing
  useEffect(()=> {
    setVarighed(lagInDays(startDate, endDate, isWorkWeekends))
  },[isWorkWeekends])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="start-date"
          label="Start dato"
          value={startDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />

        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="end-date"
          label="Slut dato"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

