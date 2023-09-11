import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  mainView: {
    paddingTop: theme.spacing(3),
  },
  cardView: {
    width: "100%",
    boxShadow: theme.shadows[2],
    borderRadius: 10,
    margin: theme.spacing(2, 0),
    alignItems:'center',
    padding:theme.spacing(4)
  },
  mT3:{
    marginTop:theme.spacing(3)
  },
  leftContainer: {
    margin: theme.spacing(2, 0),
    alignSelf: "flex-start",
  },
  pl:{
    paddingLeft:theme.spacing(1)
  },
  bold:{
    fontWeight:'700'
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  editBtn: {
    minWidth: "auto",
    height: 50,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: theme.palette.common.black,
    padding: theme.spacing(1.5),
  },
  imgView: {
    borderRadius: 10,
    border: `dashed 2px ${theme.palette.primary.main}`,
    // padding: theme.spacing(1),
  },
  rightView: {
    padding: theme.spacing(0, 3),
  },
  inputRow: {
    margin: theme.spacing(2, 0),
  },
  saveBtn: {
    borderRadius: 15,
    padding: theme.spacing(1, 4),
  },
  cancelBtn: {
    height: 50,
    padding: theme.spacing(1, 3),
    marginRight: theme.spacing(1),
  },
}));
export default useStyle;
