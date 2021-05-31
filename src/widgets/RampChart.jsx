import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Chart } from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import getRampAlgorithms from "../backend/rampdata";
import useWidgetStyles from "./widgetStyle";
import chartlabels from "chartjs-plugin-labels";
import debounce from "lodash/debounce";

Chart.plugins.register(chartlabels);

function RampChart() {
  const widgetStyle = useWidgetStyles();

  // state
  const [rampData, setRampData] = useState([]);
  const [chart, setChart] = useState();
  const [open, setOpen] = React.useState(true);

  const chartEl = useRef();

  const handleClick = () => {
    setOpen(!open);
  };
  const debounceWait = 4000; // 4 seconds
  const delayedSetRampData = debounce(
    (data) => setRampData(data),
    debounceWait,
    {
      leading: true,
      maxWait: debounceWait,
    }
  );

  useEffect(() => {
    getRampAlgorithms((data) => {
      delayedSetRampData(data);
    });

    setChart(
      new Chart(chartEl.current, {
        type: "doughnut",
        plugins: [chartlabels],
        data: {
          datasets: [
            {
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderWidth: 0,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          aspectRatio: 1,
        },
      })
    );
  }, [chartEl]);

  useEffect(() => {}, [chartEl]);

  useEffect(() => {
    if (!chart) return;
    if (!rampData.length) return;
    if (!chartEl.current) return;

    // sorted unique labels
    let uniqueLabels = Array.from(
      new Set(rampData.map((r) => r.algorithm))
    ).sort();

    let data = uniqueLabels.map(
      (a) => rampData.filter((r) => r.algorithm === a).length
    );
    chart.data.labels = uniqueLabels;
    chart.data.datasets[0].data = data;
    chart.update();
  }, [rampData, chart, chartEl]);

  return (
    <Paper className={widgetStyle.widget}>
      <List classes={{ root: widgetStyle.noPadding }}>
        <ListItem onClick={handleClick} className={widgetStyle.widgetHeader}>
          <ListItemText className={widgetStyle.widgetHeaderText}>
            RAMP CHART
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto">
          <ListItem>
            <canvas id="rampChart" ref={chartEl}></canvas>
          </ListItem>
          <ListItem>
            <ListItemText>Ramp Algorithim blablabla</ListItemText>
          </ListItem>
        </Collapse>
      </List>
    </Paper>
  );
}

export default RampChart;
