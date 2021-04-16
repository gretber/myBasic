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
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

type Anchor = "left";

export const NyBrik = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

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

  const list = (anchor: Anchor) => (
    <div className={classes.list} role="presentation">
      <DialogTitle
        id="customized-dialog-title"
        onClose={toggleDrawer("left", false)}
      >
        Ny brik
      </DialogTitle>
      <Divider />

      <NyBrikForm />

      <Divider />
      <DialogActions>
        <Button
          onClick={toggleDrawer("left", false)}
          color="secondary"
        >
          CANCEL
        </Button>
        <Button
          onClick={toggleDrawer("left", false)}
          color="secondary"
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
        {list("left")}
      </Drawer>
    </div>
  );
};
