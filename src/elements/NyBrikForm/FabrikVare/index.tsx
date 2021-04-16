import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "96%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export const FabrikVare = () => {
  const classes = useStyles();
  const [fabrikVare, setFabrikVare] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFabrikVare(event.target.value as string);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="fabrik-vare">Fabrik Vare</InputLabel>
        <Select
          labelId="fabrik-vare"
          id="fabrik-vare"
          value={fabrikVare}
          onChange={handleChange}
          label="fabrik-vare"
        >
          <MenuItem value={"1"}>1</MenuItem>
          <MenuItem value={"2"}>2</MenuItem>
          <MenuItem value={"3"}>3</MenuItem>
          <MenuItem value={"4"}>4</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
