// Core
import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Elements
import { SelectionHold } from "../../elements/SelectionHold";
import { SelectionRegion } from "../../elements/SelectionRegion";
import { SelectionFabrik } from "../../elements/SelectionFabrik";


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const SelectionTabs = ({ hold, setHold, region, setRegion, fabrik, setFabrik, isFabrikChosen, setIsFabrikChosen}: any) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="selection tab"
        >
          <Tab label="Hold" {...a11yProps(0)} />
          <Tab label="Region" {...a11yProps(1)} />
          <Tab label="Fabrik" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SelectionHold hold={hold} setHold={setHold} isFabrikChosen={isFabrikChosen} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SelectionRegion region={region} setRegion={setRegion} isFabrikChosen={isFabrikChosen} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SelectionFabrik  fabrik={fabrik}
                          setFabrik={setFabrik}
                          isFabrikChosen={isFabrikChosen}
                          setIsFabrikChosen={setIsFabrikChosen}
                          setRegion={setRegion}
                          setHold={setHold} />
      </TabPanel>
    </div>
  );
};
