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

export const Status = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    clips: false,
  });

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [status, setStatus] = React.useState("");

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  return (
    <FormControl component="fieldset" className={classes.wrapper}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          id="status"
          value={status}
          onChange={handleSelectChange}
          label="Status"
        >
          <MenuItem value={"ikke-planlagt"}>Ikke planlagt</MenuItem>
          <MenuItem value={"planlagt"}>Planlagt</MenuItem>
          <MenuItem value={"afsluttet"}>Afsluttet</MenuItem>
          <MenuItem value={"slettet"}>Slettet</MenuItem>
        </Select>
      </FormControl>

      <FormGroup className={classes.formGroup}>
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Switch
              checked={state.clips}
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
