import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& label": {
      color: theme.palette.grey[600],
      fontSize: "0.85rem",
    },
    "& .MuiFilledInput-root": {
      backgroundColor: theme.palette.grey[100],
      fontSize: 14,
    },
  },
  width100: {
    maxWidth: "100%",
  },
  height100: {
    height: "100%",
  },
  logoView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    width: 100,
    aspectRatio: 1,
  },
  bottomView: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2, 0),
  },
  loginBtn: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(2, 2, 2, 3),
    borderRadius: 20,
    backgroundColor: theme.palette.grey[100],
    "&:disabled": {
      backgroundColor: theme.palette.grey[100],
    },
    "&:hover": {
      opacity: 0.9,
      backgroundColor: theme.palette.grey[50],
    },
  },
  linkBtn: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  font700: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  emailBtn: {
    margin: theme.spacing(3, 0, 0, 0),
    padding: theme.spacing(1.5),
    borderRadius: 20,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  createBtn: {
    margin: theme.spacing(2, 0, 0, 0),
    padding: theme.spacing(1.5),
    borderRadius: 20,
    borderWidth: 2,
  },
  lightText: {
    color: theme.palette.grey[500],
  },
  rightTxt: {
    textAlign: "right",
  },
  btnText: {
    width: "inherit",
    textTransform: "none",
    padding: theme.spacing(0, 2),
  },
  input: {
    borderRadius: 20,
  },
}));

export default useStyles;
