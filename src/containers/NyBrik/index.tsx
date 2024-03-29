// Core
import React, { useState } from "react";

// Material
import {
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import MuiDialogActions from "@material-ui/core/DialogActions";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";

// Elements
import { NyBrikForm } from "../../components/NyBrikForm";

// Store
import { store } from '../../@init';

// Actions
import { setNuBrikAction } from '../../bus/briks/actions';

// Types
import { Project } from '../../bus/briks/dataTypes';

// Hooks
import { useBriksMutations } from '../../bus/briks/';

const useStyles = makeStyles({
  list: {
    width: "500px",
  },
  anchor: {
    overflowAnchor: "none",
  },
  nyBrik: {
    marginRight: 16,
  },
  nyBrikIcon: {
    marginRight: 8,
  }
});

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: '#000',
    },
  });

type Anchor = "left";

export const NyBrik = () => {
  // Styles
  const classes = useStyles();

  // Init
  const [state, setState] = useState({
    left: false,
  });

  const { createBrik } = useBriksMutations();

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    setState({ ...state, left: open });
  };

  interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: any;
  }

  const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;

    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogActions = withStyles((theme: Theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  const initialBrik = {
    id: null,
    regionId: "",
    leaderId: "",
    projectNo: null,
    factoryItemName: "",
    factoryItemId: null,
    customerId: null,
    customerName: null,
    state: "2",
    status: "",
    name: "",
    name2: "",
    startDate: "",
    endDate: "",
    duration: 0,
    calculatedDuration: 0,
    weekendWork: false,
    jobType: null,
    teamId: "",
    factoryId: "",
    tons: 0.0,
    area: 0.0,
    color: "",
    eventColor: "#469e38",
    details: ""
  }

  const [ newBrik, setNewBrik ] = useState<Project>(initialBrik)
  
  //console.log("newBrik", newBrik)
  
  // Clean request data
  const bodyNewBrik = { ...newBrik }
  delete bodyNewBrik.eventColor

  const onSave = () => {
    createBrik(newBrik)
  }

  const list = (
    <div className={classes.list} role="presentation">
      <DialogTitle
        id="title"
        onClose={toggleDrawer("left", false)}
      >
        Ny brik
      </DialogTitle>
      <Divider />

      <NyBrikForm setNewBrik={setNewBrik} />

      <Divider />
      <DialogActions>
        <Button
          onClick={toggleDrawer("left", false)}
          color="secondary"
        >
          CANCEL
        </Button>
        <Button
          onMouseDown={onSave}
          onClick={toggleDrawer("left", false)}
          color="primary"
        >
          <SaveRoundedIcon />
          SAVE
        </Button>
      </DialogActions>
    </div>
  );

  return (
    <div>
      <Button className={classes.nyBrik} onClick={toggleDrawer("left", true)}>
        <NoteAddRoundedIcon className={classes.nyBrikIcon} />
        Ny brik
      </Button>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list}
      </Drawer>
    </div>
  );
};
