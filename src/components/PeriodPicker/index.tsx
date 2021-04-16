import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export const PeriodPicker = () => {
  const classes = useStyles();
  const [periode, setPeriode] = React.useState("Måned");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPeriode(event.target.value as string);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="periode">Periode</InputLabel>
        <Select
          labelId="periode"
          id="periode"
          value={periode}
          onChange={handleChange}
          label="periode"
        >
          <MenuItem value={"24 uger"}>24 uger</MenuItem>
          <MenuItem value={"Måned"}>Måned</MenuItem>
          <MenuItem value={"To uger"}>To uger</MenuItem>
          <MenuItem value={"Uge"}>Uge</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
