// Core
import React, { useState } from "react";

// Material
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// Hooks
import { useSelector } from '../../hooks/useSelector';

const Item = ({ item, index, value, setState }: any) => {

  const [ el, setEl ] = useState(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState( (prevState: any) => {
      prevState[index]['-selected'] = event.target.checked
      setEl(event.target.checked)
      return prevState
    } )
  };


  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={el}
            onChange={handleChange}
            name={item}
            color="primary"
          />
        }
        label={item}
      />
    </FormGroup>
  );
}

export const SelectionRegion = () => {

  // Get data
  const initialState = useSelector( state => {
    if("root" in state.data){
      return state.data.root.selections.selection[1].values.value;
    }
  });

  const [ state, setState ] = useState(initialState);

  const itemJSX = state?state.map((item: any, index: number) => <Item key={item.name} index={index} item={item.name} value={item['-selected']} setState={setState} />):null;

  return (
    <>
      { itemJSX } 
    </>
  )
}