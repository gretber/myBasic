// Core
import React, { useState } from "react";

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FormHelperText } from "@material-ui/core";

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

export const Hold = ({teamId, setTeamId, validation, setValidation}: any) => {
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
  const handlerOnChange = (event: any, value: any, reason: any) => {
    if(value && ('id' in value)){
      setTeamId(value.id)
      setValue(value)
      
      setValidation((prevState: any)=>{
        const newState = {...prevState, hold: false}
        return newState
      })
    }
    if(reason==="clear"){
      setValue({id: '', name: ''})
      setTeamId('null')
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
          <TextField {...params} label="Hold*" variant="outlined" />
        )}
      />
      { validation.hold == "null" &&
        <FormHelperText style={{margin: "-8px 0 0 16px"}} error={true}>
          Hold er påkrævet
        </FormHelperText>
      }
    </div>
  );
};
