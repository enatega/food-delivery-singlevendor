import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  mainView: {
    paddingTop: theme.spacing(8),
  },
  cardView: {
    width: "100%",
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    margin: theme.spacing(2, 0),
  },
  leftContainer: {
    margin: theme.spacing(2, 0),
    alignSelf: "flex-start",
  },
  right:{
    textAlign:'right'
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editBtn: {
    minWidth: "auto",
    // aspectRatio: 1,
    borderRadius: 18,
    borderColor:'black',
    padding: theme.spacing(1.5),
    borderWidth:2,
    color:'black'
  },
  imgView: {
    borderRadius: 10,
    border: "dashed 2px #febb2c",
    // padding: theme.spacing(1),
  },
  center:{
    justifyContent:'center',
    alignItems:'center'
  },
  rightView: {
    padding: theme.spacing(0, 3),
  },
  inputRow: {
    margin: theme.spacing(2, 0),
  },
}));
export default useStyle;
