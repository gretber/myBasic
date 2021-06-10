// Core
import React from "react";

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "96%",
      },
    },
  })
);

export const Arbejdsplads = ({ projectName, setProjectName, validation, setValidation }: any) => {
  
  // Style
  const classes = useStyles();
  
  // Handler
  const onChangeHandler = (event: any) => {
    if(!event.target.value){
      setProjectName("null")
    } else {
      
      setValidation((prevState: any)=>{
        const newState = {...prevState, arbejdsplads: false}
        return newState
      })

      setProjectName(event.target.value)
    }
  }

  return (
    <div className={classes.root}>
      <TextField id="arbejdsplads" label="Arbejdsplads*" variant="outlined" onChange={onChangeHandler} value={projectName==='null'?'':projectName} />
      { validation.arbejdsplads == "null" &&
        <FormHelperText style={{margin: "-8px 0 0 16px"}} error={true}>
          Arbejdsplads er påkrævet
        </FormHelperText>
      }
    </div>
  );
}
