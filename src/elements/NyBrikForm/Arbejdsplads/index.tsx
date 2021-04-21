// Core
import React, { useState, useMemo } from "react";

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

export const Arbejdsplads = ({ projectName = '' }: any) => {
  const classes = useStyles();
  
  const [ input, setInput ] = useState('')

  useMemo(() => {
    setInput(projectName)
  }, [projectName])

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Arbejdsplads" variant="outlined" onChange={(event)=>setInput(event.target.value)} value={input} />
    </form>
  );
}
