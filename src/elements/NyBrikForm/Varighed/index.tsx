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

export const Varighed = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    weekendArbejde: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
    <FormControl component="fieldset">
      <FormGroup className={classes.formGroup}>
        <TextField
          id="outlined-number"
          label="Varighed"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">dage</InputAdornment>,
          }}
        />
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Switch
              checked={state.weekendArbejde}
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
