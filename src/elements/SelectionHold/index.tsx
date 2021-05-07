// Core
import React, { useEffect, useState } from "react";

// React sortable hoc
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

// Material
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DragHandleIcon from "@material-ui/icons/DragHandle";

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

const SortableItem = SortableElement(({ item, value, setStateSort, elem }: any) => {

  const classes = useStyles();
  const [ el, setEl ] = useState(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setStateSort( (prevState: any) => {
        prevState[elem]['-selected'] = event.target.checked
        setEl(event.target.checked)
        return prevState
      })
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

const SortableList = SortableContainer(({ stateSort, setStateSort }: any) => {

  return (
    <ul>
      {stateSort.map((item: any, index: number) => (
        <SortableItem key={`item-${item.name}`} index={index} elem={index} item={item.name} value={item['-selected']} setStateSort={setStateSort} />
      ))}
    </ul>
  );
});

export const SelectionHold = ({ hold, setHold }: any) => {


  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setHold((prevState: any) => arrayMove(prevState, oldIndex, newIndex));
  };
 
  return (
    <SortableList
      stateSort={hold}
      setStateSort={setHold}
      onSortEnd={onSortEnd}
    />
  );
  
}