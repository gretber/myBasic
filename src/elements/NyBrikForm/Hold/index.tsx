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

export const Hold = () => {
  // Styles
  const classes = useStyles();

  // Get data
  const teams = useSelector( state => {
    if("root" in state.data){
      const teams = state.data.root.selections.selection[0].values.value;
      // Exclude firs item
      const allHold = teams.filter( (item, index) => index > 0 )
      const hold = allHold.map( item => item.name.match(/^\S+/) )
      const res = hold.map( item  => item?[item[0]]:[] )
      return res
    }
  });

  return (
    <div>
      <Autocomplete
        className={classes.Autocomplete}
        id="hold"
        options={teams?teams:[]}
        getOptionLabel={(option) => option[0]}
        renderInput={(params) => (
          <TextField {...params} label="Hold" variant="outlined" />
        )}
      />
    </div>
  );
};
