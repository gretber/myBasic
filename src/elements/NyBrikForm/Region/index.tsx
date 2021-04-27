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


export const Region = ({setRegionId}: any) => {
  // Styles
  const classes = useStyles();

  // Get data
  const regions = useSelector( state => {
     if("root" in state.data){
      return state.data.root.districs.district
    }
  })

  // Handler
  const handlerOnChange = (event: any, value: any) => {
    if(value && ('id' in value)){
      setRegionId(value.id)
    } else {
      setRegionId('')
    }
  }



  return (
    <div>
      <Autocomplete
        className={classes.Autocomplete}
        id="region"
        onChange={handlerOnChange}
        options={regions?regions:[]}
        getOptionLabel={(option: any) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Region" variant="outlined" />
        )}
      />
    </div>
  );
};
