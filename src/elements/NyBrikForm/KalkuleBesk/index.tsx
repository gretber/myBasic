// Core
import React, { useState } from "react";

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

export const KalkuleBesk = ({setName2, name2}: any) => {
// Styles
const classes = useStyles();

 // Handler
  const onChangeHandler = (event: any) => {
    setName2(event.target.value)
    setKalkule(event.target.value)
  }

  const [kalkule, setKalkule] = useState(name2==="null"?'':name2)

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="kalkule-besk" label="Kalkule Besk" variant="outlined" multiline rows={4} onChange={onChangeHandler} value={kalkule} />
    </form>
  );
};
