import { Grid, makeStyles, Typography } from "@material-ui/core";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import React from "react";
import { WiDayCloudy } from "weather-icons-react";

// Component specific styles
const useStyles = makeStyles((theme) => ({
  numbers: {
    fontWeight: "900",
    color: "#ffffff",
  },
  weatherItems: {
    width: "100%",
    padding: "0.5rem",
    color: "#C0C0C0",
  },
  text: {
    fontSize: "12px",
  },
  root: {
    width: "0.8rem",
    height: "0.8rem",
  },
}));

function Weather() {
  const classes = useStyles();
  return (
    <Grid container elevation={0} className={classes.weatherItems}>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <Typography variant={"body1"}>Melbourne</Typography>
        <Typography
          style={{ fontWeight: "bold", color: "#ffffff" }}
          variant={"h4"}
        >
          32&#176;
        </Typography>
        <Typography className={classes.text}>Tue 16th&ensp;3:46PM</Typography>
      </Grid>
      <Grid item xs={6}>
        <WiDayCloudy size={110} color="#fff" />
      </Grid>
      <Grid item xs={12}>
        <table className={classes.weatherItems}>
          <tbody>
            <tr>
              <td>Humidity</td>
              <td className={classes.numbers}>78%</td>
            </tr>
            <tr>
              <td>Chance of Rain</td>
              <td className={classes.numbers}>34%</td>
            </tr>
            <tr>
              <td>Wind</td>
              <td>
                <span className={classes.numbers}>21</span>
                {" kmh"}
              </td>
            </tr>
            <tr>
              <td>Tomorrow</td>
              <td className={classes.numbers}>
                30&#176;
                <WbSunnyOutlinedIcon classes={{ root: classes.root }} />
              </td>
            </tr>
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
}
export default Weather;
