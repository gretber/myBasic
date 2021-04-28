import React from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
      setArea(event.target.value)
    }
  }

  // Tons Handler
  const handlerOnTonsChange = (event: any) => {
    if(event.target.value > 0){
      setTons(event.target.value)
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.wrapper}>
        <TextField
          id="kg-pr-m2"
          label="Kg pr. m2"
          type="number"
          onChange={handlerOnAreaChange}
          value={area}
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
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
    </form>
  );
}
