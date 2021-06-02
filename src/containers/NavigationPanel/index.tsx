// Core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

// Icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

// Container
import { NyBrik } from "../NyBrik";

// Components
import { PeriodPicker } from "../../components/PeriodPicker";
import { JobType } from "../../components/JobType";
import { Selection } from "../../components/Selection";


// Hooks
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    gap: {
      flexGrow: 1,
    }
  })
);

export const NavigationPanel = ({schedulerConfig, setConfig, period, offLineEndDate, saveOffLineEndDate}:
   {schedulerConfig: any, setConfig:  React.Dispatch<any>, period: string, offLineEndDate: Date, saveOffLineEndDate: React.Dispatch<React.SetStateAction<Date>>}) => {

  // Styles
  const classes = useStyles();

  // Router history
    let history = useHistory();

 

  // Login Check
  useEffect(() => {
  
    if(localStorage.getItem('schedulerUserLogin') === null)
        {
            if(localStorage.getItem('schedulerUserPassword') === null)
            {
              history.push('/');
            }
        }
  });

  // Event Handlers
  const exitButtonClickHandler = () => {
  
    localStorage.removeItem('schedulerUserLogin');
    localStorage.removeItem('schedulerUserPassword');
    localStorage.removeItem('schedulerUserType');
    history.push('/');

  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NyBrik />
          <Selection />
          <div className={classes.gap} />
         
          {/* <JobType /> */}
          <PeriodPicker offLineEndDate={offLineEndDate} saveOffLineEndDate = {saveOffLineEndDate} period ={period} config={schedulerConfig} setConfig={setConfig}/>
          <Button disabled>
            <FullscreenIcon />
          </Button>
          <Button onClick = {exitButtonClickHandler}>
            <ExitToAppIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
