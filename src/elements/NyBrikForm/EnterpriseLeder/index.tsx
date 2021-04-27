// Core
import React from "react";

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

// Hooks
import { useSelector } from '../../../hooks/useSelector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Autocomplete: {
      margin: theme.spacing(1),
      width: "96%",
    },
  })
);

export const EnterpriseLeder = () => {
  // Styles
  const classes = useStyles();

   // Get data
  const leaders = useSelector( state => {
    if("root" in state.data){
      return state.data.root.leaders.leader
    }
  });

  return (
    <div>
      <Autocomplete
        className={classes.Autocomplete}
        id="enterprise-leder"
        options={leaders?leaders:[]}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Enterprise leder" variant="outlined" />
        )}
      />
    </div>
  );
};
