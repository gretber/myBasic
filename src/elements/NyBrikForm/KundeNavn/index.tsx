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

export const KundeNavn = ({ setCustomerName }: any) => {
  // Styles
  const classes = useStyles();

  // Get data
  const customers: any = [];
  useSelector( state => {
    if("root" in state.data){
      return state.data.root.projects.project.map( project => {
        if(project.customerName !== 'null'){
          if( customers.findIndex( (el: any) => el.customer === project.customerName) === -1){
            customers.push({ customer: project.customerName })
          }
    
        }
        return ''
      })
    }
  })

  // Handler
  const handlerOnChange = ( event: any, value: any ) => {
    if(value && ('customer' in value)){
      setCustomerName(value.customer)
    } else {
      setCustomerName(null)
    }
  }

  return (
    <div>
      <Autocomplete
        className={classes.Autocomplete}
        id="kunde navn"
        onChange={handlerOnChange}
        options={customers}
        getOptionLabel={(option: any) => option?option.customer:''}
        renderInput={(params) => (
          <TextField {...params} label="Kunde Navn" variant="outlined" />
        )}
      />
    </div>
  );
};
