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

export const Fabrik = ({setFactoryItemName, setFactoryItemId}: any ) => {
  // Style
  const classes = useStyles();

  // Get data
  const factories = useSelector( state => {
    if("root" in state.data){
      return state.data.root.factories.factory
    }
  });

  // Handler
  const handlerOnChange = (event: any, value: any) => {
    // Set factory name
    if(value && ('name' in value)){
      setFactoryItemName(value.name)
    } else {
      setFactoryItemName('')
    }

    // Set factory id
    if(value && ('id' in value)){
      setFactoryItemId(value.id)
    } else {
      setFactoryItemId('')
    }
  }

  return (
    <div>
      <Autocomplete
        className={classes.Autocomplete}
        id="fabrik"
        onChange={handlerOnChange}
        options={factories?factories:[]}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Fabrik" variant="outlined" />
        )}
      />
    </div>
  );
};