// Core
import React, { useState, useEffect, useMemo } from "react";

// Material
import Button from "@material-ui/core/Button";
import { Divider } from '@material-ui/core';

// Components
import { Item } from "./item";

export const SelectionRegion = ({ region, setRegion, isFabrikChosen }: any) => {
  
  useEffect(()=>{
    if(isFabrikChosen){
      setRegion((prevState: any) => {
        const newState = prevState.map( (item: any) => {
          return (
            {...item, "-selected": true}
          ) 
        })
        return newState
      })
    }
  },[isFabrikChosen])

  const itemJSX = useMemo(()=>{
    return region?region.map((item: any, index: number) => {
      return (
        <Item key={item["-id"]}
              index={index}
              item={item.name}
              isFabrikChosen={isFabrikChosen}
              value={isFabrikChosen?true:item['-selected']}
              setRegion={setRegion} />
      )
    }):null

  },[region])

  const onSelectAll = () => {
     setRegion((prevState: any)=>{
      const newState = prevState.map( (item: any) => {
        return (
          {...item, "-selected": true}
        )
      })
      return newState
    })
  }

  const onUnselectAll = () => {
    setRegion((prevState: any)=>{
      const newState = prevState.map( (item: any) => {
        return (
          {...item, "-selected": false}
        )
      })
      return newState
    })
  }
  
  return (
    <>
      <Button variant="contained"
              disabled={isFabrikChosen}
              color="primary"
              style={{margin: "0 16px 16px 16px"}}
              onClick={onSelectAll}>
        Select all
      </Button>
      <Button variant="outlined"
              disabled={isFabrikChosen}
              color="secondary"
              style={{margin: "0 0 16px 0"}}
              onClick={onUnselectAll}>
        Unselect all
      </Button>
      <Divider />
      { itemJSX }
    </>
  )
}