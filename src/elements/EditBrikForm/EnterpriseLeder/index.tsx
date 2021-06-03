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

export const EnterpriseLeder = ({setLeaderId}: any) => {
  // Styles
  const classes = useStyles();

   // Get data
  const leaders = useSelector( state => {
    if("root" in state.data){
      return state.data.root.leaders.leader
    }
  });

  // Handler
  const handlerOnChange = (event: any, value: any) => {
    if(value && ('id' in value)){
      setLeaderId(value.id)
    } else {
      setLeaderId('')
    }
  }

  return (
    <div>
      <Autocomplete
        className={classes.Autocomplete}
        id="enterprise-leder"
        onChange={handlerOnChange}
        options={leaders?leaders:[]}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Enterprise leder" variant="outlined" />
        )}
      />
    </div>
  );
};
