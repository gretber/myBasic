// Core
import React from "react";

// Material
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

//Hooks
import { useSelector } from '../../../hooks/useSelector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Autocomplete: {
      margin: theme.spacing(1),
      width: "96%",
    },
  })
);

export const Project = ({ setProjectName }: any) => {
  // Styles
  const classes = useStyles();

  // Get data
  const projects: any = [];
  useSelector( state => {
    if("root" in state.data){
      return state.data.root.projects.project.map( project => {
        if(project.projectNo !== 'null'){
          projects.push({ number: project.projectNo, title: project.name })
        }
        return
      })
    }
  })

  // Handler
  const handlerOnChange = (event: any) => {
    if(event.target.innerText){
      const title = event.target.innerText.match(/(?<=-).+/)[0];
      setProjectName(title)
    }
  }

  return (
    <div>
      <Autocomplete
        className={classes.Autocomplete}
        id="project"
        options={projects?projects:[]}
        onChange={handlerOnChange}
        getOptionLabel={(option: any) => option?`${option.number} - ${option.title}`:''}
        renderInput={(params) => (
          <TextField {...params} label="Project" variant="outlined" />
        )}
      />
    </div>
  );
};


