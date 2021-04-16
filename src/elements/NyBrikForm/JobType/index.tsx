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

export const JobType = () => {
  const classes = useStyles();
  const [jobType, setJobType] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setJobType(event.target.value as string);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="job-type">Job type</InputLabel>
        <Select
          labelId="job-type"
          id="job-type"
          value={jobType}
          onChange={handleChange}
          label="job-type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"common"}>Common</MenuItem>
          <MenuItem value={"fræs"}>Fræs</MenuItem>
          <MenuItem value={"striber"}>Striber</MenuItem>
          <MenuItem value={"opretning"}>Opretning</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
