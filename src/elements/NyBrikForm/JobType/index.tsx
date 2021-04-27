// Core
import React from "react";

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

// Hooks
import { useSelector } from '../../../hooks/useSelector';

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
  // Styles
  const classes = useStyles();

  // Get job types
  const jobs = useSelector( state => {
    if("root" in state.data){
      return state.data.root.jobTypes.jobType;
    }
  });

  // Init State
  const [jobType, setJobType] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value)
    setJobType(event.target.value as string);
  };

  // Job list
  const formControlLabelJSX = jobs?
  jobs.map( job => {
    return <MenuItem key={job.id} value={job.name}>{job.name}</MenuItem>

  }):null

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
          {formControlLabelJSX}
        </Select>
      </FormControl>
    </div>
  );
};
