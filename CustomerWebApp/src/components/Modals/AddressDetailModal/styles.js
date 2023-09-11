import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiDialogTitle-root": {
      backgroundColor: theme.palette.grey[100],
    },
    "& label": {
      color: theme.palette.grey[600],
      fontSize: "0.85rem",
    },
    "& .MuiFilledInput-root": {
      backgroundColor: theme.palette.grey[100],
      fontSize: 14,
      borderRadius: 10,
      "& .Mui-disabled": {
        color: theme.palette.text.primary,
      },
    },
  },
  whiteFont: {
    color: theme.palette.common.white,
  },
  m2: {
    margin: theme.spacing(2, 0),
  },
  boldText: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  mainView: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(3, 2),
  },
  leftContainer: {},
  rightContainer: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  btn: {
    marginRight: theme.spacing(1),
  },
  selectedBtn: {
    borderRadius: 20,
  },
  unSelectedBtn: {
    borderRadius: 20,
  },
  input: {
    borderRadius: 10,
  },
  multiline: {
    maxHeight: 100,
    overflow: "scroll",
  },
  subBtn: {
    margin: theme.spacing(2, 0, 0, 0),
    padding: theme.spacing(1),
    borderRadius: 20,
  },
  linkBtn: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default useStyle;
