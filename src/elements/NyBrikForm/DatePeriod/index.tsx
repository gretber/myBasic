
import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    datePicker: {
      width: "45%",
    },
  })
);

export const DatePeriod = () => {
  const classes = useStyles();
  const [selectedStartDate, setSelectedStartDate] = React.useState<Date | null>(new Date("2021-08-18"));

  const handleStartDateChange = (date: any) => {
    setSelectedStartDate(date);
  };

  const [selectedEndDate, setSelectedEndtDate] = React.useState<Date | null>(new Date("2021-08-18"));

  const handleEndDateChange = (date: any) => {
    setSelectedEndtDate(date);
  };

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
          value={selectedStartDate}
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
          value={selectedEndDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

