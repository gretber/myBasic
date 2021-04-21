// Core
import React, { useState } from "react";

// React sortable hoc
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

// Material
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DragHandleIcon from "@material-ui/icons/DragHandle";

// Hooks
import { useSelector } from '../../hooks/useSelector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconCenter: {
      alignItems: "center",
    },
    dragIcon: {
      marginRight: 8,
      cursor: "pointer",
    },
  })
);

const SortableItem = SortableElement(({ item, value, setState, elem }: any) => {
  console.log(elem)
  const classes = useStyles();

  const [ el, setEl ] = useState(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(elem)
    
    setState( (prevState: any) => {
      prevState[elem]['-selected'] = event.target.checked
      setEl(event.target.checked)
      return prevState
    } )
  };


  return (
    <FormGroup className={classes.iconCenter} row>
      <DragHandleIcon className={classes.dragIcon} />
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

});

const SortableList = SortableContainer(({ state, setState }: any) => {
  return (
    <ul>
      {state.map((item: any, index: number) => (
        <SortableItem key={`item-${item.name}`} index={index} elem={index} item={item.name} value={item['-selected']} setState={setState} />
      ))}
    </ul>
  );
});

export const SelectionHold = () => {

  // Get data
  const initialState = useSelector( state => {
    if("root" in state.data){
      return state.data.root.selections.selection[0].values.value;
    }
  });

  const [ state, setState ] = useState(initialState)

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setState((prevState: any) => arrayMove(prevState, oldIndex, newIndex));
  };
 
  return (
    <SortableList
      state={state}
      setState={setState}
      onSortEnd={onSortEnd}
    />
  );
  
}