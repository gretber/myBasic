// Core
import React, { useEffect } from "react";

// Material
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export const Item = ({ item, index, value, setFabrik, fabrik, setIsFabrikChosen }: any) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFabrik( (prevState: any) => {
      const newState = [...prevState]
      newState[index]['-selected'] = event.target.checked
      return newState
    })
  };

  useEffect(()=>{
    if(fabrik){
      const isFabrikChosen = fabrik.findIndex( (item: any) =>  item["-selected"] === true )
      isFabrikChosen === -1?setIsFabrikChosen(false):setIsFabrikChosen(true)
    }
  },[value])

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
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