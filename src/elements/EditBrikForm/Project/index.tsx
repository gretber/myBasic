// Core
import React, { useEffect, useState } from "react";

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// Types
import { ProjectNo } from './types';

// API
import { selectionProjects } from './api/selectionProjects';
import { selectionProjectDetails } from './api/selectionProjectDetails';
import { getProjectDetails } from './api/getProjectDetails';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Autocomplete: {
      margin: theme.spacing(1),
      width: "96% !important",
    },
  })
);

export const Project = ({ setProjectName, setProjectNo, regionId, setRegionId, setCustomerName, setCustomerId, setFactoryId }: any) => {
  // Styles
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Array<ProjectNo>|[]>([]);
  
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    // If there is no region get all projects
    if(!regionId){
      selectionProjects(setOptions, active)
    }

    // If region exist get projects in this region
    if(regionId){
      selectionProjectDetails(setOptions, active, regionId)
    }

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // Handler
  const handlerOnChange = (event: any, value: any) => {
    if(value && ('name' in value) && ('id' in value)){
      getProjectDetails(setRegionId, value.id, setCustomerName, setCustomerId, setFactoryId)
      setProjectName(value.name)
      setProjectNo(value.id)
    } else {
      setRegionId('')
      setProjectName('')
    }
  }

  return (
    <Autocomplete
      className={classes.Autocomplete}
      id="project"
      onChange={handlerOnChange}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option: any) => `${option.id} - ${option.name}`}
      renderOption={(option) => (
        <React.Fragment>
          <Typography variant='body1'>{`${option.id} - ${option.name}`}</Typography>
        </React.Fragment>
      )}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Project"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
