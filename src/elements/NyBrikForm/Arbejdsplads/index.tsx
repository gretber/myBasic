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
    setProjectName(event.target.value)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="arbejdsplads" label="Arbejdsplads" variant="outlined" onChange={onChangeHandler} value={projectName} />
    </form>
  );
}
