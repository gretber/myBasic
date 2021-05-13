// Core
import React, { useState, useEffect } from "react";

// Material
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// Hooks
import { useSelector } from "../../hooks/useSelector";

const Item = ({ item, index, value, setState, fabrik, setIsFabrikChosen }: any) => {

  const [ el, setEl ] = useState(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState( (prevState: any) => {
      prevState[index]['-selected'] = event.target.checked
      setEl(event.target.checked)
      return prevState
    } )
  };

  useEffect(()=>{
    if(fabrik){
      const chosenFabrik = fabrik.findIndex( (item: any) =>  item["-selected"] === true )
      chosenFabrik === -1?setIsFabrikChosen(false):setIsFabrikChosen(true)
    }
  },[el])

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
};

export const SelectionFabrik = ({ fabrik, setFabrik, setIsFabrikChosen }: any) => {
  
  // Get data
  const initialState = useSelector( state => {
    if("root" in state.data){
      return state.data.root.selections.selection[2].values.value;
    }
  });

  const itemJSX = fabrik?fabrik.map((item: any, index: number) => {
    return (
      <Item fabrik={fabrik}
            key={item.name}
            index={index}
            item={item.name}
            value={item['-selected']}
            setState={setFabrik}
            setIsFabrikChosen={setIsFabrikChosen}/>
    )})
    :null;

  return <>{itemJSX}</>;
};
