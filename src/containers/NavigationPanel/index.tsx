// Core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";



// Icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

// Container
import { NyBrik } from "../NyBrik";

// Components
import { PeriodPicker } from "../../components/PeriodPicker";
import { JobType } from "../../components/JobType";
import { Selection } from "../../components/Selection";
import { WeekCountInput } from "../../components/WeekCountInput.tsx";

// Cookies
import { useCookies } from "react-cookie";


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

export const NavigationPanel = ({schedulerConfig, period, setAuthorized, jobTypes, setJobTypes}:
   {schedulerConfig: any, period: string, setAuthorized:React.Dispatch<React.SetStateAction<boolean>>, jobTypes:any, setJobTypes:any}) => {


  //  Cookies
   const [cookies, setCookie, removeCookie] = useCookies([]);

  // Styles
  const classes = useStyles();

  // Event Handlers
  const logOutButtonClickHandler = () => {

      for(let cook in cookies)
      {
        console.log('cook',cook);
        removeCookie(cook);
      }
       setAuthorized(false);
       localStorage.clear();
       
       // eslint-disable-next-line no-restricted-globals
      //  location.replace('http://mail.vej.dk/sn/icokal.nsf/version/v87');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NyBrik />
          <Selection />
          <div className={classes.gap} />
         
          <JobType jobTypes={jobTypes} setJobTypes={setJobTypes} /> 
          <PeriodPicker  period ={period} config={schedulerConfig} />
           
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
