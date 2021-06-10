// Core
import React, { useState, useEffect } from "react";

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from '@material-ui/core/CircularProgress';

// Types
import { Customer, CustomersType } from './types';

// Helpers
import { getUserLoginData } from "../../../helpers/getUserLoginData";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Autocomplete: {
      margin: theme.spacing(1),
      width: "96%",
    },
  })
);

export const KundeNavn = ({ setCustomerName, projectNo, customerName, setCustomerId, customerId }: any) => {
  // Styles
  const classes = useStyles();
  const [value, setValue] = useState({id: customerId , name: customerName})
  useEffect(()=>{
    setValue({id: customerId , name: customerName})
  },[customerName])
  
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Array<Customer>|[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const getCustomers = process.env.REACT_APP_GET_CUSTOMERS;

       const {login, password} = getUserLoginData();
    const encoded = window.btoa(`${login}:${password}`) 
      const response = await fetch(`${getCustomers}`, {
        method:  'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encoded}`,
        },
      });

      const customers: CustomersType = await response.json();

      if (active) {
        setOptions(customers.root.customers.customer);
      }
    })();

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
  const handlerOnChange = ( event: any, value: any, reason: any ) => {
    if(value && ('name' in value)){
      setValue(value)
      setCustomerName(value.name)
      setCustomerId(value.id)
    } 
    if(reason === 'clear'){
      setValue({id: '', name: ''})
      setCustomerName('null')
      setCustomerId('null')
    }
  }

  return (
    <Autocomplete
      disabled={projectNo!=='null'}
      className={classes.Autocomplete}
      id='kunde-navn'
      value={value}
      onChange={handlerOnChange}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option: any) => `${option.name==='null'?'':option.name}`}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={"Kunde Navn"}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
