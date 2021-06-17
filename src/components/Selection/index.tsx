// Core
import React, {useEffect, useState} from "react";

// Material
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";

// Components
import { SelectionTabs } from "../SelectionTabs";

// Hooks
import { useBriksMutations } from '../../bus/briks';
import { useSelector } from '../../hooks/useSelector';

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

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
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

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      padding: 0,
    }
  })
);

export const Selection = () => {
  
  const { updateSelection } = useBriksMutations();

  // Get hold data
  const initialHoldState = useSelector( state => {
    if("root" in state.data){
      return state.data.root.selections.selection[0].values.value;
    }
  });

  // Get region data
  const initialRegionState = useSelector( state => {
    if("root" in state.data){
      return state.data.root.selections.selection[1].values.value;
    }
  });

  // Get fabrik data
  const initialFabrikState = useSelector( state => {
    if("root" in state.data){
      return state.data.root.selections.selection[2].values.value;
    }
  });

  const [open, setOpen] = useState(false);
  const [hold, setHold] = useState<any>(initialHoldState)
  const [region, setRegion] = useState<any>(initialRegionState)
  const [fabrik, setFabrik] = useState<any>(initialFabrikState)
  const [isFabrikChosen, setIsFabrikChosen] = useState<any>(false)

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSaveClick = () => {
    updateSelection({
      root: {
        selections: {
          selection: [
            {
              type: 'team',
              values: {
                value: hold
              }
            },
            {
              type: 'region',
              values: {
                value: region
              }
            },
            {
              type: 'factory',
              values: {
                value: fabrik
              }
            }
          ]
        }
      }
    })
    setOpen(false);
  }

  useEffect(()=>{
    if(fabrik){
      const isFabrikChosen = fabrik.findIndex( (item: any) =>  item["-selected"] === true )
      isFabrikChosen === -1?setIsFabrikChosen(false):setIsFabrikChosen(true)
      console.log({isFabrikChosen})
    }
  },[fabrik])

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Selection
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Selection
        </DialogTitle>

        <DialogContent className={classes.dialogContent} dividers>
          <SelectionTabs  hold={hold}
                          setHold={setHold}
                          region={region}
                          setRegion={setRegion}
                          fabrik={fabrik}
                          setFabrik={setFabrik}
                          isFabrikChosen={isFabrikChosen}
                          setIsFabrikChosen={setIsFabrikChosen}/>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>

          <Button onClick={handleOnSaveClick} color="primary">
            <SaveRoundedIcon />
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
