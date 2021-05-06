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

export const KalkuleBesk = ({setName2}: any) => {
  // Styles
  const classes = useStyles();

  const onChangeHandler = (event: any) => {
    setName2(event.target.value)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="kalkule-besk"
        label="Kalkule Besk"
        variant="outlined"
        onChange={onChangeHandler}
        multiline
        rows={4}
      />
    </form>
  );
};
