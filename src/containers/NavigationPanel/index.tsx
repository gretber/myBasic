// Core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// 


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
// import { useEffect } from "react";

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

export const NavigationPanel = ({schedulerConfig, period, offLineEndDate, setAuthorized}:
   {schedulerConfig: any, period: string, offLineEndDate: Date, setAuthorized:React.Dispatch<React.SetStateAction<boolean>>}) => {

  // Styles
  const classes = useStyles();

  // Event Handlers
  const logOutButtonClickHandler = () => {
    setAuthorized(false);
    localStorage.clear();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NyBrik />
          <Selection />
          <div className={classes.gap} />
         
          {/* <JobType /> */}
          <PeriodPicker offLineEndDate={offLineEndDate} period ={period} config={schedulerConfig} />
          <Button disabled>
            <FullscreenIcon />
          </Button>
          <Button onClick = {logOutButtonClickHandler}>
            <ExitToAppIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
