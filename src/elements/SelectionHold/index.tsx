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

const SortableItem = SortableElement(({ value }: any) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    [value]: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <FormGroup className={classes.iconCenter} row>
      <DragHandleIcon className={classes.dragIcon} />
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

});

const SortableList = SortableContainer(({ items }: any) => {
  return (
    <ul>
      {items.map((value: any, index: any) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export const SelectionHold = () => {
  const initialState = {
    items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"],
  };

  const [ items, setItems ] = useState(initialState)
  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setItems(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
 
  return (
    <SortableList
      items={items.items}
      onSortEnd={onSortEnd}
    />
  );
  
}