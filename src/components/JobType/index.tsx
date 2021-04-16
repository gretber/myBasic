import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 240,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formGroup: {
      padding: "0 16px",
      "&:focus": {
        outline: "none",
      },
    },

    label: {
      width: "100%",
    }
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      margin: '0 auto'
    },
  },
};


export const JobType = () => {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState<string[]>([]);
  
  const [state, setState] = React.useState({
    common: true,
    fræs: true,
    striber: true,
    opretning: true,
  });

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(event.target.checked);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };


  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
          renderValue={() => <em>Job type</em>}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Job type</em>
          </MenuItem>
          <FormGroup row className={classes.formGroup}>
            <FormControlLabel
              className={classes.label}
              control={
                <Checkbox
                  checked={state.common}
                  onChange={handleChangeCheckbox}
                  name="common"
                  color="primary"
                />
              }
              label="Primary"
            />
            <FormControlLabel
              className={classes.label}
              control={
                <Checkbox
                  checked={state.fræs}
                  onChange={handleChangeCheckbox}
                  name="fræs"
                  color="primary"
                />
              }
              label="Fræs"
            />
            <FormControlLabel
              className={classes.label}
              control={
                <Checkbox
                  checked={state.striber}
                  onChange={handleChangeCheckbox}
                  name="striber"
                  color="primary"
                />
              }
              label="Striber"
            />
            <FormControlLabel
              className={classes.label}
              control={
                <Checkbox
                  checked={state.opretning}
                  onChange={handleChangeCheckbox}
                  name="opretning"
                  color="primary"
                />
              }
              label="Opretning"
            />
          </FormGroup>
        </Select>
      </FormControl>
    </div>
  );
};
