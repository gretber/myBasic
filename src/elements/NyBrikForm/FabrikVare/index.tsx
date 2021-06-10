// Core
import React, { useState, useEffect } from "react";

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

// API
import { selectionItemsDetail } from './api/selectionItemsDetail';

// Types
import { Item } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Autocomplete: {
      margin: theme.spacing(1),
      width: "96% !important",
    },
  })
);

export const FabrikVare = ({ factoryId, setFactoryItemName, setFactoryItemId, factoryItemName, factoryItemId }: any) => {
  // Styles
  const classes = useStyles();

  // Initial State
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Array<Item>>([]);
  const [value, setValue] = useState({id: factoryItemId, name: factoryItemName})

  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if(factoryId !== 'null'){
      selectionItemsDetail(setOptions, active, factoryId)
    }


    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // Handler
  const handlerOnChange = (event: any, value: any, reason: any) => {
    if(value && ('name' in value)){
      setValue(value)
      setFactoryItemName(value.name)
      setFactoryItemId(value.id)
    } 

    if(reason === 'clear'){
      setValue({id: '', name: ''})
      setFactoryItemName('null')
      setFactoryItemId('null')
    }
  }


  return (
    <Autocomplete
      value={value}
      disabled={factoryId === 'null'}
      className={classes.Autocomplete}
      onChange={handlerOnChange}
      id="fabrik-vare"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Fabrik Vare"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};
