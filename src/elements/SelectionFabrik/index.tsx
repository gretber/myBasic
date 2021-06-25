// Core
import React, { useEffect } from 'react';

// Hooks
import { useSelector } from "../../hooks/useSelector";

// Components
import { Item } from "./item";

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fabrikTitle: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 16,
    }
  })
);

export const SelectionFabrik = ({ fabrik, setFabrik, isFabrikChosen, setIsFabrikChosen, setRegion, setHold }: any) => {

  const classes = useStyles();
  
  // Get data
  const initialState = useSelector( state => {
    if("root" in state.data){
      return state.data.root.selections.selection[2].values.value;
    }
  });

  useEffect(()=>{
    if(isFabrikChosen){
      setRegion((prevState: any)=>{
        const newState = prevState.map( (item: any) => {
          return (
            {...item, "-selected": true}
          ) 
        })
        return newState
      })
    }
  },[fabrik])

  useEffect(()=>{
    if(isFabrikChosen){
      setHold((prevState: any)=>{
        const newState = prevState.map( (item: any) => {
          return (
            {...item, "-selected": true}
          ) 
        })
        
        return newState
      })
    }
  },[fabrik])

  const itemJSX = fabrik?fabrik.map((item: any, index: number) => {
    return (
      <Item fabrik={fabrik}
            key={item.name}
            index={index}
            item={item.name}
            value={item['-selected']}
            setFabrik={setFabrik}
            isFabrikChosen={isFabrikChosen}
            setIsFabrikChosen={setIsFabrikChosen} />
    )})
    :null;

  return (
    <>
      <div className={classes.fabrikTitle}>Brikker placeret på en angivet enhed.</div>
      {itemJSX}
    </>
  );
};
