// Core
import React, { useState, FC } from "react";

// Material
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// Hooks
import { useSelector } from "../../hooks/useSelector";

type ItemType = {
  item: string;
  index: number;
  value: boolean;
  setState: any;
}

const Item: FC<ItemType> = ({ item, index, value, setState }) => {

  
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
};

export const SelectionFabrik = ({ fabrik, setFabrik }: any) => {
  
  // Get data
  const initialState = useSelector( state => {
    if("root" in state.data){
      return state.data.root.selections.selection[2].values.value;
    }
  });

  const itemJSX = fabrik?fabrik.map((item: any, index: number) => <Item key={item.name} index={index} item={item.name} value={item['-selected']} setState={setFabrik} />):null;

  return <>{itemJSX}</>;
};
