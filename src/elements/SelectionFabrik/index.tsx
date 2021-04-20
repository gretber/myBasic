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
};

export const SelectionFabrik = () => {
  const initialState = [
    "Striber",
    "Entreprenør",
    "Afspærring",
    "Dortheasminde",
    "Fræsning",
    "Kastrup",
    "Køge",
    "Randers",
    "SPV - Dortheasminde",
    "SPØ - Kollerød",
    "Tinglev",
    "Troldhede",
    "Vandel",
    "Viborg",
  ];

  const [ state ] = useState(initialState);

  const itemJSX = state.map((item: string) => <Item key={item} value={item} />);

  return <>{itemJSX}</>;
};
