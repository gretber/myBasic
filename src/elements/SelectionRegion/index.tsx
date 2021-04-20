// Core
import React, { useState } from "react";

// Material
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Item = ({ value }: any) => {
  const [state, setState] = React.useState({
    [value]: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={state[value]}
            onChange={handleChange}
            name={value}
            color="primary"
          />
        }
        label={value}
      />
    </FormGroup>
  );
}

export const SelectionRegion = () => {
  const initialState = [
    "FD",
    "FRÆS",
    "Fælles Danmark",
    "MIDT",
    "MTV",
    "NORD",
    "SPV",
    "SPØ",
    "SYD",
    "TEST",
    "VS",
    "ØST",
  ];

  const [ state ] = useState(initialState);

  const itemJSX = state.map((item: string) => <Item key={item} value={item} />);

  return (
    <>
      { itemJSX} 
    </>
  )
}