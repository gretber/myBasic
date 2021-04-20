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

export const NavigationPanel = () => {

  // Styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NyBrik />
          <Selection />
          <div className={classes.gap} />
          <JobType />
          <PeriodPicker />
          <Button>
            <FullscreenIcon />
          </Button>
          <Button>
            <ExitToAppIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
