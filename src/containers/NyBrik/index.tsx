// Core
import React, { useState, useEffect } from "react";

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

// Types
import { Project } from '../../bus/briks/dataTypes';

// Hooks
import { useBriksMutations } from '../../bus/briks/';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

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

  let isDisabled = true;
  if(localStorage.getItem('schedulerUserType') === 'edit')
  isDisabled = false

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
    id: "null",
    regionId: "null",
    leaderId: "null",
    projectNo: "null",
    factoryItemName: "null",
    factoryItemId: "null",
    customerId: "null",
    customerName: "null",
    state: "2",
    status: "null",
    name: "null",
    name2: "null",
    startDate: "null",
    endDate: "null",
    duration: 0,
    calculatedDuration: 0,
    weekendWork: false,
    jobType: "null",
    teamId: "null",
    factoryId: "null",
    tons: 0.0,
    area: 0.0,
    color: "null",
    eventColor: "#469e38",
    details: "null"
  }

  const initialValidation = {
    region: false,
    kundeNavn: false,
    hold: false
  }

  const [validation, setValidation] = useState<any>(initialValidation)

  const [newBrik, setNewBrik] = useState<Project>(initialBrik)

  // console.log("newBrik", newBrik)
  // console.log({validation})
  // Clean request data
  const bodyNewBrik = { ...newBrik }
  delete bodyNewBrik.eventColor

  const onSave = () => {
    if(newBrik.regionId !== 'null' && newBrik.name !== 'null' && newBrik.teamId !== 'null'){
      createBrik(newBrik)

    } else {
      setValidation( (prevState: any) => {
        const newState = { 
          region: newBrik.regionId,
          arbejdsplads: newBrik.name,
          hold: newBrik.teamId,
        }
        return newState
      })
      // console.log("fields not fill")
    }
  }

  const onMouseUpHandler = () => {
    if(newBrik.regionId !== 'null' && newBrik.name !== 'null' && newBrik.teamId !== 'null'){
      toggleDrawer("left", false)
    } else {
    }
    
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

      <NyBrikForm setNewBrik={setNewBrik} validation={validation} setValidation={setValidation} />

      <Divider />
      <DialogActions>
        <Button
          onClick={toggleDrawer("left", false)}
          color="secondary"
        >
          CANCEL
        </Button>
        <Button
          type="submit"
          onMouseDown={ () => onSave() }
          onMouseUp={ () => onMouseUpHandler() }
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
      <Button disabled={isDisabled} className={classes.nyBrik} onClick={toggleDrawer("left", true)}>
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
