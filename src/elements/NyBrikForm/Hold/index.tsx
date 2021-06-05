// Core
import React, { useState } from "react";

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

export const Hold = ({teamId, setTeamId}: any) => {
  // Styles
  const classes = useStyles();

  // Get data
  const teams = useSelector( state => {
    if("root" in state.data){
      const teams = state.data.root.teams.team
      return teams
    }
  });
  const curentTeam = teams?.find( (item: any)=> item.id === teamId)
  const [value, setValue] = useState<any>(curentTeam)

  // Handler
  const handlerOnChange = (event: any, value: any) => {
    if(value && ('id' in value)){
      setTeamId(value.id)
      setValue(value)
    } else {
      setTeamId('')
    }
  }

  return (
    <div>
      <Autocomplete
        className={classes.Autocomplete}
        id="hold"
        onChange={handlerOnChange}
        value={value}
        options={teams?teams:[]}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Hold" variant="outlined" />
        )}
      />
    </div>
  );
};
