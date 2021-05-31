import { Drawer, makeStyles } from "@material-ui/core";
import React from "react";
import DelayedRoutes from "../../widgets/DelayedRoutes";
import RampChart from "../../widgets/RampChart";
import Weather from "../../widgets/Weather";
const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#030303",
    color: "#C0C0C0",
    padding: "15px",
    width: drawerWidth,
    margin: "10px 0",
  },
}));

function Sidebar() {
  const classes = useStyles();

  return (
    <Drawer
      classes={{ paper: classes.root }}
      open={true}
      anchor={"left"}
      variant="persistent"
    >
      <Weather></Weather>
      <DelayedRoutes></DelayedRoutes>
      <RampChart></RampChart>
    </Drawer>
  );
}

export default Sidebar;
