// Core
import React from "react";

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formGroup: {
      flexDirection: "row",
    },
    formControlLabel: {
      marginLeft: 0,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 273,
    },
    wrapper: {
      flexDirection: "row",
      marginTop: 8,
    },
  })
);

export const Status = ({ status, state, setStatus, setState }: any) => {
  const classes = useStyles();

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked){
      setStatus('2')
    } else {
      setStatus('0')
    }
  };

  

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState(event.target.value as string);
  };
  return (
    <FormControl component="fieldset" className={classes.wrapper}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          id="status"
          value={state}
          onChange={handleSelectChange}
          label="Status"
        >
          <MenuItem value={"1"}>Budgetteret</MenuItem>
          <MenuItem value={"2"}>Planlagt</MenuItem>
          <MenuItem value={"3"}>Udført Sag</MenuItem>
          <MenuItem value={"4"}>Slettet</MenuItem>
        </Select>
      </FormControl>

      <FormGroup className={classes.formGroup}>
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Switch
              checked={(status === '0')?false:true}
              onChange={handleSwitchChange}
              name="clips"
              color="primary"
            />
          }
          label="Clips"
        />
      </FormGroup>
    </FormControl>
  );
};
