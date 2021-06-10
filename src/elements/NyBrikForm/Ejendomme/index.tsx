// Core
import React, {useEffect, useState} from "react";

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

  const [areaValue, setAreaValue] = useState<any>(area)
  const [kgPrArea, setKgPrArea] = useState<any>((tons*1000)/area)
  const [tonsValue, setTonsValue] = useState<any>(tons)

  // Area Handler
  const handlerOnAreaChange = (event: any) => {
    if(event.target.value >= 0){
      setAreaValue(event.target.value)
      setArea(parseInt(event.target.value))

      setTonsValue(()=>{
        const newState = (event.target.value * kgPrArea) / 1000
        setTons(newState)
        return newState
      })
    }
  }

  const handlerOnClickArea = () => {
    if(areaValue === 0){
      setAreaValue('')
    }
  }

  // Tons Handler
  const handlerOnTonsChange = (event: any) => {
    if(event.target.value >= 0){
      setTonsValue(event.target.value)
      setTons(event.target.value)
    }
  }

  const handlerOnClickTons = () => {
    if(tonsValue === 0){
      setTonsValue('')
    }
  }

  // Kg pr. area handler
  const handlerOnKgPrAreaChange = (event: any) => {
    if(event.target.value >= 0){
      setKgPrArea(event.target.value)
    }

    setTonsValue(()=>{
      const newState = (event.target.value * areaValue) / 1000
      setTons(newState)
      return newState
    })
  }

  const handlerOnClickKgPrArea = () => {
    if(kgPrArea === 0){
      setKgPrArea('')
    }
  }
  
  return (
    <div className={`${classes.wrapper} ${classes.root}`}>
      <TextField
        id="m2"
        label="Area"
        type="number"
        onChange={handlerOnAreaChange}
        onClick={handlerOnClickArea}
        value={areaValue}
        InputProps={{
          endAdornment: <InputAdornment position="end">m2</InputAdornment>,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />

      <TextField
        id="kgPrArea"
        label="Kg pr. area"
        type="number"
        onChange={handlerOnKgPrAreaChange}
        onClick={handlerOnClickKgPrArea}
        value={kgPrArea}
        InputProps={{
          endAdornment: <InputAdornment position="end">Kg/m2</InputAdornment>,
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
        onClick={handlerOnClickTons}
        value={tonsValue}
        InputProps={{
          endAdornment: <InputAdornment position="end">tons</InputAdornment>,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
    </div>
  );
}
