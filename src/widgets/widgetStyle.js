import { makeStyles } from "@material-ui/core";

const useWidgetStyles = makeStyles((theme) => ({
  widget: {
    backgroundColor: "#151e27",
    color: "#ffffff",
    // padding: "1rem",
    margin: "10px 0",
  },
  widgetHeaderText: {
    fontSize: "12px",
  },
  widgetHeader: {
    paddingTop: "0",
    paddingBottom: "0",
    borderBottom: "1px #ffffff14 solid",
  },
  noPadding:{
    paddingTop: "0",
    paddingBottom: "0",
  }
}));

export default useWidgetStyles;
