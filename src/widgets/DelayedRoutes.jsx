import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React from "react";
import useWidgetStyles from "./widgetStyle";

const useStyles = makeStyles((theme) => ({
  yellow: {
    color: "#febe10",
  },
  red: {
    color: "#e60026",
  },
  routeIco: {
    fontSize: "15px",
  },
  routeItem: {
    borderBottom: "1px #ffffff14 solid",
  },
  routeTime: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  routeSmallText: {
    fontSize: "10px",
  },
  routeText: {
    fontSize: "14px",
  },
  bold: {
    fontWeight: "900",
  },
}));

function DelayedRoutes() {
  const classes = useStyles();
  const widgetStyle = useWidgetStyles();

  // state
  const [open, setOpen] = React.useState(true);

  // To handle widget close/open
  const handleClick = () => {
    setOpen(!open);
  };

  const routes = [
    {
      route: "Monash Fwy Out",
      nextSt1: "Kings Way",
      nextSt2: "EastLink",
      km: "13km",
      hours: "45",
    },
    {
      route: "Monash Fwy Out",
      nextSt1: "Kings Way",
      nextSt2: "EastLink",
      km: "15km",
      hours: "28",
    },
    {
      route: "Western Ring Rd",
      nextSt1: "West Gate Fwy",
      nextSt2: "Western Fwy",
      km: "5km",
      hours: "5",
    },
    {
      route: "Eastern Fwy",
      nextSt1: "Hoddle St",
      nextSt2: "Springvale Rd",
      km: "15km",
      hours: "25",
    },
  ];
  return (
    <Paper className={widgetStyle.widget}>
      <List classes={{ root: widgetStyle.noPadding }}>
        <ListItem onClick={handleClick} className={widgetStyle.widgetHeader}>
          <ListItemText className={widgetStyle.widgetHeaderText}>
            DELAYED ROUTES
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {routes.map((item, index) => (
            <ListItem
              key={index}
              className={index !== routes.length - 1 ? classes.routeItem : ''}
            >
              <Grid container spacing={1}>
                <Grid item xs={1} className={classes.routeIco}>
                  <FiberManualRecordIcon
                    className={+item.hours > 25 ? classes.yellow : classes.red}
                    fontSize="inherit"
                  />
                  <ArrowDownwardIcon fontSize="inherit" />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant={"body1"} className={classes.routeText}>
                    {item.route}
                  </Typography>
                  <Typography
                    variant={"body2"}
                    className={classes.routeSmallText}
                  >
                    {item.nextSt1}
                  </Typography>
                  <Typography
                    variant={"body2"}
                    className={classes.routeSmallText}
                  >
                    {item.nextSt2}
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "right" }}>
                  <Typography
                    variant={"body2"}
                    className={classes.routeSmallText}
                  >
                    {item.km}
                  </Typography>
                  <Typography variant={"body1"}>
                    <span className={classes.routeTime}>{item.hours}</span>
                    <span className={classes.routeSmallText} color={"#f0f0f0"}>
                      &nbsp;min
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </Collapse>
      </List>
    </Paper>
  );
}

export default DelayedRoutes;
