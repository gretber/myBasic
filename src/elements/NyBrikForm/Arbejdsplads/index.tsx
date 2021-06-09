// Core
import React from "react";

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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

export const Arbejdsplads = ({ projectName, setProjectName }: any) => {
  
  // Style
  const classes = useStyles();
  
  // Handler
  const onChangeHandler = (event: any) => {
    if(!event.target.value){
      setProjectName("null")
    } else {
      setProjectName(event.target.value)
    }
  }

  return (
    <div className={classes.root}>
      <TextField id="arbejdsplads" label="Arbejdsplads" variant="outlined" onChange={onChangeHandler} value={projectName==='null'?'':projectName} />
    </div>
  );
}
