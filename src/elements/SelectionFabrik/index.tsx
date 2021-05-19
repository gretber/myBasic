// Core
import React, { useEffect } from 'react';

// Hooks
import { useSelector } from "../../hooks/useSelector";

// Components
import { Item } from "./item";

export const SelectionFabrik = ({ fabrik, setFabrik, isFabrikChosen, setIsFabrikChosen, setRegion, setHold }: any) => {
  
  // Get data
  const initialState = useSelector( state => {
    if("root" in state.data){
      return state.data.root.selections.selection[2].values.value;
    }
  });

  useEffect(()=>{
    setRegion((prevState: any)=>{
      const newState = prevState.map( (item: any) => {
        return (
          {...item, "-selected": true}
        ) 
      })
      
      return newState
    })
  },[isFabrikChosen])

  useEffect(()=>{
    setHold((prevState: any)=>{
      const newState = prevState.map( (item: any) => {
        return (
          {...item, "-selected": true}
        ) 
      })
      
      return newState
    })
  },[isFabrikChosen])

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

  return <>{itemJSX}</>;
};
