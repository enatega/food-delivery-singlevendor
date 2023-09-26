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
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    width:'70%',
    height:'15vh',
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center',
    padding:theme.spacing(1),
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
