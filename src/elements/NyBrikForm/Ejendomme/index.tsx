// Core
import React from "react";

// Material
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "96%",
      },
    },
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

export const Ejendomme = ({ area, setArea, tons, setTons }: any) => {
  // Styles
  const classes = useStyles();

  // Area Handler
  const handlerOnAreaChange = (event: any) => {
    if(event.target.value > 0){
      setArea(parseInt(event.target.value))
    }
  }

  // Tons Handler
  const handlerOnTonsChange = (event: any) => {
    if(event.target.value > 0){
      setTons(parseInt(event.target.value))
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.wrapper}>
        <TextField
          id="m2"
          label="Area"
          type="number"
          onChange={handlerOnAreaChange}
          value={area}
          InputProps={{
            endAdornment: <InputAdornment position="end">m2</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <TextField
          id="tons"
          label="Tons"
          type="number"
          onChange={handlerOnTonsChange}
          value={tons}
          InputProps={{
            endAdornment: <InputAdornment position="end">tons</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
    </form>
  );
}
