// Core
import React from "react";
import { useSelector } from '../../hooks/useSelector';

// Material
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
  // Styles
  const classes = useStyles();

  // Get job types
  const jobs = useSelector( state => {
    if("root" in state.data){
      return state.data.root.jobTypes.jobType;
    }
  });

  const initState = jobs?
  jobs.reduce(function(result: any, item: any) {
      result[item.name] = true;
      return result;
    }, {})
  :null

  
  // Init State
  const [jobType, setJobType] = React.useState<string[]>([]);
  const [state, setState] = React.useState(initState);

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    if(state){
      setState({ ...state, [event.target.name]: event.target.checked });
      console.log(event.target.checked);
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setJobType(event.target.value as string[]);
  };

  // Job list
  const formControlLabelJSX = jobs?
  jobs.map( job => {
    return(
      <FormControlLabel
        className={classes.label}
        key={job.name}
        control={
          <Checkbox
            checked={state[job.name]}
            onChange={handleChangeCheckbox}
            name={job.name}
            color="primary"
          />
        }
        label={job.name}
      />
    )
  }):null

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          multiple
          displayEmpty
          value={jobType}
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
            { formControlLabelJSX }
          </FormGroup>
        </Select>
      </FormControl>
    </div>
  );
};
