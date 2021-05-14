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

// Material
import Button from "@material-ui/core/Button";
import { Divider } from '@material-ui/core';

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

const SortableItem = SortableElement(({ item, value, setHold, elem, isFabrikChosen }: any) => {

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setHold( (prevState: any) => {
      const newState = [...prevState]
      newState[elem]['-selected'] = event.target.checked
      return newState
    })
  };

  const disabled = isFabrikChosen;

  return (
    <FormGroup className={classes.iconCenter} row>
      <DragHandleIcon className={classes.dragIcon} />
      <FormControlLabel
        control={
          <Checkbox
            disabled={disabled}
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

});

const SortableList = SortableContainer(({ stateSort, setHold, isFabrikChosen }: any) => {

  useEffect(()=>{
    if(isFabrikChosen){
      setHold((prevState: any) => {
        const newState = prevState.map( (item: any) => {
          return (
            {...item, "-selected": true}
          ) 
        })

        return newState
      })
    }
  },[isFabrikChosen])

  return (
    <ul>
      {stateSort.map((item: any, index: number) => (
        <SortableItem key={`item-${item.name}`} index={index} elem={index} item={item.name} value={isFabrikChosen?true:item['-selected']} setHold={setHold} isFabrikChosen={isFabrikChosen} />
      ))}
    </ul>
  );
});

export const SelectionHold = ({ hold, setHold, isFabrikChosen }: any) => {

  const onSelectAll = () => {
    setHold((prevState: any)=>{
      const newState = prevState.map( (item: any) => {
        return (
          {...item, "-selected": true}
        )
      })
      return newState
    })
  }

  const onUnselectAll = () => {
    setHold((prevState: any)=>{
      const newState = prevState.map( (item: any) => {
        return (
          {...item, "-selected": false}
        )
      })
      return newState
    })
  }

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setHold((prevState: any) => arrayMove(prevState, oldIndex, newIndex));
  };
 
  return (
    <>
    <Button variant="contained"
            color="primary"
            style={{margin: "0 16px 16px 16px"}}
            onClick={onSelectAll}>
      Select all
    </Button>
    <Button variant="outlined"
            color="secondary"
            style={{margin: "0 0 16px 0"}}
            onClick={onUnselectAll}>
      Unselect all
    </Button>
    <Divider />
    <SortableList
      stateSort={hold}
      setHold={setHold}
      isFabrikChosen={isFabrikChosen}
      onSortEnd={onSortEnd}
    />
    </>
  );
  
}