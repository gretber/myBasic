// Core
import React, {useEffect, useState} from "react";

// Material
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export const Item = ({ item, index, value, setRegion, isFabrikChosen }: any) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRegion( (prevState: any) => {
      const newState = [...prevState]
      newState[index]['-selected'] = event.target.checked
      return newState
    } )
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            disabled={isFabrikChosen}
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
}