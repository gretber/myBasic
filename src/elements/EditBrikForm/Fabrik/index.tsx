// Core
import React, { useEffect, useState } from "react";

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

export const Fabrik = ({ factoryId, setFactoryId }: any ) => {
  // Style
  const classes = useStyles();

  const [ factory, setFactory ] = useState<any>(null)

  // Get data
  const factories: any = useSelector( state => {
    if("root" in state.data){
      return state.data.root.factories.factory
    }
  });


  useEffect(()=>{
    const factory = factories?factories.find( (item: any) => item.id === factoryId ):null
    setFactory(factory)
  },[factoryId])

  // Handler
  const handlerOnChange = (event: any, value: any) => {
    // Set factory name
    if(value && ('id' in value)){
      setFactoryId(value.id)
    } else {
      setFactoryId('')
    }

  }

  return (
    <div>
      <Autocomplete
        value={factory?factory:null}
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