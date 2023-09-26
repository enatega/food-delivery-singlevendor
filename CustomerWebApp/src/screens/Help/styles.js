import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  btnView: {
    "&:hover .MuiCardActionArea-focusHighlight": {
      opacity: 0,
    },
  },
  bold: {
    fontWeight: "500",
  },
  mainView: {
    paddingTop: theme.spacing(8),
  },
  cardView: {
    width: "100%",
    boxShadow: theme.shadows[5],
    borderRadius: 20,
    margin: theme.spacing(2, 0),
  },
  row: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
export default useStyle;
