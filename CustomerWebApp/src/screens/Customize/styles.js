import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    padding: theme.spacing(0, 3),
  },
  mainContainer: {
    marginTop: "80px",
    justifyContent:'center',
    alignItems:'center'
  },
  center: {
    justifyContent: "center",
    alignItems:'center',
    
  },
  pl:{
    paddingLeft:theme.spacing(1)
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textBold: {
    fontWeight: 700,
  },
  smallText: {
    color: theme.palette.text.disabled,
    fontSize: "0.875rem",
    padding: theme.spacing(0, 2),
  },
  bottomContainer: {
    marginTop: theme.spacing(10),
    backgroundColor: theme.palette.grey[100],
  },
}));

export default useStyles;
