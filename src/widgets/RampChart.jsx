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
  // Common widget specific styles
  const widgetStyle = useWidgetStyles();

  // state
  const [rampData, setRampData] = useState([]);
  const [chart, setChart] = useState();
  const [open, setOpen] = React.useState(true);

  // To refere to chart element in dom
  const chartEl = useRef();

  // To handle widget close/open
  const handleClick = () => {
    setOpen(!open);
  };
  const debounceWait = 4000; // 4 seconds
  // debounce setRampData to skip some update beats
  const delayedSetRampData = debounce(
    (data) => setRampData(data),
    debounceWait,
    {
      leading: true,
      maxWait: debounceWait,
    }
  );

  useEffect(() => {
    // Setup to receive ramp data updates
    getRampAlgorithms((data) => {
      delayedSetRampData(data);
    });

    // Init chart with default options
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
    // Null checks
    if (!chart) return;
    if (!rampData.length) return;
    if (!chartEl.current) return;

    // sorted unique labels
    let uniqueLabels = Array.from(
      new Set(rampData.map((r) => r.algorithm))
    ).sort();

    // count data for unique values
    let data = uniqueLabels.map(
      (a) => rampData.filter((r) => r.algorithm === a).length
    );
    chart.data.labels = uniqueLabels;
    chart.data.datasets[0].data = data;
    chart.update();         // Update the chart after updating data
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
